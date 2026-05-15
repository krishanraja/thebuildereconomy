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

        {/* Producer credit lockup */}
        <a
          href="https://www.themindmaker.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 pl-4 md:pl-5 border-l border-cream/20 group"
          aria-label="A Mindmaker production"
        >
          <span className="small-caps text-[10px] text-cream/60 group-hover:text-cream transition-colors">
            A Mindmaker production
          </span>
          <img
            src={mindmakerLogo}
            alt=""
            className="h-5 md:h-6 w-auto opacity-60 group-hover:opacity-100 transition-opacity"
            loading="eager"
          />
        </a>
      </div>
    </header>
  );
};
