/**
 * Horizontal auto-scrolling marquee. Pure CSS animation — the @keyframes rule
 * lives in src/index.css so Tailwind's purge never strips it. The items array
 * is duplicated and translated to -50% for a seamless loop.
 */

export type MarqueeTone = "ink" | "ink-deep" | "mint" | "mint-deep" | "cream" | "coral";

interface MarqueeRiverProps {
  items: string[];
  tone?: MarqueeTone;
  speed?: "slow" | "normal" | "fast";
  highlightEvery?: number;
  serif?: boolean;
  className?: string;
}

const toneClass: Record<MarqueeTone, string> = {
  ink: "block-ink",
  "ink-deep": "block-ink-deep",
  mint: "block-mint",
  "mint-deep": "block-mint-deep",
  cream: "block-cream",
  coral: "block-coral",
};

const baseDuration: Record<NonNullable<MarqueeRiverProps["speed"]>, number> = {
  slow: 60,
  normal: 32,
  fast: 18,
};

export const MarqueeRiver = ({
  items,
  tone = "ink",
  speed = "normal",
  highlightEvery = 5,
  serif = false,
  className = "",
}: MarqueeRiverProps) => {
  const duplicated = [...items, ...items];

  return (
    <div className={`w-full overflow-hidden py-5 border-y border-current/10 ${toneClass[tone]} ${className}`}>
      <div
        className="marquee-track flex whitespace-nowrap will-change-transform"
        style={{
          animation: `marquee ${baseDuration[speed]}s linear infinite`,
        }}
      >
        {duplicated.map((item, i) => {
          const isHighlight = highlightEvery > 0 && i % highlightEvery === highlightEvery - 1;
          return (
            <span
              key={`${item}-${i}`}
              className={`inline-flex items-center mx-6 ${
                serif ? "display-serif text-3xl md:text-5xl" : "small-caps text-sm md:text-base font-semibold"
              }`}
            >
              {isHighlight ? <span className="swipe-butter">{item}</span> : item}
              <span className="ml-6 opacity-40">·</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};
