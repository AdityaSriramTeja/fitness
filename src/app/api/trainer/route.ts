import { getTrainers } from "@/db/trainer";

export async function GET(request: Request) {
  const data = await getTrainers();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
