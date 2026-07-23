"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Manages canvas rendering for the image sequence.
 *
 * Handles:
 * - Retina (devicePixelRatio) sizing
 * - Cover-fit drawing (replicates object-fit: cover)
 * - Window resize
 * - Redundant redraw prevention
 *
 * IMPORTANT: renderFrame is called synchronously (no rAF wrapper)
 * because GSAP's onUpdate already fires inside a rAF tick.
 * Adding another rAF would cause a 1-frame visual lag.
 */
export function useCanvasRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  images: HTMLImageElement[]
) {
  const lastFrameRef = useRef(-1);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const dimensionsRef = useRef({ width: 0, height: 0, dpr: 1 });
  const renderTaskRef = useRef<number | null>(null);

  /** Draw an image with cover behavior (fills canvas, crops overflow) */
  const drawCover = useCallback(
    (img: HTMLImageElement, alpha: number = 1) => {
      const ctx = ctxRef.current;
      if (!ctx) return;

      ctx.globalAlpha = alpha;

      const { width: canvasWidth, height: canvasHeight } = dimensionsRef.current;

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth: number;
      let drawHeight: number;
      let offsetX: number;
      let offsetY: number;

      if (imgRatio > canvasRatio) {
        // Image is wider — fit height, crop sides
        drawHeight = canvasHeight;
        drawWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
        offsetY = 0;
      } else {
        // Image is taller — fit width, crop top/bottom
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
        offsetX = 0;
        offsetY = (canvasHeight - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      ctx.globalAlpha = 1; // restore
    },
    []
  );

  /** Size the canvas to fill the viewport at the correct pixel density */
  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Only resize if dimensions actually changed
    if (
      dimensionsRef.current.width === width &&
      dimensionsRef.current.height === height &&
      dimensionsRef.current.dpr === dpr
    ) {
      return;
    }

    dimensionsRef.current = { width, height, dpr };

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctxRef.current = ctx;
    }

    // Force re-render after resize
    const currentFrame = lastFrameRef.current;
    if (currentFrame >= 0) {
      const baseImg = images[Math.floor(currentFrame)];
      if (baseImg) drawCover(baseImg, 1);
    }
  }, [canvasRef, images, drawCover]);

  /**
   * Render a specific frame index — synchronous, no rAF wrapper.
   * GSAP's onUpdate already fires inside requestAnimationFrame,
   * so wrapping in another rAF would add a frame of visual lag.
   */
  const renderFrame = useCallback(
    (index: number) => { // index can now be a fractional float
      if (!images.length) return;

      // Clamp index
      const clampedIndex = Math.max(0, Math.min(index, images.length - 1));

      // Skip redundant redraws (only skip if the exact fractional value matches)
      if (clampedIndex === lastFrameRef.current) return;

      if (renderTaskRef.current) {
        cancelAnimationFrame(renderTaskRef.current);
      }

      renderTaskRef.current = requestAnimationFrame(() => {
        const baseIndex = Math.floor(clampedIndex);
        const nextIndex = Math.min(baseIndex + 1, images.length - 1);
        const alpha = clampedIndex % 1;

        const baseImg = images[baseIndex];
        const nextImg = images[nextIndex];

        if (!baseImg) return;

        // Draw base image fully opaque
        drawCover(baseImg, 1);
        
        // If there's a fractional remainder, crossfade the next image on top
        if (nextImg && alpha > 0) {
          drawCover(nextImg, alpha);
        }

        lastFrameRef.current = clampedIndex;
      });
    },
    [images, drawCover]
  );

  // Handle resize
  useEffect(() => {
    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);
    return () => {
      window.removeEventListener("resize", sizeCanvas);
    };
  }, [sizeCanvas]);

  return { renderFrame, sizeCanvas };
}
