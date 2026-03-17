import { PRO_STORAGE_KEY } from "./constants";
import type { ProStatus } from "./types";

export function getProStatus(): ProStatus {
  if (typeof window === "undefined") return { isPro: false, email: null };
  try {
    const stored = localStorage.getItem(PRO_STORAGE_KEY);
    if (!stored) return { isPro: false, email: null };
    return JSON.parse(stored);
  } catch {
    return { isPro: false, email: null };
  }
}

export function setProStatus(email: string, isPro: boolean) {
  localStorage.setItem(PRO_STORAGE_KEY, JSON.stringify({ email, isPro }));
}

export function clearProStatus() {
  localStorage.removeItem(PRO_STORAGE_KEY);
}
