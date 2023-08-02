"use client"

import TestFetcher from "./components/test-fetcher"

export default function Home() {
  return (
    <div className="row justify-content-center p-0">
      {/* <div className="row m-0 p-0 h-25">
        <img style={{ objectFit: "cover", height: "300px" }} src="/banner.jpeg" alt="" />
      </div> */}

      <TestFetcher />
    </div>
  )
}
