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
    <div className="min-h-screen text-white">
      <SiteHeader currentPath="/portfolio" />
      <PageHero
        eyebrow="Portfolio"
        title="Seguimiento de carteras, criterios de asignacion y lectura tactica."
        description={portfolioIntro}
      />

      <main className="mx-auto w-[min(1240px,92vw)] space-y-14 py-12 md:space-y-18 md:py-16">
        <FeaturedStory story={featured} />

        <section className="space-y-8">
          <SectionLabel
            eyebrow="Feed del area"
            title="Publicaciones de Portfolio"
            description="Este apartado tiene identidad propia dentro del sitio, pero conserva el mismo lenguaje visual que la home para que el ecosistema se sienta consistente."
          />
          <FeedGrid items={feed} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

