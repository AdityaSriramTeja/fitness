import { getEquipment } from "@/db/equipment";

export async function GET(request: Request) {
  const data = await getEquipment();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
