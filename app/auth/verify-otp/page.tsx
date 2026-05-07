"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function VerifyOtpPage() {
  const { email, verifyOtp } = useAuth();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const safeEmail = useMemo(() => email.trim(), [email]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!safeEmail || loading) return;

    setLoading(true);
    setError("");

    try {
      const user = await verifyOtp(safeEmail, otp);
      router.push(user.role === "ADMIN" ? "/admin" : "/admin/posts");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo verificar OTP");
    } finally {
      setLoading(false);
    }
  };

  if (!safeEmail) {
    return (
      <main className="mx-auto min-h-screen w-[min(680px,92vw)] py-16 text-[var(--color-ink)]">
        <Card className="border-[var(--color-line)] bg-white text-[var(--color-ink)]">
          <CardHeader>
            <CardTitle>Validacion OTP</CardTitle>
            <CardDescription className="text-[var(--color-muted)]">
              Primero solicita el codigo desde /auth/login.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/auth/login"
              className="inline-flex h-8 items-center justify-center rounded-lg border border-[var(--color-line)] px-3 text-sm text-[var(--color-ink)] transition hover:bg-[var(--color-bg-soft)]"
            >
              Ir a login
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-[min(680px,92vw)] py-16 text-[var(--color-ink)]">
      <Card className="border-[var(--color-line)] bg-white text-[var(--color-ink)]">
        <CardHeader>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Autogestion</p>
          <CardTitle className="text-4xl">Validar codigo OTP</CardTitle>
          <CardDescription className="text-[var(--color-muted)]">
            Paso 2 de 2. Ingresa el codigo enviado a <span className="font-semibold text-[var(--color-ink)]">{safeEmail}</span>.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                Codigo de 6 digitos
              </Label>
              <Input
                id="otp"
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="123456"
                className="bg-[var(--color-bg-soft)] text-center text-2xl tracking-[0.35em] text-[var(--color-ink)] placeholder:text-[var(--color-muted)]"
              />
            </div>

            {error ? (
              <Alert variant="destructive" className="border-red-400/55 bg-red-500/12 text-red-100">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <Button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="rounded-full bg-[var(--color-blue)] text-[#ffffff] hover:bg-[var(--color-blue-strong)]"
            >
              {loading ? "Validando..." : "Ingresar al backoffice"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-xs text-[var(--color-muted)]">No llego el mail? Revisa Spam/Promociones.</p>
    </main>
  );
}
