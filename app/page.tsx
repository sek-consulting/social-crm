"use client"

import { signOut } from "next-auth/react"

export default function IndexPage() {
  return (
    <div>
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <h1>HELLO WORLD</h1>
        <button onClick={() => signOut()}>logout</button>
      </div>
    </div>
  )
}
