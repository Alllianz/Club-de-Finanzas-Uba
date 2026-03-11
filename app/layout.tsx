import type { Metadata } from "next";
import { Space_Grotesk, Sora } from "next/font/google";
import "./globals.css";

const displayFont = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Club de Finanzas UBA",
  description:
    "Sitio editorial del Club de Finanzas UBA con home tipo feed, secciones por area y pagina institucional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] antialiased [font-family:var(--font-body),sans-serif]">
        {children}
      </body>
    </html>
  );
}
