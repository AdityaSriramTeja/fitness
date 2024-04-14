import { deleteClass } from "@/db/class";
import { getRoomBookings } from "@/db/room";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const data = await getRoomBookings();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function DELETE(req: NextRequest) {
  const { class_id } = await req.json();

  if (!class_id) {
    return new Response("Missing class_id", {
      status: 400,
    });
  }

  await deleteClass(class_id);
  return new Response(null, {
    status: 204,
  });
}
