import { bookClass } from "@/db/class";

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.username || !body.enrolled_class_id) {
    return new Response("At least 1 missing parameter", {
      status: 400,
    });
  }
  const res = await bookClass(body.username, body.enrolled_class_id);
  return new Response(JSON.stringify(res));
}
