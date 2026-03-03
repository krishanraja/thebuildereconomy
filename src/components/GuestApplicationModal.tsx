/**
 * @file GuestApplicationModal.tsx
 * @description Mobile-first guest application form with 7 fields + email. Full-screen on mobile.
 */

import { useState } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Check } from "lucide-react";

const stages = [
  "Idea",
  "Early build",
  "Launched, pre-revenue",
  "Revenue",
  "Scaling",
] as const;

const applicationSchema = z.object({
  full_name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  linkedin_url: z.string().trim().url("Please enter a valid URL").max(500).optional().or(z.literal("")),
  what_building: z.string().trim().min(1, "Tell us what you're building").max(500),
  how_using_ai: z.string().trim().min(1, "Tell us how you're using AI").max(500),
  surprise_insight: z.string().trim().min(1, "Share something surprising").max(2000),
  stage: z.string().min(1, "Select a stage"),
  product_link: z.string().trim().url("Please enter a valid URL").max(500).optional().or(z.literal("")),
  takeaway: z.string().trim().min(1, "What should listeners walk away knowing?").max(2000),
});

type FormData = z.infer<typeof applicationSchema>;

const initialFormData: FormData = {
  full_name: "",
  email: "",
  linkedin_url: "",
  what_building: "",
  how_using_ai: "",
  surprise_insight: "",
  stage: "",
  product_link: "",
  takeaway: "",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

interface GuestApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GuestApplicationModal = ({ open, onOpenChange }: GuestApplicationModalProps) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const update = (field: keyof FormData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = applicationSchema.safeParse(formData);
    if (!validation.success) {
      toast({
        title: "Please check your answers",
        description: validation.error.errors[0]?.message,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const d = validation.data;
      const { error } = await supabase.from("guest_applications").insert({
        full_name: d.full_name,
        email: d.email,
        linkedin_url: d.linkedin_url || null,
        what_building: d.what_building,
        how_using_ai: d.how_using_ai,
        surprise_insight: d.surprise_insight,
        stage: d.stage,
        product_link: d.product_link || null,
        takeaway: d.takeaway,
      } as any);

      if (error) throw error;

      // Notify admin
      await supabase.functions.invoke("notify-guest-application", {
        body: d,
      }).catch((err) => console.error("Notification error:", err));

      setSubmitted(true);
      setTimeout(() => {
        setFormData(initialFormData);
        setSubmitted(false);
        onOpenChange(false);
      }, 2000);
    } catch (error: any) {
      console.error("Application submit error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-16 gap-4"
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Check className="w-8 h-8 text-primary" />
          </motion.div>
          <p className="text-xl font-semibold text-foreground">Application submitted!</p>
          <p className="text-muted-foreground text-center">We'll review your pitch and be in touch soon.</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 pb-24 md:pb-6"
        >
          <p className="text-sm text-muted-foreground">7 questions · takes about 3 minutes</p>

          {/* 1. Name + Email + LinkedIn */}
          <motion.div variants={fieldVariants} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Name *</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => update("full_name", e.target.value)}
                  placeholder="Your name"
                  className="min-h-[44px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@company.com"
                  className="min-h-[44px]"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input
                id="linkedin_url"
                value={formData.linkedin_url}
                onChange={(e) => update("linkedin_url", e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
                className="min-h-[44px]"
              />
            </div>
          </motion.div>

          {/* 2. What are you building? */}
          <motion.div variants={fieldVariants} className="space-y-2">
            <Label htmlFor="what_building">What are you building? *</Label>
            <p className="text-xs text-muted-foreground">One sentence. Product name, what it does, who it's for.</p>
            <Input
              id="what_building"
              value={formData.what_building}
              onChange={(e) => update("what_building", e.target.value)}
              placeholder="e.g., Copilot for real estate agents that automates listing descriptions"
              className="min-h-[44px]"
              required
            />
          </motion.div>

          {/* 3. How are you using AI? */}
          <motion.div variants={fieldVariants} className="space-y-2">
            <Label htmlFor="how_using_ai">How are you using AI to build or run it? *</Label>
            <Input
              id="how_using_ai"
              value={formData.how_using_ai}
              onChange={(e) => update("how_using_ai", e.target.value)}
              placeholder="Be specific — what models, tools, or workflows?"
              className="min-h-[44px]"
              required
            />
          </motion.div>

          {/* 4. Surprise insight */}
          <motion.div variants={fieldVariants} className="space-y-2">
            <Label htmlFor="surprise_insight">
              What's one thing about building with AI that surprised you — that most people aren't talking about? *
            </Label>
            <Textarea
              id="surprise_insight"
              value={formData.surprise_insight}
              onChange={(e) => update("surprise_insight", e.target.value)}
              rows={4}
              className="min-h-[100px] resize-none"
              required
            />
          </motion.div>

          {/* 5. Stage */}
          <motion.div variants={fieldVariants} className="space-y-3">
            <Label>What stage are you at? *</Label>
            <RadioGroup
              value={formData.stage}
              onValueChange={(v) => update("stage", v)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            >
              {stages.map((stage) => (
                <Label
                  key={stage}
                  htmlFor={`stage-${stage}`}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all min-h-[44px] ${
                    formData.stage === stage
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <RadioGroupItem value={stage} id={`stage-${stage}`} />
                  <span className="text-sm">{stage}</span>
                </Label>
              ))}
            </RadioGroup>
          </motion.div>

          {/* 6. Drop a link */}
          <motion.div variants={fieldVariants} className="space-y-2">
            <Label htmlFor="product_link">Drop a link</Label>
            <p className="text-xs text-muted-foreground">Website, app, product — anything live. Optional.</p>
            <Input
              id="product_link"
              value={formData.product_link}
              onChange={(e) => update("product_link", e.target.value)}
              placeholder="https://yourproduct.com"
              className="min-h-[44px]"
            />
          </motion.div>

          {/* 7. Takeaway */}
          <motion.div variants={fieldVariants} className="space-y-2">
            <Label htmlFor="takeaway">
              What would you want someone to walk away knowing after your episode? *
            </Label>
            <Textarea
              id="takeaway"
              value={formData.takeaway}
              onChange={(e) => update("takeaway", e.target.value)}
              rows={4}
              className="min-h-[100px] resize-none"
              required
            />
          </motion.div>

          {/* Submit — sticky on mobile */}
          <motion.div
            variants={fieldVariants}
            className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border md:relative md:p-0 md:bg-transparent md:border-0 md:backdrop-blur-none z-50"
          >
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 glow-effect min-h-[48px] text-base"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </motion.div>
        </motion.form>
      )}
    </AnimatePresence>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[95vh] overflow-y-auto rounded-t-2xl px-5 pt-6">
          <SheetHeader className="text-left mb-4">
            <SheetTitle className="text-2xl font-bold">
              Apply to Be a <span className="text-gradient">Guest</span>
            </SheetTitle>
          </SheetHeader>
          {formContent}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Apply to Be a <span className="text-gradient">Guest</span>
          </DialogTitle>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
};
