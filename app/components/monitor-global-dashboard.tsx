"use client";

import { RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useGlobalMarket } from "../hooks/useGlobalMarket";
import type { CountryRiskPoint, GlobalMarketItem, GlobalMarketSection } from "../lib/types";
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

function formatRiskValue(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

function RiskTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: CountryRiskPoint & { previous: CountryRiskPoint | null } }>;
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  const previous = point.previous;
  const variation = previous ? point.value - previous.value : null;
  const variationPercent = previous && previous.value !== 0 ? (variation! / previous.value) * 100 : null;

  return (
    <div className="rounded-xl border border-[var(--color-line)] bg-[#fffdf8] px-4 py-3 text-sm text-[var(--color-ink)] shadow-[0_14px_28px_rgba(18,35,63,0.18)]">
      <p className="text-base font-semibold">{point.date}</p>
      <p className="mt-1 text-[var(--color-muted)]">
        Riesgo país: <span className="font-semibold text-[var(--color-ink)]">{formatRiskValue(point.value)} puntos</span>
      </p>
      {variation !== null ? (
        <p className={`mt-1 font-semibold ${variation >= 0 ? "text-rose-400" : "text-emerald-400"}`}>
          Variación: {variation >= 0 ? "+" : ""}
          {formatRiskValue(variation)} puntos
          {variationPercent !== null ? ` (${variationPercent >= 0 ? "+" : ""}${variationPercent.toFixed(2)}%)` : ""}
        </p>
      ) : null}
      {previous ? <p className="mt-1 text-[var(--color-muted)]">vs. día anterior: {formatRiskValue(previous.value)} puntos</p> : null}
    </div>
  );
}

export function MonitorGlobalDashboard() {
  const { data, countryRisk, loading, refreshing, globalError, refresh } = useGlobalMarket();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const updatedAtLabel = useMemo(() => {
    if (!hydrated) return "Sin actualización";
    if (!data?.updatedAt) return "Sin actualización";
    const date = new Date(data.updatedAt);
    if (Number.isNaN(date.getTime())) return "Sin actualización";
    return new Intl.DateTimeFormat("es-AR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  }, [data?.updatedAt, hydrated]);

  const countryRiskSeries = useMemo(
    () =>
      countryRisk.series.map((point, index, items) => ({
        ...point,
        previous: index > 0 ? items[index - 1] : null,
      })),
    [countryRisk.series],
  );

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

      <section className="rounded-[30px] border border-[var(--color-line)] bg-[linear-gradient(180deg,#ffffff,#f6f2e8)] p-5 text-[var(--color-ink)] shadow-[0_20px_70px_rgba(18,35,63,0.08)] md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-blue)]">Argentina</p>
            <h3 className="mt-1 text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">Riesgo país (EMBI+)</h3>
            <p className="mt-1 text-sm text-[var(--color-muted)]">Serie histórica completa y variación diaria.</p>
          </div>
          <div className="text-right">
            {countryRisk.latest ? (
              <p className="text-2xl font-semibold text-[var(--color-ink)]">{formatRiskValue(countryRisk.latest.value)} pts</p>
            ) : (
              <p className="text-2xl font-semibold text-[var(--color-muted)]">--</p>
            )}
            <p className="text-xs text-[var(--color-muted)]">
              {countryRisk.latest ? `Fecha dato: ${countryRisk.latest.date}` : "Sin dato"}
            </p>
            {countryRisk.stale ? (
              <span className="mt-2 inline-block rounded-full border border-amber-300/40 bg-amber-500/15 px-2 py-0.5 text-[11px] text-amber-200">
                stale
              </span>
            ) : null}
          </div>
        </div>

        {countryRisk.error ? (
          <div className="mt-4 rounded-xl border border-red-300/35 bg-red-500/10 p-3 text-sm text-red-200">
            {countryRisk.error}
            <button
              type="button"
              onClick={() => void refresh()}
              className="ml-3 rounded-full border border-red-200/40 px-3 py-1 text-xs text-red-100 transition hover:bg-red-500/15"
            >
              Reintentar
            </button>
          </div>
        ) : null}

        {!countryRisk.error && countryRiskSeries.length ? (
          <div className="mt-5 h-[320px] w-full rounded-2xl border border-[var(--color-line)] bg-[linear-gradient(180deg,#ffffff,#f9f6ef)] p-2 md:h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={countryRiskSeries} margin={{ top: 12, right: 16, left: 2, bottom: 8 }}>
                <CartesianGrid strokeDasharray="0" stroke="rgba(85,98,120,0.16)" />
                {countryRisk.latest ? (
                  <ReferenceLine y={countryRisk.latest.value} stroke="rgba(85,98,120,0.6)" strokeDasharray="6 4" />
                ) : null}
                <XAxis
                  dataKey="date"
                  minTickGap={40}
                  tick={{ fill: "rgba(85,98,120,0.9)", fontSize: 12 }}
                  tickFormatter={(value) => String(value).slice(0, 7)}
                  axisLine={{ stroke: "rgba(85,98,120,0.26)" }}
                  tickLine={{ stroke: "rgba(85,98,120,0.26)" }}
                />
                <YAxis
                  tick={{ fill: "rgba(85,98,120,0.9)", fontSize: 12 }}
                  tickFormatter={(value) => formatRiskValue(Number(value))}
                  axisLine={{ stroke: "rgba(85,98,120,0.26)" }}
                  tickLine={{ stroke: "rgba(85,98,120,0.26)" }}
                  width={60}
                />
                <Tooltip content={<RiskTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#123f89"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#123f89", stroke: "#ffffff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : null}
        {!countryRisk.error && !countryRiskSeries.length ? (
          <div className="mt-4 rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-slate-200">
            No hay puntos de riesgo país disponibles para graficar.
            <button
              type="button"
              onClick={() => void refresh()}
              className="ml-3 rounded-full border border-slate-300/40 px-3 py-1 text-xs text-slate-100 transition hover:bg-white/10"
            >
              Reintentar
            </button>
          </div>
        ) : null}
      </section>

      <section className="overflow-hidden rounded-[30px] border border-[var(--color-line)] bg-white shadow-[0_20px_70px_rgba(18,35,63,0.12)]">
        {loading ? <MonitorGlobalSkeleton /> : null}
        {globalError ? (
          <p className="m-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{globalError}</p>
        ) : null}

        {!loading && !globalError && data ? (
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
