"use client";

import { useEffect, useRef } from "react";

const SRC = "/cursor-lily.webp";
const W = 44;
const H = 59;
const TRAIL = 7;

// makin besar = makin responsif; makin kecil = makin halus/lambat
const HEAD_FOLLOW = 28; // kepala hampir menempel mouse tapi tetap halus
const GHOST_FOLLOW = 16; // bayangan mengejar bayangan sebelumnya

// lerp tak bergantung frame rate
const damp = (follow: number, dt: number) => 1 - Math.exp(-follow * dt);

export default function CursorTrail() {
  const headRef = useRef<HTMLDivElement>(null);
  const ghostRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const mouse = { x: -200, y: -200 };
    const head = { x: -200, y: -200 };
    const ghosts = Array.from({ length: TRAIL }, () => ({ x: -200, y: -200 }));

    let speed = 0;
    let scale = 1;
    let targetScale = 1;
    let first = true;
    let raf = 0;
    let prev = performance.now();

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (first) {
        head.x = mouse.x;
        head.y = mouse.y;
        ghosts.forEach((g) => {
          g.x = mouse.x;
          g.y = mouse.y;
        });
        first = false;
      }
    };

    const onOver = (e: PointerEvent) => {
      const el = e.target as Element | null;
      targetScale = el?.closest("a, button, [role='button']") ? 1.4 : 1;
    };

    const tick = (now: number) => {
      // dt dalam detik, dibatasi supaya tidak loncat saat tab di-background
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;

      // kepala mengejar mouse
      const hx = head.x;
      const hy = head.y;
      const a = damp(HEAD_FOLLOW, dt);
      head.x += (mouse.x - head.x) * a;
      head.y += (mouse.y - head.y) * a;

      // kecepatan kepala (bukan mouse mentah) -> lebih stabil
      const v = Math.hypot(head.x - hx, head.y - hy) / Math.max(dt * 60, 0.001);
      speed += (v - speed) * damp(10, dt);
      const k = Math.min(speed / 14, 1);

      scale += (targetScale - scale) * damp(12, dt);

      if (headRef.current) {
        headRef.current.style.transform = `translate3d(${head.x - W / 2}px, ${
          head.y - H / 2
        }px, 0) scale(${scale})`;
      }

      // tiap bayangan mengejar yang di depannya
      const g = damp(GHOST_FOLLOW, dt);
      let tx = head.x;
      let ty = head.y;
      for (let i = 0; i < TRAIL; i++) {
        const p = ghosts[i];
        p.x += (tx - p.x) * g;
        p.y += (ty - p.y) * g;
        tx = p.x;
        ty = p.y;

        const el = ghostRefs.current[i];
        if (!el) continue;
        const s = scale * (1 - i * 0.025);
        el.style.transform = `translate3d(${p.x - W / 2}px, ${
          p.y - H / 2
        }px, 0) scale(${s})`;
        el.style.opacity = String(k * (1 - i / TRAIL) * 0.65);
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  const base: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: W,
    height: H,
    pointerEvents: "none",
    willChange: "transform, opacity",
    transform: "translate3d(-200px,-200px,0)",
    contain: "layout paint size",
  };

  return (
    <div className="cursor-trail" aria-hidden="true">
      {Array.from({ length: TRAIL }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            ghostRefs.current[i] = el;
          }}
          style={{ ...base, zIndex: 9998, opacity: 0 }}
        >
          {/* filter ada di anak statis, jadi tidak dihitung ulang saat transform berubah */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SRC}
            alt=""
            draggable={false}
            width={W}
            height={H}
            style={{
              display: "block",
              filter:
                "brightness(0.28) saturate(1.6) drop-shadow(0 0 6px rgba(140,0,0,0.9))",
            }}
          />
        </div>
      ))}
      <div ref={headRef} style={{ ...base, zIndex: 9999 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SRC}
          alt=""
          draggable={false}
          width={W}
          height={H}
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
}
