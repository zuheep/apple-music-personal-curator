# MusicKit Bridge Design

This document defines the smallest integration needed to combine **real Apple Music behavior + ChatGPT curation** without turning the Skill itself into an account-service backend.

## Goal

Expose a normalized, privacy-bounded behavior snapshot to the curator, then optionally write the final verified playlist back to Apple Music after curation.

Recommended flow:

Apple Music / MusicKit → Behavior Adapter → BehaviorSnapshot → Curator → verified final set → optional playlist write-back.

## Current Apple capabilities to design around

With user authorization, Apple currently documents APIs for:

- recently played tracks: `GET /v1/me/recent/played/tracks`;
- recently played resources: `GET /v1/me/recent/played`;
- personalized recommendations;
- personal content ratings;
- favorites;
- library resources;
- Apple Music Replay summary data exposed through current MusicKit / Apple Music API capabilities;
- creating a library playlist: `POST /v1/me/library/playlists`;
- adding tracks to a library playlist: `POST /v1/me/library/playlists/{id}/tracks`.

Treat Apple documentation as the source of truth because endpoint availability and response shape may evolve.

## Authentication boundary

The bridge, not the curator prompt, owns authentication.

Keep outside model context:

- Music User Token;
- developer token / private key material;
- cookies;
- account identifiers not needed for curation.

The model should receive normalized music data only.

## BehaviorSnapshot contract

A practical adapter contract:

```json
{
  "collected_at": "ISO-8601 timestamp",
  "storefront": "my",
  "sources": ["recently_played", "ratings", "favorites", "replay"],
  "recent_tracks": [],
  "ratings": [],
  "favorites": [],
  "library_items": [],
  "recommendations": [],
  "replay_summary": null,
  "capabilities": {
    "recent_tracks": true,
    "ratings": true,
    "favorites": true,
    "library": true,
    "recommendations": true,
    "replay": true,
    "playlist_write": false
  }
}
```

Do not fill absent fields with invented values. Capability flags describe what was actually obtained in the current run.

## Normalized track identity

Where available, retain:

- Apple catalog ID;
- library ID if relevant;
- title;
- artist;
- album;
- duration;
- release date;
- ISRC.

ISRC helps connect the same recording across different Apple Music release containers.

## Signal interpretation

Default precedence:

1. explicit current user feedback;
2. explicit reusable preference;
3. direct Apple preference signal such as rating / favorite;
4. repeated recent exposure;
5. library membership;
6. Apple recommendation result;
7. single recent play;
8. no signal.

Recently played is exposure, not automatic positive feedback.

## Adapter output should be minimal

Do not dump the entire Apple Music account into the model.

Prefer bounded windows:

- recent tracks: enough to detect current exposure and seeds;
- ratings / favorites: only relevant entities or a compact recent / sampled set;
- Replay: summary-level data;
- recommendations: limited recall candidates;
- library: query only when needed for rediscovery or identity.

## Playlist write-back

Write-back must occur only after:

1. final candidate set selected;
2. exact recordings verified;
3. sequence finalized;
4. final preview / card synchronized.

Then:

- create a new library playlist or target an explicitly selected editable playlist;
- write tracks in final order;
- confirm success from Apple;
- return the created playlist identifier / host UI only after success.

Do not claim write-back from a generated text list.

## Failure behavior

If behavioral read fails:

- continue with explicit taste and available playlist history;
- mark behavior capability unavailable internally;
- do not block scheduled curation.

If playlist write fails:

- keep the verified card / text list;
- say write-back failed or was unavailable;
- do not retry destructive operations blindly.

If one catalog track cannot resolve to the intended recording:

- replace it before write-back;
- never write a known wrong Live / Acoustic / Remix match merely to complete the playlist.

## AgentDockVPS role

A VPS implementation can host the adapter and token-handling layer while keeping the curator portable.

Suggested boundaries:

- VPS: authentication, Apple API calls, normalization, bounded state cache, playlist write-back;
- curator Skill: taste reasoning, candidate generation, reranking, sequencing, verification policy;
- ChatGPT / host: user interaction, explicit feedback, final presentation.

Keep the first implementation small. The integration is successful when it can reliably provide recent tracks + direct preference signals + optional playlist write-back. Advanced telemetry should wait until the host actually exposes trustworthy data.