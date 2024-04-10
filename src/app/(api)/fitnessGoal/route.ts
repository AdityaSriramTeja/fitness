import { getFitnessGoal } from "@/db/fitnessGoal";

export async function GET(request: Request) {
  const data = await getFitnessGoal();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
