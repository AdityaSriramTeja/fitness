import { sql } from "drizzle-orm";
import db from "./drizzle";

export type EquipmentType = {
  id: number;
  name: string;
  needs_maintenance: boolean;
  room_id: number;
};

export async function getEquipment(): Promise<EquipmentType[]> {
  const equipment = await db.execute(sql`select * from Equipment`);
  return equipment as unknown as EquipmentType[];
}
