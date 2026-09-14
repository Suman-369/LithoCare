"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { SignInButton, Show, UserButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import scooterImg from "@/images/HomeCar.png";
import arrowImg from "@/images/arrow.png";
import { useHomeAnimation } from "../animations/useHomeAnimation";
import ProductsSection from "./ProductsSection";
import AboutSection from "./AboutSection";
import battaryImg from "@/images/b4.png";
import logoImg from "@/images/Logo.png";
import { useCart } from "@/components/cart/CartProvider";
import { PwaInstallButton } from "@/components/pwa-install-button";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const specsCardRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const { cartCount } = useCart();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleRideClick = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in?redirect_url=/dashboard");
    }
  };

  useHomeAnimation(
    containerRef,
    heroTextRef,
    heroImageRef,
    specsCardRef,
    featureRef,
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white font-sans overflow-hidden flex flex-col"
    >
      {/* Navbar */}
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-6 lg:px-12 w-full z-50 relative">
        <Link href="/" className="flex items-center gap-3 text-lg sm:text-2xl lg:text-3xl font-serif font-bold tracking-wider">
          <Image src={logoImg} alt="Lithocare Energy Logo" width={55} height={55} className="object-contain w-10 h-10 sm:w-12 sm:h-12 lg:w-[55px] lg:h-[55px]" />
          LITHOCARE ENERGY
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-10 text-sm font-medium text-gray-400">
          <Link
            href="/products"
            className="flex items-center text-white hover:text-[#ccff00] transition-colors"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="hover:text-[#ccff00] transition-colors text-white"
          >
            About Us
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <Show when="signed-in">
            <button 
              onClick={() => router.push('/dashboard')}
              className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#222] transition-colors"
            >
              Dashboard
            </button>
          </Show>
          <Link href="/cart" className="flex items-center bg-[#1a1a1a] rounded-full pl-4 pr-2 py-2 text-sm text-gray-300 hover:bg-[#222] transition-colors">
            Cart{" "}
            <span className="ml-3 text-[#a8e69e] border border-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {mounted ? cartCount : 0}
            </span>
          </Link>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors">
                Login
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <div className="flex items-center justify-center w-9 h-9 bg-white/10 rounded-full">
              <UserButton />
            </div>
          </Show>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden bg-[#1a1a1a] p-2.5 rounded-full text-white hover:bg-[#222] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0a0a0a] border-t border-gray-800 p-6 flex flex-col gap-6 shadow-2xl lg:hidden">
            <Link
              href="/products"
              className="text-white text-lg font-medium hover:text-[#ccff00]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-white text-lg font-medium hover:text-[#ccff00]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <hr className="border-gray-800" />
            <div className="flex gap-4 w-full">
              <Show when="signed-in">
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="flex-1 bg-[#1a1a1a] text-white px-2 py-4 rounded-full text-sm font-medium hover:bg-[#222] transition-colors text-center"
                >
                  Dashboard
                </button>
              </Show>
              <Link href="/cart" className="flex-1 flex items-center justify-center gap-3 bg-[#1a1a1a] rounded-full px-2 py-4 text-white hover:bg-[#222] transition-colors">
                <span>Cart</span>
                <span className="text-[#a8e69e] border border-gray-600 rounded-full w-7 h-7 flex items-center justify-center text-sm">
                  {mounted ? cartCount : 0}
                </span>
              </Link>
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="flex-1 bg-white text-black px-2 py-4 rounded-full font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors text-center">
                    Login
                  </button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <div className="flex-1 flex items-center justify-center bg-white/10 rounded-full px-2 py-4">
                  <UserButton />
                </div>
              </Show>
            </div>
            <PwaInstallButton />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative flex-1 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 py-12 lg:py-0 w-full h-full max-w-screen-2xl mx-auto">
        {/* Left Column - Text Content */}
        <div
          ref={heroTextRef}
          className="w-full lg:w-5/12 z-10 flex flex-col justify-center h-full pt-10 lg:pt-0"
        >
          <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] mb-6 tracking-tight font-sans">
            Discover Your <br />
            <span className="text-[#a8e69e]">Perfect</span> Ride
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-[28rem] mb-10 leading-relaxed">
            Scooters are generally much more efficient than cars and can get you
            to your destination much faster.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button 
              onClick={() => router.push("/products")}
              className="bg-[#a8e69e] text-black hover:bg-[#96d58d] rounded-full px-8 h-12 text-[15px] font-semibold transition-colors border-none"
            >
              View Product
            </Button>
            <Button
              variant="outline"
              onClick={handleRideClick}
              className="bg-transparent border border-[#a8e69e] text-[#a8e69e] hover:bg-[#a8e69e]/10 hover:text-[#a8e69e] rounded-full px-8 h-12 text-[15px] font-semibold transition-colors"
            >
              Dashboard
            </Button>
          </div>

          {/* Middle Left Feature Section (Moved to match red box) */}
          <div ref={featureRef} className="mt-6 md:mt-8 w-full max-w-xl">
            <div className="relative inline-block mb-4">
              <h3 className="text-xl md:text-[22px] font-semibold tracking-wide leading-snug">
                powerful feature
                <br />
                available
              </h3>
              {/* Decorative Arrow Image */}
              <div className="absolute -right-28 -top-4 w-20 h-20 md:w-24 md:h-24 opacity-90">
                <Image
                  src={arrowImg}
                  alt="Feature arrow"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8 mt-2">
              {/* Feature Preview Image */}
              <div className="w-56 h-36 md:w-64 md:h-40 shrink-0 rounded-[2rem] overflow-hidden border border-gray-800 relative bg-[#111] shadow-xl">
                <Image
                  src={battaryImg}
                  alt="Feature Detail"
                  fill
                  className="object-cover scale-150 translate-y-6 translate-x-2 opacity-90"
                />
              </div>

              <div className="text-[13px] md:text-[15px] text-gray-300 max-w-[260px] leading-relaxed flex flex-col justify-between h-full pt-2">
                <p>
                  With its rubber feet and front handle Solar FF Lite is perfect
                  for public transit With its rubber feet and front handle it's
                  perfect for public transit
                </p>
                <div className="mt-4 flex items-center text-gray-400">
                  <span className="block w-12 h-[1px] bg-gray-500"></span>
                  <svg
                    className="w-3 h-3 -ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Hero Image & Specs */}
        <div className="w-full lg:w-7/12 h-[50vh] sm:h-[60vh] lg:h-[85vh] relative mt-16 lg:mt-0 flex items-center justify-center lg:justify-end lg:-ml-12 lg:pr-12">
          {/* Main Scooter Image */}
          <div ref={heroImageRef} className="relative w-full h-full lg:w-full">
            <Image
              src={scooterImg}
              alt="Electric Scooter"
              fill
              className="object-contain object-center lg:object-right-bottom drop-shadow-2xl z-10"
              priority
            />
          </div>

          {/* Floating Glass Specs Card */}
          <div
            ref={specsCardRef}
            className="absolute right-0 bottom-4 sm:bottom-1/4 lg:bottom-[20%] lg:right-12 z-20 bg-[#0a0a0a]/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 lg:p-8 shadow-2xl max-w-xs transition-transform hover:scale-[1.02]"
          >
            <ul className="space-y-4 lg:space-y-5 text-sm lg:text-base text-gray-200">
              <li className="flex items-center gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"></span>
                <span>45 Mile Range</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"></span>
                <span>45mph Top Speed</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"></span>
                <span>
                  2&times; 3200W motors
                  <br />
                  <span className="text-gray-400">60V 23Ah</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* Subtle Background Glows */}
      <div className="fixed top-0 right-0 -z-10 w-96 h-96 bg-[#a8e69e]/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* E-commerce Products Section */}
      <ProductsSection />

      {/* Cinematic About Section */}
      <AboutSection />
    </div>
  );
}
