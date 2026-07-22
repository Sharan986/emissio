"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BarChart3,
  Calculator,
  FileUp,
  Building2,
  FileCheck,
  LayoutDashboard,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: BarChart3,
    title: "Carbon Accounting",
    description:
      "Track Scope 1 and Scope 2 emissions with precision. Every calculation is deterministic, auditable, and reproducible.",
    span: "md:col-span-2",
  },
  {
    icon: Calculator,
    title: "Automated Calculations",
    description:
      "Versioned emission factors and a deterministic engine. No AI guesswork — just accurate, traceable results.",
    span: "",
  },
  {
    icon: FileUp,
    title: "Bill Upload & OCR",
    description:
      "Upload utility bills and fuel records. AI-powered OCR extracts data automatically while you maintain full control.",
    span: "",
  },
  {
    icon: Building2,
    title: "Facility Management",
    description:
      "Manage multiple manufacturing sites from one dashboard. Compare emissions across facilities and track improvement.",
    span: "",
  },
  {
    icon: FileCheck,
    title: "Compliance Reports",
    description:
      "Generate audit-ready sustainability reports that meet regulatory requirements. Share directly with buyers.",
    span: "",
  },
  {
    icon: LayoutDashboard,
    title: "Real-time Dashboard",
    description:
      "A unified view of your emissions, facilities, and reporting status. Built for daily use, not quarterly panic.",
    span: "md:col-span-2",
  },
];

export default function FeaturesSection() {
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

      // Feature cards — scale up + fade
      const cards = section.querySelectorAll(".gsap-card");
      gsap.set(cards, { opacity: 0, y: 50, scale: 0.92 });

      ScrollTrigger.batch(cards, {
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.07,
            ease: "power3.out",
          });
        },
        start: "top 85%",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="snap-section"
    >
      {/* Dark frosted glass backdrop */}
      <div className="section-frost" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12 lg:px-16 py-16">
        {/* Section header */}
        <div className="text-center mb-14 md:mb-16">
          <p className="gsap-text text-xs font-medium tracking-widest uppercase text-emerald-400 mb-4">
            Features
          </p>
          <h2
            className="gsap-text text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-5 text-balance"
            style={{ letterSpacing: "-0.03em" }}
          >
            Everything you need to measure,
            <br className="hidden sm:block" />
            manage, and report.
          </h2>
          <p className="gsap-text text-base md:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
            One platform that replaces spreadsheets, consultants, and
            disconnected tools.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`gsap-card group relative bg-white/5 backdrop-blur-md rounded-2xl p-7 border border-white/10 transition-all duration-400 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] ${feature.span}`}
            >
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                <feature.icon className="w-5 h-5 text-emerald-400" />
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">
                {feature.title}
              </h3>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
