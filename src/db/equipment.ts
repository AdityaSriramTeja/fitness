import { sql } from "drizzle-orm";
import db from "./drizzle";

export type EquipmentType = {
  id: number;
  name: string;
  needs_maintenance: boolean;
  room_id: number;
};

export type ParsedEquipmentType = {
  id: number;
  name: string;
  needs_maintenance: boolean;
  room_name: string;
};

export async function getEquipment(): Promise<EquipmentType[]> {
  const equipment = await db.execute(sql`select * from Equipment`);
  return equipment as unknown as EquipmentType[];
}

export async function getEquipmentParsed(): Promise<ParsedEquipmentType[]> {
  const equipment = await db.execute(sql`
    select e.id, e.name, e.needs_maintenance, r.name as room_name
    from Equipment e
    left join Room r on e.room_id = r.id
    order by e.id
  `);
  return equipment as unknown as ParsedEquipmentType[];
}

export async function updateEquipmentMaintenance(id: number, needs_maintenance: boolean): Promise<void> {
  await db.execute(
    sql`update Equipment
    set needs_maintenance = ${needs_maintenance}
    where id = ${id}
    `
  );
}
