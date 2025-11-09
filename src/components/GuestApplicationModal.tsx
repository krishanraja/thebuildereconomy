import { useState } from "react";
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
    
    if (!formData.full_name || !formData.email || !formData.topic_pitch) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("guest_applications")
        .insert(formData);

      if (error) throw error;

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
