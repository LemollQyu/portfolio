"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Foto dengan efek "serpihan": objek orang pecah jadi partikel saat digesek mouse,
 * lalu perlahan menyatu lagi.
 *
 * Butuh 2 gambar dengan framing yang sama (ukuran boleh beda, rasio harus sama):
 *  - /photo/bg.webp      -> foto TANPA orang (latar)
 *  - /photo/person.webp  -> cutout orang (WebP/PNG transparan)
 *
 * Partikel digambar di canvas layar penuh (fixed, lewat portal ke <body>),
 * jadi bebas terbang ke mana pun, tidak terpotong kotak foto maupun parent-nya,
 * dan tetap ikut bergerak mengikuti foto saat parallax / smooth scroll.
 */

// ---- efek ----
const RADIUS = 46; // radius sapuan mouse (css px)
const STEP = 1.5; // ukuran sel partikel (css px). Makin kecil = makin halus, makin berat
const PUSH = 0.55; // seberapa kuat serpihan terbawa arah gesekan
const SCATTER = 1.6; // seberapa acak serpihan menyebar
const HOLD = 1400; // ms serpihan melayang sebelum mulai kembali
const RETURN = 0.012; // kekuatan tarikan balik (0 = tidak pernah kembali / permanen)
const DAMP = 0.93; // gesekan udara (0..1), makin kecil makin cepat berhenti

type P = {
  hx: number; // posisi asal, relatif ke pojok kiri-atas kotak foto (device px)
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  away: boolean;
  wake: number;
};

/**
 * Props:
 *  - label     : teks alt/aria
 *  - className : ukuran kotak, mis. "w-[min(70vw,300px)]"
 *  - bg/person : path gambar latar (tanpa orang) dan cutout orang
 *  - aspect    : lebar / tinggi kotak (gambar di-"cover" ke kotak ini)
 *  - focusX/Y  : bagian gambar yang dipertahankan saat dipotong (0 = kiri/atas, 1 = kanan/bawah)
 *  - lift      : 0..1, terangkan warna serpihan. Pakai ~0.6 kalau latar halaman GELAP,
 *                supaya serpihan hitam/biru tua tetap terlihat saat keluar dari kotak
 */
