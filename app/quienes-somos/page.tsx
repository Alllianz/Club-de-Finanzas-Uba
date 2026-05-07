import {
  PageHero,
  PeopleGrid,
  SectionLabel,
  SiteFooter,
  SiteHeader,
} from "../components/site-shell";
import { leadership, objectives, storyBlocks } from "../site-data";
import { getTeamMembersContent } from "../lib/public-content";

export default async function QuienesSomosPage() {
  const { leaders, membersBySection } = await getTeamMembersContent(leadership);

  return (
    <div className="min-h-screen text-[var(--color-ink)]">
      <SiteHeader currentPath="/sobre-nosotros" />
      <PageHero
        eyebrow="Quiénes somos"
        title="Trayectoria, objetivos y caras del club en una página institucional separada."
        description="Toda la información institucional vive acá: historia, propuesta, metas del club y un bloque visual para mostrar líderes y founders sin contaminar la home."
      />

      <main className="mx-auto w-[min(1240px,92vw)] space-y-14 py-12 md:space-y-18 md:py-16">
        <section className="grid gap-5 md:grid-cols-3">
          {storyBlocks.map((block) => (
            <article
              key={block.title}
              className="rounded-[28px] border border-[var(--color-line)] bg-white p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-blue)]">
                {block.title}
              </p>
              <p className="mt-4 text-2xl leading-tight text-[var(--color-ink)]">{block.text}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <SectionLabel
            eyebrow="Objetivos"
            title="Qué busca construir el Club de Finanzas UBA"
            description="La página institucional ya no compite con el feed principal. En cambio, ordena la narrativa del proyecto y la vuelve útil para comunidad, speakers y sponsors."
          />
          <div className="grid gap-4">
            {objectives.map((objective, index) => (
              <article
                key={objective}
                className="rounded-[24px] border border-[var(--color-line)] bg-white p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-blue)]">
                  Objetivo 0{index + 1}
                </p>
                <p className="mt-3 text-lg leading-7 text-[var(--color-muted)]">{objective}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionLabel
            eyebrow="Líderes"
            title="Equipo de liderazgo"
            description="Fotos, nombre, rol y enlace de referencia a LinkedIn o web personal."
          />
          <PeopleGrid people={leaders} />
        </section>

        <section className="space-y-8">
          <SectionLabel
            eyebrow="Miembros de equipo"
            title="Portfolio · Research · RRII"
            description="Cada área muestra integrantes con descripción breve opcional para explicar perfil y responsabilidades."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { key: "PORTFOLIO", label: "Portfolio" },
              { key: "RESEARCH", label: "Research" },
              { key: "RRII", label: "RRII" },
            ].map((section) => (
              <section
                key={section.key}
                className="space-y-4 rounded-[24px] border border-[var(--color-line)] bg-white p-5"
              >
                <h3 className="text-2xl font-semibold text-[var(--color-ink)]">{section.label}</h3>
                {membersBySection[section.key as "PORTFOLIO" | "RESEARCH" | "RRII"]?.length ? (
                  <div className="space-y-3">
                    {membersBySection[section.key as "PORTFOLIO" | "RESEARCH" | "RRII"].map((person) => (
                      <article key={`${section.key}-${person.name}`} className="rounded-xl border border-[var(--color-line)] bg-[var(--color-bg-soft)] p-3">
                        <p className="text-base font-semibold text-[var(--color-ink)]">{person.name}</p>
                        <p className="text-sm text-[var(--color-blue)]">{person.role}</p>
                        {person.bio ? <p className="mt-1 text-sm text-[var(--color-muted)]">{person.bio}</p> : null}
                        {person.profileUrl ? (
                          <a
                            href={person.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex text-xs text-[var(--color-muted)] underline underline-offset-4 hover:text-[var(--color-blue)]"
                          >
                            LinkedIn / Web
                          </a>
                        ) : null}
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[var(--color-muted)]">Sin miembros cargados todavía.</p>
                )}
              </section>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
