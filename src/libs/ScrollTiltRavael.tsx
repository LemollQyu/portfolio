"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Rotasi awal (derajat). Positif = searah jarum jam */
  startRotate?: number;
  /** Geser vertikal awal (px) */
  startY?: number;
  /** Skala awal */
  startScale?: number;
  /** Progress kapan animasi mulai (0-1). 0 = elemen baru masuk dari bawah layar */
  from?: number;
  /** Progress kapan animasi selesai/rata (0-1). */
  to?: number;
};

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
// easeOutCubic biar "mendarat" halus
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export default function ScrollTiltReveal({
  children,
  className = "",
  startRotate = 8,
  startY = 160,
  startScale = 0.94,
  from = 0,
  to = 0.6,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      inner.style.transform = "none";
      return;
    }

    const update = () => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;

      // 0 saat top elemen di bawah layar, 1 saat top elemen sudah naik jauh
      const raw = (vh - rect.top) / (vh + rect.height * 0.3);
      const p = clamp((raw - from) / (to - from));
      const e = ease(p);

      const rotate = startRotate * (1 - e);
      const y = startY * (1 - e);
      const scale = startScale + (1 - startScale) * e;

      inner.style.transform = `translate3d(0, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
    };

    update();

    // Pakai Lenis kalau ada, kalau tidak fallback ke scroll biasa
    const lenis = (window as any).lenis;
    if (lenis?.on) {
      lenis.on("scroll", update);
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      if (lenis?.off) lenis.off("scroll", update);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [startRotate, startY, startScale, from, to]);

  return (
    <div ref={wrapRef} className={className}>
      <div
        ref={innerRef}
        className="will-change-transform"
        style={{
          transformOrigin: "50% 100%",
          transform: `translate3d(0, ${startY}px, 0) rotate(${startRotate}deg) scale(${startScale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
