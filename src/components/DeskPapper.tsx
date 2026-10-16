const ASSETS = {
  paper: "/asset/ripped-paper.png",
  plant: "/asset/plant.webp",
  book: "/asset/book.webp",
  coffee: "/asset/cup-coffee.webp",
  pen: "/asset/pen.webp",
};

const CSS = `
.dp-wrap { position: relative; width: 100%; aspect-ratio: 2160 / 890; }
.dp-wrap { container-type: inline-size; }
.dp-paper {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 6px 10px rgba(60,40,15,.18));
  pointer-events: none;
}

.dp-deco { position: absolute; pointer-events: none; }

.dp-item {
  position: absolute;
  display: block;
  height: auto;
  cursor: pointer;
  --r: 0deg;  /* rotasi awal */
  --ty: 0px;  /* geser vertikal saat hover */
  --s: 1;     /* skala saat hover */
  transform: translateY(0) rotate(var(--r)) scale(1);
  transition: transform .3s ease, filter .3s ease;
  filter: drop-shadow(0 6px 8px rgba(60,40,15,.28));
}
.dp-item:hover {
  transform: translateY(var(--ty)) rotate(var(--r)) scale(var(--s));
  filter: drop-shadow(0 12px 12px rgba(60,40,15,.32));
}

/* Posisi dan ukuran (sudah dibesarkan) */
.dp-plant  { left: -4%;  bottom: -12%; width: 36%; z-index: 4; transform-origin: 50% 100%; --r: 0deg;   --ty: 0px;  --s: 1.05; }
.dp-book   { left: 26%;  top: 18%;     width: 29%; z-index: 2; --r: -3deg;  --ty: -4px; --s: 1.04; }
.dp-coffee { left: 57%;  top: 10%;     width: 21%; z-index: 3; --r: 0deg;   --ty: -5px; --s: 1.06; }

/* cup-coffee.webp punya ruang kosong di atas, dipotong lewat rasio */
.dp-coffee { aspect-ratio: 512 / 300; object-fit: cover; object-position: 50% 92%; }

@media (prefers-reduced-motion: reduce) { .dp-item { transition: none; } }

/* tulisan tangan */
.dp-note {
  left: 27%; top: 52%;
  font-size: 3.6cqw;
  color: #57534e;
  transform: rotate(-3deg);
  line-height: 1.1;
}
.dp-scribble { display: block; width: 100%; margin-top: 0.4cqw; }



/* bekas cincin kopi */
.dp-ring {
  left: 55%; top: 22%; width: 12%; aspect-ratio: 1;
  border-radius: 50%;
  border: 0.5cqw solid rgba(120,70,20,.16);
  box-shadow: inset 0 0 0 0.2cqw rgba(120,70,20,.08);
  z-index: 1;
}

/* ===== PENA (hover area diam, hanya gambarnya yang bergerak) ===== */
.dp-penbox {
  position: absolute; right: 5%; top: -2%; width: 11%;
  z-index: 3; cursor: pointer;
}
.dp-penimg {
  display: block; width: 100%; height: auto;
  transform: rotate(-15deg);
  filter: drop-shadow(0 6px 8px rgba(60,40,15,.28));
  transition: filter .3s ease;
  pointer-events: none;
}
.dp-penbox:hover .dp-penimg {
  animation: dp-write 3.2s ease-in-out infinite;
  filter: drop-shadow(0 10px 10px rgba(60,40,15,.32));
}

/* Pena ke awal tulisan, bergerak zigzag ke kanan, lalu terangkat */
@keyframes dp-write {
  0%   { transform: translate(0, 0) rotate(-15deg); }
  10%  { transform: translate(-6.2cqw, 0.4cqw) rotate(-18deg); }
  14%  { transform: translate(-6.2cqw, 0.9cqw) rotate(-18deg); }
  20%  { transform: translate(-5.2cqw, 0.5cqw) rotate(-18deg); }
  26%  { transform: translate(-4.3cqw, 0.95cqw) rotate(-18deg); }
  32%  { transform: translate(-3.5cqw, 0.5cqw) rotate(-18deg); }
  38%  { transform: translate(-2.8cqw, 0.95cqw) rotate(-18deg); }
  44%  { transform: translate(-2.0cqw, 0.5cqw) rotate(-18deg); }
  50%  { transform: translate(-1.2cqw, 0.95cqw) rotate(-18deg); }
  56%  { transform: translate(-0.6cqw, 0.5cqw) rotate(-18deg); }
  62%  { transform: translate(0, 0.9cqw) rotate(-18deg); }
  68%  { transform: translate(0.3cqw, 0.5cqw) rotate(-17deg); }
  82%  { transform: translate(0.2cqw, -0.3cqw) rotate(-15deg); }
  100% { transform: translate(0, 0) rotate(-15deg); }
}

/* ===== KERTAS BERGARIS ===== */
.dp-sticky {
  --lh: 2.6cqw; /* jarak antar garis */
  left: 76%; top: 35%; width: 19%;
  z-index: 2;
  transform: rotate(3deg);
  filter: drop-shadow(0 2px 3px rgba(60,40,15,.25)) drop-shadow(0 8px 10px rgba(60,40,15,.15));
}
.dp-sticky::before { /* selotip */
  content: ""; position: absolute; z-index: 1;
  top: -1.1cqw; left: 70%; width: 38%; height: 2.2cqw;
  transform: translateX(-50%) rotate(-3deg);
  background: repeating-linear-gradient(45deg, rgba(255,255,255,.7) 0 6px, rgba(255,214,170,.7) 6px 12px);
  box-shadow: 0 1px 2px rgba(0,0,0,.12);
}
.dp-sheet {
  position: relative;
  min-height: calc(var(--lh) * 6.3);
  padding: var(--lh) 4% 0 20%; /* baris pertama dikosongkan untuk tulisan pena */
  font-size: calc(var(--lh) * 0.72);
  line-height: var(--lh);
  color: #27364f;
  background:
    linear-gradient(90deg, transparent 15%, rgba(226,90,90,.55) 15%, rgba(226,90,90,.55) calc(15% + 1px), transparent calc(15% + 1px)),
    repeating-linear-gradient(to bottom, transparent 0, transparent calc(var(--lh) - 1px), rgba(92,138,201,.5) calc(var(--lh) - 1px), rgba(92,138,201,.5) var(--lh)),
    linear-gradient(#fffdf6, #f6f2e4);
  /* tepi atas sobek tidak rata */
  clip-path: polygon(0 3%, 6% 0, 14% 2%, 23% 0, 33% 2.5%, 45% 0, 57% 2%, 69% 0, 80% 2.5%, 91% 0, 100% 2%, 100% 100%, 0 100%);
}

/* tulisan yang "ditulis" pena */
.dp-ink {
  position: absolute; top: 0; left: 20%;
  white-space: nowrap;
  font-size: calc(var(--lh) * 0.85);
  line-height: var(--lh);
  color: #1f3a6e;
}
.dp-wrap:has(.dp-penbox:hover) .dp-ink { animation: dp-ink 3.2s linear infinite; }
@keyframes dp-ink {
  0%, 14% { clip-path: inset(0 100% 0 0); opacity: 1; }
  68%     { clip-path: inset(0 0 0 0);    opacity: 1; }
  92%     { clip-path: inset(0 0 0 0);    opacity: 1; }
  100%    { clip-path: inset(0 0 0 0);    opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .dp-penbox:hover .dp-penimg, .dp-wrap:has(.dp-penbox:hover) .dp-ink { animation: none; }
}

`;

