"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { BackofficeShell } from "../../components/backoffice-shell";
import { API_BASE_URL } from "../../lib/config";
import { useAuth } from "../../context/AuthContext";
import type { AdminArticle, ArticleSection, ArticleStatus } from "../../lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { INITIAL_ARTICLE_FORM, type ArticleFormValues } from "./article-config";
import { ArticleEditorForm } from "./components/article-editor-form";
import { ArticleCard } from "./components/article-card";

type ListResponse = { items: AdminArticle[] };

const PAGE_SIZE = 6;
const SECTION_ORDER: ArticleSection[] = ["HOME", "PORTFOLIO", "RESEARCH", "NEWS"];

const SECTION_META: Record<ArticleSection, { label: string; eyebrow: string }> = {
  HOME: { label: "Inicio", eyebrow: "Portada principal" },
  PORTFOLIO: { label: "Portfolio", eyebrow: "Publicaciones del area" },
  RESEARCH: { label: "Research", eyebrow: "Biblioteca de analisis" },
  NEWS: { label: "Noticias", eyebrow: "Novedades institucionales y agenda" },
};

function normalizeFeaturedBySection(source: AdminArticle[]) {
  const winnerBySection = new Map<ArticleSection, string>();

  const sorted = [...source].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  for (const item of sorted) {
    if (item.isFeatured && !winnerBySection.has(item.section)) {
      winnerBySection.set(item.section, item.id);
    }
  }

  return source.map((item) => ({
    ...item,
    isFeatured: winnerBySection.get(item.section) === item.id,
  }));
}
export default function AdminArticlesPage() {
  const { user } = useAuth();

  const [items, setItems] = useState<AdminArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [activeSection, setActiveSection] = useState<ArticleSection>("HOME");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | ArticleStatus>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<ArticleFormValues>(INITIAL_ARTICLE_FORM);

  const [editOpen, setEditOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<AdminArticle | null>(null);
  const [editForm, setEditForm] = useState<ArticleFormValues>(INITIAL_ARTICLE_FORM);

  const [editedByMap, setEditedByMap] = useState<Record<string, string>>({});
  const [confirmFeaturedOpen, setConfirmFeaturedOpen] = useState(false);
  const [pendingFeaturedTarget, setPendingFeaturedTarget] = useState<AdminArticle | null>(null);
  const [pendingFeaturedPrevious, setPendingFeaturedPrevious] = useState<AdminArticle | null>(null);

  const loadArticles = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/admin/articles`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("No se pudieron cargar articulos");
      const data = (await response.json()) as ListResponse;
      setItems(normalizeFeaturedBySection(data.items));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadArticles();
  }, [loadArticles]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeSection, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    const published = items.filter((item) => item.status === "PUBLISHED").length;
    const draft = items.length - published;

    return {
      total: items.length,
      published,
      draft,
      homeCount: items.filter((item) => item.section === "HOME").length,
      portfolioCount: items.filter((item) => item.section === "PORTFOLIO").length,
      researchCount: items.filter((item) => item.section === "RESEARCH").length,
      newsCount: items.filter((item) => item.section === "NEWS").length,
    };
  }, [items]);

  const activeSectionItems = useMemo(
    () => items.filter((item) => item.section === activeSection),
    [items, activeSection],
  );

  const featuredTitle = useMemo(
    () => activeSectionItems.find((item) => item.isFeatured)?.title ?? "Sin destacada",
    [activeSectionItems],
  );

  const searchedItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return activeSectionItems.filter((item) => {
      const statusOk = statusFilter === "ALL" || item.status === statusFilter;
      if (!statusOk) return false;
      if (!q) return true;

      return [
        item.title,
        item.excerpt,
        item.category,
        item.ctaLabel,
        item.author?.fullName,
        item.author?.email,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [activeSectionItems, searchQuery, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(searchedItems.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (safeCurrentPage - 1) * PAGE_SIZE;
    return searchedItems.slice(start, start + PAGE_SIZE);
  }, [searchedItems, safeCurrentPage]);

  const patchArticle = useCallback(
    async (articleId: string, payload: Record<string, unknown>) => {
      setError("");
      try {
        const response = await fetch(`${API_BASE_URL}/admin/articles/${articleId}`, {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("No se pudo actualizar articulo");
        await loadArticles();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error");
      }
    },
    [loadArticles],
  );

  const createArticle = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/admin/articles`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });
      if (!response.ok) throw new Error("No se pudo crear articulo");

      setCreateForm(INITIAL_ARTICLE_FORM);
      setCreateOpen(false);
      await loadArticles();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    }
  };

  const openEditDialog = (item: AdminArticle) => {
    setEditingArticle(item);
    setEditForm({
      section: item.section,
      category: item.category,
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      ctaLabel: item.ctaLabel,
      ctaUrl: item.ctaUrl,
      status: item.status,
      isFeatured: item.isFeatured,
    });
    setEditOpen(true);
  };

  const submitEditArticle = async (event: FormEvent) => {
    event.preventDefault();
    if (!editingArticle) return;

    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/admin/articles/${editingArticle.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!response.ok) throw new Error("No se pudo editar articulo");

      const editor = user?.fullName || user?.email || "Usuario";
      setEditedByMap((prev) => ({ ...prev, [editingArticle.id]: editor }));
      setEditOpen(false);
      setEditingArticle(null);
      await loadArticles();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    }
  };

  const setSectionFeaturedLocally = (target: AdminArticle) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.section !== target.section) return item;
        if (item.id === target.id) {
          return { ...item, isFeatured: true, status: "PUBLISHED" as ArticleStatus };
        }
        return { ...item, isFeatured: false };
      }),
    );
  };

  const clearFeaturedLocally = (target: AdminArticle) => {
    setItems((prev) => prev.map((item) => (item.id === target.id ? { ...item, isFeatured: false } : item)));
  };

  const applyFeaturedTarget = (target: AdminArticle) => {
    const sectionName = SECTION_META[target.section].label;
    setSectionFeaturedLocally(target);
    if (target.status === "DRAFT") {
      setNotice(`Se reemplazo la destacada en ${sectionName}. "${target.title}" estaba en borrador y se publico automaticamente.`);
    } else {
      setNotice(`Se reemplazo la destacada en ${sectionName}. Ahora esta destacada: "${target.title}".`);
    }
    void patchArticle(target.id, { isFeatured: true, status: "PUBLISHED" });
  };

  const handleToggleFeatured = (target: AdminArticle) => {
    if (target.isFeatured) {
      clearFeaturedLocally(target);
      setNotice("Se quito la destacada de esta nota en su seccion.");
      void patchArticle(target.id, { isFeatured: false });
      return;
    }

    const previousFeatured = items.find(
      (candidate) =>
        candidate.section === target.section &&
        candidate.isFeatured &&
        candidate.id !== target.id,
    );

    if (previousFeatured) {
      setPendingFeaturedTarget(target);
      setPendingFeaturedPrevious(previousFeatured);
      setConfirmFeaturedOpen(true);
      return;
    }

    setSectionFeaturedLocally(target);
    if (target.status === "DRAFT") {
      setNotice("La nota estaba en borrador. Se publico automaticamente y quedo como destacada.");
    } else {
      setNotice("La nota seleccionada ahora es la destacada de su seccion.");
    }
    void patchArticle(target.id, { isFeatured: true, status: "PUBLISHED" });
  };

  const confirmFeaturedReplacement = () => {
    if (!pendingFeaturedTarget) return;
    applyFeaturedTarget(pendingFeaturedTarget);
    setConfirmFeaturedOpen(false);
    setPendingFeaturedTarget(null);
    setPendingFeaturedPrevious(null);
  };

  const cancelFeaturedReplacement = () => {
    setNotice("Cambio cancelado. Se mantiene la destacada anterior.");
    setConfirmFeaturedOpen(false);
    setPendingFeaturedTarget(null);
    setPendingFeaturedPrevious(null);
  };

  return (
    <BackofficeShell
      title="Gestion de articulos"
      subtitle="Panel por pestañas con buscador y paginacion para escalar contenido por seccion."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-white/12 bg-white/[0.04] text-white">
          <CardContent className="pt-5">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Estado global</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="outline" className="border-white/25 text-white">Total: {stats.total}</Badge>
              <Badge variant="outline" className="border-emerald-300/50 text-emerald-200">Publicados: {stats.published}</Badge>
              <Badge variant="outline" className="border-amber-300/50 text-amber-200">Borradores: {stats.draft}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/12 bg-white/[0.04] text-white">
          <CardContent className="pt-5">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Secciones</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <Badge variant="outline" className="border-white/25 text-white">Inicio: {stats.homeCount}</Badge>
              <Badge variant="outline" className="border-white/25 text-white">Portfolio: {stats.portfolioCount}</Badge>
              <Badge variant="outline" className="border-white/25 text-white">Research: {stats.researchCount}</Badge>
              <Badge variant="outline" className="border-white/25 text-white">Noticias: {stats.newsCount}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-300/40 bg-amber-300/10 text-white">
          <CardContent className="pt-5">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-100">Regla de destacadas</p>
            <p className="mt-2 text-sm text-amber-50">
              Solo puede haber 1 destacada por seccion. Al marcar una nueva, se reemplaza automaticamente la anterior.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-5 border-white/12 bg-white/[0.04] text-white">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle>Listado editorial</CardTitle>

            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger className="inline-flex h-8 items-center rounded-lg bg-white px-3 text-sm font-medium text-slate-900 hover:bg-white/90">
                + Nuevo articulo
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto border-white/20 bg-[#090d1f] text-white sm:max-w-[760px]">
                <DialogHeader>
                  <DialogTitle>Crear articulo</DialogTitle>
                  <DialogDescription className="text-white/70">
                    Completa los campos y publica o deja como borrador.
                  </DialogDescription>
                </DialogHeader>

                <ArticleEditorForm
                  form={createForm}
                  setForm={(updater) => setCreateForm((prev) => updater(prev))}
                  onSubmit={createArticle}
                  onCancel={() => setCreateOpen(false)}
                  submitLabel="Guardar articulo"
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {SECTION_ORDER.map((section) => {
              const count = items.filter((item) => item.section === section).length;
              const active = section === activeSection;

              return (
                <button
                  key={section}
                  type="button"
                  onClick={() => setActiveSection(section)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? "bg-white text-slate-900"
                      : "border border-white/20 bg-transparent text-white/80 hover:border-white/35 hover:text-white"
                  }`}
                >
                  {SECTION_META[section].label} ({count})
                </button>
              );
            })}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_220px]">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Buscar en ${SECTION_META[activeSection].label} por titulo, categoria o autor...`}
              className="bg-black/35 text-white placeholder:text-white/35"
            />

            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as "ALL" | ArticleStatus)}>
              <SelectTrigger className="border-white/20 bg-slate-950 text-white">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent className="border-white/20 bg-slate-950 text-white">
                <SelectItem value="ALL">Todos los estados</SelectItem>
                <SelectItem value="PUBLISHED">Publicado</SelectItem>
                <SelectItem value="DRAFT">Borrador</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto border-white/20 bg-[#090d1f] text-white sm:max-w-[760px]">
            <DialogHeader>
              <DialogTitle>Editar articulo</DialogTitle>
              <DialogDescription className="text-white/70">
                Actualiza el contenido y guarda los cambios.
              </DialogDescription>
            </DialogHeader>

            <ArticleEditorForm
              form={editForm}
              setForm={(updater) => setEditForm((prev) => updater(prev))}
              onSubmit={submitEditArticle}
              onCancel={() => {
                setEditOpen(false);
                setEditingArticle(null);
              }}
              submitLabel="Guardar cambios"
            />
          </DialogContent>
        </Dialog>

        <Dialog open={confirmFeaturedOpen} onOpenChange={setConfirmFeaturedOpen}>
          <DialogContent className="border-white/20 bg-[#090d1f] text-white sm:max-w-[620px]">
            <DialogHeader>
              <DialogTitle>Reemplazar destacada</DialogTitle>
              <DialogDescription className="text-white/70">
                Esta accion desmarca la destacada actual y deja una sola destacada por seccion.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2 rounded-lg border border-white/12 bg-black/30 p-3 text-sm text-white/80">
              <p>
                Actual: <span className="font-semibold text-white">{pendingFeaturedPrevious?.title ?? "-"}</span>
              </p>
              <p>
                Nueva: <span className="font-semibold text-white">{pendingFeaturedTarget?.title ?? "-"}</span>
              </p>
            </div>

            <div className="mt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10"
                onClick={cancelFeaturedReplacement}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                className="bg-white text-slate-900 hover:bg-white/90"
                onClick={confirmFeaturedReplacement}
              >
                Confirmar cambio
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <CardContent>
          {notice ? (
            <Alert className="mb-4 border-amber-300/50 bg-amber-500/10 text-amber-100">
              <AlertDescription>{notice}</AlertDescription>
            </Alert>
          ) : null}

          {error ? (
            <Alert variant="destructive" className="mb-4 border-red-400/55 bg-red-500/12 text-red-100">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          {loading ? (
            <p className="text-white/65">Cargando articulos...</p>
          ) : (
            <section className="rounded-2xl border border-white/10 bg-black/15 p-4 md:p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">{SECTION_META[activeSection].eyebrow}</p>
                  <h3 className="mt-1 text-xl font-semibold text-white">{SECTION_META[activeSection].label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-white/25 text-white">
                    Resultados: {searchedItems.length}
                  </Badge>
                  <Badge className="border border-amber-300/50 bg-amber-300/15 text-amber-100">
                    Destacada: {featuredTitle}
                  </Badge>
                </div>
              </div>

              {searchedItems.length === 0 ? (
                <p className="text-sm text-white/60">No hay articulos para esa busqueda en esta seccion.</p>
              ) : (
                <>
                  <div className="space-y-3">
                    {paginatedItems.map((item) => (
                      <ArticleCard
                        key={item.id}
                        item={item}
                        editedBy={editedByMap[item.id]}
                        onEdit={openEditDialog}
                        onToggleStatus={(id, currentStatus) =>
                          void patchArticle(id, {
                            status: currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED",
                          })
                        }
                        onToggleFeatured={handleToggleFeatured}
                      />
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/25 px-3 py-2">
                    <p className="text-xs text-white/60">
                      Pagina {safeCurrentPage} de {totalPages} · Mostrando {paginatedItems.length} de {searchedItems.length}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="rounded-md border border-white/20 px-3 py-1 text-sm text-white/80 disabled:cursor-not-allowed disabled:opacity-40"
                        disabled={safeCurrentPage <= 1}
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      >
                        Anterior
                      </button>
                      <button
                        type="button"
                        className="rounded-md border border-white/20 px-3 py-1 text-sm text-white/80 disabled:cursor-not-allowed disabled:opacity-40"
                        disabled={safeCurrentPage >= totalPages}
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                </>
              )}
            </section>
          )}
        </CardContent>
      </Card>
    </BackofficeShell>
  );
}




