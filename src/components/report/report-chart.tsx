"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { getAllItems } from "@/lib/data";
import { applyFilters, groupByCategory } from "@/lib/report";
import { useReportFilters } from "./report-filters";
import { eur } from "@/lib/utils";

const BRAND_COLORS = ["#F54C49", "#CA605E", "#A06665", "#755E5E", "#4B3F3E"];

export function ReportChart() {
  const { filters } = useReportFilters();
  const items = React.useMemo(() => applyFilters(getAllItems(), filters), [filters]);
  const data = React.useMemo(() => groupByCategory(items), [items]);

  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "rgba(75,63,62,0.10)", border: "1px solid #4B3F3E" }}
    >
      <div
        className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1"
        style={{ color: "#F54C49", fontFamily: "'Geist', sans-serif" }}
      >
        Análisis
      </div>
      <h3
        className="text-base font-bold mb-5"
        style={{ color: "#F8F6F6", fontFamily: "'Geist', sans-serif", letterSpacing: "-0.01em" }}
      >
        Distribución por categoría
      </h3>

      <div style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <XAxis
              dataKey="category"
              tick={{
                fill: "#755E5E",
                fontSize: 11,
                fontFamily: "'Geist', sans-serif",
                fontWeight: 600,
              }}
              axisLine={{ stroke: "#4B3F3E" }}
              tickLine={false}
            />
            <YAxis
              tick={{
                fill: "#4B3F3E",
                fontSize: 10,
                fontFamily: "'Geist', sans-serif",
              }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "#1a1010",
                border: "1px solid #4B3F3E",
                borderRadius: "0.75rem",
                fontFamily: "'Geist', sans-serif",
                fontSize: "12px",
                color: "#F8F6F6",
              }}
              formatter={(value: any, name: any) =>
                name === "amount" ? [eur(Number(value)), "Importe"] : [value, "Registros"]
              }
              cursor={{ fill: "rgba(245,76,73,0.05)" }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={40}>
              {data.map((_, i) => (
                <Cell key={i} fill={BRAND_COLORS[i % BRAND_COLORS.length]} />
              ))}
            </Bar>
            <Bar dataKey="amount" radius={[4, 4, 0, 0]} maxBarSize={40}>
              {data.map((_, i) => (
                <Cell key={i} fill={BRAND_COLORS[i % BRAND_COLORS.length]} opacity={0.45} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Leyenda */}
      <div className="flex gap-5 mt-3">
        {[
          { color: "#F54C49", label: "Nº registros" },
          { color: "#F54C49", label: "Importe (€)", opacity: "0.45" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span
              className="w-3 h-2 rounded-sm"
              style={{ background: l.color, opacity: l.opacity ?? 1 }}
            />
            <span
              className="text-[10px]"
              style={{ color: "#755E5E", fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              {l.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
