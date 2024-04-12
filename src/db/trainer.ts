import { sql } from "drizzle-orm";
import db from "./drizzle";

export type TrainerType = {
  username: string;
  password: string;
  name: string;
};

export async function getTrainers(): Promise<TrainerType[]> {
  const trainers = await db.execute(sql`select * from Trainer`);
  return trainers as unknown as TrainerType[];
}

export async function addTrainer(username: string, password: string, name: string) {
  await db.execute(sql`insert into Trainer (username, password, name) values (${username}, ${password}, ${name})`);
}
