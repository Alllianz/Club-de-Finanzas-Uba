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
      router.push(user.role === "ADMIN" ? "/admin" : "/admin/articles");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo verificar OTP");
    } finally {
      setLoading(false);
    }
  };

  if (!safeEmail) {
    return (
      <main className="mx-auto min-h-screen w-[min(680px,92vw)] py-16 text-white">
        <Card className="border-white/15 bg-black/30 text-white">
          <CardHeader>
            <CardTitle>Validacion OTP</CardTitle>
            <CardDescription className="text-white/70">
              Primero solicita el codigo desde /auth/login.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/auth/login"
              className="inline-flex h-8 items-center justify-center rounded-lg border border-white/20 px-3 text-sm text-white transition hover:bg-white/10"
            >
              Ir a login
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-[min(680px,92vw)] py-16 text-white">
      <Card className="border-white/15 bg-black/30 text-white">
        <CardHeader>
          <p className="text-xs uppercase tracking-[0.3em] text-white/45">Autogestion</p>
          <CardTitle className="text-4xl">Validar codigo OTP</CardTitle>
          <CardDescription className="text-white/70">
            Paso 2 de 2. Ingresa el codigo enviado a <span className="font-semibold text-white">{safeEmail}</span>.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-xs uppercase tracking-[0.2em] text-white/60">
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
                className="bg-black/35 text-center text-2xl tracking-[0.35em] text-white placeholder:text-white/35"
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
              className="rounded-full bg-white text-slate-900 hover:bg-white/90"
            >
              {loading ? "Validando..." : "Ingresar al backoffice"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-xs text-white/45">No llego el mail? Revisa Spam/Promociones.</p>
    </main>
  );
}
