"use client";

import { useEffect, useRef } from "react";

const SRC = "/cursor-lily.png";
const W = 44; // lebar cursor (px)
const H = 59; // tinggi cursor (px), rasio gambar 140:200
const TRAIL = 7; // jumlah bayangan
const GAP = 1; // jarak antar bayangan (dalam frame), makin besar makin panjang jejaknya

export default function CursorTrail() {
  const headRef = useRef<HTMLImageElement>(null);
  const ghostRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    // jangan aktif di layar sentuh
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const mouse = { x: -200, y: -200 };
    const history = Array.from({ length: TRAIL * GAP + 1 }, () => ({
      x: -200,
      y: -200,
    }));
    let last = { x: -200, y: -200 };
    let speed = 0;
    let scale = 1;
    let targetScale = 1;
    let first = true;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (first) {
        history.forEach((p) => {
          p.x = mouse.x;
          p.y = mouse.y;
        });
        last = { ...mouse };
        first = false;
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      targetScale = el.closest("a, button, [role='button']") ? 1.4 : 1;
    };

    const tick = () => {
      // kecepatan mouse (di-smooth) -> menentukan seberapa terlihat bayangannya
      const v = Math.hypot(mouse.x - last.x, mouse.y - last.y);
      speed = speed * 0.8 + v * 0.2;
      last = { x: mouse.x, y: mouse.y };

      history.unshift({ x: mouse.x, y: mouse.y });
      history.pop();

      const k = Math.min(speed / 14, 1); // 0 = diam, 1 = ngebut
      scale += (targetScale - scale) * 0.2;

      if (headRef.current) {
        headRef.current.style.transform = `translate3d(${mouse.x - W / 2}px, ${
          mouse.y - H / 2
        }px, 0) scale(${scale})`;
      }

      ghostRefs.current.forEach((el, i) => {
        if (!el) return;
        const p = history[(i + 1) * GAP];
        const s = scale * (1 - i * 0.025);
        el.style.transform = `translate3d(${p.x - W / 2}px, ${
          p.y - H / 2
        }px, 0) scale(${s})`;
        el.style.opacity = String(k * (1 - i / TRAIL) * 0.65);
      });

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
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
  };

  return (
    <div className="cursor-trail" aria-hidden="true">
      {Array.from({ length: TRAIL }).map((_, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          ref={(el) => {
            ghostRefs.current[i] = el;
          }}
          src={SRC}
          alt=""
          draggable={false}
          style={{
            ...base,
            zIndex: 9998,
            opacity: 0,
            // merah kehitaman + glow merah tua
            filter:
              "brightness(0.28) saturate(1.6) drop-shadow(0 0 6px rgba(140,0,0,0.9)) blur(0.5px)",
          }}
        />
      ))}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={headRef}
        src={SRC}
        alt=""
        draggable={false}
        style={{ ...base, zIndex: 9999 }}
      />
    </div>
  );
}
