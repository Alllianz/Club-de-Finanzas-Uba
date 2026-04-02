import {
  FeaturedStory,
  FeedGrid,
  PageHero,
  SectionLabel,
  SiteFooter,
  SiteHeader,
} from "./components/site-shell";
import { getHomeContent } from "./lib/public-content";

export default async function HomePage() {
  const { featured, feed } = await getHomeContent();

  return (
    <div className="min-h-screen text-[var(--color-ink)]">
      <SiteHeader currentPath="/" />
      <PageHero
        eyebrow="Home"
        title="Una portada en formato feed para que el club se vea activo, actual y editorial."
        description="La home deja de ser institucional y pasa a funcionar como medio: una noticia o invitación destacada bien arriba y, abajo, un flujo claro de publicaciones anteriores."
      />

      <main className="mx-auto w-[min(1240px,92vw)] space-y-14 py-12 md:space-y-18 md:py-16">
        <FeaturedStory story={featured} />

        <section className="space-y-8">
          <SectionLabel
            eyebrow="Archivo reciente"
            title="Publicaciones anteriores"
            description="Un feed de tarjetas con ritmo visual parecido a un medio o una biblioteca de informes. Cada pieza mantiene categoría, fecha y salida directa al contenido."
          />
          <FeedGrid items={feed} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
