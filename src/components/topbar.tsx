"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const breadcrumbs: Record<string, string> = {
  "/": "Inicio",
  "/listado": "Incidencias",
  "/informe": "Informe",
  "/ayuda": "Ayuda",
};

interface TopbarProps {
  onMenuClick?: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname();
  const isDetalle = pathname.startsWith("/detalle/");
  const label = isDetalle ? "Incidencias / Detalle" : (breadcrumbs[pathname] ?? pathname.replace("/", ""));

  return (
    <header
      className="sticky top-0 z-10 border-b backdrop-blur-md"
      style={{
        background: "rgba(22,12,12,0.92)",
        borderColor: "#3a2a2a",
        boxShadow: "0 2px 20px rgba(0,0,0,0.4)",
      }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3.5">
        {/* Hamburguesa en móvil + breadcrumb */}
        <div className="flex items-center gap-3">
          {/* Botón menú — solo visible en móvil */}
          <button
            onClick={onMenuClick}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(245,76,73,0.12)",
              border: "1px solid rgba(245,76,73,0.2)",
              color: "#F54C49",
              fontSize: "16px",
            }}
          >
            ☰
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <div
              className="hidden md:flex w-6 h-6 rounded-md items-center justify-center"
              style={{ background: "rgba(245,76,73,0.15)", border: "1px solid rgba(245,76,73,0.2)" }}
            >
              <span style={{ color: "#F54C49", fontSize: "10px" }}>◈</span>
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: "#F8F6F6", fontFamily: "'Geist', sans-serif", letterSpacing: "-0.01em" }}
            >
              {label}
            </span>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          <Link
            href="/informe"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200"
            style={{
              color: "#CA605E",
              border: "1px solid rgba(202,96,94,0.3)",
              background: "rgba(202,96,94,0.06)",
              fontFamily: "'Geist', sans-serif",
            }}
          >
            ◉ Ver informe
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold tracking-wider uppercase"
                style={{
                  background: "linear-gradient(135deg, #F54C49 0%, #CA605E 100%)",
                  color: "#fff",
                  border: "none",
                  fontFamily: "'Geist', sans-serif",
                  boxShadow: "0 2px 16px rgba(245,76,73,0.35)",
                  cursor: "pointer",
                }}
              >
                Acciones <span style={{ fontSize: "9px" }}>▾</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              style={{
                background: "#1c1010",
                border: "1px solid #3a2a2a",
                borderRadius: "0.875rem",
                boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
                minWidth: "180px",
                padding: "6px",
              }}
            >
              <DropdownMenuItem
                onClick={() => alert("Acción primaria (placeholder)")}
                className="rounded-lg px-3 py-2.5 cursor-pointer"
                style={{ color: "#F8F6F6", fontFamily: "'Geist', sans-serif", fontSize: "13px" }}
              >
                <span className="mr-2" style={{ color: "#F54C49" }}>◈</span> Acción primaria
              </DropdownMenuItem>
              <DropdownMenuSeparator style={{ background: "#3a2a2a", margin: "4px 0" }} />
              <DropdownMenuItem
                onClick={() => alert("Exportar (placeholder)")}
                className="rounded-lg px-3 py-2.5 cursor-pointer"
                style={{ color: "#A06665", fontFamily: "'Geist', sans-serif", fontSize: "13px" }}
              >
                <span className="mr-2" style={{ color: "#755E5E" }}>↓</span> Exportar datos
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => alert("Sincronizar (placeholder)")}
                className="rounded-lg px-3 py-2.5 cursor-pointer"
                style={{ color: "#A06665", fontFamily: "'Geist', sans-serif", fontSize: "13px" }}
              >
                <span className="mr-2" style={{ color: "#755E5E" }}>↻</span> Sincronizar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
