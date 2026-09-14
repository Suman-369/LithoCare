import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import ProductActions from "@/components/cart/product-actions";
import CartIcon from "@/components/cart/cart-icon";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const decodedId = decodeURIComponent(resolvedParams.id);
  const product = getProductById(decodedId);

  if (!product) {
    notFound();
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="bg-black text-white py-4 px-6 lg:px-12 w-full">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-serif font-bold tracking-wider"
          >
            LITHOCARE ENERGY
          </Link>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link
                href="/products"
                className="hover:text-white transition-colors"
              >
                Products
              </Link>
            </nav>
            <CartIcon />
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-6 pb-12 md:pt-8 md:pb-20">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-8 font-medium">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span className="mx-3">/</span>
          <Link
            href="/products"
            className="hover:text-gray-900 transition-colors"
          >
            Products
          </Link>
          <span className="mx-3">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Top Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Product Image */}
          <div className="bg-[#f8f9fa] rounded-3xl aspect-square relative flex items-center justify-center p-8 overflow-hidden group">
            {discount > 0 && (
              <div className="absolute top-6 left-6 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-md z-10 shadow-sm">
                {discount}% OFF
              </div>
            )}
            <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-[1.03]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4 tracking-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-200 fill-current"}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {product.rating}
              </span>
              <span className="text-sm text-blue-600 hover:underline cursor-pointer transition-colors">
                Read {product.reviews} Reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              {product.description}
            </p>

            {/* Actions */}
            <ProductActions product={product} />

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  In Stock
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Fast Shipping
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections (Specs & Features) */}
        <div className="mt-20 pt-20 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Key Features
            </h2>
            <ul className="space-y-4">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 bg-black rounded-full p-1 text-white shrink-0">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-600 leading-relaxed text-lg">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Specifications
            </h2>
            <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {Object.entries(product.specifications).map(
                    ([key, value], idx) => (
                      <tr
                        key={key}
                        className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <th className="py-4 px-6 text-sm font-medium text-gray-900 border-b border-gray-100">
                          {key}
                        </th>
                        <td className="py-4 px-6 text-sm text-gray-600 border-b border-gray-100">
                          {value}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-20 pt-20 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">
            Customer Reviews
          </h2>

          <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-16">
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-3xl p-10 min-w-[240px]">
              <span className="text-6xl font-bold text-gray-900 mb-2">
                {product.rating}
              </span>
              <div className="flex text-yellow-400 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-500 font-medium">
                Based on {product.reviews} reviews
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-3">
              {[
                { star: 5, p: 82 },
                { star: 4, p: 12 },
                { star: 3, p: 4 },
                { star: 2, p: 1 },
                { star: 1, p: 1 },
              ].map((row) => (
                <div key={row.star} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700 w-8">
                    {row.star} ★
                  </span>
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${row.p}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 w-10 text-right">
                    {row.p}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {/* Fake Review 1 */}
            <div className="border-b border-gray-100 pb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                  JD
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">John Doe</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400 text-xs">★★★★★</div>
                    <span className="text-xs text-green-600 font-medium">
                      Verified Purchase
                    </span>
                  </div>
                </div>
                <span className="ml-auto text-sm text-gray-400">
                  2 weeks ago
                </span>
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">
                Absolutely phenomenal ride!
              </h5>
              <p className="text-gray-600 leading-relaxed">
                I've been using this scooter for my daily commute and it has
                completely transformed my mornings. The build quality is
                exceptional, and it handles urban bumps effortlessly. Highly
                recommend to anyone looking for a premium electric scooter.
              </p>
            </div>

            {/* Fake Review 2 */}
            <div className="border-b border-gray-100 pb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                  SW
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Sarah Williams
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400 text-xs">
                      ★★★★<span className="text-gray-200">★</span>
                    </div>
                    <span className="text-xs text-green-600 font-medium">
                      Verified Purchase
                    </span>
                  </div>
                </div>
                <span className="ml-auto text-sm text-gray-400">
                  1 month ago
                </span>
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">
                Great value and performance
              </h5>
              <p className="text-gray-600 leading-relaxed">
                The speed and range are exactly as advertised. My only minor
                complaint is that it's a bit heavy to carry up stairs, but the
                folding mechanism is very solid. Beautiful design overall.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
