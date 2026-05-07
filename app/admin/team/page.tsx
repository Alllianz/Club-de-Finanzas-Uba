"use client";

import { useEffect, useState } from "react";
import { BackofficeShell } from "../../components/backoffice-shell";
import { API_BASE_URL } from "../../lib/config";
import type { TeamMember } from "../../lib/types";

const sections = ["LEADERSHIP", "PORTFOLIO", "RESEARCH", "RRII"] as const;

export default function AdminTeamPage() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    title: "",
    shortBio: "",
    section: "LEADERSHIP",
    profileUrl: "",
    imageUrl: "",
    displayOrder: 0,
    isActive: true,
  });

  async function load() {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/team-members`, { credentials: "include" });
      const payload = await response.json();
      setItems(payload.items ?? []);
    } catch {
      setNotice("No se pudieron cargar integrantes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function uploadImage(file: File) {
    setUploading(true);
    setNotice("");
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("kind", "image");
      const response = await fetch(`${API_BASE_URL}/admin/v2/uploads`, {
        method: "POST",
        credentials: "include",
        body: data,
      });
      if (!response.ok) throw new Error("upload");
      const payload = await response.json();
      setForm((prev) => ({ ...prev, imageUrl: payload.asset.url }));
      setNotice("Imagen subida.");
    } catch {
      setNotice("No se pudo subir la imagen.");
    } finally {
      setUploading(false);
    }
  }

  async function create() {
    setNotice("");
    try {
      const response = await fetch(`${API_BASE_URL}/admin/team-members`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("create");
      setForm({ fullName: "", title: "", shortBio: "", section: "LEADERSHIP", profileUrl: "", imageUrl: "", displayOrder: 0, isActive: true });
      setNotice("Integrante creado.");
      await load();
    } catch {
      setNotice("No se pudo crear integrante.");
    }
  }

  async function patch(item: TeamMember, payload: Partial<TeamMember>) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/team-members/${item.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("patch");
      await load();
    } catch {
      setNotice("No se pudo actualizar integrante.");
    }
  }

  async function remove(item: TeamMember) {
    if (!confirm(`¿Eliminar a ${item.fullName}?`)) return;
    try {
      const response = await fetch(`${API_BASE_URL}/admin/team-members/${item.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("delete");
      await load();
    } catch {
      setNotice("No se pudo eliminar integrante.");
    }
  }

  return (
    <BackofficeShell title="Integrantes" subtitle="Gestioná líderes, consejo, founders y equipos; incluye foto y LinkedIn.">
      <section className="space-y-6 rounded-3xl border border-[var(--color-line)] bg-white p-6">
        <h2 className="text-2xl font-semibold">Nuevo integrante</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-xl border p-3" placeholder="Nombre" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          <input className="rounded-xl border p-3" placeholder="Rol visual" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <select className="rounded-xl border p-3" value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })}>
            {sections.map((section) => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
          <input className="rounded-xl border p-3" placeholder="LinkedIn URL" value={form.profileUrl} onChange={(e) => setForm({ ...form, profileUrl: e.target.value })} />
        </div>
        <textarea className="min-h-[90px] w-full rounded-xl border p-3" placeholder="Bio corta" value={form.shortBio} onChange={(e) => setForm({ ...form, shortBio: e.target.value })} />
        <div className="grid gap-3 md:grid-cols-[1fr_200px]">
          <input className="rounded-xl border p-3" placeholder="URL imagen (auto por upload)" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
          <input type="number" className="rounded-xl border p-3" placeholder="Orden" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) || 0 })} />
        </div>
        <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) void uploadImage(file); }} disabled={uploading} />
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
          Activo
        </label>
        <button onClick={create} className="rounded-full bg-[var(--color-blue)] px-5 py-2 text-white">Crear integrante</button>
        {notice ? <p className="text-sm text-[var(--color-muted)]">{notice}</p> : null}
      </section>

      <section className="mt-6 rounded-3xl border border-[var(--color-line)] bg-white p-6">
        <h2 className="text-2xl font-semibold">Integrantes ({items.length})</h2>
        {loading ? <p className="mt-3 text-sm">Cargando...</p> : null}
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-[var(--color-line)] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-blue)]">{item.section}</p>
              <p className="mt-1 text-lg font-semibold">{item.fullName}</p>
              <p className="text-sm text-[var(--color-muted)]">{item.title}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="rounded border px-3 py-1 text-xs" onClick={() => void patch(item, { isActive: !item.isActive })}>{item.isActive ? "Desactivar" : "Activar"}</button>
                <button className="rounded border px-3 py-1 text-xs" onClick={() => void remove(item)}>Eliminar</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </BackofficeShell>
  );
}
