import { sql } from "drizzle-orm";
import db from "./drizzle";

export type MemberType = {
  username: string;
  password: string;
  name: string;
  outstanding_balance: number;
  enrolled_class_id: number;
};

export async function getMember(): Promise<MemberType[]> {
  const member = await db.execute(sql`select * from Member`);
  return member as unknown as MemberType[];
}
