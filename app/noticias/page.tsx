import {
  FeaturedStory,
  FeedGrid,
  PageHero,
  SectionLabel,
  SiteFooter,
  SiteHeader,
} from "../components/site-shell";
import { getNewsContent, newsIntro } from "../lib/public-content";

export default async function NoticiasPage() {
  const { featured, feed } = await getNewsContent();

  return (
    <div className="min-h-screen text-[var(--color-ink)]">
      <SiteHeader currentPath="/newsletter" />
      <PageHero
        eyebrow="Noticias"
        title="Novedades del club, agenda y cobertura de actividades."
        description={newsIntro}
      />

      <main className="mx-auto w-[min(1240px,92vw)] space-y-14 py-12 md:space-y-18 md:py-16">
        <FeaturedStory story={featured} />

        <section className="space-y-8">
          <SectionLabel
            eyebrow="Feed del área"
            title="Noticias y actualizaciones"
            description="Publicaciones para seguir el pulso institucional del club: anuncios, eventos y novedades de comunidad."
          />
          <FeedGrid items={feed} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
