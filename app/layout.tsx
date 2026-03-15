import type { Metadata } from "next";
import { Space_Grotesk, Sora, Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html
      lang="es"
      className={cn("dark", displayFont.variable, bodyFont.variable, "font-sans", geist.variable)}
    >
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] antialiased [font-family:var(--font-body),sans-serif]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
