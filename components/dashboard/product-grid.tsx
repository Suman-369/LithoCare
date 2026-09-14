"use client";

import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/dashboard/product-card";

const products = [
  {
    id: "LITHOCARE ENERGY-lite-1",
    name: "Electric Scooter",
    model: "Model X",
    category: "scooters",
    description: "Premium performance with extended range and fast charging capabilities.",
    price: "₹85,000",
    image: "/images/image1.png"
  },
  {
    id: "LITHOCARE ENERGY-pro-max",
    name: "Electric Scooter",
    model: "Model Y",
    category: "scooters",
    description: "Urban mobility redefined. Lightweight, nimble, and perfect for city commutes.",
    price: "₹72,000",
    image: "/images/image2.png"
  },
  {
    id: "LITHOCARE ENERGY-cruiser",
    name: "Replacement Battery",
    model: "Exide Pro",
    category: "parts",
    description: "High capacity replacement battery for extended life and better performance.",
    price: "₹12,500",
    image: "/images/b1.png"
  },
  {
    id: "LITHOCARE ENERGY-stealth",
    name: "Replacement Battery",
    model: "Luminous Neo",
    category: "parts",
    description: "Reliable power delivery for demanding applications.",
    price: "₹11,800",
    image: "/images/b2.png"
  },
  {
    id: "LITHOCARE ENERGY-commute",
    name: "Battery Pack",
    model: "PowerMax Ultra",
    category: "parts",
    description: "Heavy duty battery pack for commercial E-Rickshaws.",
    price: "₹15,000",
    image: "/images/b3.png"
  },
  {
    id: "LITHOCARE ENERGY-beast",
    name: "Battery Pack",
    model: "EcoCharge+",
    category: "parts",
    description: "Eco-friendly battery with smart charging technology.",
    price: "₹14,200",
    image: "/images/b4.png"
  }
];

export function ProductGrid() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";
  const category = searchParams.get("category") || "all";

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search) || p.model.toLowerCase().includes(search);
    const matchesCategory = category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <p>No products found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
