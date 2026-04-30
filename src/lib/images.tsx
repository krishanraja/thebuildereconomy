/**
 * Image helper for the editorial redesign.
 *
 * Resolution order:
 *   1. `src` (e.g. /images/host/krish-portrait.jpg)
 *   2. `fallbackSrc` (e.g. an imported asset already in the repo)
 *   3. typographic poster — solid block in the section tone, alt text in display serif
 *
 * This lets the layout ship before real photography is dropped into
 * public/images/. See public/images/README.md for the expected file paths.
 */

import { useState } from "react";

export type ImgTone = "ink" | "ink-deep" | "mint" | "mint-deep" | "cream" | "coral" | "butter";

const toneClass: Record<ImgTone, string> = {
  ink: "block-ink",
  "ink-deep": "block-ink-deep",
  mint: "block-mint",
  "mint-deep": "block-mint-deep",
  cream: "block-cream",
  coral: "block-coral",
  butter: "bg-butter text-ink",
};

interface ImgProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string | null;
  fallbackSrc?: string | null;
  alt: string;
  fallbackTone?: ImgTone;
  fallbackLabel?: string;
  className?: string;
  wrapperClassName?: string;
}

export const Img = ({
  src,
  fallbackSrc,
  alt,
  fallbackTone = "ink",
  fallbackLabel,
  className = "",
  wrapperClassName = "",
  ...rest
}: ImgProps) => {
  // 0 = primary, 1 = fallback img, 2 = typographic poster
  const initial: 0 | 1 | 2 = src ? 0 : fallbackSrc ? 1 : 2;
  const [stage, setStage] = useState<0 | 1 | 2>(initial);

  const handleError = () => {
    setStage((s) => {
      if (s === 0 && fallbackSrc) return 1;
      return 2;
    });
  };

  if (stage === 2) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden text-center px-4 ${toneClass[fallbackTone]} ${wrapperClassName}`}
        role="img"
        aria-label={alt}
      >
        <span className="display-serif text-[clamp(2rem,8vw,5rem)] opacity-90 leading-[0.95] tracking-tight">
          {fallbackLabel ?? alt.split(" ").slice(0, 2).join(" ").toUpperCase()}
        </span>
      </div>
    );
  }

  const resolvedSrc = stage === 0 ? src! : fallbackSrc!;

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      onError={handleError}
      className={className}
      {...rest}
    />
  );
};
