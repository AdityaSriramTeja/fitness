import { sql } from "drizzle-orm";
import db from "./drizzle";

export type ExerciseRoutineLogType = {
  id: number;
  name: string;
  date: string;
  num_reps: number;
  username: string;
};

export async function getExerciseRoutineLog(): Promise<ExerciseRoutineLogType[]> {
  const exerciseRoutineLog = await db.execute(sql`select * from ExerciseRoutineLog`);
  return exerciseRoutineLog as unknown as ExerciseRoutineLogType[];
}
