---
name: apple-music-personal-curator
description: >
  Curate personalized Apple Music playlists as complete listening experiences using
  multi-cluster taste modeling, real listening signals when explicitly available,
  two-stage candidate generation and reranking, novelty control, sequencing,
  catalog verification, delivery gates, and immersive narrative. Use for daily or
  recurring music recommendations, scene- or mood-based playlists, Apple Music
  discovery, feedback-driven refinement, or requests to improve playlist flow.
license: MIT
compatibility: >
  Best with Apple Music catalog search or equivalent music catalog. User-authorized
  MusicKit/Apple Music behavioral data improves continuity but is optional. Can run
  without personal telemetry and must degrade honestly when history or catalog access
  is unavailable.
metadata:
  author: "Zuh"
  version: "1.5.0"
  tags: "music apple-music recommendation playlist curation personalization behavioral-signals reranking"
  standard: "Agent Skills"
---

# Apple Music Personal Curator

## Mission

Curate a playlist that feels intentionally made for this listener **today**, not a ranked list of songs they are statistically likely to click.

Optimize the **whole listening session** across personal relevance, current context, discovery, controlled surprise, repetition control, sequencing, catalog correctness, and delivery reliability.

Default to **14–16 tracks / about one hour** unless the user requests another length.

The core success criterion is simple:

> The listener should want to continue from track 1 to the final track.

## Activation boundaries

Use this Skill when the user wants:

- a daily or recurring music recommendation;
- a playlist for a scene, activity, time, or mood;
- personalized Apple Music discovery;
- refinement based on earlier playlist or track feedback;
- better sequencing, transitions, novelty, or narrative;
- a balance of familiarity, exploration, and controlled surprise.

Do **not** run the full workflow for a simple factual lookup about one song, album, or artist unless curation is also requested.

## Capability gate

Silently determine which capabilities actually exist.

### Mode A — Verified + continuity

Use when catalog verification is available and trustworthy prior playlist, feedback, or behavioral context is available.

Use continuity, cooldown, repetition control, and feedback learning only from data the environment truly provides.

### Mode B — Verified + stateless

Use when catalog verification is available but reusable history is not.

Curate and verify normally, but do not claim cross-day deduplication, behavioral learning, or memory.

### Mode C — Candidate curation

Use when no suitable catalog verification is available.

Deliver a draft labeled **Candidate Curation — not catalog verified**. Do not claim that an Apple Music playlist was created, confirmed, or is playable.

### Behavioral overlay

If user-authorized Apple Music / MusicKit behavior data is available, treat it as an **optional signal layer**, not as a prerequisite.

Potentially useful authorized signals include:

- recently played tracks or resources;
- personal song ratings;
- favorites;
- library membership;
- Apple personalized recommendations;
- Apple Music Replay summary data when the host exposes it.

Do not assume skip events, completion rate, replay count, listening duration, or other telemetry unless the host explicitly provides them.

Read [references/listening-signals.md](references/listening-signals.md) whenever real behavioral data is available or being designed.

## Core principles

1. **Taste is multi-cluster.** Never compress the listener into one genre, artist ecosystem, language, or era.
2. **Explicit feedback outranks inferred behavior.** A user saying “I dislike this song” is stronger than recent playback.
3. **Exposure is not preference.** Recently played can indicate interest, fatigue, convenience, autoplay, or context; do not equate it with liking.
4. **No feedback means unknown.** Silence does not mean success.
5. **Fatigue is not dislike.** “I like this but not lately” differs from “I dislike this.”
6. **Context-scoped feedback stays scoped.** “Not for work” does not mean “never recommend.”
7. **Discovery needs a bridge.** Surprise must connect to known taste, current context, or the curatorial thesis.
8. **Recommendation is not Top-N ranking.** Build a broad candidate pool, rerank as a set, then sequence.
9. **Catalog grounding is mandatory for confirmed delivery.**
10. **Never invent memory, history, telemetry, or platform actions.**

## Workflow

### Step 1 — Build Taste State

Separate:

- **Long-term Taste** — stable preference across 3–7 Taste Clusters;
- **Explicit Feedback** — liked, disliked, neutral, context-scoped, whole-playlist feedback;
- **Negative Profile** — explicit dislikes and fatigue signals;
- **Behavioral State** — only authorized and observable listening signals;
- **Short-term State** — current scene, mood, recent interests, familiarity / discovery appetite;
- **Recent Exposure** — tracks, artists, and structures heard or recommended recently when history is available.

Feedback scope matters:

- explicit track feedback mainly affects the track and highly similar sounds;
- whole-playlist feedback mainly affects direction, exploration level, sequencing, and overall attraction;
- long-term preference remains the base model;
- one neutral signal only lightly downweights;
- missing feedback remains unknown.

