import { PageHero, SectionLabel, SiteFooter, SiteHeader } from "../components/site-shell";

export default function CalculadoraBonosPage() {
  return (
    <div className="min-h-screen text-[var(--color-ink)]">
      <SiteHeader currentPath="/calculadora-bonos" />
      <PageHero
        eyebrow="Herramientas"
        title="Calculadora de bonos"
        description="Módulo para estimar rendimiento, paridad y métricas principales de renta fija."
      />

      <main className="mx-auto w-[min(1240px,92vw)] space-y-10 py-12 md:py-16">
        <SectionLabel
          eyebrow="Módulo en construcción"
          title="Próximamente calculadora completa"
          description="La ruta y navegación ya están activas. En la siguiente iteración podemos implementar inputs, fórmulas y resultados en tiempo real."
        />
      </main>

      <SiteFooter />
    </div>
  );
}
