import {
  FeaturedStory,
  FeedGrid,
  PageHero,
  SectionLabel,
  SiteFooter,
  SiteHeader,
} from "../components/site-shell";
import { getPortfolioContent } from "../lib/public-content";
import { portfolioIntro } from "../site-data";

export default async function PortfolioPage() {
  const { featured, feed } = await getPortfolioContent();

  return (
    <div className="min-h-screen bg-[#ffffff] font-sans text-[#334155]">
      <SiteHeader currentPath="/portfolio" />
      
      <PageHero
        eyebrow="Área de Portafolio"
        title="Estrategia, Asignación de Activos y Modelos Cuantitativos"
        description={portfolioIntro}
      />

      <main className="mx-auto w-[min(1280px,92vw)] space-y-16 py-12 md:space-y-20 md:py-16">
        {/* KPI Row Destacado del Reporte de Portfolio */}
        <section className="rounded-2xl border border-[#e2e8f0] bg-[#ffffff] p-6 shadow-sm sm:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#f1f5f9] pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0062ff]">
                Portfolio Modelo · Renta Variable
              </p>
              <h3 className="mt-1 text-xl font-bold text-[#0e2246] sm:text-2xl">
                Métricas Cuantitativas de la Cartera
              </h3>
            </div>
            <span className="rounded-full border border-[#d8e5f8] bg-[#f0f6ff] px-3.5 py-1 text-xs font-bold text-[#091a36]">
              Horizonte 2-3 Años
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            <div className="flex flex-col items-center rounded-xl border border-[#e2e8f0] bg-[#ffffff] p-4 text-center shadow-sm">
              <div className="kpi-circ">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              </div>
              <span className="mt-2.5 text-[10px] font-bold uppercase tracking-wider text-[#64748b]">CAGR Anual</span>
              <span className="mt-1 font-mono text-lg font-extrabold text-[#0062ff]">33,0%</span>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-[#e2e8f0] bg-[#ffffff] p-4 text-center shadow-sm">
              <div className="kpi-circ blue">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <span className="mt-2.5 text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Volatilidad</span>
              <span className="mt-1 font-mono text-lg font-extrabold text-[#0e2246]">18,4%</span>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-[#e2e8f0] bg-[#ffffff] p-4 text-center shadow-sm">
              <div className="kpi-circ">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <span className="mt-2.5 text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Ratio Sharpe</span>
              <span className="mt-1 font-mono text-lg font-extrabold text-[#0062ff]">1,54</span>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-[#e2e8f0] bg-[#ffffff] p-4 text-center shadow-sm">
              <div className="kpi-circ blue">
                <span className="text-xs font-bold text-white">β</span>
              </div>
              <span className="mt-2.5 text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Beta Benchmark</span>
              <span className="mt-1 font-mono text-lg font-extrabold text-[#0e2246]">0,56 / 0,65</span>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-[#e2e8f0] bg-[#ffffff] p-4 text-center shadow-sm">
              <div className="kpi-circ cyan">
                <span className="text-xs font-bold text-white">β</span>
              </div>
              <span className="mt-2.5 text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Beta Cartera</span>
              <span className="mt-1 font-mono text-lg font-extrabold text-[#0062ff]">1,011</span>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-[#e2e8f0] bg-[#ffffff] p-4 text-center shadow-sm">
              <div className="kpi-circ teal">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
              </div>
              <span className="mt-2.5 text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Max Drawdown</span>
              <span className="mt-1 font-mono text-lg font-extrabold text-[#0e2246]">-17,0%</span>
            </div>

            <div className="col-span-2 flex flex-col items-center rounded-xl border border-[#e2e8f0] bg-[#ffffff] p-4 text-center shadow-sm sm:col-span-2 lg:col-span-1">
              <div className="kpi-circ cyan">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <span className="mt-2.5 text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Correlación</span>
              <span className="mt-1 font-mono text-lg font-extrabold text-[#0062ff]">0,25</span>
            </div>
          </div>
        </section>

        {/* Historia Destacada de Portfolio */}
        <section className="space-y-4">
          <SectionLabel
            eyebrow="Tesis Principal"
            title="Estrategia y Posicionamiento de Cartera"
            description="Visión de inversión macro y microeconómica con justificación cuantitativa."
          />
          <FeaturedStory story={featured} />
        </section>

        {/* Feed de Publicaciones de Portfolio */}
        <section className="space-y-6">
          <SectionLabel
            eyebrow="Archivo del Área"
            title="Publicaciones del Equipo de Portafolio"
            description="Tesis de inversión fundamental, optimización de carteras y análisis cuantitativo de activos."
          />
          <FeedGrid items={feed} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
