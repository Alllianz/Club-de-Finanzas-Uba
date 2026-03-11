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
    <div className="min-h-screen text-white">
      <SiteHeader currentPath="/quienes-somos" />
      <PageHero
        eyebrow="Quienes somos"
        title="Trayectoria, objetivos y caras del club en una pagina institucional separada."
        description="Toda la informacion institucional vive aca: historia, propuesta, metas del club y un bloque visual para mostrar lideres y founders sin contaminar la home."
      />

      <main className="mx-auto w-[min(1240px,92vw)] space-y-14 py-12 md:space-y-18 md:py-16">
        <section className="grid gap-5 md:grid-cols-3">
          {storyBlocks.map((block) => (
            <article
              key={block.title}
              className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9cc0ff]">
                {block.title}
              </p>
              <p className="mt-4 text-2xl leading-tight text-white">{block.text}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <SectionLabel
            eyebrow="Objetivos"
            title="Que busca construir el Club de Finanzas UBA"
            description="La pagina institucional ya no compite con el feed principal. En cambio, ordena la narrativa del proyecto y la vuelve util para comunidad, speakers y sponsors."
          />
          <div className="grid gap-4">
            {objectives.map((objective, index) => (
              <article
                key={objective}
                className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/38">
                  Objetivo 0{index + 1}
                </p>
                <p className="mt-3 text-lg leading-7 text-white/74">{objective}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionLabel
            eyebrow="Equipo"
            title="Lideres y founders"
            description="Deje el bloque listo para crecer con fotos reales mas adelante. Hoy ya funciona con retratos tipograficos para no depender de assets externos."
          />
          <PeopleGrid people={leadership} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
