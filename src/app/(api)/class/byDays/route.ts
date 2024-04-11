import { getClassByDays } from "@/db/class";

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.days) {
    return new Response("Missing days parameter", {
      status: 400,
    });
  }
  const res = await getClassByDays(body.days);
  return new Response(JSON.stringify(res));
}
