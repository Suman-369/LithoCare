"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const createQueryString = (name: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params.toString();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== (searchParams.get("search") || "")) {
        router.replace(`${pathname}?${createQueryString('search', searchQuery)}`);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, pathname, router, searchParams]);

  const onCategoryChange = (value: string | null) => {
    router.replace(`${pathname}?${createQueryString('category', value)}`);
  };

  const currentCategory = searchParams.get("category") || "all";

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden md:flex items-center gap-3">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search products..." 
            className="pl-9 bg-white border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={currentCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[140px] bg-white border-gray-200">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="scooters">Scooters</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
            <SelectItem value="parts">Spare Parts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Mobile Filters */}
      <div className="flex md:hidden items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search products..." 
            className="pl-9 bg-white border-gray-200 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Sheet>
          <SheetTrigger className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-lg text-gray-600 outline-none cursor-pointer">
            <SlidersHorizontal className="w-4 h-4" />
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl h-[400px]">
            <SheetHeader className="text-left mb-6">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={currentCategory} onValueChange={onCategoryChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="scooters">Scooters</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="parts">Spare Parts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range</label>
                <Select defaultValue="any">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Price</SelectItem>
                    <SelectItem value="under-50k">Under ₹50,000</SelectItem>
                    <SelectItem value="50k-1l">₹50,000 - ₹1,00,000</SelectItem>
                    <SelectItem value="above-1l">Above ₹1,00,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-4 mt-auto">
                <button className="w-full bg-black text-white rounded-lg py-2.5 text-sm font-medium">
                  Apply Filters
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
