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

export async function getClassById(id: string): Promise<ClassType[]> {
  const classData = await db.execute(sql`select * from Class where id = ${id}`);
  return classData as unknown as ClassType[];
}

export async function getClassByDays(days: string[]): Promise<ClassType[]> {
  const sqlChunks: SQL[] = [];

  sqlChunks.push(sql`SELECT Class.* FROM Class LEFT JOIN (SELECT enrolled_class_id, COUNT(*) AS num_members FROM Member GROUP BY enrolled_class_id) m ON Class.id = m.enrolled_class_id WHERE Class.day IN (`);

  days.forEach((day, idx) => {
    sqlChunks.push(sql`${day}`);
    if (idx !== days.length - 1) {
      sqlChunks.push(sql`, `);
    }
  });

  sqlChunks.push(sql`) AND NOT (Class.is_group_class = FALSE AND m.num_members = 1) ORDER BY id`);

  const query: SQL = sql.join(sqlChunks, sql.raw(" "));
  const classFitness = await db.execute(query);

  return classFitness as unknown as ClassType[];
}

export async function bookClass(username: string, enrolled_class_id: number): Promise<ClassType[]> {
  const sqlChunks: SQL[] = [];
  sqlChunks.push(sql`UPDATE Member SET enrolled_class_id = ${enrolled_class_id} WHERE username = ${username}`);

  const query: SQL = sql.join(sqlChunks, sql.raw(" "));
  const classFitness = await db.execute(query);

  return classFitness as unknown as ClassType[];
}

export async function unEnroll(username: string): Promise<ClassType[]> {
  const sqlChunks: SQL[] = [];
  sqlChunks.push(sql`UPDATE Member SET enrolled_class_id = NULL WHERE username = ${username}`);

  const query: SQL = sql.join(sqlChunks, sql.raw(" "));
  const classFitness = await db.execute(query);

  return classFitness as unknown as ClassType[];
}

export async function isEnrolled(username: string): Promise<Boolean> {
  const sqlChunks: SQL[] = [];
  sqlChunks.push(sql`SELECT * FROM Member WHERE username = ${username} AND enrolled_class_id IS NOT NULL`);

  const query: SQL = sql.join(sqlChunks, sql.raw(" "));
  const classFitness = await db.execute(query);
  if (classFitness.length === 0) {
    return false;
  }
  return true;
}

export async function getClassByUsername(username: string): Promise<ClassType[]> {
  const classFitness = await db.execute(sql`select c.id, c.name, c.is_group_class, c.room_id, c.day, c.starting_time, c.trainer_username from class c inner join member m on c.id = m.enrolled_class_id where m.username = ${username}`);
  return classFitness as unknown as ClassType[];
}

export async function deleteClass(class_id: number): Promise<void> {
  // de-register all users from this class
  await db.execute(
    sql`UPDATE Member
    SET enrolled_class_id = NULL
    WHERE enrolled_class_id = ${class_id}`
  );

  // delete the class (this will also remove the room booking automatically)
  await db.execute(
    sql`DELETE FROM Class
    WHERE id = ${class_id}`
  );
}
