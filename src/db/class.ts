import { sql } from "drizzle-orm";
import db from "./drizzle";

export type ClassType = {
  id: number;
  name: string;
  is_group_class: boolean;
  room_id: number;
  day: string;
  starting_time: string;
  trainer_username: string;
};

export async function getClass(): Promise<ClassType[]> {
  const classFitness = await db.execute(sql`select * from Class`);
  return classFitness as unknown as ClassType[];
}

export async function getClassByDays(days: string[]): Promise<ClassType[]> {
  const dayString = days.map(day => `'${day}'`).join(', ');
  console.log(dayString);
  console.log(`select * from Class where day in (${dayString})`);
  const classFitness = await db.execute(sql`select * from Class where day in (${dayString})`);
  // WHERE Country IN ('Germany', 'France', 'UK');
  return classFitness as unknown as ClassType[];
}