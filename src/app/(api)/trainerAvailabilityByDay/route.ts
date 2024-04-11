import { getTrainerAvailabilitiesByDay } from "@/db/trainerAvailability";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const day = req.nextUrl.searchParams.get("day");

  if (day === null) {
    return new Response("Missing day parameter", {
      status: 400,
    });
  }

  const data = await getTrainerAvailabilitiesByDay(day);
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
