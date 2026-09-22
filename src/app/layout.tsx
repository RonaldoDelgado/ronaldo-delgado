import type { Metadata } from "next";

import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

const title = "Ronaldo Delgado | Full Stack Developer | AI Engineer";
const description =
  "Soy Ronaldo Delgado, Full Stack Developer y AI Engineer. Trabajo en aplicaciones web y móviles, APIs REST, PostgreSQL, Microsoft Azure y Azure OpenAI.";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title,
  description,
  applicationName: "Portafolio de Ronaldo Delgado",
  authors: [{ name: "Ronaldo Delgado" }],
  creator: "Ronaldo Delgado",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "es_CO",
    url: "/",
    title,
    description,
    siteName: "Portafolio de Ronaldo Delgado",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
