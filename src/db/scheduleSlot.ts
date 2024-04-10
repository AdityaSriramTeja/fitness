import { sql } from "drizzle-orm";
import db from "./drizzle";

export type ScheduleSlotType = {
  username: string;
  password: string;
  name: string;
};

export async function getScheduleSlot(): Promise<ScheduleSlotType[]> {
  const scheduleSlot = await db.execute(sql`select * from ScheduleSlot`);
  return scheduleSlot as unknown as ScheduleSlotType[];
}
