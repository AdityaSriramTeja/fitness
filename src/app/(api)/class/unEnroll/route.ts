import { unEnroll } from "@/db/class";

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.username) {
    return new Response("Missing username parameter", {
      status: 400,
    });
  }
  const res = await unEnroll(body.username);
  return new Response(JSON.stringify(res));
}
