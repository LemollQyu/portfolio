"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

/* ========================= DATA (ganti isinya) ========================= */

type Folder = {
  id: string;
  title: string;
  kind?: "folder" | "file"; // default "folder"
  back: string;
  front: string;
  shots?: number;
  cover?: string;
  images?: string[];
  desc?: string[];
  button?: string;
  href?: string;
  children?: Folder[]; // kalau ada, klik = masuk ke dalam folder
};

const FOLDERS: Folder[] = [
  {
    id: "work",
    title: "Projects at Work",
    back: "#7EA4BE",
    front: "#8EB4CE",
    children: [
      {
        id: "work1",
        title: "Marketplace Belabeli",
        back: "#6FA583",
        front: "#7FB593",
        shots: 3,
        cover: "/showcase/1.png",
        images: ["/showcase/2.webp", "/showcase/3.webp", "/showcase/4.webp"],
        desc: [
          "Belabeli is a mobile marketplace platform that brings buyers, sellers, and admins together in one well-organized shopping ecosystem. Buyers can browse products, choose variations, check out, and chat directly with sellers. Sellers manage their products, orders, and sales reports with ease, while admins oversee all activity through a centralized dashboard.",
          "Beyond the core features, Belabeli includes a transparent refund flow with status tracking, a Loyalty & Rewards Center where points can be redeemed for vouchers and gifts, and an AR feature that lets users view products in their real space. Everything is wrapped in a clean, consistent green design and integrated with social media.",
        ],
        button: "",
        href: "",
      },
      {
        id: "work2",
        title: "Management Printing",
        back: "#8A9199",
        front: "#9BA2AA",
        shots: 2,
        cover: "/showcase/p1.webp",
        images: ["/showcase/p2.webp"],
        desc: [
          "Management Printing is an admin dashboard built to run a printing business from one place. Admins can manage service categories and their specifications, track incoming orders by status, verify payments, and handle refunds, all through a clean, minimal interface that works across tablet, laptop, and mobile.",
          "Beyond the core workflow, it includes a real-time notification center for new orders and payments, order detail views with customer notes and downloadable files, revenue and order statistics with charts, payment method management, and exportable reports. Together they give the team a clear view of every job from order to print.",
        ],
      },
      {
        id: "work3",
        title: "Company Profile",
        back: "#2F4A38",
        front: "#3E5C48",
        shots: 0,
        cover: "/showcase/c3.webp",
        desc: [
          "LemIIQ is a company profile website for a collaborative space where ideas, creativity, and community come together to create real impact. Visitors are welcomed by a bold hero section, then can explore the portfolio with category filters, read detailed case studies, meet the team, and get to know the community behind the work.",
          "Each case study highlights the team's role and measurable impact, while the community page shows active members, collaborations, and upcoming events. It also features a video showcase, a newsletter subscription, and a fully responsive mobile experience with a dedicated menu. Everything is wrapped in a calm forest-green and cream palette paired with elegant serif typography.",
        ],
      },
      {
        id: "work4",
        title: "Open Course",
        back: "#5E8B6C",
        front: "#6E9B7C",
        shots: 0,
        cover: "/showcase/a1.webp",
        desc: [
          "FE Open Course is an online learning platform built to help people grow their skills in Front End Engineering. Learners can sign in to a personal dashboard that shows their enrolled courses, completed lessons, certificates, and average ratings, then browse the full course catalog with category filters and search.",
          "Each course page covers what you will learn, course details, and the instructor's profile, while the lesson view combines a video player with a module list that tracks progress and unlocks the next material. It also includes a course management page with announcements and a profile page for account settings. Everything is wrapped in a calm, consistent green design that keeps learning focused and easy on the eyes.",
        ],
      },

      {
        id: "work5",
        title: "Chatour Travel",
        back: "#D8B49A",
        front: "#F4D5C0",
        shots: 0,
        cover: "/showcase/d1.webp",
        desc: [
          "A modern travel booking platform designed to provide a seamless and comfortable pilgrimage experience.",
          "Featuring an intuitive booking system for Umrah and Hajj packages, departure schedules, travel services, and virtual tours of the Holy Mosques.",
          "Designed with a warm, elegant visual identity that combines a user-friendly interface with a sense of trust, comfort, and spirituality.",
        ],
      },
    ],
  },
  {
    id: "myfiles",
    title: "My Files",
    back: "#CEAB7E",
    front: "#DEBB8E",
    children: [
      {
        id: "file1",
        title: "Curriculum Vitae",
        kind: "file",
        back: "#CEAB7E",
        front: "#DEBB8E",
        shots: 0,
        cover: "/file/cv.webp",
        desc: [
          "My curriculum vitae, summarizing my background, education, work experience, skills, and the projects I have worked on. It gives a quick overview of who I am and what I can bring to a team.",
        ],
        button: "Buka file",
        href: "http://localhost:3000/file/mycv.pdf",
      },
      {
        id: "file2",
        title: "Academic Transcript",
        kind: "file",
        back: "#CEAB7E",
        front: "#DEBB8E",
        shots: 0,

        desc: [
          "My official academic transcript, listing the courses I have taken, the grades I earned, and my cumulative GPA. It shows my academic progress and the subjects I have studied throughout my degree.",
        ],
        button: "Buka file",
        href: "http://localhost:3000/file/transkip.pdf",
      },
      {
        id: "file3",
        title: "Resume",
        kind: "file",
        back: "#CEAB7E",
        front: "#DEBB8E",
        shots: 0,
        desc: [
          "A concise one-page version of my resume, highlighting my key skills, experience, and selected projects. It is made for a quick read when you want the essentials at a glance.",
        ],
        button: "Buka file",
        href: "http://localhost:3000/file/resume.pdf",
      },
    ],
  },
  {
    id: "lens",
    title: "Through My Lens",
    back: "#D08D88",
    front: "#E09D98",
    shots: 8,
    images: [
      "https://picsum.photos/seed/oldmemories/1200/800",
      "https://picsum.photos/seed/sunsetmoments/1200/800",
      "https://picsum.photos/seed/childhooddays/1200/800",
      "https://picsum.photos/seed/forgottenplaces/1200/800",
      "https://picsum.photos/seed/goldenhours/1200/800",
      "https://picsum.photos/seed/littlemoments/1200/800",
      "https://picsum.photos/seed/foreveryoung/1200/800",
      "https://picsum.photos/seed/nostalgicdays/1200/800",
    ],
    desc: ["Little moments, lasting memories."],
  },
];

