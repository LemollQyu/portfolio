"use client";

import { useState } from "react";

/* ========================= DATA (ganti isinya) ========================= */

type Folder = {
  id: string;
  title: string;
  back: string; // warna belakang folder
  front: string; // warna panel depan
  shots: number; // jumlah kotak gambar di panel detail
  desc: string[];
  button?: string;
};

const FOLDERS: Folder[] = [
  {
    id: "work",
    title: "Projects at Work",
    back: "#7EA4BE",
    front: "#8EB4CE",
    shots: 3,
    desc: [
      "Deskripsi singkat proyek kerja pertama. Ceritakan masalah, peranmu, dan hasilnya.",
      "Paragraf kedua: teknologi yang dipakai atau hal yang kamu pelajari.",
    ],
    button: "Lihat detail",
  },
  {
    id: "ai",
    title: "Designing with AI",
    back: "#CEAB7E",
    front: "#DEBB8E",
    shots: 2,
    desc: ["Eksperimen dan proyek yang melibatkan AI."],
  },
  {
    id: "community",
    title: "Community Impact",
    back: "#7DB49B",
    front: "#8DC4AB",
    shots: 4,
    desc: ["Kontribusi untuk komunitas, open source, atau acara."],
    button: "Lihat repo",
  },
  {
    id: "lens",
    title: "Through My Lens",
    back: "#D08D88",
    front: "#E09D98",
    shots: 4,
    desc: ["Foto dan momen yang kamu abadikan."],
  },
  {
    id: "sketch",
    title: "From Sketch to Merch",
    back: "#A08AC0",
    front: "#B09AD0",
    shots: 2,
    desc: ["Dari sketsa sampai jadi produk."],
  },
];

const STATS = [
  { value: "20+", label: "Proyek selesai" },
  { value: "5+", label: "Tahun belajar" },
  { value: "10+", label: "Teknologi" },
];

const ACHIEVEMENTS = [
  {
    year: "2026",
    title: "Judul pencapaian",
    sub: "Keterangan singkat",
    badge: "AWARD",
  },
  {
    year: "2025",
    title: "Judul pencapaian",
    sub: "Keterangan singkat",
    badge: "SHIPPED",
  },
  {
    year: "2025",
    title: "Judul pencapaian",
    sub: "Keterangan singkat",
    badge: "AWARD",
  },
  {
    year: "2024",
    title: "Judul pencapaian",
    sub: "Keterangan singkat",
    badge: "SHIPPED",
  },
  {
    year: "2024",
    title: "Judul pencapaian",
    sub: "Keterangan singkat",
    badge: "AWARD",
  },
  {
    year: "2023",
    title: "Judul pencapaian",
    sub: "Keterangan singkat",
    badge: "SHIPPED",
  },
];

const NOTES = [
  { t: "Think deeply", c: "#5B9A82", x: 8, y: 62, r: -18 },
  { t: "Detail-driven", c: "#6F9BC0", x: 38, y: 40, r: 14 },
  { t: "Keep curious", c: "#C9A15B", x: 18, y: 22, r: -8 },
  { t: "Ship it", c: "#9B86C0", x: 52, y: 66, r: 20 },
];

const JOURNEY = [
  { n: "01", t: "Mulai belajar", tag: "2019" },
  { n: "02", t: "Kuliah Informatika", tag: "2020" },
  { n: "03", t: "Proyek pertama", tag: "2022" },
  { n: "04", t: "Lulus S.Kom.", tag: "2025" },
];

const FUEL = [
  { l: "Coffee", v: 0.9 },
  { l: "Tea", v: 0.5 },
  { l: "Music", v: 0.8 },
  { l: "Sunlight", v: 0.4 },
  { l: "Mess", v: 0.6 },
];

type TabId = "projects" | "snapshot" | "achievements" | "garden";