Read [references/taste-model.md](references/taste-model.md) for confidence, scope, fatigue, and conflict handling.

### Step 2 — Form the Curatorial Brief

Create one short internal brief. Do not show it unless asked.

Capture:

- listener state;
- listening function / context;
- familiarity versus discovery target;
- energy trajectory;
- one-sentence **curatorial thesis**;
- hard avoids;
- recent-exposure status;
- catalog status;
- behavioral-data status.

The thesis is a creative compass, not a rigid scorecard.

### Step 3 — Generate a broad candidate pool

Do **not** generate the final playlist in one pass.

For a default 14–16 track playlist, internally build roughly **30–45 candidates** from multiple lanes:

- **Anchor Recall** — high-confidence entry points;
- **Adjacent Discovery** — one or two dimensions away from known taste;
- **Multi-cluster Recall** — candidates from different Taste Clusters;
- **Bridge Recall** — connects clusters, eras, languages, or production worlds;
- **Long-tail Recall** — less obvious high-fit tracks;
- **Context Recall** — fits current function and state;
- **Controlled Serendipity** — surprising but explainable choices.

Avoid filling uncertainty with famous hits.

Every discovery or wildcard candidate should have at least one internal explanation for why it belongs.

Read [references/playlist-design.md](references/playlist-design.md) for candidate lanes and sequencing.

### Step 4 — Apply cooldown and structural novelty

When history is truly available:

- default hard cooldown: **same track — 30 days**;
- default soft penalty: **same artist — 7 days**;
- within one playlist, usually keep an artist to one track and rarely more than two;
- do not place the same artist consecutively.

Compare the last 7 days of playlists using a rough **structure fingerprint**:

- language mix;
- era / decade distribution;
- style center;
- energy curve;
- opener type;
- closing type;
- artist overlap;
- density / texture pattern.

Do not merely swap songs while reproducing yesterday’s structure.

If history is unavailable, do not claim these checks were performed.

### Step 5 — Rerank as a set

Rerank the candidate pool **after** candidate generation.

Consider these dimensions together:

- Personal Fit;
- Short-term / Context Fit;
- first-listen melodic attraction;
- Discovery Value;
- Controlled Surprise;
- Diversity Contribution;
- Transition Compatibility;
- Curatorial Thesis Fit;
- recent-exposure penalty;
- artist / cluster saturation;
- overfamiliarity / “safe filler” penalty;
- Catalog Confidence.

Do not simply take the numerical Top N.

The final set should usually contain:

- a few reliable anchors;
- substantial adjacent exploration;
- a small number of controlled surprises;
- **2–3 plausible melodic peaks** that could become “this one is special,” not merely smooth background listening.

### Step 6 — Sequence deliberately

Track order is part of recommendation quality.

For the default length, think in an adaptive arc:

1. **Entrance** — track 1 and the first 3 establish trust and interest;
2. **Expansion** — move beyond the obvious without losing continuity;
3. **Discovery / Pivot** — introduce meaningful new information;
4. **Landing** — retain quality and create a real ending.

Rules:

- Track 1 must work quickly.
- The first 3 should not all use the same timbre or energy.
- Mid-playlist should introduce at least one new language, texture, rhythm, era, or production idea.
- Avoid 3–4 nearly identical adjacent tracks.
- Cross-language transitions should have a melodic, rhythmic, textural, or emotional bridge.
- The late section must still contain information, not leftover weak tracks.
- The final track must feel like an ending.
- Local energy waves are welcome; monotonic escalation is not required.

Use transition intentions when helpful: **Blend · Lift · Contrast · Reset**.

### Step 7 — Verify every final track

Apple Music / catalog verification is a separate factual gate, not the recommendation engine.

For each final track, verify:

- title;
- artist;
- intended recording;
- album / release context;
- availability;
- duration when helpful;
- ISRC when ambiguity remains.

Default version priority:

1. official studio original;
2. standard album recording;
3. standard single recording.

Unless there is a clear curatorial reason, reject:

- Demo;
- Live;
- Remix;
- Acoustic;
- Edit / special version;
- cover;
- anniversary or deluxe **alternate recording**.

A normal studio recording appearing inside a deluxe or compilation container is not automatically wrong if it is the same recording.

Mandatory retry triggers include:

- title suffixes such as Live, Acoustic, Remix, Edit, Version, Demo;
- wrong artist;
- implausible album context;
- implausible release date;
- implausible duration;
- mismatch between expected and returned recording.

Read [references/catalog-grounding.md](references/catalog-grounding.md).

If the correct recording exists but the final card / batch matcher cannot reliably lock to it, replace that track with another candidate that serves the same playlist role and can be verified cleanly.

