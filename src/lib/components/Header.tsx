"use client";

import { Badge, Button } from "antd";
import {
  SearchOutlined,
  ShoppingOutlined,
  UserOutlined,
  HeartOutlined,
  MoonOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "@/lib/redux/hooks";
import { navLinks, siteConfig } from "@/lib/constant/shop";
import { useTheme } from "@/lib/context/ThemeContext";

export default function Header() {
  const totalItems = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 border-b border-(--border) bg-(--glass) backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-3 py-1">
        <div className="flex items-center gap-6 text-sm text-(--muted)">
          <span className="text-base font-semibold tracking-tight text-(--app-fg)">
            #DotWraps
          </span>
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <span key={link} className="cursor-pointer hover:text-(--app-fg)">
                {link}
              </span>
            ))}
          </div>
        </div>

        <div
          className={`flex items-center gap-3 ${
            theme === "dark" ? "text-white" : "text-(--muted)"
          }`}
        >
          <Button type="text" shape="circle" icon={<SearchOutlined />} />
          <Button type="text" shape="circle" icon={<HeartOutlined />} />
          <Badge count={totalItems} size="small" color="#0f6f63">
            <Button type="text" shape="circle" icon={<ShoppingOutlined />} />
          </Badge>
          <Button type="text" shape="circle" icon={<UserOutlined />} />
          <Button
            type="text"
            shape="circle"
            icon={<MoonOutlined />}
            aria-label="Toggle theme"
            onClick={toggleTheme}
          />
        </div>
      </div>
    </header>
  );
}
