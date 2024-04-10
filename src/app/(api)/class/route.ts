import { getClass } from "@/db/class";

export async function GET(request: Request) {
  const data = await getClass();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
