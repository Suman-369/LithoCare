import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  model: string;
  description: string;
  price: string;
  image: string;
}

export function ProductCard({ id, name, model, description, price, image }: ProductCardProps) {
  return (
    <div className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-300">
      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden flex items-center justify-center p-6">
        <Image 
          src={image} 
          alt={name} 
          fill
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="flex-1 p-5 md:p-6 flex flex-col">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 mb-1">{name}</h3>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">{model}</h2>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {description}
          </p>
        </div>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
          <span className="text-lg font-semibold text-black">{price}</span>
          <Link 
            href={`/products/${id}`}
            className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
