"use client";

import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { store } from "@/lib/redux/store";
import { ThemeProvider } from "@/lib/context/ThemeContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "var(--accent)",
              borderRadius: 12,
              fontFamily: "var(--font-geist-sans)",
              colorInfo: "var(--accent)",
              colorSuccess: "#16a34a",
              colorWarning: "var(--accent)",
              colorTextBase: "var(--app-fg)",
              colorBgBase: "var(--surface)",
              colorBgElevated: "var(--surface)",
              colorBorder: "var(--border)",
            },
          }}
        >
          {children}
        </ConfigProvider>
      </ThemeProvider>
    </Provider>
  );
}
