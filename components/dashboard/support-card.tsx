"use client";

import { ArrowRight, MessageCircleQuestion } from "lucide-react";

export function SupportCard() {
  return (
    <div className="bg-gray-900 rounded-2xl p-6 text-white relative overflow-hidden mt-6 shadow-md">
      {/* Subtle decorative background element */}
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <MessageCircleQuestion className="w-24 h-24 transform rotate-12" />
      </div>
      
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">Need help?</h3>
          <p className="text-sm text-gray-300 max-w-sm">
            Our support team is available to help with your service requirements.
          </p>
        </div>
        <a 
          href="https://wa.me/919382802304?text=Hello%20LITHOCARE%2C%20I%20need%20help%20with%20my%20service%20requirements." 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors group"
        >
          Contact Support
          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
