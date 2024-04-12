import { getFitnessGoal } from "@/db/fitnessGoal";
import { getFitnessGoalByMember } from "@/db/fitnessGoal";

export async function GET(request: Request) {
  const data = await getFitnessGoal();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const data = await getFitnessGoalByMember(body.username);
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}