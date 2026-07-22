"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  FileSpreadsheet,
  Clock,
  Users,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
  {
    icon: FileSpreadsheet,
    text: "Data scattered across spreadsheets, utility bills, and emails",
  },
  {
    icon: Clock,
    text: "Weeks spent compiling reports manually every quarter",
  },
  {
    icon: Users,
    text: "Expensive consultants needed for basic calculations",
  },
  {
    icon: AlertTriangle,
    text: "Risk of non-compliance with evolving regulations",
  },
  {
    icon: HelpCircle,
    text: "No clarity on emission factor methodology or accuracy",
  },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Text elements — fade up with blur dissolve
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

      // Pain point rows — slide in from left
      const painItems = section.querySelectorAll(".gsap-pain");
      gsap.set(painItems, { opacity: 0, x: -30 });

      ScrollTrigger.batch(painItems, {
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
          });
        },
        start: "top 85%",
      });

      // Visual cards — scale up
      const cards = section.querySelectorAll(".gsap-card");
      gsap.set(cards, { opacity: 0, y: 50, scale: 0.95 });

      ScrollTrigger.batch(cards, {
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
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
      id="platform"
      className="snap-section"
    >
      {/* Dark frosted glass backdrop */}
      <div className="section-frost" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12 lg:px-16 py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left — Text */}
          <div>
            <div>
              <p className="gsap-text text-xs font-medium tracking-widest uppercase text-emerald-400 mb-4">
                The Problem
              </p>
              <h2
                className="gsap-text text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 text-balance"
                style={{ letterSpacing: "-0.03em" }}
              >
                Sustainability reporting shouldn&apos;t take weeks.
              </h2>
              <p className="gsap-text text-base md:text-lg text-zinc-400 mb-10 leading-relaxed max-w-md">
                Most manufacturers still manage emissions data through
                disconnected tools. When a buyer asks for your carbon report,
                the scramble begins.
              </p>
            </div>

            <div className="space-y-4">
              {painPoints.map((point, i) => (
                <div
                  key={i}
                  className="gsap-pain flex items-start gap-4 group"
                >
                  <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-all duration-300 group-hover:scale-110">
                    <point.icon className="w-4.5 h-4.5 text-red-400" />
                  </div>
                  <p className="text-sm md:text-base text-zinc-300 leading-relaxed pt-1.5">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="gsap-text mt-10">
              <a
                href="#features"
                className="link-hover text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                See how Emissio fixes this
                <ArrowRight className="w-4 h-4 btn-arrow" />
              </a>
            </div>
          </div>

          {/* Right — Visual */}
          <div className="gsap-card mt-12 lg:mt-0">
            <div className="relative">
              {/* "Before" card — messy spreadsheet */}
              <div className="bg-zinc-900/80 rounded-2xl p-6 border border-white/10 shadow-sm rotate-[-2deg] translate-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-[10px] text-zinc-500 font-mono">
                    emissions_Q3_final_v7_FIXED.xlsx
                  </span>
                </div>
                <div className="space-y-1.5">
                  {[
                    ["Source", "Amount", "Unit", "Factor", "Emissions"],
                    ["Diesel", "12,400", "L", "???", "#REF!"],
                    ["Electricity", "—", "kWh", "—", "PENDING"],
                    ["Natural Gas", "8,200", "m³", "2.02", "16,564"],
                    ["Fleet", "CHECK", "km", "—", "#N/A"],
                  ].map((row, i) => (
                    <div
                      key={i}
                      className={`grid grid-cols-5 gap-1 text-[10px] font-mono ${i === 0
                          ? "text-zinc-400 font-semibold"
                          : "text-zinc-500"
                        }`}
                    >
                      {row.map((cell, j) => (
                        <span
                          key={j}
                          className={`px-2 py-1 rounded ${i === 0
                              ? "bg-white/5"
                              : cell.includes("#") ||
                                cell === "???" ||
                                cell === "PENDING" ||
                                cell === "CHECK" ||
                                cell === "—"
                                ? "bg-red-500/10 text-red-400"
                                : "bg-white/5"
                            }`}
                        >
                          {cell}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* "After" card — clean Emissio dashboard */}
              <div className="absolute top-8 left-8 right-0 bg-zinc-900/90 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl rotate-[1deg] z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative w-6 h-6 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src="/Emissio-logo.webp"
                      alt="Emissio Logo"
                      fill
                      sizes="24px"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs font-semibold text-white">
                    Emissio Dashboard
                  </span>
                  <span className="ml-auto text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium">
                    Verified
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Total Emissions", value: "847.2", unit: "tCO₂e" },
                    { label: "Scope 1", value: "312.8", unit: "tCO₂e" },
                    { label: "Scope 2", value: "534.4", unit: "tCO₂e" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white/5 rounded-lg p-3 border border-white/5"
                    >
                      <p className="text-[9px] text-zinc-500 font-medium uppercase tracking-wider">
                        {stat.label}
                      </p>
                      <p className="text-lg font-semibold text-white mt-1">
                        {stat.value}
                      </p>
                      <p className="text-[10px] text-zinc-500">{stat.unit}</p>
                    </div>
                  ))}
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                    style={{ width: "73%" }}
                  />
                </div>
                <p className="text-[10px] text-zinc-500 mt-1.5">
                  Q3 2026 report — 73% complete
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
