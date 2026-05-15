import { useState, lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CustomCursor } from "@/components/CustomCursor";
import { MarqueeRiver } from "@/components/MarqueeRiver";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const About = lazy(() => import("@/components/About").then((m) => ({ default: m.About })));
const Host = lazy(() => import("@/components/Host").then((m) => ({ default: m.Host })));
const GuestCTA = lazy(() => import("@/components/GuestCTA").then((m) => ({ default: m.GuestCTA })));
const FeaturedGuests = lazy(() => import("@/components/FeaturedGuests").then((m) => ({ default: m.FeaturedGuests })));
const Episodes = lazy(() => import("@/components/Episodes").then((m) => ({ default: m.Episodes })));
const Testimonials = lazy(() => import("@/components/Testimonials").then((m) => ({ default: m.Testimonials })));
const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));
const GuestApplicationModal = lazy(() =>
  import("@/components/GuestApplicationModal").then((m) => ({ default: m.GuestApplicationModal })),
);

// Status ticker. Says what the show is, not who's been on it (the show hasn't
// aired yet — name-drops from prior projects would read as bragging).
const STATUS_RIVER = [
  "A new podcast",
  "Launching 2026",
  "New episode every Tuesday",
  "Built with AI",
  "Shipped this week",
  "On the record",
];

const Index = () => {
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <CustomCursor />
      <Header />

      <main>
        <Hero onApplyClick={() => setApplicationModalOpen(true)} />

        <MarqueeRiver items={STATUS_RIVER} tone="ink-deep" speed="slow" highlightEvery={3} serif />

        <ErrorBoundary>
          <Suspense fallback={null}>
            <About />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={null}>
            <Host />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={null}>
            <GuestCTA onApplyClick={() => setApplicationModalOpen(true)} />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={null}>
            <FeaturedGuests />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={null}>
            <Episodes />
          </Suspense>
        </ErrorBoundary>

        {/* Hidden until 4+ approved testimonials exist in Supabase
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Testimonials />
          </Suspense>
        </ErrorBoundary>
        */}
      </main>

      <ErrorBoundary>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={null}>
          <GuestApplicationModal
            open={applicationModalOpen}
            onOpenChange={setApplicationModalOpen}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Index;
