"use client";

import React from "react";
import { WifiOff, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function OfflinePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans text-center">
      <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mb-6 border border-gray-800 shadow-xl">
        <WifiOff className="w-10 h-10 text-[#a8e69e]" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">You're offline</h1>
      <p className="text-gray-400 mb-8 max-w-sm text-sm sm:text-base leading-relaxed">
        Please check your internet connection and try again to continue exploring Lithocare Energy.
      </p>
      
      <Button 
        onClick={() => window.location.reload()}
        className="bg-[#a8e69e] text-black hover:bg-[#96d58d] rounded-full px-8 py-6 font-bold tracking-wide transition-colors flex items-center gap-2"
      >
        <RefreshCcw className="w-4 h-4" />
        Try Again
      </Button>
    </div>
  );
}
