import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "antd/dist/reset.css";
import "./globals.css";
import Providers from "@/app/providers";
import AntdRegistryWrapper from "@/app/antd-registry";
import Header from "@/lib/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3DotWraps",
  description: "Gift shop landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-(--app-bg) text-(--app-fg) antialiased`}
      >
        <AntdRegistryWrapper>
          <Providers>
            <div className="min-h-dvh">
              <Header />
              <main className="w-full px-0 py-0 md:px-0 md:py-0">
                {children}
              </main>
            </div>
          </Providers>
        </AntdRegistryWrapper>
      </body>
    </html>
  );
}
