# Evaluation Cases

Use these cases as regression checks when changing the Skill. The goal is not identical playlists; the goal is stable behavior and good judgment.

## Case 1 — Fatigue is not dislike

**Input**

> I still love Coldplay's melodic writing, but I am tired of hearing Coldplay. Give me something for an evening walk.

**Expected behavior**

- no automatic Coldplay anchor;
- preserve relevant melodic / songwriting traits;
- expand through adjacent dimensions rather than a list of obvious “similar artists”;
- treat Coldplay as fatigue, not a permanent negative preference.

**Failure signs**

- multiple Coldplay tracks;
- “you dislike Coldplay” stored as a global rule;
- popularity-only substitutions.

## Case 2 — Contradictory taste clusters

**Input**

> I like Radiohead, Hikaru Utada, Cheer Chen, and 90s trip-hop. Connect them without flattening them into one genre.

**Expected behavior**

- preserve distinct clusters;
- use Bridge or Pivot tracks;
- produce a coherent thesis that explains the meeting point;
- avoid forcing all candidates into a single genre label.

## Case 3 — Context-scoped preference

**Input**

> I love lyric-heavy singer-songwriters, but today I need three hours of focused work and lyrics distract me.

**Expected behavior**

- keep long-term singer-songwriter preference intact;
- reduce lyrical salience for this session;
- use instrumentation, production, melodic shape, or related artist ecosystems as bridges;
- do not infer “user dislikes vocals.”

## Case 4 — Short playlist

**Input**

> Give me only six tracks for a 25-minute train ride.

**Expected behavior**

- do not mechanically apply 3/4/4/4 track positions;
- compress into Entry → Turn → Landing;
- preserve a real ending;
- avoid filler introduced only to satisfy role quotas.

## Case 5 — Scheduled run without history

**Input**

A recurring task runs with catalog access but cannot read yesterday's output.

**Expected behavior**

- operate in Verified + stateless mode;
- do not claim cross-day deduplication;
- use current visible taste/context only;
- produce a complete result rather than asking blocking questions.

## Case 6 — No catalog tool

**Input**

The environment cannot verify Apple Music entities.

**Expected behavior**

- label the result **Candidate Curation — not catalog verified**;
- do not claim playlist creation or playability;
- avoid unverified factual release-history claims.

## Case 7 — Discovery without randomness

**Input**

> I know my usual music too well. Surprise me, but don't be random.

**Expected behavior**

- increase exploration budget;
- each higher-risk track has an explainable bridge to known taste, current context, or curatorial thesis;
- long-tail status alone is not treated as recommendation value.

## Case 8 — Narrative quality

**Input**

> Make the playlist feel like a late-night train ride. I want a real title and story, not 15 blurbs.

**Expected behavior**

- one distinctive title;
- one coherent narrative paragraph;
- 3–6 key tracks/artists woven naturally into the narrative;
- verified facts only;
- sequence reflects the stated scene and lands intentionally.
