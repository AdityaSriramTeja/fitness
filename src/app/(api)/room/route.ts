import { getRoom, updateRoomBooked } from "@/db/room";
import { NextRequest } from "next/server";

export async function GET(request: Request) {
  const data = await getRoom();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}

// export async function PUT(req: NextRequest) {
//   const body = await req.json();

//   const roomId = body.room_id;
//   const roomBooked = body.booked;

//   await updateRoomBooked(roomId, roomBooked);

//   return new Response("Slot created", {
//     status: 201,
//   });
// }
