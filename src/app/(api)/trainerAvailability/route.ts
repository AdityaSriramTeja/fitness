import { createTrainerAvailability, deleteTrainerAvailability, getTrainerAvailabilities } from "@/db/trainerAvailability";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const trainerUsername = req.nextUrl.searchParams.get("trainerUsername");

  if (trainerUsername === null) {
    return new Response("Missing trainerUsername parameter", {
      status: 400,
    });
  }

  const data = await getTrainerAvailabilities(trainerUsername);
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const trainerUsername = body.trainerUsername;
  const day = body.day ?? "Monday";
  const startingTime = body.startingTime ?? "09:00:00";

  if (trainerUsername === null) {
    return new Response("Missing trainerUsername parameter", {
      status: 400,
    });
  }

  await createTrainerAvailability(trainerUsername, day, startingTime);

  return new Response("Slot created", {
    status: 201,
  });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();

  const trainerUsername = body.trainerUsername;
  const day = body.day ?? "Monday";
  const startingTime = body.startingTime ?? "09:00:00";

  if (trainerUsername === null) {
    return new Response("Missing trainerUsername parameter", {
      status: 400,
    });
  }

  await deleteTrainerAvailability(trainerUsername, day, startingTime);

  // delete slot
  return new Response("Slot deleted", {
    status: 200,
  });
}
