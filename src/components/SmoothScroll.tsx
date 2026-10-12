"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-speed]"),
    );

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      const vh = window.innerHeight;
      for (const el of els) {
        const speed = parseFloat(el.dataset.speed || "0");
        const p = el.parentElement!.getBoundingClientRect();
        const offset = p.top + p.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