const STATS = [
  { value: "3.80", label: "IPK / 4.00" },
  { value: "2", label: "Penghargaan" },
  { value: "6", label: "Sertifikasi" },
  { value: "6", label: "Proyek" },
];
type Achievement = {
  year: string;
  title: string;
  sub: string;
  badge: "AWARD" | "WORK" | "EDU" | "SHIPPED" | "CERT";
  href?: string; // link ke PDF/gambar sertifikat, opsional
};

const ACHIEVEMENTS: Achievement[] = [
  {
    year: "2026",
    title: "Fullstack Developer Intern, Azura Labs",
    sub: "Merancang database, membangun API Contact, dan implementasi UI",
    badge: "WORK",
  },
  {
    year: "2026",
    title: "Lulus Teknik Informatika, IPK 3,80/4,00",
    sub: "Universitas Wahid Hasyim Semarang",
    badge: "EDU",
  },
  {
    year: "2024",
    title: "Penghargaan MSIB Batch 7",
    sub: "Kampus Merdeka, PT Campus Digital Indonesia",
    badge: "AWARD",
  },
  {
    year: "2024",
    title: "Penghargaan Gemastik Programming",
    sub: "Kompetisi programming mahasiswa nasional",
    badge: "AWARD",
  },
  {
    year: "2024",
    title: "Software Developer, MSIB 7",
    sub: "BelaBeli PWA marketplace UMKM: Next.js dan Laravel 11",
    badge: "SHIPPED",
  },
];

const CERTIFICATES: Achievement[] = [
  {
    year: "2026",
    title: "Huawei Academic: Artificial Intelligence",
    sub: "Huawei",
    badge: "CERT",
  },
  {
    year: "2026",
    title: "Oracle Academic: Database",
    sub: "Oracle",
    badge: "CERT",
  },
  {
    year: "2024",
    title: "Campus Digital: Software Developer",
    sub: "Campus Digital",
    badge: "CERT",
  },
  {
    year: "2022",
    title: "Sololearn: Web Developer",
    sub: "Sololearn",
    badge: "CERT",
  },
  {
    year: "2022",
    title: "Python Basic Programming",
    sub: "Dicoding",
    badge: "CERT",
  },
  {
    year: "2022",
    title: "Fundamental Web Development",
    sub: "Dicoding",
    badge: "CERT",
  },
];

// warna garis kiri + badge per jenis
const BADGE_STYLE: Record<
  Achievement["badge"],
  { bar: string; bg: string; fg: string }
