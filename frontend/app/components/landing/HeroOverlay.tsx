"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero section — fully transparent, canvas is the star.
 * Snaps as a full-viewport section.
 *
 * Animations:
 * - Headline lines reveal one-by-one with blur dissolve
 * - Subtitle fades up with slight blur
 * - CTA buttons stagger in
 * - Tag card slides in from the right
 */
export default function HeroOverlay() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([line1Ref.current, line2Ref.current], {
        opacity: 0,
        y: 60,
        filter: "blur(8px)",
      });
      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 30,
        filter: "blur(6px)",
      });
      gsap.set(ctaRef.current, {
        opacity: 0,
        y: 20,
      });
      gsap.set(tagRef.current, {
        opacity: 0,
        x: 40,
        filter: "blur(4px)",
      });

      // Main entrance timeline
      const tl = gsap.timeline({ delay: 0.5 });

      // Line 1 — slide up + deblur
      tl.to(line1Ref.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
      })
        // Line 2 — slide up + deblur (overlaps)
        .to(
          line2Ref.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
          },
          "-=0.7"
        )
        // Subtitle — fade up with deblur
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.5"
        )
        // CTA buttons — stagger in
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3"
        )
        // Tag — slide in from right
        .to(
          tagRef.current,
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="snap-section"
    >
      {/* Hero content — pushed to bottom */}
      <div className="flex flex-1 flex-col justify-end px-6 md:px-12 lg:px-16 pb-12 lg:pb-16 pt-24">
        <div className="lg:grid lg:grid-cols-2 lg:items-end gap-8">
          {/* Left column */}
          <div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 text-white"
              style={{ letterSpacing: "-0.04em" }}
            >
              <span ref={line1Ref} className="block">
                Measure your impact.
              </span>
              <span ref={line2Ref} className="block">
                Reduce what matters.
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-base md:text-lg text-zinc-300 mb-5 max-w-lg leading-relaxed"
            >
              Carbon accounting for manufacturers — replace spreadsheets and
              consultants with one platform built for precision.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <a
                href="#cta"
                className="btn-primary bg-white text-black px-8 py-3 rounded-lg font-medium text-sm"
              >
                Book a Demo
                <ArrowRight className="w-4 h-4 btn-arrow" />
              </a>
              <a
                href="#features"
                className="btn-ghost liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium text-sm hover:bg-white/10"
              >
                Explore Platform
              </a>
            </div>
          </div>

          {/* Right column — Tag */}
          <div
            ref={tagRef}
            className="flex items-end justify-start lg:justify-end mt-8 lg:mt-0"
          >
            <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
              <p className="text-lg md:text-xl lg:text-2xl font-light text-white">
                Scope 1. Scope 2. Compliance.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(9, 9, 11, 0.6) 0%, rgba(9, 9, 11, 0) 100%)",
        }}
      />
    </section>
  );
}
