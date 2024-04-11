import { sql } from "drizzle-orm";
import db from "./drizzle";

export type ClassType = {
  id: number;
  name: string;
  is_group_class: boolean;
  room_id: number;
  day: string;
  schedule_slot_id: number;
  trainer_username: string;
};

export async function getClass(): Promise<ClassType[]> {
  const classFitness = await db.execute(sql`select * from Class`);
  return classFitness as unknown as ClassType[];
}

export async function createClass(
  name: string,
  is_group_class: boolean,
  room_id: number,
  day: string,
  starting_time: number,
  trainer_username: string
): Promise<void> {
  await db.execute(
    sql`insert into Class (name, is_group_class, room_id, day, starting_time, trainer_username) values (${name}, ${is_group_class}, ${room_id}, ${day}, ${starting_time}, ${trainer_username})`
  );
}