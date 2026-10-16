"use client";

import { useState } from "react";
import TransitionLink from "./TransitionLink";
import "./HangingBadge.css";

export type HangingBadgeProps = {
  name: string;
  tagline?: string; // pakai "\n" untuk baris baru
  strapText?: string;
  initials?: string; // dipakai kalau photo kosong
  photo?: string; // foto statis, contoh: "/card.jpeg"
  hoverPhoto?: string; // GIF yang muncul saat hover/klik, contoh: "/photo/card.gif"
  href?: string; // tujuan saat kartu diklik (selain area gambar)
  className?: string;
};

export default function HangingBadge({
  name,
  tagline,
  strapText,
  initials,
  photo,
  hoverPhoto,
  href = "/about",
  className,
}: HangingBadgeProps) {
  const lines = tagline?.split("\n") ?? [];
  const [active, setActive] = useState(false);

  // Klik gambar: toggle GIF, jangan ikut navigasi ke link
  const handleAvatarClick = (e: React.MouseEvent) => {
    if (!hoverPhoto) return; // tidak ada GIF -> biarkan klik menuju link
    e.preventDefault();
    e.stopPropagation();
    setActive((v) => !v);
  };

  return (
    <div className={`hb-root ${className ?? ""}`}>
      <TransitionLink
        href={href}
        className="hb-swing"
        draggable={false}
        aria-label={`Kartu nama ${name}, buka halaman ${href}`}
      >
        <div className="hb-strap">
          {strapText && (
            <span className="font-feat text-[6px] font-bold uppercase tracking-[0.2em]">
              {strapText}
            </span>
          )}
        </div>
        <div className="hb-clip" />

        <div className="hb-card-wrap">
          <div className="hb-card">
            <div className="hb-gloss" />
            <div className="hb-slot">
              <i />
            </div>

            <div className="hb-inner">
              <div className="hb-head">
                <h3 className="hb-name font-suo text-5xl font-extrabold leading-[1.1] tracking-[0.04em]">
                  {name}
                </h3>
                {lines.length > 0 && (
                  <p className="hb-tag text-[7px] tracking-tight font-synt font-medium leading-normal">
                    {lines.map((l, i) => (
                      <span key={i}>
                        {l}
                        {i < lines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                )}
              </div>

              <div className="hb-photo-area">
                <div
                  className="hb-avatar"
                  onClick={handleAvatarClick}
                  style={hoverPhoto ? { cursor: "pointer" } : undefined}
                >
                  {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photo}
                      alt={name}
                      draggable={false}
                      className={`hb-media ${hoverPhoto ? "hb-still" : ""}`}
                      style={active ? { opacity: 0 } : undefined}
                    />
                  ) : (
                    <span className="text-[42px] font-extrabold tracking-[0.04em]">
                      {initials ?? name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  {hoverPhoto && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={hoverPhoto}
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      className="hb-media hb-hover"
                      style={active ? { opacity: 1 } : undefined}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </TransitionLink>
    </div>
  );
}
