"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/dashboard')) return null;

  return (
    <footer className="bg-[#050505] text-white py-12 px-6 lg:px-12 border-t border-white/10 relative z-30">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col xl:flex-row justify-between items-center gap-8 mb-10">
          
          {/* Logo */}
          <Link href="/" className="text-4xl font-serif font-bold tracking-wider shrink-0">
            LITHOCARE ENERGY
          </Link>

          {/* Side-by-Side Links */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-[#ccff00] transition-colors uppercase tracking-widest">Home</Link>
            <Link href="/products" className="hover:text-[#ccff00] transition-colors uppercase tracking-widest">Products</Link>
            <Link href="/about" className="hover:text-[#ccff00] transition-colors uppercase tracking-widest">About Us</Link>
            <Link href="#" className="hover:text-[#ccff00] transition-colors uppercase tracking-widest">Contact</Link>
          </nav>

          {/* Compact Newsletter */}
          <form className="flex w-full md:w-auto shrink-0" onSubmit={(e) => e.preventDefault()}>
            <div className="flex bg-white/5 border border-white/10 rounded-full overflow-hidden w-full max-w-md focus-within:border-white/30 transition-colors">
              <input 
                type="email" 
                placeholder="Enter email for updates" 
                className="bg-transparent text-white px-6 py-3 outline-none w-full text-sm font-medium"
              />
              <button className="bg-white text-black px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors">
                Subscribe
              </button>
            </div>
          </form>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} LITHOCARE ENERGY. All rights reserved.</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <div className="flex gap-4 items-center border-l border-white/10 pl-6 md:pl-8">
              <a href="#" className="hover:text-[#ccff00] transition-colors uppercase tracking-widest">X</a>
              <a href="#" className="hover:text-[#ccff00] transition-colors uppercase tracking-widest">IG</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
