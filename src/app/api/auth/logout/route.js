import { cookies } from "next/headers";

export async function POST() {
  cookies().set({
    name: "admintoken",
    value: "",
    path: "/",
    httpOnly: true,
    expires: new Date(0),   // expire immediately
  });

  return new Response(JSON.stringify({ message: "Logged out" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
