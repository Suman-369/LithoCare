'use client';

import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useHomeAnimation = (
  containerRef: RefObject<HTMLElement | null>, 
  heroTextRef: RefObject<HTMLElement | null>,
  heroImageRef: RefObject<HTMLElement | null>,
  specsCardRef: RefObject<HTMLElement | null>,
  featureRef: RefObject<HTMLElement | null>
) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for initial load
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Initial state
      gsap.set(heroTextRef.current, { y: 50, opacity: 0 });
      gsap.set(heroImageRef.current, { x: 50, opacity: 0 });
      gsap.set(specsCardRef.current, { y: 30, opacity: 0 });
      gsap.set(featureRef.current, { y: 30, opacity: 0 });
      
      // Navbar staggered entrance could be here but we'll focus on main content
      tl.to(heroTextRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2
      })
      .to(heroImageRef.current, {
        x: 0,
        opacity: 1,
        duration: 1.2
      }, "-=0.6")
      .to(specsCardRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8
      }, "-=0.8")
      .to(featureRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8
      }, "-=0.6");
      
      // Floating animation for specs card
      gsap.to(specsCardRef.current, {
        y: "-=10",
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, heroTextRef, heroImageRef, specsCardRef, featureRef]);
};

