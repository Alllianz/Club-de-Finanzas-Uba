import {
  FeedGrid,
  PageHero,
  SectionLabel,
  SiteFooter,
  SiteHeader,
} from "../components/site-shell";
import { getResearchFeed } from "../lib/public-content";
import { researchIntro } from "../site-data";

export default async function ResearchPage() {
  const researchFeed = await getResearchFeed();

  return (
    <div className="min-h-screen text-white">
      <SiteHeader currentPath="/research" />
      <PageHero
        eyebrow="Research"
        title="Informes, marcos conceptuales y analisis con tono academico."
        description={researchIntro}
      />

      <main className="mx-auto w-[min(1240px,92vw)] py-12 md:py-16">
        <section className="space-y-8">
          <SectionLabel
            eyebrow="Feed del area"
            title="Research en formato biblioteca"
            description="Tomando la inspiracion del ejemplo que compartiste, este feed prioriza tarjetas limpias, categoricas y facilmente escaneables."
          />
          <FeedGrid items={researchFeed} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
