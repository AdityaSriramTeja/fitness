import { getClassById } from "@/db/class";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (id !== null) {
    const data = await getClassById(id);
    return new Response(JSON.stringify(data), {
      headers: {
        "content-type": "application/json",
      },
    });
  }
}
