// Placeholder for Pro tier check. Will integrate Paddle/Polar later.
// For now, checks localStorage for a "pro" flag.

const PRO_KEY = "sellerkit_pro";

export function isPro(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(PRO_KEY) === "true";
}

export function getProEmail(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("sellerkit_pro_email");
}
