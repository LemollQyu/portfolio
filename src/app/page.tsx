import HangingBadge from "@/components/HangingBadge";
import VinylCard from "@/components/VinylCard";
import KraftScrapbook from "@/components/KraftScrapbook";

export default function Home() {
  return (
    <>
      {/* Layer background: selalu menutupi layar, tidak tergantung tinggi konten */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-[url('/bg-home.webp')] bg-cover bg-center bg-no-repeat"
      />

      <main
        className="relative min-h-screen overflow-x-hidden
                   flex flex-col items-center gap-10 px-4 pb-16 pt-[340px]
                   md:block md:p-0 md:pr-[260px] md:overflow-visible"
      >
        <div className="absolute right-8 top-0 origin-top-right scale-[0.6] sm:right-1/4 lg:right-12 md:scale-100 [clip-path:inset(0_-200px_-1000px_-200px)]">
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

        <KraftScrapbook />

        <VinylCard
          className="absolute left-14 sm:left-1/4 top-4 font-synt md:left-auto md:right-12 md:top-[400px]"
          href="#"
        />
      </main>
    </>
  );
}
