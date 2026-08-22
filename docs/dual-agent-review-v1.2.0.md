# Dual-Agent Design Review — v1.2.0

This note records a structured review from two deliberately different perspectives.

## Agent-1 — Professional music curator

### Main concerns

1. **The playlist needed a stronger reason to exist.** Candidate quality and ranking were good, but there was no explicit internal curatorial thesis tying the session together.
2. **The 15-track four-act model risked becoming mechanical.** It works well as a default but should adapt to short and long formats.
3. **Track function was under-specified.** A playlist benefits from thinking in roles such as Anchor, Bridge, Pivot, Discovery, and Landing rather than treating every track as an interchangeable recommendation.
4. **Context should shape musical judgment more deeply.** Focus music, a commute, active discovery, and late-night listening require different tolerances for lyrics, dynamic contrast, density, and transitions.
5. **Discovery needed an artistic quality test.** Obscurity is not discovery; the listener should be able to feel or understand the bridge.

### Proposed changes

- Add a Curatorial Brief and one-sentence thesis.
- Add soft track roles.
- Make sequencing adaptive by playlist length.
- Add transition intentions: Blend, Lift, Contrast, Reset.
- Preserve contextual scope when interpreting feedback.

## Agent-2 — Senior product development manager

### Main concerns

1. **Runtime capability differences were not explicit enough.** Catalog access, prior history, persistent memory, and scheduled-task context are independent capabilities.
2. **Scheduled runs must not block.** An unattended task cannot depend on a cold-start questionnaire.
3. **Claims must degrade gracefully.** If history is missing, do not claim deduplication. If catalog tools are missing, do not claim verified or playable Apple Music output.
4. **The Skill needed regression tests.** Product reliability should be tested through behavioral cases, not exact playlist equality.
5. **Public documentation contained volatile product-plan details.** Those should point to current official documentation rather than become stale repository facts.

### Proposed changes

- Add capability-gated operating modes.
- Add non-blocking scheduled behavior.
- Add behavioral evaluation cases.
- Keep user-visible output simple despite more internal rigor.
- Keep release automation version-driven and low-noise.

## Debate

### 1. Should every song receive a numeric score?

**Agent-2:** Numeric scoring would improve repeatability and testing.

**Agent-1:** Hard scoring would create false precision and encourage “Top N” behavior, which the Skill explicitly tries to avoid.

**Decision:** Keep multidimensional evaluation but no mandatory numeric score. Test behavior and constraints, not exact rankings.

### 2. Should every playlist contain all track roles?

**Agent-2:** Required roles would make output easier to validate.

**Agent-1:** Mandatory quotas would make short or highly specific playlists feel artificial.

**Decision:** Roles are soft design tools. Require movement and closure, not a checklist of labels.

### 3. Should the four-act model remain fixed?

**Agent-1:** No. Six tracks cannot honestly behave like 15.

**Agent-2:** The product still needs a stable sequencing contract.

**Decision:** Preserve the four-act model as the 15-track default, but generalize it proportionally. Very short playlists compress to Entry → Turn → Landing.

### 4. How much capability caveat should users see?

**Agent-2:** The Skill must disclose unavailable history or verification.

**Agent-1:** Repeating infrastructure disclaimers can destroy the listening experience.

**Decision:** Capability honesty is mandatory, but caveats stay brief and appear only when they materially change the result.

## Shared design principles after review

1. **Artistic intent before ranking.** Start with a curatorial thesis.
2. **Soft structure, hard honesty.** Musical roles and arcs are flexible; claims about tools, memory, and verification are not.
3. **Context does not equal identity.** Situational feedback should remain scoped.
4. **Discovery must be explainable.** Surprise without a bridge is randomness.
5. **Scheduled execution must complete.** Missing context should reduce confidence, not block delivery.
6. **Evaluation checks behavior, not identical songs.** The Skill should remain creative while retaining a stable product contract.
