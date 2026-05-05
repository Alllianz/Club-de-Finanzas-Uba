"use client";

import { RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  ComposedChart,
  Line,
  Scatter,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { LetrasCurveResponse, LetrasPoint } from "../lib/types";
import { marketService } from "../services/market-service";

function formatPercent(value: number | null): string {
  if (value === null) return "--";
  return `${value.toFixed(1)}%`;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function LetrasCurveDashboard() {
  const [data, setData] = useState<LetrasCurveResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);

  const load = async (refresh = false) => {
    if (refresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError("");

    try {
      const payload = await marketService.getLetrasCurve({ refresh });
      setData(payload);
      if (!selectedTicker && payload.points.length) {
        setSelectedTicker(payload.points[0].ticker);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo cargar letras");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chartData = useMemo(() => {
    if (!data) return [];
    return data.points
      .filter((point) => point.teaPercent !== null)
      .map((point) => ({
        ...point,
        teaPercent: point.teaPercent as number,
      }));
  }, [data]);

  const lineData = useMemo(() => data?.curve.sample ?? [], [data]);

  const updatedAtLabel = useMemo(() => {
    if (!data?.updatedAt) return "Sin actualización";
    const date = new Date(data.updatedAt);
    if (Number.isNaN(date.getTime())) return "Sin actualización";
    return new Intl.DateTimeFormat("es-AR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  }, [data?.updatedAt]);

  const selected = useMemo(
    () => data?.points.find((point) => point.ticker === selectedTicker) ?? null,
    [data?.points, selectedTicker],
  );

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="inline-flex items-center rounded-md border border-[var(--color-line)] bg-white px-3 py-1 text-xs uppercase tracking-[0.22em] text-[var(--color-blue)]">
            ARS · LECAPS
          </p>
          <h2 className="mt-3 font-[family:var(--font-display)] text-4xl text-[var(--color-ink)] sm:text-5xl">LECAPs</h2>
          <p className="mt-3 max-w-3xl text-base text-[var(--color-muted)] sm:text-lg">
            Curva TEA vs DTM calculada con regresión cuadrática de 14 puntos sobre letras activas.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
          <button
            type="button"
            onClick={() => void load(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-1 rounded-full border border-[var(--color-line)] bg-white px-3 py-1.5 text-[var(--color-blue)] transition hover:bg-[rgba(18,63,137,0.06)]"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            {refreshing ? "Actualizando..." : "Actualizar cierre"}
          </button>
          <span>Actualizado: {updatedAtLabel}</span>
          {data?.stale ? (
            <span className="rounded-full border border-amber-300/40 bg-amber-500/15 px-2 py-0.5 text-amber-200">
              stale
            </span>
          ) : null}
        </div>
      </header>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      ) : null}

      {loading ? (
        <div className="rounded-2xl border border-[var(--color-line)] bg-white p-8 text-sm text-[var(--color-muted)]">Cargando curva de letras...</div>
      ) : null}

      {!loading && data ? (
        <div className="grid gap-6 xl:grid-cols-[1.25fr_1fr]">
          <section className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white">
            <div className="flex items-center justify-between border-b border-[var(--color-line)] px-5 py-4">
              <p className="text-sm uppercase tracking-[0.26em] text-[var(--color-blue)]">Detalle</p>
              <p className="text-sm text-[var(--color-muted)]">{data.total}</p>
            </div>
            <div className="hidden max-h-[640px] overflow-auto md:block">
              <table className="w-full text-left">
                <thead className="sticky top-0 z-10 bg-[#f9f6ef] text-[var(--color-muted)]">
                  <tr>
                    <th className="px-5 py-3 text-sm font-medium">SYM</th>
                    <th className="px-5 py-3 text-sm font-medium">DTM</th>
                    <th className="px-5 py-3 text-sm font-medium">TEM</th>
                    <th className="px-5 py-3 text-sm font-medium">TNA</th>
                    <th className="px-5 py-3 text-sm font-medium">TEA</th>
                    <th className="px-5 py-3 text-sm font-medium">VPV</th>
                    <th className="px-5 py-3 text-sm font-medium">PRECIO</th>
                  </tr>
                </thead>
                <tbody>
                  {data.points.map((point: LetrasPoint) => {
                    const selectedRow = point.ticker === selectedTicker;
                    return (
                      <tr
                        key={point.ticker}
                        onClick={() => setSelectedTicker(point.ticker)}
                        className={`cursor-pointer border-t border-[var(--color-line)] transition ${
                          selectedRow ? "bg-[rgba(18,63,137,0.1)]" : "hover:bg-[rgba(18,63,137,0.05)]"
                        }`}
                      >
                        <td className="px-5 py-3 text-[1.8rem] leading-none text-[var(--color-ink)]">{point.ticker}</td>
                        <td className="px-5 py-3 text-[1.6rem] text-[var(--color-muted)]">{point.dtmDays}</td>
                        <td className="px-5 py-3 text-[1.6rem] text-[var(--color-ink)]">{formatPercent(point.temPercent)}</td>
                        <td className="px-5 py-3 text-[1.6rem] text-[var(--color-ink)]">{formatPercent(point.tnaPercent)}</td>
                        <td className="px-5 py-3 text-[1.6rem] text-[var(--color-blue)]">{formatPercent(point.teaPercent)}</td>
                        <td className="px-5 py-3 text-[1.6rem] text-[var(--color-ink)]">{formatNumber(point.vpv)}</td>
                        <td className="px-5 py-3 text-[1.6rem] text-[var(--color-ink)]">{formatNumber(point.price)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="grid gap-3 p-3 md:hidden">
              {data.points.map((point) => {
                const selectedRow = point.ticker === selectedTicker;
                return (
                  <button
                    key={point.ticker}
                    type="button"
                    onClick={() => setSelectedTicker(point.ticker)}
                    className={`rounded-xl border p-3 text-left transition ${
                      selectedRow
                        ? "border-[var(--color-blue)] bg-[rgba(18,63,137,0.1)]"
                        : "border-[var(--color-line)] bg-[#fffdf8] hover:bg-[rgba(18,63,137,0.05)]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold text-[var(--color-ink)]">{point.ticker}</p>
                      <p className="text-sm text-[var(--color-muted)]">DTM {point.dtmDays}</p>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <p className="text-[var(--color-muted)]">
                        TEM: <span className="text-[var(--color-ink)]">{formatPercent(point.temPercent)}</span>
                      </p>
                      <p className="text-[var(--color-muted)]">
                        TNA: <span className="text-[var(--color-ink)]">{formatPercent(point.tnaPercent)}</span>
                      </p>
                      <p className="text-[var(--color-muted)]">
                        TEA: <span className="text-[var(--color-blue)]">{formatPercent(point.teaPercent)}</span>
                      </p>
                      <p className="text-[var(--color-muted)]">
                        VPV: <span className="text-[var(--color-ink)]">{formatNumber(point.vpv)}</span>
                      </p>
                      <p className="text-[var(--color-muted)]">
                        Precio: <span className="text-[var(--color-ink)]">{formatNumber(point.price)}</span>
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--color-line)] bg-white p-4 md:p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-blue)] sm:text-sm">TEA × DTM (días)</p>
              <p className="text-xs text-[var(--color-muted)] sm:text-sm">
                Curva: Regresión cuadrática · {data.curve.coefficients?.points ?? 0} puntos
              </p>
            </div>
            <div className="h-[360px] w-full sm:h-[460px]">
              {chartData.length ? (
                <ChartContainer
                  className="h-full w-full"
                  config={{
                    teaPercent: { label: "TEA", color: "#123f89" },
                    curve: { label: "Curva", color: "#7ca0d8" },
                  }}
                >
                  <ComposedChart margin={{ top: 12, right: 16, left: 4, bottom: 16 }}>
                    <CartesianGrid strokeDasharray="2 4" stroke="rgba(85,98,120,0.18)" />
                    <XAxis
                      type="number"
                      dataKey="dtmDays"
                      domain={["dataMin - 10", "dataMax + 10"]}
                      tick={{ fill: "rgba(85,98,120,0.9)", fontSize: 12 }}
                      tickFormatter={(value) => `${Math.round(Number(value))}d`}
                      stroke="rgba(85,98,120,0.25)"
                      minTickGap={28}
                    />
                    <YAxis
                      type="number"
                      dataKey="teaPercent"
                      tick={{ fill: "rgba(85,98,120,0.9)", fontSize: 12 }}
                      tickFormatter={(value) => `${Number(value).toFixed(1)}%`}
                      stroke="rgba(85,98,120,0.25)"
                      width={52}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          className="border-[var(--color-line)] bg-[#fffdf8] text-[var(--color-ink)]"
                          formatter={(value, _name, context) => {
                            const payload = context.payload as LetrasPoint | undefined;
                            if (!payload) return null;
                            return (
                              <div className="space-y-1">
                                <p className="font-semibold text-[var(--color-ink)]">{payload.ticker}</p>
                                <p className="text-[var(--color-muted)]">DTM: {payload.dtmDays} días</p>
                                <p className="text-[var(--color-ink)]">TEA: {Number(value).toFixed(2)}%</p>
                              </div>
                            );
                          }}
                        />
                      }
                    />
                    <Scatter data={chartData} fill="#123f89" />
                    {lineData.length ? (
                      <Line
                        type="monotone"
                        data={lineData}
                        dataKey="teaPercent"
                        stroke="#5f86c5"
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                      />
                    ) : null}
                  </ComposedChart>
                </ChartContainer>
              ) : (
                <div className="grid h-full place-items-center rounded-xl border border-dashed border-[var(--color-line)] text-sm text-[var(--color-muted)]">
                  No hay puntos TEA válidos para dibujar la curva.
                </div>
              )}
            </div>
            {selected ? (
              <p className="mt-3 text-sm text-[var(--color-muted)]">
                Seleccionado: <span className="text-[var(--color-ink)]">{selected.ticker}</span> · DTM {selected.dtmDays} · TEA{" "}
                <span className="text-[var(--color-blue)]">{formatPercent(selected.teaPercent)}</span>
              </p>
            ) : null}
          </section>
        </div>
      ) : null}
    </section>
  );
}
