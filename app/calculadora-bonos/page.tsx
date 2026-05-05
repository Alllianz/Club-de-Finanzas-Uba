import { PageHero, SectionLabel, SiteFooter, SiteHeader } from "../components/site-shell";
import { LetrasCurveDashboard } from "../components/letras-curve-dashboard";

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
          eyebrow="LECAP / BONCAP"
          title="Curva de letras capitalizables"
          description="Actualización al cierre con letras activas, métricas de tasa y curva TEA vs DTM mediante regresión cuadrática de 14 puntos."
        />
        <LetrasCurveDashboard />
      </main>

      <SiteFooter />
    </div>
  );
}
