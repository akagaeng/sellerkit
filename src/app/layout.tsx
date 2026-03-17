import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SellerKit - Free Tools for Ecommerce Sellers",
  description:
    "Know your real profit. Free calculators and tools for Etsy, Amazon, eBay, and Shopify sellers.",
};

function Header() {
  return (
    <header className="border-b border-border">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          SellerKit
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          <Link href="/tools/etsy-fee-calculator" className="hover:text-foreground transition-colors">
            Etsy Fees
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} SellerKit. Free tools for ecommerce sellers.</p>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
