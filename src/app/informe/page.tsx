import { PageHeader } from "@/components/page-header";
import { ReportFilters } from "@/components/report/report-filters";
import { KpiCards } from "@/components/report/kpi-cards";
import { ReportChart } from "@/components/report/report-chart";
import { ReportTable } from "@/components/report/report-table";

export default function InformePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Informe"
        description="Filtros, KPIs, totales y gráfico a partir de datos filtrados."
        helpKey="informe"
      />

      <ReportFilters />
      <KpiCards />
      <ReportChart />
      <ReportTable />
    </div>
  );
}