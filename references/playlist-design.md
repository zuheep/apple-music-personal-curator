# Playlist Design Reference

Read this file when generating candidates, reranking the final set, assigning track roles, sequencing the playlist, or writing the narrative.

## 1. Recommendation is a two-stage system

Do not generate the final playlist in one pass.

Use:

1. **Candidate Generation** — broad recall from several lanes;
2. **Set Reranking + Sequencing** — select a coherent final set, then order it deliberately.

This separation prevents the first plausible songs from becoming the final playlist by default.

For a 14–16 track daily playlist, a useful internal pool is roughly **30–45 candidates**.

## 2. Start with a curatorial thesis

Before selecting final tracks, write one internal sentence that explains why this playlist should exist **today**.

Examples of thesis shapes:

- familiar melodic songwriting gradually opening into stranger production textures;
- a late-night train ride that moves from urban detail to suspended afterglow;
- focused work music with human presence but low lyrical intrusion;
- a bridge between two Taste Clusters that rarely appear together.

Do not show the thesis unless useful. Its purpose is to stop a set of individually good songs from becoming an incoherent playlist.

## 3. Candidate generation lanes

Build the pool from multiple paths:

1. **Anchor Recall** — explicit favorites and highly relevant works.
2. **Adjacent Discovery** — one or two dimensions away from known taste: melodic shape, instrumentation, production, era, emotional tone, producer, or scene.
3. **Multi-interest Recall** — candidates from different Taste Clusters so one preference does not dominate.
4. **Bridge Recall** — tracks that connect two Taste Clusters.
5. **Long-tail Recall** — less obvious tracks with high fit.
6. **Context Recall** — tracks that fit current activity, time, or mood.
7. **Behavior-neighbor Recall** — when real listening signals exist, use recently played / favorites / Replay as seeds for adjacent candidates rather than simply repeating them.
8. **Serendipity Recall** — surprising but explainable tracks with at least one connection to known taste or the thesis.

A discovery candidate should be explainable internally. If the only reason is “it is obscure,” remove it.

Apple personalized recommendations, when available, may be used as **one recall lane**, not as the final ranking.

## 4. Structural novelty

When recent playlist history exists, compare the last ~7 days before finalizing.

Build a rough **structure fingerprint** from:

- language mix;
- era / decade distribution;
- style center;
- energy curve;
- opener type;
- closing type;
- artist overlap;
- density / texture pattern.

The goal is not maximum difference. The goal is to prevent accidental template reuse.

Failure example:

- yesterday: bright English indie opener → Mandarin acoustic middle → Japanese band closer;
- today: entirely different songs but the same language blocks, energy curve, and ending behavior.

That is structurally repetitive even if no track repeats.

## 5. Set reranking dimensions

Evaluate candidates across:

- Personal Fit;
- Short-term Fit;
- Context Fit;
- first-listen melodic attraction;
- Discovery Value;
- Controlled Surprise;
- Diversity Contribution;
- Transition Compatibility;
- Curatorial Thesis Fit;
- Narrative Value;
- Catalog Confidence.

Apply penalties for:

- recent track repetition;
- recent artist repetition;
- artist saturation;
- cluster / genre saturation;
- overfamiliarity;
- fatigue;
- “safe filler”;
- weak version / catalog confidence.

Do not simply take a numerical Top N.

## 6. Melodic peaks

A smooth playlist can still fail if nothing stands out.

For a one-hour daily playlist, aim for roughly **2–3 plausible melodic peaks**: songs with a reasonable chance of producing “this one is special” rather than merely “this is fine.”

These peaks should emerge naturally from the thesis and sequence. Do not force three maximalist choruses into the playlist.

Useful peak types include:

- unusually memorable melodic writing;
- a strong but restrained emotional turn;
- a fresh production idea that still serves the melody;
- a surprising bridge between two familiar worlds;
- a distinctive vocal / instrumental hook without excessive intensity.

## 7. Track roles

Use roles to reason about the set:

- **Anchor** — establishes trust or a known emotional center.
- **Bridge** — connects different clusters, eras, languages, or production worlds.
- **Pivot** — intentionally changes direction.
- **Discovery** — expands the listener's taste map.
- **Wildcard** — highest-risk but still explainable choice.
- **Peak** — likely memorability / attraction high point.
- **Landing** — provides closure, release, or afterglow.

Roles are soft. One track may serve multiple roles, and not every playlist needs every role.

## 8. Adaptive sequencing

For a default 14–16 track playlist:

### Act I — Entrance

Track 1 and the first 3 establish trust and interest.

Track 1 is the best entrance, not necessarily the highest-scoring song.

The first 3 should not all use the same timbre, language, or energy profile.

### Act II — Expansion

Move beyond the obvious using relationships in sound, era, mood, songwriting, instrumentation, or production.

### Act III — Discovery / Pivot

Place the strongest new finds and at least one Bridge, Pivot, Wildcard, or Peak.

Discovery can appear earlier; this section simply carries more exploratory weight.

### Act IV — Landing

Keep quality high while creating release, resolution, or afterglow.

The final track must feel like an ending.

For other lengths, preserve the arc rather than exact positions.

## 9. Transition strategies

For adjacent tracks consider:

- energy;
- perceived tempo;
- instrumentation;
- vocal texture;
- language;
- production density;
- emotional direction;
- era;
- intro / outro character.

Use one of four transition intentions:

- **Blend** — continuity in texture, rhythm, harmony, or emotional temperature.
- **Lift** — controlled increase in energy, brightness, scale, or rhythmic presence.
- **Contrast** — deliberate difference that creates attention or reframing.
- **Reset** — purposeful clearing of density or mood before a new chapter.

Avoid long runs of nearly identical tracks and large unprepared jumps.

## 10. Language transitions

Do not organize by nationality merely for neatness.

Cross-language transitions should be justified by at least one bridge:

- compatible melodic contour;
- related rhythm / pulse;
- similar vocal intimacy;
- compatible instrumentation;
- complementary emotional temperature;
- useful contrast after a deliberate reset.

Avoid mechanical “English block → Mandarin block → Japanese block” unless the thesis genuinely calls for it.

## 11. Context-specific sequencing

The listening function changes what counts as a good transition.

Examples:

- **Focus / work:** avoid repeated lyrical spikes and extreme dynamic changes.
- **Commute:** moderate contrast can maintain attention.
- **Workout:** energy continuity and rhythmic propulsion matter more.
- **Late night / reflective:** allow lower-density transitions and fragile endings.
- **Active discovery:** tolerate more pivots while preserving explainable bridges.

## 12. Narrative engine

Every playlist gets a distinctive title and one coherent narrative paragraph.

Avoid generic titles such as “Today’s Picks”, “Healing Playlist”, “Good English Songs”, or “Weekend Music”.

Prefer a scene, image, time, musical relationship, or emotional movement specific to the session.

The narrative should:

- establish a scene;
- explain why these sounds meet;
- use verified facts only when factual claims are needed;
- hint at the turn and landing;
- leave interpretive space.

Narrative is applied after selection and sequencing. It must never be used to justify a weak sequence after the fact.
