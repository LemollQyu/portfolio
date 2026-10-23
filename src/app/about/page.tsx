import Image from "next/image";
import Edge from "@/components/Edge";
import SmoothScroll from "@/components/SmoothScroll";
import type { CSSProperties } from "react";
import ShatterPhoto1 from "@/components/ShatterPhoto1";
import ShatterPhoto2 from "@/components/ShatterPhoto2";
import Footer from "@/components/Footer";

const NAME = "Annas Aulia Rahman";
const ROLE = "Frontend & Backend Developer";

const LIGHT = "#f4f3f0";
const DARK = "#141414";

const head = ["Building", "experiences", "that matter."];

// GARIS selebar layar, di LUAR kotak elemen (tidak menimpa isi).
// Harus ditulis literal penuh agar terbaca Tailwind.
const lineTop =
  "relative before:content-[''] before:absolute before:-inset-x-[100vw] before:bottom-full before:h-px before:bg-current before:opacity-20";
const lineBottom =
  "relative after:content-[''] after:absolute after:-inset-x-[100vw] after:top-full after:h-px after:bg-current after:opacity-20";
const lineBoth = `${lineTop} ${lineBottom}`;

const script = "font-suo md:text-4xl text-2xl italic";
const mono = "font-synt text-[11px] leading-snug";
const big =
  "font-feat uppercase leading-[1] tracking-[-0.04em] text-[clamp(18px,2vw,30px)]";
const mid =
  "font-suo uppercase leading-[34px] tracking-[-0.04em] text-[clamp(28px,2.8vw,42px)]";
const tag = "mr-2 align-top font-suo text-[0.56em] normal-case tracking-normal";

// baris headline: nowrap supaya tidak turun baris saat huruf melebar
const hoverLine =
  "block cursor-default whitespace-nowrap transition-[letter-spacing] duration-1000 hover:tracking-[0.15em]";