export default function ShatterPhoto2({
  label,
  className = "w-[min(70vw,300px)]",
  bg = "/photo/bg2.webp",
  person = "/photo/person2.webp",
  aspect = 3 / 4,
  focusX = 0.5,
  focusY = 0.8,
  lift = 0,
}: {
  label: string;
  className?: string;
  bg?: string;
  person?: string;
  aspect?: number;
  focusX?: number;
  focusY?: number;
  lift?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLCanvasElement>(null); // orang utuh (dilubangi saat pecah)
  const fxRef = useRef<HTMLCanvasElement>(null); // serpihan, layar penuh
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setHost(document.body);
  }, []);

  useEffect(() => {
    if (!host) return;
    const wrap = wrapRef.current!;
    const base = baseRef.current!;
    const fx = fxRef.current!;
    const bctx = base.getContext("2d")!;
    const fctx = fx.getContext("2d")!;

    let particles: P[] = [];
    let img: HTMLImageElement | null = null;
    let dpr = 1;
    let step = 2;
    let cw = 0; // ukuran kotak foto (device px)
    let ch = 0;
    let vw = 0; // ukuran canvas layar penuh (device px)
    let vh = 0;
    let src = { sx: 0, sy: 0, k: 1 };
    let raf = 0;
    let running = false;
    let active = 0;
    let lastX = 0;
    let lastY = 0;
    let hasLast = false;
    let disposed = false;

    fx.style.transition = "filter 700ms";
    fx.style.filter = "grayscale(1)";

    const sizeFx = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      vw = Math.round(window.innerWidth * dpr);
      vh = Math.round(window.innerHeight * dpr);
      fx.width = vw;
      fx.height = vh;
      fx.style.width = window.innerWidth + "px";
      fx.style.height = window.innerHeight + "px";
    };

    const loadImg = () =>
      new Promise<HTMLImageElement>((res, rej) => {
        const i = new window.Image();
        i.onload = () => res(i);
        i.onerror = () => {
          console.error("[ShatterPhoto] gagal memuat gambar orang:", person);
          rej(new Error("load failed"));
        };
        i.src = person;
      });

    const build = () => {
      if (!img) return;
      sizeFx();
      const rect = wrap.getBoundingClientRect();
      cw = Math.round(rect.width * dpr);
      ch = Math.round(rect.height * dpr);
      if (!cw || !ch) return;
      base.width = cw;
      base.height = ch;
      step = Math.max(2, Math.round(STEP * dpr));

      // "cover": isi kotak penuh, potong sisanya sesuai FOCUS
      const boxAspect = cw / ch;
      const imgAspect = img.width / img.height;
      let sw: number, sh: number;
      if (imgAspect < boxAspect) {
        sw = img.width;
        sh = img.width / boxAspect;
      } else {
        sh = img.height;
        sw = img.height * boxAspect;
      }
      const sx = (img.width - sw) * focusX;
      const sy = (img.height - sh) * focusY;
      src = { sx, sy, k: sw / cw };

      bctx.clearRect(0, 0, cw, ch);
      bctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);

      const off = document.createElement("canvas");
      off.width = cw;
      off.height = ch;
      const octx = off.getContext("2d", { willReadFrequently: true })!;
      octx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
      const data = octx.getImageData(0, 0, cw, ch).data;

      const list: P[] = [];
      for (let y = 0; y < ch - step; y += step) {
        for (let x = 0; x < cw - step; x += step) {
          const i = ((y + (step >> 1)) * cw + x + (step >> 1)) * 4;
          if (data[i + 3] < 60) continue;
          list.push({
            hx: x,
            hy: y,
            x,
            y,
            vx: 0,
            vy: 0,
            size: step,
            color: `rgb(${Math.round(data[i] * (1 - lift) + 215 * lift)},${Math.round(data[i + 1] * (1 - lift) + 215 * lift)},${Math.round(data[i + 2] * (1 - lift) + 215 * lift)})`,
            away: false,
            wake: 0,
          });
        }
      }
      if (list.length === 0) {
        console.warn(
          "[ShatterPhoto] tidak ada piksel orang yang terbaca. Cek transparansi:",
          person,
        );
      }
      particles = list;
      active = 0;
      fctx.clearRect(0, 0, vw, vh);
    };

    const sweep = (
      x: number,
      y: number,
      mvx: number,
      mvy: number,
      now: number,
    ) => {
      const R = RADIUS * dpr;
      const R2 = R * R;
      for (let k = 0; k < particles.length; k++) {
        const p = particles[k];
        const dx = p.x - x;
        const dy = p.y - y;
        const d2 = dx * dx + dy * dy;
        if (d2 > R2) continue;
        const dist = Math.sqrt(d2) || 1;
        const f = 1 - dist / R;
        const power = f * f + 0.15;
        const rnd = 0.4 + Math.random() * 0.9;

        p.vx +=
          mvx * PUSH * power * rnd +
          (Math.random() - 0.5) * SCATTER * dpr * power * 3;
        p.vy +=
          mvy * PUSH * power * rnd +
          (Math.random() - 0.5) * SCATTER * dpr * power * 3;
        p.vx += (dx / dist) * power * 1.2 * dpr * Math.random();
        p.vy += (dy / dist) * power * 1.2 * dpr * Math.random();

        p.wake = now + HOLD * (0.5 + Math.random());

        if (!p.away) {
          p.away = true;
          active++;
          bctx.clearRect(p.hx - 1, p.hy - 1, step + 2, step + 2);
        }
      }
    };

    const tick = (now: number) => {
      fctx.clearRect(0, 0, vw, vh);

      if (active > 0) {
        // posisi kotak foto di layar saat ini (ikut parallax / scroll)
        const rect = wrap.getBoundingClientRect();
        const ox = rect.left * dpr;
        const oy = rect.top * dpr;

        for (let k = 0; k < particles.length; k++) {
          const p = particles[k];
          if (!p.away) continue;

          if (RETURN > 0 && now > p.wake) {
            p.vx += (p.hx - p.x) * RETURN;
            p.vy += (p.hy - p.y) * RETURN;
          }
          p.vx += (Math.random() - 0.5) * 0.08 * dpr;
          p.vy += (Math.random() - 0.5) * 0.08 * dpr;
          p.vx *= DAMP;
          p.vy *= DAMP;
          p.x += p.vx;
          p.y += p.vy;

          if (
            RETURN > 0 &&
            now > p.wake &&
            Math.abs(p.hx - p.x) < 0.8 &&
            Math.abs(p.hy - p.y) < 0.8 &&
            Math.abs(p.vx) < 0.15 &&
            Math.abs(p.vy) < 0.15
          ) {
            p.away = false;
            p.x = p.hx;
            p.y = p.hy;
            p.vx = p.vy = 0;
            active--;
            if (img) {
              bctx.drawImage(
                img,
                src.sx + p.hx * src.k,
                src.sy + p.hy * src.k,
                step * src.k,
                step * src.k,
                p.hx,
                p.hy,
                step,
                step,
              );
            }
            continue;
          }

          fctx.fillStyle = p.color;
          fctx.fillRect(ox + p.x, oy + p.y, p.size, p.size);
        }
      }

      if (active > 0) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    // listener di window: sapuan tetap kena walau mouse sedikit di luar kotak
    const onMove = (e: PointerEvent) => {
      if (!cw) return;
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) * dpr;
      const y = (e.clientY - rect.top) * dpr;
      const m = RADIUS * dpr;

      if (active === 0 && (x < -m || x > cw + m || y < -m || y > ch + m)) {
        hasLast = false;
        return;
      }
      if (!hasLast) {
        lastX = x;
        lastY = y;
        hasLast = true;
        return;
      }
      const now = performance.now();
      const mvx = Math.max(-40, Math.min(40, x - lastX));
      const mvy = Math.max(-40, Math.min(40, y - lastY));
      const dist = Math.hypot(x - lastX, y - lastY);
      const n = Math.max(1, Math.ceil(dist / (m / 3)));
      for (let i = 1; i <= n; i++) {
        sweep(
          lastX + ((x - lastX) * i) / n,
          lastY + ((y - lastY) * i) / n,
          mvx / n,
          mvy / n,
          now,
        );
      }
      lastX = x;
      lastY = y;
      if (active > 0) start();
    };

    const onEnter = () => {
      fx.style.filter = "grayscale(0)";
    };
    const onLeave = () => {
      fx.style.filter = "grayscale(1)";
    };
    const onResize = () => build();

    loadImg()
      .then((i) => {
        if (disposed) return;
        img = i;
        build();
      })
      .catch((err) => console.error("[ShatterPhoto]", err));

    const ro = new ResizeObserver(() => build());
    ro.observe(wrap);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", onResize);
    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [host, person, focusX, focusY, lift]);

  return (
    <>
      <div
        ref={wrapRef}
        role="img"
        aria-label={label}
        className={`relative ${className} grayscale transition duration-700 hover:grayscale-0`}
        style={{ aspectRatio: String(aspect), touchAction: "pan-y" }}
      >
        {/* latar: foto tanpa orang, di-cover ke kotak */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bg}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: `${focusX * 100}% ${focusY * 100}%` }}
        />
        {/* orang utuh */}
        <canvas ref={baseRef} className="absolute inset-0 h-full w-full" />
      </div>

      {/* serpihan: canvas layar penuh di luar semua parent, jadi tidak ada yang memotong */}
      {host &&
        createPortal(
          <canvas
            ref={fxRef}
            aria-hidden="true"
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              pointerEvents: "none",
              zIndex: 2147483000,
            }}
          />,
          host,
        )}
    </>
  );
}
