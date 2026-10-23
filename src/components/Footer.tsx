import Edge from "./Edge";

export default function Footer() {
  const lineTop =
    "relative before:content-[''] before:absolute before:-inset-x-[100vw] before:bottom-full before:h-px before:bg-current before:opacity-20";
  const lineBottom =
    "relative after:content-[''] after:absolute after:-inset-x-[100vw] after:top-full after:h-px after:bg-current after:opacity-20";
  const lineBoth = `${lineTop} ${lineBottom}`;
  const DARK = "#141414";
  return (
    <footer
      className="relative px-[54px] pb-3 pt-10 text-[#eee]"
      style={{ background: DARK }}
    >
      <Edge color={DARK} cols={8} max={140} range={80} />

      <div
        className={`font-synt ${lineBoth} grid w-full grid-cols-3 items-start gap-2 py-1 text-[clamp(8px,2.4vw,11px)] leading-[1.35] tracking-tight md:tracking-wider  sm:gap-4 md:text-[14px]`}
      >
        <p className="min-w-0 text-left break-words">
          <span className="block opacity-60 uppercase">Development:</span>
          <span className="block">Annas</span>
        </p>

        <p className="min-w-0 text-center break-words">
          <span className="block opacity-60 uppercase">Get in touch</span>
          <a href="mailto:you@email.com" className="block break-all">
            admin@lemoll.site
          </a>
        </p>

        <p className="min-w-0 text-right break-words">
          <span className="block opacity-60 uppercase">Socials</span>
          <a href="https://instagram.com/_aaaanns" className="block break-all">
            @_aaaanns
          </a>
        </p>
      </div>
    </footer>
  );
}
