import { getClass } from "@/db/class";

export async function GET(req: Request) {
  const res = await getClass();
  return new Response(JSON.stringify(res));
}
