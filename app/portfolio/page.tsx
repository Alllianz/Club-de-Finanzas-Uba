import {
  FeedGrid,
  PageHero,
  SectionLabel,
  SiteFooter,
  SiteHeader,
} from "../components/site-shell";
import { portfolioFeed, portfolioIntro } from "../site-data";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen text-white">
      <SiteHeader currentPath="/portfolio" />
      <PageHero
        eyebrow="Portfolio"
        title="Seguimiento de carteras, criterios de asignacion y lectura tactica."
        description={portfolioIntro}
      />

      <main className="mx-auto w-[min(1240px,92vw)] py-12 md:py-16">
        <section className="space-y-8">
          <SectionLabel
            eyebrow="Feed del area"
            title="Publicaciones de Portfolio"
            description="Este apartado tiene identidad propia dentro del sitio, pero conserva el mismo lenguaje visual que la home para que el ecosistema se sienta consistente."
          />
          <FeedGrid items={portfolioFeed} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
