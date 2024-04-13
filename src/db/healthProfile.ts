import { sql } from "drizzle-orm";
import db from "./drizzle";

export type HealthProfileType = {
  health_profile_id: number;
  weight: number;
  average_sleep: number;
  average_calories_burnt: number;
  gender: string;
  age: number;
  username: string;
};

export async function getHealthProfileByMember(username: string): Promise<HealthProfileType[]> {
  const healthProfile = await db.execute(sql`select * from Health_Profile where username = ${username}`);
  return healthProfile as unknown as HealthProfileType[];
}

export async function addHealthProfile(
  weight: number,
  average_sleep: number,
  average_calories_burnt: number,
  gender: string,
  age: number,
  username: string
): Promise<void> {
  await db.execute(
    sql`insert into Health_Profile (weight, average_sleep, average_calories_burnt, gender, age, username) values (${weight}, ${average_sleep}, ${average_calories_burnt}, ${gender}, ${age}, ${username})`
  );
}