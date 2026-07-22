"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface LoadingScreenProps {
  progress: number;
  isLoaded: boolean;
}

/**
 * Full-screen loading overlay shown while frames are being preloaded.
 * Fades out when all frames are loaded.
 */
export default function LoadingScreen({ progress, isLoaded }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      // Start fade out animation
      setFadeOut(true);
      const timer = setTimeout(() => {
        setVisible(false);
        // Re-enable scrolling
        document.body.style.overflow = "";
      }, 800);
      return () => clearTimeout(timer);
    } else {
      // Prevent scrolling while loading
      document.body.style.overflow = "hidden";
    }
  }, [isLoaded]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12">
        <div className="relative w-10 h-10 rounded-xl overflow-hidden">
          <Image
            src="/Emissio-logo.webp"
            alt="Emissio"
            fill
            className="object-cover"
            priority
          />
        </div>
        <span className="text-2xl font-semibold text-white tracking-tight">
          Emissio
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-white/60 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress text */}
      <p className="mt-4 text-xs text-zinc-500 font-medium tabular-nums">
        {progress}%
      </p>
    </div>
  );
}
