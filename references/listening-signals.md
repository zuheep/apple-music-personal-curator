# Listening Signals Reference

Read this file when user-authorized Apple Music / MusicKit behavior data is available, when designing a behavior adapter, or when behavioral evidence conflicts with explicit feedback.

## 1. Purpose

Behavioral data should improve continuity and timing without silently replacing the user's stated taste.

The curator should consume a **normalized signal snapshot**, not raw credentials or opaque platform state.

Useful source families may include:

- recently played tracks / resources;
- personal ratings;
- favorites;
- library membership;
- Apple personalized recommendations;
- Apple Music Replay summary data when exposed by the host;
- additional host telemetry only when the host explicitly provides it.

The standard Apple Music API supports recently played resources/tracks, ratings, favorites, library access, personalized recommendations, Replay summary data, and playlist creation/modification with user authorization. Do not assume other signals exist merely because they would be useful.

## 2. Normalized behavior snapshot

A host adapter may provide a structure conceptually similar to:

```text
BehaviorSnapshot
  collected_at
  source
  storefront
  recent_tracks[]
  ratings[]
  favorites[]
  library_items[]
  recommendations[]
  replay_summary?
  host_telemetry?
```

Each normalized signal should preserve only what curation needs:

- catalog or library identifier;
- ISRC when available;
- title and artist;
- signal type;
- polarity if applicable;
- timestamp or recency bucket;
- source;
- confidence;
- context / scope when known.

Do not persist Music User Tokens, developer tokens, cookies, or other credentials in Taste State.

## 3. Evidence hierarchy

Use this default hierarchy when evidence conflicts:

1. **Explicit current user feedback**
2. **Explicit reusable user preference**
3. **Direct platform preference signals** such as rating / favorite
4. **Repeated recent exposure** when actually observable
5. **Library membership**
6. **Personalized recommendations from Apple**
7. **Single recent play or ambiguous telemetry**
8. **No signal**

Important implications:

- Recently played is **exposure**, not automatically liking.
- Library membership is evidence of relevance, not necessarily current appetite.
- Apple recommendations are a useful candidate source, not ground truth about preference.
- Replay summaries indicate durable engagement over a period, but should not overwhelm current feedback.
- One unexplained skip, if a host exposes it, is weak negative evidence.
- No feedback remains unknown.

## 4. Recency interpretation

Recent behavior has two possible meanings:

- **positive momentum** — the listener is actively interested;
- **fatigue risk** — the listener has already heard enough of that track / artist / sound recently.

Therefore recent exposure should usually affect both **candidate recall** and **cooldown**.

Examples:

- repeated recent plays plus an explicit “more like this” request: positive;
- repeated recent plays with no feedback: candidate inspiration, but downweight direct repeats;
- a favorite track played yesterday: good taste evidence, poor default choice for today's daily playlist.

## 5. Cooldown defaults

When trustworthy playlist / play history exists:

- same track: 30-day default recommendation cooldown;
- same artist: 7-day soft recommendation penalty;
- same cluster / texture: use saturation control rather than a hard ban;
- explicit user request can override cooldown.

Cooldown applies to recommendation repetition, not to the underlying taste model.

## 6. Behavioral candidate lanes

Behavior can feed candidate generation through separate lanes:

### Recent-neighbor lane

Use recently played tracks as seeds, but prefer adjacent songs rather than direct repeats.

### Favorite-neighbor lane

Use favorites / positive ratings as higher-confidence taste anchors.

### Replay lane

Use Replay top artists / songs / albums as durable preference evidence, then explore outward to avoid simply replaying the Replay list.

### Apple-recommendation lane

Treat Apple personalized recommendations as one external recall source. They must still pass the curator's own reranking, novelty, sequencing, and catalog rules.

### Library rediscovery lane

Occasionally surface a library item that has not appeared recently when it strongly fits today's thesis.

## 7. Missing or partial data

Behavioral data is optional.

If unavailable:

- keep the same curation workflow;
- rely on explicit feedback, known taste, prior playlists, and current context;
- do not mention private-history analysis as if it occurred.

If partially available:

- use only the fields actually returned;
- do not infer missing skip count, completion rate, or listening duration;
- record capability status separately from taste.

## 8. Authorization and write-back

Creating or modifying a user's Apple Music library playlist is a separate capability from catalog search and behavior reading.

A host may use user-authorized MusicKit / Apple Music API to create a playlist or append tracks. The curator should only claim write-back after the host confirms success.

Recommended separation:

```text
Read signals -> curate -> verify catalog -> preview final set -> write playlist -> confirm write
```

Never let playlist-write success substitute for recording-version verification.

## 9. Privacy boundary

Behavioral music data is for music curation only.

Do not use it to infer sensitive personal traits, health, politics, religion, sexuality, or other unrelated identity attributes.

Use the minimum behavioral detail necessary to improve music selection and sequencing.
