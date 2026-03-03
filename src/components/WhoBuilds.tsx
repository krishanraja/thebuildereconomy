/**
 * @file WhoBuilds.tsx
 * @description Horizontal marquee ticker of builder tags for the hero section.
 */

const tags = [
  "Founders",
  "Creators",
  "Investors",
  "Futurists",
  "Builders",
  "Engineers",
  "Designers",
  "Researchers",
  "Innovators",
  "Visionaries",
];

export const WhoBuilds = () => {
  const duplicated = [...tags, ...tags];

  return (
    <div className="w-full overflow-hidden py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {duplicated.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="mx-4 text-sm font-medium text-foreground/30 tracking-widest uppercase"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
