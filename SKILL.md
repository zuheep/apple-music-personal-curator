---
name: apple-music-personal-curator
description: >
  Curate personalized Apple Music playlists as complete listening experiences using multi-cluster taste modeling, current context, controlled discovery, fatigue control, sequencing, catalog verification, and immersive narrative. Use for daily music recommendations, scene- or mood-based playlists, Apple Music discovery, follow-up curation from listener feedback, or requests to improve playlist flow and storytelling. Do not use the full workflow for simple factual questions about one song or artist.
license: MIT
compatibility: >
  Best with Apple Music catalog search or an equivalent music catalog. Can run without catalog access only in an explicitly unverified candidate-curation mode. Persistent taste learning requires host-supported memory or user-provided history.
metadata:
  author: "Zuh"
  version: "1.1.1"
  tags: "music apple-music recommendation playlist curation personalization narrative discovery"
  standard: "Agent Skills"
---

# Apple Music Personal Curator

## Mission

Curate a playlist that feels intentionally made for this listener **today**, not a ranked list of songs they are statistically likely to click.

Optimize the whole listening session across:

- personal relevance;
- current context;
- discovery;
- controlled surprise;
- diversity;
- coherence;
- fatigue control;
- narrative.

Default to **15 tracks** unless the user requests another length.

## Activation boundaries

Use this Skill when the user wants:

- a daily or recurring music recommendation;
- a playlist for a scene, activity, time, or mood;
- personalized Apple Music discovery;
- a new playlist based on feedback from earlier recommendations;
- better playlist sequencing, transitions, or narrative;
- a balance of familiarity and new music rather than a popularity list.

Do **not** run the full workflow for a simple factual lookup about a song, album, or artist unless the user also asks for curation.

## Core rules

1. **Taste is multi-cluster.** Never reduce the listener to one genre or one artist ecosystem.
2. **Fatigue is not dislike.** “I like this but not lately” is different from “I dislike this.”
3. **One skip is weak evidence.** Do not permanently change the taste model from one unexplained skip.
4. **Discovery needs a bridge.** Surprise must have at least one explainable connection to known taste or current context.
5. **A playlist is not Top N.** Select a strong set, then sequence it.
6. **Catalog grounding is mandatory for final delivery.** Never present an unverified track as a confirmed Apple Music result.
7. **Narrative must serve listening.** Do not produce 15 repetitive mini-reviews by default.
8. **Never invent memory or platform access.** Use only history and personal data actually available in the current environment.

## Workflow

### Step 1 — Establish listener state

Use available evidence to separate:

- **Long-term Taste** — stable preferences across 3–7 Taste Clusters;
- **Negative Profile** — explicit dislikes and fatigue signals;
- **Short-term State** — current scene, mood, recent feedback, and desire for familiarity versus discovery.

If the task requires building or updating the profile, or feedback is ambiguous, read [references/taste-model.md](references/taste-model.md).

Do not ask a long questionnaire. Prefer existing context and natural feedback.

### Step 2 — Cold start only when needed

If there is not enough evidence to curate responsibly, request only:

- 3–5 strongly liked tracks or artists;
- 2–3 clear dislikes or sounds to avoid;
- one common listening context.

Then start curating and learn through use.

### Step 3 — Build a diverse candidate pool

Generate substantially more candidates than the final playlist using multiple paths:

- anchors;
- adjacent discovery;
- different Taste Clusters;
- bridge tracks;
- long-tail matches;
- current context;
- controlled serendipity.

For detailed candidate-generation and ranking guidance, read [references/playlist-design.md](references/playlist-design.md).

Do not respond to uncertainty by filling the playlist with famous hits.

### Step 4 — Select the set

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

Unless there is a clear reason:

- avoid repeating tracks from the immediately previous daily playlist;
- usually keep an artist to no more than two tracks;
- avoid letting one Taste Cluster dominate;
- use favorite tracks as occasional anchors, not automatic daily defaults.

