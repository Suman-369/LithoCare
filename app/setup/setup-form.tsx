"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setHasBusiness } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function SetupForm({ userId }: { userId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSelection = async (hasBusiness: boolean) => {
    if (hasBusiness && !showPhoneInput) {
      setShowPhoneInput(true);
      return;
    }

    if (hasBusiness && !mobileNumber.trim()) {
      toast.error("Please enter your mobile number");
      return;
    }

    try {
      setIsLoading(true);
      await setHasBusiness(hasBusiness, hasBusiness ? mobileNumber : undefined);
      toast.success("Preferences saved successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to save preferences. Please try again.");
      setIsLoading(false);
    }
  };

  if (showPhoneInput) {
    return (
      <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <Input 
            type="tel"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end mt-2">
          <Button 
            onClick={() => setShowPhoneInput(false)} 
            disabled={isLoading}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Back
          </Button>
          <Button 
            onClick={() => handleSelection(true)} 
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Submit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
      <Button 
        onClick={() => handleSelection(true)} 
        disabled={isLoading}
        className="w-full sm:w-auto min-w-[120px]"
      >
        Yes, I do
      </Button>
      <Button 
        onClick={() => handleSelection(false)} 
        disabled={isLoading}
        variant="outline"
        className="w-full sm:w-auto min-w-[120px]"
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        No, I don't
      </Button>
    </div>
  );
}
