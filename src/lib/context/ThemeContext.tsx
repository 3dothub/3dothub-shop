"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { colorTokens } from "@/lib/constant/shop";

export type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("light");

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", mode);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    const tokens = colorTokens[theme];
    root.style.setProperty("--app-bg", tokens.appBg);
    root.style.setProperty("--app-fg", tokens.appFg);
    root.style.setProperty("--surface", tokens.surface);
    root.style.setProperty("--surface-strong", tokens.surfaceStrong);
    root.style.setProperty("--muted", tokens.muted);
    root.style.setProperty("--accent", tokens.accent);
    root.style.setProperty("--accent-strong", tokens.accentStrong);
    root.style.setProperty("--border", tokens.border);
    root.style.setProperty("--glass", tokens.glass);
    root.style.setProperty("--hero-bg", tokens.heroBg);
    root.style.setProperty("--hero-fg", tokens.heroFg);
    root.style.setProperty("--hero-muted", tokens.heroMuted);
  }, [theme]);

  const value = { theme, setTheme, toggleTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
