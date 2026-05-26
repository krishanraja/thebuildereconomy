/**
 * @file Header.tsx
 * @description Fixed header. Builder Economy mark left, "A Mindmaker production"
 * producer credit immediately to its right. Fades on scroll past 50px.
 */

import { useEffect, useState } from "react";

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
            src="/tbe-green-3.png"
            alt="The Builder Economy"
            className="h-14 md:h-20 w-auto"
            loading="eager"
            fetchPriority="high"
          />
        </a>

        {/* Producer credit lockup. The Mindmaker mark sits inline in place of
            the word — "A [mark] production" — so the word never has to appear. */}
        <a
          href="https://www.themindmaker.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-3 pl-4 md:pl-5 border-l border-cream/20 group opacity-70 hover:opacity-100 transition-opacity"
          aria-label="A Mindmaker production"
        >
          <span className="small-caps text-[11px] md:text-[13px] text-cream tracking-[0.2em]">A</span>
          <img
            src="/mmicon.png"
            alt="Mindmaker"
            className="h-6 md:h-8 w-auto"
            loading="eager"
          />
          <span className="small-caps text-[11px] md:text-[13px] text-cream tracking-[0.2em]">production</span>
        </a>
      </div>
    </header>
  );
};
