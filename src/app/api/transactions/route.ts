import { createTransaction, getAmountByUsername } from "@/db/transactions";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  const data = await getAmountByUsername(username);

  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  const { username, name, amount, date } = await request.json();

  if (!username || !name || !amount || !date) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  await createTransaction(name, username, amount, date);

  return new Response("Success", {
    status: 200,
  });
}
