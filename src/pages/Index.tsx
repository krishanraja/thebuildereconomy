import { useState, lazy, Suspense } from "react";
import { NeuralMesh } from "@/components/NeuralMesh";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

const About = lazy(() => import("@/components/About").then(m => ({ default: m.About })));
const Host = lazy(() => import("@/components/Host").then(m => ({ default: m.Host })));
const GuestCTA = lazy(() => import("@/components/GuestCTA").then(m => ({ default: m.GuestCTA })));
const FeaturedGuests = lazy(() => import("@/components/FeaturedGuests").then(m => ({ default: m.FeaturedGuests })));
const Episodes = lazy(() => import("@/components/Episodes").then(m => ({ default: m.Episodes })));
const Testimonials = lazy(() => import("@/components/Testimonials").then(m => ({ default: m.Testimonials })));
const Subscribe = lazy(() => import("@/components/Subscribe").then(m => ({ default: m.Subscribe })));
const WhoBuilds = lazy(() => import("@/components/WhoBuilds").then(m => ({ default: m.WhoBuilds })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const GuestApplicationModal = lazy(() => import("@/components/GuestApplicationModal").then(m => ({ default: m.GuestApplicationModal })));

const Index = () => {
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <NeuralMesh />
      <Header />

      <main>
        <Hero onApplyClick={() => setApplicationModalOpen(true)} />
        <Suspense fallback={null}><About /></Suspense>
        <Suspense fallback={null}><Host /></Suspense>
        <Suspense fallback={null}>
          <GuestCTA onApplyClick={() => setApplicationModalOpen(true)} />
        </Suspense>
        <Suspense fallback={null}><FeaturedGuests /></Suspense>
        <Suspense fallback={null}><Episodes /></Suspense>
        <Suspense fallback={null}><Testimonials /></Suspense>
        <Suspense fallback={null}><Subscribe /></Suspense>
        <Suspense fallback={null}><WhoBuilds /></Suspense>
      </main>

      <Suspense fallback={null}><Footer /></Suspense>

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
