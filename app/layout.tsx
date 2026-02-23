import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const titleFont = Cormorant_Garamond({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Club de Finanzas",
  description:
    "Comunidad autoconvocada de educacion financiera impulsada por estudiantes y graduados de universidades nacionales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${titleFont.variable} ${bodyFont.variable}`}>
      <body className="bg-[#f6f3ea] text-[#202533] antialiased [font-family:var(--font-body),sans-serif]">
        {children}
      </body>
    </html>
  );
}
