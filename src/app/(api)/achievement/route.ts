import { getAchievements } from "@/db/achievements";

export async function GET(request: Request) {
  const data = await getAchievements();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
