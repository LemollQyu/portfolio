"use client";

import { useEffect, useRef, useState } from "react";
import TransitionLink from "./TransitionLink";

const bar =
  "fixed top-2 bottom-2 md:top-3 md:bottom-3 z-[100] flex w-[14px] md:w-[18px] flex-col items-center justify-between py-1.5 md:py-2 font-mono text-[8px] md:text-[10px] uppercase tracking-[0.06em] text-white/70 bg-[#292524] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.07)_2px,rgba(255,255,255,0.07)_3px)] shadow-[0_1px_2px_rgba(0,0,0,0.25)]"; // style sidebar
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
    `${vertical} ${up} cursor-pointer rounded-full border px-px py-px md:px-px uppercase ${
      active ? "border-[#eee]" : "border-transparent"
    } ${
      strikeInactive && !active ? "line-through decoration-1 opacity-60" : ""
    }`;

  return (
    <div className="flex flex-col-reverse items-center gap-0.5 md:gap-1">
      <span
        className={`${vertical} ${up} ${
          strikeInactive && !value ? "line-through decoration-1 opacity-60" : ""
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
  const [sound, setSound] = useState(false);
  const [mode, setMode] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/instrumen.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
      delete document.documentElement.dataset.sound;
    };
  }, []);

  const handleSound = (v: boolean) => {
    setSound(v);
    const audio = audioRef.current;
    if (!audio) return;

    if (v) {
      audio
        .play()
        .then(() => {
          document.documentElement.dataset.sound = "on";
        })
        .catch(() => {
          setSound(false);
          document.documentElement.dataset.sound = "off";
        });
    } else {
      audio.pause();
      document.documentElement.dataset.sound = "off";
    }
  };

  return (
    <>
      {/* KIRI */}
      <aside className={`${bar} font-synt left-2 md:left-3`} aria-label="Info">
        <TransitionLink href="/" className={vertical}>
          ▸ ANNAS AULIA RAHMAN
        </TransitionLink>

        <div
          aria-hidden="true"
          className="my-2 md:my-3 w-[40%] flex-1 self-start bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_21px,rgba(255,255,255,0.18)_21px,rgba(255,255,255,0.18)_22px)] md:bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_27px,rgba(255,255,255,0.18)_27px,rgba(255,255,255,0.18)_28px)]"
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

        <Toggle label="Sound:" value={sound} onChange={handleSound} />
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
