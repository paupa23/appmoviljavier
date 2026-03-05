import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { getItemById, getAllItems } from "@/lib/data";

export function generateStaticParams() {
  return getAllItems().map((item) => ({ id: item.id }));
}

export default async function DetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getItemById(id);
  if (!item) return notFound();

  const fields = [
    { label: "Categoría", value: item.category },
    { label: "Responsable", value: item.owner },
    { label: "Fecha", value: new Date(item.date).toLocaleDateString("es-ES") },
    { label: "Importe", value: `${item.amount.toFixed(2)} €` },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Botón volver */}
      <div>
        <Link
          href="/listado"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-150"
          style={{ color: "#755E5E", fontFamily: "'Geist', sans-serif" }}
        >
          ← Incidencias
        </Link>
      </div>

      <PageHeader
        title="Detalle de incidencia"
        description={`Expediente #${item.id}`}
        helpKey="detalle"
      />

      {/* Card principal */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid #4B3F3E" }}
      >
        {/* Cabecera */}
        <div
          className="px-6 py-5 flex items-start justify-between gap-4"
          style={{
            background: "linear-gradient(135deg, rgba(245,76,73,0.10) 0%, rgba(75,63,62,0.15) 100%)",
            borderBottom: "1px solid #4B3F3E",
          }}
        >
          <div>
            <h2
              className="text-lg font-bold leading-tight"
              style={{ color: "#F8F6F6", fontFamily: "'Geist', sans-serif", letterSpacing: "-0.02em" }}
            >
              {item.title}
            </h2>
            <span
              className="text-xs"
              style={{ color: "#755E5E", fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              #{item.id}
            </span>
          </div>
          <span
            className="flex-shrink-0 text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-lg"
            style={{
              background: item.status === "open"
                ? "rgba(245,76,73,0.2)"
                : "rgba(75,63,62,0.4)",
              color: item.status === "open" ? "#F54C49" : "#755E5E",
              border: item.status === "open"
                ? "1px solid rgba(245,76,73,0.3)"
                : "1px solid #4B3F3E",
              fontFamily: "'Geist', sans-serif",
            }}
          >
            {item.status === "open" ? "● Abierta" : "○ Cerrada"}
          </span>
        </div>

        {/* Campos */}
        <div
          className="divide-y"
          style={{ background: "rgba(75,63,62,0.08)", borderColor: "#4B3F3E" }}
        >
          {fields.map((f) => (
            <div
              key={f.label}
              className="flex items-center justify-between px-6 py-3.5"
              style={{ borderColor: "#4B3F3E" }}
            >
              <span
                className="text-xs font-bold tracking-[0.12em] uppercase"
                style={{ color: "#755E5E", fontFamily: "'Geist', sans-serif" }}
              >
                {f.label}
              </span>
              <span
                className="text-sm font-medium"
                style={{ color: "#F8F6F6", fontFamily: "'Geist', sans-serif" }}
              >
                {f.value}
              </span>
            </div>
          ))}
        </div>

        {/* Notas */}
        {item.notes && (
          <div
            className="px-6 py-4"
            style={{
              background: "rgba(51,34,34,0.3)",
              borderTop: "1px solid #4B3F3E",
            }}
          >
            <div
              className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2"
              style={{ color: "#755E5E", fontFamily: "'Geist', sans-serif" }}
            >
              Observaciones
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#A06665", fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              {item.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
