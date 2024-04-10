import { getExerciseRoutineLog } from "@/db/exerciseRoutineLog";

export async function GET(request: Request) {
  const data = await getExerciseRoutineLog();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
