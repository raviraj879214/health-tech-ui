import { cookies } from "next/headers";

export async function GET() {
  

  const token = cookies().get("admintoken")?.value || null;


  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
