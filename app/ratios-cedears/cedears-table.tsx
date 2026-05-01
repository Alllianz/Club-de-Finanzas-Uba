"use client";

import { useEffect, useMemo, useState } from "react";
import type { CedearItem } from "../lib/types";
import { cedearsService } from "../services/cedears-service";

export function CedearsTable() {
  const [items, setItems] = useState<CedearItem[]>([]);
  const [markets, setMarkets] = useState<string[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [search, setSearch] = useState("");
  const [market, setMarket] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await cedearsService.getAll({
          search: search || undefined,
          market: market || undefined,
          limit: 1200,
        });
        setItems(data.items);
        setMarkets(data.markets);
        setUpdatedAt(data.updatedAt);
      } catch (err) {
        setError(err instanceof Error ? err.message : "No se pudo cargar la tabla de cedears");
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [search, market]);

  const formattedUpdatedAt = useMemo(() => {
    if (!updatedAt) return "-";
    return new Date(updatedAt).toLocaleString("es-AR", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }, [updatedAt]);

  return (
    <section className="space-y-6 rounded-[28px] border border-[var(--color-line)] bg-white p-5 shadow-[0_20px_40px_rgba(18,35,63,0.08)] md:p-7">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por compañía o ticker BYMA..."
          className="h-11 rounded-xl border border-[var(--color-line)] px-3 text-sm text-[var(--color-ink)] outline-none transition focus:border-[var(--color-blue)]"
        />
        <select
          value={market}
          onChange={(event) => setMarket(event.target.value)}
          className="h-11 rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm text-[var(--color-ink)] outline-none transition focus:border-[var(--color-blue)]"
        >
          <option value="">Todos los mercados</option>
          {markets.map((marketOption) => (
            <option key={marketOption} value={marketOption}>
              {marketOption}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between text-sm text-[var(--color-muted)]">
        <p>{loading ? "Cargando..." : `${items.length} resultados`}</p>
        <p>Actualizado: {formattedUpdatedAt}</p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-[var(--color-line)]">
        <div className="max-h-[70vh] overflow-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead className="sticky top-0 z-10 bg-[var(--color-bg-soft)] text-left">
              <tr>
                <th className="px-4 py-3 font-semibold text-[var(--color-ink)]">Compañía</th>
                <th className="px-4 py-3 font-semibold text-[var(--color-ink)]">Ticker BYMA</th>
                <th className="px-4 py-3 font-semibold text-[var(--color-ink)]">Mercado</th>
                <th className="px-4 py-3 font-semibold text-[var(--color-ink)]">Ratio</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={`${item.bymaCode}-${item.companyName}-${item.listedMarket}-${item.ratio}-${index}`}
                  className="border-t border-[var(--color-line)]"
                >
                  <td className="px-4 py-3 text-[var(--color-ink)]">{item.companyName}</td>
                  <td className="px-4 py-3 font-semibold text-[var(--color-blue)]">{item.bymaCode}</td>
                  <td className="px-4 py-3 text-[var(--color-muted)]">{item.listedMarket}</td>
                  <td className="px-4 py-3 text-[var(--color-ink)]">{item.ratio}</td>
                </tr>
              ))}
              {!loading && items.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-[var(--color-muted)]" colSpan={4}>
                    No hay resultados para los filtros seleccionados.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