// pembungkus parallax: elemen luar diam, elemen dalam (beserta garisnya) bergerak
function Par({
  speed,
  className = "",
  pad = "py-1",
  line = true,
  children,
}: {
  speed: number;
  className?: string;
  pad?: string;
  line?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div data-speed={speed} className={`${line ? lineBoth : ""} ${pad}`}>
        {children}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <main className="overflow-x-clip">
      <SmoothScroll />

      {/* 1. HERO */}
      <section
        className="relative flex min-h-screen flex-col items-center justify-between px-[54px] pb-10 pt-2 text-center text-[#141414]"
        style={{ background: LIGHT }}
      >
        <div className="w-full">
          <p
            className={`${lineBottom} ${script} font-suo md:text-4xl text-2xl leading-none`}
          >
            ( {NAME} )
          </p>
          <p
            className={`${lineBottom} py-0.5 font-synt md:text-[16px] text-[12px] leading-none`}
          >
            {ROLE}
          </p>
          <div className={`${lineBoth} mt-4 sm:mt-8 mx-auto w-55`}>
            <div className="relative">
              <ShatterPhoto2
                label={NAME}
                className="w-55"
                aspect={11 / 7}
                bg="/photo/bg2.webp"
                person="/photo/person2.webp"
                focusY={0.7}
              />
              <span className="absolute bottom-0 right-full mr-1.5 font-synt text-[10px] leading-none">
                (09)
              </span>
              <span className="absolute bottom-0 left-full ml-1.5 font-synt text-[10px] leading-none">
                (07)
              </span>
            </div>
          </div>
        </div>

        <h1
          className={`${lineTop} w-full font-feat uppercase leading-[1.3] tracking-[-0.04em] text-[clamp(20px,7vw,32px)] sm:text-[clamp(40px,8vw,120px)]`}
        >
          {head.map((t) => {
            let idx = 0; // index huruf berurutan per baris, dipakai untuk stagger
            return (
              <span
                key={t}
                className={`${hoverLine} ${lineBottom} flash-line font-bold`}
                aria-label={t}
              >
                {t.split(" ").map((word, w) => (
                  <span
                    key={w}
                    className="inline-block whitespace-nowrap"
                    aria-hidden="true"
                  >
                    {word.split("").map((ch) => (
                      <span
                        key={idx}
                        className="flash-char"
                        data-char={ch}
                        style={{ "--i": idx++ } as CSSProperties}
                      >
                        {ch}
                      </span>
                    ))}
                    {"\u00A0"}
                  </span>
                ))}
              </span>
            );
          })}
        </h1>

        <div className="w-full">
          <p
            className={`${lineBoth} mx-auto font-synt tracking-[-0.09em] py-1 text-sm leading-snug`}
          >
            His work reflects a deep appreciation for clean code, <br />{" "}
            thoughtful design, creative thinking, and meaningful digital
            experiences.
          </p>
          <p className={`${script} mt-2 font-suo text-4xl leading-none`}>
            Scroll
          </p>
          <p className={`${script} font-suo text-5xl leading-none`}>↓</p>
        </div>
      </section>

      {/* 2. GELAP */}
      <section
        className="relative px-[54px] pb-[30vh] pt-[22vh] text-[#eee]"
        style={{ background: DARK }}
      >
        <Edge color={DARK} cols={6} max={300} />

        <div className="grid gap-24 md:grid-cols-[1fr_auto_1fr]">
          <Par speed={0.05} className="mb-5">
            <p className={`${script}  leading-none font-suo text-4xl`}>
              (info)
            </p>
            <p className={`${big} mt-1 max-w-md`}>
              His work brings together code, design, and technology to build
              thoughtful digital experiences that balance functionality with
              visual clarity.
            </p>

            <p
              className={`${mono} mt-3 font-synt max-w-[300px] text-lg md:text-[14px] opacity-80`}
            >
              He explores the intersection of logic and creativity, turning
              complex problems into elegant solutions while continuously
              experimenting with new technologies, refining his craft, and
              pushing the boundaries of the digital world.
            </p>
          </Par>

          <Par
            speed={0.14}
            className="relative z-10 mx-auto"
            pad=""
            line={false}
          >
            <div className="relative">
              <ShatterPhoto1 label={`${NAME} duduk di bukit`} />
              <span className="absolute bottom-0 right-full mr-1.5 font-synt text-[10px] leading-none">
                (22)
              </span>
              <span className="absolute bottom-0 left-full ml-1.5 font-synt text-[10px] leading-none">
                (09)
              </span>
            </div>
          </Par>

          <Par speed={-0.04} className="min-w-0 md:mt-[40vh]">
            <div className="flex flex-col items-end  text-right md:pr-0">
              <p className={`${script} font-suo text-4xl leading-none`}>
                (Experience &amp; more)
              </p>

              <p className={`${big} mt-1 max-w-md`}>
                He builds digital products through thoughtful engineering and
                creative problem-solving.
              </p>

              <p
                className={`${script} font-suo mt-6 mb-5 mr-20 translate-x-5 -rotate-6 sm:-translate-x-30 border-white md:-translate-x-60 sm:w-72 w-48 text-2xl tracking-widest md:mr-16`}
              >
                available for work ↙
              </p>

              <p
                className={`${mono} font-synt max-w-[300px] text-lg md:text-[14px] opacity-80 md:max-w-[360px]`}
              >
                From building interactive interfaces to developing full-stack
                applications, he enjoys turning ideas into functional,
                meaningful products. Always exploring new technologies, refining
                his skills, and seeking opportunities to build something
                impactful.
              </p>
            </div>
          </Par>
        </div>
      </section>

      {/* 3. TERANG: services / foto / socials */}
      <section
        className="relative px-[54px] pb-[20vh] pt-[22vh] text-[#141414]"
        style={{ background: LIGHT }}
      >
        <Edge color={LIGHT} />

        <Par speed={0.05} pad="" line={false}>
          {/* SERVICES */}
          <div className={`${lineBoth} ${mid} pl-[2vw]`}>
            <p className="font-feat text-2xl md:text-4xl">
              <span className={`${tag}`}>(Services)</span>
              Visual identity
            </p>
            <p className="font-feat text-2xl md:text-4xl">Frontend design</p>
            <p
              className="font-feat text-2xl md:text-4xl"
              style={{ paddingLeft: 56 }}
            >
              Product system
            </p>
          </div>

          {/* (and more) */}
          <div className={`${lineBottom} pl-[2vw]`}>
            <p
              className={`${script} text-2xl normal-case leading-[34px]`}
              style={{ paddingLeft: 120 }}
            >
              (and more)
            </p>
          </div>

          {/* FOTO */}
          {/* FOTO */}
          <div className={`${lineBottom} flex justify-center`}>
            <div className="relative">
              <ShatterPhoto2
                label={NAME}
                className="w-[min(55vw,240px)]"
                aspect={3 / 4}
                bg="/photo/bg3.webp"
                person="/photo/person3.webp"
              />
              <span className="absolute bottom-0 right-full mr-1.5 font-synt text-[10px] leading-none">
                (10)
              </span>
              <span className="absolute bottom-0 left-full ml-1.5 font-synt text-[10px] leading-none">
                (11)
              </span>
            </div>
          </div>

          {/* SOCIALS */}
          <div
            className={`${lineBoth} ${mid} mt-[18px] md:mt-[26px] pr-9 md:pr-[6vw] text-right`}
          >
            {[
              { t: "Email", href: "mailto:admin@lemoll.site", r: 32 },
              { t: "Instagram", href: "https://instagram.com/_aaaanns", r: 70 },
              {
                t: "LinkedIn",
                href: "https://linkedin.com/in/annas-aulia-rahman",
                r: 12,
              },
              { t: "GitHub", href: "https://github.com/LemollQyu", r: 0 },
            ].map((s, i) => (
              <p
                key={s.t}
                style={{ "--r": `${s.r}px` } as React.CSSProperties}
                className="pr-[calc(var(--r)*0.4)] md:pr-[var(--r)] leading-[0.95] md:leading-[1]"
              >
                {i === 0 && (
                  <span className={`${tag} mr-2 md:mr-3 align-middle`}>
                    (Socials)
                  </span>
                )}
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="font-feat inline-block text-2xl md:text-4xl leading-[0.95] md:leading-[1] hover:opacity-60"
                >
                  {s.t}
                </a>
              </p>
            ))}
          </div>
        </Par>
      </section>

      {/* 4. PENUTUP */}
      <section
        className="flex min-h-[70svh] md:min-h-screen flex-col items-center px-[54px] pt-[14vh] md:pt-[20vh] pb-10 md:pb-72 text-center text-[#141414]"
        style={{ background: LIGHT }}
      >
        <div className="w-full">
          <p
            className={`${lineBottom} ${script} font-suo ml-12 text-4xl leading-none`}
          >
            That&apos;s all
          </p>
          <p
            className={`${lineBottom} py-0.5 font-synt text-sm md:text-lg leading-none`}
          >
            Get in touch
          </p>
        </div>

        <h1
          className={`${lineTop} mt-6 sm:mt-8 w-full font-feat uppercase leading-[1.3] tracking-[0.2] font-bold text-[clamp(20px,7vw,32px)] sm:text-[clamp(40px,8vw,120px)]`}
        >
          {["Let's build", "Into reality", "together"].map((t) => {
            let idx = 0; // index huruf berurutan per baris, dipakai untuk stagger
            return (
              <span
                key={t}
                className={`${hoverLine} ${lineBottom} flash-line`}
                aria-label={t}
              >
                {t.split(" ").map((word, w) => (
                  <span
                    key={w}
                    className="inline-block whitespace-nowrap"
                    aria-hidden="true"
                  >
                    {word.split("").map((ch) => (
                      <span
                        key={idx}
                        className="flash-char"
                        data-char={ch}
                        style={{ "--i": idx++ } as CSSProperties}
                      >
                        {ch}
                      </span>
                    ))}
                    {"\u00A0"}
                  </span>
                ))}
              </span>
            );
          })}
        </h1>
      </section>

      {/* FOOTER (kecil, gelap + edge) */}
      <Footer />
    </main>
  );
}
