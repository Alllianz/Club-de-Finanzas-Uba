import { NextResponse } from "next/server";
import { API_BASE_URL } from "../../../lib/config";

export async function GET() {
  const response = await fetch(`${API_BASE_URL}/market/global`, {
    method: "GET",
    cache: "no-store",
  });

  const payload = (await response.json()) as unknown;

  if (!response.ok) {
    return NextResponse.json(payload, { status: response.status });
  }

  return NextResponse.json(payload);
}
