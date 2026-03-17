const STORAGE_KEY = "sellerkit_usage";
const FREE_LIMIT = 10;

interface UsageData {
  count: number;
  resetDate: string;
}

function getMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth()}`;
}

export function getUsage(): UsageData {
  if (typeof window === "undefined") return { count: 0, resetDate: getMonthKey() };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { count: 0, resetDate: getMonthKey() };
    const data: UsageData = JSON.parse(raw);
    if (data.resetDate !== getMonthKey()) {
      return { count: 0, resetDate: getMonthKey() };
    }
    return data;
  } catch {
    return { count: 0, resetDate: getMonthKey() };
  }
}

export function incrementUsage(): UsageData {
  const current = getUsage();
  const updated = { count: current.count + 1, resetDate: getMonthKey() };
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function isAtLimit(): boolean {
  return getUsage().count >= FREE_LIMIT;
}

export function remainingUses(): number {
  return Math.max(0, FREE_LIMIT - getUsage().count);
}

export const FREE_TIER_LIMIT = FREE_LIMIT;
