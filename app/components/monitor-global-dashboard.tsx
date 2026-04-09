"use client";

import { RefreshCw } from "lucide-react";
import { useMemo } from "react";
import { useGlobalMarket } from "../hooks/useGlobalMarket";
import type { GlobalMarketItem, GlobalMarketSection } from "../lib/types";
import {
  formatMarketChangePercent,
  formatMarketValue,
  getMarketItemIcon,
  marketStatusDotClass,
  marketStatusTextClass,
} from "../lib/market-presenter";
import { MonitorGlobalSkeleton } from "./monitor-global-skeleton";

function DotStatus({ item }: { item: GlobalMarketItem }) {
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${marketStatusDotClass(item)}`} />;
}

function SectionTable({ section }: { section: GlobalMarketSection }) {
  return (
    <section className="overflow-hidden border-t border-[var(--color-line)] first:border-t-0">
      <h2 className="px-6 py-3 text-sm font-semibold uppercase tracking-[0.32em] text-[var(--color-blue)]">
        {section.title}
      </h2>
      <div>
        {section.items.map((item, index) => (
          <div
            key={`${section.key}-${item.symbol}`}
            className={`grid grid-cols-[minmax(0,1fr)_40px_auto] items-center gap-2 border-t border-[var(--color-line)] px-5 py-4 ${
              index % 2 === 0 ? "bg-[rgba(18,63,137,0.03)]" : "bg-white"
            }`}
          >
            <div className="flex min-w-0 items-center gap-4">
              <span className="text-3xl leading-none">{getMarketItemIcon(section.key, item.symbol)}</span>
              <div className="min-w-0">
                <p className="truncate text-[1.05rem] font-medium text-[var(--color-muted)]">{item.label}</p>
                <p className="truncate text-[2rem] leading-none font-semibold text-[var(--color-ink)]">
                  {formatMarketValue(item.value, section.key, item.symbol)}
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <DotStatus item={item} />
            </div>
            <div className={`text-right text-[1.5rem] font-semibold ${marketStatusTextClass(item)}`}>
              <span className="text-2xl">{formatMarketChangePercent(item.changePercent)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MonitorGlobalDashboard() {
  const { data, loading, refreshing, error, refresh } = useGlobalMarket();

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
    <section className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-[family:var(--font-display)] text-4xl text-[var(--color-ink)] md:text-5xl">
            Monitor Global
          </h2>
          <p className="mt-1 text-lg text-[var(--color-muted)] md:text-xl">
            Principales indicadores del mercado mundial en tiempo real.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-muted)]">
          <button
            type="button"
            onClick={() => void refresh()}
            disabled={refreshing}
            className="inline-flex items-center gap-1 rounded-full border border-[var(--color-line)] bg-white px-3 py-1.5 text-[var(--color-blue)] transition hover:bg-[rgba(18,63,137,0.06)]"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            {refreshing ? "Actualizando..." : "Actualizar"}
          </button>
          <span>Actualizado: {updatedAtLabel}</span>
          {data?.stale ? (
            <span className="rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-amber-700">
              stale
            </span>
          ) : null}
        </div>
      </header>

      <section className="overflow-hidden rounded-[30px] border border-[var(--color-line)] bg-white shadow-[0_20px_70px_rgba(18,35,63,0.12)]">
        {loading ? <MonitorGlobalSkeleton /> : null}
        {error ? (
          <p className="m-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
        ) : null}

        {!loading && !error && data ? (
          <>
            {data.sections.map((section) => (
              <SectionTable key={section.key} section={section} />
            ))}
          </>
        ) : null}
      </section>
    </section>
  );
}