const TABS: { id: TabId; label: string; path: string }[] = [
  { id: "projects", label: "Projects", path: "project" },
  { id: "snapshot", label: "Snapshot", path: "snapshot" },
  { id: "achievements", label: "Achievements", path: "achievements" },
  { id: "garden", label: "Garden", path: "garden" },
];

/* ========================= KOMPONEN KECIL ========================= */

function Placeholder({
  ratio = "16 / 10",
  label,
  className = "",
}: {
  ratio?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full items-center justify-center rounded-md border border-dashed border-stone-300 text-[10px] text-stone-400 ${className}`}
      style={{
        aspectRatio: ratio,
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(0,0,0,0.025) 0 8px, transparent 8px 16px)",
        backgroundColor: "rgba(255,255,255,0.55)",
      }}
    >
      {label ?? "Gambar"}
    </div>
  );
}

const ico = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#2196F3",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function TabIcon({ id }: { id: TabId }) {
  if (id === "projects")
    return (
      <svg {...ico}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );
  if (id === "snapshot")
    return (
      <svg {...ico}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    );
  if (id === "achievements")
    return (
      <svg {...ico}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  return (
    <svg {...ico}>
      <path d="M12 22V11" />
      <path d="M12 11c0-4 3-6 7-6 0 4-3 6-7 6z" />
      <path d="M12 15c0-3-2-5-6-5 0 3 2 5 6 5z" />
    </svg>
  );
}

/* ========================= TAB: PROJECTS ========================= */

function FolderButton({
  f,
  active,
  onClick,
}: {
  f: Folder;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full cursor-pointer flex-col items-center gap-2"
    >
      <div
        className="relative aspect-[96/80] w-full max-w-[96px]"
        style={{
          perspective: 200,
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
        }}
      >
        <svg
          viewBox="0 0 96 80"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <rect x="0" y="12" width="96" height="68" rx="8" fill={f.back} />
          <path
            d="M0 20 C0 14.5, 4.5 10, 10 10 L32 10 Q36 10, 38 6 Q40 2, 44 2 L86 2 Q94 2, 96 10 L96 20 L0 20 Z"
            fill={f.back}
          />
        </svg>

        {/* kertas di dalam folder */}
        <div
          className={`absolute inset-x-[6%] bottom-[7%] h-[62%] rounded-[4px] bg-white/60 transition-opacity duration-200 ${
            active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        />

        {/* panel depan: terbuka miring saat hover / aktif */}
        <div
          className={`absolute inset-x-[1%] bottom-[1%] h-[78%] rounded-[7px] transition-transform duration-300 ease-out [transform-origin:center_bottom] ${
            active
              ? "[transform:rotateX(-24deg)]"
              : "group-hover:[transform:rotateX(-24deg)]"
          }`}
          style={{
            backgroundColor: f.front,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.06)",
          }}
        />
      </div>
      <span
        className={`min-h-[28px] text-center text-[11px] leading-tight transition-colors duration-200 ${
          active
            ? "font-medium text-stone-800"
            : "text-stone-500 group-hover:text-stone-700"
        }`}
      >
        {f.title}
      </span>
    </button>
  );
}

