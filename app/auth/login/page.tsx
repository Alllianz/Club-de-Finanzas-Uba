"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { requestOtp, setEmail } = useAuth();
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

  return (
    <main className="mx-auto min-h-screen w-[min(640px,92vw)] py-16 text-white">
      <div className="rounded-[30px] border border-white/12 bg-white/[0.04] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-white/45">Autogestion</p>
        <h1 className="mt-3 text-4xl font-semibold">Ingreso al backoffice</h1>
        <p className="mt-3 text-sm leading-7 text-white/70">
          Paso 1 de 2. Ingresá tu email preaprobado para recibir un codigo OTP.
        </p>

        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <label className="block text-xs uppercase tracking-[0.2em] text-white/55" htmlFor="email">
            Email de acceso
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmailLocal(e.target.value)}
            className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-3 text-white outline-none transition focus:border-white/45"
            placeholder="tu@email.com"
          />

          {error ? (
            <p className="rounded-xl border border-red-400/45 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 disabled:opacity-50"
          >
            {loading ? "Enviando codigo..." : "Enviar codigo OTP"}
          </button>
        </form>

        <div className="mt-8 rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-sm font-semibold">Notas de uso</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/70">
            <li>Solo ingresan usuarios que estén activos en el panel de usuarios.</li>
            <li>Si no llega el mail, revisar Spam/Promociones y logs del backend.</li>
            <li>Una vez validado el OTP, se crea la sesion por cookie segura.</li>
          </ul>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-white/45">
        Volver al sitio publico: <Link href="/" className="underline underline-offset-2">clubdefinanzas</Link>
      </p>
    </main>
  );
}
