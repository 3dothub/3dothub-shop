import { NextResponse } from "next/server";
import { getStorefrontData } from "@/lib/database/repository";

export async function GET() {
  try {
    const data = await getStorefrontData();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown storefront error";

    console.error("[api/storefront]", message, error);

    return NextResponse.json(
      {
        error: "Failed to load storefront data",
        details:
          process.env.NODE_ENV === "production"
            ? "Check MongoDB env and connectivity in server logs"
            : message,
      },
      { status: 500 }
    );
  }
}
