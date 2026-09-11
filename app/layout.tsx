import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "COMSCA — Clear records. Stronger groups.",
  description: "COMSCA is a digital savings and credit management platform that helps community groups manage members, savings, loans, repayments, financial records, and cycle distributions in one secure system.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
