import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(request) {
  const body = await request.json();

  if (!body?.userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const client = await clerkClient();

  const user = await client.users.getUser(body.userId);

  console.log(user);

  return NextResponse.json({
   user
  });
}
