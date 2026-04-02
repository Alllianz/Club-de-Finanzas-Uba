import {
  PageHero,
  PeopleGrid,
  SectionLabel,
  SiteFooter,
  SiteHeader,
} from "../components/site-shell";
import { leadership, objectives, storyBlocks } from "../site-data";

export default function QuienesSomosPage() {
  return (
    <div className="min-h-screen text-[var(--color-ink)]">
      <SiteHeader currentPath="/quienes-somos" />
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
            eyebrow="Equipo"
            title="Líderes y founders"
            description="Dejé el bloque listo para crecer con fotos reales más adelante. Hoy ya funciona con retratos tipográficos para no depender de assets externos."
          />
          <PeopleGrid people={leadership} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
