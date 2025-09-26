

import { cookies } from "next/headers";

export async function POST(req) {
  const { token } = await req.json();
  cookies().set({
    name: "admintoken",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  return new Response(JSON.stringify({ message: "Token set" }));
}
