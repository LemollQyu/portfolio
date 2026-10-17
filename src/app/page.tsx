import HangingBadge from "@/components/HangingBadge";
import VinylCard from "@/components/VinylCard";
import KraftScrapbook from "@/components/KraftScrapbook";
import DeskPaper from "@/components/DeskPapper"; // samakan dengan nama file
import FolderStickers from "@/components/FolderStickers";
import CameraSticker from "@/components/Cameras";
import HangingPadlock from "@/components/Key";
import TerminalCard from "@/components/TerminalCard";
import StickyNote from "@/components/StickyNote";
import FinderWindow from "@/components/FinderWindow";

export default function Home() {
  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-[url('/bg-home.webp')] bg-cover bg-center bg-no-repeat"
      />

      {/*
        MOBILE (< md), urutan dari atas:
          1. Badge (menggantung)
          2. Baris: Music box (kiri) + Folder (kanan)
          3. DeskPaper
          4. Scrapbook
        DESKTOP (>= md): layout absolute seperti sebelumnya.
      */}
      <main
        className="relative min-h-screen overflow-x-hidden
                   flex flex-col items-center gap-10 px-4 pb-20 pt-[330px]
                   sm:pt-[360px]
                   md:block md:gap-0 md:p-0 md:pr-[260px] md:overflow-visible"
      >
        {/* Badge */}
        <div
          className="absolute top-0 right-1/3  origin-top scale-[0.7]
                     sm:scale-[0.8]
                     md:left-auto md:right-12 md:translate-x-0 md:origin-top-right md:scale-100
                     md:[clip-path:inset(0_-200px_-1000px_-200px)]"
        >
          <HangingBadge
            name="Annas"
            tagline={
              "Love exploring, building interfaces,\ntelling stories, and refining details."
            }
            strapText="lemoll.site"
            photo="/photo/card.webp"
            hoverPhoto="/photo/card.gif"
            href="/about"
          />
        </div>

        {/* Baris music box + folder (mobile). Di desktop wrapper ini "hilang" (contents)
            sehingga anak-anaknya tetap absolute terhadap <main>. */}
        <div className="flex w-full max-w-[460px] px-4  items-center justify-between gap-4 md:contents">
          <VinylCard
            className="relative shrink-0 font-synt
                       md:absolute md:right-12 md:top-[400px]"
            href="#"
          />

          <div
            className="relative w-[140px] z-30  shrink-0 rotate-3
                       sm:w-[160px]
                       md:absolute md:top-55 md:left-20 md:rotate-4"
          >
            <FolderStickers />
          </div>
        </div>

        {/* Headline utama */}
        <h1
          className="md:text-9xl font-medium tracking-wide sm:text-8xl text-6xl
             absolute md:top-3/5 sm:top-[40%] top-[40%]
             -translate-y-1/2 left-1/2 -translate-x-1/2 font-suo"
        >
          <style>{`
    .wt-wrap { position: relative; display: inline-block; padding-bottom: 0.12em; }

    .wt-text {
      display: inline-block;
      -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 40%, transparent 55%);
              mask-image: linear-gradient(90deg, #000 0%, #000 40%, transparent 55%);
      -webkit-mask-size: 250% 100%;
              mask-size: 250% 100%;
      -webkit-mask-repeat: no-repeat;
              mask-repeat: no-repeat;
      -webkit-mask-position: 100% 0;
              mask-position: 100% 0;
      animation: wt-write 2.4s cubic-bezier(0.45, 0.05, 0.35, 1) 0.3s forwards;
      text-shadow: 0 2px 0 rgba(0, 0, 0, 0.12), 0 10px 24px rgba(0, 0, 0, 0.18);
    }

    .wt-line {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0.14em;
      overflow: visible;
      pointer-events: none;
    }
    .wt-line path {
      fill: none;
      stroke: currentColor;
      stroke-width: 3;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      opacity: 0.85;
      animation: wt-draw 0.9s ease-out 2.5s forwards;
    }

    @keyframes wt-write {
      to {
        -webkit-mask-position: 0 0;
                mask-position: 0 0;
      }
    }
    @keyframes wt-draw {
      to { stroke-dashoffset: 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .wt-text { animation: none; -webkit-mask-position: 0 0; mask-position: 0 0; }
      .wt-line path { animation: none; stroke-dashoffset: 0; }
    }
  `}</style>

          <span className="wt-wrap">
            <span className="wt-text">Lemoll</span>
            <svg
              className="wt-line"
              viewBox="0 0 300 20"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                pathLength={1}
                d="M4 12 C 45 3, 80 19, 125 10 S 200 4, 296 11"
              />
            </svg>
          </span>
        </h1>

        {/* Kertas meja */}
        <div
          className="relative sm:mt-0 mt-10 z-10 w-[clamp(280px,88vw,460px)] rotate-2
             md:absolute md:top-10 md:left-1/2 md:-translate-x-1/2 md:rotate-3
             md:w-[clamp(300px,46vw,680px)]"
        >
          <DeskPaper className="w-full" />
        </div>

        <div
          className="relative z-20 w-[calc(100%-3rem)] max-w-[360px] shrink-0 mx-3
             md:absolute md:-bottom-10 md:left-[29%] md:right-auto md:mx-0
             md:w-fit md:max-w-[calc(50vw-2rem)]"
        >
          <TerminalCard title="lemoll — zsh" />
        </div>

        {/* Scrapbook */}
        <div className="relative z-0 w-full max-w-[560px] md:max-w-none md:w-auto">
          <KraftScrapbook />
        </div>
        <div className="absolute md:right-60 right-28  z-20 rotate-12 w-[clamp(140px,15vw,230px)] md:block lg:right-[300px] top-60">
          <CameraSticker />
        </div>

        <div
          className="absolute z-10 top-24 right-12
             md:top-16 md:left-28 md:right-auto
             lg:left-32"
        >
          <HangingPadlock
            src="/asset/key.png"
            href="/ssstt"
            width="clamp(100px, 12vw, 220px)"
          />
        </div>
      </main>

      <section
        className="relative z-0 flex min-h-[70vh] mt-10 items-center justify-center
             px-12 pb-24 pt-32 md:pt-40"
      >
        <div className="w-[clamp(240px,40vw,440px)]">
          <StickyNote rotate={-3} />
        </div>
      </section>

      <section className="relative z-0 px-6 pb-24 pt-32 md:pt-40">
        <FinderWindow user="lemoll" />
      </section>
    </>
  );
}
