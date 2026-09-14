import React from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/data/products';

export default function ProductsSection() {
  return (
    <section className="bg-white py-20 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-sans tracking-tight">
              Products
            </h2>
            <p className="text-gray-500 text-lg max-w-xl">
              Explore our collection of carefully selected electric scooters. Designed for performance, style, and reliability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
