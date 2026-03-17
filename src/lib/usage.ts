import { FREE_USAGE_LIMIT, USAGE_STORAGE_KEY } from "./constants";

interface DailyUsage {
  [toolSlug: string]: { count: number; date: string };
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function getUsageData(): DailyUsage {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(USAGE_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function setUsageData(data: DailyUsage) {
  localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(data));
}

export function getUsageCount(toolSlug: string): number {
  const data = getUsageData();
  const entry = data[toolSlug];
  if (!entry || entry.date !== getToday()) return 0;
  return entry.count;
}

export function incrementUsage(toolSlug: string): number {
  const data = getUsageData();
  const today = getToday();
  const entry = data[toolSlug];
  const count = entry && entry.date === today ? entry.count + 1 : 1;
  data[toolSlug] = { count, date: today };
  setUsageData(data);
  return count;
}

export function hasReachedLimit(toolSlug: string): boolean {
  return getUsageCount(toolSlug) >= FREE_USAGE_LIMIT;
}

export function getRemainingUses(toolSlug: string): number {
  return Math.max(0, FREE_USAGE_LIMIT - getUsageCount(toolSlug));
}
