"use client";

import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import {
  announcement,
  arrivals,
  featuredItems,
  heroGallery,
  heroHighlights,
  locationInfo,
  siteConfig,
  shippingBanner,
  stands,
} from "@/lib/constant/shop";
import useScrollReveal from "@/lib/hooks/useScrollReveal";

export default function Home() {
  useScrollReveal([]);

  return (
    <div className="flex flex-col gap-12">
      <section className="reveal bg-(--hero-bg) text-(--hero-fg)" data-reveal>
        <div className="flex w-full flex-col items-center gap-10 lg:flex-row">
          <div className="w-full lg:w-1/2 px-4">
            <span className="text-(--hero-muted) text-xs uppercase tracking-[0.2em]">
              {announcement.eyebrow}
            </span>
            <h1 className="mt-4 text-4xl font-semibold leading-tight lg:text-6xl">
              {announcement.title}
            </h1>
            <p className="mt-6 text-base text-(--hero-muted)">
              {announcement.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button type="primary" className="rounded-none bg-(--accent) px-8 py-4 text-white hover:bg-(--accent-strong)!">
                {announcement.ctaPrimary}
              </Button>
              <Button type="default" className="rounded-none border border-white text-white hover:border-white! hover:text-white!">
                {announcement.ctaSecondary}
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2 text-xs text-(--hero-muted)">
              {heroHighlights.map((item) => (
                <span key={item} className="rounded-full border border-white/30 px-3 py-1">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-10">
            <div className="relative h-125 w-full overflow-hidden lg:h-[700px]">
              <Image
                src={heroGallery.main}
                alt="Main gift"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      <section className="reveal w-full px-6" data-reveal>
        <div className="flex flex-col items-end justify-between gap-4 md:flex-row">
          <div>
            <h2 className="text-3xl font-semibold text-(--app-fg)">Featured</h2>
            <div className="mt-3 h-1 w-20 bg-(--accent)" />
          </div>
          <span className="text-sm uppercase tracking-[0.2em] text-(--muted)">view all</span>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featuredItems.map((item) => (
            <div key={item.title} className="group">
              <div className="relative mb-5 aspect-[4/5] overflow-hidden bg-(--surface-strong)">
                <span className="absolute left-4 top-4 z-10 bg-(--accent) px-2 py-1 text-[10px] uppercase tracking-widest text-white">
                  Limited
                </span>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
                  <button className="bg-white px-6 py-3 text-sm font-medium text-(--app-fg)">
                    Quick View
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-(--app-fg)">{item.title}</h3>
              <p className="text-sm text-(--muted)">{item.subtitle}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-medium text-(--app-fg)">₹{item.price}</span>
                <span className="text-xs uppercase tracking-wide text-(--muted)">customize</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="reveal w-full px-6" data-reveal>
        <div className="rounded-md border border-(--border) bg-(--surface) px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="rounded bg-(--surface-strong) px-2 py-1 text-xs">+</span>
            <input
              placeholder={siteConfig.searchPlaceholder}
              className="w-full bg-transparent text-sm text-(--app-fg) outline-none"
            />
            <Button size="small" type="primary" className="rounded-none bg-(--accent) px-4 text-white">
              <SearchOutlined />
            </Button>
          </div>
        </div>
      </section>

      <section className="reveal w-full px-6" data-reveal>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-(--app-fg)">Colorful New Arrivals</h2>
          <span className="text-sm text-(--muted)">view all</span>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {arrivals.map((item) => (
            <div key={item.title} className="relative overflow-hidden rounded-lg">
              <Image
                src={item.image}
                alt={item.title}
                width={320}
                height={320}
                className="h-52 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs opacity-80">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="reveal bg-(--surface-strong) py-10" data-reveal>
        <div className="w-full px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-(--app-fg)">Gift stands</h2>
            <span className="text-sm text-(--muted)">more →</span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {stands.map((item) => (
              <div key={item.title} className="rounded-xl bg-(--surface) p-3 shadow-sm">
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={320}
                    height={320}
                    className="h-44 w-full object-cover"
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-(--app-fg)">{item.title}</p>
                <p className="text-xs text-(--muted)">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal w-full px-6" data-reveal>
        <div className="rounded-lg bg-[#e8c6b8] px-6 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-(--app-fg)">{shippingBanner.title}</p>
              <p className="text-xs text-(--muted)">{shippingBanner.description}</p>
            </div>
            <div className="text-xs text-(--muted)">
              <p>{shippingBanner.line1}</p>
              <p>{shippingBanner.line2}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="reveal w-full px-6" data-reveal>
        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <div className="rounded-lg bg-(--surface) p-6">
            <p className="text-sm font-semibold text-(--app-fg)">{locationInfo.title}</p>
            <p className="text-xs text-(--muted)">{locationInfo.address}</p>
            <p className="mt-2 text-xs text-(--muted)">{locationInfo.hours}</p>
          </div>
          <div className="overflow-hidden rounded-lg">
            <Image
              src={locationInfo.mapImage}
              alt="Map"
              width={800}
              height={320}
              className="h-48 w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="reveal w-full px-6" data-reveal>
        <div className="rounded-lg bg-(--surface) p-6 md:p-10">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                About us
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-(--app-fg)">
                Crafted with care, wrapped with love.
              </h3>
              <p className="mt-4 text-sm text-(--muted)">
                We are a boutique gift studio creating personalized frames, tiny
                art, and celebration keepsakes. Every order is hand-finished and
                curated to feel thoughtful, warm, and memorable.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="rounded-lg border border-(--border) bg-(--surface-strong) p-4">
                <p className="text-sm font-semibold text-(--app-fg)">Made in India</p>
                <p className="text-xs text-(--muted)">
                  Crafted by local artists and makers.
                </p>
              </div>
              <div className="rounded-lg border border-(--border) bg-(--surface-strong) p-4">
                <p className="text-sm font-semibold text-(--app-fg)">Gift-ready</p>
                <p className="text-xs text-(--muted)">
                  Premium packaging and handwritten notes.
                </p>
              </div>
              <div className="rounded-lg border border-(--border) bg-(--surface-strong) p-4">
                <p className="text-sm font-semibold text-(--app-fg)">Fast dispatch</p>
                <p className="text-xs text-(--muted)">
                  Ships within 48 hours with tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
