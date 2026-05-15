/**
 * @file Footer.tsx
 * @description Ink-deep block. Oversized full-width display serif wordmark.
 * Cream pill links with coral hover. Small print bottom-right.
 */

import { Music2, Youtube, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="block-ink-deep relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-10">
        {/* Oversized wordmark */}
        <div className="border-t border-cream/15 pt-10 md:pt-14 mb-12 md:mb-16">
          <h3 className="display-serif text-cream text-[clamp(3.5rem,15vw,15rem)] leading-[0.85] tracking-tight text-balance">
            THE{" "}
            <span className="relative inline-block">
              <span className="relative z-10">BUILDER</span>
              <span className="absolute left-0 right-0 bottom-2 md:bottom-4 h-2 md:h-3 bg-mint -z-0" />
            </span>
            <br />
            ECONOMY.
          </h3>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-between items-start md:items-end">
          {/* Tagline + small print */}
          <div className="space-y-4 max-w-md">
            <p className="small-caps text-xs text-cream/60">
              A SHOW BY KRISH RAJA · A MINDMAKER PRODUCTION · NEW YORK · 2026
            </p>
            <p className="text-cream/40 text-xs">
              © {new Date().getFullYear()} The Builder Economy. All rights reserved. A Mindmaker LLC product.
            </p>
          </div>

          {/* Social pill links */}
          <nav className="flex flex-wrap gap-3" aria-label="Social">
            {[
              {
                href: "https://open.spotify.com",
                label: "Spotify",
                Icon: Music2,
              },
              {
                href: "https://youtube.com",
                label: "YouTube",
                Icon: Youtube,
              },
              {
                href: "https://www.linkedin.com/in/krish-raja/",
                label: "LinkedIn",
                Icon: Linkedin,
              },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-cream/30 px-4 py-2 small-caps text-xs text-cream hover:border-coral hover:text-coral hover:-translate-y-0.5 transition-all"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
