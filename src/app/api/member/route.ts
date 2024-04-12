import { getMemberByUsername, getMembers } from "@/db/member";
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
