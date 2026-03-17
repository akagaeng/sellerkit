import type { ToolMeta } from "./types";

export const tools: ToolMeta[] = [
  {
    slug: "etsy-fee-calculator",
    name: "Etsy Fee Calculator",
    description:
      "See exactly how much Etsy takes from each sale — listing fees, transaction fees, payment processing, and your real net profit.",
    category: "Etsy",
    isPro: false,
  },
];

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(): Record<string, ToolMeta[]> {
  return tools.reduce(
    (acc, tool) => {
      if (!acc[tool.category]) acc[tool.category] = [];
      acc[tool.category].push(tool);
      return acc;
    },
    {} as Record<string, ToolMeta[]>,
  );
}