### Step 8 — Delivery Gate

A text sentence saying “Open Playlist in Apple Music” is **not** a playlist card.

Only claim that playable or interactive Apple Music content was produced if the host actually generated that component in the current run.

If the host can create a user-library playlist through an authorized MusicKit / Apple Music API integration, that write action is separate from catalog verification and must only be claimed after the write succeeds.

If interactive delivery fails:

- state briefly that the card was not generated;
- still provide the full verified text list;
- never fabricate a successful card or playlist creation.

Any correction after verification must be synchronized across:

- the final card / playable component;
- the text list;
- any created Apple Music library playlist.

### Step 9 — Write title and narrative

Create a distinctive title tied to the Curatorial Brief: a scene, image, or movement specific to this session.

Write one coherent narrative paragraph that:

- establishes a scene;
- explains the sonic / emotional movement;
- uses verified factual claims only;
- hints at the pivot and landing;
- avoids one mini-review per track.

Narrative should reveal a strong playlist, not excuse a weak one.

### Step 10 — Frictionless feedback

Feedback collection must be easier than playlist creation. Do not turn listening into a survey.

Default interaction:

- ask for **strong signals only**;
- do not require rating every track;
- do not require explanations;
- do not require the user to repeat song titles;
- omitted tracks remain **unknown**, not neutral or positive.

At the end of a playlist, when feedback would help, use one optional low-friction line such as:

`反馈（可选）：直接回「3👍 7👍 5👎」即可；整张也可只回「很喜欢 / 无记忆点 / 太软 / 太吵 / 太熟 / 太生 / 前好后弱 / 后半更好 / 曲序怪 / 刚好」。`

Accept shorthand flexibly:

- `3👍`, `喜欢3`, `+3` → explicit positive track signal;
- `5👎`, `不喜欢5`, `-5` → explicit negative track signal;
- `3一般`, `3还行` → weak / neutral downweight only;
- a whole-playlist tag alone is valid feedback;
- natural language remains valid.

Do not ask follow-up questions merely because feedback is incomplete. One track is enough. One playlist-level tag is enough.

Interpretation rules:

- explicit track feedback mainly affects that track and highly similar sounds;
- whole-playlist feedback adjusts curation direction, exploration level, sequencing, energy, familiarity, or memorability;
- `无记忆点` must not turn every track into a dislike;
- `太熟` increases novelty pressure without banning the artists;
- `太生` increases trust / anchor weight without collapsing into hits;
- `前好后弱` and `后半更好` primarily affect sequence and late-stage quality;
- `曲序怪` is a sequencing signal, not a song-level dislike;
- no feedback remains unknown.

After feedback, acknowledge the parsed meaning briefly and stop. Do not respond with a questionnaire, table, or request for reasons unless the user volunteers detail.

Decompose useful feedback into:

- track;
- artist;
- sound;
- Taste Cluster;
- context;
- sequence;
- whole-playlist direction;
- fatigue;
- familiarity / novelty;
- memorability.

Persistent updates require actual host memory or explicit reusable user data.

## Scheduled / recurring curation

For scheduled runs:

1. use prior output and behavioral history only if they are actually accessible;
2. if prior output exists, enforce cooldown and vary the route through Taste Clusters;
3. if behavioral data exists, normalize it before use and keep explicit feedback higher priority;
4. if context is missing, default to a balanced, moderately exploratory session;
5. do not block unattended runs with questions;
6. if catalog tools are unavailable, switch to Candidate Curation mode;
7. if card / write capabilities are unavailable, do not claim a card or Apple Music playlist was created.

## Privacy and authorization

Do not infer sensitive personal traits from music taste.

Do not claim access to private listening history, ratings, favorites, library, Replay, or playlist-write capability unless the user authorized it and the current host actually exposes it.

Do not place Music User Tokens, developer tokens, or other credentials into prompts, logs, playlist descriptions, or persisted taste data.

Behavioral adapters should expose normalized music signals, not secrets.

## Final quality check

Before delivery, confirm:

- the Curatorial Brief has a coherent thesis;
- candidate generation was broader than the final set;
- familiar, adjacent, and surprising choices are balanced;
- recent repetition is controlled when history exists;
- the structure is not a copy of recent playlists;
- artist and Taste Cluster saturation are controlled;
- there are 2–3 plausible melodic peaks rather than a flat smooth set;
- the opening, middle, late section, and ending all have purpose;
- adjacent transitions are intentional;
- every confirmed final recording is catalog verified;
- interactive / write claims match actual host actions;
- no memory, telemetry, or private-data access was invented;
- the result feels like a listening session, not a report;\n- the feedback invitation, if shown, is optional, one-line, and low-friction.
