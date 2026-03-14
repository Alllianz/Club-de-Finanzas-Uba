"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { BackofficeShell } from "../../components/backoffice-shell";
import { API_BASE_URL } from "../../lib/config";
import type { Role } from "../../lib/types";

type AdminUser = {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
};

type UsersResponse = { items: AdminUser[] };

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<Role>("EDITOR");
  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`, { credentials: "include" });
      if (!response.ok) throw new Error("No se pudieron cargar usuarios");
      const data = (await response.json()) as UsersResponse;
      setUsers(data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter((user) =>
      [user.email, user.fullName, user.role].join(" ").toLowerCase().includes(q),
    );
  }, [users, search]);

  const createUser = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fullName, role }),
      });
      if (!response.ok) throw new Error("No se pudo crear usuario");

      setEmail("");
      setFullName("");
      setRole("EDITOR");
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    }
  };

  const patchUser = async (userId: string, payload: Partial<Pick<AdminUser, "isActive" | "role">>) => {
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("No se pudo actualizar usuario");
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    }
  };

  return (
    <BackofficeShell
      title="Gestion de usuarios"
      subtitle="Alta de usuarios preaprobados, asignacion de rol y control de estado activo/inactivo."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <form onSubmit={createUser} className="rounded-3xl border border-white/12 bg-white/[0.04] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">Alta rapida</p>
          <h2 className="mt-3 text-2xl font-semibold">Nuevo usuario</h2>

          <div className="mt-5 space-y-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="Email"
              className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2"
            />
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nombre completo"
              className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2"
            >
              <option value="EDITOR">EDITOR</option>
              <option value="ADMIN">ADMIN</option>
            </select>
            <button type="submit" className="w-full rounded-xl bg-white px-4 py-2 text-slate-900">
              Crear usuario preaprobado
            </button>
          </div>

          <p className="mt-4 text-xs leading-6 text-white/55">
            Tip: el usuario se crea activo y ya puede pedir OTP.
          </p>
        </form>

        <section className="rounded-3xl border border-white/12 bg-white/[0.04] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">Listado</p>
              <h2 className="mt-1 text-2xl font-semibold">Usuarios cargados</h2>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por email, nombre o rol"
              className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2 md:w-[320px]"
            />
          </div>

          {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}

          {loading ? (
            <p className="mt-6 text-white/65">Cargando usuarios...</p>
          ) : filteredUsers.length === 0 ? (
            <p className="mt-6 text-white/65">No hay usuarios para mostrar.</p>
          ) : (
            <div className="mt-5 space-y-3">
              {filteredUsers.map((user) => (
                <article key={user.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{user.email}</p>
                      <p className="text-sm text-white/65">{user.fullName || "Sin nombre"}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          user.role === "ADMIN" ? "bg-[#3d4ca8] text-white" : "bg-white/15 text-white/85"
                        }`}
                      >
                        {user.role}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          user.isActive ? "bg-emerald-400/20 text-emerald-200" : "bg-rose-400/20 text-rose-200"
                        }`}
                      >
                        {user.isActive ? "ACTIVO" : "INACTIVO"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => void patchUser(user.id, { isActive: !user.isActive })}
                      className="rounded-lg border border-white/20 px-3 py-1.5 text-xs"
                    >
                      {user.isActive ? "Desactivar" : "Activar"}
                    </button>
                    <button
                      onClick={() => void patchUser(user.id, { role: user.role === "ADMIN" ? "EDITOR" : "ADMIN" })}
                      className="rounded-lg border border-white/20 px-3 py-1.5 text-xs"
                    >
                      Pasar a {user.role === "ADMIN" ? "EDITOR" : "ADMIN"}
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
