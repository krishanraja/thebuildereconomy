# Voice

How we write copy on The Builder Economy site. If anything in production reads "I'd never say that" out loud, it's wrong.

## Brand vs host

**The Builder Economy** is the brand. **Krish Raja** is the host. **Mindmaker** is the production company.

- The brand is the subject of sentences. Use "The show", "we", "this", or "anyone" — not "Krish talks to" / "Krish interviews" / "I sit down with".
- Krish appears in the host bio and as a credit at the end of a sub. That's it.
- Mindmaker appears once in the header ("A Mindmaker production") and once in the footer. Never as the primary mark.

## Rules

1. **Zero em dashes.** Period, comma, line break, or parentheses. If the sentence needs one to work, the sentence is too long. Applies to source code AND email templates in `supabase/functions/`. Verify with `grep -rn "—" src/ supabase/functions/`.
2. **Concrete over abstract.** Name the show, the guest, the company, the week.
3. **Plainspoken English.** If you wouldn't say it out loud, don't write it.
4. **Ordinary verbs.** Ship, build, talk, ask. Not leverage, unlock, transform.
5. **Short sentences. Then a shorter one. Sometimes one word.**
6. **No "for the people who [verb]" eyebrow templates.**
7. **Buzzwords once, sitewide.** "Receipts" / "operators" / "keynote-speak" appear once total across the page, not per block.
8. **Numbers and names beat adjectives.**
9. **Italic for proper nouns and incidental emphasis. Never for a single keyword in a headline.** The swipe-highlighter-on-one-word treatment is a 2010s tic. One exception remains in the hero (`building.`) by design.

## In voice vs out of voice

| Out of voice | In voice |
|---|---|
| "Everyone can build now. The good ones know how." | "Anyone can build now. This is what they're building." |
| "A podcast for the people building with AI" | "A new podcast · launching 2026" |
| "The show for the operators turning ideas into shipped products — and saying out loud how they actually did it." | "A weekly conversation with the founders, solo operators and first-timers shipping real businesses with AI. Hosted by Krish Raja." |
| "We book builders shipping real products with AI — and willing to be honest about what it actually took." | "We book builders shipping real products with AI. We don't want the keynote version. We want what actually broke, what worked, and what you wish you'd known three months ago." |
| "Krish talks to people building real products with AI." | "Anyone can build now. This is what they're building." |

## Stat copy

Don't render `{episodes.length}` or `{guests.length}` until the count is honest. Pre-launch, use evergreen labels:

- Episodes section: `EP. 01 LANDS SOON` (upgrade to `{n} EPISODES · UPDATED WEEKLY` once n ≥ 3)
- Featured guests section: `SEASON ONE · 2026` (upgrade to `{n} GUESTS · 2026` once n ≥ 5)
- Testimonials section: hidden until 4+ approved testimonials exist

## Voice anchors

The closest written sample of Krish's voice in the repo is the README's "Conversations to inspire a new era where everyone builds with AI." Direct, low-jargon, audience-first. That's the bar.
