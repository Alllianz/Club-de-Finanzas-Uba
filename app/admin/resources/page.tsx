"use client";

import { useEffect, useState } from "react";
import { BackofficeShell } from "../../components/backoffice-shell";
import { API_BASE_URL } from "../../lib/config";
import type { Resource } from "../../lib/types";

export default function AdminResourcesPage() {
  const [items, setItems] = useState<Resource[]>([]);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ title: "", type: "", url: "", description: "", sortOrder: 0, isActive: true });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ title: "", type: "", url: "", description: "", sortOrder: 0, isActive: true });

  async function load() {
    const response = await fetch(`${API_BASE_URL}/admin/v2/resources`, { credentials: "include" });
    const payload = await response.json();
    setItems(payload.items ?? []);
  }

  useEffect(() => { void load(); }, []);

  async function create() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/v2/resources`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error();
      setForm({ title: "", type: "", url: "", description: "", sortOrder: 0, isActive: true });
      await load();
      setNotice("Recurso creado.");
    } catch {
      setNotice("No se pudo crear recurso.");
    }
  }

  async function remove(id: string) {
    await fetch(`${API_BASE_URL}/admin/v2/resources/${id}`, { method: "DELETE", credentials: "include" });
    await load();
  }

  function startEdit(item: Resource) {
    setEditingId(item.id);
    setDraft({
      title: item.title,
      type: item.type,
      url: item.url,
      description: item.description ?? "",
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    });
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function saveEdit() {
    if (!editingId) return;
    try {
      const response = await fetch(`${API_BASE_URL}/admin/v2/resources/${editingId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!response.ok) throw new Error();
      setEditingId(null);
      await load();
      setNotice("Recurso actualizado.");
    } catch {
      setNotice("No se pudo actualizar recurso.");
    }
  }

  return (
    <BackofficeShell title="Recursos" subtitle="Gestioná links de herramientas y bibliografía.">
      <section className="space-y-4 rounded-3xl border border-[var(--color-line)] bg-white p-6">
        <h2 className="text-2xl font-semibold">Nuevo recurso</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-xl border p-3" placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="rounded-xl border p-3" placeholder="Tipo" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
          <input className="rounded-xl border p-3" placeholder="URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
          <input type="number" className="rounded-xl border p-3" placeholder="Orden" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) || 0 })} />
        </div>
        <textarea className="min-h-[80px] w-full rounded-xl border p-3" placeholder="Descripción" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button onClick={create} className="rounded-full bg-[var(--color-blue)] px-5 py-2 text-white">Crear</button>
        {notice ? <p className="text-sm text-[var(--color-muted)]">{notice}</p> : null}
      </section>

      <section className="mt-6 rounded-3xl border border-[var(--color-line)] bg-white p-6">
        <h2 className="text-2xl font-semibold">Recursos ({items.length})</h2>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-[var(--color-line)] p-4">
              {editingId === item.id ? (
                <div className="space-y-2">
                  <input className="w-full rounded-xl border p-2 text-sm" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
                  <input className="w-full rounded-xl border p-2 text-sm" value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })} />
                  <input className="w-full rounded-xl border p-2 text-sm" value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} />
                  <textarea className="min-h-[60px] w-full rounded-xl border p-2 text-sm" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
                  <div className="flex gap-2">
                    <button className="rounded border px-3 py-1 text-xs" onClick={() => void saveEdit()}>Guardar</button>
                    <button className="rounded border px-3 py-1 text-xs" onClick={cancelEdit}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-[var(--color-muted)]">{item.type}</p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-blue)] underline">{item.url}</a>
                  <div className="mt-2 flex gap-2">
                    <button className="rounded border px-3 py-1 text-xs" onClick={() => startEdit(item)}>Editar</button>
                    <button className="rounded border px-3 py-1 text-xs" onClick={() => void remove(item.id)}>Eliminar</button>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </section>
    </BackofficeShell>
  );
}