type Props = { className?: string };

export default function DeskPaper({ className = "" }: Props) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className={`dp-wrap ${className}`} aria-hidden="true">
        <img src={ASSETS.paper} alt="" className="dp-paper" draggable={false} />

        {/* DEKORASI BARU */}
        <div className="dp-deco dp-ring" />

        <div className="dp-deco dp-note font-suo">
          <h2 className="mt-1 ml-6 text-[clamp(0.7rem,0.55rem+0.6vw,1rem)] leading-snug text-stone-600">
            Hobbies Coffee, music, books, and a plant or two.
          </h2>
          <svg
            className="dp-scribble"
            viewBox="0 0 100 8"
            preserveAspectRatio="none"
          >
            <path
              d="M2 5 C 20 1, 35 8, 55 4 S 85 2, 98 5"
              fill="none"
              stroke="#44403c"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="dp-deco dp-sticky">
          <div className="dp-sheet font-synt">
            <span className="dp-ink font-suo text-lg">to do:</span>
            ✓ ngopi
            <br />✓ ngoding
            <br />○ tidur
          </div>
        </div>
        {/* END DEKORASI */}

        <img
          src={ASSETS.book}
          alt=""
          className="dp-item dp-book"
          draggable={false}
        />
        <img
          src={ASSETS.coffee}
          alt=""
          className="dp-item dp-coffee"
          draggable={false}
        />
        <div className="dp-penbox">
          <img
            src={ASSETS.pen}
            alt=""
            className="dp-penimg"
            draggable={false}
          />
        </div>
        <img
          src={ASSETS.plant}
          alt=""
          className="dp-item dp-plant"
          draggable={false}
        />
      </div>
    </>
  );
}
