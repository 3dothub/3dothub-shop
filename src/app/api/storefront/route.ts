import { NextResponse } from "next/server";
import { getStorefrontData } from "@/lib/database/repository";

export async function GET() {
  const data = await getStorefrontData();
  return NextResponse.json(data);
}
