# Taste Model Reference

Read this file when building or updating the listener profile, resolving ambiguous feedback, interpreting real listening behavior, or choosing the exploration ratio.

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

## 3. Evidence classes

Keep these sources distinct:

### Explicit user feedback

- strong like / favorite;
- explicit dislike;
- neutral / average;
- context-scoped preference;
- whole-playlist feedback;
- fatigue statement.

### Platform preference signals

Only when actually available:

- positive / negative ratings;
- favorites;
- library membership.

### Behavioral exposure

Only when actually available:

- recently played;
- repeated recent presence;
- Replay summary;
- host telemetry such as skip / completion only when explicitly exposed.

### External recommendation context

- Apple personalized recommendations;
- catalog editorial context.

This last class can help candidate recall but is not evidence that the listener personally likes a track.

## 4. Evidence precedence

When signals conflict, use this default ordering:

1. explicit current user feedback;
2. explicit reusable preference;
3. direct platform preference signal;
4. repeated behavioral exposure;
5. library membership;
6. external recommendation context;
7. single ambiguous exposure;
8. no signal.

Do not let passive behavior silently override an explicit statement.

## 5. Negative Profile

Keep these distinct:

- explicit dislikes;
- disliked artists;
- disliked sounds or emotional styles;
- fatigued tracks or artists;
- “I like this, but not recently / not today”;
- unexplained skips if the host actually provides them.

Fatigue is not dislike.

One unexplained skip is weak evidence.

## 6. Short-term State

Consider only information actually available:

- recently mentioned or selected tracks;
- recent positive and negative feedback;
- current context, time of day, activity, and mood;
- desire for familiarity versus discovery;
- recent aesthetic fatigue;
- real recent exposure when authorized and available.

Short-term state may adjust the mix but must not overwrite long-term taste.

## 7. Exposure is not preference

A recent play can mean:

- active interest;
- habit;
- autoplay;
- playlist context;
- testing;
- background use;
- or simple exposure.

Therefore use recently played data in two directions:

- as a seed for **adjacent discovery**;
- as a source of **fatigue / repetition penalty**.

A song played yesterday can be strong evidence about taste and still be a poor choice for today's daily playlist.

## 8. No feedback means unknown

Do not convert missing feedback into positive evidence.

If a playlist received no comment:

- retain its tracks as exposed;
- do not mark them as liked;
- do not mark the playlist as successful;
- use future explicit or behavioral evidence to update confidence.

## 9. Evidence scope and confidence

Treat each signal as having both **strength** and **scope**.

Possible scopes:

- global / long-term;
- context-specific;
- temporary fatigue;
- playlist-specific;
- exposure-only;
- ambiguous / unscoped.

### Strong positive

- explicit “love / favorite”;
- direct positive rating / favorite when observable;
- asking for more like this;
- repeated voluntary mentions of the same track or artist.

### Moderate positive

- explicit “good / 不错”;
- repeated listening combined with other positive evidence;
- durable Replay prominence when the host actually exposes it;
- asking about the track or artist.

### Strong negative

- explicit dislike;
- direct negative rating when observable;
- explicit request to avoid a sound;
- rapid skip with an explanation when telemetry is actually available.

### Weak negative

- “average / 一般”;
- “not today”;
- one unexplained skip when telemetry is actually available;
- heavy recent exposure that creates fatigue risk.

Never invent behavioral telemetry.

## 10. Exploration Budget

Use these as starting points, not rigid quotas.

| Taste confidence | Reliable / familiar | Adjacent discovery | Controlled surprise |
|---|---:|---:|---:|
| Lower | ~60% | ~30% | ~10% |
| Higher | ~40% | ~40% | ~20% |

Adjust by context. A user may want high novelty for active discovery but low novelty for focused work.

Controlled surprise must have at least one explainable connection to known taste, current context, or the curatorial thesis. Do not use obscurity as a substitute for discovery.

## 11. Cooldown and repetition

When trustworthy history exists, default to:

- same track: 30-day recommendation cooldown;
- same artist: 7-day soft penalty;
- same Taste Cluster / texture: saturation penalty, not hard ban;
- explicit current user request: may override cooldown.

Within one playlist:

- usually cap an artist at one track;
- rarely use more than two;
- do not place the same artist consecutively.

Cooldown changes recommendation probability, not the underlying Taste Profile.

If prior output is unavailable, do not pretend that repetition control has been performed.

## 12. Behavioral adapter

When real Apple Music / MusicKit signals exist, normalize them before use rather than injecting raw account data directly into the taste model.

Read [listening-signals.md](listening-signals.md) for source hierarchy, normalization, missing-data behavior, and privacy boundaries.
