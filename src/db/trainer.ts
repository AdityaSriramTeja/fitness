import { sql } from "drizzle-orm";
import db from "./drizzle";

export type TrainerType = {
  username: string;
  password: string;
  name: string;
};

export async function getTrainer(): Promise<TrainerType[]> {
  const trainer = await db.execute(sql`select * from Trainer`);
  return trainer as unknown as TrainerType[];
}
