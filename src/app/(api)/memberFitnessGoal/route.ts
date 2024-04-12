import { getMemberAchievement } from "@/db/achievements";
import { getFitnessGoalByMember } from "@/db/fitnessGoal";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username");

  if (username === null) {
    return new Response("Missing username parameter", {
      status: 400,
    });
  }

  const data = await getFitnessGoalByMember(username);
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
