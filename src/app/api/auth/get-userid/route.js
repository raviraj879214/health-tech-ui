
import { cookies } from "next/headers";

export async function GET() {
  

  const userid = cookies().get("adminuserid")?.value || null;


  return new Response(JSON.stringify({ userid }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
