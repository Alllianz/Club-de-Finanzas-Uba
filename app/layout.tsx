import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";

const displayFont = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Club de Finanzas UBA",
  description:
    "Plataforma editorial y academica de finanzas impulsada por estudiantes y graduados vinculados a la UBA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="bg-[var(--color-cream)] text-[var(--color-ink)] antialiased [font-family:var(--font-body),sans-serif]">
        {children}
      </body>
    </html>
  );
}
