import {
  addExerciseRoutineLogByUsername,
  getExerciseRoutineLogByUsername,
} from "@/db/exerciseRoutineLog";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username");

  if (username === null) {
    return new Response("Missing username parameter", {
      status: 400,
    });
  }

  const data = await getExerciseRoutineLogByUsername(username);
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const name = body.name;
  const date = body.date;
  const num_reps = body.num_reps;
  const username = body.username;
  await addExerciseRoutineLogByUsername(name, date, num_reps, username);

  return new Response("Routine created", {
    status: 201,
  });
}
