

import { cookies } from "next/headers";

export async function POST(req) {
  const {  lastname } = await req.json();

  cookies().set({
    name: "adminlastname",
    value: lastname,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });



  return new Response(JSON.stringify({ message: "Token set" }));
}
