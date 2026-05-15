/**
 * @file Episodes.tsx
 * @description Cream block. Solid ink cards with brutal offset shadow on hover.
 * Cover art tilts on mouse-move (mouse-pos → CSS variables). Latest episode
 * gets a butter "NEW" pill and mint accent line.
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowUpRight } from "lucide-react";
import { Img } from "@/lib/images";

type Episode = {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  guest_name?: string | null;
  guest_title?: string | null;
  episode_url?: string | null;
  cover_image_url?: string | null;
  episode_number?: number | null;
};

export const Episodes = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { data: episodes } = useQuery({
    queryKey: ["episodes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("episodes")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data as Episode[];
    },
    enabled: isInView,
  });

  if (!episodes || episodes.length === 0) return null;

  return (
    <section ref={ref} className="block-cream relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-36">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 md:mb-16">
          <div>
            <div className="eyebrow text-coral mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-coral" />
              <span>The tape</span>
            </div>
            <h2 className="display-serif text-ink text-[clamp(3rem,8vw,7rem)] leading-[0.92]">
              Recent <span className="relative inline-block">
                <span className="relative z-10">episodes</span>
                <span className="absolute left-0 right-0 bottom-1 h-2 bg-mint -z-0" />
              </span>.
            </h2>
          </div>
          <p className="small-caps text-xs text-ink/60">
            EP. 01 LANDS SOON
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {episodes.map((episode, index) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.07 }}
            >
              <EpisodeCard episode={episode} isLatest={index === 0} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EpisodeCard = ({ episode, isLatest }: { episode: Episode; isLatest: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${py * -6}deg`);
    el.style.setProperty("--ry", `${px * 8}deg`);
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  const epNo =
    episode.episode_number != null
      ? `EP. ${String(episode.episode_number).padStart(2, "0")}`
      : "EPISODE";

  return (
    <a
      href={episode.episode_url ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          transform: "perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          transition: "transform 200ms ease-out",
        }}
        className="block-ink border border-ink/10 group-hover:-translate-y-1 group-hover:shadow-brutal transition-all duration-200 overflow-hidden reduce-motion-static"
      >
        <div className="relative aspect-video overflow-hidden">
          <Img
            src={episode.cover_image_url}
            alt={episode.title}
            fallbackTone="ink-deep"
            fallbackLabel={epNo}
            wrapperClassName="absolute inset-0"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {isLatest && (
            <span className="absolute top-3 left-3 small-caps text-[10px] bg-butter text-ink px-2 py-1 z-10">
              NEW
            </span>
          )}
          {isLatest && <span className="absolute left-0 right-0 bottom-0 h-1 bg-mint z-10" />}
        </div>

        <div className="p-6">
          <p className="small-caps text-[10px] text-mint mb-3">{epNo}</p>
          <h3 className="display-serif text-cream text-2xl leading-tight mb-3">
            {episode.title}
          </h3>

          {episode.guest_name && (
            <p className="small-caps text-[10px] text-cream/60 mb-3">
              WITH {episode.guest_name}
              {episode.guest_title && ` · ${episode.guest_title}`}
            </p>
          )}

          {episode.description && (
            <p className="text-sm text-cream/70 mb-5 line-clamp-3 leading-relaxed">
              {episode.description}
            </p>
          )}

          <span className="inline-flex items-center gap-1 small-caps text-xs text-mint group-hover:text-cream transition-colors">
            Listen
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </a>
  );
};
