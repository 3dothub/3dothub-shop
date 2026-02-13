import { NextResponse } from "next/server";
import {
  getShopCategories,
  toListResponse,
} from "@/lib/database/repository";

export async function GET() {
  const items = await getShopCategories();
  return NextResponse.json(toListResponse(items));
}
