"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Shield, Lock, Server } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Text — blur dissolve
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

      // Form + trust — fade up
      const cards = section.querySelectorAll(".gsap-card");
      gsap.set(cards, { opacity: 0, y: 30 });

      ScrollTrigger.batch(cards, {
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
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
      id="cta"
      className="snap-section bg-zinc-950"
    >
      {/* Subtle gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 md:px-12 lg:px-16 text-center">
        <p className="gsap-text text-xs font-medium tracking-widest uppercase text-emerald-400 mb-4">
          Get Started
        </p>
        <h2
          className="gsap-text text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-5 text-balance"
          style={{ letterSpacing: "-0.03em" }}
        >
          Ready to simplify your
          <br className="hidden sm:block" />
          carbon accounting?
        </h2>
        <p className="gsap-text text-base md:text-lg text-zinc-400 max-w-lg mx-auto mb-10 leading-relaxed">
          Join manufacturers who are replacing spreadsheets with a platform
          built for precision, compliance, and trust.
        </p>

        {/* CTA form */}
        <div className="gsap-card">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-8"
          >
            <input
              type="email"
              placeholder="your@company.com"
              className="w-full sm:flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-300"
            />
            <button
              type="submit"
              className="btn-cta w-full sm:w-auto bg-emerald-600 text-white px-7 py-3 rounded-xl text-sm font-medium hover:bg-emerald-500"
            >
              Book a Demo
              <ArrowRight className="w-4 h-4 btn-arrow" />
            </button>
          </form>
        </div>

        {/* Trust signals */}
        <div className="gsap-card flex flex-wrap items-center justify-center gap-6 text-zinc-500">
          {[
            { icon: Shield, label: "SOC 2 Ready" },
            { icon: Lock, label: "End-to-End Encrypted" },
            { icon: Server, label: "Data Residency in India" },
          ].map((signal) => (
            <div
              key={signal.label}
              className="flex items-center gap-2 text-xs transition-colors duration-300 hover:text-zinc-300"
            >
              <signal.icon className="w-3.5 h-3.5" />
              {signal.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
