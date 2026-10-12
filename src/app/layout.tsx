import localFont from "next/font/local";
import "./globals.css";
import Sidebars from "@/components/Sidebars";
import CursorTrail from "@/components/CursorTrail";

const suo = localFont({
  src: "../../public/fonts/suo-4.woff2",
  variable: "--font-suo-src",
});

const synt = localFont({
  src: "../../public/fonts/synt-4.woff2",
  variable: "--font-synt-src",
});

const feat = localFont({
  src: "../../public/fonts/feat-4.woff2",
  variable: "--font-feat-src",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${suo.variable} ${synt.variable} ${feat.variable}`}
    >
      <body className="">
        <CursorTrail />
        <Sidebars />
        {children}
      </body>
    </html>
  );
}
