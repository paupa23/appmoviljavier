import { PageHeader } from "@/components/page-header";
import { getAllItems } from "@/lib/data";
import { computeKpis } from "@/lib/report";
import { eur } from "@/lib/utils";

export default function HomePage() {
  const items = getAllItems();
  const kpi = computeKpis(items);

  const openPct = kpi.total > 0 ? Math.round((kpi.open / kpi.total) * 100) : 0;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Panel Principal"
        description="Resumen ejecutivo del estado de incidencias y recursos."
        helpKey="home"
      />

      {/* KPI rápidos */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Total incidencias", value: kpi.total, accent: false },
          { label: "Abiertas", value: kpi.open, accent: true },
          { label: "Importe total", value: eur(kpi.amountTotal), accent: false },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl p-5 flex flex-col gap-2 transition-all duration-200"
            style={{
              background: item.accent
                ? "linear-gradient(135deg, rgba(245,76,73,0.15) 0%, rgba(202,96,94,0.08) 100%)"
                : "rgba(75,63,62,0.15)",
              border: item.accent ? "1px solid rgba(245,76,73,0.3)" : "1px solid #4B3F3E",
            }}
          >
            <span
              className="text-xs font-bold tracking-[0.18em] uppercase"
              style={{
                color: item.accent ? "#F54C49" : "#755E5E",
                fontFamily: "'Geist', sans-serif",
              }}
            >
              {item.label}
            </span>
            <span
              className="text-3xl font-bold"
              style={{
                color: item.accent ? "#F54C49" : "#F8F6F6",
                fontFamily: "'Geist', sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Estado de incidencias abiertas */}
      <div
        className="rounded-xl p-6 space-y-4"
        style={{ background: "rgba(75,63,62,0.12)", border: "1px solid #4B3F3E" }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-bold tracking-[0.18em] uppercase"
            style={{ color: "#755E5E", fontFamily: "'Geist', sans-serif" }}
          >
            Estado general
          </span>
          <span
            className="text-xs font-semibold"
            style={{ color: "#F54C49" }}
          >
            {openPct}% abiertas
          </span>
        </div>
        {/* Barra de progreso */}
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ background: "#2a1a1a" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${openPct}%`,
              background: "linear-gradient(90deg, #F54C49, #CA605E)",
            }}
          />
        </div>
        <div className="flex justify-between text-xs" style={{ color: "#755E5E", fontFamily: "'Noto Sans JP', sans-serif" }}>
          <span>{kpi.open} abiertas</span>
          <span>{kpi.closed} cerradas</span>
        </div>
      </div>

      {/* Últimas incidencias */}
      <div className="space-y-3">
        <h2
          className="text-xs font-bold tracking-[0.2em] uppercase"
          style={{ color: "#755E5E", fontFamily: "'Geist', sans-serif" }}
        >
          Últimas incidencias
        </h2>
        {items.slice(0, 4).map((it) => (
          <div
            key={it.id}
            className="flex items-center justify-between rounded-lg px-4 py-3 transition-all duration-150"
            style={{ background: "rgba(75,63,62,0.10)", border: "1px solid #4B3F3E" }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: it.status === "open" ? "#F54C49" : "#755E5E" }}
              />
              <span
                className="text-sm font-medium truncate"
                style={{ color: "#F8F6F6", fontFamily: "'Geist', sans-serif" }}
              >
                {it.title}
              </span>
            </div>
            <span
              className="text-xs flex-shrink-0 ml-4"
              style={{ color: "#755E5E", fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              {it.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
