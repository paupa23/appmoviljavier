"use client";

import * as React from "react";
import { getAllItems } from "@/lib/data";
import { applyFilters, computeKpis } from "@/lib/report";
import { useReportFilters } from "./report-filters";
import { eur } from "@/lib/utils";

const kpiConfig = [
  { key: "total",       label: "Registros",     accent: false },
  { key: "open",        label: "Abiertas",      accent: true  },
  { key: "closed",      label: "Cerradas",      accent: false },
  { key: "amountTotal", label: "Importe total",  accent: false },
] as const;

export function KpiCards() {
  const { filters } = useReportFilters();
  const items = React.useMemo(() => applyFilters(getAllItems(), filters), [filters]);
  const kpi = React.useMemo(() => computeKpis(items), [items]);

  const values: Record<string, string | number> = {
    total:       kpi.total,
    open:        kpi.open,
    closed:      kpi.closed,
    amountTotal: eur(kpi.amountTotal),
  };

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {kpiConfig.map((cfg) => (
        <div
          key={cfg.key}
          className="rounded-xl p-5 flex flex-col gap-2 transition-all duration-200"
          style={{
            background: cfg.accent
              ? "linear-gradient(135deg, rgba(245,76,73,0.15) 0%, rgba(202,96,94,0.06) 100%)"
              : "rgba(75,63,62,0.12)",
            border: cfg.accent
              ? "1px solid rgba(245,76,73,0.25)"
              : "1px solid #4B3F3E",
          }}
        >
          <span
            className="text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{
              color: cfg.accent ? "#F54C49" : "#755E5E",
              fontFamily: "'Geist', sans-serif",
            }}
          >
            {cfg.label}
          </span>
          <span
            className="text-3xl font-bold leading-none"
            style={{
              color: cfg.accent ? "#F54C49" : "#F8F6F6",
              fontFamily: "'Geist', sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            {values[cfg.key]}
          </span>
        </div>
      ))}
    </div>
  );
}
