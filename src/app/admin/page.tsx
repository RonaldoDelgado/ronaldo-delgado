import type { Metadata } from "next";

import { AdminPage } from "@/components/portfolio/admin-page";

export const metadata: Metadata = {
  title: "Preview local | Portafolio de Ronaldo Delgado",
  robots: { index: false, follow: false },
};

export default function AdminRoute() {
  return <AdminPage />;
}
