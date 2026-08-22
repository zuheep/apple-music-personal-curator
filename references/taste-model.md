# Taste Model Reference

Read this file when building or updating the listener profile, resolving ambiguous feedback, or choosing the exploration ratio.

## 1. Long-term Taste Profile

Maintain 3–7 independent Taste Clusters rather than one genre label. A cluster may track:

- representative artists and tracks;
- genre, language, and era;
- instrumentation and production style;
- vocal characteristics;
- energy and emotional tone;
- lyrical preferences;
- familiarity preference;
- exploration tolerance.

Clusters may contradict each other. Do not force every preference into one musical identity.

## 2. Context-conditioned taste

Some preferences are global; others are specific to a situation. Track scope when evidence supports it.

Useful contextual dimensions include:

- foreground listening versus background / focus use;
- tolerance for lyrical density;
- desired energy and dynamic volatility;
- vocal prominence;
- language preference for the current context;
- acoustic versus electronic texture;
- production density and polish;
- era familiarity;
- appetite for novelty.

Examples:

- “Too distracting for work” is not a global dislike.
- “I want more vocals at night” should not overwrite daytime focus preferences.
- “I am tired of this artist” is a temporary fatigue signal unless the user says otherwise.

## 3. Negative Profile

Keep these distinct:

- explicit dislikes;
- disliked artists;
- disliked sounds or emotional styles;
- fatigued tracks or artists;
- “I like this, but not recently / not today.”

Fatigue is not dislike.

## 4. Short-term State

Consider only information actually available:

- recently mentioned or selected tracks;
- recent positive and negative feedback;
- current context, time of day, activity, and mood;
- desire for familiarity versus discovery;
- recent aesthetic fatigue.

Short-term state may adjust the mix but must not overwrite long-term taste.

## 5. Evidence scope and confidence

Treat each signal as having both **strength** and **scope**.

Possible scopes:

- global / long-term;
- context-specific;
- temporary fatigue;
- playlist-specific;
- ambiguous / unscoped.

### Strong positive

- explicit “love / favorite”;
- saving a playlist when that action is actually observable;
- asking for more like this;
- repeated voluntary mentions of the same track or artist.

### Moderate positive

- explicit “good / 不错”;
- asking about the track or artist;
- completion or replay only when actual telemetry is provided by the host.

### Strong negative

- explicit dislike;
- Suggest Less when actually observable;
- explicit request to avoid a sound;
- rapid skip with an explanation when the skip is actually observable.

### Weak negative

- “average / 一般”;
- “not today”;
- unexplained skip when telemetry is actually available.

Never invent behavioral telemetry. Never convert one unexplained skip into a permanent dislike.

## 6. Exploration Budget

Use these as starting points, not rigid quotas.

| Taste confidence | Reliable / familiar | Adjacent discovery | Controlled surprise |
|---|---:|---:|---:|
| Lower | ~60% | ~30% | ~10% |
| Higher | ~40% | ~40% | ~20% |

Adjust by context. A user may want high novelty for active discovery but low novelty for focused work.

Controlled surprise must have at least one explainable connection to known taste, current context, or the curatorial thesis. Do not use obscurity as a substitute for discovery.

## 7. Fatigue and repetition

Unless there is a clear reason:

- avoid repeating tracks on consecutive daily playlists when prior output is available;
- usually cap an artist at two tracks per playlist;
- avoid persistent over-representation of one artist or Taste Cluster;
- treat favorite tracks as occasional anchors, not daily defaults.

If prior output is unavailable, do not pretend that repetition control has been performed.

The goal is familiarity without repetition fatigue.
