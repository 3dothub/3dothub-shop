import { NextResponse } from "next/server";
import type { ProductsResponse } from "@/lib/types/product";
import { getProducts } from "@/lib/database/repository";

const toProduct = (item: Record<string, unknown>) => ({
  _id: String(item.id ?? item._id ?? ""),
  title: String(item.name ?? item.title ?? "Product"),
  price: Number(item.finalPrice ?? item.price ?? item.pdfPrice ?? 0),
  imageUrl: String(item.image ?? ""),
  rating: Number(item.rating ?? 0),
  category: String(item.category ?? "Uncategorized"),
  stock: Number(item.stock ?? 50),
  isTrending: Boolean(item.isTrending),
  isBestseller: Boolean(item.isBestseller),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter");

  const allItems = (await getProducts()).map(toProduct);
  const items =
    filter === "trending"
      ? allItems.filter((item) => item.isTrending)
      : filter === "bestseller"
      ? allItems.filter((item) => item.isBestseller)
      : allItems;

  const response: ProductsResponse = {
    items,
    total: items.length,
  };

  return NextResponse.json(response);
}
