import { getClass } from "@/db/class";

export async function GET(request: Request) {
  const res = await getClass();
  console.log(res);
  return new Response(JSON.stringify(res));
}
