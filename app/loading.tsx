import Image from "next/image"

export default function Loading() {

  return <div className="flex justify-center items-center h-[80vh] ">
    <Image
      className="max-w-sm animate-ping"
      src={'/images/napoli-napoli-logo.png'}
      width={650}
      height={410}
      alt="logo"
    />
  </div>
}