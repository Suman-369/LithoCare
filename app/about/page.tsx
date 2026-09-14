"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const storySectionRef = useRef<HTMLDivElement>(null);

  const marqueeSectionRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);

  const visualSectionRef = useRef<HTMLDivElement>(null);
  const visualImageRef = useRef<HTMLImageElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Hero Load Animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set([eyebrowRef.current, paragraphRef.current, ctaRef.current], {
        opacity: 0,
        y: 30,
      });

      gsap.set(headingLinesRef.current, {
        yPercent: 100,
        opacity: 0,
      });

      // Video starts slightly scaled
      gsap.set(videoRef.current, { scale: 1.05 });

      tl.to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
      })
        .to(
          headingLinesRef.current,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "expo.out",
          },
          "-=0.6",
        )
        .to(
          paragraphRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "-=0.8",
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "-=0.8",
        );

      // 2. ScrollTrigger Video Section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        animation: gsap
          .timeline()
          .to(videoRef.current, {
            scale: 1,
            yPercent: 10, // Subtle parallax
            ease: "none",
          })
          .to(
            heroContentRef.current,
            {
              y: -100,
              opacity: 0,
              ease: "none",
            },
            0,
          ),
        scrub: true,
      });

      // 3. About Story Section Staggered Reveal
      const storyTl = gsap.timeline({
        scrollTrigger: {
          trigger: storySectionRef.current,
          start: "top 85%",
          end: "top 40%",
          scrub: 1,
        },
      });

      storyTl
        .fromTo(
          ".story-accent",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.8, ease: "power3.inOut" },
        )
        .fromTo(
          ".story-heading-text",
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "expo.out",
          },
          "-=0.4",
        )
        .fromTo(
          ".story-paragraph",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
          "-=0.8",
        );

      // 4. Marquee Infinite Scroll + Direction Change
      if (marqueeInnerRef.current) {
        const marqueeTween = gsap.to(marqueeInnerRef.current, {
          xPercent: -50,
          ease: "none",
          duration: 20,
          repeat: -1,
        });

        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            // self.direction returns 1 for scrolling down, -1 for scrolling up
            gsap.to(marqueeTween, {
              timeScale: self.direction,
              duration: 0.5,
              overwrite: true,
            });
          },
        });
      }

      // 5. Full-Width Visual Parallax
      if (visualSectionRef.current && visualImageRef.current) {
        gsap.to(visualImageRef.current, {
          yPercent: 15,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: visualSectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // 6. Final CTA
      gsap.fromTo(
        finalCtaRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: finalCtaRef.current,
            start: "top 85%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
      {/* Navbar overlaying the video */}
      <header className="absolute top-0 left-0 w-full z-50 py-6 px-6 lg:px-12 text-white">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-serif font-bold tracking-wider"
          >
            LITHOCARE ENERGY
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-200">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link
              href="/products"
              className="hover:text-white transition-colors"
            >
              Products
            </Link>
            <Link href="/about" className="text-white font-medium">
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            src="/images/showcase.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover origin-center"
          />
          {/* Subtle cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
        </div>

        {/* Hero Content */}
        <div
          ref={heroContentRef}
          className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center text-white"
        >
          <p
            ref={eyebrowRef}
            className="text-xs md:text-sm tracking-[0.2em] font-medium uppercase text-gray-300 mb-6"
          >
            Built for the next ride
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.1] tracking-tight mb-8 font-sans overflow-hidden">
            <span
              ref={(el) => {
                headingLinesRef.current[0] = el;
              }}
              className="block"
            >
              Moving Forward.
            </span>
            <span
              ref={(el) => {
                headingLinesRef.current[1] = el;
              }}
              className="block text-gray-200"
            >
              Designed Differently.
            </span>
          </h1>

          <p
            ref={paragraphRef}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Experience a new generation of mobility where intelligent
            engineering, refined design, and everyday performance come together.
          </p>

          <div ref={ctaRef}>
            <button className="group relative px-8 py-4 border border-white/30 rounded-full overflow-hidden hover:border-white transition-colors duration-500">
              <span className="relative z-10 text-sm tracking-widest font-medium uppercase">
                Explore Our Story &rarr;
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              <span className="absolute inset-0 z-10 flex items-center justify-center text-sm tracking-widest font-medium uppercase text-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                Explore Our Story &rarr;
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* About Story Section */}
      <section className="pt-12 pb-20 md:pt-16 md:pb-24 px-6 lg:px-12 bg-white text-black relative overflow-hidden">
        <div
          ref={storySectionRef}
          className="max-w-[1000px] mx-auto text-center flex flex-col items-center"
        >
          {/* Decorative accent */}
          <div className="w-16 h-1 bg-black mb-14 story-accent origin-left rounded-full"></div>

          <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-serif font-medium leading-[1.15] mb-16 tracking-tight text-gray-900">
            <span className="block overflow-hidden pb-2">
              <span className="block story-heading-text">
                More Than A Vehicle.
              </span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="block story-heading-text text-gray-400 italic">
                A New Way To Move.
              </span>
            </span>
          </h2>

          <div className="space-y-8 text-xl md:text-2xl text-gray-500 leading-relaxed max-w-3xl mx-auto font-light">
            <p className="story-paragraph">
              We believe that movement should be effortless, sustainable, and
              beautifully designed. Our vision started with a simple question:{" "}
              <strong className="font-medium text-gray-900">
                How can we make urban commuting something people actually look
                forward to?
              </strong>
            </p>
            <p className="story-paragraph">
              Through relentless innovation, aerospace-grade materials, and a
              rider-first design philosophy, we've stripped away the unnecessary
              to create electric vehicles that are as intuitive as they are
              powerful.
            </p>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section
        ref={marqueeSectionRef}
        className="bg-[#ccff00] py-3 md:py-4 border-y-[3px] border-black overflow-hidden flex w-full relative z-20"
      >
        <div ref={marqueeInnerRef} className="flex w-max">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center whitespace-nowrap"
              aria-hidden={i > 0 ? "true" : undefined}
            >
              <span className="text-4xl md:text-6xl font-sans font-black uppercase tracking-tighter text-black mx-4 md:mx-6">
                MOVE DIFFERENTLY
              </span>
              <div className="relative w-24 h-10 md:w-48 md:h-16 rounded-full overflow-hidden mx-2 md:mx-4 shrink-0 border-[3px] border-black bg-white">
                <Image
                  src="/images/b1.png"
                  alt="Scooter view"
                  fill
                  className="object-contain p-1 md:p-2"
                />
              </div>

              <span className="text-4xl md:text-6xl font-sans font-black uppercase tracking-tighter text-black mx-4 md:mx-6">
                RIDE THE FUTURE
              </span>
              <div className="relative w-24 h-10 md:w-48 md:h-16 rounded-full overflow-hidden mx-2 md:mx-4 shrink-0 border-[3px] border-black bg-white">
                <Image
                  src="/images/b2.png"
                  alt="Scooter view"
                  fill
                  className="object-contain p-1 md:p-2"
                />
              </div>

              <span className="text-4xl md:text-6xl font-sans font-black uppercase tracking-tighter text-black mx-4 md:mx-6">
                SEE EVERYTHING
              </span>
              <div className="relative w-24 h-10 md:w-48 md:h-16 rounded-full overflow-hidden mx-2 md:mx-4 shrink-0 border-[3px] border-black bg-white">
                <Image
                  src="/images/image1.png"
                  alt="Scooter view"
                  fill
                  className="object-contain p-1 md:p-2"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full-Width Visual Section */}
      <section
        ref={visualSectionRef}
        className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-black flex items-center justify-center"
      >
        <div className="absolute inset-0 z-0 opacity-80">
          <Image
            ref={visualImageRef}
            src="/images/b3.png"
            alt="Cinematic visual"
            fill
            className="object-cover origin-center"
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <h2 className="text-4xl md:text-6xl font-bold tracking-widest text-shadow-white uppercase opacity-90 drop-shadow-2xl">
            The Future Is
            <br />
            Already Moving.
          </h2>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6 lg:px-12 bg-[#0a0a0a] text-white text-center">
        <div ref={finalCtaRef} className="max-w-[800px] mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
            Ready To Move Forward?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Discover the technology, design, and experience behind our next
            generation of mobility.
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-black px-10 py-5 rounded-full text-sm tracking-widest font-bold uppercase hover:scale-105 transition-transform duration-300"
          >
            Explore Products &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
