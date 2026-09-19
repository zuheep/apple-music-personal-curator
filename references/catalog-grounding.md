# Catalog Grounding Reference

Read this file whenever final tracks must be verified, a catalog lookup fails, the requested music service is unavailable, or an interactive Apple Music delivery component must be trusted.

## 1. Verification rule

Do not deliver a confirmed final playlist from memory alone.

For every final track:

1. resolve the Apple Music catalog entity;
2. verify title and artist;
3. distinguish the intended recording;
4. verify album / release context when relevant;
5. confirm catalog availability;
6. compare duration when ambiguity remains;
7. compare ISRC when available and useful;
8. replace the track if the intended entity cannot be confirmed.

A hallucinated or unverified track must never appear as a confirmed final result.

## 2. Version priority

Default priority:

1. official studio original;
2. standard album recording;
3. standard single recording.

Unless there is a clear curatorial reason, avoid:

- Demo;
- Live;
- Remix;
- Acoustic;
- radio / edit / alternate version;
- cover;
- soundtrack-specific alternate recording;
- anniversary or deluxe alternate recording.

A normal studio recording appearing inside a deluxe or compilation container is not automatically wrong if it is the same recording.

## 3. Ambiguity triggers

Mandatory reflective retry if any of these appear unexpectedly:

- title suffix: Live, Acoustic, Remix, Edit, Version, Demo, Session, Radio, Re-recorded;
- wrong artist or collaboration;
- implausible album context;
- implausible release year;
- implausible duration;
- localized title that may point to another recording;
- compilation result when a standard release is expected;
- version mismatch between card output and text list.

## 4. Identity checks

Use a combination of:

- title;
- artist;
- album;
- release date;
- duration;
- ISRC.

ISRC is particularly useful for deciding whether two releases contain the **same recording**.

Do not use album container alone as identity.

## 5. Reflective retry

When lookup fails or returns a suspicious version:

1. diagnose the likely mismatch;
2. search by exact title + artist;
3. add expected album / year when helpful;
4. compare duration / ISRC when available;
5. choose the intended recording only after the evidence aligns.

Retry with the least destructive correction.

Do not silently accept a fuzzy match just because it exists.

## 6. Replacement policy

If the intended recording cannot be reliably locked into the final batch / interactive component:

- replace the song rather than knowingly shipping the wrong recording;
- preserve the original playlist role: Anchor, Bridge, Pivot, Discovery, Wildcard, Peak, or Landing;
- rerun sequencing if the replacement changes transitions;
- regenerate the final interactive component after the replacement.

Catalog reliability is a constraint on delivery, not the recommendation engine.

## 7. Card Gate

Interactive Apple Music output is a separate delivery gate.

A sentence such as “Open Playlist in Apple Music” is not proof that a card or playlist exists.

Only claim an interactive card / playable component was produced when the current host actually returns one.

After any version correction:

- regenerate the card / playable component;
- ensure the text list uses the same tracks, order, and versions;
- do not leave an earlier stale card visible as if it were final.

If the card cannot be generated:

- say briefly that the card was not generated;
- still provide the verified text list;
- never fabricate success.

## 8. Apple Music library write-back

Catalog verification and user-library writes are separate capabilities.

With user authorization, a MusicKit / Apple Music API host may create a library playlist or add tracks to one.

Only claim playlist creation after the host confirms the write succeeded.

Recommended sequence:

```text
curate -> verify recordings -> preview final set -> create/write playlist -> confirm write
```

A successful write does not excuse an incorrect recording match.

## 9. No-catalog fallback

If no suitable catalog tool is available:

- label the result **Candidate Curation — not catalog verified**;
- do not say an Apple Music playlist was created, confirmed, or is playable;
- avoid factual release-history claims that cannot be verified.

## 10. Memory and personal-data boundaries

Catalog access does not imply access to private listening history.

Use recently played data, ratings, favorites, Replay, saved music, or prior playlists only when the user authorized them and the host actually exposes them.

Never place Music User Tokens, developer tokens, or other credentials into curation prompts or persisted Taste State.
