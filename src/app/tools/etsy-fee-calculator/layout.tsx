import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Etsy Fee Calculator - Know Your Real Profit | SellerKit",
  description:
    "Free Etsy fee calculator. See exactly how much Etsy takes from each sale — listing fees, transaction fees, payment processing, offsite ads, and your real net profit.",
  keywords: [
    "etsy fee calculator",
    "etsy fees",
    "etsy profit calculator",
    "etsy seller tools",
    "ecommerce profit calculator",
  ],
};

export default function EtsyFeeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
