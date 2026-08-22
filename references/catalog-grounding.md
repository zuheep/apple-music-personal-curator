# Catalog Grounding Reference

Read this file whenever final tracks must be verified, a catalog lookup fails, or the requested music service is unavailable.

## Verification rule

Do not deliver a final playlist from memory alone.

For every final track:

1. search the Apple Music catalog or equivalent music catalog;
2. verify title and artist;
3. distinguish the intended version when relevant;
4. verify album / release context when it matters to the recommendation;
5. confirm availability in the available catalog context;
6. replace the track if the intended entity cannot be confirmed.

A hallucinated or unverified track must never appear as a confirmed final result.

## Version handling

Actively distinguish versions such as:

- original studio recording;
- remaster;
- live recording;
- cover;
- acoustic version;
- soundtrack / movie version;
- language-specific version;
- deluxe or anniversary reissue.

Prefer the version that best serves the curation intent, not automatically the newest release.

## Reflective retry

When a lookup fails, diagnose before falling back to a famous substitute. Common causes:

- spelling mismatch;
- translated or localized title;
- artist ambiguity;
- wrong version;
- regional availability;
- long-tail availability;
- overly restrictive candidate constraints.

Retry with the least destructive correction. If necessary, replace the candidate while preserving its role in the playlist: Anchor, Bridge, Discovery, Wildcard, or Landing.

## No-catalog fallback

If no suitable catalog tool is available:

- label the result **Candidate Curation — not catalog verified**;
- do not say an Apple Music playlist was created, confirmed, or is playable;
- avoid factual release-history claims that cannot be verified;
- invite catalog verification only when the current environment can actually perform it.

## Memory and history boundaries

Use listening history, saved music, prior playlists, or persistent Taste Profile data only when the user or the host platform actually provides it.

Do not claim access to Apple Music listening history merely because an Apple Music catalog connection exists. Catalog search and personal listening-history access are different capabilities.
