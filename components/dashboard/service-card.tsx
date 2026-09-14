import Link from "next/link";
import Image from "next/image";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "outline" | "destructive";
  accentClass?: string;
  ctaText?: string;
  image?: string;
}

export function ServiceCard({
  title,
  description,
  icon: Icon,
  href,
  badge,
  badgeVariant = "secondary",
  accentClass = "bg-gray-50 text-gray-900",
  ctaText = "Apply services",
  image
}: ServiceCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <div className="relative h-full flex flex-col p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 overflow-hidden">
        
        {/* Subtle accent gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="flex justify-between items-start mb-4">
          <div className={`p-2.5 rounded-xl ${accentClass} transition-transform duration-200 group-hover:scale-105`}>
            <Icon className="w-5 h-5" />
          </div>
          {badge && (
            <Badge variant={badgeVariant} className="font-medium text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full z-10 relative">
              {badge}
            </Badge>
          )}
        </div>

        {image && (
          <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] mb-4 rounded-xl overflow-hidden border border-gray-50 bg-gray-50/50">
            <Image src={image} alt={title} fill className="object-cover object-center transition-transform duration-500 group-hover:scale-105" />
          </div>
        )}

        <div className="mt-auto flex flex-col h-full">
          <h3 className="text-lg font-semibold text-gray-900 mb-1.5 tracking-tight group-hover:text-black transition-colors">
            {title}
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-grow">
            {description}
          </p>
          
          <Button variant="default" size="sm" className="w-full mt-auto group-hover:bg-black group-hover:text-white transition-colors">
            {ctaText}
          </Button>
        </div>
      </div>
    </Link>
  );
}
