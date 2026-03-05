"use client";

import * as React from "react";
import { getAllItems } from "@/lib/data";
import { defaultFilters, getOwners, type ReportFilters } from "@/lib/report";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// mini-store
let listeners: Array<() => void> = [];
let current: ReportFilters = defaultFilters();

export function useReportFilters() {
  const [, force] = React.useState(0);
  React.useEffect(() => {
    const fn = () => force((x) => x + 1);
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  }, []);
  return {
    filters: current,
    setFilters: (next: ReportFilters) => {
      current = next;
      listeners.forEach((l) => l());
    },
  };
}

const labelStyle = {
  color: "#755E5E",
  fontFamily: "'Geist', sans-serif",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
};

export function ReportFilters() {
  const { filters, setFilters } = useReportFilters();
  const owners = React.useMemo(() => getOwners(), []);
  const items = React.useMemo(() => getAllItems(), []);
  const categories = React.useMemo(() => {
    const s = new Set(items.map((x) => x.category));
    return Array.from(s).sort();
  }, [items]);

  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "rgba(75,63,62,0.10)", border: "1px solid #4B3F3E" }}
    >
      <div
        className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
        style={{ color: "#F54C49", fontFamily: "'Geist', sans-serif" }}
      >
        Filtros
      </div>
      <div className="grid gap-4 md:grid-cols-5">
        <div className="space-y-2">
          <Label style={labelStyle}>Estado</Label>
          <Select
            value={filters.status}
            onValueChange={(v) => setFilters({ ...filters, status: v as any })}
          >
            <SelectTrigger
              style={{
                background: "rgba(51,34,34,0.5)",
                border: "1px solid #4B3F3E",
                color: "#F8F6F6",
                fontFamily: "'Geist', sans-serif",
                fontSize: "13px",
              }}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent style={{ background: "#1a1010", border: "1px solid #4B3F3E" }}>
              <SelectItem value="all" style={{ color: "#F8F6F6" }}>Todos</SelectItem>
              <SelectItem value="open" style={{ color: "#F54C49" }}>Abiertas</SelectItem>
              <SelectItem value="closed" style={{ color: "#755E5E" }}>Cerradas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label style={labelStyle}>Categoría</Label>
          <Select
            value={filters.category}
            onValueChange={(v) => setFilters({ ...filters, category: v as any })}
          >
            <SelectTrigger
              style={{
                background: "rgba(51,34,34,0.5)",
                border: "1px solid #4B3F3E",
                color: "#F8F6F6",
                fontFamily: "'Geist', sans-serif",
                fontSize: "13px",
              }}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent style={{ background: "#1a1010", border: "1px solid #4B3F3E" }}>
              <SelectItem value="all" style={{ color: "#F8F6F6" }}>Todas</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c} style={{ color: "#A06665" }}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label style={labelStyle}>Responsable</Label>
          <Select
            value={filters.owner}
            onValueChange={(v) => setFilters({ ...filters, owner: v as any })}
          >
            <SelectTrigger
              style={{
                background: "rgba(51,34,34,0.5)",
                border: "1px solid #4B3F3E",
                color: "#F8F6F6",
                fontFamily: "'Geist', sans-serif",
                fontSize: "13px",
              }}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent style={{ background: "#1a1010", border: "1px solid #4B3F3E" }}>
              <SelectItem value="all" style={{ color: "#F8F6F6" }}>Todos</SelectItem>
              {owners.map((o) => (
                <SelectItem key={o} value={o} style={{ color: "#A06665" }}>{o}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label style={labelStyle}>Desde</Label>
          <Input
            type="date"
            value={filters.from ?? ""}
            onChange={(e) => setFilters({ ...filters, from: e.target.value || undefined })}
            style={{
              background: "rgba(51,34,34,0.5)",
              border: "1px solid #4B3F3E",
              color: "#F8F6F6",
              fontFamily: "'Geist', sans-serif",
              fontSize: "13px",
            }}
          />
        </div>

        <div className="space-y-2">
          <Label style={labelStyle}>Hasta</Label>
          <div className="flex gap-2">
            <Input
              type="date"
              value={filters.to ?? ""}
              onChange={(e) => setFilters({ ...filters, to: e.target.value || undefined })}
              style={{
                background: "rgba(51,34,34,0.5)",
                border: "1px solid #4B3F3E",
                color: "#F8F6F6",
                fontFamily: "'Geist', sans-serif",
                fontSize: "13px",
              }}
            />
            <Button
              variant="ghost"
              onClick={() => setFilters(defaultFilters())}
              title="Restablecer filtros"
              style={{
                border: "1px solid #4B3F3E",
                color: "#755E5E",
                fontFamily: "'Geist', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                flexShrink: 0,
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
