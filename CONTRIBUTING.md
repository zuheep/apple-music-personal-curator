# Contributing

Contributions are welcome when they improve curation quality without turning the Skill into a generic popularity recommender.

## Good contributions

Examples include:

- better cold-start logic;
- better sequencing heuristics;
- stronger catalog verification;
- improvements to multilingual / cross-era discovery;
- better fatigue and repetition control;
- evaluation cases for playlist coherence;
- clearer privacy and memory boundaries;
- examples that expose failure modes.

## Please preserve these invariants

1. Do not reduce taste to one genre or one artist-neighborhood.
2. Do not equate skipping with permanent dislike.
3. Do not select the final playlist by a simple Top-N score.
4. Do not deliver unverified tracks as final catalog-grounded output.
5. Do not fabricate music facts in the narrative.
6. Do not replace discovery with popularity fallback when a long-tail candidate fails verification.
7. Do not claim data access or persistent memory the host platform does not provide.

## Pull requests

For behavior changes, describe:

- the failure mode being addressed;
- the proposed change;
- one or more example inputs;
- expected behavior before / after;
- any trade-offs in personalization, discovery, diversity, or coherence.
