import { useState } from "react";
import { NeuralMesh } from "@/components/NeuralMesh";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { FeaturedGuests } from "@/components/FeaturedGuests";
import { Episodes } from "@/components/Episodes";
import { Testimonials } from "@/components/Testimonials";
import { Subscribe } from "@/components/Subscribe";
import { WhoBuilds } from "@/components/WhoBuilds";
import { Footer } from "@/components/Footer";
import { GuestApplicationModal } from "@/components/GuestApplicationModal";

const Index = () => {
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <NeuralMesh />
      
      <main>
        <Hero onApplyClick={() => setApplicationModalOpen(true)} />
        <About />
        <FeaturedGuests />
        <Episodes />
        <Testimonials />
        <Subscribe />
        <WhoBuilds />
      </main>

      <Footer />

      <GuestApplicationModal
        open={applicationModalOpen}
        onOpenChange={setApplicationModalOpen}
      />
    </div>
  );
};

export default Index;
