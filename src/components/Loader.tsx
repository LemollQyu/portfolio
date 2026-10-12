"use client";

import { useEffect, useState } from "react";
import "./Loader.css";

const texts = [
  "LOADING THE PLAYLIST",
  "IT MIGHT TAKE SOME TIME",
  "FINDING THE RIGHT TUNE",
  "BE READY TO HIT PLAY",
  "ENJOY THE EXPERIENCE",
];

// [durasi, delay, offset] per band & baris (delay positif = masuk bertahap)
const timing: [number, number, number][][] = [
  [
    [4.2, 0.0, -30],
    [4.0, 0.15, 22],
    [4.4, 0.3, -46],
    [4.1, 0.45, 36],
    [4.3, 0.6, 8],
  ],
  [
    [4.4, 0.2, 28],
    [4.1, 0.35, -38],
    [4.3, 0.5, 44],
    [4.5, 0.65, -15],
    [4.2, 0.8, 20],
  ],
  [
    [4.1, 0.4, -34],
    [4.3, 0.55, 40],
    [4.0, 0.7, -18],
    [4.5, 0.85, 34],
    [4.2, 1.0, -5],
  ],
];
type Col = { flex: number; duration: number; delay: number; steps: number };

export default function Loader({ duration = 8000 }: { duration?: number }) {
  const [percent, setPercent] = useState(0);
  const [cols, setCols] = useState<Col[]>([]);
  const [reveal, setReveal] = useState(false);
  const [gone, setGone] = useState(false);

  // Kolom tirai diacak setelah mount (menghindari hydration mismatch)
  useEffect(() => {
    setCols(
      Array.from({ length: 14 }, () => ({
        flex: 1 + Math.random() * 2.5,
        duration: 0.7 + Math.random() * 0.7,
        delay: Math.random() * 0.45,
        steps: 4 + Math.floor(Math.random() * 6),
      })),
    );
  }, []);

  // Hitung persen + kunci scroll selama loading
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const n = Math.max(
        0,
        Math.min(100, Math.floor(((now - start) / duration) * 100)),
      );
      setPercent(n);
      if (n < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [duration]);

  // Setelah 100%: tirai menyusut -> loader dihapus
  useEffect(() => {
    if (percent < 100) return;
    const t1 = setTimeout(() => setReveal(true), 250);
    const t2 = setTimeout(() => {
      setGone(true);
      document.body.style.overflow = "";
    }, 250 + 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [percent]);

  if (gone) return null;

  return (
    <main
      className={`ld-screen${reveal ? " ld-reveal" : ""}`}
      aria-label="Loading screen"
    >
      <div className="ld-curtain">
        {cols.map((c, i) => (
          <i
            key={i}
            style={{
              flex: c.flex,
              height: reveal ? 0 : "100%",
              transition: reveal
                ? `height ${c.duration}s steps(${c.steps}) ${c.delay}s`
                : "none",
            }}
          />
        ))}
      </div>

      <div className="ld-content">
        <section className="ld-bands" aria-hidden="true">
          {timing.map((band, b) => (
            <div className="ld-band" key={b}>
              {band.map(([d, dl, o], i) => {
                const t = texts[i];
                return (
                  <div
                    className="ld-line"
                    key={i}
                    style={
                      {
                        "--i": i,
                        "--d": `${d}s`,
                        "--dl": `${dl}s`,
                        "--o": `${o}px`,
                      } as React.CSSProperties
                    }
                  >
                    <span className="ld-trail">{t[0].repeat(14)}</span>
                    <span className="ld-t">{t}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </section>

        <div className="ld-status">
          <span className="ld-caret">▸</span>
          <span>{percent}%</span>
        </div>

        <div className="ld-track">
          <div className="ld-fill" style={{ width: `${percent}%` }} />
        </div>
        <div className="ld-vtrack ld-vtrack-l">
          <div className="ld-vfill" style={{ height: `${percent}%` }} />
        </div>
        <div className="ld-vtrack ld-vtrack-r">
          <div className="ld-vfill" style={{ height: `${percent}%` }} />
        </div>
      </div>
    </main>
  );
}
