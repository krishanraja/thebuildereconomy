/**
 * @file NotFound.tsx
 * @description Branded catch-all for unknown routes. With the SPA rewrite in
 * `vercel.json`, deep links resolve to the app instead of a raw host 404.
 * Legacy `/ep/*` episode links (from early welcome emails) are redirected to
 * home at the edge; anything else that slips through lands here on-brand.
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="block-ink-deep flex min-h-screen items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="small-caps mb-6 text-xs text-mint">The Builder Economy</p>
        <h1 className="display-serif text-cream text-[clamp(4rem,18vw,12rem)] leading-[0.85] tracking-tight">
          404
        </h1>
        <p className="mt-6 text-lg text-cream/70">
          This page hasn&rsquo;t shipped yet. The show launches in 2026 &mdash; the good
          stuff lives on the home page.
        </p>
        <a
          href="/"
          className="group mt-8 inline-flex items-center gap-2 border border-cream/30 px-5 py-3 small-caps text-xs text-cream transition-all hover:-translate-y-0.5 hover:border-coral hover:text-coral"
        >
          Back to home
        </a>
      </div>
    </main>
  );
};

export default NotFound;
