"use client";

import { useEffect, useState } from "react";
import { BackofficeShell } from "../../components/backoffice-shell";
import { API_BASE_URL } from "../../lib/config";
import type { Sponsor } from "../../lib/types";

export default function AdminSponsorsPage() {
  const [items, setItems] = useState<Sponsor[]>([]);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ name: "", logoUrl: "", linkUrl: "", sortOrder: 0, isActive: true });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ name: "", logoUrl: "", linkUrl: "", sortOrder: 0, isActive: true });

  async function load() {
    const response = await fetch(`${API_BASE_URL}/admin/v2/sponsors`, { credentials: "include" });
    const payload = await response.json();
    setItems(payload.items ?? []);
  }

  useEffect(() => { void load(); }, []);

  async function create() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/v2/sponsors`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error();
      setForm({ name: "", logoUrl: "", linkUrl: "", sortOrder: 0, isActive: true });
      await load();
      setNotice("Sponsor creado.");
    } catch {
      setNotice("No se pudo crear sponsor.");
    }
  }

  async function remove(id: string) {
    await fetch(`${API_BASE_URL}/admin/v2/sponsors/${id}`, { method: "DELETE", credentials: "include" });
    await load();
  }

  function startEdit(item: Sponsor) {
    setEditingId(item.id);
    setDraft({
      name: item.name,
      logoUrl: item.logoUrl ?? "",
      linkUrl: item.linkUrl ?? "",
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
      const response = await fetch(`${API_BASE_URL}/admin/v2/sponsors/${editingId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!response.ok) throw new Error();
      setEditingId(null);
      await load();
      setNotice("Sponsor actualizado.");
    } catch {
      setNotice("No se pudo actualizar sponsor.");
    }
  }

  return (
    <BackofficeShell title="Sponsors" subtitle="Gestioná apoyos y partners institucionales.">
      <section className="space-y-4 rounded-3xl border border-[var(--color-line)] bg-white p-6">
        <h2 className="text-2xl font-semibold">Nuevo sponsor</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-xl border p-3" placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="rounded-xl border p-3" placeholder="Logo URL" value={form.logoUrl} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} />
          <input className="rounded-xl border p-3" placeholder="Link URL" value={form.linkUrl} onChange={(e) => setForm({ ...form, linkUrl: e.target.value })} />
          <input type="number" className="rounded-xl border p-3" placeholder="Orden" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) || 0 })} />
        </div>
        <button onClick={create} className="rounded-full bg-[var(--color-blue)] px-5 py-2 text-white">Crear</button>
        {notice ? <p className="text-sm text-[var(--color-muted)]">{notice}</p> : null}
      </section>

      <section className="mt-6 rounded-3xl border border-[var(--color-line)] bg-white p-6">
        <h2 className="text-2xl font-semibold">Sponsors ({items.length})</h2>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-[var(--color-line)] p-4">
              {editingId === item.id ? (
                <div className="space-y-2">
                  <input className="w-full rounded-xl border p-2 text-sm" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                  <input className="w-full rounded-xl border p-2 text-sm" value={draft.logoUrl} onChange={(e) => setDraft({ ...draft, logoUrl: e.target.value })} />
                  <input className="w-full rounded-xl border p-2 text-sm" value={draft.linkUrl} onChange={(e) => setDraft({ ...draft, linkUrl: e.target.value })} />
                  <div className="flex gap-2">
                    <button className="rounded border px-3 py-1 text-xs" onClick={() => void saveEdit()}>Guardar</button>
                    <button className="rounded border px-3 py-1 text-xs" onClick={cancelEdit}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-[var(--color-muted)]">{item.linkUrl ?? "Sin link"}</p>
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
