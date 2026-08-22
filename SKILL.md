---
name: apple-music-personal-curator
description: >
  Curate personalized Apple Music playlists as complete listening experiences using multi-cluster taste modeling, current context, controlled discovery, fatigue control, sequencing, catalog verification, and immersive narrative. Use for daily or recurring music recommendations, scene- or mood-based playlists, Apple Music discovery, feedback-driven refinement, or requests to improve playlist flow and storytelling. Do not use for single-song facts, music trivia, or generic artist biographies unless curation is also requested.
license: MIT
compatibility: >
  Best with Apple Music catalog search or an equivalent music catalog. Can run without catalog access only in an explicitly unverified candidate-curation mode. Persistent taste learning requires host-supported memory or user-provided history.
metadata:
  author: "Zuh"
  version: "1.2.0"
  tags: "music apple-music recommendation playlist curation personalization narrative discovery"
  standard: "Agent Skills"
---

# Apple Music Personal Curator

## Mission

Curate a playlist that feels intentionally made for this listener **today**, not a ranked list of songs they are statistically likely to click.

Optimize the whole listening session across personal relevance, current context, discovery, controlled surprise, diversity, coherence, fatigue control, and narrative.

Default to **15 tracks** unless the user requests another length.

## Activation boundaries

Use this Skill when the user wants:

- a daily or recurring music recommendation;
- a playlist for a scene, activity, time, or mood;
- personalized Apple Music discovery;
- a new playlist based on feedback from earlier recommendations;
- better playlist sequencing, transitions, or narrative;
- a balance of familiarity and new music rather than a popularity list.

Do **not** run the full workflow for a simple factual lookup about one song, album, or artist unless the user also asks for curation.

## Capability gate

Before curating, silently determine which operating mode is actually available.

### Mode A — Verified + continuity

Use when both are available:

- a catalog that can verify final tracks;
- trustworthy prior-listening, prior-playlist, or reusable taste context.

You may use continuity, repetition control, and feedback learning, but only from data the environment truly provides.

### Mode B — Verified + stateless

Use when catalog verification is available but prior history is not.

Curate and verify normally, but do not claim cross-day deduplication or memory. Use only the current request and current conversation context.

### Mode C — Candidate curation

Use when no suitable catalog verification is available.

Deliver a draft labeled **Candidate Curation — not catalog verified**. Do not claim that an Apple Music playlist was created, confirmed, or is playable.

### Cold-start overlay

Cold start can apply to any mode. If taste evidence is weak, use conservative exploration and ask for only the minimum information needed when interaction is possible.

For scheduled or unattended runs, do not block on questions. Produce a conservative best-effort result from available context and state any material limitation briefly.

## Curatorial Brief

Before candidate generation, form a short internal brief. Do not show it unless the user asks.

Capture:

- **listener state** — long-term clusters, explicit dislikes, fatigue, current mood;
- **listening function** — foreground listening, focused work, commuting, workout, social setting, sleep, etc.;
- **familiarity target** — how much trust versus discovery is appropriate today;
- **energy trajectory** — flat, gradual lift, peak-and-release, late-night descent, or another useful shape;
- **curatorial thesis** — one sentence answering: *why should these songs exist together in this session?*;
- **hard avoids** — artists, sounds, moods, versions, or repetition constraints;
- **continuity status** — whether prior playlist/history data is actually available;
- **catalog status** — verified or candidate mode.

The Curatorial Brief is a creative compass, not a rigid scorecard.

## Core rules

1. **Taste is multi-cluster.** Never reduce the listener to one genre or one artist ecosystem.
2. **Fatigue is not dislike.** “I like this but not lately” is different from “I dislike this.”
3. **One skip is weak evidence.** Do not permanently change the taste model from one unexplained skip.
4. **Context-scoped feedback stays scoped.** “Not for work” does not automatically mean “never recommend.”
5. **Discovery needs a bridge.** Surprise must have at least one explainable connection to known taste, current context, or the curatorial thesis.
6. **A playlist is not Top N.** Select a strong set, assign roles, then sequence it.
7. **Catalog grounding is mandatory for confirmed delivery.** Never present an unverified track as a confirmed Apple Music result.
8. **Narrative must serve listening.** Do not produce 15 repetitive mini-reviews by default.
9. **Never invent memory or platform access.** Use only history and personal data actually available in the current environment.

## Workflow

### Step 1 — Establish listener state

Separate:

- **Long-term Taste** — stable preferences across 3–7 Taste Clusters;
- **Negative Profile** — explicit dislikes and fatigue signals;
- **Short-term State** — current scene, mood, recent feedback, and desire for familiarity versus discovery.

Read [references/taste-model.md](references/taste-model.md) when building or updating the profile, resolving ambiguous feedback, or choosing the exploration ratio.

### Step 2 — Cold start only when needed

If there is not enough evidence to curate responsibly and the user is present, request only:

- 3–5 strongly liked tracks or artists;
- 2–3 clear dislikes or sounds to avoid;
- one common listening context.

Do not turn onboarding into a questionnaire.

### Step 3 — Build a diverse candidate pool

Generate substantially more candidates than the final playlist using multiple lanes:

- anchors;
- adjacent discovery;
- different Taste Clusters;
- bridge tracks;
- long-tail matches;
- current context;
- controlled serendipity.

Every discovery candidate should have at least one explainable connection to the Curatorial Brief. Do not respond to uncertainty by filling the playlist with famous hits.

Read [references/playlist-design.md](references/playlist-design.md) when candidate generation, role assignment, sequencing, or narrative design is central to the request.

### Step 4 — Select the set and assign track roles

Evaluate candidates on:

