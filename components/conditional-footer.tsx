"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/pages/Footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  
  // Hide footer on dashboard and admin routes
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard")) {
    return null;
  }

  return <Footer />;
}
