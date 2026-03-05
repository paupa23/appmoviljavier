import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { getAllItems } from "@/lib/data";

export default function ListadoPage() {
  const items = getAllItems();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Incidencias"
        description="Registro de incidencias activas y resueltas."
        helpKey="listado"
      />

      <div className="grid gap-3">
        {items.map((it) => (
          <Link
            key={it.id}
            href={`/detalle/${it.id}`}
            className="group block rounded-xl px-5 py-4 transition-all duration-200"
            style={{
              background: "rgba(75,63,62,0.10)",
              border: "1px solid #4B3F3E",
            }}
          >
            <div className="flex items-center justify-between gap-4">
              {/* Info principal */}
              <div className="flex items-center gap-4 min-w-0">
                {/* Indicador estado */}
                <div
                  className="flex-shrink-0 w-2 h-8 rounded-full"
                  style={{
                    background: it.status === "open"
                      ? "linear-gradient(180deg, #F54C49, #CA605E)"
                      : "#4B3F3E",
                  }}
                />
                <div className="min-w-0">
                  <div
                    className="font-semibold truncate text-sm leading-tight"
                    style={{ color: "#F8F6F6", fontFamily: "'Geist', sans-serif" }}
                  >
                    {it.title}
                  </div>
                  <div
                    className="text-xs mt-0.5 truncate"
                    style={{ color: "#755E5E", fontFamily: "'Noto Sans JP', sans-serif" }}
                  >
                    {it.owner} · {new Date(it.date).toLocaleDateString("es-ES")}
                  </div>
                </div>
              </div>

              {/* Badges y acción */}
              <div className="flex items-center gap-3 flex-shrink-0">
                {/* Categoría */}
                <span
                  className="hidden sm:inline text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-md"
                  style={{
                    background: "rgba(117,94,94,0.2)",
                    color: "#A06665",
                    fontFamily: "'Geist', sans-serif",
                  }}
                >
                  {it.category}
                </span>

                {/* Estado */}
                <span
                  className="text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-md"
                  style={{
                    background: it.status === "open"
                      ? "rgba(245,76,73,0.15)"
                      : "rgba(75,63,62,0.3)",
                    color: it.status === "open" ? "#F54C49" : "#755E5E",
                    fontFamily: "'Geist', sans-serif",
                  }}
                >
                  {it.status === "open" ? "Abierta" : "Cerrada"}
                </span>

                {/* Flecha */}
                <span
                  className="text-sm transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: "#4B3F3E" }}
                >
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
