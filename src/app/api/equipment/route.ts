import { addEquipment, getEquipmentParsed, updateEquipmentMaintenance } from "@/db/equipment";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const data = await getEquipmentParsed();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function PATCH(req: NextRequest) {
  const { id, needs_maintenance } = await req.json();

  if (typeof id !== "number" || typeof needs_maintenance !== "boolean") {
    return new Response("Invalid request", { status: 400 });
  }

  await updateEquipmentMaintenance(id, needs_maintenance);
  return new Response(null, { status: 204 });
}

export async function POST(req: NextRequest) {
  const { name, room_id, needs_maintenance } = await req.json();

  if (typeof name !== "string" || typeof room_id !== "number" || typeof needs_maintenance !== "boolean") {
    return new Response("Invalid request", { status: 400 });
  }

  await addEquipment(name, room_id, needs_maintenance);
  return new Response(null, { status: 204 });
}
