"use client";

import { NextRequest } from "next/server";
import { addMember } from "@/db/member";
import { addTrainer } from "@/db/trainer";
import { addAdmin } from "@/db/admin";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const userType = body.userType;
  const username = body.username;
  const password = body.password;
  const name = body.name;

  if (!userType || !username || !password || !name) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  if (userType === "member") {
    await addMember(username, password, name);
  } else if (userType === "trainer") {
    await addTrainer(username, password, name);
  } else if (userType === "admin") {
    await addAdmin(username, password, name);
  } else {
    return new Response("Invalid user type", {
      status: 400,
    });
  }

  return new Response("Successfully created user", {
    status: 201,
  });
}
