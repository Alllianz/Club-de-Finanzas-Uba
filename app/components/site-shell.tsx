"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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

type PostImageProps = {
  src: string;
  alt: string;
  variant: "featured" | "card";
};

function PostImage({ src, alt, variant }: PostImageProps) {
  const [isPortrait, setIsPortrait] = useState(false);

  const wrapperClass =
    variant === "featured"
      ? "mt-6 overflow-hidden rounded-2xl border border-[#e2e8f0] bg-[#f8fafc]"
      : "-mx-6 -mt-6 mb-5 overflow-hidden rounded-t-[14px] border-b border-[#e2e8f0] bg-[#f8fafc]";

  const frameClass = variant === "featured" ? "h-[300px] md:h-[440px]" : "h-48";

  return (
    <div className={wrapperClass}>
      <div className={`w-full ${frameClass} ${isPortrait ? "flex items-center justify-center p-3" : ""}`}>
        <img
          src={src}
          alt={alt}
          onLoad={(event) => {
            const image = event.currentTarget;
            setIsPortrait(image.naturalHeight > image.naturalWidth);
          }}
          className={
            isPortrait
              ? "h-full w-auto max-w-full object-contain"
              : "h-full w-full object-cover"
          }
        />
      </div>
    </div>
  );
}

function isNavItemActive(currentPath: string, href: string): boolean {
  if (!href.startsWith("/")) return false;
  if (href === "/") return currentPath === "/";
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export function SiteHeader({ currentPath }: NavProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-[#ffffff]/98 backdrop-blur-md transition-all">
      <div className="mx-auto flex w-[min(1380px,94vw)] items-center justify-between py-1.5 md:py-2">
        {/* Logo al doble de tamaño visual manteniendo la altura compacta del header */}
        <Link href="/" className="flex items-center">
          <div className="relative flex items-center justify-start overflow-visible">
            <img
              src="/clubdefinanzasubalogohorizontal.png"
              alt="Club de Finanzas UBA"
              className="h-16 w-auto sm:h-20 md:h-24 lg:h-28 max-w-[360px] sm:max-w-[480px] md:max-w-[620px] lg:max-w-[720px] object-contain object-left -my-4 md:-my-6 transition-transform hover:scale-[1.02]"
            />
          </div>
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden items-center gap-1.5 lg:flex">
          {navigation.map((item) => {
            const active = isNavItemActive(currentPath, item.href);
            const isUnite = item.href === "/unite";

            if (isUnite) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`ml-3 inline-flex items-center rounded-full px-5 py-2 text-xs font-extrabold uppercase tracking-[0.08em] shadow-sm transition ${
                    active
                      ? "bg-[#091a36] text-white"
                      : "bg-[#0062ff] text-white hover:bg-[#091a36]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`inline-flex items-center rounded-lg px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.08em] transition ${
                  active
                    ? "bg-[#091a36] text-white shadow-sm"
                    : "text-[#334155] hover:bg-[#f0f6ff] hover:text-[#0062ff]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Botón menú móvil */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/unite"
            className="rounded-full bg-[#0062ff] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm"
          >
            Unite
          </Link>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e2e8f0] bg-[#ffffff] text-[#091a36] transition hover:bg-[#f8fafc]"
            aria-expanded={open}
            aria-label="Abrir menú"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="flex flex-col gap-1">
              <span className={`h-[2px] w-4 bg-current transition-all ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`h-[2px] w-4 bg-current transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`h-[2px] w-4 bg-current transition-all ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Menú desplegable Mobile */}
      {open && (
        <nav className="border-t border-[#e2e8f0] bg-[#ffffff] px-6 py-4 shadow-lg lg:hidden">
          <ul className="flex flex-col gap-1.5">
            {navigation.map((item) => {
              const active = isNavItemActive(currentPath, item.href);
              const isUnite = item.href === "/unite";

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold uppercase tracking-wider transition ${
                      isUnite
                        ? "bg-[#0062ff] text-white"
                        : active
                        ? "bg-[#091a36] text-white"
                        : "text-[#334155] hover:bg-[#f0f6ff] hover:text-[#0062ff]"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span>→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}

export function PageHero({ eyebrow, title, description, aside }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#e2e8f0] bg-gradient-to-b from-[#f0f6ff]/80 via-[#ffffff] to-[#ffffff] py-12 md:py-16">
      <div className="mx-auto w-[min(1280px,92vw)]">
        <div className="max-w-4xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d8e5f8] bg-[#f0f6ff] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#0062ff]">
            {eyebrow}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0e2246] sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#475569] sm:text-lg md:text-xl">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

export function FeaturedStory({ story }: FeaturedStoryProps) {
  const isExternal = story.href.startsWith("http");
  return (
    <article className="relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-[#ffffff] p-7 md:p-10 shadow-[0_4px_24px_rgba(9,26,54,0.06)]">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-[#d8e5f8] bg-[#f0f6ff] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0062ff]">
          {story.category}
        </span>
        {story.date && (
          <span className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
            {story.date}
          </span>
        )}
      </div>

      <h2 className="mt-4 text-2xl font-extrabold leading-tight text-[#0e2246] sm:text-3xl md:text-4xl lg:text-5xl">
        {story.title}
      </h2>

      {story.imageUrl ? <PostImage src={story.imageUrl} alt={story.title} variant="featured" /> : null}

      <p className="mt-5 max-w-4xl text-base leading-relaxed text-[#475569] md:text-lg">
        {story.excerpt}
      </p>

      <div className="mt-7">
        {isExternal ? (
          <a
            href={story.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#091a36] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#0062ff]"
          >
            <span>{story.cta}</span>
            <span>→</span>
          </a>
        ) : (
          <Link
            href={story.href}
            className="inline-flex items-center gap-2 rounded-full bg-[#091a36] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#0062ff]"
          >
            <span>{story.cta}</span>
            <span>→</span>
          </Link>
        )}
      </div>
    </article>
  );
}

export function FeedGrid({ items }: FeedGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article
          key={`${item.category}-${item.title}`}
          className="group flex flex-col justify-between rounded-2xl border border-[#e2e8f0] bg-[#ffffff] p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#0062ff] hover:shadow-[0_8px_24px_rgba(0,98,255,0.08)]"
        >
          <div>
            {item.imageUrl ? <PostImage src={item.imageUrl} alt={item.title} variant="card" /> : null}
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full border border-[#d8e5f8] bg-[#f0f6ff] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#0062ff]">
                {item.category}
              </span>
              {item.date && (
                <span className="text-[11px] font-semibold text-[#64748b]">
                  {item.date}
                </span>
              )}
            </div>
            <h3 className="mt-4 text-lg font-bold leading-snug text-[#0e2246] transition group-hover:text-[#0062ff]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#475569] line-clamp-3">
              {item.excerpt}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#f1f5f9]">
            {item.href.startsWith("http") ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0062ff] transition group-hover:underline"
              >
                <span>{item.cta}</span>
                <span>→</span>
              </a>
            ) : (
              <Link
                href={item.href}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0062ff] transition group-hover:underline"
              >
                <span>{item.cta}</span>
                <span>→</span>
              </Link>
            )}
          </div>
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
    <div className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0062ff]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-bold text-[#0e2246] sm:text-3xl md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[#64748b] sm:text-base">{description}</p>
    </div>
  );
}

export function PeopleGrid({ people }: PeopleGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {people.map((person) => (
        <article
          key={person.name}
          className="flex flex-col rounded-2xl border border-[#e2e8f0] bg-[#ffffff] p-6 shadow-sm transition hover:border-[#0062ff]"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#d8e5f8] bg-[#091a36]">
              {person.imageUrl ? (
                <Image
                  src={person.imageUrl}
                  alt={person.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              ) : (
                <div className="grid h-full w-full place-items-center text-base font-bold text-white">
                  {person.initials}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-[#0e2246]">{person.name}</h3>
              <p className="text-xs font-bold uppercase tracking-wider text-[#0062ff]">{person.role}</p>
            </div>
          </div>
          {person.bio ? (
            <p className="mt-4 text-sm leading-relaxed text-[#475569]">{person.bio}</p>
          ) : null}
          {person.profileUrl ? (
            <div className="mt-4 pt-3 border-t border-[#f1f5f9]">
              <a
                href={person.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0062ff] hover:underline"
              >
                <span>Perfil LinkedIn</span>
                <span>↗</span>
              </a>
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative border-t border-[#e2e8f0] bg-[#ffffff] pt-12 pb-6">
      <div className="mx-auto grid w-[min(1280px,92vw)] gap-10 md:grid-cols-[1.3fr_0.8fr_0.9fr]">
        <div>
          <div className="flex h-16 w-[320px] items-center justify-start overflow-hidden">
            <Image
              src="/clubdefinanzasubalogohorizontal.png"
              alt="Club de Finanzas UBA"
              width={800}
              height={200}
              className="h-full w-full object-contain object-left"
            />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#475569]">
            Organización académica y profesional de estudiantes de la Facultad de Ciencias Económicas de la Universidad de Buenos Aires.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#0062ff]" />
            <p className="text-xs font-bold uppercase tracking-wider text-[#091a36]">
              Buenos Aires, Argentina
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#091a36]">
            Canales y Redes
          </p>
          <div className="mt-4 space-y-2.5">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center justify-between text-sm text-[#475569] transition hover:text-[#0062ff]"
              >
                <span className="font-semibold text-[#0e2246]">{item.label}</span>
                <span className="text-xs text-[#64748b]">{item.value}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#091a36] text-[11px] font-bold text-white">
              i
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#091a36]">
              Descargo de Responsabilidad
            </p>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-[#64748b]">
            El contenido publicado en este sitio web tiene propósitos estrictamente educativos e informativos. No constituye asesoramiento financiero ni recomendación de inversión.
          </p>
          <div className="mt-6 flex items-center justify-between border-t border-[#f1f5f9] pt-4 text-xs text-[#64748b]">
            <span>© {new Date().getFullYear()} Club de Finanzas UBA</span>
            <Link href="/admin" className="font-semibold text-[#091a36] hover:text-[#0062ff]">
              Acceso Staff
            </Link>
          </div>
        </div>
      </div>

      {/* Línea inferior distintiva azul marino */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#091a36]" />
    </footer>
  );
}
