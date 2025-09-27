




import { cookies } from "next/headers";

export async function POST(req) {
  const { adminrole } = await req.json();
  cookies().set({
    name: "adminrole",
    value: adminrole,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  return new Response(JSON.stringify({ message: "Token set" }));
}
