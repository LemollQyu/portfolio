"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Pasang <SmoothScroll /> di halaman yang butuh smooth scroll saja.
// Saat pindah halaman, komponen ini unmount dan Lenis otomatis dimatikan.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2, // makin besar makin "licin"
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy(); // hapus class .lenis dari <html> juga
    };
  }, []);

  return null;
}
