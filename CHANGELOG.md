# Changelog

All notable changes to this project will be documented here.

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
