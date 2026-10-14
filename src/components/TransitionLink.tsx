"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { usePageTransition } from "./PageTransition";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

export default function TransitionLink({ href, onClick, ...rest }: Props) {
  const { navigate } = usePageTransition();

  return (
    <Link
      className="font-synt"
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        // biarkan ctrl/cmd+klik, tab baru, dan link eksternal bekerja normal
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
          return;
        if (/^https?:\/\//.test(href) || rest.target === "_blank") return;

        e.preventDefault();
        navigate(href);
      }}
    />
  );
}
