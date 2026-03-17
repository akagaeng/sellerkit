"use client";

import { useCallback, useState } from "react";
import { getUsageCount, incrementUsage, hasReachedLimit, getRemainingUses } from "@/lib/usage";
import { getProStatus } from "@/lib/pro";

export function useUsage(toolSlug: string) {
  const [count, setCount] = useState(() => getUsageCount(toolSlug));
  const pro = getProStatus();

  const track = useCallback(() => {
    if (pro.isPro) return true;
    if (hasReachedLimit(toolSlug)) return false;
    const newCount = incrementUsage(toolSlug);
    setCount(newCount);
    return true;
  }, [toolSlug, pro.isPro]);

  return {
    count,
    remaining: pro.isPro ? Infinity : getRemainingUses(toolSlug),
    isLimited: !pro.isPro && hasReachedLimit(toolSlug),
    isPro: pro.isPro,
    track,
  };
}
