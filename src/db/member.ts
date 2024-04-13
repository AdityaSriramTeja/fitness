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

export async function userExists(tableName: string, username: string, password: string): Promise<boolean> {
  const user = await db.execute(sql`select * from ${sql.raw(tableName)} where username = ${username} and password = ${password}`);
  return user.length > 0;
}

export async function getMembers(): Promise<MemberType[]> {
  const members = await db.execute(sql`select * from Member`);
  return members as unknown as MemberType[];
}

export async function addMember(username: string, password: string, name: string): Promise<void> {
  await db.execute(sql`insert into Member (username, password, name, outstanding_balance, enrolled_class_id) values (${username}, ${password}, ${name}, 200, null)`);
}

export async function getMemberByName(name: string): Promise<MemberCard[]> {
  const member = await db.execute(sql`select username, name from member where LOWER(name) like ${sql.raw(`LOWER('%${name}%')`)}`);
  return member as unknown as MemberCard[];
}

export async function getMemberByUsername(username: string): Promise<MemberType[]> {
  const member = await db.execute(sql`select * from Member where username = ${username}`);
  return member as unknown as MemberType[];
}

export async function getMemberProfileByUsername(username: string): Promise<MemberType[]> {
  const member = await db.execute(sql`select username, name from Member where name = ${username}`);
  return member as unknown as MemberType[];
}
