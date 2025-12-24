import { useState, lazy, Suspense } from "react";
import { NeuralMesh } from "@/components/NeuralMesh";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

// Lazy load below-fold components for code splitting
const About = lazy(() => import("@/components/About").then(module => ({ default: module.About })));
const FeaturedGuests = lazy(() => import("@/components/FeaturedGuests").then(module => ({ default: module.FeaturedGuests })));
const Episodes = lazy(() => import("@/components/Episodes").then(module => ({ default: module.Episodes })));
const Testimonials = lazy(() => import("@/components/Testimonials").then(module => ({ default: module.Testimonials })));
const Subscribe = lazy(() => import("@/components/Subscribe").then(module => ({ default: module.Subscribe })));
const WhoBuilds = lazy(() => import("@/components/WhoBuilds").then(module => ({ default: module.WhoBuilds })));
const Footer = lazy(() => import("@/components/Footer").then(module => ({ default: module.Footer })));
const GuestApplicationModal = lazy(() => import("@/components/GuestApplicationModal").then(module => ({ default: module.GuestApplicationModal })));

const Index = () => {
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <NeuralMesh />
      <Header />
      
      <main>
        <Hero onApplyClick={() => setApplicationModalOpen(true)} />
        <Suspense fallback={null}>
          <About />
        </Suspense>
        <Suspense fallback={null}>
          <FeaturedGuests />
        </Suspense>
        <Suspense fallback={null}>
          <Episodes />
        </Suspense>
        <Suspense fallback={null}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={null}>
          <Subscribe />
        </Suspense>
        <Suspense fallback={null}>
          <WhoBuilds />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <Suspense fallback={null}>
        <GuestApplicationModal
          open={applicationModalOpen}
          onOpenChange={setApplicationModalOpen}
        />
      </Suspense>
    </div>
  );
};

export default Index;
