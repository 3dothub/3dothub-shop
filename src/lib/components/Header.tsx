"use client";

import { Badge, Button } from "antd";
import {
  SearchOutlined,
  ShoppingOutlined,
  UserOutlined,
  HeartOutlined,
  MoonOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { useTheme } from "@/lib/context/ThemeContext";
import { useGetStorefrontQuery } from "@/lib/redux/endpoints/productsApi";

export default function Header() {
  const totalItems = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const { theme, toggleTheme } = useTheme();
  const { data } = useGetStorefrontQuery();
  const navLinks = data?.navLinks ?? [];
  const siteName = data?.siteName ?? "3DotWraps";
  const headerSections = useMemo(() => data?.headerSections ?? [], [data?.headerSections]);
  const [hoveredSectionId, setHoveredSectionId] = useState("");
  const [hoveredSubSection, setHoveredSubSection] = useState("");
  const [isDesktopView, setIsDesktopView] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const syncDesktopView = () => {
      setIsDesktopView(mediaQuery.matches);
    };

    syncDesktopView();
    mediaQuery.addEventListener("change", syncDesktopView);

    return () => {
      mediaQuery.removeEventListener("change", syncDesktopView);
    };
  }, []);

  const resolvedSectionId =
    headerSections.some((item) => item.id === hoveredSectionId)
      ? hoveredSectionId
      : "";

  const activeSection = useMemo(
    () => headerSections.find((item) => item.id === resolvedSectionId),
    [headerSections, resolvedSectionId]
  );

  const resolvedSubSection =
    activeSection?.subSections?.includes(hoveredSubSection)
      ? hoveredSubSection
      : (activeSection?.subSections?.[0] ?? "");

  const relatedSubSections = useMemo(() => {
    if (!activeSection?.subSections?.length) {
      return [];
    }

    const selectedIndex = Math.max(
      0,
      activeSection.subSections.indexOf(resolvedSubSection)
    );

    return activeSection.subSections.slice(selectedIndex, selectedIndex + 6);
  }, [activeSection, resolvedSubSection]);

  const visibleSubSections = useMemo(
    () => activeSection?.subSections?.slice(0, 7) ?? [],
    [activeSection]
  );

  return (
    <header className="sticky top-0 z-20 border-b border-(--border) bg-(--surface)">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2">
        <div className="flex items-center gap-6 text-sm text-(--muted)">
          <span className="text-base font-semibold tracking-tight text-(--app-fg)">
            {siteName}
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

      {headerSections.length > 0 && isDesktopView ? (
        <div
          className="relative hidden border-t border-(--border) bg-(--glass) backdrop-blur md:block"
          onMouseLeave={() => setHoveredSectionId("")}
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-2">
            <div className="flex flex-wrap gap-3">
              {headerSections.map((section) => {
                const isActive = section.id === resolvedSectionId;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onMouseEnter={() => {
                      setHoveredSectionId(section.id);
                      const sectionData = headerSections.find((item) => item.id === section.id);
                      setHoveredSubSection(sectionData?.subSections?.[0] ?? "");
                    }}
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                      isActive
                        ? "bg-(--surface-strong) text-(--app-fg)"
                        : "text-(--muted) hover:bg-(--surface-strong)"
                    }`}
                  >
                    {section.title}
                  </button>
                );
              })}
            </div>

            {activeSection?.subSections?.length ? (
              <div className="absolute left-0 right-0 top-full z-30 mt-1 px-4">
                <div className="mx-auto grid w-full max-w-7xl overflow-hidden rounded-2xl border border-(--border) bg-(--surface) shadow-md md:grid-cols-[300px_1fr]">
                  <div className="border-r border-(--border) bg-(--surface-strong) p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-(--muted)">
                      Categories
                    </p>
                    <div className="mt-3 space-y-1 pr-1 text-sm text-(--muted)">
                      {visibleSubSections.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onMouseEnter={() => setHoveredSubSection(item)}
                          className={`block w-full truncate rounded-lg px-3 py-1.5 text-left leading-5 transition ${
                            item === resolvedSubSection
                              ? "bg-(--surface) text-(--app-fg)"
                              : "hover:bg-(--surface) hover:text-(--app-fg)"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-2xl font-semibold text-(--app-fg)">
                      {resolvedSubSection || activeSection.title}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-(--muted)">
                      {activeSection.title}
                    </p>
                    <div className="mt-3 space-y-2 text-sm text-(--muted)">
                      {relatedSubSections.map((item) => (
                        <p key={item} className="flex items-center gap-2 leading-5">
                          <span className="h-1.5 w-1.5 rounded-full bg-(--border)" />
                          <span className="truncate">{item}</span>
                        </p>
                      ))}
                    </div>
                    <button className="mt-4 flex w-full items-center justify-between rounded-xl border border-(--border) bg-(--surface-strong) px-4 py-3 text-left text-sm font-semibold text-(--app-fg)">
                      <span>View all items</span>
                      <RightOutlined className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
