import { NextRequest } from "next/server";
import { userExists } from "@/db/member";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const userType = body.userType;
  const username = body.username;
  const password = body.password;

  if (!userType || !username || !password) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  const capitalizeFirstChar = userType.charAt(0).toUpperCase() + userType.slice(1);
  const res = await userExists(capitalizeFirstChar, username, password);

  if (!res) {
    return new Response(`Failed to sign in (is the password correct?)`, {
      status: 401,
    });
  }

  return new Response("Successfully signed in.", {
    status: 201,
  });
}
