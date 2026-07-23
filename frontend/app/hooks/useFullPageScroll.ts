"use client";

import { useEffect, useRef } from "react";

export function useFullPageScroll(isLoaded: boolean) {
  const isAnimating = useRef(false);
  const currentIndex = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    // Only enable when the initial loading is complete
    if (!isLoaded) return;

    const sections = document.querySelectorAll(".snap-section");
    if (sections.length === 0) return;

    // Determine starting index based on current scroll position
    const currentScroll = window.scrollY;
    let closestIndex = 0;
    let minDiff = Infinity;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const absoluteTop = rect.top + currentScroll;
      const diff = Math.abs(currentScroll - absoluteTop);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });

    currentIndex.current = closestIndex;

    const gotoSection = (index: number) => {
      // Prevent multiple animations overlapping and out-of-bounds scrolling
      if (isAnimating.current || index < 0 || index >= sections.length) return;

      isAnimating.current = true;
      currentIndex.current = index;

      const targetSection = sections[index] as HTMLElement;
      const targetY = targetSection.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });

      // Cooldown to prevent trackpad inertia and wait for smooth scroll to finish
      setTimeout(() => {
        isAnimating.current = false;
      }, 1000);
    };

    // Native wheel handling
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isAnimating.current) return;
      if (Math.abs(e.deltaY) < 5) return; // filter out tiny noise

      if (e.deltaY > 0) {
        gotoSection(currentIndex.current + 1);
      } else {
        gotoSection(currentIndex.current - 1);
      }
    };

    // Native touch handling
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // Prevent native scroll
      if (isAnimating.current) return;

      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY.current - touchEndY;

      if (Math.abs(diff) > 30) {
        if (diff > 0) {
          gotoSection(currentIndex.current + 1);
        } else {
          gotoSection(currentIndex.current - 1);
        }
      }
    };

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        gotoSection(currentIndex.current + 1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        gotoSection(currentIndex.current - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLoaded]);
}
