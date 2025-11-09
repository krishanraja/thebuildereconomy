import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Play } from "lucide-react";

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
      return data;
    },
  });

  if (!episodes || episodes.length === 0) return null;

  return (
    <section ref={ref} className="py-24 px-4 relative">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          Recent <span className="text-gradient">Episodes</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {episodes.map((episode, index) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 group">
                {episode.cover_image_url && (
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={episode.cover_image_url}
                      alt={episode.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{episode.title}</h3>
                  
                  {episode.subtitle && (
                    <p className="text-sm text-muted-foreground mb-3">{episode.subtitle}</p>
                  )}
                  
                  {episode.guest_name && (
                    <p className="text-sm text-primary mb-3">
                      with {episode.guest_name}
                      {episode.guest_title && ` · ${episode.guest_title}`}
                    </p>
                  )}
                  
                  {episode.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {episode.description}
                    </p>
                  )}
                  
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => window.open(episode.episode_url, "_blank")}
                  >
                    Listen Now
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
