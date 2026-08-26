import assert from "node:assert/strict"
import { describe, it } from "node:test"
import {
  canonicalQueryString,
  createSmoobuAuthHeaders,
  createSmoobuCanonicalString,
  createSmoobuSignature,
  hashSmoobuBody,
  smoobuFetch,
  smoobuTimestamp,
} from "./smoobu.ts"

const API_KEY = "usr_live_abc123"
const API_SECRET = "your_api_secret"
const TIMESTAMP = "2026-04-01T12:00:00Z"
const POST_NONCE = "550e8400-e29b-41d4-a716-446655440000"
const GET_NONCE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
const POST_BODY = '{"apartmentId":123,"from":"2026-04-01","to":"2026-04-10"}'

describe("Smoobu HMAC authentication", () => {
  it("hashes an empty body with the SHA-256 of an empty string", () => {
    assert.equal(
      hashSmoobuBody(""),
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    )
  })

  it("hashes a JSON body as hex SHA-256", () => {
    assert.equal(
      hashSmoobuBody(POST_BODY),
      "c330d36eded5ba48a781e2f2cd95420b89d92e581d779aa86d9ef60a5a6ed53a",
    )
  })

  it("sorts query parameters alphabetically", () => {
    const searchParams = new URLSearchParams("to=2026-04-10&from=2026-04-01&showCancellation=false")
    assert.equal(
      canonicalQueryString(searchParams),
      "from=2026-04-01&showCancellation=false&to=2026-04-10",
    )
  })

  it("builds the official POST canonical string", () => {
    assert.equal(
      createSmoobuCanonicalString({
        method: "POST",
        path: "/api/reservations",
        query: "",
        timestamp: TIMESTAMP,
        nonce: POST_NONCE,
        body: POST_BODY,
        apiKey: API_KEY,
      }),
      [
        "POST",
        "/api/reservations",
        "",
        TIMESTAMP,
        POST_NONCE,
        "c330d36eded5ba48a781e2f2cd95420b89d92e581d779aa86d9ef60a5a6ed53a",
        API_KEY,
      ].join("\n"),
    )
  })

  it("signs the official POST example", () => {
    assert.equal(
      createSmoobuSignature({
        method: "POST",
        path: "/api/reservations",
        query: "",
        timestamp: TIMESTAMP,
        nonce: POST_NONCE,
        body: POST_BODY,
        apiKey: API_KEY,
        apiSecret: API_SECRET,
      }),
      "64zVmuaX7u9BPPU7J8ruvr5rzoaCcpZtYgFoKGJOdig=",
    )
  })

  it("signs the official GET example", () => {
    assert.equal(
      createSmoobuSignature({
        method: "GET",
        path: "/api/reservations",
        query: "from=2026-04-01&to=2026-04-10",
        timestamp: TIMESTAMP,
        nonce: GET_NONCE,
        body: "",
        apiKey: API_KEY,
        apiSecret: API_SECRET,
      }),
      "Bu2/61pneyRyjQejH7PoCJC2P8iRm3NnC9R6CGFOQho=",
    )
  })

  it("returns HMAC headers when an API secret is present", () => {
    const headers = createSmoobuAuthHeaders(
      {
        method: "GET",
        path: "/api/reservations",
        query: "from=2026-04-01&to=2026-04-10",
        timestamp: TIMESTAMP,
        nonce: GET_NONCE,
      },
      { apiKey: API_KEY, apiSecret: API_SECRET },
    )

    assert.deepEqual(headers, {
      "X-API-Key": API_KEY,
      "X-Timestamp": TIMESTAMP,
      "X-Nonce": GET_NONCE,
      "X-Signature": "Bu2/61pneyRyjQejH7PoCJC2P8iRm3NnC9R6CGFOQho=",
    })
  })

  it("falls back to the legacy Api-Key header without a secret", () => {
    const warn = console.warn
    console.warn = () => {}

    try {
      const headers = createSmoobuAuthHeaders(
        {
          method: "GET",
          path: "/api/apartments",
        },
        { apiKey: API_KEY },
      )

      assert.deepEqual(headers, {
        "Api-Key": API_KEY,
      })
    } finally {
      console.warn = warn
    }
  })

  it("formats timestamps as UTC ISO-8601 without milliseconds", () => {
    assert.equal(
      smoobuTimestamp(new Date("2026-04-01T12:00:00.123Z")),
      "2026-04-01T12:00:00Z",
    )
  })

  it("sends signed HMAC headers and a JSON body with smoobuFetch", async () => {
    const originalFetch = globalThis.fetch
    const originalKey = process.env.API_KEY
    const originalSecret = process.env.API_SECRET
    let request: { url: string; init: RequestInit } | undefined

    globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
      request = { url: String(input), init: init ?? {} }
      return new Response(JSON.stringify({ ok: true }), { status: 200 })
    }) as typeof fetch
    process.env.API_KEY = API_KEY
    process.env.API_SECRET = API_SECRET

    try {
      await smoobuFetch("/api/reservations", {
        method: "POST",
        body: { apartmentId: 123, from: "2026-04-01", to: "2026-04-10" },
      })

      assert.ok(request)
      assert.equal(request.url, "https://login.smoobu.com/api/reservations")
      assert.equal(request.init.body, POST_BODY)

      const headers = new Headers(request.init.headers)
      assert.equal(headers.get("X-API-Key"), API_KEY)
      assert.equal(headers.get("Api-Key"), null)
      assert.equal(headers.get("Content-Type"), "application/json")
      assert.match(headers.get("X-Nonce") ?? "", /^[0-9a-f-]{36}$/i)
      assert.match(headers.get("X-Timestamp") ?? "", /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)
      assert.equal(
        headers.get("X-Signature"),
        createSmoobuSignature({
          method: "POST",
          path: "/api/reservations",
          query: "",
          timestamp: headers.get("X-Timestamp") ?? "",
          nonce: headers.get("X-Nonce") ?? "",
          body: POST_BODY,
          apiKey: API_KEY,
          apiSecret: API_SECRET,
        }),
      )
    } finally {
      globalThis.fetch = originalFetch
      process.env.API_KEY = originalKey
      process.env.API_SECRET = originalSecret
    }
  })

  it("sorts query params on GET requests before signing", async () => {
    const originalFetch = globalThis.fetch
    const originalKey = process.env.API_KEY
    const originalSecret = process.env.API_SECRET
    let request: { url: string; init: RequestInit } | undefined

    globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
      request = { url: String(input), init: init ?? {} }
      return new Response(JSON.stringify({ bookings: [] }), { status: 200 })
    }) as typeof fetch
    process.env.API_KEY = API_KEY
    process.env.API_SECRET = API_SECRET

    try {
      await smoobuFetch("/api/reservations", {
        method: "GET",
        searchParams: {
          to: "2026-04-10",
          from: "2026-04-01",
          showCancellation: false,
        },
      })

      assert.ok(request)
      const url = new URL(request.url)
      assert.equal(url.searchParams.get("from"), "2026-04-01")
      assert.equal(url.searchParams.get("to"), "2026-04-10")
      assert.equal(url.searchParams.get("showCancellation"), "false")

      const headers = new Headers(request.init.headers)
      assert.equal(
        headers.get("X-Signature"),
        createSmoobuSignature({
          method: "GET",
          path: "/api/reservations",
          query: "from=2026-04-01&showCancellation=false&to=2026-04-10",
          timestamp: headers.get("X-Timestamp") ?? "",
          nonce: headers.get("X-Nonce") ?? "",
          body: "",
          apiKey: API_KEY,
          apiSecret: API_SECRET,
        }),
      )
    } finally {
      globalThis.fetch = originalFetch
      process.env.API_KEY = originalKey
      process.env.API_SECRET = originalSecret
    }
  })
})
