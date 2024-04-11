import { createClass, getClass } from "@/db/class";
import { NextRequest } from "next/server";

export async function GET(request: Request) {
  const data = await getClass();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  await createClass(
    body.name,
    body.is_group_class,
    body.room_id,
    body.day,
    body.start_time,
    body.trainer_username
  );

  return new Response("Slot created", {
    status: 201,
  });
}
