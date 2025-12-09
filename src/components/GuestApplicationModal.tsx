/**
 * @file GuestApplicationModal.tsx
 * @description Modal form for guest applications. Inserts to guest_applications table and triggers notification emails.
 * @dependencies supabase, Dialog, notify-guest-application edge function, zod
 */

import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

// Client-side validation schema
const applicationSchema = z.object({
  full_name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  title_company: z.string().trim().max(200, "Title is too long").optional(),
  topic_pitch: z.string().trim().min(1, "Topic pitch is required").max(2000, "Pitch is too long"),
  social_link: z.string().trim().url("Please enter a valid URL").max(500, "URL is too long").optional().or(z.literal("")),
});

interface GuestApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GuestApplicationModal = ({
  open,
  onOpenChange,
}: GuestApplicationModalProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    title_company: "",
    topic_pitch: "",
    social_link: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    const validation = applicationSchema.safeParse(formData);
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: "Validation error",
        description: firstError?.message || "Please check your input",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const insertData = {
        full_name: validation.data.full_name,
        email: validation.data.email,
        title_company: validation.data.title_company || null,
        topic_pitch: validation.data.topic_pitch,
        social_link: validation.data.social_link || null,
      };

      const { error } = await supabase
        .from("guest_applications")
        .insert(insertData);

      if (error) throw error;

      // Trigger email notifications
      const { error: fnError } = await supabase.functions.invoke("notify-guest-application", {
        body: validation.data,
      });

      if (fnError) {
        console.error("Email notification error:", fnError);
      }

      toast({
        title: "Application submitted! 🚀",
        description: "Thanks for applying. We'll review your pitch and be in touch soon.",
      });

      setFormData({
        full_name: "",
        email: "",
        title_company: "",
        topic_pitch: "",
        social_link: "",
      });
      
      onOpenChange(false);
    } catch (error: any) {
      console.error("Application submit error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Apply to Be a <span className="text-gradient">Guest</span>
          </DialogTitle>
          <DialogDescription>
            Share your story and expertise with The Builder Economy community
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name *</Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
              placeholder="Your name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title_company">Title and Company</Label>
            <Input
              id="title_company"
              value={formData.title_company}
              onChange={(e) =>
                setFormData({ ...formData, title_company: e.target.value })
              }
              placeholder="e.g., Founder at BuilderCo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic_pitch">Your Best Topic Pitch *</Label>
            <Textarea
              id="topic_pitch"
              value={formData.topic_pitch}
              onChange={(e) =>
                setFormData({ ...formData, topic_pitch: e.target.value })
              }
              placeholder="Describe your topic in 2-3 sentences. What unique insights can you share about building with AI?"
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="social_link">Social or Portfolio Link</Label>
            <Input
              id="social_link"
              type="url"
              value={formData.social_link}
              onChange={(e) =>
                setFormData({ ...formData, social_link: e.target.value })
              }
              placeholder="https://twitter.com/yourhandle"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 glow-effect"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
