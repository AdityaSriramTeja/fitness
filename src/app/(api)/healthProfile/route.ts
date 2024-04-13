import { getHealthProfile } from "@/db/healthProfile";
import { getHealthProfileByMember } from "@/db/healthProfile";

export async function GET(request: Request) {
  const data = await getHealthProfile();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const data = await getHealthProfileByMember(body.username);
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}