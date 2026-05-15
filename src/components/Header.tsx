/**
 * @file Header.tsx
 * @description Fixed header. Builder Economy mark left, "A Mindmaker production"
 * producer credit immediately to its right. Fades on scroll past 50px.
 */

import { useEffect, useState } from "react";
import mindmakerLogo from "@/assets/mindmaker-logo.png";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-5 transition-opacity duration-300 ${
        scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-4 md:gap-5">
        {/* Builder Economy primary mark */}
        <a href="/" className="block shrink-0" aria-label="The Builder Economy">
          <img
            src="/builder4.png"
            alt="The Builder Economy"
            className="h-9 md:h-12 w-auto"
            loading="eager"
            fetchPriority="high"
          />
        </a>

        {/* Producer credit lockup. The Mindmaker mark sits inline in place of
            the word — "A [mark] production" — so the word never has to appear.
            The PNG has the icon in the bottom-left quadrant of a 1200x630 canvas
            with empty whitespace around it; the background-image crop below
            zooms into just the icon so it reads at a useful size. */}
        <a
          href="https://www.themindmaker.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-3 pl-4 md:pl-5 border-l border-cream/20 group opacity-70 hover:opacity-100 transition-opacity"
          aria-label="A Mindmaker production"
        >
          <span className="small-caps text-[11px] md:text-[13px] text-cream tracking-[0.2em]">A</span>
          <span
            className="inline-block h-9 md:h-11 aspect-square bg-no-repeat"
            style={{
              backgroundImage: `url(${mindmakerLogo})`,
              backgroundSize: "auto 320%",
              backgroundPosition: "11% 53%",
            }}
            role="img"
            aria-label="Mindmaker"
          />
          <span className="small-caps text-[11px] md:text-[13px] text-cream tracking-[0.2em]">production</span>
        </a>
      </div>
    </header>
  );
};
