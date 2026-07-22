"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCanvasRenderer } from "@/app/hooks/useCanvasRenderer";
import { TOTAL_FRAMES } from "@/app/lib/preloadFrames";

gsap.registerPlugin(ScrollTrigger);

interface ScrollCanvasProps {
  images: HTMLImageElement[];
  isLoaded: boolean;
}

/**
 * Fixed full-viewport canvas that renders the image sequence
 * driven by total page scroll progress via GSAP ScrollTrigger.
 *
 * Key decisions for smooth playback:
 * - NO `snap` — allows fractional frame interpolation, Math.round only at render time
 * - `scrub: true` — instant response to scroll (no smoothing delay)
 * - `ease: "none"` — linear mapping of scroll to frame index
 */
export default function ScrollCanvas({ images, isLoaded }: ScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { renderFrame } = useCanvasRenderer(canvasRef, images);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Render the first frame as soon as images are loaded
  useEffect(() => {
    if (isLoaded && images.length > 0) {
      renderFrame(0);
    }
  }, [isLoaded, images, renderFrame]);

  // Set up GSAP ScrollTrigger to drive frame index
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    // Small delay to ensure DOM is fully measured
    const timer = setTimeout(() => {
      const frameObj = { frame: 0 };

      tweenRef.current = gsap.to(frameObj, {
        frame: TOTAL_FRAMES - 1,
        ease: "none",
        // NO snap — smooth fractional tracking, round only at render
        scrollTrigger: {
          trigger: "#scroll-content",
          start: "top top",
          end: "bottom bottom",
          scrub: true, // Instant response — no smoothing delay
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          renderFrame(Math.round(frameObj.frame));
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (tweenRef.current) {
        tweenRef.current.scrollTrigger?.kill();
        tweenRef.current.kill();
      }
    };
  }, [isLoaded, images, renderFrame]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
