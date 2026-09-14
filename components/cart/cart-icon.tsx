"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider";
import { useEffect, useState } from "react";

export default function CartIcon() {
  const { cartCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/cart" className="relative p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center">
      <ShoppingCart className="w-5 h-5 text-white" />
      {mounted && cartCount > 0 && (
        <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
  );
}
