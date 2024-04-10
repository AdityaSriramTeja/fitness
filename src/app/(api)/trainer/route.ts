import { getTrainer } from "@/db/trainer";

export async function GET(request: Request) {
  const data = await getTrainer();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