> = {
  AWARD: { bar: "#D9A441", bg: "#EFD9A8", fg: "#8a6a1c" },
  WORK: { bar: "#6F9BC0", bg: "#D5E4F0", fg: "#2f5f86" },
  EDU: { bar: "#9B86C0", bg: "#E3DAF0", fg: "#5d4a86" },
  SHIPPED: { bar: "#5B9A82", bg: "#D3E8DF", fg: "#2f6b53" },
  CERT: { bar: "#CC6F6A", bg: "#F3D6D4", fg: "#8e3b36" },
};

const NOTES = [
  // x,y = posisi berserakan (%), tx,ty = posisi rapi saat hover (%)
  { t: "Stay curious", c: "#C9A15B", x: 24, y: 72, r: -22, tx: 27, ty: 18 },
  { t: "Data-driven", c: "#6F9BC0", x: 46, y: 84, r: 22, tx: 73, ty: 18 },
  { t: "Think deeply", c: "#5B9A82", x: 14, y: 90, r: -4, tx: 27, ty: 50 },
  { t: "Exploring often", c: "#CC6F6A", x: 58, y: 66, r: 20, tx: 73, ty: 50 },
  {
    t: "Learn by building",
    c: "#5B8FA3",
    x: 78,
    y: 56,
    r: -62,
    tx: 27,
    ty: 82,
  },
  { t: "Detail-focused", c: "#9B86C0", x: 72, y: 80, r: 16, tx: 73, ty: 82 },
];

const JOURNEY = [
  { n: "01", t: "Began My CS Journey", tag: "2022" },
  { n: "02", t: "Active in Student Organizations", tag: "2023" },
  { n: "03", t: "First Internship", tag: "2024" },
  { n: "04", t: "Second Internship", tag: "2026" },
  { n: "05", t: "Final Project & Defense", tag: "2026" },
  { n: "06", t: "Graduated in Computer Science", tag: "2026" },
  { n: "07", t: "Open to Opportunities", tag: "NOW", now: true },
];

const FUEL = [
  { l: "Coffee", v: 0.9 },
  { l: "Tea", v: 0.5 },
  { l: "Music", v: 0.8 },
  { l: "Sunlight", v: 0.4 },
  { l: "Curiosity", v: 0.95 },
  { l: "Ideas", v: 0.85 },
];

const FACT_PHOTOS: (string | undefined)[] = [
  "/photo/re.webp",
  "/photo/shf.webp",
  "/photo/sh.webp",
];

type TabId = "projects" | "snapshot" | "achievements" | "garden";

const TABS: { id: TabId; label: string; path: string }[] = [
  { id: "projects", label: "Projects", path: "project" },
  { id: "snapshot", label: "Snapshot", path: "snapshot" },
  { id: "achievements", label: "Achievements", path: "achievements" },
  { id: "garden", label: "Garden", path: "garden" },
];

function Shot({
  src,
  ratio,
  alt,
  natural = false,
}: {
  src?: string;
  ratio: string;
  alt: string;
  natural?: boolean;
}) {
  if (!src) return <Placeholder ratio={ratio} />;

  // mode natural: ikut rasio asli gambar, tidak ada yang terpotong
  if (natural) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1200}
        sizes="(min-width: 1024px) 40vw, 90vw"
        className="h-auto w-full rounded-md border border-stone-300/50"
      />
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-md border border-stone-300/50"
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 40vw, 90vw"
        className="object-cover"
      />
    </div>
  );
}

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
      {label ?? "Picture"}
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

function FileIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 80 96"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      {/* badan kertas */}
      <path
        d="M8 4 H50 L72 26 V88 a4 4 0 0 1 -4 4 H12 a4 4 0 0 1 -4 -4 Z"
        fill="#FFFFFF"
        stroke="#D6D3D1"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* lipatan pojok */}
      <path
        d="M50 4 V22 a4 4 0 0 0 4 4 H72 Z"
        fill="#E7E5E4"
        stroke="#D6D3D1"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* garis teks */}
      <rect x="18" y="40" width="44" height="3" rx="1.5" fill="#E7E5E4" />
      <rect x="18" y="49" width="44" height="3" rx="1.5" fill="#E7E5E4" />
      <rect x="18" y="58" width="30" height="3" rx="1.5" fill="#E7E5E4" />
      {/* label warna di bawah */}
      <rect x="18" y="72" width="26" height="8" rx="2" fill={color} />
    </svg>
  );
}

