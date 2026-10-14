import HangingBadge from "@/components/HangingBadge";
import VinylCard from "@/components/VinylCard";

export default function Home() {
  return (
    <main className="relative md:pr-[260px]">
      <div className="absolute right-10 top-0 origin-top-right scale-[0.6] md:right-10 md:scale-100 [clip-path:inset(0_-200px_-1000px_-200px)]">
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
      <VinylCard className="absolute right-10 top-[420px] font-synt" href="#" />
    </main>
  );
}
