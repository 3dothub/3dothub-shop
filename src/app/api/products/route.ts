import { NextResponse } from "next/server";
import type { ProductsResponse } from "@/lib/types/product";
import { featuredProducts } from "@/lib/constant/shop";

export async function GET() {
  const response: ProductsResponse = {
    items: featuredProducts,
    total: featuredProducts.length,
  };

  return NextResponse.json(response);
}
