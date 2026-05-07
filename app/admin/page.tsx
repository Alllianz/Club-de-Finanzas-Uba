"use client";

import Link from "next/link";
import { BackofficeShell } from "../components/backoffice-shell";
import { useAuth } from "../context/AuthContext";

export default function AdminPage() {
  const { user } = useAuth();

  return (
    <BackofficeShell
      title="Panel de control"
      subtitle="Vista general del backoffice. Desde aca administras publicaciones, usuarios y acceso por roles."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <article className="rounded-3xl border border-white/12 bg-white/[0.04] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">Contenido</p>
          <h2 className="mt-3 text-2xl font-semibold">Gestión de publicaciones</h2>
          <p className="mt-2 text-sm leading-7 text-white/68">
            Crear, publicar y editar informes, newsletters y eventos.
          </p>
          <Link
            href="/admin/posts"
            className="mt-5 inline-flex rounded-full border border-white/18 px-4 py-2 text-sm transition hover:border-white/35"
          >
            Ir a publicaciones
          </Link>
        </article>

        <article className="rounded-3xl border border-white/12 bg-white/[0.04] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">Accesos</p>
          <h2 className="mt-3 text-2xl font-semibold">Gestion de usuarios</h2>
          <p className="mt-2 text-sm leading-7 text-white/68">
            Definir quién entra, con qué rol, y qué usuarios quedan activos/inactivos.
          </p>

          {user?.role === "ADMIN" ? (
            <Link
              href="/admin/users"
              className="mt-5 inline-flex rounded-full border border-white/18 px-4 py-2 text-sm transition hover:border-white/35"
            >
              Ir a usuarios
            </Link>
          ) : (
            <p className="mt-5 text-sm text-amber-200/85">Solo ADMIN puede acceder a este modulo.</p>
          )}
        </article>

        <article className="rounded-3xl border border-white/12 bg-white/[0.04] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">Equipo</p>
          <h2 className="mt-3 text-2xl font-semibold">Integrantes y links</h2>
          <p className="mt-2 text-sm leading-7 text-white/68">
            Cargar líderes, miembros, redes, sponsors y recursos desde UI.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/admin/team" className="inline-flex rounded-full border border-white/18 px-4 py-2 text-sm transition hover:border-white/35">Integrantes</Link>
            <Link href="/admin/links" className="inline-flex rounded-full border border-white/18 px-4 py-2 text-sm transition hover:border-white/35">Links</Link>
            <Link href="/admin/sponsors" className="inline-flex rounded-full border border-white/18 px-4 py-2 text-sm transition hover:border-white/35">Sponsors</Link>
            <Link href="/admin/resources" className="inline-flex rounded-full border border-white/18 px-4 py-2 text-sm transition hover:border-white/35">Recursos</Link>
          </div>
        </article>
      </div>

      <article className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-white/45">Flujo recomendado</p>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-white/70">
          <li>Validar que exista al menos un usuario ADMIN activo.</li>
          <li>Cargar o revisar publicaciones en estado PUBLISHED.</li>
          <li>Verificar Home/Portfolio/Research en sitio publico.</li>
        </ol>
      </article>
    </BackofficeShell>
  );
}
