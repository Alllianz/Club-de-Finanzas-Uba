"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import type { Role } from "../lib/types";

type BackofficeShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

const navItems = [
  { href: "/admin", label: "Resumen", roles: ["ADMIN", "EDITOR"] as Role[] },
  { href: "/admin/articles", label: "Articulos", roles: ["ADMIN", "EDITOR"] as Role[] },
  { href: "/admin/users", label: "Usuarios", roles: ["ADMIN"] as Role[] },
];

export function BackofficeShell({ title, subtitle, children }: BackofficeShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <main className="mx-auto min-h-screen w-[min(1100px,92vw)] py-14 text-[var(--color-ink)]">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-muted)]">Backoffice</p>
        <h1 className="mt-3 text-4xl font-semibold">Validando sesion...</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-[min(1100px,92vw)] py-10 text-[var(--color-ink)]">
      <header className="rounded-[28px] border border-[var(--color-line)] bg-white p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-[var(--color-muted)]">Backoffice · Club de Finanzas</p>
            <h1 className="mt-3 text-3xl font-semibold md:text-4xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">{subtitle}</p>
          </div>

          <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-soft)] px-4 py-3 text-sm">
            <p className="text-[var(--color-muted)]">Sesion activa</p>
            <p className="font-semibold text-[var(--color-ink)]">{user?.fullName || user?.email || "Usuario"}</p>
            <p className="text-[var(--color-muted)]">{user?.role || "-"}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {navItems
            .filter((item) => (user ? item.roles.includes(user.role) : false))
            .map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? "border border-[var(--color-blue)] bg-[var(--color-blue)] text-[#ffffff]"
                      : "border border-[var(--color-line)] text-[var(--color-muted)] hover:border-[var(--color-blue)] hover:text-[var(--color-blue)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

          <Link
            href="/"
            className="rounded-full border border-[var(--color-line)] px-4 py-2 text-sm text-[var(--color-muted)] transition hover:border-[var(--color-blue)] hover:text-[var(--color-blue)]"
          >
            Ver sitio publico
          </Link>

          <button
            onClick={async () => {
              await logout();
              router.push("/");
            }}
            className="rounded-full border border-red-300/40 px-4 py-2 text-sm text-red-200 transition hover:border-red-200 hover:text-red-100"
          >
            Cerrar sesion
          </button>
        </div>
      </header>

      <section className="mt-7">{children}</section>
    </main>
  );
}