function ProjectsTab() {
  const [openId, setOpenId] = useState<string | null>(null);
  const current = FOLDERS.find((f) => f.id === openId) ?? null;

  return (
    <div className="relative h-full overflow-hidden">
      {/* Grid folder */}
      <div
        className={`h-full w-full overflow-y-auto px-4 pb-6 pt-6 lg:px-8 lg:pt-8 lg:transition-[width] lg:duration-[350ms] lg:ease-out ${
          current ? "lg:w-[42%]" : "lg:w-full"
        }`}
      >
        <div
          className={`grid grid-cols-3 content-start gap-x-3 gap-y-5 lg:gap-x-8 lg:gap-y-6 ${
            current ? "lg:grid-cols-3 lg:gap-x-4" : "lg:grid-cols-5"
          }`}
        >
          {FOLDERS.map((f) => (
            <FolderButton
              key={f.id}
              f={f}
              active={f.id === openId}
              onClick={() => setOpenId(f.id === openId ? null : f.id)}
            />
          ))}
        </div>
      </div>

      {/* Panel detail: meluncur dari kanan */}
      <aside
        className={`absolute inset-y-0 right-0 z-10 w-full overflow-y-auto border-l border-stone-300/40 bg-[#F8F7F5] transition-transform duration-[350ms] ease-out lg:w-[58%] ${
          current ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        {current && (
          <div className="p-4 lg:p-5">
            <button
              onClick={() => setOpenId(null)}
              aria-label="Tutup"
              className="absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-xs text-stone-500 shadow hover:text-stone-800"
            >
              ✕
            </button>

            <Placeholder ratio="16 / 9" label="Gambar utama 16:9" />

            {current.shots > 1 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {Array.from({ length: Math.min(current.shots, 3) }).map(
                  (_, i) => (
                    <Placeholder key={i} ratio="4 / 3" label={`${i + 1}`} />
                  ),
                )}
              </div>
            )}

            <h3 className="mt-4 text-[13px] font-medium text-stone-800">
              {current.title}
            </h3>
            <div className="mt-2 space-y-2 text-[12px] leading-relaxed text-stone-600">
              {current.desc.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {current.button && (
              <button className="mt-3 rounded-md border border-stone-300 bg-white px-3 py-1 text-[11px] text-stone-700 transition-colors hover:bg-stone-100">
                {current.button}
              </button>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}

/* ========================= TAB: ACHIEVEMENTS ========================= */

function AchievementsTab() {
  return (
    <div className="h-full overflow-y-auto px-4 py-5 lg:px-8 lg:py-6">
      <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.15em] text-stone-400">
        Impact at a glance
      </p>
      <div className="grid grid-cols-3 gap-2 lg:gap-3">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-stone-300/40 bg-white/50 px-3 py-2.5"
          >
            <div className="text-[15px] font-semibold text-stone-700 lg:text-[18px]">
              {s.value}
            </div>
            <div className="font-mono text-[8px] uppercase tracking-wider text-stone-400">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <p className="mb-1 mt-6 font-mono text-[9px] uppercase tracking-[0.15em] text-stone-400">
        {ACHIEVEMENTS.length} projects &amp; roles
      </p>
      <ul>
        {ACHIEVEMENTS.map((a, i) => (
          <li
            key={i}
            className="flex gap-3 border-b border-stone-300/30 py-2.5 last:border-0"
          >
            <span className="w-8 shrink-0 pt-0.5 font-mono text-[9px] text-stone-400">
              {a.year}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-semibold text-stone-700">
                {a.title}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[10px] text-stone-500">
                {a.sub}
                <span className="rounded bg-[#EFD9A8] px-1.5 py-px font-mono text-[8px] text-[#8a6a1c]">
                  {a.badge}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ========================= TAB: SNAPSHOT ========================= */

function Radar() {
  const cx = 50,
    cy = 52,
    r = 30;
  const pt = (i: number, k: number) => {
    const a = (-90 + (360 / FUEL.length) * i) * (Math.PI / 180);
    return [cx + Math.cos(a) * r * k, cy + Math.sin(a) * r * k];
  };
  const poly = FUEL.map((f, i) => pt(i, f.v).join(",")).join(" ");
  const ring = FUEL.map((_, i) => pt(i, 1).join(",")).join(" ");
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full max-h-[130px]">
      <polygon points={ring} fill="none" stroke="#d6d3d1" strokeWidth="0.6" />
      <polygon
        points={poly}
        fill="rgba(110,160,190,0.35)"
        stroke="#6EA0BE"
        strokeWidth="0.8"
      />
      {FUEL.map((f, i) => {
        const [x, y] = pt(i, 1.28);
        return (
          <text
            key={f.l}
            x={x}
            y={y}
            fontSize="5"
            fill="#78716c"
            textAnchor="middle"
          >
            {f.l}
          </text>
        );
      })}
    </svg>
  );
}

function Card({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-stone-300/30 bg-white/70 p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${className}`}
    >
      <p className="mb-2 font-mono text-[8px] uppercase tracking-[0.15em] text-stone-400">
        {title}
      </p>
      {children}
    </div>
  );
}

