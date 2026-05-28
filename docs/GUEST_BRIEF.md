# Guest Brief

> The casting spec for The Builder Economy. Read `MANIFESTO.md` first for the
> worldview, then `VOICE.md` for tone. This document is written so a human
> booker **or an AI sourcing agent** can read it and return a ranked list of
> real, contactable guests without further instruction.
>
> Updated: 2026-05-28 · Owner: Krish Raja

---

## How to use this brief

If you are an AI agent sourcing guests:

1. Read `MANIFESTO.md` (the worldview) and this file (the filter).
2. Search the channels in [Where to find them](#where-to-find-them).
3. Score every candidate against [The rubric](#the-rubric). Keep anyone scoring 7+.
4. Drop anyone who trips a [Disqualifier](#disqualifiers), regardless of score.
5. Return results in the [Output format](#output-format-for-an-agent).

Aim for a longlist of 30 to 40 names per request, then cut to a ranked top 10.

---

## The one-line filter

> **A real person who shipped a real product mostly with AI, has the receipts to
> prove it, and will tell you what actually happened instead of the keynote version.**

If a candidate fails any clause of that sentence, they are not a guest. Everything
below is detail on those clauses.

---

## Who we're looking for

Cast for range across a season, not the same person ten times. The recurring
archetypes, each with a concrete example of the kind of person we mean:

| Archetype | What they look like | Example |
|---|---|---|
| **The first-timer** | Never shipped a product before. Used AI to go from zero to a live thing people pay for. | A teacher who built a lesson-planning tool now used by 2,000 classrooms. |
| **The solo operator** | One person doing the work of a team. No funding, no staff, real revenue. | A designer running a $40k/mo SaaS alone with an agent fleet doing support. |
| **The defector** | Left a stable, prestigious job to build for themselves. | An engineer who quit a Big Five to compound on their own products. |
| **The kid** | Teenager or early-twenties builder moving faster than funded companies. | A 19-year-old whose app out-ships a Series B competitor. |
| **The domain crossover** | Deep expertise in a non-tech field, now building software for it. | A nurse who launched a shift-scheduling app for hospitals. |
| **The quiet compounder** | Not loud online. Just builds, ships, and grows in the background. | An indie hacker with five small products and no audience. |

A great season has all six. If a request returns six versions of "the solo
SaaS founder on X," it has failed the brief.

---

## Hard inclusion criteria (must-haves)

A candidate must meet **all** of these:

- **They built it, not just talked about it.** There is a live product, app, repo,
  or business you can open right now.
- **AI is load-bearing.** AI is how they build it, run it, or both, not a feature
  they bolted on for marketing.
- **There is proof of traction.** Users, revenue, downloads, paying customers,
  waitlist, or shipped public work. Numbers, not vibes.
- **They are an individual or a very small team.** The story is "a person did this,"
  not "a company did this."
- **They will be specific.** Their public writing or talks already show they share
  real numbers and real failures, not abstractions.

---

## Strong signals (rank these up)

Not required, but each one moves a candidate up the list:

- A specific, surprising lesson they keep repeating that most people get wrong.
- A clear before/after: what their work cost or took *before* AI vs now.
- A weird or under-covered niche (not another general-purpose chatbot wrapper).
- Built in public, with a trail of receipts (changelogs, revenue screenshots, demos).
- A real "I shouldn't be able to do this" story: the teacher, the nurse, the kid.
- Articulate and watchable. They can tell a story, not just list features.
- Recency. Shipped or grew something meaningful in the last 6 months.

---

## Disqualifiers (auto-no, regardless of score)

Drop the candidate if any of these are true:

- **Talks about AI but hasn't shipped anything.** No "AI thought leaders,"
  futurists, or commentators.
- **Keynote-only.** Polished story, no specifics, won't say what broke. See VOICE:
  we do not want the keynote version.
- **Big-company PR tour.** A VP doing a sanctioned interview about their employer's
  AI strategy. The show is about individuals, not corporate narratives.
- **The product is the AI hype, not a real business.** Vaporware, a deck, a "coming
  soon" landing page with no product behind it.
- **Pure grifter signals.** Course-selling, "I made $100k in 30 days" with no
  verifiable product, engagement-farming with no substance.
- **Can't be contacted or won't go on record.**

When unsure between "thin but real" and "polished but empty," prefer thin but real.

---

## Stage guidance

The application form captures stage: `Idea`, `Early build`, `Launched, pre-revenue`,
`Revenue`, `Scaling`. For booking:

- **Best fit:** `Launched, pre-revenue` through `Scaling`. There is a shipped product
  and a real story.
- **Bookable with a strong hook:** `Early build` if the build itself is remarkable.
- **Rarely:** `Idea`. Only if the person is the story (e.g. the archetype is
  extraordinary) and they are days from shipping.

Mix stages across a season. Not every guest should be a polished scaler.

---

## Story shapes we want

Each episode should deliver at least one of these. Source for them directly:

- **The cost collapse.** "This used to take a team and a year. I did it in a weekend."
- **The wrong assumption.** "Everyone told me X. The opposite turned out to be true."
- **The unlock.** "I had no business being able to build this. Here's how I did anyway."
- **The grind.** "Here's what actually broke, three times, before it worked."
- **The taste call.** "The hard part wasn't building it. It was knowing what to build."

---

## Where to find them

Search these, with example queries:

- **X / Twitter:** build-in-public threads, revenue screenshots. Queries like
  `"built with" (cursor OR claude OR v0) MRR`, `"shipped" solo founder AI`,
  `"first product" indie AI`.
- **Product Hunt:** recent launches by solo makers; sort by makers with one product.
- **Indie Hackers:** revenue milestones, "I built X with AI" posts.
- **Hacker News:** "Show HN" posts where one person shipped something AI-native.
- **Reddit:** r/SideProject, r/indiehackers, r/SaaS launch posts with traction.
- **GitHub:** trending solo-maintainer projects that are AI-native and have real usage.
- **YouTube / TikTok:** builders demoing real products (not just tutorials).
- **The inbound pile:** the `guest_applications` table. Score these the same way.

Prioritise people who are *not* already on every podcast. The quiet compounder
beats the person who has told this story ten times.

---

## The rubric

Score each candidate 0 to 10. Sum, then normalise to a 0 to 10 average. Keep 7+.

| Dimension | What you're checking | Weight |
|---|---|---|
| **Realness** | Is there a live product with proof of traction? | x2 |
| **AI-native** | Is AI genuinely load-bearing, not bolted on? | x2 |
| **Story** | Do they have a surprising, specific lesson worth an hour? | x2 |
| **Archetype fit** | Do they embody one of the six archetypes cleanly? | x1 |
| **Watchability** | Can they tell it well? Articulate, candid, on-camera capable? | x1 |
| **Reach diversity** | Do they add a niche/voice the current season lacks? | x1 |
| **Recency** | Did they ship or grow in the last 6 months? | x1 |

Any disqualifier zeroes the candidate.

### Mapping the application form to the rubric

When scoring an inbound `guest_applications` row, the fields map like this:

- `what_building` + `product_link` -> **Realness**
- `how_using_ai` -> **AI-native**
- `surprise_insight` + `takeaway` -> **Story**
- `stage` -> stage guidance above
- `linkedin_url` -> verification, watchability, reach

A vague `surprise_insight` ("AI is powerful") is the single strongest negative
signal in the inbound pile. A specific, counterintuitive one is the strongest
positive.

---

## Output format for an agent

Return a JSON array, ranked best-first. One object per candidate:

```json
{
  "name": "Full Name",
  "headline": "One line: who they are and what they shipped",
  "archetype": "first-timer | solo-operator | defector | kid | domain-crossover | quiet-compounder",
  "product": { "name": "", "url": "", "what_it_does": "" },
  "ai_use": "How AI is load-bearing for them, specifically",
  "traction": "The hardest number you can verify, with source",
  "story_hook": "The one surprising thing this episode would be about",
  "stage": "Idea | Early build | Launched, pre-revenue | Revenue | Scaling",
  "contact": { "best_channel": "", "handle_or_email": "" },
  "evidence": ["url", "url"],
  "score": 8.4,
  "why_now": "Why book them this season"
}
```

Always include `evidence` links so a human can verify in under a minute. A
candidate with no verifiable evidence is not a candidate.

---

## Outreach note (tone)

When the agent drafts outreach, follow `VOICE.md`. Plainspoken, concrete, short.
Name the specific thing they built and the specific thing we want to talk about.
No "we'd love to have you on to discuss the AI space." Say what we actually saw
and why it's worth an hour.
