import { NextResponse } from "next/server";
import { getSections, toListResponse } from "@/lib/database/repository";

export async function GET() {
  const items = await getSections();
  return NextResponse.json(toListResponse(items));
}
