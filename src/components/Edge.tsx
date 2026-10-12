"use client";

import { useEffect, useRef, useState } from "react";

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const ease = (t: number) => t * t * (3 - 2 * t); // smoothstep

export default function Edge({
  color,
  cols = 8,
  max = 240,
  smooth = 0.1,
  range, // px jarak scroll sampai balok penuh (default: 70% tinggi layar)
}: {
  color: string;
  cols?: number;
  max?: number;
  smooth?: number;
  range?: number;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<{ flex: number; h: number; d: number }[]>(
    [],
  );

  // diacak setelah mount (hindari hydration mismatch)
  useEffect(() => {
    setItems(
      Array.from({ length: cols }, () => ({
        flex: 1 + Math.random() * 2,
        h: 0.3 + Math.random() * 0.7,
        d: Math.random() * 0.5,
      })),
    );
  }, [cols]);

  useEffect(() => {
    const el = wrap.current;
    if (!el || !items.length) return;
    const kids = Array.from(el.children) as HTMLElement[];
    const current = items.map(() => 0);
    let raf = 0;

    const target = (i: number) => {
      const vh = window.innerHeight;
      const b = el.getBoundingClientRect().bottom; // = tepi atas section
      //   const up = clamp((vh - b) / (vh * 0.7));
      const up = clamp((vh - b) / (range ?? vh * 0.7));
      const down = clamp(b / (vh * 0.3));
      const col = ease(clamp(up * 1.5 - items[i].d));
      return items[i].h * max * col * ease(down);
    };

    const tick = () => {
      let moving = false;
      kids.forEach((k, i) => {
        const t = target(i);
        const diff = t - current[i];
        if (Math.abs(diff) > 0.3) {
          current[i] += diff * smooth;
          moving = true;
        } else {
          current[i] = t;
        }
        k.style.height = `${current[i].toFixed(2)}px`;
      });
      raf = moving ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    start();
    window.addEventListener("scroll", start, { passive: true });
    window.addEventListener("resize", start);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", start);
      window.removeEventListener("resize", start);
    };
  }, [items, max, smooth, range]);

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-full flex items-end"
      style={{ height: max }}
    >
      {items.map((it, i) => (
        <i
          key={i}
          className="block"
          style={{ flex: it.flex, background: color }}
        />
      ))}
    </div>
  );
}
