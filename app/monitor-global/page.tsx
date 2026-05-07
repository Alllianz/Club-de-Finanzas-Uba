import { MonitorGlobalDashboard } from "../components/monitor-global-dashboard";
import { SectionLabel, SiteFooter, SiteHeader } from "../components/site-shell";
import { CedearsTable } from "../ratios-cedears/cedears-table";

export default function MonitorGlobalPage() {
  return (
    <div className="min-h-screen text-[var(--color-ink)]">
      <SiteHeader currentPath="/monitor-global" />

      <main className="mx-auto w-[min(1240px,92vw)] space-y-12 py-12 md:space-y-16 md:py-16">
        <section className="space-y-6">
          <SectionLabel
            eyebrow="Mercado global"
            title="Panel de datos financieros"
            description="Seguimiento de indicadores macro y de mercado para lectura rápida del contexto."
          />
          <MonitorGlobalDashboard />
        </section>

        <section className="space-y-6">
          <SectionLabel
            eyebrow="Base BYMA"
            title="Ratios de Cedears"
            description="Tabla consolidada para consultar compañía, ticker, mercado y ratio, con búsqueda y filtros."
          />
          <CedearsTable />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
