import { NextResponse } from "next/server";
import { API_BASE_URL } from "../../../../lib/config";

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/market/riesgo-pais/ultimo`, {
      method: "GET",
      cache: "no-store",
    });

    const raw = await response.text();
    const payload = raw ? (JSON.parse(raw) as unknown) : { error: "Respuesta vacia del backend" };
    return NextResponse.json(payload, { status: response.status });
  } catch (error) {
    console.error("[front] Error en /api/market/riesgo-pais/ultimo", error);
    return NextResponse.json(
      { error: "No se pudo conectar con el backend para obtener ultimo riesgo pais" },
      { status: 502 },
    );
  }
}
