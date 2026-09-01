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
    <div className="min-h-screen bg-[#ffffff] font-sans text-[#334155]">
      <SiteHeader currentPath="/research" />
      
      <PageHero
        eyebrow="Área de Research"
        title="Investigación Macroeconómica, Renta Fija y Valuación"
        description={researchIntro}
      />

      <main className="mx-auto w-[min(1280px,92vw)] space-y-16 py-12 md:space-y-20 md:py-16">
        <section className="space-y-4">
          <SectionLabel
            eyebrow="Informe Destacado"
            title="Publicación de Research de la Semana"
            description="Marco teórico y análisis profundo de coyuntura y valuación de compañías."
          />
          <FeaturedStory story={featured} />
        </section>

        <section className="space-y-6">
          <SectionLabel
            eyebrow="Biblioteca de Informes"
            title="Publicaciones del Equipo de Research"
            description="Marcos teóricos rigurosos, seguimiento macroeconómico de Argentina y valuación sectorial internacional."
          />
          <FeedGrid items={feed} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
