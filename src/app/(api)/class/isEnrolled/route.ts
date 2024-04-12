import { isEnrolled } from "@/db/class";

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.username) {
    return new Response("Missing username parameter", {
      status: 400,
    });
  }
  const res = await isEnrolled(body.username);
  return new Response(res.toString());
}
