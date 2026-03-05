export type ItemStatus = "open" | "closed";

export type Item = {
  id: string;
  title: string;
  category: "Hardware" | "Software" | "Red" | "Otros";
  owner: string;
  status: ItemStatus;
  date: string; // ISO
  amount: number;
  notes: string;
};

const ITEMS: Item[] = [
  {
    id: "1001",
    title: "Sustitución teclado",
    category: "Hardware",
    owner: "Ramona Cifuentes Conejo",
    status: "closed",
    date: "2026-01-10",
    amount: 49.9,
    notes: "Se sustituyó teclado por fallo de teclas.",
  },
  {
    id: "1002",
    title: "Actualización antivirus",
    category: "Software",
    owner: "Joselito",
    status: "open",
    date: "2026-02-03",
    amount: 0,
    notes: "Pendiente de aplicar política a equipos del aula 2.",
  },
  {
    id: "1003",
    title: "Reconfigurar switch",
    category: "Red",
    owner: "Serenna Williams",
    status: "open",
    date: "2026-02-14",
    amount: 0,
    notes: "VLANs y etiquetado de puertos.",
  },
  {
    id: "1004",
    title: "Reinstalación sistema",
    category: "Software",
    owner: "Ramona Cifuentes Conejo",
    status: "closed",
    date: "2026-02-20",
    amount: 0,
    notes: "Imagen base y drivers actualizados.",
  },
  {
    id: "1005",
    title: "Cableado extra aula",
    category: "Red",
    owner: "Joselito",
    status: "closed",
    date: "2026-02-22",
    amount: 120,
    notes: "Material y mano de obra.",
  },
  {
    id: "1006",
    title: "Ratones nuevos",
    category: "Hardware",
    owner: "Serenna Williams",
    status: "open",
    date: "2026-02-25",
    amount: 75,
    notes: "Pendiente de recepción.",
  },
];

export function getAllItems() {
  return [...ITEMS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getItemById(id: string) {
  return ITEMS.find((x) => x.id === id) ?? null;
}