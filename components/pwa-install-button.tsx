"use client";

import React, { useEffect, useState } from "react";
import { Download, Share, PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PwaInstallButton() {
  const [isStandalone, setIsStandalone] = useState(true); // Default true to avoid flash
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstruction, setShowIOSInstruction] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if already installed
    const checkStandalone = () => {
      const isStandaloneMode = window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true;
      setIsStandalone(isStandaloneMode);
    };

    checkStandalone();

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);
    setIsReady(true);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS && !deferredPrompt) {
      setShowIOSInstruction(true);
      return;
    }

    if (!deferredPrompt) {
      // Not iOS, no prompt available (either not supported, not ready, or already installed)
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  // Only render if not standalone and we are ready. 
  // We show the button if there is a prompt OR if it's iOS (since iOS doesn't give a prompt).
  if (!isReady || isStandalone) return null;
  if (!deferredPrompt && !isIOS) return null;

  return (
    <>
      <Button
        onClick={handleInstallClick}
        className="w-full bg-[#1a1a1a] text-white hover:bg-[#222] border border-gray-800 rounded-full px-6 py-5 font-semibold transition-colors flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4 text-[#a8e69e]" />
        <span>Install App</span>
      </Button>

      <Sheet open={showIOSInstruction} onOpenChange={setShowIOSInstruction}>
        <SheetContent side="bottom" className="rounded-t-[2rem] bg-[#0a0a0a] border-gray-800 text-white pb-8">
          <SheetHeader className="text-left mb-6">
            <SheetTitle className="text-white text-xl">Install this app</SheetTitle>
            <SheetDescription className="text-gray-400">
              Install Lithocare Energy on your iPhone for a better, full-screen experience.
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
              <div className="bg-white/10 p-2 rounded-lg">
                <Share className="w-5 h-5 text-[#a8e69e]" />
              </div>
              <div className="flex-1 text-sm font-medium">
                1. Tap the <span className="text-white font-bold">Share</span> button at the bottom of Safari.
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
              <div className="bg-white/10 p-2 rounded-lg">
                <PlusSquare className="w-5 h-5 text-[#a8e69e]" />
              </div>
              <div className="flex-1 text-sm font-medium">
                2. Scroll down and tap <span className="text-white font-bold">Add to Home Screen</span>.
              </div>
            </div>
          </div>
          
          <Button 
            onClick={() => setShowIOSInstruction(false)}
            className="w-full bg-white text-black hover:bg-gray-200 rounded-full mt-8 py-5 font-bold"
          >
            Got it
          </Button>
        </SheetContent>
      </Sheet>
    </>
  );
}
