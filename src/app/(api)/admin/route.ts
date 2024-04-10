import { getAdmin } from "@/db/admin";

export async function GET(request: Request) {
  const data = await getAdmin();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
