"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // After first section (hero), switch to frosted glass navbar
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Platform", href: "#platform" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src="/Emissio-logo.webp"
                alt="Emissio Logo"
                fill
                sizes="32px"
                className="object-cover"
                priority
              />
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">
              Emissio
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium transition-colors duration-300 text-white/60 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              className="text-[13px] font-medium px-4 py-2 rounded-full transition-colors duration-300 text-white/70 hover:text-white"
            >
              Sign In
            </a>
            <a
              href="#cta"
              className="text-[13px] font-medium px-5 py-2 rounded-full transition-all duration-300 bg-white text-zinc-900 hover:bg-zinc-100"
            >
              Book a Demo
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-300 text-white hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden absolute left-4 right-4 top-full rounded-2xl px-5 py-3 animate-fade-down liquid-glass">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 text-[15px] font-medium transition-colors ${
                  i < navLinks.length - 1 ? "border-b border-white/10" : ""
                } text-white/80 hover:text-white`}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 pt-3">
              <a
                href="#"
                className="flex-1 text-center text-[13px] font-medium px-4 py-2.5 rounded-full text-white/80 ring-1 ring-white/20"
              >
                Sign In
              </a>
              <a
                href="#cta"
                className="flex-1 text-center text-[13px] font-medium px-4 py-2.5 rounded-full bg-white text-zinc-900"
              >
                Book a Demo
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
