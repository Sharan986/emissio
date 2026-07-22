"use client";

import Image from "next/image";

const footerLinks = {
  Product: [
    { label: "Carbon Accounting", href: "#features" },
    { label: "Bill Upload & OCR", href: "#features" },
    { label: "Compliance Reports", href: "#features" },
    { label: "Dashboard", href: "#features" },
    { label: "Pricing", href: "#" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Status", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Data Processing", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="snap-section bg-zinc-950 border-t border-white/5 !min-h-0">
      <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-16 py-16">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-7 h-7 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src="/Emissio-logo.webp"
                  alt="Emissio Logo"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
              <span className="text-base font-semibold text-white tracking-tight">
                Emissio
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-[180px]">
              The operating system for sustainability and environmental
              compliance.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-[11px] text-zinc-600">
            © {new Date().getFullYear()} Emissio. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {[
              {
                label: "LinkedIn",
                path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z",
              },
              {
                label: "Twitter",
                path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
              },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                className="text-zinc-600 hover:text-zinc-400 transition-colors"
                aria-label={social.label}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
