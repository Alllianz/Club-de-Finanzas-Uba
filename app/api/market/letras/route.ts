import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "../../../lib/config";

export async function GET(request: NextRequest) {
  try {
    const upstreamUrl = new URL(`${API_BASE_URL}/market/letras`);
    const refresh = request.nextUrl.searchParams.get("refresh");
    if (refresh) upstreamUrl.searchParams.set("refresh", refresh);

    const response = await fetch(upstreamUrl.toString(), {
      method: "GET",
      cache: "no-store",
    });

    const raw = await response.text();
    const payload = raw ? (JSON.parse(raw) as unknown) : { error: "Respuesta vacia del backend" };
    return NextResponse.json(payload, { status: response.status });
  } catch (error) {
    console.error("[front] Error en /api/market/letras", error);
    return NextResponse.json(
      { error: "No se pudo conectar con el backend para obtener letras" },
      { status: 502 },
    );
  }
}
