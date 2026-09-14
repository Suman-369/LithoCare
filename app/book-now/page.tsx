"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function BookNowPage() {
  const { cartCount, totalPrice, items } = useCart();
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isLoaded && !isSignedIn) {
      router.push("/sign-in?redirect_url=/book-now");
    }
  }, [mounted, isLoaded, isSignedIn, router]);

  if (!mounted || !isLoaded || !isSignedIn) return null;

  return (
    <div className="min-h-screen bg-white py-12 px-6 flex flex-col items-center">
      
      <div className="w-full max-w-2xl mb-12">
        <Link 
          href="/cart" 
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>
      </div>

      <div className="max-w-2xl w-full text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Call to Book Now</h1>
        <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto">
          Your items are reserved. To finalize your purchase and arrange delivery, please call our support team directly.
        </p>

        {cartCount > 0 && (
          <div className="bg-gray-50 rounded-2xl p-6 mb-10 text-left border border-gray-100 mx-auto max-w-sm">
            <h3 className="font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">Order Summary</h3>
            <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate mr-4">{item.quantity}x {item.name}</span>
                  <span className="text-gray-900 font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <span className="font-medium text-gray-900">Total</span>
              <span className="font-bold text-lg text-gray-900">${totalPrice.toLocaleString()}</span>
            </div>
          </div>
        )}

        <a 
          href="tel:+919382802304"
          className="inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-5 rounded-2xl font-semibold text-xl transition-all shadow-lg shadow-green-600/20 active:scale-[0.98]"
        >
          <Phone className="w-6 h-6" /> +91 9382802304
        </a>
        
        <p className="text-sm text-gray-400 mt-6">
          Available Monday to Saturday, 9:00 AM - 6:00 PM
        </p>
      </div>
    </div>
  );
}
