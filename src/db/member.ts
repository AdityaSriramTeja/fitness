import { sql } from "drizzle-orm";
import db from "./drizzle";

export type MemberType = {
  username: string;
  password: string;
  name: string;
  outstanding_balance: number;
  enrolled_class_id: number;
};
export type MemberCard = {
  username: string;
  name: string;
};
export async function getMember(): Promise<MemberType[]> {
  const member = await db.execute(sql`select * from Member`);
  return member as unknown as MemberType[];
}

export async function addMember(
  username: string,
  password: string,
  name: string
): Promise<void> {
  await db.execute(
    sql`insert into Member (username, password, name, outstanding_balance, enrolled_class_id) values (${username}, ${password}, ${name}, 0, null)`
  );
}

export async function getMemberByName(name: string): Promise<MemberCard[]> {
  const member = await db.execute(
    sql`select username, name from member where LOWER(name) like ${sql.raw(
      `'%${name}%'`
    )}`
  );
  return member as unknown as MemberCard[];
}

export async function getMemberProfileByUsername(
  username: string
): Promise<MemberType[]> {
  const member = await db.execute(
    sql`select username, name from Member where name = ${username}`
  );
  return member as unknown as MemberType[];
}



