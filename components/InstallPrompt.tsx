"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed and running in standalone mode
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsStandalone(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // If no prompt is available, it might be iOS or already installed
      toast.info(
        "To install this app, tap the Share icon and select 'Add to Home Screen' (on iOS) or use your browser's install option (on Android/Desktop)."
      );
      return;
    }
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  if (isStandalone) return null;

  return (
    <Button
      onClick={handleInstallClick}
      className="w-full bg-[#a8e69e] text-black hover:bg-[#96d58d] rounded-full px-2 py-4 font-bold tracking-widest uppercase transition-colors text-center mt-2"
    >
      Install App
    </Button>
  );
}
