"use client";

import { useEffect, useState } from "react";
import { BackofficeShell } from "../../components/backoffice-shell";
import { API_BASE_URL } from "../../lib/config";
import type { Post, PostSection, PostType } from "../../lib/types";

const emptyForm = {
  title: "",
  summary: "",
  body: "",
  type: "NEWSLETTER" as PostType,
  section: "NEWSLETTER" as PostSection,
  status: "PUBLISHED",
  isFeatured: false,
  assets: [] as { kind: "PDF" | "IMAGE" | "FLYER"; url: string; key?: string }[],
  authorsText: "",
  eventDate: "",
  registrationUrl: "",
};

export default function AdminPostsPage() {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string>("");
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/v2/posts`, { credentials: "include" });
      const payload = await response.json();
      setItems(payload.items ?? []);
    } catch {
      setNotice("No se pudieron cargar los posts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const currentAssetKind = form.type === "REPORT" ? "pdf" : form.type === "EVENT" ? "flyer" : "image";

  async function uploadFile(file: File) {
    setUploading(true);
    setNotice("");
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("kind", currentAssetKind);
      const response = await fetch(`${API_BASE_URL}/admin/v2/uploads`, {
        method: "POST",
        credentials: "include",
        body: data,
      });
      if (!response.ok) throw new Error("upload error");
      const payload = await response.json();
      const asset = payload.asset as { url: string; kind: string; key: string };
      setForm((prev) => ({
        ...prev,
        assets: [...prev.assets, { kind: asset.kind as "PDF" | "IMAGE" | "FLYER", url: asset.url, key: asset.key }],
      }));
      setNotice("Archivo subido a R2.");
    } catch {
      setNotice("No se pudo subir el archivo.");
    } finally {
      setUploading(false);
    }
  }

  async function createPost() {
    try {
      const assets = form.assets.map((asset, index) => ({ ...asset, sortOrder: index }));
      const authors = form.authorsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((teamMemberId, index) => ({ teamMemberId, sortOrder: index }));

      const body = {
        title: form.title,
        summary: form.summary,
        body: form.body,
        type: form.type,
        section: form.section,
        status: form.status,
        isFeatured: form.isFeatured,
        assets,
        authors,
        eventMeta:
          form.type === "EVENT" && form.eventDate
            ? {
                eventDate: form.eventDate,
                pinUntil: form.eventDate,
                registrationUrl: form.registrationUrl || null,
              }
            : undefined,
      };

      const isEdit = Boolean(editingId);
      const endpoint = isEdit ? `${API_BASE_URL}/admin/v2/posts/${editingId}` : `${API_BASE_URL}/admin/v2/posts`;
      const response = await fetch(endpoint, {
        method: isEdit ? "PATCH" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("error");
      setForm(emptyForm);
      setEditingId(null);
      setNotice(isEdit ? "Post actualizado." : "Post creado.");
      await load();
    } catch {
      setNotice(editingId ? "No se pudo actualizar el post." : "No se pudo crear el post.");
    }
  }

  function deriveKeyFromUrl(url: string): string | null {
    try {
      const parsed = new URL(url);
      return parsed.pathname.replace(/^\/+/, "");
    } catch {
      return null;
    }
  }

  async function removeAsset(index: number) {
    const target = form.assets[index];
    if (!target) return;

    if (target.key) {
      try {
        const params = new URLSearchParams({ key: target.key });
        const response = await fetch(`${API_BASE_URL}/admin/v2/uploads?${params.toString()}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!response.ok) throw new Error("delete failed");
      } catch {
        setNotice("No se pudo borrar el archivo en R2.");
        return;
      }
    }

    setForm((prev) => ({
      ...prev,
      assets: prev.assets.filter((_, i) => i !== index),
    }));
  }

  function startEdit(post: Post) {
    setEditingId(post.id);
    setForm({
      title: post.title,
      summary: post.summary,
      body: post.body ?? "",
      type: post.type,
      section: post.section,
      status: post.status,
      isFeatured: post.isFeatured,
      assets: post.assets.map((asset) => ({
        kind: asset.kind,
        url: asset.url,
        key: deriveKeyFromUrl(asset.url) ?? undefined,
      })),
      authorsText: post.authors.map((author) => author.teamMemberId).join("\n"),
      eventDate: post.eventMeta?.eventDate ? post.eventMeta.eventDate.slice(0, 16) : "",
      registrationUrl: post.eventMeta?.registrationUrl ?? "",
    });
    setNotice("Editando publicación.");
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setNotice("");
  }

  async function deletePost(postId: string) {
    if (!confirm("¿Eliminar esta publicación?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/admin/v2/posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("delete failed");
      if (editingId === postId) {
        cancelEdit();
      }
      setNotice("Post eliminado.");
      await load();
    } catch {
      setNotice("No se pudo eliminar el post.");
    }
  }

  return (
    <BackofficeShell title="Gestión de publicaciones" subtitle="Modelo unificado: informes, newsletter y eventos.">
      <section className="space-y-6 rounded-3xl border border-[var(--color-line)] bg-white p-6">
        <h2 className="text-2xl font-semibold">{editingId ? "Editar post" : "Nuevo post"}</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-xl border p-3" placeholder="Título" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
          <input className="rounded-xl border p-3" placeholder="Resumen" value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} />
          <select className="rounded-xl border p-3" value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value as PostType })}>
            <option value="REPORT">Informe</option>
            <option value="NEWSLETTER">Newsletter</option>
            <option value="EVENT">Evento</option>
          </select>
          <select className="rounded-xl border p-3" value={form.section} onChange={(event) => setForm({ ...form, section: event.target.value as PostSection })}>
            <option value="HOME">Home</option>
            <option value="NEWSLETTER">Newsletter</option>
            <option value="RESEARCH">Research</option>
            <option value="PORTFOLIO">Portfolio</option>
            <option value="INSTITUTIONAL">Institutional</option>
          </select>
        </div>
        <textarea className="min-h-[100px] w-full rounded-xl border p-3" placeholder="Cuerpo" value={form.body} onChange={(event) => setForm({ ...form, body: event.target.value })} />
        <div className="rounded-xl border p-4">
          <p className="text-sm font-medium">Assets</p>
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            {form.type === "REPORT" ? "Subí PDF." : form.type === "EVENT" ? "Subí flyer/imagen del evento." : "Subí imágenes para newsletter."}
          </p>
          <input
            type="file"
            accept={form.type === "REPORT" ? "application/pdf" : "image/*"}
            className="mt-3 block w-full text-sm"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void uploadFile(file);
              event.currentTarget.value = "";
            }}
            disabled={uploading}
          />
          {uploading ? <p className="mt-2 text-xs text-[var(--color-muted)]">Subiendo...</p> : null}
          <div className="mt-3 space-y-2">
            {form.assets.map((asset, index) => (
              <div key={`${asset.url}-${index}`} className="flex items-center justify-between gap-3 rounded-lg border p-2 text-xs">
                <a href={asset.url} target="_blank" rel="noopener noreferrer" className="truncate text-[var(--color-blue)] underline">
                  {asset.url}
                </a>
                <button
                  type="button"
                  className="rounded border px-2 py-1"
                  onClick={() => void removeAsset(index)}
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
        </div>
        <textarea className="min-h-[80px] w-full rounded-xl border p-3" placeholder="Autores (TeamMember ID por línea)" value={form.authorsText} onChange={(event) => setForm({ ...form, authorsText: event.target.value })} />
        {form.type === "EVENT" ? (
          <div className="grid gap-3 md:grid-cols-2">
            <input type="datetime-local" className="rounded-xl border p-3" value={form.eventDate} onChange={(event) => setForm({ ...form, eventDate: event.target.value })} />
            <input className="rounded-xl border p-3" placeholder="Link inscripción" value={form.registrationUrl} onChange={(event) => setForm({ ...form, registrationUrl: event.target.value })} />
          </div>
        ) : null}
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.isFeatured} onChange={(event) => setForm({ ...form, isFeatured: event.target.checked })} />
          Destacado
        </label>
        <div className="flex flex-wrap gap-2">
          <button onClick={createPost} className="rounded-full bg-[var(--color-blue)] px-5 py-2 text-white">
            {editingId ? "Guardar cambios" : "Crear post"}
          </button>
          {editingId ? (
            <button type="button" onClick={cancelEdit} className="rounded-full border px-5 py-2">
              Cancelar edición
            </button>
          ) : null}
        </div>
        {notice ? <p className="text-sm text-[var(--color-muted)]">{notice}</p> : null}
      </section>

      <section className="mt-6 rounded-3xl border border-[var(--color-line)] bg-white p-6">
        <h2 className="text-2xl font-semibold">Publicaciones ({items.length})</h2>
        {loading ? <p className="mt-3 text-sm">Cargando...</p> : null}
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-[var(--color-line)] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-blue)]">{item.type} · {item.section}</p>
              <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
              <p className="text-sm text-[var(--color-muted)]">{item.summary}</p>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={() => startEdit(item)} className="rounded border px-3 py-1 text-xs">
                  Editar
                </button>
                <button type="button" onClick={() => void deletePost(item.id)} className="rounded border px-3 py-1 text-xs text-red-700">
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </BackofficeShell>
  );
}
