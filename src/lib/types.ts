export interface ToolMeta {
  slug: string;
  name: string;
  description: string;
  category: string;
  isPro: boolean;
}

export interface UsageRecord {
  toolSlug: string;
  count: number;
  lastUsed: number;
}

export interface ProStatus {
  isPro: boolean;
  email: string | null;
}
