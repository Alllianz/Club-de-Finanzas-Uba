"use client";

import { useCallback, useEffect, useState } from "react";
import { marketService } from "../services/market-service";
import type { GlobalMarketResponse } from "../lib/types";

type UseGlobalMarketResult = {
  data: GlobalMarketResponse | null;
  loading: boolean;
  error: string;
  refresh: () => Promise<void>;
};

export function useGlobalMarket(): UseGlobalMarketResult {
  const [data, setData] = useState<GlobalMarketResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await marketService.getGlobal();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo cargar Monitor Global");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}
