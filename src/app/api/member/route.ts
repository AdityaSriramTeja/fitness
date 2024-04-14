import { getMemberByUsername, getMembers, updateMemberName } from "@/db/member";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (username !== null) {
    const data = await getMemberByUsername(username);
    return new Response(JSON.stringify(data), {
      headers: {
        "content-type": "application/json",
      },
    });
  }

  const data = await getMembers();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const username = body.username;
  const name = body.name;

  if (username === null || name === null) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  await updateMemberName(username, name);

  return new Response("Member name updated", {
    status: 200,
  });
}
