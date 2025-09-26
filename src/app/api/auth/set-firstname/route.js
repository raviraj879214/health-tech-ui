

import { cookies } from "next/headers";

export async function POST(req) {
  const { firstname  } = await req.json();

  cookies().set({
    name: "adminfirstname",
    value: firstname,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });



  return new Response(JSON.stringify({ message: "Token set" }));
}
