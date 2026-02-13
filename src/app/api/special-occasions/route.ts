import { NextResponse } from "next/server";
import {
  getSpecialOccasions,
  toListResponse,
} from "@/lib/database/repository";

export async function GET() {
  const items = await getSpecialOccasions();
  return NextResponse.json(toListResponse(items));
}
