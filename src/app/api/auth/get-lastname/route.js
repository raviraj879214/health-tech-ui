import { cookies } from "next/headers";

export async function GET() {
  

  const lastname = cookies().get("adminlastname")?.value || null;


  return new Response(JSON.stringify({ lastname }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

