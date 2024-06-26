import { getRoom } from "@/db/room";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const data = await getRoom();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
