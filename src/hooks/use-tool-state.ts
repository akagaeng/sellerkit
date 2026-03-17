"use client";

import { useCallback, useState } from "react";

export function useToolState<TInput, TResult>(
  calculate: (input: TInput) => TResult,
) {
  const [input, setInput] = useState<TInput | null>(null);
  const [result, setResult] = useState<TResult | null>(null);

  const run = useCallback(
    (data: TInput) => {
      setInput(data);
      setResult(calculate(data));
    },
    [calculate],
  );

  const reset = useCallback(() => {
    setInput(null);
    setResult(null);
  }, []);

  return { input, result, run, reset };
}
