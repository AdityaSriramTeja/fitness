import { getHealthProfile } from "@/db/healthProfile";

export async function GET(request: Request) {
  const data = await getHealthProfile();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
