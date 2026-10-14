"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import "./PageTransition.css";

type Phase = "idle" | "cover" | "reveal";
type Col = { flex: number; duration: number; delay: number; steps: number };

const Ctx = createContext<{ navigate: (href: string) => void }>({
  navigate: () => {},
});
export const usePageTransition = () => useContext(Ctx);

const makeCols = (): Col[] =>
  Array.from({ length: 14 }, () => ({
    flex: 1 + Math.random() * 2.5,
    duration: 0.55 + Math.random() * 0.25,
    delay: Math.random() * 0.25,
    steps: 0, // tidak dipakai lagi
  }));

const totalMs = (cols: Col[]) =>
  Math.max(...cols.map((c) => c.duration + c.delay)) * 1000;

export default function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [phase, setPhase] = useState<Phase>("idle");
  const [cols, setCols] = useState<Col[]>([]);

  const phaseRef = useRef<Phase>("idle");
  const colsRef = useRef<Col[]>([]);
  const pushedRef = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const changePhase = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };
  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const startReveal = useCallback(() => {
    if (phaseRef.current !== "cover") return;
    changePhase("reveal");
    later(
      () => {
        changePhase("idle");
        setCols([]);
        pushedRef.current = false;
      },
      totalMs(colsRef.current) + 50,
    );
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (phaseRef.current !== "idle") return; // cegah double click
      if (href === pathname) return;

      const c = makeCols();
      colsRef.current = c;
      setCols(c);
      pushedRef.current = false;
      changePhase("cover");

      // tunggu tirai menutup penuh -> baru pindah halaman
      later(
        () => {
          pushedRef.current = true;
          router.push(href);
          // fallback kalau pathname tidak berubah (error / redirect)
          later(startReveal, 4000);
        },
        totalMs(c) + 50,
      );
    },
    [pathname, router, startReveal],
  );

  // pathname berubah = halaman tujuan sudah siap -> buka tirai
  useEffect(() => {
    if (phaseRef.current === "cover" && pushedRef.current) {
      later(startReveal, 120);
    }
  }, [pathname, startReveal]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <Ctx.Provider value={{ navigate }}>
      {children}
      {phase !== "idle" && (
        <div className={`pt-curtain pt-${phase}`} aria-hidden="true">
          {cols.map((c, i) => (
            <i
              key={i}
              style={{
                flex: c.flex,
                animationDuration: `${c.duration}s`,
                animationDelay: `${c.delay}s`,
              }}
            />
          ))}
        </div>
      )}
    </Ctx.Provider>
  );
}
