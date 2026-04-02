import {
  FeaturedStory,
  FeedGrid,
  PageHero,
  SectionLabel,
  SiteFooter,
  SiteHeader,
} from "../components/site-shell";
import { getResearchContent } from "../lib/public-content";
import { researchIntro } from "../site-data";

export default async function ResearchPage() {
  const { featured, feed } = await getResearchContent();

  return (
    <div className="min-h-screen text-[var(--color-ink)]">
      <SiteHeader currentPath="/research" />
      <PageHero
        eyebrow="Research"
        title="Informes, marcos conceptuales y análisis con tono académico."
        description={researchIntro}
      />

      <main className="mx-auto w-[min(1240px,92vw)] space-y-14 py-12 md:space-y-18 md:py-16">
        <FeaturedStory story={featured} />

        <section className="space-y-8">
          <SectionLabel
            eyebrow="Feed del área"
            title="Research en formato biblioteca"
            description="Tomando la inspiración del ejemplo que compartiste, este feed prioriza tarjetas limpias, categóricas y fácilmente escaneables."
          />
          <FeedGrid items={feed} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
