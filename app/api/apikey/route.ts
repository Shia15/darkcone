import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  if (!username || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const fakeKey = Buffer.from(`${username}:${password}`).toString("base64").slice(0, 16);
  return NextResponse.json({ key: fakeKey });
}
