import { sql } from "drizzle-orm";
import db from "./drizzle";

export type AdminType = {
  username: string;
  password: string;
  name: string;
};

export async function getAdmin(): Promise<AdminType[]> {
  const admin = await db.execute(sql`select * from Admin`);
  return admin as unknown as AdminType[];
}
