"use client";

import { useState } from "react";

export type TerminalCardProps = {
  title?: string;
  className?: string;
};

const COMMANDS: { cmd: string; out: string[]; hideOnMobile?: boolean }[] = [
  {
    cmd: "whoami",
    out: ["Informatics Engineering Graduate (S.Kom.) | Fullstack Developer"],
  },
  {
    cmd: "ls interests/",
    out: ["Development/Software_Architecture/AI"],
  },
  {
    cmd: "ls skills/",
    hideOnMobile: true, // hilang di mobile, muncul di md ke atas
    out: [
      "database/mysql/postgresql/redis",
      "database/supabase",
      "javascript/react/next.js",
      "javascript/vue/nuxt.js",
      "javascript/node/bun",
      "golang/gofiber",
      "php/laravel",
      "node.js/express.js",
      "rest_api/microservices",
      "git/linux/docker",
      "tailwind_css/bootstrap",
      "vibecode/claude/gpt",
    ],
  },
];

// Gambar ASCII yang muncul saat hover/klik.
// invert: true untuk gambar background hitam, supaya jadi putih dan menyatu dengan kartu.
const STACK: { src: string; alt: string; invert?: boolean }[] = [
  { src: "/asset/node.gif", alt: "Node.js" },
  { src: "/asset/redis.gif", alt: "Redis" },
  { src: "/asset/database.gif", alt: "Database" },
  { src: "/asset/go.gif", alt: "Go" },
  { src: "/asset/laravel.gif", alt: "Laravel" },
  { src: "/asset/claude.gif", alt: "Claude" },
  { src: "/asset/git.gif", alt: "Git" },
  { src: "/asset/openai.gif", alt: "Openai" },
];

export default function TerminalCard({
  title = "annas — zsh",
  className,
}: TerminalCardProps) {
  const [open, setOpen] = useState(false);
  const [playKey, setPlayKey] = useState(0); // naik tiap kali dibuka, supaya GIF mulai dari awal

  const openCard = () => {
    setPlayKey((k) => k + 1);
    setOpen(true);
  };
  const closeCard = () => setOpen(false);

  return (
    <div className={`w-full font-mono md:w-fit max-w-full ${className ?? ""}`}>
      {/* <style>{`
  .tc-item { mix-blend-mode: multiply; }
  .tc-glitch { animation: tc-glitch 1.6s steps(1, end) infinite, tc-burst 0.6s steps(1, end) 1; }
  .tc-glitch:nth-child(2) { animation-delay: 0.25s, 0s; }
  .tc-glitch:nth-child(3) { animation-delay: 0.5s, 0s; }
  .tc-glitch:nth-child(4) { animation-delay: 0.75s, 0s; }

  @keyframes tc-glitch {
    0%, 30%, 100% { transform: none; clip-path: inset(0); filter: none; }
    2%  { transform: translate(-7px, 1px) skewX(14deg);  clip-path: inset(5% 0 62% 0);  filter: drop-shadow(5px 0 #ff00c8) drop-shadow(-5px 0 #00e5ff); }
    5%  { transform: translate(8px, -2px) skewX(-12deg); clip-path: inset(58% 0 8% 0);  filter: drop-shadow(-5px 0 #ff00c8) drop-shadow(5px 0 #00e5ff); }
    8%  { transform: translate(-4px, 0) scaleX(1.12);    clip-path: inset(28% 0 40% 0); filter: hue-rotate(120deg) contrast(1.6); }
    11% { transform: translate(6px, 2px) skewX(8deg);    clip-path: inset(0 0 80% 0);   filter: drop-shadow(4px 0 #ff00c8) drop-shadow(-4px 0 #00e5ff); }
    14% { transform: translate(-6px, -1px);              clip-path: inset(75% 0 0 0);   filter: drop-shadow(-4px 0 #00e5ff); }
    17% { transform: translate(3px, 0) skewX(-5deg);     clip-path: inset(0);           filter: hue-rotate(-90deg) saturate(2.5); }
    20% { transform: translate(-2px, 0);                 clip-path: inset(40% 0 30% 0); filter: drop-shadow(2px 0 #ff00c8); }
    23% { transform: none;                               clip-path: inset(0);           filter: contrast(1.4); }
  }

  @keyframes tc-burst {
    0%   { transform: translate(-10px, 0) skewX(20deg);  clip-path: inset(10% 0 50% 0); filter: drop-shadow(6px 0 #ff00c8) drop-shadow(-6px 0 #00e5ff); }
    20%  { transform: translate(10px, 0) skewX(-18deg);  clip-path: inset(50% 0 10% 0); filter: hue-rotate(150deg) contrast(1.8); }
    40%  { transform: translate(-6px, 2px);              clip-path: inset(0 0 70% 0);   filter: drop-shadow(-6px 0 #00e5ff); }
    60%  { transform: translate(6px, -2px) scaleX(1.15); clip-path: inset(70% 0 0 0);   filter: drop-shadow(6px 0 #ff00c8); }
    80%  { transform: translate(-3px, 0);                clip-path: inset(20% 0 20% 0); filter: contrast(1.5); }
    100% { transform: none;                              clip-path: inset(0);           filter: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .tc-glitch { animation: none; }
  }
`}</style> */}

      <div
        className="w-full cursor-pointer overflow-hidden rounded-lg border border-stone-200 bg-white
                   shadow-[0_4px_20px_rgba(0,0,0,0.1)]
                   transition-transform duration-300 hover:scale-[1.03]"
        onPointerEnter={(e) => e.pointerType === "mouse" && openCard()}
        onPointerLeave={(e) => e.pointerType === "mouse" && closeCard()}
        onClick={() => (open ? closeCard() : openCard())}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between border-b border-stone-200 px-3 py-2"
          style={{ background: "linear-gradient(to bottom, #FAFAF9, #F0EFED)" }}
        >
          <div className="flex items-center gap-1.5">
            <div className="h-[9px] w-[9px] rounded-full border border-[#E0443E] bg-[#FF5F57]" />
            <div className="h-[9px] w-[9px] rounded-full border border-[#DEA123] bg-[#FEBC2E]" />
            <div className="h-[9px] w-[9px] rounded-full border border-[#1AAB29] bg-[#28C840]" />
          </div>
          <span className="select-none text-[10px] text-stone-400">
            {title}
          </span>
          <div className="w-[40px]" />
        </div>

        {/* Body */}
        <div className="min-h-[80px] p-3 font-mono text-[11px] leading-[1.7]">
          {COMMANDS.map((c) => (
            <div
              key={c.cmd}
              className={`mb-1 ${c.hideOnMobile ? "hidden md:block" : ""}`}
            >
              <div className="whitespace-nowrap text-stone-800">
                <span className="text-emerald-600">~</span> $ {c.cmd}
              </div>
              <div className="flex min-w-0 flex-wrap gap-x-3 text-stone-500 [overflow-wrap:anywhere]">
                {c.out.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}

          {/* Gambar: membuka pelan ke bawah, di tengah */}
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out
                        ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          >
            <div className="overflow-hidden">
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {STACK.map((s) => (
                  <span
                    key={`${s.src}-${playKey}`}
                    className="block mix-blend-multiply"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.src}
                      alt={s.alt}
                      draggable={false}
                      className={`h-[38px] w-auto select-none sm:h-[46px] ${
                        s.invert ? "invert" : ""
                      }`}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
