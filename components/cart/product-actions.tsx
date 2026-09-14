"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function ProductActions({ product }: { product: { id: string, name: string, price: number, image: string } }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  const handleIncrease = () => {
    setQuantity(q => q + 1);
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    });
    toast.success("Added to cart", {
      description: `${quantity}x ${product.name} added to your cart.`
    });
  };

  const handleBuyNow = () => {
    if (!isLoaded) return;
    
    if (!isSignedIn) {
      toast.error("Authentication required", {
        description: "Please sign in to proceed with your purchase."
      });
      // Add to cart anyway so it's there after login
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
      });
      router.push("/sign-in?redirect_url=/cart");
      return;
    }
    
    // Logged in, redirect to Call to Book Now
    router.push("/book-now");
  };

  return (
    <div className="mt-auto flex flex-col sm:flex-row gap-4 mb-10">
      <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-1 h-14 sm:w-32 bg-gray-50 shrink-0">
        <button 
          onClick={handleDecrease}
          className="text-gray-500 hover:text-black transition-colors text-xl font-medium w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
        >
          -
        </button>
        <span className="text-gray-900 font-semibold">{quantity}</span>
        <button 
          onClick={handleIncrease}
          className="text-gray-500 hover:text-black transition-colors text-xl font-medium w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
        >
          +
        </button>
      </div>
      <button 
        onClick={handleAddToCart}
        className="flex-1 bg-[#111] hover:bg-black text-white h-14 rounded-xl font-medium text-lg transition-transform active:scale-[0.98] shadow-md shadow-gray-900/10"
      >
        Add to Cart
      </button>
      <button 
        onClick={handleBuyNow}
        className="flex-1 bg-white border-2 border-[#111] hover:bg-gray-50 text-[#111] h-14 rounded-xl font-medium text-lg transition-transform active:scale-[0.98]"
      >
        Buy Now
      </button>
    </div>
  );
}
