"use client";

import { useCallback, useEffect, useState } from "react";
import { marketService } from "../services/market-service";
import type { GlobalMarketResponse } from "../lib/types";

const MARKET_STORAGE_KEY = "clubdefinanzas:monitor-global:last-data";
let inMemorySnapshot: GlobalMarketResponse | null = null;

type UseGlobalMarketResult = {
  data: GlobalMarketResponse | null;
  loading: boolean;
  refreshing: boolean;
  error: string;
  refresh: () => Promise<void>;
};

function readStoredSnapshot(): GlobalMarketResponse | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(MARKET_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GlobalMarketResponse;
  } catch {
    return null;
  }
}

function persistSnapshot(snapshot: GlobalMarketResponse): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(MARKET_STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // ignore storage errors
  }
}

export function useGlobalMarket(): UseGlobalMarketResult {
  const [data, setData] = useState<GlobalMarketResponse | null>(
    () => inMemorySnapshot ?? readStoredSnapshot(),
  );
  const [loading, setLoading] = useState(() => !(inMemorySnapshot ?? readStoredSnapshot()));
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    const hasExistingData = Boolean(data);
    if (hasExistingData) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError("");

    try {
      const response = await marketService.getGlobal();
      inMemorySnapshot = response;
      persistSnapshot(response);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo cargar Monitor Global");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setLoading(false);
      return;
    }
    void refresh();
  }, [data, refresh]);

  return { data, loading, refreshing, error, refresh };
}
