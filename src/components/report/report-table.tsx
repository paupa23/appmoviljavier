"use client";

import * as React from "react";
import Link from "next/link";
import { getAllItems } from "@/lib/data";
import { applyFilters } from "@/lib/report";
import { useReportFilters } from "./report-filters";
import { eur } from "@/lib/utils";

const thStyle = {
  color: "#755E5E",
  fontFamily: "'Geist', sans-serif",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  padding: "10px 14px",
  borderBottom: "1px solid #4B3F3E",
  background: "rgba(51,34,34,0.3)",
};

export function ReportTable() {
  const { filters } = useReportFilters();
  const items = React.useMemo(() => applyFilters(getAllItems(), filters), [filters]);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid #4B3F3E" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid #4B3F3E", background: "rgba(51,34,34,0.3)" }}
      >
        <div>
          <span
            className="text-[10px] font-bold tracking-[0.2em] uppercase block mb-0.5"
            style={{ color: "#F54C49", fontFamily: "'Geist', sans-serif" }}
          >
            Datos
          </span>
          <span
            className="text-base font-bold"
            style={{ color: "#F8F6F6", fontFamily: "'Geist', sans-serif", letterSpacing: "-0.01em" }}
          >
            Registros filtrados
          </span>
        </div>
        <span
          className="text-xs font-bold tracking-wider px-3 py-1.5 rounded-lg"
          style={{
            background: "rgba(245,76,73,0.12)",
            color: "#F54C49",
            border: "1px solid rgba(245,76,73,0.2)",
            fontFamily: "'Geist', sans-serif",
          }}
        >
          {items.length} resultados
        </span>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {["ID", "Título", "Categoría", "Responsable", "Fecha", "Importe"].map((h) => (
                <th key={h} style={thStyle} className="text-left whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr
                key={it.id}
                style={{
                  background: i % 2 === 0 ? "rgba(75,63,62,0.06)" : "transparent",
                  borderBottom: "1px solid rgba(75,63,62,0.3)",
                }}
                className="transition-colors duration-100 hover:bg-[rgba(245,76,73,0.04)]"
              >
                <td style={{ padding: "10px 14px" }}>
                  <Link
                    href={`/detalle/${it.id}`}
                    className="font-bold text-xs"
                    style={{ color: "#F54C49", fontFamily: "'Geist', sans-serif" }}
                  >
                    #{it.id}
                  </Link>
                </td>
                <td
                  className="max-w-[220px] truncate text-sm"
                  style={{ padding: "10px 14px", color: "#F8F6F6", fontFamily: "'Geist', sans-serif" }}
                >
                  {it.title}
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <span
                    className="text-[10px] font-bold tracking-wider px-2 py-1 rounded"
                    style={{
                      background: "rgba(117,94,94,0.2)",
                      color: "#A06665",
                      fontFamily: "'Geist', sans-serif",
                    }}
                  >
                    {it.category}
                  </span>
                </td>
                <td
                  className="text-sm"
                  style={{ padding: "10px 14px", color: "#A06665", fontFamily: "'Noto Sans JP', sans-serif" }}
                >
                  {it.owner}
                </td>
                <td
                  className="text-xs whitespace-nowrap"
                  style={{ padding: "10px 14px", color: "#755E5E", fontFamily: "'Geist', sans-serif" }}
                >
                  {new Date(it.date).toLocaleDateString("es-ES")}
                </td>
                <td
                  className="text-right text-sm font-semibold"
                  style={{ padding: "10px 14px", color: "#F8F6F6", fontFamily: "'Geist', sans-serif" }}
                >
                  {eur(it.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