- Personal Fit;
- Short-term Fit;
- Context Fit;
- Discovery Value;
- Serendipity;
- Diversity Contribution;
- Transition Compatibility;
- Narrative Value;
- Catalog Confidence.

Penalize recent repetition, artist saturation, cluster / genre saturation, overfamiliarity, fatigue, and uncertain entities.

Use roles as soft design tools, not quotas:

- **Anchor** — establishes trust;
- **Bridge** — connects two tastes or eras;
- **Pivot** — changes direction intentionally;
- **Discovery** — expands the listener's map;
- **Wildcard** — the highest-risk but explainable surprise;
- **Landing** — creates closure or afterglow.

A track may serve more than one role. Do not force every label into every playlist.

Unless there is a clear reason:

- avoid repeating tracks from the immediately previous daily playlist when that history is available;
- usually keep an artist to no more than two tracks;
- avoid letting one Taste Cluster dominate;
- use favorite tracks as occasional anchors, not automatic daily defaults.

### Step 5 — Sequence an adaptive listening arc

For the default 15-track playlist, use:

1. **Entrance — tracks 1–3:** establish trust and entry.
2. **Expansion — tracks 4–7:** move naturally beyond the obvious.
3. **Discovery — tracks 8–11:** place the strongest new finds and at least one Bridge, Pivot, or Serendipity moment.
4. **Landing — tracks 12–15:** create release, resolution, or afterglow.

For other lengths, preserve the arc rather than the exact track numbers. As a starting proportion:

- Entrance: ~15–20%;
- Expansion: ~25–30%;
- Discovery: ~25–30%;
- Landing: ~20–25%.

Very short playlists may compress the arc into **Entry → Turn → Landing**. Long playlists may use chapters while preserving a clear opening, development, discovery peak, and ending.

Track 1 is the best entrance, not necessarily the highest-scoring song. The last track must feel like an ending.

Use transition strategies intentionally: **Blend**, **Lift**, **Contrast**, or **Reset**. Abrupt changes are allowed when they create a meaningful pivot rather than accidental whiplash.

### Step 6 — Verify every final track

Before presenting a confirmed playlist, verify each selected track through Apple Music catalog search or an equivalent music catalog.

Confirm, as relevant:

- title;
- artist;
- intended version;
- album / release context;
- catalog availability.

Distinguish studio, live, remaster, acoustic, cover, soundtrack, language-specific, deluxe, and anniversary versions when they matter.

If lookup fails, diagnose and retry before replacing the track. Read [references/catalog-grounding.md](references/catalog-grounding.md) for verification and fallback procedure.

### Step 7 — Write the title and narrative

Create a distinctive title tied to the Curatorial Brief: a scene, image, musical relationship, or emotional movement specific to this playlist.

Write **one coherent narrative paragraph** that:

- establishes a scene;
- naturally includes 3–6 important tracks or artists;
- explains the sonic or emotional logic of the set;
- uses verified factual claims only;
- suggests the turn and landing;
- leaves room for the listener's own interpretation.

Sonic observations may be descriptive without becoming encyclopedic. Do not fabricate artist relationships, creation stories, release facts, or song meanings.

### Step 8 — Deliver concisely

Use this default structure:

```markdown
# [Playlist Title]

[One immersive narrative paragraph.]

## Playlist
1. Track — Artist
2. Track — Artist
...

Optional markers: Anchor · Bridge · Discovery · Wildcard · Ending
```

When the host provides playable Apple Music components or equivalent catalog UI, prefer those over plain text while preserving sequence.

Do not add one recommendation paragraph per track unless requested.

### Step 9 — Learn from natural feedback

Accept feedback such as:

- “第 3 首很好”;
- “7、8 不喜欢”;
- “后半段比前半段好”;
- “这个歌手以后多一点”;
- “这种男声我不喜欢”;
- “今天不是这个心情”.

Decompose feedback into track, artist, sound, Taste Cluster, context, sequence, narrative, and fatigue signals as appropriate.

Update persistent taste only when the host actually supports memory or the user explicitly supplies reusable profile data. Otherwise, use feedback only within available context.

## Daily / recurring curation

For scheduled or recurring runs:

1. never assume access to the previous run;
2. if prior output is available, use it to reduce repetition and vary the route through Taste Clusters;
3. if prior output is unavailable, use Mode B behavior and do not claim deduplication;
4. if context is missing, default to a balanced, moderately exploratory session rather than asking blocking questions;
5. if catalog tools are unavailable in the scheduled environment, switch to Mode C and label the result clearly;
6. keep capability caveats brief and only mention limitations that materially affect the result.

## No-catalog mode

If no suitable catalog tool is available, label the result:

**Candidate Curation — not catalog verified**

Do not claim that an Apple Music playlist was created, confirmed, or is playable.

## Privacy boundaries

Do not infer sensitive personal traits from music taste. Do not use unrelated identity information to personalize music.

Do not claim access to private listening history, saved music, Apple Music account data, persistent memory, or previous scheduled-task output unless the current platform actually provides it.

## Final quality check

Before delivery, confirm:

- the Curatorial Brief has a coherent thesis;
- the result reflects more than popularity or artist similarity;
- familiar, adjacent, and surprising choices are balanced for available taste confidence;
- discovery tracks have an explainable bridge;
- artist and Taste Cluster saturation are controlled;
- track roles create movement rather than a flat list;
- the playlist has an intentional opening, development, discovery moment, and landing appropriate to its length;
- adjacent transitions are intentional;
- every confirmed final track and important version is catalog verified, or the entire result is explicitly marked unverified;
- narrative facts are verified;
- no listening history, memory, or tool capability was invented;
- the final answer feels like a playlist, not a report.
