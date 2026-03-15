"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { BackofficeShell } from "../../components/backoffice-shell";
import { API_BASE_URL } from "../../lib/config";
import type { Role } from "../../lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
        <Card className="border-white/12 bg-white/[0.04] text-white">
          <CardHeader>
            <CardTitle>Nuevo usuario</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={createUser} className="space-y-3">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Email"
                className="bg-black/35 text-white placeholder:text-white/35"
              />
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nombre completo"
                className="bg-black/35 text-white placeholder:text-white/35"
              />
              <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                <SelectTrigger className="bg-black/35 text-white">
                  <SelectValue placeholder="Rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EDITOR">EDITOR</SelectItem>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" className="w-full bg-white text-slate-900 hover:bg-white/90">
                Crear usuario preaprobado
              </Button>
            </form>
            <p className="mt-4 text-xs text-white/60">Tip: se crea activo y puede pedir OTP de inmediato.</p>
          </CardContent>
        </Card>

        <Card className="border-white/12 bg-white/[0.04] text-white">
          <CardHeader>
            <CardTitle>Usuarios cargados</CardTitle>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por email, nombre o rol"
              className="bg-black/35 text-white placeholder:text-white/35"
            />
          </CardHeader>
          <CardContent>
            {error ? (
              <Alert variant="destructive" className="mb-4 border-red-400/55 bg-red-500/12 text-red-100">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            {loading ? (
              <p className="text-white/65">Cargando usuarios...</p>
            ) : filteredUsers.length === 0 ? (
              <p className="text-white/65">No hay usuarios para mostrar.</p>
            ) : (
              <div className="space-y-3">
                {filteredUsers.map((user) => (
                  <article key={user.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold">{user.email}</p>
                        <p className="text-sm text-white/65">{user.fullName || "Sin nombre"}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={user.role === "ADMIN" ? "bg-[#3d4ca8]" : "bg-white/20 text-white"}>
                          {user.role}
                        </Badge>
                        <Badge variant="outline" className={user.isActive ? "border-emerald-300/50 text-emerald-200" : "border-rose-300/50 text-rose-200"}>
                          {user.isActive ? "ACTIVO" : "INACTIVO"}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 bg-transparent text-white hover:bg-white/10"
                        onClick={() => void patchUser(user.id, { isActive: !user.isActive })}
                      >
                        {user.isActive ? "Desactivar" : "Activar"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 bg-transparent text-white hover:bg-white/10"
                        onClick={() => void patchUser(user.id, { role: user.role === "ADMIN" ? "EDITOR" : "ADMIN" })}
                      >
                        Pasar a {user.role === "ADMIN" ? "EDITOR" : "ADMIN"}
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </BackofficeShell>
  );
}
