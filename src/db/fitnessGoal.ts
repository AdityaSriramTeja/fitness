import { sql } from "drizzle-orm";
import db from "./drizzle";

export type FitnessGoalType = {
  id: number;
  name: string;
  description: string;
  date: string;
  username: string;
};

export async function getFitnessGoal(): Promise<FitnessGoalType[]> {
  const fitnessGoal = await db.execute(sql`select * from FitnessGoal`);
  return fitnessGoal as unknown as FitnessGoalType[];
}


export async function getFitnessGoalByMember(
  username: string
): Promise<FitnessGoalType[]> {
  const fitnessGoal = await db.execute(
    sql`select * from Fitness_Goal where username = ${username}`
  );
  return fitnessGoal as unknown as FitnessGoalType[];
}
