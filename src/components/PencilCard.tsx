import { useId } from "react";

const PENCIL_CSS = `


.pc-tilt {
  transform: rotate(-6deg);
  transition: transform 0.3s ease;
}
.pc-link:hover .pc-tilt {
  transform: translateY(-6px) rotate(-2deg) scale(1.05);
}

.pc-pencil { filter: drop-shadow(0 4px 6px rgba(60, 40, 15, 0.28)); }

.pc-scribble {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 0.9s ease-out;
}
.pc-link:hover .pc-scribble { stroke-dashoffset: 0; }

@media (prefers-reduced-motion: reduce) {
  .pc-tilt, .pc-scribble { transition: none; }
}

.pc-link {
  display: block;
  cursor: pointer;
  --bar-gutter: 48px; /* ruang sidebar kiri + jarak */
}

@media (min-width: 768px) {
  .pc-link { --bar-gutter: 80px; }
}

.pc-size {
  /* mobile tetap 170px, desktop lebih kecil */
  width: clamp(170px, 90px + 16vw, 300px);
  max-width: calc(100vw - var(--bar-gutter) - 48px);
}
`;

type PencilCardProps = {
  href?: string;
  text?: string;
  /** Kelas posisi, mis. "absolute left-12 bottom-8" */
  className?: string;
};

export default function PencilCard({
  href = "#",
  text = "capture moments",
  className = "",
}: PencilCardProps) {
  const uid = useId().replace(/:/g, "");
  const tapeId = `${uid}-tape`;
  const ferruleId = `${uid}-ferrule`;

  const Wrapper = href ? "a" : "div";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PENCIL_CSS }} />
      <Wrapper
        {...(href ? { href } : {})}
        className={`pc-link z-30 ${className}`}
        aria-label={text}
      >
        <div className="pc-tilt pc-size">
          {/* PENSIL */}
          <svg
            viewBox="0 0 400 52"
            className="pc-pencil w-full"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id={tapeId}
                width="12"
                height="12"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <rect width="6" height="12" fill="rgba(255,255,255,0.75)" />
                <rect
                  x="6"
                  width="6"
                  height="12"
                  fill="rgba(255,214,170,0.8)"
                />
              </pattern>

              <linearGradient id={ferruleId} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#e7e5e4" />
                <stop offset="50%" stopColor="#a8a29e" />
                <stop offset="100%" stopColor="#d6d3d1" />
              </linearGradient>
            </defs>

            {/* eraser */}
            <rect x="2" y="9" width="28" height="34" rx="7" fill="#f43f5e" />
            <rect
              x="2"
              y="9"
              width="28"
              height="10"
              rx="5"
              fill="#fb7185"
              opacity="0.7"
            />

            {/* ferrule */}
            <rect
              x="30"
              y="9"
              width="22"
              height="34"
              fill={`url(#${ferruleId})`}
            />
            <line
              x1="36"
              y1="9"
              x2="36"
              y2="43"
              stroke="#78716c"
              strokeWidth="1"
              opacity="0.6"
            />
            <line
              x1="46"
              y1="9"
              x2="46"
              y2="43"
              stroke="#78716c"
              strokeWidth="1"
              opacity="0.6"
            />

            {/* badan */}
            <rect x="52" y="9" width="268" height="34" fill="#fbbf24" />
            <rect x="52" y="9" width="268" height="10" fill="#fde68a" />
            <rect x="52" y="33" width="268" height="10" fill="#d97706" />
            <line
              x1="52"
              y1="19"
              x2="320"
              y2="19"
              stroke="#b45309"
              strokeWidth="0.6"
              opacity="0.5"
            />
            <line
              x1="52"
              y1="33"
              x2="320"
              y2="33"
              stroke="#b45309"
              strokeWidth="0.6"
              opacity="0.5"
            />

            {/* teks */}
            <text
              x="66"
              y="30"
              className="font-suo"
              fontSize="13"
              letterSpacing="1.5"
              fill="#78350f"
            >
              {text}
            </text>

            {/* selotip */}
            <g transform="rotate(-8 245 26)">
              <rect
                x="222"
                y="3"
                width="46"
                height="46"
                fill={`url(#${tapeId})`}
                stroke="rgba(0,0,0,0.08)"
              />
            </g>

            {/* kayu */}
            <polygon points="320,9 388,26 320,43" fill="#e8c9a0" />
            <polygon points="320,26 388,26 320,43" fill="#cdb596" />
            <line
              x1="320"
              y1="9"
              x2="320"
              y2="43"
              stroke="#bc9f7e"
              strokeWidth="1"
            />

            {/* grafit */}
            <polygon points="370,21.5 388,26 370,30.5" fill="#292524" />
          </svg>

          {/* COretan, tergambar saat hover */}
          <svg viewBox="0 0 400 20" className="mt-1 w-full" aria-hidden="true">
            <path
              className="pc-scribble"
              pathLength={1}
              d="M5 12 C 40 2, 70 22, 110 10 S 175 2, 215 12 S 295 22, 390 8"
              fill="none"
              stroke="#44403c"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </Wrapper>
    </>
  );
}
