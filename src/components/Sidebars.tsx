"use client";

import { useState } from "react";
import TransitionLink from "./TransitionLink";

const bar =
  "fixed top-2 bottom-2 md:top-3 md:bottom-3 z-[100] flex w-[18px] md:w-[25px] flex-col items-center justify-between py-2 md:py-3 font-mono text-[10px] md:text-[14px] uppercase tracking-[0.06em] text-white/70 bg-[#292524] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.07)_2px,rgba(255,255,255,0.07)_3px)] shadow-[0_1px_2px_rgba(0,0,0,0.25)]"; // style sidebar
const vertical = "[writing-mode:vertical-rl] whitespace-nowrap";
const up = "rotate-180"; // teks terbaca dari bawah ke atas

function Toggle({
  label,
  value,
  onChange,
  strikeInactive = false, // opt-in, default tidak mengubah komponen lain
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  strikeInactive?: boolean;
}) {
  const opt = (active: boolean) =>
    `${vertical} ${up} cursor-pointer rounded-full border px-px py-0.5 md:px-0.5 uppercase ${
      active ? "border-[#eee]" : "border-transparent"
    } ${
      strikeInactive && !active ? "line-through decoration-2 opacity-60" : ""
    }`;

  return (
    <div className="flex flex-col-reverse items-center gap-1 md:gap-1.5">
      <span
        className={`${vertical} ${up} ${
          strikeInactive && !value ? "line-through decoration-2 opacity-60" : ""
        }`}
      >
        {label}
      </span>
      <button className={opt(value)} onClick={() => onChange(true)}>
        On
      </button>
      <span className={`${vertical} ${up} opacity-50`}>|</span>
      <button className={opt(!value)} onClick={() => onChange(false)}>
        Off
      </button>
    </div>
  );
}

export default function SideBars() {
  const [sound, setSound] = useState(true);
  const [mode, setMode] = useState(false);

  return (
    <>
      {/* KIRI */}

      <aside className={`${bar} font-synt left-2 md:left-3`} aria-label="Info">
        <TransitionLink href="/" className={vertical}>
          ▸ ANNAS AULIA RAHMAN
        </TransitionLink>

        <div
          aria-hidden="true"
          className="my-3 md:my-4 w-[40%] flex-1 self-start bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_27px,rgba(255,255,255,0.18)_27px,rgba(255,255,255,0.18)_28px)] md:bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_35px,rgba(255,255,255,0.18)_35px,rgba(255,255,255,0.18)_36px)]"
        />

        <span className={`${vertical} ${up}`}>
          Backend &amp; Frontend Developer
        </span>
      </aside>

      {/* KANAN */}
      <aside
        className={`${bar} font-synt right-2 md:right-3`}
        aria-label="Kontrol"
      >
        <button
          className={`${vertical} cursor-pointer uppercase hover:opacity-70`}
          onClick={() => console.log("menu")}
        >
          Menu
        </button>

        <Toggle label="Sound:" value={sound} onChange={setSound} />
        <Toggle
          label="Dark mode:"
          value={false}
          onChange={setMode}
          strikeInactive
        />
      </aside>
    </>
  );
}
