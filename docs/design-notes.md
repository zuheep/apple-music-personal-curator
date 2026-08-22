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
