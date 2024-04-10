import { getMember } from "@/db/member";

export async function GET(request: Request) {
  const data = await getMember();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
