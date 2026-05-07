"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
  const { requestOtp, setEmail, user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [email, setEmailLocal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      await requestOtp(email);
      setEmail(email);
      router.push("/auth/verify-otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo enviar OTP");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (authLoading) return;
    if (!user) return;
    router.replace(user.role === "ADMIN" ? "/admin" : "/admin/posts");
  }, [authLoading, user, router]);
  return (
    <main className="mx-auto min-h-screen w-[min(680px,92vw)] py-16 text-[var(--color-ink)]">
      <Card className="border-[var(--color-line)] bg-white text-[var(--color-ink)]">
        <CardHeader>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Autogestion</p>
          <CardTitle className="text-4xl">Ingreso al backoffice</CardTitle>
          <CardDescription className="text-[var(--color-muted)]">
            Paso 1 de 2. Ingresa tu email preaprobado para recibir un codigo OTP.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                Email de acceso
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmailLocal(e.target.value)}
                placeholder="tu@email.com"
                className="bg-[var(--color-bg-soft)] text-[var(--color-ink)] placeholder:text-[var(--color-muted)]"
              />
            </div>

            {error ? (
              <Alert variant="destructive" className="border-red-400/55 bg-red-500/12 text-red-100">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <Button type="submit" disabled={loading} className="rounded-full bg-[var(--color-blue)] text-[#ffffff] hover:bg-[var(--color-blue-strong)]">
              {loading ? "Enviando codigo..." : "Enviar codigo OTP"}
            </Button>
          </form>

          <div className="mt-7 rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-soft)] p-4">
            <p className="text-sm font-semibold">Notas de uso</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--color-muted)]">
              <li>Solo ingresan usuarios activos en el panel de usuarios.</li>
              <li>Si no llega el mail, revisar Spam/Promociones y logs del backend.</li>
              <li>Una vez validado el OTP, se crea sesion por cookie.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-xs text-[var(--color-muted)]">
        Volver al sitio publico: <Link href="/" className="underline underline-offset-2">clubdefinanzas</Link>
      </p>
    </main>
  );
}
