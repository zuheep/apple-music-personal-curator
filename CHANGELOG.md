# Changelog

All notable changes to this project will be documented here.

## 1.4.0 — 2026-09-19

Production-oriented MusicKit bridge MVP for real listening behavior and verified playlist write-back.

### MusicKit bridge

- Added optional loopback-only Node bridge under `integrations/musickit-bridge/`.
- Added user-authorized recently played tracks and Apple personalized recommendations as normalized `BehaviorSnapshot` inputs.
- Preserved the rule that recent playback is exposure, not automatic preference.
- Added private Apple Music library playlist creation from already verified catalog song IDs.
- Added ES256 developer-token generation, external Music User Token handling, and bearer-protected local bridge access.
- Added explicit capability flags so ratings, favorites, Replay, and other telemetry remain unavailable until actually implemented.
- Added unit tests, syntax checks, and GitHub Actions CI for the bridge.

### Scheduling integration

- Daily curation can now consume a real `BehaviorSnapshot` when an authorized connector exposes it, and must degrade honestly when live behavior data is unavailable.

## 1.3.0 — 2026-09-19

Behavior-aware two-stage curation and Apple Music delivery reliability.

### Recommendation architecture

- Added explicit **Candidate Generation → Set Reranking → Sequencing** stages.
- Added a default 30–45 track internal candidate pool for a 14–16 track daily playlist.
- Added recent-history cooldown: 30 days for the same track and a 7-day soft artist penalty when history is truly available.
- Added recent-playlist **structure fingerprints** to reduce repeated language blocks, energy curves, opener/closer patterns, and artist ecosystems.
- Added a 2–3 **melodic peak** target to prevent smooth-but-forgettable playlists.

### Real listening signals

- Added optional user-authorized Apple Music / MusicKit behavioral input.
- Added normalized signal handling for recently played, ratings, favorites, library membership, Apple recommendations, and Replay summary data when available.
- Added evidence precedence so explicit user feedback outranks passive listening behavior.
- Added the rule **exposure is not preference** and **no feedback is unknown**.
- Added `references/listening-signals.md` and `docs/musickit-bridge.md`.

### Catalog and delivery reliability

- Added duration and ISRC-aware recording identity checks.
- Added explicit retry triggers for Live, Acoustic, Remix, Edit, Demo, Session, wrong artist, implausible date, and suspicious duration.
- Added a replacement policy when the correct recording cannot be reliably locked into the final interactive component.
- Added **Card Gate** and separate user-library write-back semantics so text never masquerades as a generated Apple Music component.

### Regression coverage

- Expanded evaluation cases for behavioral conflicts, missing feedback, structural repetition, smooth-but-forgettable sets, wrong-version fuzzy matches, card generation, partial telemetry, and authorized playlist write-back.

## 1.2.0 — 2026-08-22

Dual-agent curation and product reliability review.

### Music curation improvements

- Added an internal **Curatorial Brief** and one-sentence curatorial thesis.
- Added soft track roles: Anchor, Bridge, Pivot, Discovery, Wildcard, Landing.
- Made the four-act structure adaptive to playlist length rather than fixed to 15 tracks.
- Added intentional transition types: Blend, Lift, Contrast, Reset.
- Added context-specific sequencing guidance for focus, commute, workout, late-night, and active-discovery sessions.
- Strengthened the rule that discovery must be explainable rather than merely obscure.

### Product and reliability improvements

- Added explicit operating modes for verified-with-history, verified-stateless, and no-catalog environments.
- Added non-blocking behavior for scheduled / unattended cold starts.
- Added context-scoped feedback so situational preferences do not overwrite global taste.
- Clarified that behavioral telemetry may only be used when the host actually exposes it.
- Added behavioral regression cases in `examples/evaluation-cases.md`.
- Reduced volatile product-plan claims in the README and linked current official documentation instead.

### Collaboration record

- Added `docs/dual-agent-review-v1.2.0.md` documenting the music-curator / product-manager review and trade-offs.

## 1.1.1 — 2026-08-22

Reliability and release cleanup.

- Clarified Personal Skill versus Scheduled Task capability boundaries.
- Limited release automation to `SKILL.md` version changes.
- Reduced unnecessary GitHub Actions notification noise for documentation-only edits.

## 1.1.0 — 2026-08-22

- Refactored the original long-form Skill into a concise core workflow plus `references/`.
- Moved semantic version metadata under `metadata.version`.
- Added Agent Skills validation and version-driven release automation.

## 1.0.0 — 2026-08-22

First public release.

### Added

- Public installation and compatibility guidance.
- Explicit capability fallback when Apple Music catalog access is unavailable.
- Privacy and memory boundaries.
- Final quality checklist.
- Public README, contribution guide, examples, design notes, and MIT license.

### Preserved from the original curator design

- Multi-cluster Taste Profile.
- Negative Profile and short-term state separation.
- Confidence-aware exploration budget.
- Anchor, adjacent, multi-interest, bridge, long-tail, context, and serendipity recall.
- Saturation and fatigue penalties.
- Four-act playlist sequencing.
- Catalog grounding and reflective retry.
- Immersive Narrative Engine.
- Natural-language learning loop.
