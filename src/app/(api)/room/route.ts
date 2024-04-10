import { getRoom } from "@/db/room";

export async function GET(request: Request) {
  const data = await getRoom();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
