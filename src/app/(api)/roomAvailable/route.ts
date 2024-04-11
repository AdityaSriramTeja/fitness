import { getAvailableRooms } from "@/db/room";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const start_time = req.nextUrl.searchParams.get("start_time");
  if (!start_time) {
    return new Response("Missing start_time parameter", {
      status: 400,
    });
  }
  const data = await getAvailableRooms(start_time);
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
