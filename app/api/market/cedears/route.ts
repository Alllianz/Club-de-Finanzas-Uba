import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "../../../lib/config";

export async function GET(request: NextRequest) {
  try {
    const upstreamUrl = new URL(`${API_BASE_URL}/market/cedears`);
    const search = request.nextUrl.searchParams.get("search");
    const market = request.nextUrl.searchParams.get("market");
    const limit = request.nextUrl.searchParams.get("limit");

    if (search) upstreamUrl.searchParams.set("search", search);
    if (market) upstreamUrl.searchParams.set("market", market);
    if (limit) upstreamUrl.searchParams.set("limit", limit);

    const response = await fetch(upstreamUrl.toString(), {
      method: "GET",
      cache: "no-store",
    });

    const raw = await response.text();
    const payload = raw ? (JSON.parse(raw) as unknown) : { error: "Respuesta vacia del backend" };
    if (!response.ok) {
      return NextResponse.json(payload, { status: response.status });
    }

    return NextResponse.json(payload, { status: response.status });
  } catch (error) {
    console.error("[front] Error en /api/market/cedears", error);
    return NextResponse.json(
      { error: "No se pudo conectar con el backend para obtener Cedears" },
      { status: 502 },
    );
  }
}
