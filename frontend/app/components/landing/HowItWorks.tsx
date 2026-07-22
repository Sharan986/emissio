"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Upload, Cpu, FileText } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload",
    description:
      "Upload utility bills, fuel receipts, and consumption records. AI-assisted OCR extracts data automatically.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Calculate",
    description:
      "Our deterministic engine applies versioned emission factors. Every calculation is traceable and reproducible.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Report",
    description:
      "Generate audit-ready sustainability reports. Share with buyers, regulators, and stakeholders instantly.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header text — blur dissolve
      const textItems = section.querySelectorAll(".gsap-text");
      gsap.set(textItems, { opacity: 0, y: 40, filter: "blur(6px)" });

      ScrollTrigger.batch(textItems, {
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
          });
        },
        start: "top 85%",
      });

      // Step cards — scale up + fade, staggered
      const cards = section.querySelectorAll(".gsap-step");
      gsap.set(cards, { opacity: 0, y: 50, scale: 0.9 });

      ScrollTrigger.batch(cards, {
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
          });
        },
        start: "top 85%",
      });

      // Connecting line — draw in from left
      const line = section.querySelector(".gsap-line");
      if (line) {
        gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
        ScrollTrigger.create({
          trigger: line,
          start: "top 80%",
          onEnter: () => {
            gsap.to(line, {
              scaleX: 1,
              duration: 1.2,
              ease: "power3.inOut",
            });
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="snap-section"
    >
      {/* Dark frosted glass backdrop */}
      <div className="section-frost" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12 lg:px-16 py-16">
        {/* Section header */}
        <div className="text-center mb-14 md:mb-16">
          <p className="gsap-text text-xs font-medium tracking-widest uppercase text-emerald-400 mb-4">
            How It Works
          </p>
          <h2
            className="gsap-text text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-5 text-balance"
            style={{ letterSpacing: "-0.03em" }}
          >
            Three steps to clarity.
          </h2>
          <p className="gsap-text text-base md:text-lg text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Go from scattered data to a complete carbon report in hours, not
            weeks.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* Connecting line (desktop only) */}
          <div className="gsap-line hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-emerald-500/30 via-blue-500/30 to-violet-500/30" />

          {steps.map((step) => (
            <div
              key={step.title}
              className="gsap-step relative text-center flex flex-col items-center group"
            >
              <div className="flex flex-col items-center mb-6">
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/15 group-hover:border-white/20 group-hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]">
                  <step.icon className="w-7 h-7 text-emerald-400" />
                </div>
                <span className="text-[11px] font-bold tracking-widest text-emerald-500/80 uppercase">
                  Step {step.number}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
                {step.title}
              </h3>

              <p className="text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
