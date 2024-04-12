import { getMemberAchievement } from "@/db/achievements";
import { getClassByUsername } from "@/db/class";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username");

  if (username === null) {
    return new Response("Missing username parameter", {
      status: 400,
    });
  }

  const data = await getClassByUsername(username);
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
