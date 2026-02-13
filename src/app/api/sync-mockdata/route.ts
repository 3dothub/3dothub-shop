import { NextResponse } from "next/server";
import { getDb } from "@/lib/database/mongodb";
import { ensureMongoSeeded } from "@/lib/database/seed";

export async function POST() {
  const db = await getDb();
  await ensureMongoSeeded(db, { forceSync: true });

  return NextResponse.json({ ok: true, message: "Mockdata synced to MongoDB" });
}
