import { Suspense } from "react";
import { ProductGrid } from "@/components/dashboard/product-grid";
import { ProductFilters } from "@/components/dashboard/product-filters";

export default function TwoWheelersPage() {
  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-end">
        <div className="w-full md:w-auto">
          <Suspense fallback={<div className="h-10 w-64 bg-gray-100 rounded-lg animate-pulse" />}>
            <ProductFilters />
          </Suspense>
        </div>
      </div>

      {/* Products */}
      <Suspense fallback={<div className="h-96 w-full bg-gray-100 rounded-lg animate-pulse" />}>
        <ProductGrid />
      </Suspense>
    </div>
  );
}
