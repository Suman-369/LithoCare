import React from "react";
import ProductsSection from "@/components/pages/ProductsSection";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-[70px]">
      {/* Simple Header for standalone page */}
      <header className="bg-black text-white py-4 px-6 lg:px-12 fixed top-0 w-full z-50">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="text-2xl font-serif font-bold tracking-wider">
            LITHOCARE ENERGY
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <a href="/products" className="text-white font-medium">
              Products
            </a>
          </nav>
        </div>
      </header>

      <div className="-mt-8">
        <ProductsSection />
      </div>
    </div>
  );
}
