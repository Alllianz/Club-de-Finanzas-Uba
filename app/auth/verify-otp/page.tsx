"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

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
      if (user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/admin/articles");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo verificar OTP");
    } finally {
      setLoading(false);
    }
  };

  if (!safeEmail) {
    return (
      <main className="mx-auto min-h-screen w-[min(640px,92vw)] py-16 text-white">
        <div className="rounded-[30px] border border-white/12 bg-white/[0.04] p-6 md:p-8">
          <h1 className="text-3xl font-semibold">Validacion OTP</h1>
          <p className="mt-3 text-white/70">Primero solicitá el codigo desde /auth/login.</p>
          <Link href="/auth/login" className="mt-5 inline-flex rounded-full border border-white/20 px-4 py-2 text-sm">
            Ir a login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-[min(640px,92vw)] py-16 text-white">
      <div className="rounded-[30px] border border-white/12 bg-white/[0.04] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-white/45">Autogestion</p>
        <h1 className="mt-3 text-4xl font-semibold">Validar codigo OTP</h1>
        <p className="mt-3 text-sm leading-7 text-white/70">
          Paso 2 de 2. Ingresá el codigo enviado a <span className="font-semibold text-white">{safeEmail}</span>.
        </p>

        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <label className="block text-xs uppercase tracking-[0.2em] text-white/55" htmlFor="otp">
            Codigo de 6 digitos
          </label>
          <input
            id="otp"
            type="text"
            required
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-3 text-2xl tracking-[0.35em] text-white outline-none transition focus:border-white/45"
            placeholder="123456"
          />

          {error ? (
            <p className="rounded-xl border border-red-400/45 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 disabled:opacity-50"
          >
            {loading ? "Validando..." : "Ingresar al backoffice"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-xs text-white/45">
        ¿No te llegó? Revisá Spam/Promociones y logs backend.
      </p>
    </main>
  );
}
