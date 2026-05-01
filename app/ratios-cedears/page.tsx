import { PageHero, SectionLabel, SiteFooter, SiteHeader } from "../components/site-shell";
import { CedearsTable } from "./cedears-table";

export default function RatiosCedearsPage() {
  return (
    <div className="min-h-screen text-[var(--color-ink)]">
      <SiteHeader currentPath="/ratios-cedears" />
      <PageHero
        eyebrow="Herramientas"
        title="Ratios de cedears"
        description="Espacio para consultar y comparar métricas clave de cedears de forma rápida y ordenada."
      />

      <main className="mx-auto w-[min(1240px,92vw)] space-y-10 py-12 md:py-16">
        <SectionLabel
          eyebrow="Base BYMA"
          title="Tabla de ratios de Cedears"
          description="Dataset consolidado desde archivo BYMA en backend, con búsqueda por compañía/ticker y filtro por mercado para consulta rápida."
        />
        <CedearsTable />
      </main>

      <SiteFooter />
    </div>
  );
}
