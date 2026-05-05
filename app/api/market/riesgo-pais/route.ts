import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "../../../lib/config";

export async function GET(request: NextRequest) {
  try {
    const upstreamUrl = new URL(`${API_BASE_URL}/market/riesgo-pais`);
    const limit = request.nextUrl.searchParams.get("limit");
    if (limit) upstreamUrl.searchParams.set("limit", limit);

    const response = await fetch(upstreamUrl.toString(), {
      method: "GET",
      cache: "no-store",
    });

    const raw = await response.text();
    const payload = raw ? (JSON.parse(raw) as unknown) : { error: "Respuesta vacia del backend" };
    return NextResponse.json(payload, { status: response.status });
  } catch (error) {
    console.error("[front] Error en /api/market/riesgo-pais", error);
    return NextResponse.json(
      { error: "No se pudo conectar con el backend para obtener riesgo pais" },
      { status: 502 },
    );
  }
}