### Step 5 — Sequence the listening arc

For a 15-track playlist, default to:

1. **Entrance — tracks 1–3:** establish trust and entry.
2. **Expansion — tracks 4–7:** move naturally beyond the obvious.
3. **Discovery — tracks 8–11:** place the strongest new finds and at least one Bridge or Serendipity track.
4. **Landing — tracks 12–15:** create release, resolution, or afterglow.

Track 1 is the best entrance, not necessarily the highest-scoring song. The last track must feel like an ending.

Check adjacent transitions for energy, perceived tempo, instrumentation, vocal texture, language, production density, emotional direction, era, and intro / outro character.

Read [references/playlist-design.md](references/playlist-design.md) when sequencing or narrative design is a central part of the request.

### Step 6 — Verify every final track

Before presenting the final playlist, verify each selected track through Apple Music catalog search or an equivalent music catalog.

Confirm, as relevant:

- title;
- artist;
- intended version;
- album / release context;
- catalog availability.

Distinguish studio, live, remaster, acoustic, cover, soundtrack, language-specific, deluxe, and anniversary versions when they matter.

If a lookup fails, diagnose and retry before replacing the track. Read [references/catalog-grounding.md](references/catalog-grounding.md) for the verification and fallback procedure.

### Step 7 — Write the title and narrative

Create a distinctive title tied to this playlist's specific scene, image, musical relationship, or emotional movement.

Avoid generic titles such as “Today’s Picks”, “Healing Playlist”, “Good English Songs”, or “Weekend Music”.

Write **one coherent narrative paragraph** that:

- establishes a scene;
- naturally includes 3–6 important tracks or artists;
- uses verified musical facts only;
- suggests the playlist's turn and landing;
- leaves room for the listener's own interpretation.

Do not fabricate artist relationships, creation stories, release facts, or song meanings.

### Step 8 — Deliver concisely

Use this default structure:

```markdown
# [Playlist Title]

[One immersive narrative paragraph.]

## Playlist
1. Track — Artist
2. Track — Artist
...
15. Track — Artist

Optional markers: Anchor · Discovery · Wildcard · Ending
```

When the host provides playable Apple Music components or equivalent catalog UI, prefer those over plain text while preserving the sequence.

Do not add 15 track-by-track recommendation blurbs unless the user asks for them.

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

For a daily run:

1. prefer available recent playlist history to reduce repetition;
2. use the current time / scene only when the environment provides it or the user specified it;
3. preserve long-term Taste Clusters while allowing short-term state to adjust today's mix;
4. vary the route through the listener's taste over multiple days instead of repeatedly using the same anchor artists;
5. do not claim knowledge of yesterday's playlist if the scheduled run cannot access it.

## No-catalog mode

If no suitable catalog tool is available, you may still produce a draft, but label it clearly:

**Candidate Curation — not catalog verified**

In this mode, do not claim that an Apple Music playlist was created, confirmed, or is playable. See [references/catalog-grounding.md](references/catalog-grounding.md).

## Privacy boundaries

Do not infer sensitive personal traits from music taste. Do not use unrelated identity information to personalize music.

Do not claim access to:

- private listening history;
- saved music;
- Apple Music account data;
- persistent memory;
- previous scheduled-task output;

unless the current platform actually provides that information.

## Final quality check

Before delivery, confirm:

- the result reflects more than popularity or artist similarity;
- familiar, adjacent, and surprising choices are balanced for the available taste confidence;
- artist and Taste Cluster saturation are controlled;
- the playlist has a clear Entrance → Expansion → Discovery → Landing arc;
- adjacent transitions are intentional;
- every final track and important version is catalog verified, or the entire result is explicitly marked unverified;
- narrative facts are verified;
- no listening history, memory, or tool capability was invented;
- the final answer is concise enough to feel like a playlist, not a report.
