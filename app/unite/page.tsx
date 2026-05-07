import { PageHero, SectionLabel, SiteFooter, SiteHeader } from "../components/site-shell";
import { publicPostsService } from "../services/public-posts-service";

export default async function UnitePage() {
  const contacts = await publicPostsService.getContactLinks().catch(() => ({ items: [] }));

  return (
    <div className="min-h-screen text-[var(--color-ink)]">
      <SiteHeader currentPath="/unite" />
      <PageHero
        eyebrow="Unite"
        title="Colaborá con el Club"
        description="Todo lo generado se reinvierte en el Club. Sumate a la comunidad, participá de los canales y compartinos tu perfil."
      />

      <main className="mx-auto w-[min(1240px,92vw)] space-y-12 py-12 md:py-16">
        <section className="grid gap-6 rounded-[28px] border border-[var(--color-line)] bg-white p-6 md:grid-cols-2">
          <article>
            <h2 className="text-4xl font-[family:var(--font-display)] text-[var(--color-ink)]">Canales</h2>
            <p className="mt-3 text-lg text-[var(--color-muted)]">Canal de debate y canal de difusión vía WhatsApp.</p>
          </article>
          <article>
            <h2 className="text-4xl font-[family:var(--font-display)] text-[var(--color-ink)]">Mandanos tu CV</h2>
            <p className="mt-3 text-lg text-[var(--color-muted)]">Compartí tu experiencia y área de interés para futuras búsquedas.</p>
          </article>
        </section>

        <section className="space-y-6">
          <SectionLabel
            eyebrow="Contacto"
            title="Redes y medios"
            description="Links directos para conectar con el Club."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {contacts.items.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="rounded-2xl border border-[var(--color-line)] bg-white p-4 transition hover:border-[var(--color-blue)]"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-blue)]">{item.label}</p>
                <p className="mt-2 text-lg text-[var(--color-ink)]">{item.value ?? item.href}</p>
              </a>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

