import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AyudaPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Centro de ayuda"
        description="Manual HTML + ayuda por secciones (contextual)."
        helpKey="ayuda"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Manual (HTML)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Incluye tu manual en <code className="text-xs">public/help/manual.html</code>.</p>
            <a className="underline" href="/help/manual.html" target="_blank" rel="noreferrer">
              Abrir manual.html
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ayuda contextual</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Usa el botón “?” en cada pantalla para abrir ayuda específica.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}