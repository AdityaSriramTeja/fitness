import { sql } from "drizzle-orm";
import db from "./drizzle";

export type RoomType = {
  id: number;
  name: string;
};

export async function getRoom(): Promise<RoomType[]> {
  const room = await db.execute(sql`select * from Room`);
  return room as unknown as RoomType[];
}
