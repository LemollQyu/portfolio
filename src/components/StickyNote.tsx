export type StickyNoteProps = {
  text?: string;
  rotate?: number; // derajat, contoh: -3
  className?: string;
};

const MASK = 'url("/asset/sticky-notes.svg")';

export default function StickyNote({
  text = "I care about craft, how clearly things communicate, handle edge cases, and build trust. Always in “let me try this” mode, curious, building, and exploring.",
  rotate = -3,
  className,
}: StickyNoteProps) {
  return (
    <div
      className={`w-full ${className ?? ""}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        // shadow di wrapper, karena mask akan memotong shadow kalau dipasang di elemen yang sama
        filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.18))",
        containerType: "inline-size",
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "405 / 220",
          background: "#FFE599",
          WebkitMaskImage: MASK,
          maskImage: MASK,
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        {/* Tekstur noise */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60 mix-blend-multiply"
          style={{
            backgroundImage: 'url("/noise-texture.webp")',
            backgroundSize: "200px 200px",
            opacity: "30%",
          }}
        />

        {/* Teks */}
        <p
          className="absolute left-[13%] right-[11%] top-[27%] font-medium leading-[1.75] text-stone-600"
          style={{ fontSize: "3.8cqw" }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
