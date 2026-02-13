import { NextResponse } from "next/server";
import {
  getSubCategories,
  toListResponse,
} from "@/lib/database/repository";

export async function GET() {
  const items = await getSubCategories();
  return NextResponse.json(toListResponse(items));
}
