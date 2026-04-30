import { useState, lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CustomCursor } from "@/components/CustomCursor";
import { MarqueeRiver } from "@/components/MarqueeRiver";

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

// Editorial rivers between sections — each carries a different rhythm.
const HERO_RIVER = [
  "FOUNDERS",
  "CREATORS",
  "INVESTORS",
  "OPERATORS",
  "BUILDERS",
  "ENGINEERS",
  "DESIGNERS",
  "WEIRDOS",
  "OUTSIDERS",
  "2026",
];

const ABOUT_RIVER = [
  "Built with AI",
  "Shipped this week",
  "No keynote-speak",
  "The receipts",
  "Ship it",
  "Talk to us",
];

const ROSTER_RIVER = [
  "ON TAPE",
  "ON RECORD",
  "ON THE SHOW",
  "BUILDING IN PUBLIC",
  "EP. 01 →",
];

const Index = () => {
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <CustomCursor />
      <Header />

      <main>
        <Hero onApplyClick={() => setApplicationModalOpen(true)} />

        <MarqueeRiver items={HERO_RIVER} tone="ink-deep" speed="normal" highlightEvery={5} />

        <Suspense fallback={null}>
          <About />
        </Suspense>

        <MarqueeRiver items={ABOUT_RIVER} tone="cream" speed="slow" highlightEvery={4} serif />

        <Suspense fallback={null}>
          <Host />
        </Suspense>

        <Suspense fallback={null}>
          <GuestCTA onApplyClick={() => setApplicationModalOpen(true)} />
        </Suspense>

        <Suspense fallback={null}>
          <FeaturedGuests />
        </Suspense>

        <MarqueeRiver items={ROSTER_RIVER} tone="ink" speed="fast" highlightEvery={3} />

        <Suspense fallback={null}>
          <Episodes />
        </Suspense>

        <Suspense fallback={null}>
          <Testimonials />
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
