import { PageHero, SectionLabel, SiteFooter, SiteHeader } from "../components/site-shell";

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
          eyebrow="Módulo en construcción"
          title="Próximamente métricas y comparador"
          description="La sección ya está integrada en navegación. Podemos seguir con el cálculo de ratios, filtros y visualizaciones en el próximo paso."
        />
      </main>

      <SiteFooter />
    </div>
  );
}
