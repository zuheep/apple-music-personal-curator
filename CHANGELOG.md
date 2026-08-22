# Changelog

All notable changes to this project are documented here.

## 1.1.1 — 2026-08-22

Public-release hardening and lower-noise automation.

### Changed

- Rewrote `SKILL.md` around a shorter activation workflow with progressive disclosure.
- Moved detailed taste-model, playlist-design, and catalog-grounding guidance into `references/`.
- Moved the semantic version into `metadata.version` for Agent Skills compatibility.
- Strengthened capability boundaries around catalog access, listening history, persistent memory, and previous scheduled-task runs.
- Rewrote the Scheduled Tasks prompt so it degrades safely when the Skill, prior-run history, or catalog tools are unavailable.
- Clarified current ChatGPT Skills and Scheduled Tasks availability in the README.
- Added automated Skill validation.
- Replaced the hard-coded v1.0.0 release workflow with a version-driven release workflow.
- Reduced GitHub Actions noise: documentation-only changes no longer trigger validation or release workflows.

## 1.1.0 — 2026-08-22

### Changed

- Introduced a more concise core workflow and reference-based architecture.
- Added explicit daily / recurring curation behavior.
- Added stronger no-catalog and memory-boundary handling.

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
