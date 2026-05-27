import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "產業知識地圖 | AI & 半導體供應鏈",
  description: "互動式產業知識地圖 — 探索 AI 與半導體產業的供應鏈關係、關鍵公司財務數據與未來預測",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