function SnapshotTab() {
  const [fact, setFact] = useState(0);
  return (
    <div className="h-full overflow-y-auto p-3 lg:p-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card title="Design notes" className="col-span-2 lg:col-span-1">
          <div className="relative h-[110px] overflow-hidden rounded bg-white">
            {NOTES.map((n) => (
              <span
                key={n.t}
                className="absolute whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] font-medium text-white"
                style={{
                  background: n.c,
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  transform: `rotate(${n.r}deg)`,
                }}
              >
                {n.t}
              </span>
            ))}
          </div>
        </Card>

        <Card title="Energy level">
          <div className="flex flex-col items-center">
            <div className="relative h-[84px] w-[84px]">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="#e7e5e4"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="#5B9A82"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${0.95 * 94.2} 94.2`}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[15px] font-semibold text-stone-700">
                95%
              </span>
            </div>
            <span className="mt-1 text-[10px] text-stone-500">
              Feeling great
            </span>
          </div>
        </Card>

        <Card title="Fuel mix" className="col-span-1 lg:col-span-2">
          <Radar />
        </Card>

        <Card title="My journey" className="col-span-2 lg:col-span-2">
          <ul className="space-y-1">
            {JOURNEY.map((j) => (
              <li
                key={j.n}
                className="flex items-center gap-2 rounded px-1.5 py-1 text-[11px] text-stone-600"
              >
                <span className="font-mono text-[9px] text-stone-400">
                  {j.n}
                </span>
                <span className="flex-1">{j.t}</span>
                <span className="rounded bg-stone-100 px-1.5 font-mono text-[8px] text-stone-400">
                  {j.tag}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Fun facts" className="col-span-2 lg:col-span-2">
          <button
            onClick={() => setFact((f) => (f + 1) % 3)}
            className="relative mx-auto block h-[150px] w-[120px] cursor-pointer"
            aria-label="Ganti foto"
          >
            {[2, 1, 0].map((layer) => {
              const idx = (fact + layer) % 3;
              return (
                <div
                  key={idx}
                  className="absolute inset-0 rounded-sm bg-white p-1.5 pb-5 shadow-md transition-transform duration-300"
                  style={{
                    transform: `rotate(${layer === 0 ? 0 : layer === 1 ? -5 : 5}deg) translateY(${layer * -2}px)`,
                    zIndex: 3 - layer,
                  }}
                >
                  <Placeholder
                    ratio="1 / 1"
                    label={`Foto ${idx + 1}`}
                    className="h-full"
                  />
                </div>
              );
            })}
          </button>
        </Card>
      </div>
    </div>
  );
}

/* ========================= TAB: GARDEN ========================= */

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COUNT = 120;
const R = rng(7);
const FLOWERS = Array.from({ length: COUNT }, (_, i) => {
  const spread = R() < 0.6 ? 0.55 : 1;
  const x = 50 + (R() - 0.5) * 92 * spread;
  const y = 50 + (R() - 0.5) * 84 * spread;
  const cols = 15;
  return {
    scatter: { x, y },
    tidy: {
      x: 6 + (i % cols) * (88 / (cols - 1)),
      y: 8 + Math.floor(i / cols) * 12,
    },
    e: i % 3 === 0 ? "🌷" : i % 3 === 1 ? "🌸" : "🌼",
  };
});

function GardenTab() {
  const [tidy, setTidy] = useState(false);
  return (
    <div className="flex h-full flex-col px-3 pb-3 pt-3 lg:px-5 lg:pt-4">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-stone-400">
            Community garden
          </p>
          <p className="text-[10px] text-stone-500">
            {COUNT} flowers planted by visitors
          </p>
        </div>
        <div className="flex shrink-0 overflow-hidden rounded-full border border-stone-300/60 text-[10px]">
          <button
            onClick={() => setTidy(false)}
            className={`px-2.5 py-1 ${!tidy ? "bg-stone-800 text-white" : "bg-white/70 text-stone-600"}`}
          >
            Scatter
          </button>
          <button
            onClick={() => setTidy(true)}
            className={`px-2.5 py-1 ${tidy ? "bg-stone-800 text-white" : "bg-white/70 text-stone-600"}`}
          >
            Tidy up
          </button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg border border-stone-300/40 bg-[#F0EEE8]">
        {FLOWERS.map((f, i) => {
          const p = tidy ? f.tidy : f.scatter;
          return (
            <span
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 select-none text-[13px] transition-all duration-700 ease-out"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                transitionDelay: `${(i % 12) * 20}ms`,
              }}
            >
              {f.e}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ========================= WINDOW ========================= */

export type FinderWindowProps = {
  user?: string;
  className?: string;
};

export default function FinderWindow({
  user = "lemoll",
  className,
}: FinderWindowProps) {
  const [tab, setTab] = useState<TabId>("projects");
  const current = TABS.find((t) => t.id === tab)!;

  return (
    <div className={`flex justify-center px-4 lg:px-0 ${className ?? ""}`}>
      <div className="w-full max-w-[1200px]">
        <div
          className="relative overflow-hidden rounded-2xl border border-stone-300/40 bg-[#F5F5F4]"
          style={{
            boxShadow:
              "0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          {/* tekstur kertas */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] rounded-2xl mix-blend-multiply"
            style={{
              backgroundImage: "url(/asset/noise-texture.webp)",
              backgroundSize: "200px 200px",
              opacity: 0.3,
            }}
          />

          {/* Title bar */}
          <div className="relative z-[2] flex items-center gap-2 border-b border-stone-300/30 bg-[#F0EDE6]/80 px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-[11px] w-[11px] rounded-full border border-[#E0443E] bg-[#FF5F57]" />
              <span className="h-[11px] w-[11px] rounded-full border border-[#DEA123] bg-[#FEBC2E]" />
              <span className="h-[11px] w-[11px] rounded-full border border-[#1AAB29] bg-[#28C840]" />
            </div>
            <div className="flex-1 truncate text-center">
              <span className="text-[11px] text-stone-400">
                ~/{user}/{current.path}
              </span>
            </div>
            <div className="w-[52px]" />
          </div>

          {/* Tab bar (mobile) */}
          <div className="relative z-[2] flex border-b border-stone-300/30 bg-[#EDE9E2]/60 lg:hidden">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 px-1 py-2 text-[11px] transition-colors ${
                  tab === t.id
                    ? "bg-[#E8E0D4] font-medium text-stone-800"
                    : "text-stone-500"
                }`}
              >
                <TabIcon id={t.id} />
                <span className="hidden min-[420px]:inline">{t.label}</span>
              </button>
            ))}
          </div>

          <div className="relative z-[2] flex h-[520px] w-full lg:h-[640px]">
            {/* Sidebar (desktop) */}
            <div className="hidden w-[170px] shrink-0 border-r border-stone-300/30 bg-[#EDE9E2]/60 px-2 py-3 backdrop-blur-sm lg:block">
              <p className="mb-1 px-2 text-[11px] font-medium text-stone-400">
                Favorites
              </p>
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-[5px] text-left text-[12px] transition-colors ${
                    tab === t.id
                      ? "bg-[#E8E0D4] text-stone-800"
                      : "text-stone-600 hover:bg-stone-200/40"
                  }`}
                >
                  <TabIcon id={t.id} />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            {/* Konten */}
            <div className="relative h-full min-w-0 flex-1 overflow-hidden">
              {tab === "projects" && <ProjectsTab />}
              {tab === "snapshot" && <SnapshotTab />}
              {tab === "achievements" && <AchievementsTab />}
              {tab === "garden" && <GardenTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
