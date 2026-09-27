"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CreditCard, Clock, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planName = searchParams?.get("plan") || "Unknown Plan";

  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    businessName: "",
    reason: "",
    phone: "",
    address: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    // Validate
    if (!formData.businessName || !formData.phone || !formData.address) {
      alert("Please fill in all required fields (Business Name, Phone, Address).");
      return;
    }

    setLoading(true);

    try {
      // Save to database
      const res = await fetch("/api/business-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan_name: planName,
          business_name: formData.businessName,
          reason: formData.reason,
          phone_number: formData.phone,
          address: formData.address,
        })
      });

      if (!res.ok) {
        throw new Error("Failed to submit details.");
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting your details.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => setShowWarning(true);
  const handleSkip = () => router.push("/dashboard");

  if (showWarning) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 sm:p-10 text-center animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Payment Not Supported in App</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            Currently, our application does not support direct in-app payments. To complete your purchase and activate your <strong>{planName}</strong> plan, please contact our customer support.
          </p>
          <div className="bg-white rounded-xl border border-orange-100 p-4 mb-8 inline-block shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Support Number</p>
            <a 
              href="tel:+919382802304" 
              className="text-2xl font-bold text-gray-900 hover:text-orange-600 transition-colors inline-block"
            >
              +91 93828 02304
            </a>
          </div>
          <div>
            <Link 
              href="/dashboard"
              className="inline-flex items-center justify-center bg-black text-white px-8 py-3.5 rounded-xl font-medium hover:bg-gray-900 transition-colors"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:py-8 sm:px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 sm:mb-8">
        <Link 
          href="/dashboard/plans" 
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-500 hover:text-black transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Back to Plans
        </Link>
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
          Complete Your Purchase
        </h1>
        <p className="text-xs sm:text-base text-gray-500 mt-1 sm:mt-2 line-clamp-2 sm:line-clamp-none">
          You have selected the <span className="font-semibold text-gray-900">{planName}</span> plan. Please provide your business details below.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          
          <div className="space-y-2 col-span-1 md:col-span-2">
            <Label htmlFor="businessName">Business Name <span className="text-red-500">*</span></Label>
            <Input 
              id="businessName" 
              name="businessName" 
              value={formData.businessName}
              onChange={handleChange}
              placeholder="e.g. ABC Battery Services" 
              className="bg-gray-50/50"
              disabled={loading || isSubmitted}
            />
          </div>

          <div className="space-y-2 col-span-1 md:col-span-2">
            <Label htmlFor="reason">Why do you want to purchase this service?</Label>
            <Textarea 
              id="reason" 
              name="reason" 
              value={formData.reason}
              onChange={handleChange}
              placeholder="Tell us a little about your goals..." 
              className="bg-gray-50/50 min-h-[100px]"
              disabled={loading || isSubmitted}
            />
          </div>

          <div className="space-y-2 col-span-1">
            <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
            <Input 
              id="phone" 
              name="phone" 
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +91 9876543210" 
              className="bg-gray-50/50"
              disabled={loading || isSubmitted}
            />
          </div>
          
          <div className="space-y-2 col-span-1">
            <Label htmlFor="address">Business Address <span className="text-red-500">*</span></Label>
            <Input 
              id="address" 
              name="address" 
              value={formData.address}
              onChange={handleChange}
              placeholder="Full address" 
              className="bg-gray-50/50"
              disabled={loading || isSubmitted}
            />
          </div>
        </div>

        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
          <button 
            type="button"
            onClick={handleSubmit}
            disabled={loading || isSubmitted}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-medium text-white bg-black hover:bg-gray-900 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : isSubmitted ? "Submitted" : "Submit Details"}
          </button>
        </div>
      </div>

      {/* Popup Modal for Next Steps */}
      {isSubmitted && !showWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-md p-6 sm:p-8 animate-in zoom-in-95 duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 tracking-tight">Details Submitted!</h2>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
              We've successfully received your business details for the <span className="font-semibold text-gray-900">{planName}</span> plan. Would you like to proceed with payment now?
            </p>
            <div className="flex flex-col gap-3">
              <button 
                type="button"
                onClick={handlePayment}
                className="inline-flex w-full items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-medium text-white bg-black hover:bg-gray-900 shadow-sm transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                Make Payment
              </button>
              <button 
                type="button"
                onClick={handleSkip}
                className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Clock className="w-4 h-4" />
                Skip for now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
