



import { cookies } from "next/headers";

export async function POST(req) {
  const { userid } = await req.json();
  cookies().set({
    name: "adminuserid",
    value: userid,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  
  return new Response(JSON.stringify({ message: "adminuserid set" }));
}
