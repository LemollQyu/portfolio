export type TerminalCardProps = {
  title?: string;
  gif?: string; // opsional, contoh: "/cat-dance.gif"
  className?: string;
};

const COMMANDS: { cmd: string; out: string[]; hideOnMobile?: boolean }[] = [
  {
    cmd: "whoami",
    out: ["Informatics Engineering Graduate (S.Kom.) | Fullstack Developer"],
  },
  {
    cmd: "ls interests/",
    out: ["Development/Software_Architecture/AI"],
  },
  {
    cmd: "ls skills/",
    hideOnMobile: true, // hilang di mobile, muncul di md ke atas
    out: [
      "database/mysql/postgresql/redis",
      "javascript/react/next.js",
      "javascript/vue/nuxt.js",
      "golang/gofiber",
      "php/laravel",
      "node.js/express.js",
      "rest_api/microservices",
      "git/linux/docker",
      "tailwind_css/bootstrap",
    ],
  },
];

// const COMMANDS: { cmd: string; out: string }[] = [
//   {
//     cmd: "whoami",
//     out: "Informatics Engineering Graduate (S.Kom.) | Fullstack Developer",
//   },
//   {
//     cmd: "ls interests/",
//     out: "Development/Software_Architecture/AI",
//   },
//   {
//     cmd: "ls skills/",
//     // dipisah dua spasi; whitespace-pre-wrap menjaga jarak dan tetap boleh turun baris
//     out: "database/mysql/postgresql/redis  javascript/react/next.js  javascript/vue/nuxt.js  golang/gofiber  php/laravel  node.js/express.js  rest_api/microservices  git/linux/docker  tailwind_css/bootstrap",
//   },
// ];

export default function TerminalCard({
  title = "annas — zsh",
  gif,
  className,
}: TerminalCardProps) {
  return (
    <div className={`w-full font-mono md:w-fit max-w-full ${className ?? ""}`}>
      <div
        className="w-full overflow-hidden rounded-lg border border-stone-200 bg-white
                   shadow-[0_4px_20px_rgba(0,0,0,0.1)]
                   transition-transform duration-300 hover:scale-[1.03]"
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between border-b border-stone-200 px-3 py-2"
          style={{ background: "linear-gradient(to bottom, #FAFAF9, #F0EFED)" }}
        >
          <div className="flex items-center gap-1.5">
            <div className="h-[9px] w-[9px] rounded-full border border-[#E0443E] bg-[#FF5F57]" />
            <div className="h-[9px] w-[9px] rounded-full border border-[#DEA123] bg-[#FEBC2E]" />
            <div className="h-[9px] w-[9px] rounded-full border border-[#1AAB29] bg-[#28C840]" />
          </div>
          <span className="select-none text-[10px] text-stone-400">
            {title}
          </span>
          <div className="w-[40px]" />
        </div>

        {/* Body */}
        <div className="min-h-[80px] p-3 font-mono text-[11px] leading-[1.7]">
          {COMMANDS.map((c) => (
            <div
              key={c.cmd}
              className={`mb-1 ${c.hideOnMobile ? "hidden md:block" : ""}`}
            >
              <div className="whitespace-nowrap text-stone-800">
                <span className="text-emerald-600">~</span> $ {c.cmd}
              </div>
              <div className="flex min-w-0 flex-wrap gap-x-3 text-stone-500 [overflow-wrap:anywhere]">
                {c.out.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}

          {gif && (
            <div className="mt-1 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={gif} alt="" draggable={false} className="h-[70px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
