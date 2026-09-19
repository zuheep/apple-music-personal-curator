# Evaluation Cases

Use these cases as regression checks when changing the Skill. The goal is not identical playlists; the goal is stable behavior and good judgment.

## Case 1 — Fatigue is not dislike

**Input**

> I still love Coldplay's melodic writing, but I am tired of hearing Coldplay. Give me something for an evening walk.

**Expected behavior**

- no automatic Coldplay anchor;
- preserve relevant melodic / songwriting traits;
- expand through adjacent dimensions rather than obvious “similar artists”;
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
- avoid forcing all candidates into one genre label.

## Case 3 — Context-scoped preference

**Input**

> I love lyric-heavy singer-songwriters, but today I need three hours of focused work and lyrics distract me.

**Expected behavior**

- keep long-term singer-songwriter preference intact;
- reduce lyrical salience for this session;
- use instrumentation, production, melodic shape, or related ecosystems as bridges;
- do not infer “user dislikes vocals.”

## Case 4 — Short playlist

**Input**

> Give me only six tracks for a 25-minute train ride.

**Expected behavior**

- do not mechanically apply a 15-track arc;
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
- each higher-risk track has an explainable bridge to known taste, context, or thesis;
- long-tail status alone is not treated as recommendation value.

## Case 8 — Narrative quality

**Input**

> Make the playlist feel like a late-night train ride. I want a real title and story, not 15 blurbs.

**Expected behavior**

- one distinctive title;
- one coherent narrative paragraph;
- verified facts only;
- sequence reflects the stated scene and lands intentionally.

## Case 9 — Recently played is exposure, not preference

**Input**

Authorized MusicKit data shows one song was played yesterday, but the user has never rated or discussed it.

**Expected behavior**

- treat the song as recent exposure;
- do not infer that the user likes it;
- usually avoid repeating the exact song in today's daily playlist;
- it may seed adjacent discovery if musically relevant.

**Failure signs**

- “you like this song” inferred from one play;
- exact repeat used as an automatic anchor.

## Case 10 — Explicit feedback overrides behavior

**Input**

Recently played and Replay data strongly feature Artist X. The user explicitly says:

> I like the writing, but I am tired of Artist X right now. Don't play them this week.

**Expected behavior**

- explicit fatigue request wins;
- preserve relevant musical traits for adjacent discovery;
- do not reinterpret Replay prominence as permission to ignore the request.

## Case 11 — Ratings and favorites are stronger than passive exposure

**Input**

Authorized data shows:
- Song A: positive rating / favorite;
- Song B: several recent plays but no direct preference signal.

**Expected behavior**

- Song A carries stronger positive taste evidence;
- Song B can influence adjacency and fatigue;
- neither must appear directly if cooldown or today's thesis argues against it.

## Case 12 — No feedback is unknown

**Input**

Yesterday's playlist generated successfully but received no user comment.

**Expected behavior**

- yesterday's tracks count as recent recommendation exposure;
- do not mark the playlist or tracks as liked;
- use future explicit / behavioral evidence to update confidence.

## Case 13 — Structural repetition without track repetition

**Input**

No songs repeat from yesterday, but today's first draft again uses:
English indie opener → Mandarin acoustic middle → Japanese band closer,
with a nearly identical energy curve.

**Expected behavior**

- detect structure-fingerprint similarity;
- change route, language interleaving, energy shape, opener, or closer;
- preserve taste fit while avoiding template reuse.

## Case 14 — Smooth but forgettable playlist

**Input**

Whole-playlist feedback:

> Everything was easy to listen to, but I didn't especially like any song.

**Expected behavior**

- do not convert all tracks into dislikes;
- reduce “smooth/groove background” bias at playlist level;
- next playlist should include roughly 2–3 plausible melodic peaks;
- preserve flow instead of stacking maximalist choruses.

## Case 15 — Fuzzy catalog match returns a live version

**Input**

The intended track is a standard studio recording, but batch matching returns “Live at …”.

**Expected behavior**

- reject the live match;
- search exact title + artist + expected album/year;
- compare duration / ISRC if needed;
- regenerate the final interactive component after correction.

**Failure signs**

- leaving the live version in the card while text claims the studio version;
- saying “verified” because the title roughly matched.

## Case 16 — Correct version exists but card cannot lock it

**Input**

Exact studio recording is found through search, but the playlist-card matcher repeatedly resolves the track to an alternate recording.

**Expected behavior**

- do not knowingly ship the wrong version;
- replace the track with another candidate serving the same role;
- resequence if necessary;
- regenerate the final card and synchronized text list.

## Case 17 — Card Gate

**Input**

The environment returns verified song metadata but no actual interactive playlist / track card.

**Expected behavior**

- do not write “card generated” or “Open Playlist in Apple Music” as if a component exists;
- explicitly say the interactive card was not generated;
- still return the verified text list.

## Case 18 — User-authorized write-back

**Input**

The host supports Apple Music user-library playlist creation and confirms a successful write.

**Expected behavior**

- verify all recordings before write-back;
- create / update the playlist only after final set approval by the workflow;
- only claim playlist creation after the host confirms success;
- keep card, text list, and written playlist synchronized.

## Case 19 — Partial behavioral data

**Input**

The host provides recently played tracks and favorites, but no skip count, completion rate, or listening duration.

**Expected behavior**

- use only available fields;
- do not invent missing telemetry;
- capability status remains separate from taste state.

## Case 20 — Personalized recommendations are a recall lane

**Input**

Apple returns a set of personalized recommendations.

**Expected behavior**

- use them as one candidate source;
- rerank them with the curator's own taste, novelty, sequence, cooldown, and catalog rules;
- do not assume Apple's order is the final playlist order.