function ItemButton({
  f,
  active,
  onClick,
}: {
  f: Folder;
  active: boolean;
  onClick: () => void;
}) {
  const isFile = f.kind === "file";

  return (
    <button
      onClick={onClick}
      className="group flex w-full cursor-pointer flex-col items-center gap-2"
    >
      {isFile ? (
        <div
          className={`relative aspect-[80/96] w-full max-w-[76px] transition-transform duration-200 group-hover:-translate-y-1 ${
            active ? "-translate-y-1" : ""
          }`}
          style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.12))" }}
        >
          <FileIcon color={f.front} />
        </div>
      ) : (
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

          <div
            className={`absolute inset-x-[6%] bottom-[7%] h-[62%] rounded-[4px] bg-white/60 transition-opacity duration-200 ${
              active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          />

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
      )}
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
  // folder yang sedang dimasuki (null = tampilan root)
  const [dirId, setDirId] = useState<string | null>(null);
  // item yang detailnya sedang dibuka di panel kanan
  const [openId, setOpenId] = useState<string | null>(null);

  const dir = FOLDERS.find((f) => f.id === dirId) ?? null;
  const items: Folder[] = dir?.children ?? FOLDERS;
  const current = items.find((f) => f.id === openId) ?? null;

  const handleClick = (f: Folder) => {
    if (f.children) {
      // masuk ke dalam folder
      setDirId(f.id);
      setOpenId(null);
    } else {
      // buka detail di sebelahnya
      setOpenId(f.id === openId ? null : f.id);
    }
  };

  const goBack = () => {
    setDirId(null);
    setOpenId(null);
  };

  return (
    <div className="relative h-full overflow-hidden">
      {/* Grid isi folder */}
      <div
        className={`h-full w-full overflow-y-auto px-4 pb-6 pt-4 lg:px-8 lg:pt-3 lg:transition-[width] lg:duration-[350ms] lg:ease-out ${
          current ? "lg:w-[42%]" : "lg:w-full"
        }`}
      >
        {/* Breadcrumb + tombol kembali */}
        <div className="mb-4 flex items-center gap-2 text-[11px] text-stone-500">
          {dir && (
            <button
              onClick={goBack}
              aria-label="Kembali"
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border border-stone-300/60 bg-white/70 text-stone-600 transition-colors hover:bg-white"
            >
              ‹
            </button>
          )}
          <span
            className={
              dir ? "cursor-pointer hover:text-stone-800" : "text-stone-700"
            }
            onClick={dir ? goBack : undefined}
          >
            Projects
          </span>
          {dir && (
            <>
              <span className="text-stone-300">/</span>
              <span className="font-medium text-stone-800">{dir.title}</span>
            </>
          )}
        </div>

        <div
          key={dirId ?? "root"}
          className={`animate-[fadeIn_250ms_ease-out] grid grid-cols-3 content-start gap-x-3 gap-y-5 lg:gap-x-8 lg:gap-y-6 ${
            current ? "lg:grid-cols-3 lg:gap-x-4" : "lg:grid-cols-5"
          }`}
        >
          {items.map((f) => (
            <ItemButton
              key={f.id}
              f={f}
              active={f.id === openId}
              onClick={() => handleClick(f)}
            />
          ))}
        </div>
      </div>

      {/* Panel detail: meluncur dari kanan */}
      <aside
        data-lenis-prevent
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

            {current.cover && (
              <Shot
                src={current.cover}
                ratio="16 / 9"
                alt={current.title}
                natural
              />
            )}

            {(current.shots ?? 0) > 0 && (
              <div
                className={`grid gap-2 ${current.cover ? "mt-2" : ""} ${
                  (current.shots ?? 0) === 1
                    ? "grid-cols-1"
                    : (current.shots ?? 0) === 2
                      ? "grid-cols-2"
                      : "grid-cols-3"
                }`}
              >
                {Array.from({ length: current.shots ?? 0 }).map((_, i) => (
                  <Shot
                    key={i}
                    src={current.images?.[i]}
                    ratio="4 / 3"
                    alt={`${current.title} ${i + 1}`}
                  />
                ))}
              </div>
            )}

            <h3
              className={`text-[13px] font-medium text-stone-800 ${
                current.cover || (current.shots ?? 0) > 0 ? "mt-4" : "mt-8"
              }`}
            >
              {current.title}
            </h3>
            <div className="mt-2 space-y-2 text-[12px] leading-relaxed text-stone-600">
              {(current.desc ?? []).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {current.button && (
              <a
                href={current.href ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block rounded-md border border-stone-300 bg-white px-3 py-1 text-[11px] text-stone-700 transition-colors hover:bg-stone-100"
              >
                {current.button}
              </a>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}

/* ========================= TAB: ACHIEVEMENTS ========================= */

function AchievementItem({ a }: { a: Achievement }) {
  const s = BADGE_STYLE[a.badge];

  const inner = (
    <>
      <span className="w-9 shrink-0 pt-0.5 font-mono text-[9px] text-stone-400">
        {a.year}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[12px] font-semibold text-stone-700">
          {a.title}
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[10px] text-stone-500">
          {a.sub}
          <span
            className="rounded px-1.5 py-px font-mono text-[8px]"
            style={{ background: s.bg, color: s.fg }}
          >
            {a.badge}
          </span>
        </div>
      </div>
      {a.href && (
        <span className="self-center text-[11px] text-stone-300 transition-colors group-hover:text-stone-500">
          ↗
        </span>
      )}
    </>
  );

  const cls =
    "group flex gap-3 rounded-lg border border-l-[4px] border-stone-300/40 bg-white/50 px-3 py-2.5 " +
    "transition-all duration-200 ease-out " +
    "hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] " +
    "active:translate-y-0 active:scale-[0.99] " +
    (a.href ? "cursor-pointer" : "cursor-default");

  const style = { borderLeftColor: s.bar };

  return a.href ? (
    <a
      href={a.href}
      target="_blank"
      rel="noreferrer"
      className={cls}
      style={style}
    >
      {inner}
    </a>
  ) : (
    <div className={cls} style={style}>
      {inner}
    </div>
  );
}

function AchievementsTab() {
  return (
    <div
      data-lenis-prevent
      className="h-full overflow-y-auto px-4 py-5 lg:px-8 lg:py-6"
    >
      <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.15em] text-stone-400">
        Impact at a glance
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:gap-3">
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

      <p className="mb-2 mt-6 font-mono text-[9px] uppercase tracking-[0.15em] text-stone-400">
        Awards &amp; milestones
      </p>
      <ul className="space-y-2">
        {ACHIEVEMENTS.map((a, i) => (
          <li key={i}>
            <AchievementItem a={a} />
          </li>
        ))}
      </ul>

      <p className="mb-2 mt-6 font-mono text-[9px] uppercase tracking-[0.15em] text-stone-400">
        Certifications
      </p>
      <ul className="space-y-2">
        {CERTIFICATES.map((a, i) => (
          <li key={i}>
            <AchievementItem a={a} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ========================= TAB: SNAPSHOT ========================= */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** progress per item supaya muncul satu per satu */
const stag = (t: number, i: number, n: number, span = 0.5) => {
  const start = (i * (1 - span)) / Math.max(1, n - 1);
  return easeOut(clamp01((t - start) / span));
};

/** tween 0 -> 1. Awalnya sudah 1 (tampilan akhir), play() mengulang dari 0 */
function useTween(duration = 1400) {
  const [t, setT] = useState(1);
  const raf = useRef(0);

  const play = useCallback(() => {
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    setT(0);
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setT(p);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [duration]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  return [t, play] as const;
}

function useHover() {
  const [on, setOn] = useState(false);
  return {
    on,
    bind: {
      onMouseEnter: () => setOn(true),
      onMouseLeave: () => setOn(false),
    },
  };
}

function Card({
  title,
  children,
  className = "",
  notebook = false,
  ...rest
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  notebook?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={`relative flex min-h-0 flex-col overflow-hidden bg-white/85 p-4 ${
        notebook
          ? "rounded-md border-b-[5px] border-r-[5px] border-stone-800 pt-5"
          : "rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
      } ${className}`}
    >
      {notebook && (
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[6px] border-b-2 border-dashed border-stone-400"
        />
      )}
      <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.15em] text-stone-400">
        {title}
      </p>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}

/* 1. Design notes: jatuh dari atas, hover = rapi */
function DesignNotesCard() {
  const { on, bind } = useHover();
  const [dropped, setDropped] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setDropped(true), 150);
    return () => clearTimeout(id);
  }, []);

  return (
    <Card
      title="Design notes"
      notebook
      className="min-h-[200px] lg:min-h-0"
      {...bind}
    >
      <div className="absolute inset-0">
        {NOTES.map((n, i) => {
          const left = !dropped ? n.x : on ? n.tx : n.x;
          const top = !dropped ? -30 : on ? n.ty : n.y;
          const rot = !dropped ? n.r * 2 : on ? 0 : n.r;
          return (
            <span
              key={n.t}
              className="absolute whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-medium text-white transition-all duration-[900ms] ease-[cubic-bezier(0.34,1.45,0.64,1)]"
              style={{
                background: n.c,
                left: `${left}%`,
                top: `${top}%`,
                opacity: dropped ? 1 : 0,
                transform: `translate(-50%,-50%) rotate(${rot}deg)`,
                transitionDelay: `${on ? i * 40 : i * 90}ms`,
              }}
            >
              {n.t}
            </span>
          );
        })}
      </div>
    </Card>
  );
}

/* 2. Energy level: hover = 0% -> 95% */
function EnergyCard() {
  const [t, play] = useTween(1500);
  const val = 95 * easeOut(t);
  const C = 94.2;

  return (
    <Card
      title="Energy level"
      className="min-h-[220px] lg:min-h-0"
      onMouseEnter={play}
    >
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <div className="relative h-[112px] w-[112px]">
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
              strokeDasharray={`${(val / 100) * C} ${C}`}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[22px] font-semibold tabular-nums text-stone-700">
            {Math.round(val)}%
          </span>
        </div>
        <span className="text-[11px] text-stone-500">Feeling great</span>
      </div>
    </Card>
  );
}

/* 3. Fuel mix: hover = radar terisi pelan-pelan, label muncul satu-satu */
function FuelCard() {
  const [t, play] = useTween(1600);
  const n = FUEL.length;
  const cx = 50,
    cy = 52,
    r = 28;

  const pt = (i: number, k: number) => {
    const a = (-90 + (360 / n) * i) * (Math.PI / 180);
    return [cx + Math.cos(a) * r * k, cy + Math.sin(a) * r * k];
  };

  const prog = FUEL.map((_, i) => stag(t, i, n));
  const poly = FUEL.map((f, i) => pt(i, f.v * prog[i]).join(",")).join(" ");
  const ring = (k: number) => FUEL.map((_, i) => pt(i, k).join(",")).join(" ");

  return (
    <Card title="Fuel mix" className="min-h-0 lg:min-h-0" onMouseEnter={play}>
      <div className="flex h-full items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="aspect-square h-[210px] w-auto max-w-full lg:h-full"
        >
          {[1 / 3, 2 / 3, 1].map((k) => (
            <polygon
              key={k}
              points={ring(k)}
              fill="none"
              stroke="#d6d3d1"
              strokeWidth="0.5"
            />
          ))}
          {FUEL.map((_, i) => {
            const [x, y] = pt(i, 1);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="#e7e5e4"
                strokeWidth="0.4"
              />
            );
          })}
          <polygon
            points={poly}
            fill="rgba(110,160,190,0.3)"
            stroke="#6EA0BE"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          {FUEL.map((f, i) => {
            const [dx, dy] = pt(i, f.v * prog[i]);
            const [lx, ly] = pt(i, 1.3);
            return (
              <g key={f.l}>
                <circle
                  cx={dx}
                  cy={dy}
                  r="1.3"
                  fill="#6EA0BE"
                  opacity={prog[i]}
                />
                <text
                  x={lx}
                  y={ly}
                  fontSize="5.5"
                  fill="#78716c"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  opacity={prog[i]}
                >
                  {f.l}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
}

/* 4. My journey: hover = list muncul satu per satu */
function JourneyCard() {
  const [t, play] = useTween(1500);
  const n = JOURNEY.length;

  return (
    <Card
      title="My journey"
      className="min-h-[320px] lg:min-h-0"
      onMouseEnter={play}
    >
      <ul className="flex h-full flex-col justify-between gap-1">
        {JOURNEY.map((j, i) => {
          const p = stag(t, i, n, 0.35);
          const now = "now" in j && j.now;
          return (
            <li
              key={j.n}
              style={{
                opacity: p,
                transform: `translateX(${(1 - p) * -14}px)`,
              }}
              className={
                now
                  ? "mt-1 flex items-center gap-3 rounded-lg border border-stone-300/70 bg-stone-100/70 px-3 py-3"
                  : "flex items-center gap-3 border-b border-stone-200 px-1 py-2 last:border-0"
              }
            >
              <span className="font-mono text-[10px] text-stone-400">
                {j.n}
              </span>
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${
                  now ? "bg-emerald-500" : "bg-stone-300"
                }`}
              />
              <span
                className={`flex-1 ${
                  now
                    ? "text-[14px] font-semibold text-stone-800"
                    : "text-[12px] text-stone-500"
                }`}
              >
                {j.t}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 font-mono text-[8px] ${
                  now
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-stone-100 text-stone-400"
                }`}
              >
                {j.tag}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

/* 5. Fun facts: 3 foto bertumpuk, hover = menyebar kiri & kanan */
function FunFactsCard() {
  const { on, bind } = useHover();

  // [offset X (% lebar foto), rotasi saat menyebar, rotasi saat bertumpuk]
  const layers = [
    { x: 0, spread: 0, rest: -2 }, // tengah (paling depan)
    { x: -92, spread: -10, rest: -7 }, // kiri
    { x: 92, spread: 10, rest: 6 }, // kanan
  ];

  return (
    <Card
      title="Curated Nightmares"
      className="min-h-[280px] lg:col-span-2 lg:min-h-0"
      {...bind}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 2, 0].map((i) => {
          const l = layers[i];
          const tx = on ? l.x : 0;
          const rot = on ? l.spread : l.rest;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 w-[130px] bg-white p-2 pb-7 shadow-lg ring-1 ring-black/5 transition-transform duration-500 ease-[cubic-bezier(0.34,1.3,0.64,1)] sm:w-[150px] lg:w-[190px]"
              style={{
                zIndex: i === 0 ? 3 : 2,
                transform: `translate(-50%,-50%) translateX(${tx}%) rotate(${rot}deg)`,
              }}
            >
              <Shot
                src={FACT_PHOTOS[i]}
                ratio="1 / 1"
                alt={`Fun fact ${i + 1}`}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function SnapshotTab() {
  return (
    <div
      data-lenis-prevent
      className="h-full overflow-y-auto p-3 lg:overflow-hidden lg:p-4"
    >
      <div className="grid grid-cols-1 gap-3 lg:h-full lg:grid-cols-3 lg:grid-rows-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <DesignNotesCard />
        <EnergyCard />
        <FuelCard />
        <JourneyCard />
        <FunFactsCard />
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

// // test
// const GARDEN_START = Date.now() - 180 * 1000; // mulai 180 detik "sudah berjalan"
// const BLOOM_EVERY = 1000; // 1 bunga per 1 detik
// const MAX_FLOWERS = 10; // 10 bunga per siklus
// const HOLD = 15 * 1000; // kondisi lengkap bertahan 15 detik

// ---- pengaturan ----
const GARDEN_START = new Date("2026-10-22T13:50:00+07:00").getTime();
// const GARDEN_START = new Date("2026-10-22T00:00:00+07:00").getTime(); //mkas
const BLOOM_EVERY = 1 * 60 * 1000; // 1 bunga per 1 menit
const MAX_FLOWERS = 60; // bunga per siklus (penuh -> kosong -> mengulang)
const HOLD = 10 * 60 * 1000; // lama kondisi "lengkap" ditampilkan sebelum reset (10 menit)
const FLOWER_IMAGES = [
  { src: "/lily.webp", k: 1 },
  { src: "/higanbana4.webp", k: 1.8 },
  { src: "/cursor-lily.webp", k: 1 },
];

// Slot pinggiran untuk /h.webp. Muncul berurutan tiap satu siklus selesai.
// side: bawah/atas/kiri/kanan, pos: posisi di sisi itu (%)
type EdgeSlot = {
  side: "bottom" | "top" | "left" | "right";
  pos: number;
  w: number; // lebar (px)
  flip?: boolean;
};
const EDGE_SLOTS: EdgeSlot[] = [
  { side: "bottom", pos: 82, w: 190 },
  { side: "bottom", pos: 12, w: 170, flip: true },
  { side: "left", pos: 60, w: 150 },
  { side: "right", pos: 35, w: 150, flip: true },
  { side: "bottom", pos: 48, w: 180 },
  { side: "top", pos: 25, w: 150 },
  { side: "right", pos: 78, w: 140 },
  { side: "top", pos: 72, w: 160, flip: true },
  { side: "left", pos: 18, w: 140, flip: true },
  { side: "bottom", pos: 30, w: 130 },
  { side: "bottom", pos: 65, w: 130, flip: true },
  { side: "top", pos: 50, w: 130 },
  { side: "left", pos: 40, w: 130, flip: true },
  { side: "right", pos: 56, w: 130 },
  { side: "top", pos: 38, w: 120, flip: true },
  { side: "top", pos: 88, w: 130 },
  { side: "left", pos: 85, w: 120 },
  { side: "right", pos: 12, w: 120, flip: true },
  { side: "bottom", pos: 94, w: 110 },
  { side: "top", pos: 8, w: 110, flip: true },
];

// posisi jangkar + rotasi supaya pangkal bunga menempel di pinggir
const edgeStyle = (s: EdgeSlot) => {
  switch (s.side) {
    case "bottom":
      return { left: `${s.pos}%`, top: "100%", rot: 0 };
    case "top":
      return { left: `${s.pos}%`, top: "0%", rot: 180 };
    case "left":
      return { left: "0%", top: `${s.pos}%`, rot: 90 };
    default:
      return { left: "100%", top: `${s.pos}%`, rot: -90 };
  }
};

const COLS = 12;
const ROWS = Math.ceil(MAX_FLOWERS / COLS);
const R = rng(7);
const FLOWERS = Array.from({ length: MAX_FLOWERS }, (_, i) => {
  const spread = R() < 0.6 ? 0.55 : 1;
  return {
    scatter: {
      x: 50 + (R() - 0.5) * 92 * spread,
      y: 50 + (R() - 0.5) * 84 * spread,
    },
    tidy: {
      x: 6 + (i % COLS) * (88 / (COLS - 1)),
      y: 8 + Math.floor(i / COLS) * (84 / Math.max(1, ROWS - 1)),
    },
    img: FLOWER_IMAGES[Math.floor(R() * FLOWER_IMAGES.length)],
    size: 44 + Math.floor(R() * 16), // 44-59px, rentang sempit biar wajar
    rot: Math.floor((R() - 0.5) * 30),
  };
});

/** Hitung keadaan kebun dari waktu */
/** Hitung keadaan kebun dari waktu. Berulang: satu putaran = semua slot terisi + HOLD */
function gardenState(now: number) {
  const ROUND = EDGE_SLOTS.length * MAX_FLOWERS * BLOOM_EVERY;

  // sebelum start
  if (now < GARDEN_START) {
    return {
      flowers: 0,
      edges: 0,
      done: false,
      left: GARDEN_START - now + BLOOM_EVERY,
    };
  }

  const t = (now - GARDEN_START) % (ROUND + HOLD);

  // kondisi lengkap, menunggu reset
  if (t >= ROUND) {
    return {
      flowers: MAX_FLOWERS,
      edges: EDGE_SLOTS.length,
      done: true,
      left: ROUND + HOLD - t,
    };
  }

  const total = Math.floor(t / BLOOM_EVERY);
  return {
    flowers: total % MAX_FLOWERS,
    edges: Math.floor(total / MAX_FLOWERS),
    done: false,
    left: BLOOM_EVERY - (t % BLOOM_EVERY),
  };
}

function GardenTab() {
  const [tidy, setTidy] = useState(false);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const st =
    now === null
      ? { flowers: 0, edges: 0, done: false, left: 0 }
      : gardenState(now);

  const s = Math.ceil(st.left / 1000);
  const mmss = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="flex h-full flex-col px-3 pb-3 pt-3 lg:px-5 lg:pt-4">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-stone-400">
            Community garden
          </p>
          <p className="text-[10px] text-stone-500">
            {st.done
              ? `garden is complete · restarting in ${mmss}`
              : `${st.flowers}/${MAX_FLOWERS} flowers · next bloom in ${mmss}`}
            {` · ${st.edges}/${EDGE_SLOTS.length} grown`}
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

      <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg border border-stone-300/40 bg-[#F0EEE8] [--edge-scale:0.6] lg:[--edge-scale:1]">
        {/* bunga di pinggiran (hasil siklus yang sudah selesai) */}
        {EDGE_SLOTS.slice(0, st.edges).map((s, i) => {
          const e = edgeStyle(s);
          return (
            <div
              key={`edge-${i}`}
              className="pointer-events-none absolute z-[1] select-none"
              style={{
                left: e.left,
                top: e.top,
                width: `calc(${s.w}px * var(--edge-scale))`,
                transformOrigin: "50% 100%",
                transform: `translate(-50%, -100%) rotate(${e.rot}deg)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/h.webp"
                alt=""
                draggable={false}
                className="block h-auto w-full animate-[edgeGrow_1600ms_cubic-bezier(0.22,1,0.36,1)_both]"
                style={{
                  transformOrigin: "50% 100%",
                  scale: s.flip ? "-1 1" : "1 1",
                }}
              />
            </div>
          );
        })}

        {/* bunga kebun */}
        {FLOWERS.slice(0, st.flowers).map((f, i) => {
          const p = tidy ? f.tidy : f.scatter;
          return (
            <span
              key={i}
              className="absolute z-[2] -translate-x-1/2 -translate-y-1/2 select-none transition-all duration-700 ease-out"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: f.size * f.img.k,
                height: f.size * f.img.k,
                transitionDelay: `${(i % 12) * 20}ms`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.img.src}
                alt=""
                draggable={false}
                className="block h-full w-full object-contain animate-[bloom_900ms_cubic-bezier(0.34,1.5,0.64,1)_both]"
                style={{ rotate: `${f.rot}deg` }}
              />
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
            className="pointer-events-none absolute inset-0 z-[3] rounded-2xl mix-blend-multiply"
            style={{
              backgroundImage: "url(/noise-texture.webp)",
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
