import { FitnessGoalType, addFitnessGoal, getFitnessGoal } from "@/db/fitnessGoal";
import { getFitnessGoalByMember } from "@/db/fitnessGoal";
import { deleteFitnessGoalById } from "@/db/fitnessGoal";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  let data: FitnessGoalType[] = [];

  if (username) {
    data = await getFitnessGoalByMember(username);
  } else {
    data = await getFitnessGoal();
  }

  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  const { username, name, description, date } = await request.json();

  if (!username || !name || !description || !date) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  await addFitnessGoal(username, name, description, date);

  return new Response("Success", {
    status: 200,
  });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const data = await deleteFitnessGoalById(body.id);
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
