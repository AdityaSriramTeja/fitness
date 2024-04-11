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
