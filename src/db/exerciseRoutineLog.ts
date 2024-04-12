import { sql } from "drizzle-orm";
import db from "./drizzle";

export type ExerciseRoutineLogType = {
  id: number;
  name: string;
  date: string;
  num_reps: number;
  username: string;
};

export async function getExerciseRoutineLog(): Promise<
  ExerciseRoutineLogType[]
> {
  const exerciseRoutineLog = await db.execute(
    sql`select * from Exercise_Routine_Log`
  );
  return exerciseRoutineLog as unknown as ExerciseRoutineLogType[];
}

export async function getExerciseRoutineLogByUsername(
  username: string
): Promise<ExerciseRoutineLogType[]> {
  const exerciseRoutineLog = await db.execute(
    sql`select * from Exercise_Routine_Log where username = ${username}`
  );
  return exerciseRoutineLog as unknown as ExerciseRoutineLogType[];
}

export async function addExerciseRoutineLogByUsername(
  name: string,
  date: string,
  num_reps: number,
  username: string
): Promise<ExerciseRoutineLogType[]> {
  const exerciseRoutineLog = await db.execute(
    sql`insert into Exercise_Routine_Log (name, date, num_reps, username) values (${name}, ${date}, ${num_reps}, ${username})`
  );
  return exerciseRoutineLog as unknown as ExerciseRoutineLogType[];
}
