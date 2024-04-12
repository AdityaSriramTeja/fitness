import { getMemberByName } from "@/db/member";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");

  if (name === null) {
    return new Response("Missing name parameter", {
      status: 400,
    });
  }

  const data = await getMemberByName(name);
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
