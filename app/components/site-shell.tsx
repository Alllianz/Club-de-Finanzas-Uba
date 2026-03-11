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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(0,0,0,0.62)] backdrop-blur-xl">
      <div className="mx-auto flex w-[min(1240px,92vw)] flex-wrap items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/12 bg-white/6 p-2">
            <Image
              src="/logo.png"
              alt="Club de Finanzas UBA"
              width={56}
              height={56}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-white/45">
              Club de Finanzas
            </p>
            <p className="text-lg font-semibold tracking-[0.08em] text-white">
              UBA
            </p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-2 text-sm text-white/72">
          {navigation.map((item) => {
            const active = currentPath === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 transition ${
                  active
                    ? "bg-white text-slate-950"
                    : "border border-white/10 bg-white/4 hover:border-white/24 hover:bg-white/8"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export function PageHero({ eyebrow, title, description, aside }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="mx-auto grid w-[min(1240px,92vw)] gap-8 py-14 md:grid-cols-[minmax(0,1.2fr)_340px] md:py-20">
        <div className="relative animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/50">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl font-[family:var(--font-display)] text-5xl leading-[0.9] text-white sm:text-6xl md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72 md:text-xl">
            {description}
          </p>
        </div>

        <div className="relative animate-fade-up-delayed rounded-[32px] border border-white/10 bg-[var(--color-bg-card)] p-6 text-white/80 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          {aside ?? (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
                Club de Finanzas UBA
              </p>
              <p className="mt-4 text-2xl leading-tight text-white">
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
    <article className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(6,9,20,0.92),rgba(14,20,48,0.82))] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.42)] md:p-10">
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[linear-gradient(90deg,rgba(0,0,0,0),rgba(42,55,150,0.24))] md:block" />
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[rgba(160,185,255,0.92)]">
        {story.category}
      </p>
      <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/45">
        {story.date}
      </p>
      <h2 className="mt-4 max-w-4xl font-[family:var(--font-display)] text-4xl leading-tight text-white md:text-6xl">
        {story.title}
      </h2>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
        {story.excerpt}
      </p>
      <a
        href={story.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#dfe7ff]"
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
          className="group flex min-h-[320px] flex-col rounded-[28px] border border-white/10 bg-white/[0.05] p-6 transition hover:-translate-y-1 hover:border-white/18 hover:bg-white/[0.07]"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[rgba(160,185,255,0.92)]">
              {item.category}
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-white/40">
              {item.date}
            </span>
          </div>
          <h3 className="mt-6 text-3xl leading-tight font-semibold text-white">
            {item.title}
          </h3>
          <p className="mt-4 flex-1 text-base leading-7 text-white/68">
            {item.excerpt}
          </p>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit rounded-full border border-white/14 px-4 py-2 text-sm font-medium text-white transition group-hover:border-[rgba(160,185,255,0.92)] group-hover:text-[#dfe7ff]"
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
      <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/45">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-[family:var(--font-display)] text-4xl leading-tight text-white md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-white/68">{description}</p>
    </div>
  );
}

export function PeopleGrid({ people }: PeopleGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {people.map((person) => (
        <article
          key={person.name}
          className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5"
        >
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-[24px] bg-[linear-gradient(135deg,#2a3796,#111827)] text-2xl font-semibold text-white">
              {person.initials}
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white">{person.name}</h3>
              <p className="text-sm uppercase tracking-[0.18em] text-[rgba(160,185,255,0.92)]">
                {person.role}
              </p>
            </div>
          </div>
          <p className="mt-5 text-base leading-7 text-white/68">{person.bio}</p>
        </article>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto grid w-[min(1240px,92vw)] gap-8 py-10 md:grid-cols-[1.2fr_0.8fr_0.9fr]">
        <div>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/12 bg-white/6 p-2">
              <Image
                src="/logo.png"
                alt="Club de Finanzas UBA"
                width={56}
                height={56}
                className="h-full w-full object-contain"
              />
            </div>
            <p className="text-lg font-semibold text-white">Club de Finanzas UBA</p>
          </div>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">
            Plataforma editorial y academica con foco en portfolio, research, noticias y comunidad.
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.22em] text-white/35">
            Ubicacion
          </p>
          <p className="mt-2 text-sm text-white/70">Ciudad Autonoma de Buenos Aires, Argentina</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/35">
            Contacto
          </p>
          <div className="mt-4 space-y-3">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="block text-sm text-white/72 transition hover:text-white"
              >
                <span className="font-semibold text-white">{item.label}</span>
                {" · "}
                {item.value}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/35">
            Informacion
          </p>
          <p className="mt-4 text-sm leading-7 text-white/58">
            Descargo de responsabilidad: el contenido publicado tiene fines educativos e informativos. No constituye recomendacion de inversion ni asesoramiento financiero personalizado.
          </p>
          <p className="mt-6 text-sm text-white/72">
            Sitio desarrollado por{" "}
            <a
              href="https://roxiumlabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white transition hover:text-[#9cc0ff]"
            >
              Roxium
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
