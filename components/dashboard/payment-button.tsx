"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

export function PaymentButton({ planName }: { planName: string }) {
  const [showWarning, setShowWarning] = useState(false);

  return (
    <>
      <button 
        onClick={() => setShowWarning(true)}
        className="inline-block text-sm font-medium text-orange-600 hover:text-orange-700 focus:outline-none"
      >
        Make Payment →
      </button>

      {showWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 sm:p-8 text-center relative">
              <button 
                onClick={() => setShowWarning(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Payment Not Supported</h2>
              <p className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed text-sm">
                Currently, our application does not support direct in-app payments. To complete your purchase and activate your <strong>{planName}</strong> plan, please contact our customer support.
              </p>
              
              <div className="bg-gray-50 rounded-xl border border-orange-100 p-4 mb-2 shadow-sm hover:shadow-md transition-shadow inline-block">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Support Number</p>
                <a 
                  href="tel:+919382802304" 
                  className="text-2xl font-bold text-gray-900 hover:text-orange-600 transition-colors inline-block"
                >
                  +91 93828 02304
                </a>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 border-t border-gray-100 text-center">
              <button 
                onClick={() => setShowWarning(false)}
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
