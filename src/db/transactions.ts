import { sql } from "drizzle-orm";
import db from "./drizzle";

export type TransactionType = {
  id: number;
  name: string;
  username: string;
  amount: number;
  date: string;
};

export async function getMemberTransactions(username: string): Promise<TransactionType[]> {
  const transactions = await db.execute(sql`select * from Transactions where username = ${username}`);
  return transactions as unknown as TransactionType[];
}

export async function getTransactions(): Promise<TransactionType[]> {
  const transactions = await db.execute(sql`select * from Transactions `);
  return transactions as unknown as TransactionType[];
}

export async function createTransaction(name: string, username: string, amount: number, date: string): Promise<void> {
  await db.execute(sql`insert into Transactions (name, username, amount, date) values (${name}, ${username}, ${amount}, ${date})`);
}

export async function getAmountByUsername(username: string) {
  const amount = await db.execute(
    sql`SELECT SUM(amount) FROM Transactions
    WHERE username = ${username}
    GROUP BY username`
  );

  return amount as unknown as number;
}
