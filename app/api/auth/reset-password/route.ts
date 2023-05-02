import { NextRequest, NextResponse } from "next/server"

import { passResetSchema } from "~/lib/validation/auth"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const info = passResetSchema.parse(body)
  console.log("hello from the server", info.email)
  return NextResponse.json({ text: "hello world" })
}
