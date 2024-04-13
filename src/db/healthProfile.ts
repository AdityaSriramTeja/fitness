import { sql } from "drizzle-orm";
import db from "./drizzle";

export type HealthProfileType = {
  health_profile_id : number;
  weight: number;
  average_sleep: number;
  average_calories_burnt: number;
  gender: string;
  age: number;
  username: string;
};

export async function getHealthProfile(): Promise<HealthProfileType[]> {
  const healthProfile = await db.execute(sql`select * from HealthProfile`);
  return healthProfile as unknown as HealthProfileType[];
}

export async function getHealthProfileByMember(username: string): Promise<HealthProfileType[]> {
  const healthProfile = await db.execute(sql`select * from Fitness_Goal where username = ${username}`);
  return healthProfile as unknown as HealthProfileType[];
}