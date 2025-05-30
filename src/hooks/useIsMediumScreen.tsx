"use client"
import { useState, useEffect } from "react";
const MEDIUM_BREAKPOINT = 1024; // Common breakpoint for iPad portrait/medium devices

export function useIsMediumScreen() {
  const [isMedium, setIsMedium] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return; // Safeguard for SSR

    const mediaQuery = window.matchMedia(`(max-width: ${MEDIUM_BREAKPOINT}px)`);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMedium(e.matches);
    };

    // Initial check
    setIsMedium(mediaQuery.matches);

    // Modern event listener with type safety
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMedium;
}
