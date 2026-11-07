import type { Metadata } from "next";
import { Archivo, Space_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "700", "800", "900"],
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "3CM | Rice, Spaghetti, Cakes & Drinks",
  description: "Jollof rice, fried rice, stir-fried spaghetti, cakes and drinks from 3CM. Browse the menu and order on WhatsApp.",
  openGraph: {
    title: "3CM | Rice, Spaghetti, Cakes & Drinks",
    description: "Browse the 3CM menu and review your order.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${spaceMono.variable}`}>{children}</body>
    </html>
  );
}
