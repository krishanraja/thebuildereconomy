/**
 * @file Subscribe.tsx
 * @description Newsletter subscription form. Inserts to subscribers table and triggers welcome email.
 * @dependencies supabase, framer-motion, send-welcome-email edge function, zod
 */

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

// Client-side validation schema
const subscribeSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email is too long"),
});

export const Subscribe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    const validation = subscribeSchema.safeParse({ email });
    if (!validation.success) {
      toast({
        title: "Invalid email",
        description: validation.error.errors[0]?.message || "Please enter a valid email",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase
        .from("subscribers")
        .insert({ email: validation.data.email });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already subscribed",
            description: "You're already part of The Builder Circle!",
          });
        } else {
          throw error;
        }
      } else {
        // Trigger welcome email
        const { error: fnError } = await supabase.functions.invoke("send-welcome-email", {
          body: { email: validation.data.email },
        });
        
        if (fnError) {
          console.error("Welcome email error:", fnError);
        }
        
        toast({
          title: "Welcome to The Builder Circle! 🎉",
          description: "Check your email for a welcome message and top episodes.",
        });
        setEmail("");
      }
    } catch (error: any) {
      console.error("Subscribe error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ref} className="py-24 px-4 relative">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="glow-effect rounded-2xl p-12 bg-card/50 backdrop-blur border border-primary/20">
          <Mail className="w-16 h-16 text-primary mx-auto mb-6" />
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Join The <span className="text-gradient">Builder Circle</span>
          </h2>
          
          <p className="text-muted-foreground mb-8">
            Get exclusive insights, early access to episodes, and join a community 
            of pioneers building the future with AI
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background/50 border-border focus:border-primary"
              disabled={loading}
            />
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="bg-primary hover:bg-primary/90 glow-effect"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};
