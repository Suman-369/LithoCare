import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Outfit, Playfair_Display, Geist } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LITHOCARE ENERGY",
  description: "Discover Your Perfect Ride",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LITHOCARE ENERGY",
  },
  icons: {
    icon: "/Logo.png",
    apple: "/Logo.png",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: "#000000",
};

import SmoothScroll from "@/components/providers/SmoothScroll";
import { ConditionalFooter } from "@/components/conditional-footer";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/components/cart/CartProvider";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({ children }: any) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        outfit.variable,
        playfair.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body
        className="min-h-full flex flex-col font-sans"
        suppressHydrationWarning
      >
        <ClerkProvider>
          <CartProvider>
            <SmoothScroll>
              {children}
              <ConditionalFooter />
            </SmoothScroll>
            <Toaster richColors />
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
