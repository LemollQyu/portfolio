import { useId } from "react";

const VINYL_CSS = `

@property --vinyl-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes vinyl-border-rotate { to { --vinyl-angle: 360deg; } }
@keyframes vinyl-spin          { to { transform: rotate(360deg); } }

@keyframes vinyl-slide-left {
  from { opacity: 0; transform: translateX(-60px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* Tiap blob punya jalur sendiri -> warna terus mengalir di dalam kartu */
@keyframes vinyl-drift-a {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(70px, 60px) scale(1.2); }
  66%      { transform: translate(20px, 150px) scale(0.95); }
}
@keyframes vinyl-drift-b {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(-80px, -70px) scale(1.1); }
  66%      { transform: translate(-30px, -160px) scale(1.25); }
}
@keyframes vinyl-drift-c {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(130px, -50px) scale(1.3); }
}

.vinyl-entrance {
  animation: vinyl-slide-left 0.7s cubic-bezier(0.4, 0, 0.2, 1) 2.5s both;
}

/* Piringan berputar hanya saat hover; lepas hover -> kembali ke posisi awal */
.vinyl-link:hover .vinyl-spin {
  animation: vinyl-spin 3s linear infinite;
  transform-origin: 50% 50%;
}

/* Bayangan lembut di sekitar piringan saat hover (terlihat di video) */
.vinyl-shadow {
  transition: filter 0.5s ease-out;
}
.vinyl-link:hover .vinyl-shadow {
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.28));
}

/* Border hijau-kuning yang berputar + glow tipis */
/* Semua efek hover lewat CSS biasa (tidak bergantung varian Tailwind) */
.vinyl-tilt {
  transform: rotate(5deg);
  transition: transform 0.3s ease;
}
.vinyl-link:hover .vinyl-tilt {
  transform: translateY(-8px) rotate(-2deg) scale(1.06);
}
.vinyl-card { transition: border-color 0.5s ease; }
.vinyl-link:hover .vinyl-card { border-color: transparent; }

/* Tekstur noise di atas warna, di bawah konten */
.vinyl-noise {
  background-image: url("/noise-texture.webp");
  background-repeat: repeat;
  mix-blend-mode: multiply;
  opacity: 0.5;
}

.vinyl-blobs { opacity: 0; transition: opacity 0.5s ease-out; }
.vinyl-link:hover .vinyl-blobs { opacity: 1; }

.vinyl-border { opacity: 0; transition: opacity 0.5s ease; }
.vinyl-link:hover .vinyl-border { opacity: 1; }

.vinyl-shadow { transition: filter 0.5s ease-out, transform 0.5s ease; }
.vinyl-link:hover .vinyl-shadow { transform: scale(1.08); }

.vinyl-border {
  background: conic-gradient(
    from var(--vinyl-angle),
    #7ee36b,
    #f4e66f,
    transparent 40%,
    transparent 60%,
    #7ee36b
  );
  animation: vinyl-border-rotate 3s linear infinite;
  box-shadow: 0 0 18px rgba(126, 227, 107, 0.35);
}

.vinyl-blob {
  position: absolute;
  border-radius: 9999px;
  filter: blur(34px);
  will-change: transform;
}
.vinyl-blob-1 { width: 190px; height: 190px; background: #f6e98a; top: -50px;    left: -60px;  opacity: 0.8;  animation: vinyl-drift-a 6s ease-in-out infinite; }
.vinyl-blob-2 { width: 200px; height: 200px; background: #a7e59a; bottom: -60px; right: -60px; opacity: 0.8;  animation: vinyl-drift-b 7s ease-in-out infinite; }
.vinyl-blob-3 { width: 150px; height: 150px; background: #c9ec9b; top: 35%;      left: -70px;  opacity: 0.6;  animation: vinyl-drift-c 5s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .vinyl-link:hover .vinyl-spin,
  .vinyl-border,
  .vinyl-blob,
  .vinyl-entrance {
    animation: none;
  }
}
`;

type VinylCardProps = {
  href?: string;
  label?: string;
  title?: string;
  subtitle?: string;
  tagline?: string;
  /** Kelas posisi, mis. "absolute left-[40px] top-[410px]" */
  className?: string;
};

// Dua irisan pantulan cahaya yang saling berlawanan (bawah-kanan & atas-kiri)
const WEDGES =
  "M50 50 L96.04 66.76 A49 49 0 0 1 50 99 Z M50 50 L3.96 33.24 A49 49 0 0 1 50 1 Z";

function VinylDisc({ className = "" }: { className?: string }) {
  const clipId = `${useId().replace(/:/g, "")}-wedges`;
  const grooves = [45, 41, 37, 33, 29, 25, 21];

  return (
    <svg
      viewBox="0 0 100 100"
      className={`vinyl-spin ${className}`}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <path d={WEDGES} />
        </clipPath>
      </defs>

      <circle cx="50" cy="50" r="49" fill="#050505" />

      {grooves.map((r) => (
        <circle
          key={`d-${r}`}
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="#fff"
          strokeOpacity="0.06"
          strokeWidth="0.5"
        />
      ))}
      <path d={WEDGES} fill="#fff" fillOpacity="0.2" />
      <g clipPath={`url(#${clipId})`}>
        {grooves.map((r) => (
          <circle
            key={`b-${r}`}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="#000"
            strokeOpacity="0.45"
            strokeWidth="0.5"
          />
        ))}
      </g>

      <circle cx="50" cy="50" r="13" fill="#0a0a0a" />
      <circle cx="50" cy="50" r="11.5" fill="#1fa23f" />
      <circle cx="50" cy="50" r="1.7" fill="#fff" />
    </svg>
  );
}

export default function VinylCard({
  href = "#",
  label = "Playlist",
  title = "Music",

  tagline = "Learning by building",
  className = "absolute left-[40px] top-[410px]",
}: VinylCardProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: VINYL_CSS }} />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`vinyl-link vinyl-entrance hidden lg:block z-30 cursor-pointer ${className}`}
        style={{ overflow: "visible" }}
      >
        <div className="vinyl-tilt relative w-[240px]">
          {/* Border gradien hijau-kuning yang berputar */}
          <div className="vinyl-border pointer-events-none absolute inset-[-1.5px] rounded-2xl" />

          {/* Kartu */}
          <div className="vinyl-card relative flex w-full flex-col items-center overflow-hidden rounded-2xl border border-stone-200 bg-white pb-6 pt-6 shadow-sm">
            {/* Warna hijau & kuning yang mengalir di dalam kartu */}
            <div className="vinyl-blobs pointer-events-none absolute inset-0">
              <div className="vinyl-blob vinyl-blob-1" />
              <div className="vinyl-blob vinyl-blob-2" />
              <div className="vinyl-blob vinyl-blob-3" />
            </div>

            {/* Tekstur noise */}
            <div className="vinyl-noise pointer-events-none absolute inset-0" />

            {/* Vinyl: membesar sedikit saat hover, berputar, bayangan lembut */}
            <div className="vinyl-shadow relative z-[1] h-36 w-36">
              <VinylDisc className="h-full w-full" />
            </div>

            <div className="relative z-[1] mt-4 text-center">
              <p className="mb-1 text-[10px] font-feat font-bold uppercase tracking-widest text-neutral-900">
                {label}
              </p>
              <h3 className="mb-1 font-suo text-4xl font-bold leading-tight tracking-wide text-neutral-900">
                {title}
              </h3>
              <p className="text-[13px] font-medium leading-snug text-stone-400">
                {tagline}
              </p>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
