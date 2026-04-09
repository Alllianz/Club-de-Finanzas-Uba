import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { FeedEntry, Person } from "../site-data";
import { contactLinks, navigation } from "../site-data";

type NavProps = {
  currentPath: string;
};

type HeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  aside?: ReactNode;
};

type FeedGridProps = {
  items: FeedEntry[];
};

type FeaturedStoryProps = {
  story: FeedEntry;
};

type PeopleGridProps = {
  people: Person[];
};

export function SiteHeader({ currentPath }: NavProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(248,246,239,0.95),rgba(244,239,229,0.9))] backdrop-blur-xl">
      <div className="mx-auto flex w-[min(1240px,92vw)] items-center justify-between gap-3 py-3">
        <Link href="/" className="flex items-center">
          <div className="flex h-16 w-[240px] items-center justify-start overflow-hidden sm:w-[280px] lg:w-[320px]">
            <Image
              src="/clubdefinanzasubalogohorizontal.png"
              alt="Club de Finanzas UBA"
              width={500}
              height={114}
              className="h-full w-full object-contain object-left"
              priority
            />
          </div>
        </Link>

        <nav className="ml-auto max-w-[calc(100%-250px)] overflow-x-auto sm:max-w-[calc(100%-300px)] lg:max-w-[calc(100%-340px)]">
          <div className="flex w-max items-center gap-1.5 whitespace-nowrap text-xs text-[var(--color-muted)] sm:text-sm">
            {navigation.map((item) => {
              const active = currentPath === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 transition sm:px-4 sm:py-2 ${
                    active
                      ? "border border-[var(--color-blue)] bg-[var(--color-blue)] text-[#ffffff]"
                      : "border border-[var(--color-line)] bg-white/80 hover:border-[var(--color-blue)] hover:text-[var(--color-blue)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}

export function PageHero({ eyebrow, title, description, aside }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-line)] bg-[radial-gradient(circle_at_top_left,rgba(30,78,162,0.14),transparent_35%),linear-gradient(180deg,#f8f6ef_0%,#f2ede1_100%)]">
      <div className="mx-auto grid w-[min(1240px,92vw)] gap-8 py-14 md:grid-cols-[minmax(0,1.2fr)_340px] md:py-20">
        <div className="relative animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-blue)]">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl font-[family:var(--font-display)] text-5xl leading-[0.9] text-[var(--color-ink)] sm:text-6xl md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-muted)] md:text-xl">
            {description}
          </p>
        </div>

        <div className="relative animate-fade-up-delayed rounded-[32px] border border-[var(--color-line)] bg-white p-6 text-[var(--color-muted)] shadow-[0_20px_60px_rgba(18,35,63,0.12)]">
          {aside ?? (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-blue)]">
                Club de Finanzas UBA
              </p>
              <p className="mt-4 text-2xl leading-tight text-[var(--color-ink)]">
                Una web pensada como medio: noticia principal arriba y feed real debajo.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export function FeaturedStory({ story }: FeaturedStoryProps) {
  return (
    <article className="relative overflow-hidden rounded-[36px] border border-[var(--color-line)] bg-[linear-gradient(135deg,#ffffff,#f5f8ff)] p-8 shadow-[0_20px_70px_rgba(18,35,63,0.12)] md:p-10">
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[linear-gradient(90deg,rgba(18,63,137,0),rgba(18,63,137,0.12))] md:block" />
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-blue)]">
        {story.category}
      </p>
      <p className="mt-4 text-sm uppercase tracking-[0.18em] text-[var(--color-muted)]">
        {story.date}
      </p>
      <h2 className="mt-4 max-w-4xl font-[family:var(--font-display)] text-4xl leading-tight text-[var(--color-ink)] md:text-6xl">
        {story.title}
      </h2>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
        {story.excerpt}
      </p>
      <a
        href={story.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-semibold text-[#ffffff] transition hover:bg-[var(--color-blue-strong)]"
      >
        {story.cta}
      </a>
    </article>
  );
}

export function FeedGrid({ items }: FeedGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article
          key={`${item.category}-${item.title}`}
          className="group flex min-h-[320px] flex-col rounded-[28px] border border-[var(--color-line)] bg-white p-6 transition hover:-translate-y-1 hover:border-[var(--color-blue)]"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="rounded-full border border-[rgba(18,63,137,0.2)] bg-[rgba(18,63,137,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-blue)]">
              {item.category}
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
              {item.date}
            </span>
          </div>
          <h3 className="mt-6 text-3xl leading-tight font-semibold text-[var(--color-ink)]">
            {item.title}
          </h3>
          <p className="mt-4 flex-1 text-base leading-7 text-[var(--color-muted)]">
            {item.excerpt}
          </p>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-medium text-[var(--color-blue)] transition group-hover:border-[var(--color-blue)] group-hover:bg-[rgba(18,63,137,0.06)]"
          >
            {item.cta}
          </a>
        </article>
      ))}
    </div>
  );
}

export function SectionLabel({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-blue)]">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-[family:var(--font-display)] text-4xl leading-tight text-[var(--color-ink)] md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-[var(--color-muted)]">{description}</p>
    </div>
  );
}

export function PeopleGrid({ people }: PeopleGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {people.map((person) => (
        <article
          key={person.name}
          className="rounded-[28px] border border-[var(--color-line)] bg-white p-5"
        >
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-[24px] bg-[linear-gradient(135deg,#1d4f9f,#12336a)] text-2xl font-semibold text-[#ffffff]">
              {person.initials}
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[var(--color-ink)]">{person.name}</h3>
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-blue)]">
                {person.role}
              </p>
            </div>
          </div>
          <p className="mt-5 text-base leading-7 text-[var(--color-muted)]">{person.bio}</p>
        </article>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[linear-gradient(180deg,#f7f4ec,#efe8d8)]">
      <div className="mx-auto grid w-[min(1240px,92vw)] gap-8 py-10 md:grid-cols-[1.2fr_0.8fr_0.9fr]">
        <div>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-[300px] items-center justify-start overflow-hidden">
              <Image
                src="/clubdefinanzasubalogohorizontal.png"
                alt="Club de Finanzas UBA"
                width={500}
                height={114}
                className="h-full w-full object-contain object-left"
              />
            </div>
          </div>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--color-muted)]">
            Plataforma editorial y académica con foco en Portfolio, Research, noticias y comunidad.
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.22em] text-[var(--color-blue)]">
            Ubicación
          </p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Ciudad Autónoma de Buenos Aires, Argentina.</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-blue)]">
            Contacto
          </p>
          <div className="mt-4 space-y-3">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="block text-sm text-[var(--color-muted)] transition hover:text-[var(--color-blue)]"
              >
                <span className="font-semibold text-[var(--color-ink)]">{item.label}</span>
                {" · "}
                {item.value}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-blue)]">
            Información
          </p>
          <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
            Descargo de responsabilidad: el contenido publicado tiene fines educativos e informativos. No constituye recomendación de inversión ni asesoramiento financiero personalizado.
          </p>
          <p className="mt-6 text-sm text-[var(--color-muted)]">
            Sitio desarrollado por{" "}
            <a
              href="https://roxiumlabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--color-ink)] transition hover:text-[var(--color-blue)]"
            >
              Roxium
            </a>
          </p>
          <p className="mt-6 text-[10px] tracking-[0.22em] text-[var(--color-muted)]/70">
            <Link href="/admin" className="transition hover:text-[var(--color-blue)]">
              autogestión
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
