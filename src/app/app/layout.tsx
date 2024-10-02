import type { Metadata } from "next";
import "@/app/globals.css";
import { Root } from "@/components/TgRoot";

export const metadata: Metadata = {
  title: "CoinRush",
  description: "coinrush",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Root>{children}</Root></body>
    </html>
  );
}
