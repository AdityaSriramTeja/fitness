import { getAchievements } from "@/db/achievements";

// export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  const res = await getAchievements();
  console.log(res);
  return new Response("GET response");
}
