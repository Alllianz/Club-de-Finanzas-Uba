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
  const { featured, feed, novedades, resources, sponsors } =
    await getHomeContent();

  return (
    <div className="min-h-screen text-[var(--color-ink)]">
      <SiteHeader currentPath="/" />
      <PageHero
        eyebrow="Home"
        title="Club de Finanzas UBA"
        description="Finanzas por y para estudiantes"
      />

      <main className="mx-auto w-[min(1240px,92vw)] space-y-14 py-12 md:space-y-18 md:py-16">
        <FeaturedStory story={featured} />

        <section className="space-y-8">
          <SectionLabel
            eyebrow="Novedades"
            title="Destacado del momento"
            description="Carrusel editorial con prioridad para eventos vigentes y anuncios clave del Club."
          />
          <FeedGrid items={novedades} />
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <article className="rounded-[28px] border border-[var(--color-line)] bg-white p-6">
            <h3 className="text-3xl font-[family:var(--font-display)]">
              Recursos
            </h3>
            <ul className="mt-4 space-y-3">
              {resources.map((resource) => (
                <li key={resource.id}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-blue)] underline"
                  >
                    {resource.title}
                  </a>
                  <p className="text-sm text-[var(--color-muted)]">
                    {resource.type}
                  </p>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-[28px] border border-[var(--color-line)] bg-white p-6">
            <h3 className="text-3xl font-[family:var(--font-display)]">
              Gracias por apoyarnos
            </h3>
            <ul className="mt-4 space-y-3">
              {sponsors.map((sponsor) => (
                <li key={sponsor.id}>
                  {sponsor.linkUrl ? (
                    <a
                      href={sponsor.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-blue)] underline"
                    >
                      {sponsor.name}
                    </a>
                  ) : (
                    <p>{sponsor.name}</p>
                  )}
                </li>
              ))}
            </ul>
          </article>
        </section>

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
