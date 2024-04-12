import { SQL, sql } from "drizzle-orm";
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

export async function createClass(name: string, is_group_class: boolean, room_id: number, day: string, starting_time: number, trainer_username: string): Promise<void> {
  // create the class but also removes the corresponding trainer availability slot
  await db.execute(sql`insert into Class (name, is_group_class, room_id, day, starting_time, trainer_username) values (${name}, ${is_group_class}, ${room_id}, ${day}, ${starting_time}, ${trainer_username})`);
  await db.execute(sql`delete from Trainer_Availability where day=${day} and starting_time=${starting_time} and trainer_username=${trainer_username}`);
}

export async function getClassByDays(days: string[]): Promise<ClassType[]> {
  const sqlChunks: SQL[] = [];

  sqlChunks.push(sql`SELECT * FROM Class WHERE day IN (`);

  days.forEach((day, idx) => {
    sqlChunks.push(sql`${day}`);
    if (idx !== days.length - 1) {
      sqlChunks.push(sql`, `);
    }
  });

  sqlChunks.push(sql`)`);

  // Execute the query with the list of days as parameters
  const query: SQL = sql.join(sqlChunks, sql.raw(" "));
  const classFitness = await db.execute(query);

  return classFitness as unknown as ClassType[];
}
