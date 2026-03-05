import { Item, ItemStatus, getAllItems } from "@/lib/data";

export type ReportFilters = {
  status: ItemStatus | "all";
  category: Item["category"] | "all";
  owner: string | "all";
  from?: string; // ISO date yyyy-mm-dd
  to?: string;   // ISO date yyyy-mm-dd
};

export function defaultFilters(): ReportFilters {
  return { status: "all", category: "all", owner: "all" };
}

export function applyFilters(items: Item[], f: ReportFilters) {
  return items.filter((it) => {
    if (f.status !== "all" && it.status !== f.status) return false;
    if (f.category !== "all" && it.category !== f.category) return false;
    if (f.owner !== "all" && it.owner !== f.owner) return false;
    if (f.from && it.date < f.from) return false;
    if (f.to && it.date > f.to) return false;
    return true;
  });
}

export function computeKpis(items: Item[]) {
  const total = items.length;
  const open = items.filter((x) => x.status === "open").length;
  const closed = items.filter((x) => x.status === "closed").length;
  const amountTotal = items.reduce((sum, x) => sum + x.amount, 0);
  return { total, open, closed, amountTotal };
}

export function groupByCategory(items: Item[]) {
  const map = new Map<string, { category: string; count: number; amount: number }>();
  for (const it of items) {
    const key = it.category;
    const prev = map.get(key) ?? { category: key, count: 0, amount: 0 };
    prev.count += 1;
    prev.amount += it.amount;
    map.set(key, prev);
  }
  return Array.from(map.values()).sort((a, b) => a.category.localeCompare(b.category));
}

export function getOwners() {
  const owners = new Set(getAllItems().map((x) => x.owner));
  return Array.from(owners).sort();
}