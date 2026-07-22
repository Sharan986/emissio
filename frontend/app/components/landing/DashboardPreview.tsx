"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  LayoutDashboard,
  FileBarChart,
  Building2,
  UploadCloud,
  FileText,
  Settings,
} from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const sidebarTabs = [
  { id: "Dashboard", icon: LayoutDashboard },
  { id: "Emissions", icon: FileBarChart },
  { id: "Facilities", icon: Building2 },
  { id: "Bills & Uploads", icon: UploadCloud },
  { id: "Reports", icon: FileText },
  { id: "Settings", icon: Settings },
];

const facilities = [
  { name: "Plant A — Mumbai", status: "active" },
  { name: "Plant B — Pune", status: "active" },
  { name: "Warehouse — Delhi", status: "pending" },
];

const chartData = [
  { month: "Jan", value: 62 },
  { month: "Feb", value: 52 },
  { month: "Mar", value: 56 },
  { month: "Apr", value: 68 },
  { month: "May", value: 72 },
  { month: "Jun", value: 65 },
  { month: "Jul", value: 58 },
  { month: "Aug", value: 61 },
];

const maxChart = Math.max(...chartData.map((d) => d.value));

/* Intrinsic (unscaled) dimensions of the mockup */
const MOCKUP_W = 700;
const MOCKUP_ASPECT = 0.65;

