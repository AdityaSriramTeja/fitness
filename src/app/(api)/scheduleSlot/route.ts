import { getScheduleSlot } from "@/db/scheduleSlot";

export async function GET(request: Request) {
  const data = await getScheduleSlot();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
