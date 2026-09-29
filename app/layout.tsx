import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valoria’s Cafe | A little pause. A lovely cup.",
  description: "Explore the menu, request a table, and create your bill at Valoria’s Cafe.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
