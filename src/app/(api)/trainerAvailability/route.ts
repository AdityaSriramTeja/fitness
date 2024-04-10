import { getTrainerAvailabilities } from "@/db/trainerAvailability";

export async function GET(request: Request) {
  const data = await getTrainerAvailabilities();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
