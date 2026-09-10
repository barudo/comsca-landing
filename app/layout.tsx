import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "COMSCA — Small savings. Stronger communities.",
  description: "Discover how Community Managed Savings and Credit Associations help people save together, access group loans, and support their communities.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
