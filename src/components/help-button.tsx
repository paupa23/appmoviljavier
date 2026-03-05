"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const HELP: Record<string, { title: string; body: string }> = {
  home: {
    title: "Ayuda: Inicio",
    body: "Desde aquí navegas a Listado, Informe y Ayuda. La topbar agrupa acciones globales.",
  },
  listado: {
    title: "Ayuda: Listado",
    body: "La lista muestra registros. Acción principal: abrir detalle. Añade botones coherentes si procede (editar, cerrar, etc.).",
  },
  detalle: {
    title: "Ayuda: Detalle",
    body: "Vista de un registro. Mantén acciones secundarias como botones (por ejemplo: 'Cambiar estado').",
  },
  informe: {
    title: "Ayuda: Informe",
    body: "Aplica filtros, revisa KPIs y gráfico. Debe verse claro y consistente con el theme.",
  },
  ayuda: {
    title: "Ayuda: Centro de ayuda",
    body: "Aquí enlazas manual HTML/PDF y documentas instalación/configuración.",
  },
};

export function HelpButton({ helpKey }: { helpKey: string }) {
  const content = HELP[helpKey] ?? { title: "Ayuda", body: "No hay ayuda definida para esta pantalla." };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">?</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{content.title}</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground whitespace-pre-wrap">{content.body}</div>
      </DialogContent>
    </Dialog>
  );
}