export default function DashboardPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [scale, setScale] = useState(1);

  /*
   * Measure the available width from a SEPARATE zero-height element
   * that inherits the parent's constrained width (max-w-6xl + px-6)
   * but is NOT stretched by the 700px mockup content.
   */
  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const update = () => {
      const avail = el.clientWidth;
      setScale(Math.min(1, avail / MOCKUP_W));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* GSAP scroll-triggered reveals */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const textItems = section.querySelectorAll(".gsap-text");
      gsap.set(textItems, { opacity: 0, y: 40, filter: "blur(6px)" });
      ScrollTrigger.batch(textItems, {
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
          }),
        start: "top 85%",
      });

      const items = section.querySelectorAll(".gsap-reveal");
      gsap.set(items, { opacity: 0, y: 50 });
      ScrollTrigger.batch(items, {
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
          }),
        start: "top 85%",
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const scaledW = MOCKUP_W * scale;
  const scaledH = MOCKUP_W * MOCKUP_ASPECT * scale;

  return (
    <section ref={sectionRef} className="snap-section">
      <div className="section-frost" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12 lg:px-16 py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="gsap-text text-xs font-medium tracking-widest uppercase text-emerald-400 mb-4">
            Platform
          </p>
          <h2
            className="gsap-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-5"
            style={{ letterSpacing: "-0.03em" }}
          >
            Built for daily use,
            <br />
            not quarterly panic.
          </h2>
          <p className="gsap-text text-base md:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
            A unified dashboard that surfaces what matters — emissions, uploads,
            compliance status, and facility performance.
          </p>
        </div>

        {/*
         * ── Width-measurement element ──
         * This div is width:100% and height:0. It inherits the constrained
         * parent width and is NEVER stretched by the 700px mockup below,
         * breaking the circular dependency.
         */}
        <div
          ref={measureRef}
          style={{ width: "100%", height: 0, overflow: "hidden", pointerEvents: "none" }}
          aria-hidden="true"
        />

        {/* ── Scaled mockup ── */}
        <div className="gsap-reveal" style={{ overflow: "hidden" }}>
          {/*
           * "Sizer" div — its width equals the *visual* scaled width,
           * so margin:auto centres it perfectly.
           */}
          <div
            style={{
              width: scaledW,
              height: scaledH,
              margin: "0 auto",
              position: "relative",
            }}
          >
            {/*
             * The 700px mockup is absolutely positioned and CSS-scaled
             * from top-left. Because it's absolutely positioned it does
             * NOT influence the sizer's layout width.
             */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: MOCKUP_W,
                transformOrigin: "top left",
                transform: `scale(${scale})`,
              }}
            >
              {/* Browser chrome */}
              <div className="rounded-2xl overflow-hidden bg-[#1a1a1c] shadow-[0_-20px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10 pb-2">
                <div className="bg-[#242427] border-b border-white/5 px-4 py-2.5 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-[#1a1a1c] rounded-md px-6 py-1 text-[10px] text-white/60 flex items-center gap-1.5">
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <path d="M8 21h8M12 17v4" />
                      </svg>
                      app.emissio.io
                    </div>
                  </div>
                </div>

                {/* Dashboard body */}
                <div className="flex min-h-[380px]">
                  {/* Sidebar */}
                  <div className="w-48 border-r border-white/5 bg-[#1e1e21] px-3 py-4 shrink-0 flex flex-col">
                    <div className="flex items-center gap-2 px-2 mb-5 shrink-0">
                      <div className="relative w-5 h-5 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src="/Emissio-logo.webp"
                          alt="Emissio"
                          fill
                          sizes="20px"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs font-semibold text-white/90">
                        Emissio
                      </span>
                    </div>

                    <div className="flex flex-col space-y-0.5">
                      {sidebarTabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <div
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-2.5 py-1.5 rounded-md text-[11px] cursor-pointer transition-colors duration-200 flex items-center gap-2 ${
                              activeTab === tab.id
                                ? "bg-white/10 text-white font-medium"
                                : "text-white/50 hover:bg-white/5 hover:text-white/90"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            {tab.id}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-5 pt-3 border-t border-white/5">
                      <p className="px-2.5 text-[9px] uppercase tracking-wider text-white/30 mb-2">
                        Facilities
                      </p>
                      {facilities.map((f) => (
                        <div
                          key={f.name}
                          className="flex items-center gap-2 px-2.5 py-1.5 text-[10px] text-white/50 cursor-pointer transition-colors duration-200 hover:bg-white/5 hover:text-white/90 rounded-md"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              f.status === "active"
                                ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                                : "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                            }`}
                          />
                          {f.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content area */}
                  <div className="flex-1 bg-[#141416] p-5 flex flex-col relative overflow-hidden">
                    {activeTab === "Dashboard" ? (
                      <div className="animate-fade-down w-full h-full">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-sm font-medium text-white">
                              Emissions Overview
                            </h3>
                            <p className="text-[10px] text-white/40 mt-0.5">
                              FY 2026 — Q3
                            </p>
                          </div>
                          <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                            On Track
                          </span>
                        </div>

                        {/* Stat cards */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {[
                            { label: "Total Emissions", value: "847.2", unit: "tCO₂e", change: "-12.3%" },
                            { label: "Scope 1", value: "312.8", unit: "tCO₂e", change: "-8.1%" },
                            { label: "Scope 2", value: "534.4", unit: "tCO₂e", change: "-14.7%" },
                            { label: "Bills Processed", value: "156", unit: "this quarter", change: "+23" },
                          ].map((stat) => (
                            <div
                              key={stat.label}
                              className="group bg-white/[0.03] rounded-xl ring-1 ring-white/5 p-3 transition-all duration-300 hover:bg-white/[0.06] hover:ring-white/20 hover:-translate-y-0.5 cursor-pointer shadow-lg hover:shadow-2xl"
                            >
                              <p className="text-[9px] uppercase tracking-wider text-white/35 mb-1">
                                {stat.label}
                              </p>
                              <p className="text-lg font-medium text-white transition-colors duration-300 group-hover:text-emerald-50">
                                {stat.value}
                              </p>
                              <div className="flex items-center justify-between mt-0.5">
                                <span className="text-[10px] text-white/40">
                                  {stat.unit}
                                </span>
                                <span
                                  className={`text-[10px] ${
                                    stat.change.startsWith("-")
                                      ? "text-emerald-400"
                                      : "text-white/40"
                                  }`}
                                >
                                  {stat.change}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Chart */}
                        <div className="bg-white/[0.03] rounded-xl ring-1 ring-white/5 p-4">
                          <p className="text-[11px] font-medium text-white/70 mb-3">
                            Monthly Emissions (tCO₂e)
                          </p>
                          <div className="flex items-end gap-2 h-24">
                            {chartData.map((d) => (
                              <div
                                key={d.month}
                                className="group flex-1 flex flex-col items-center gap-1 cursor-pointer relative"
                              >
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -top-10 bg-zinc-800 border border-white/10 text-white text-[9px] px-2 py-1.5 rounded-lg shadow-xl whitespace-nowrap pointer-events-none z-10 flex flex-col items-center">
                                  <span className="font-medium text-white">
                                    {d.value}
                                  </span>
                                  <span className="text-[8px] text-zinc-400">
                                    tCO₂e
                                  </span>
                                </div>
                                <div className="w-full flex flex-col gap-0.5 transition-transform duration-300 group-hover:-translate-y-1">
                                  <div
                                    className="w-full bg-emerald-500/80 rounded-t-sm transition-colors duration-200 group-hover:bg-emerald-400"
                                    style={{
                                      height: `${(d.value * 0.37 / maxChart) * 100}px`,
                                    }}
                                  />
                                  <div
                                    className="w-full bg-blue-500/60 rounded-b-sm transition-colors duration-200 group-hover:bg-blue-400"
                                    style={{
                                      height: `${(d.value * 0.63 / maxChart) * 100}px`,
                                    }}
                                  />
                                </div>
                                <span className="text-[8px] text-white/30 transition-colors duration-200 group-hover:text-white/70">
                                  {d.month}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center opacity-60 animate-fade-down h-full min-h-[300px]">
                        {sidebarTabs.map((t) => {
                          if (t.id !== activeTab) return null;
                          const Icon = t.icon;
                          return (
                            <Icon
                              key={t.id}
                              className="w-12 h-12 text-emerald-500/50 mb-4"
                            />
                          );
                        })}
                        <p className="text-white text-base font-medium">
                          {activeTab}
                        </p>
                        <p className="text-zinc-500 text-xs mt-1.5 text-center">
                          {activeTab === "Emissions" &&
                            "Detailed breakdown by Scope 1, 2, and 3."}
                          {activeTab === "Facilities" &&
                            "Manage your active and pending facilities."}
                          {activeTab === "Bills & Uploads" &&
                            "AI-assisted OCR data extraction pipeline."}
                          {activeTab === "Reports" &&
                            "Generate audit-ready BRSR and CBAM reports."}
                          {activeTab === "Settings" &&
                            "Workspace, members, and API configurations."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA link */}
        <div className="gsap-reveal text-center mt-8">
          <a
            href="#cta"
            className="link-hover text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            See Emissio in action
            <ArrowRight className="w-4 h-4 btn-arrow inline-block ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
