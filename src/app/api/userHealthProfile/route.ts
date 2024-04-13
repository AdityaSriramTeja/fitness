import { addHealthProfile } from "@/db/healthProfile";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const username = body.username;
  const average_sleep = body.average_sleep;
  const average_calories_burnt = body.average_calories_burn;
  const weight = body.weight;
  const gender = body.gender;
  const age = body.age;

  if (username === null) {
    return new Response("Missing username parameter", {
      status: 400,
    });
  }

  await addHealthProfile(
    weight,
    average_sleep,
    average_calories_burnt,
    gender,
    age,
    username
  );

  return new Response("Slot created", {
    status: 201,
  });
}
