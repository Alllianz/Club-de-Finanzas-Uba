import type { GlobalMarketResponse } from "../lib/types";

export const marketService = {
  async getGlobal(): Promise<GlobalMarketResponse> {
    const response = await fetch("/api/market/global", {
      method: "GET",
      cache: "no-store",
    });

    const payload = (await response.json()) as GlobalMarketResponse | { error?: string };
    if (!response.ok) {
      throw new Error(
        typeof payload === "object" && payload && "error" in payload && payload.error
          ? payload.error
          : `Request error ${response.status}`,
      );
    }

    return payload as GlobalMarketResponse;
  },
};
