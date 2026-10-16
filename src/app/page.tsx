import HangingBadge from "@/components/HangingBadge";
import VinylCard from "@/components/VinylCard";
import KraftScrapbook from "@/components/KraftScrapbook";
import DeskPaper from "@/components/DeskPapper"; // samakan dengan nama file
import FolderStickers from "@/components/FolderStickers";
import CameraSticker from "@/components/Cameras";
import HangingPadlock from "@/components/Key";

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

        {/* Kertas meja */}
        <div
          className="relative z-10 w-[clamp(280px,88vw,460px)] rotate-2
                     md:absolute md:top-10 md:left-1/2 md:-translate-x-1/2 md:rotate-3
                     md:w-[clamp(300px,46vw,680px)]"
        >
          <DeskPaper className="w-full" />
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
    </>
  );
}
