import { cookies } from "next/headers";

export async function GET() {
  

  const adminrole =await cookies().get("adminrole")?.value || null;


  return new Response(JSON.stringify({ adminrole }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}



