import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "./ui/card";
import { Quote } from "lucide-react";

export const FeaturedGuests = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { data: guests } = useQuery({
    queryKey: ["featured-guests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("approved", true)
        .limit(4);
      
      if (error) throw error;
      return data;
    },
  });

  if (!guests || guests.length === 0) return null;

  return (
    <section ref={ref} className="py-24 px-4 relative">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          Featured <span className="text-gradient">Guests</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guests.map((guest, index) => (
            <motion.div
              key={guest.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 h-full">
                {guest.photo_url && (
                  <img
                    src={guest.photo_url}
                    alt={guest.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                )}
                
                <h3 className="text-xl font-bold text-center mb-2">{guest.name}</h3>
                {guest.title && (
                  <p className="text-sm text-muted-foreground text-center mb-4">{guest.title}</p>
                )}
                
                {guest.quote && (
                  <div className="relative mt-4">
                    <Quote className="w-6 h-6 text-primary/30 mb-2" />
                    <p className="text-sm text-muted-foreground italic">{guest.quote}</p>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
