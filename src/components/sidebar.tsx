"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/",        label: "Inicio",       icon: "⬡", desc: "Panel principal" },
  { href: "/listado", label: "Incidencias",  icon: "◈", desc: "Gestionar registros" },
  { href: "/informe", label: "Informe",      icon: "◉", desc: "Análisis y KPIs" },
  { href: "/ayuda",   label: "Ayuda",        icon: "◎", desc: "Documentación" },
];

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="flex flex-col w-72 min-h-dvh border-r"
      style={{
        background: "linear-gradient(160deg, #1c0f0f 0%, #221414 60%, #1a1010 100%)",
        borderColor: "#3a2a2a",
        boxShadow: "4px 0 32px rgba(0,0,0,0.5)",
      }}
    >
      {/* BRAND */}
      <div
        className="px-6 pt-8 pb-6"
        style={{ borderBottom: "1px solid rgba(75,63,62,0.4)" }}
      >
        <div className="flex items-start justify-between">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
            style={{
              background: "linear-gradient(135deg, #F54C49 0%, #CA605E 100%)",
              boxShadow: "0 4px 20px rgba(245,76,73,0.4), 0 0 0 1px rgba(245,76,73,0.2)",
            }}
          >
            <span style={{ color: "#fff", fontSize: "18px", fontWeight: 700 }}>◈</span>
          </div>
          {/* Botón cerrar en móvil */}
          {onClose && (
            <button
              onClick={onClose}
              className="mt-1 w-8 h-8 rounded-lg flex items-center justify-center md:hidden"
              style={{ background: "rgba(75,63,62,0.3)", color: "#755E5E", fontSize: "16px" }}
            >
              ✕
            </button>
          )}
        </div>

        <div
          className="text-lg font-bold leading-tight"
          style={{ color: "#F8F6F6", fontFamily: "'Geist', sans-serif", letterSpacing: "-0.02em" }}
        >
          App Profesional
        </div>
        <div
          className="text-[11px] mt-0.5 tracking-[0.12em] uppercase"
          style={{ color: "#755E5E", fontFamily: "'Noto Sans JP', sans-serif" }}
        >
          Gestión de Incidencias
        </div>

        <div
          className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full"
          style={{ background: "rgba(245,76,73,0.1)", border: "1px solid rgba(245,76,73,0.2)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#F54C49", boxShadow: "0 0 6px #F54C49" }} />
          <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: "#F54C49", fontFamily: "'Geist', sans-serif" }}>
            Sistema activo
          </span>
        </div>
      </div>

      {/* NAV */}
      <nav className="flex flex-col gap-1.5 flex-1 px-4 py-5">
        <div className="text-[9px] font-bold tracking-[0.25em] uppercase px-2 mb-2" style={{ color: "#4B3F3E", fontFamily: "'Geist', sans-serif" }}>
          Navegación
        </div>

        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200"
              style={{
                background: active ? "linear-gradient(135deg, rgba(245,76,73,0.18) 0%, rgba(202,96,94,0.08) 100%)" : "transparent",
                border: active ? "1px solid rgba(245,76,73,0.25)" : "1px solid transparent",
                boxShadow: active ? "0 2px 16px rgba(245,76,73,0.12), inset 0 1px 0 rgba(245,76,73,0.1)" : "none",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: active ? "linear-gradient(135deg, #F54C49, #CA605E)" : "rgba(75,63,62,0.3)",
                  boxShadow: active ? "0 2px 10px rgba(245,76,73,0.35)" : "none",
                }}
              >
                <span style={{ color: active ? "#fff" : "#755E5E", fontSize: "13px" }}>{item.icon}</span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold leading-tight" style={{ color: active ? "#F8F6F6" : "#A06665", fontFamily: "'Geist', sans-serif" }}>
                  {item.label}
                </div>
                <div className="text-[10px] mt-0.5" style={{ color: active ? "#CA605E" : "#4B3F3E", fontFamily: "'Noto Sans JP', sans-serif" }}>
                  {item.desc}
                </div>
              </div>

              {active && (
                <div
                  className="w-1 h-6 rounded-full flex-shrink-0"
                  style={{ background: "linear-gradient(180deg, #F54C49, #CA605E)", boxShadow: "0 0 8px rgba(245,76,73,0.6)" }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="px-6 py-5" style={{ borderTop: "1px solid rgba(75,63,62,0.3)" }}>
        <div className="rounded-xl px-4 py-3" style={{ background: "rgba(51,34,34,0.5)", border: "1px solid rgba(75,63,62,0.3)" }}>
          <div className="text-[10px] font-bold tracking-wider uppercase" style={{ color: "#4B3F3E", fontFamily: "'Geist', sans-serif" }}>Versión</div>
          <div className="text-xs mt-0.5" style={{ color: "#755E5E", fontFamily: "'Noto Sans JP', sans-serif" }}>v1.0 · Next.js + shadcn</div>
        </div>
      </div>
    </aside>
  );
}
