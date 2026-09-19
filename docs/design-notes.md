# Design Notes

## Recommendation is not ranking

The core design assumption is that playlist curation is a constrained set-selection and sequencing problem, not a Top-N retrieval problem.

A track can be individually excellent and still reduce the quality of a playlist if it:

- repeats an artist too soon;
- collapses diversity;
- breaks the listening arc;
- adds no discovery value;
- duplicates the function of another track;
- cannot be catalog-verified.

## Taste clusters

A user may like several unrelated or even contradictory kinds of music. The Skill therefore maintains multiple clusters rather than trying to compress taste into a single genre or persona.

A useful cluster describes *why* songs belong together: instrumentation, writing style, vocal texture, emotional motion, era, production, language, scene, or other musically meaningful dimensions.

## Bridge tracks

Bridge tracks connect two clusters through at least one explainable dimension. They are especially valuable because they make discovery feel earned rather than random.

## Surprise vs randomness

Serendipity is not random exploration. A surprise track should have at least one understandable connection to known taste, even when the overall result feels unexpected.

## Fatigue

Repeated recommendation success can create its own failure mode: the system keeps returning to the same artists, timbres, and emotional registers. The Skill therefore treats fatigue as a separate signal from dislike.

## Narrative

Narrative is applied after selection and sequencing have produced a coherent musical object. It should reveal the logic of the playlist without over-explaining it.

The narrative should never be used to justify a weak sequence after the fact.

## Two-stage recommendation

Candidate generation and final selection are intentionally separated. The first stage should maximize plausible recall across anchors, adjacent discovery, multiple Taste Clusters, bridges, behavior-neighbors, long-tail candidates, context, and controlled serendipity. The second stage optimizes the **set** rather than taking the highest individual scores.

This reduces first-thought bias and makes novelty, saturation, recent repetition, and transition quality explicit.

## Behavioral evidence

Authorized listening behavior improves timing but does not replace stated preference. Recently played is exposure, not automatically liking. Direct ratings/favorites are stronger evidence than passive plays, and explicit user feedback outranks both.

Behavior can simultaneously increase taste confidence and increase repetition fatigue. A track played yesterday may be a good seed for adjacent discovery and a bad direct recommendation for today's playlist.

## Structural novelty

Track-level deduplication is insufficient for daily curation. Two playlists can share no songs and still feel identical if they reuse the same language blocks, energy curve, timbre progression, opener, and landing. Recent playlists should therefore be compared by a lightweight structure fingerprint.

## Memorable peaks

Coherence alone can produce a smooth but forgettable playlist. The design now looks for roughly two or three plausible melodic peaks in a one-hour set while avoiding constant maximalism.

## Delivery is part of correctness

Catalog verification, interactive card generation, and Apple Music user-library write-back are separate states. The system must not collapse them into one success label. A playlist is not 'created in Apple Music' until the authorized write actually succeeds.