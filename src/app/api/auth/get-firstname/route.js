import { cookies } from "next/headers";

export async function GET() {
  

  const firstname = cookies().get("adminfirstname")?.value || null;


  return new Response(JSON.stringify({ firstname }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

