

import { cookies } from "next/headers";

export async function POST(req) {
  const { email } = await req.json();
  cookies().set({
    name: "adminemail",
    value: email,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  return new Response(JSON.stringify({ message: "Token set" }));
}
