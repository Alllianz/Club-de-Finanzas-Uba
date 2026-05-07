"use client";

import { useEffect, useState } from "react";
import { BackofficeShell } from "../../components/backoffice-shell";
import { API_BASE_URL } from "../../lib/config";
import type { ContactLink } from "../../lib/types";

const kinds = ["LINKEDIN", "INSTAGRAM", "X", "EMAIL", "WHATSAPP", "YOUTUBE", "LOCATION", "OTHER"];

export default function AdminLinksPage() {
  const [items, setItems] = useState<ContactLink[]>([]);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ kind: "OTHER", label: "", value: "", href: "", sortOrder: 0, isActive: true });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ kind: "OTHER", label: "", value: "", href: "", sortOrder: 0, isActive: true });

  async function load() {
    const response = await fetch(`${API_BASE_URL}/admin/v2/contact-links`, { credentials: "include" });
    const payload = await response.json();
    setItems(payload.items ?? []);
  }

  useEffect(() => { void load(); }, []);

  async function create() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/v2/contact-links`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error();
      setForm({ kind: "OTHER", label: "", value: "", href: "", sortOrder: 0, isActive: true });
      await load();
      setNotice("Link creado.");
    } catch {
      setNotice("No se pudo crear link.");
    }
  }

  async function remove(id: string) {
    await fetch(`${API_BASE_URL}/admin/v2/contact-links/${id}`, { method: "DELETE", credentials: "include" });
    await load();
  }

  function startEdit(item: ContactLink) {
    setEditingId(item.id);
    setDraft({
      kind: item.kind,
      label: item.label,
      value: item.value ?? "",
      href: item.href,
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
      const response = await fetch(`${API_BASE_URL}/admin/v2/contact-links/${editingId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!response.ok) throw new Error();
      setEditingId(null);
      await load();
      setNotice("Link actualizado.");
    } catch {
      setNotice("No se pudo actualizar link.");
    }
  }

  return (
    <BackofficeShell title="Links y redes" subtitle="Gestioná CV, donaciones, canales y redes del club.">
      <section className="space-y-4 rounded-3xl border border-[var(--color-line)] bg-white p-6">
        <h2 className="text-2xl font-semibold">Nuevo link</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <select className="rounded-xl border p-3" value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value })}>
            {kinds.map((kind) => <option key={kind} value={kind}>{kind}</option>)}
          </select>
          <input className="rounded-xl border p-3" placeholder="Label" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
          <input className="rounded-xl border p-3" placeholder="Valor (opcional)" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
          <input className="rounded-xl border p-3" placeholder="Href" value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} />
        </div>
        <button onClick={create} className="rounded-full bg-[var(--color-blue)] px-5 py-2 text-white">Crear</button>
        {notice ? <p className="text-sm text-[var(--color-muted)]">{notice}</p> : null}
      </section>

      <section className="mt-6 rounded-3xl border border-[var(--color-line)] bg-white p-6">
        <h2 className="text-2xl font-semibold">Links ({items.length})</h2>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-[var(--color-line)] p-4">
              {editingId === item.id ? (
                <div className="space-y-2">
                  <select className="rounded-xl border p-2 text-sm" value={draft.kind} onChange={(e) => setDraft({ ...draft, kind: e.target.value })}>
                    {kinds.map((kind) => <option key={kind} value={kind}>{kind}</option>)}
                  </select>
                  <input className="w-full rounded-xl border p-2 text-sm" value={draft.label} onChange={(e) => setDraft({ ...draft, label: e.target.value })} />
                  <input className="w-full rounded-xl border p-2 text-sm" value={draft.value} onChange={(e) => setDraft({ ...draft, value: e.target.value })} />
                  <input className="w-full rounded-xl border p-2 text-sm" value={draft.href} onChange={(e) => setDraft({ ...draft, href: e.target.value })} />
                  <div className="flex gap-2">
                    <button className="rounded border px-3 py-1 text-xs" onClick={() => void saveEdit()}>Guardar</button>
                    <button className="rounded border px-3 py-1 text-xs" onClick={cancelEdit}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-blue)]">{item.kind}</p>
                  <p className="mt-1 font-semibold">{item.label}</p>
                  <p className="text-sm text-[var(--color-muted)]">{item.value ?? item.href}</p>
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
