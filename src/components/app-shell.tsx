"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ minHeight: "100dvh", background: "var(--color-background)", color: "var(--color-foreground)" }}>
      <div style={{ display: "flex" }}>

        {/* Sidebar — solo visible en pantallas >= 768px */}
        <div style={{ display: "none" }} className="desktop-sidebar">
          <Sidebar />
        </div>

        {/* Drawer móvil */}
        {mobileOpen && (
          <>
            <div
              onClick={() => setMobileOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 40,
                background: "rgba(0,0,0,0.75)",
              }}
            />
            <div style={{
              position: "fixed", top: 0, left: 0, bottom: 0,
              zIndex: 50, width: "280px",
            }}>
              <Sidebar onClose={() => setMobileOpen(false)} />
            </div>
          </>
        )}

        {/* Contenido */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <Topbar onMenuClick={() => setMobileOpen(true)} />
          <main style={{ padding: "16px", maxWidth: "1152px", margin: "0 auto" }}>
            {children}
          </main>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-sidebar { display: block !important; }
        }
      `}</style>
    </div>
  );
}
