"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';
import { useCart } from '@/components/cart/CartProvider';
import { toast } from 'sonner';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="group relative flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      
      {/* Clickable Overlay */}
      <Link href={`/products/${product.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {product.name}</span>
      </Link>

      {/* Image Container */}
      <div className="relative w-full aspect-square bg-[#f8f9fa] p-6 flex items-center justify-center overflow-hidden">
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-20">
            {discount}% OFF
          </div>
        )}
        <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3 h-10">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex text-yellow-400 text-sm">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200 fill-current'}`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        <div className="mt-auto relative z-20">
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-5">
            <span className="text-xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">${product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          {/* Actions */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image,
              });
              toast.success("Added to cart", {
                description: `1x ${product.name} added to your cart.`
              });
            }}
            className="w-full bg-[#111] hover:bg-gray-800 text-white text-sm font-medium py-2.5 rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
