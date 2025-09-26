import { cookies } from "next/headers";

export async function GET() {
  

  const email = cookies().get("adminemail")?.value || null;


  return new Response(JSON.stringify({ email }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

