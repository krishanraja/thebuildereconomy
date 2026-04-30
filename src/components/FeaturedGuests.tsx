/**
 * @file FeaturedGuests.tsx
 * @description Editorial roster. Each guest is a row with name in oversized
 * display serif. On hover the guest's portrait floats next to the cursor
 * (signature colinandsamir-style interaction). Falls back to a stacked grid
 * on small screens.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Img } from "@/lib/images";
import { guestPortrait } from "@/data/guests";

type Guest = {
  id: string;
  name: string;
  title?: string | null;
  photo_url?: string | null;
  quote?: string | null;
};

export const FeaturedGuests = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { data: guests } = useQuery({
    queryKey: ["featured-guests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("approved", true)
        .limit(8);
      if (error) throw error;
      return data as Guest[];
    },
    enabled: isInView,
  });

  if (!guests || guests.length === 0) return null;

  return (
    <section ref={ref} className="block-ink relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-36">
        <div className="flex items-end justify-between mb-12 md:mb-16 gap-6 flex-wrap">
          <div>
            <div className="eyebrow text-mint mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-mint" />
              <span>Who&apos;s been on</span>
            </div>
            <h2 className="display-serif text-cream text-[clamp(3rem,8vw,7rem)] leading-[0.92]">
              The roster.
            </h2>
          </div>
          <p className="text-cream/60 small-caps text-xs">
            {guests.length} BUILDERS · 2026
          </p>
        </div>

        {/* Desktop: editorial roster with cursor-following preview */}
        <div className="hidden md:block">
          <RosterList guests={guests} />
        </div>

        {/* Mobile: stacked rows with inline portrait */}
        <div className="md:hidden divide-y divide-cream/10 border-y border-cream/10">
          {guests.map((g) => (
            <div key={g.id} className="flex items-center gap-4 py-5">
              <div className="w-16 h-20 shrink-0 overflow-hidden">
                <Img
                  src={guestPortrait(g.name)}
                  fallbackSrc={g.photo_url ?? undefined}
                  alt={g.name}
                  fallbackTone="ink-deep"
                  fallbackLabel={g.name.split(" ").map((s) => s[0]).join("")}
                  wrapperClassName="absolute inset-0"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="display-serif text-cream text-2xl leading-tight">{g.name}</p>
                {g.title && <p className="small-caps text-[10px] text-butter mt-1">{g.title}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface RosterListProps {
  guests: Guest[];
}

const RosterList = ({ guests }: RosterListProps) => {
  const [active, setActive] = useState<Guest | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!previewRef.current) return;
      previewRef.current.style.transform = `translate3d(${e.clientX + 24}px, ${e.clientY - 60}px, 0)`;
    };
    if (active) {
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }
  }, [active]);

  return (
    <div className="relative">
      <ul className="divide-y divide-cream/10 border-y border-cream/10">
        {guests.map((g, i) => (
          <li key={g.id}>
            <button
              type="button"
              onMouseEnter={() => setActive(g)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(g)}
              onBlur={() => setActive(null)}
              className="group w-full flex items-baseline justify-between gap-6 py-7 text-left transition-colors hover:bg-cream/[0.03]"
            >
              <span className="flex items-baseline gap-6 min-w-0">
                <span className="small-caps text-xs text-cream/40 tabular-nums shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display-serif text-cream text-[clamp(2.25rem,5vw,4.5rem)] leading-none truncate transition-transform group-hover:translate-x-2">
                  {g.name}
                </span>
              </span>
              <span className="small-caps text-[10px] text-butter opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                {g.title ?? "GUEST"}
                <span className="ml-2 inline-block">→</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Cursor-following preview */}
      <AnimatePresence>
        {active && (
          <motion.div
            ref={previewRef}
            key={active.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none fixed top-0 left-0 z-50 w-[280px] aspect-[4/5]"
            data-cursor="grow"
          >
            <Img
              src={guestPortrait(active.name)}
              fallbackSrc={active.photo_url ?? undefined}
              alt={active.name}
              fallbackTone="ink-deep"
              fallbackLabel={active.name.split(" ").map((s) => s[0]).join("")}
              wrapperClassName="absolute inset-0 shadow-brutal-mint border border-cream/20"
              className="absolute inset-0 w-full h-full object-cover shadow-brutal-mint border border-cream/20"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
