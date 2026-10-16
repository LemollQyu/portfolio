"use client";

import { useState } from "react";

const CSS = `
.cs-root {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 444 / 262;
  container-type: inline-size; /* ukuran efek ikut lebar komponen */
  padding: 0; border: 0; background: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

/* bayangan di meja: mengecil & memudar saat kamera terangkat */
.cs-ground {
  position: absolute; left: 12%; right: 12%; bottom: -4%;
  height: 10%;
  border-radius: 50%;
  background: rgba(60,40,15,.28);
  filter: blur(1.2cqw);
  transition: transform .45s ease, opacity .45s ease;
}

.cs-lift {
  position: absolute; inset: 0;
  transform: rotate(-4deg);
  transition: transform .45s cubic-bezier(.34,1.56,.64,1);
}
.cs-img {
  display: block; width: 100%; height: auto;
  filter: drop-shadow(0 1.2cqw 1.4cqw rgba(60,40,15,.3));
  user-select: none; pointer-events: none;
}

/* kilau flash di lensa */
.cs-flash {
  position: absolute; left: 41%; top: 65%;
  width: 70%; aspect-ratio: 1;
  transform: translate(-50%, -50%) scale(.2);
  opacity: 0; pointer-events: none;
  background:
    linear-gradient(to right, transparent 5%, rgba(255,255,255,.95) 50%, transparent 95%) center / 100% 2px no-repeat,
    linear-gradient(to bottom, transparent 5%, rgba(255,255,255,.95) 50%, transparent 95%) center / 2px 100% no-repeat,
    radial-gradient(circle, #fff 0, rgba(255,255,255,.85) 14%, rgba(255,240,190,.45) 34%, transparent 62%);
}

@keyframes cs-flash {
  0%   { opacity: 0; transform: translate(-50%, -50%) scale(.2); }
  22%  { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
}
@keyframes cs-click {
  0%, 100% { transform: scale(1); }
  35%      { transform: scale(.93) translateY(1%); }
  65%      { transform: scale(1.03); }
}

/* aktif: hover (mouse) atau tap (layar sentuh) */
.cs-root[data-on="true"] .cs-lift { transform: translateY(-3cqw) rotate(1deg) scale(1.05); }
.cs-root[data-on="true"] .cs-ground { transform: scale(.8); opacity: .6; }
.cs-root[data-on="true"] .cs-img { animation: cs-click .35s ease-out .3s; }
.cs-root[data-on="true"] .cs-flash { animation: cs-flash .55s ease-out .34s both; }

@media (hover: hover) {
  .cs-root:hover .cs-lift { transform: translateY(-3cqw) rotate(1deg) scale(1.05); }
  .cs-root:hover .cs-ground { transform: scale(.8); opacity: .6; }
  .cs-root:hover .cs-img { animation: cs-click .35s ease-out .3s; }
  .cs-root:hover .cs-flash { animation: cs-flash .55s ease-out .34s both; }
}

@media (prefers-reduced-motion: reduce) {
  .cs-lift, .cs-ground { transition: none; }
  .cs-img, .cs-flash { animation: none !important; }
}
`;

type Props = { className?: string };

export default function CameraSticker({ className = "" }: Props) {
  const [on, setOn] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <button
        type="button"
        className={`cs-root ${className}`}
        data-on={on}
        aria-label="Kamera"
        onClick={() => setOn((v) => !v)}
        onBlur={() => setOn(false)}
      >
        <span className="cs-ground" aria-hidden="true" />
        <span className="cs-lift">
          <img
            src="asset/cam.webp"
            alt=""
            className="cs-img"
            draggable={false}
          />
          <span className="cs-flash" aria-hidden="true" />
        </span>
      </button>
    </>
  );
}
