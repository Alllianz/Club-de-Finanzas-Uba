"use client";

import { ArrowDownRight, ArrowUpRight, Dot, RefreshCw } from "lucide-react";
import { useMemo } from "react";
import { useGlobalMarket } from "../hooks/useGlobalMarket";
import type { GlobalMarketItem, GlobalMarketSection } from "../lib/types";

function formatValue(value: number | null) {
  if (value === null) return "--";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
}

function formatChangePercent(value: number | null) {
  if (value === null) return "--";
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value.toFixed(2)}%`;
}

function valueClassName(item: GlobalMarketItem) {
  if (item.status === "positive") return "text-emerald-600";
  if (item.status === "negative") return "text-red-600";
  return "text-zinc-500";
}

function DirectionIcon({ item }: { item: GlobalMarketItem }) {
  if (item.direction === "up") return <ArrowUpRight className="h-4 w-4 text-emerald-600" />;
  if (item.direction === "down") return <ArrowDownRight className="h-4 w-4 text-red-600" />;
  return <Dot className="h-4 w-4 text-zinc-500" />;
}

function SectionTable({ section }: { section: GlobalMarketSection }) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500">{section.title}</h2>
      <div className="space-y-2">
        {section.items.map((item) => (
          <div
            key={`${section.key}-${item.symbol}`}
            className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-lg border border-zinc-100 px-3 py-2"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-zinc-900">{item.label}</p>
              <p className="text-xs text-zinc-500">{item.symbol}</p>
            </div>
            <p className="text-sm font-semibold text-zinc-900">{formatValue(item.value)}</p>
            <div className={`flex items-center text-sm font-medium ${valueClassName(item)}`}>
              <DirectionIcon item={item} />
              <span>{formatChangePercent(item.changePercent)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MonitorGlobalDashboard() {
  const { data, loading, error, refresh } = useGlobalMarket();

  const updatedAtLabel = useMemo(() => {
    if (!data?.updatedAt) return "Sin actualización";
    const date = new Date(data.updatedAt);
    if (Number.isNaN(date.getTime())) return "Sin actualización";
    return new Intl.DateTimeFormat("es-AR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  }, [data?.updatedAt]);

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Monitor Global</h1>
          <p className="text-sm text-zinc-600">
            Principales indicadores del mercado mundial en tiempo real.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <button
            type="button"
            onClick={() => void refresh()}
            className="inline-flex items-center gap-1 rounded-md border border-zinc-200 px-2 py-1 text-zinc-600 hover:bg-zinc-100"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Actualizar
          </button>
          <span>Actualizado: {updatedAtLabel}</span>
          {data?.stale ? <span className="rounded bg-amber-100 px-2 py-0.5 text-amber-700">stale</span> : null}
        </div>
      </header>

      {loading ? <p className="text-sm text-zinc-500">Cargando monitor...</p> : null}
      {error ? <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

      {!loading && !error && data ? (
        <div className="grid gap-4 md:grid-cols-3">
          {data.sections.map((section) => (
            <SectionTable key={section.key} section={section} />
          ))}
        </div>
      ) : null}
    </main>
  );
}
