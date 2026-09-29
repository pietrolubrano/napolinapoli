import { createHash, createHmac, randomUUID } from "node:crypto"

export const SMOOBU_BASE_URL = "https://login.smoobu.com"

const EMPTY_BODY_SHA256 =
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"

type SmoobuSearchValue = string | number | boolean | null | undefined

export type SmoobuSearchParams = Record<string, SmoobuSearchValue>

export type SmoobuFetchInit = Omit<RequestInit, "body"> & {
  searchParams?: SmoobuSearchParams
  body?: BodyInit | Record<string, unknown> | unknown[] | null
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
}

export type SmoobuCredentials = {
  apiKey: string
  apiSecret?: string
}

export type SmoobuSignatureInput = {
  method: string
  path: string
  query?: string
  timestamp: string
  nonce: string
  body?: string
  apiKey: string
  apiSecret: string
}

export function getSmoobuCustomerId() {
  const customerId = process.env.CUSTOMER_ID
  if (!customerId) {
    throw new Error("Missing CUSTOMER_ID environment variable")
  }
  return customerId
}

export function getSmoobuCredentials(): SmoobuCredentials {
  const apiKey = process.env.API_KEY
  if (!apiKey) {
    throw new Error("Missing API_KEY environment variable")
  }

  return {
    apiKey,
    apiSecret: process.env.API_SECRET || undefined,
  }
}

export function hashSmoobuBody(body = "") {
  if (!body) {
    return EMPTY_BODY_SHA256
  }

  return createHash("sha256").update(body).digest("hex")
}

export function canonicalQueryString(searchParams: URLSearchParams) {
  return [...searchParams.entries()]
    .sort(([aKey, aValue], [bKey, bValue]) => aKey.localeCompare(bKey) || aValue.localeCompare(bValue))
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&")
}

export function createSmoobuCanonicalString({
  method,
  path,
  query = "",
  timestamp,
  nonce,
  body = "",
  apiKey,
}: Omit<SmoobuSignatureInput, "apiSecret">) {
  return [
    method.toUpperCase(),
    path,
    query,
    timestamp,
    nonce,
    hashSmoobuBody(body),
    apiKey,
  ].join("\n")
}

export function createSmoobuSignature(input: SmoobuSignatureInput) {
  return createHmac("sha256", input.apiSecret)
    .update(createSmoobuCanonicalString(input))
    .digest("base64")
}

export function smoobuTimestamp(date = new Date()) {
  return date.toISOString().replace(/\.\d{3}Z$/, "Z")
}

export function createSmoobuAuthHeaders(
  input: {
    method: string
    path: string
    query?: string
    body?: string
    timestamp?: string
    nonce?: string
  },
  credentials: SmoobuCredentials = getSmoobuCredentials(),
) {
  if (!credentials.apiSecret) {
    console.warn(
      "API_SECRET is not set. Falling back to legacy Smoobu Api-Key authentication, which stops working on 25 September 2026.",
    )
    return {
      "Api-Key": credentials.apiKey,
    }
  }

  const timestamp = input.timestamp ?? smoobuTimestamp()
  const nonce = input.nonce ?? randomUUID()
  const signature = createSmoobuSignature({
    method: input.method,
    path: input.path,
    query: input.query ?? "",
    timestamp,
    nonce,
    body: input.body ?? "",
    apiKey: credentials.apiKey,
    apiSecret: credentials.apiSecret,
  })

  return {
    "X-API-Key": credentials.apiKey,
    "X-Timestamp": timestamp,
    "X-Nonce": nonce,
    "X-Signature": signature,
  }
}

function serializeRequestBody(body: SmoobuFetchInit["body"]) {
  if (body == null) {
    return undefined
  }

  if (typeof body === "string") {
    return body
  }

  if (typeof body !== "object" || body instanceof FormData || body instanceof Blob || body instanceof URLSearchParams || ArrayBuffer.isView(body)) {
    throw new Error("Smoobu requests only support JSON bodies")
  }

  return JSON.stringify(body)
}

export async function smoobuFetch(path: string, init: SmoobuFetchInit = {}) {
  const { searchParams, body, headers: initHeaders, method, ...rest } = init
  const serializedBody = serializeRequestBody(body)
  const requestMethod = (method ?? (serializedBody ? "POST" : "GET")).toUpperCase()
  const url = new URL(path, SMOOBU_BASE_URL)

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value === undefined || value === null || value === "") {
        continue
      }
      url.searchParams.set(key, String(value))
    }
  }

  const headers = new Headers(initHeaders)
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json")
  }
  if (serializedBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  const authHeaders = createSmoobuAuthHeaders({
    method: requestMethod,
    path: url.pathname,
    query: canonicalQueryString(url.searchParams),
    body: serializedBody ?? "",
  })

  for (const [key, value] of Object.entries(authHeaders)) {
    headers.set(key, value)
  }

  return fetch(url, {
    ...rest,
    method: requestMethod,
    headers,
    body: requestMethod === "GET" || requestMethod === "HEAD" ? undefined : serializedBody,
  })
}
