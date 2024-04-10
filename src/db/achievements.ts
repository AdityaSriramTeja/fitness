import { sql } from "drizzle-orm";
import db from "./drizzle";

export async function getAchievements() {
  const achievements = await db.execute(sql`select * from Achievements_Log`);
  return achievements;
}
