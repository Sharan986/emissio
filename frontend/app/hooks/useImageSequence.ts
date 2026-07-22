"use client";

import { useState, useEffect, useRef } from "react";
import { preloadFrames, TOTAL_FRAMES } from "@/app/lib/preloadFrames";

/**
 * Manages the frame preloading lifecycle.
 * Returns the loaded images array, progress percentage, and loaded status.
 */
export function useImageSequence() {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const loadingRef = useRef(false);

  useEffect(() => {
    // Prevent double-loading in React StrictMode
    if (loadingRef.current) return;
    loadingRef.current = true;

    preloadFrames({
      onProgress: (p) => setProgress(p),
    }).then((loadedImages) => {
      setImages(loadedImages);
      setIsLoaded(true);
    });
  }, []);

  return { images, progress, isLoaded, totalFrames: TOTAL_FRAMES };
}
