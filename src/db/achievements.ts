import { sql } from "drizzle-orm";
import db from "./drizzle";

export type AchievementType = {
  id: number;
  name: string;
  description: string;
  date: string;
  username: string;
};

export async function getAchievements(): Promise<AchievementType[]> {
  const achievements = await db.execute(sql`select * from Achievements_Log`);

  return achievements as unknown as AchievementType[];
}


export async function getMemberAchievement(
  username: string
): Promise<AchievementType[]> {
  const achievements = await db.execute(
    sql`select * from Achievements_Log where username = ${username}`
  );

  return achievements as unknown as AchievementType[];
}