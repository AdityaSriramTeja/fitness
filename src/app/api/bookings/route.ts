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
