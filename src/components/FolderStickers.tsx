"use client";

import { useState } from "react";

const BASE = "/asset";

const CSS = `
.fs-root {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  container-type: inline-size; /* semua ukuran pakai cqw -> ikut mengecil bersama komponen */
  display: block;
  padding: 0; border: 0; background: none;
  cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><circle cx='10' cy='10' r='7' fill='%231033b8'/></svg>") 10 10, pointer;
  -webkit-tap-highlight-color: transparent;
}
.fs-tilt {
  position: absolute; inset: 0;
  transform: rotate(3deg);
  transition: transform .5s cubic-bezier(.34,1.56,.64,1);
}
.fs-layer { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; user-select: none; }
.fs-back  { z-index: 1; }
.fs-front { z-index: 3; transition: transform .45s ease; }

.fs-item {
  position: absolute; z-index: 2; height: auto; pointer-events: none;
  opacity: 0;
  transform: translateY(var(--hide, 40cqw)) scale(.6) rotate(var(--r0, 0deg));
  transform-origin: 50% 100%;
  transition: transform .35s ease-in, opacity .2s ease .1s; /* masuk lagi ke folder */
  filter: drop-shadow(0 .8cqw 1cqw rgba(60,40,15,.25));
}
.fs-vinyl  { left: 22cqw;  top: -26cqw; width: 56cqw; --hide: 58cqw; --r0: -20deg; --r: -6deg; --d: .04s; z-index: 2; }
.fs-ipad   { left: -18cqw; top: -4cqw;  width: 54cqw; --hide: 36cqw; --r0: -10deg; --r: -8deg; --d: 0s;   z-index: 3; }
.fs-laptop { left: 42cqw;  top: -18cqw; width: 60cqw; --hide: 50cqw; --r0: 10deg;  --r: 6deg;  --d: .1s;  z-index: 3; }

/* vinyl berputar pelan saat keluar */
.fs-vinyl img { display: block; width: 100%; height: auto; }
@keyframes fs-spin { to { transform: rotate(360deg); } }

/* terbuka: hover (perangkat mouse) atau di-tap (layar sentuh) */
.fs-root[data-open="true"] .fs-tilt { transform: rotate(2deg) translateY(1cqw); }
.fs-root[data-open="true"] .fs-front { transform: translateY(1.2cqw); }
.fs-root[data-open="true"] .fs-item {
  opacity: 1;
  transform: translateY(0) scale(1) rotate(var(--r));
  transition: transform .6s cubic-bezier(.34,1.56,.64,1) var(--d), opacity .2s ease var(--d);
}
.fs-root[data-open="true"] .fs-vinyl img { animation: fs-spin 8s linear infinite .6s; }
@media (hover: hover) {
  .fs-root:hover .fs-vinyl img { animation: fs-spin 8s linear infinite .6s; }
  .fs-root:hover .fs-tilt { transform: rotate(2deg) translateY(1cqw); }
  .fs-root:hover .fs-front { transform: translateY(1.2cqw); }
  .fs-root:hover .fs-item {
    opacity: 1;
    transform: translateY(0) scale(1) rotate(var(--r));
    transition: transform .6s cubic-bezier(.34,1.56,.64,1) var(--d), opacity .2s ease var(--d);
  }
}
@media (prefers-reduced-motion: reduce) {
  .fs-tilt, .fs-front, .fs-item { transition: none !important; }
  .fs-vinyl img { animation: none !important; }
}
`;

type Props = { className?: string };

export default function FolderStickers({ className = "" }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <button
        type="button"
        className={`fs-root ${className}`}
        data-open={open}
        aria-expanded={open}
        aria-label="Buka folder"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
      >
        <div className="fs-tilt">
          <img
            src={`${BASE}/mac-folder-back-opt.svg`}
            alt=""
            className="fs-layer fs-back"
            draggable={false}
          />

          <img
            src={`${BASE}/ipad.svg`}
            alt=""
            className="fs-item fs-vinyl"
            draggable={false}
          />
          <div className="fs-item  fs-ipas">
            <img src={`${BASE}/Vinyl.png`} alt="" draggable={false} />
          </div>
          <img
            src={`${BASE}/laptop.svg`}
            alt=""
            className="fs-item fs-laptop"
            draggable={false}
          />

          <img
            src={`${BASE}/mac-folder-front-opt.svg`}
            alt=""
            className="fs-layer fs-front"
            draggable={false}
          />
        </div>
      </button>
    </>
  );
}
