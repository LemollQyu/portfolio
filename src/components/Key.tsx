"use client";

import { useState } from "react";
import TransitionLink from "./TransitionLink";

export type HangingPadlockProps = {
  src?: string;
  alt?: string;
  href?: string;
  width?: number | string; // angka = px, atau string CSS: "clamp(90px, 14vw, 180px)"
  className?: string;
};

export default function HangingPadlock({
  src = "/asset/key.png",
  alt = "Gembok ABUS dengan dua kunci",
  href = "/about",
  width = 260,
  className,
}: HangingPadlockProps) {
  const [swinging, setSwinging] = useState(false);

  return (
    <div className={`hp-root ${className ?? ""}`} style={{ width }}>
      <style>{`
        .hp-swing {
          display: block;
          transform-origin: 55% 5%;
        }
        .hp-swing.is-swinging {
          animation: hp-swing 1.8s cubic-bezier(0.3, 0.1, 0.3, 1) 1;
        }
        .hp-img {
          display: block;
          width: 100%;
          height: auto;
          user-select: none;
          -webkit-user-drag: none;
          filter: drop-shadow(0 10px 14px rgba(0, 0, 0, 0.25));
        }
        /* ayunan meredam: besar -> kecil -> berhenti */
        @keyframes hp-swing {
          0%   { transform: rotate(0deg); }
          15%  { transform: rotate(9deg); }
          32%  { transform: rotate(-7deg); }
          48%  { transform: rotate(5deg); }
          63%  { transform: rotate(-3deg); }
          78%  { transform: rotate(1.5deg); }
          90%  { transform: rotate(-0.6deg); }
          100% { transform: rotate(0deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hp-swing.is-swinging { animation: none; }
        }
      `}</style>

      <TransitionLink
        href={href}
        className={`hp-swing ${swinging ? "is-swinging" : ""}`}
        draggable={false}
        aria-label={`${alt}, buka halaman ${href}`}
        onMouseEnter={() => setSwinging(true)}
        onFocus={() => setSwinging(true)}
        onAnimationEnd={() => setSwinging(false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} draggable={false} className="hp-img" />
      </TransitionLink>
    </div>
  );
}
