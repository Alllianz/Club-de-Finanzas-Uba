"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { BackofficeShell } from "../../components/backoffice-shell";
import { API_BASE_URL } from "../../lib/config";
import type { Article, ArticleSection, ArticleStatus } from "../../lib/types";

type ListResponse = { items: Article[] };

const initialForm = {
  section: "HOME" as ArticleSection,
  category: "General",
  title: "",
  excerpt: "",
  content: "",
  ctaLabel: "Leer nota",
  ctaUrl: "https://www.linkedin.com/company/club-de-finanzas-uba/",
  status: "DRAFT" as ArticleStatus,
  isFeatured: false,
};

export default function AdminArticlesPage() {
  const [items, setItems] = useState<Article[]>([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sectionFilter, setSectionFilter] = useState<"ALL" | ArticleSection>("ALL");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (sectionFilter !== "ALL") params.set("section", sectionFilter);

      const response = await fetch(`${API_BASE_URL}/admin/articles?${params.toString()}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("No se pudieron cargar articulos");
      const data = (await response.json()) as ListResponse;
      setItems(data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, [sectionFilter]);

  const stats = useMemo(() => {
    const published = items.filter((item) => item.status === "PUBLISHED").length;
    const draft = items.length - published;
    return { total: items.length, published, draft };
  }, [items]);

  const createArticle = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/admin/articles`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("No se pudo crear articulo");
      setForm(initialForm);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    }
  };

  const patchArticle = async (articleId: string, payload: Record<string, unknown>) => {
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/admin/articles/${articleId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("No se pudo actualizar articulo");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    }
  };

  return (
    <BackofficeShell
      title="Gestion de articulos"
      subtitle="Carga, publicacion y orden editorial de contenido para Home, Portfolio y Research."
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.25fr]">
        <form onSubmit={createArticle} className="rounded-3xl border border-white/12 bg-white/[0.04] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">Nuevo articulo</p>
          <h2 className="mt-2 text-2xl font-semibold">Cargar contenido</h2>

          <div className="mt-5 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <select
                value={form.section}
                onChange={(e) => setForm((prev) => ({ ...prev, section: e.target.value as ArticleSection }))}
                className="rounded-xl border border-white/20 bg-transparent px-3 py-2"
              >
                <option value="HOME">HOME</option>
                <option value="PORTFOLIO">PORTFOLIO</option>
                <option value="RESEARCH">RESEARCH</option>
              </select>
              <select
                value={form.status}
                onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as ArticleStatus }))}
                className="rounded-xl border border-white/20 bg-transparent px-3 py-2"
              >
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
              </select>
            </div>

            <input
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              placeholder="Categoria"
              className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2"
            />
            <input
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              required
              placeholder="Titulo"
              className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2"
            />
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
              required
              placeholder="Bajada corta (excerpt)"
              className="min-h-20 w-full rounded-xl border border-white/20 bg-transparent px-3 py-2"
            />
            <textarea
              value={form.content}
              onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
              required
              placeholder="Contenido completo"
              className="min-h-28 w-full rounded-xl border border-white/20 bg-transparent px-3 py-2"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                value={form.ctaLabel}
                onChange={(e) => setForm((prev) => ({ ...prev, ctaLabel: e.target.value }))}
                placeholder="CTA label"
                className="rounded-xl border border-white/20 bg-transparent px-3 py-2"
              />
              <input
                value={form.ctaUrl}
                onChange={(e) => setForm((prev) => ({ ...prev, ctaUrl: e.target.value }))}
                placeholder="CTA URL"
                className="rounded-xl border border-white/20 bg-transparent px-3 py-2"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-white/75">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => setForm((prev) => ({ ...prev, isFeatured: e.target.checked }))}
              />
              Marcar como destacada en Home
            </label>
            <button type="submit" className="w-full rounded-xl bg-white px-4 py-2 text-slate-900">
              Crear articulo
            </button>
          </div>
        </form>

        <section className="rounded-3xl border border-white/12 bg-white/[0.04] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">Listado editorial</p>
              <h2 className="mt-1 text-2xl font-semibold">Articulos cargados</h2>
            </div>
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value as "ALL" | ArticleSection)}
              className="rounded-xl border border-white/20 bg-transparent px-3 py-2"
            >
              <option value="ALL">Todas las secciones</option>
              <option value="HOME">HOME</option>
              <option value="PORTFOLIO">PORTFOLIO</option>
              <option value="RESEARCH">RESEARCH</option>
            </select>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-white/12 px-3 py-1">Total: {stats.total}</span>
            <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-emerald-100">PUBLISHED: {stats.published}</span>
            <span className="rounded-full bg-amber-300/20 px-3 py-1 text-amber-100">DRAFT: {stats.draft}</span>
          </div>

          {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}

          {loading ? (
            <p className="mt-6 text-white/65">Cargando articulos...</p>
          ) : items.length === 0 ? (
            <p className="mt-6 text-white/65">No hay articulos en esta seccion.</p>
          ) : (
            <div className="mt-5 space-y-3">
              {items.map((item) => (
                <article key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                        {item.section} · {item.category}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm text-white/68">{item.excerpt}</p>
                    </div>
                    <div className="flex flex-col gap-1 text-right text-xs">
                      <span
                        className={`rounded-full px-3 py-1 ${
                          item.status === "PUBLISHED"
                            ? "bg-emerald-400/20 text-emerald-100"
                            : "bg-amber-300/20 text-amber-100"
                        }`}
                      >
                        {item.status}
                      </span>
                      {item.isFeatured ? (
                        <span className="rounded-full bg-[#3d4ca8]/35 px-3 py-1 text-[#dfe7ff]">FEATURED</span>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        void patchArticle(item.id, {
                          status: item.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED",
                        })
                      }
                      className="rounded-lg border border-white/20 px-3 py-1.5 text-xs"
                    >
                      {item.status === "PUBLISHED" ? "Pasar a draft" : "Publicar"}
                    </button>
                    <button
                      onClick={() => void patchArticle(item.id, { isFeatured: !item.isFeatured })}
                      className="rounded-lg border border-white/20 px-3 py-1.5 text-xs"
                    >
                      {item.isFeatured ? "Quitar destacada" : "Marcar destacada"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </BackofficeShell>
  );
}
