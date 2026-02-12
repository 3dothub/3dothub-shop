"use client";

import { Button, Card, Rate, Tag } from "antd";
import Image from "next/image";
import type { Product } from "@/lib/types/product";
import { addToCart } from "@/lib/redux/slice/cartSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { siteConfig } from "@/lib/constant/shop";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  return (
    <Card
      className="reveal h-full rounded-3xl border border-(--border) bg-(--glass) backdrop-blur shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
      data-reveal
      styles={{
        body: { padding: 16, display: "flex", flexDirection: "column", gap: 12 },
      }}
    >
      <div
        className="relative flex h-40 items-center justify-center overflow-hidden rounded-2xl text-sm"
        style={{
          background:
            "linear-gradient(135deg, var(--accent) 0%, var(--surface) 55%, var(--accent-strong) 100%)",
          color: "var(--muted)",
        }}
      >
        <span className="absolute left-3 top-3 rounded-full bg-(--accent) px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-(--app-fg)">
          New
        </span>
        <Image
          src={product.imageUrl ?? siteConfig.defaultImage}
          alt={product.title}
          width={200}
          height={200}
          className="h-28 w-28 object-contain"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div>
          <p className="text-sm text-(--muted)">
            {product.category ?? "Essentials"}
          </p>
          <h3 className="text-base font-semibold text-(--app-fg)">
            {product.title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Rate disabled value={product.rating ?? 4.6} allowHalf />
          <span className="text-xs text-(--muted)">({product.rating ?? 4.6})</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-(--app-fg)">
            {formatCurrency(product.price)}
          </p>
          <Tag color="gold">Fast ship</Tag>
        </div>
      </div>
      <Button
        type="primary"
        block
        onClick={() => dispatch(addToCart(product))}
        className="border-none bg-(--accent) text-(--app-fg) hover:bg-(--accent-strong)!"
      >
        Add to cart
      </Button>
    </Card>
  );
}
