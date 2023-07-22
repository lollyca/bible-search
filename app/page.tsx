"use client"
import VerseFetcher from "./components/verse-fetcher"
export default function Home() {
  return (
    <div className="row justify-content-center">
      <div className="row m-0 p-0 h-25">
        <img style={{objectFit: "cover", height: "300px"}} src="/banner.jpeg" alt="" />
      </div>
      <VerseFetcher />
    </div>
  )
}
