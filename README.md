# Apple Music Personal Curator

A portable Agent Skill that turns music recommendation into **curation**: multi-cluster taste modeling, user-authorized listening signals when available, two-stage candidate generation and reranking, novelty control, adaptive sequencing, catalog verification, delivery gates, and one immersive narrative.

**Current version:** 1.5.0  
**License:** MIT  
**Author:** Zuh

## Why this exists

A playlist can contain individually good songs and still be a bad playlist.

Apple Music Personal Curator treats recommendation as three linked problems:

1. **Selection** — which songs belong together?
2. **Sequencing** — in what order should they be heard?
3. **Narrative** — what makes this listening session feel intentional?

The goal is not “15 songs you will probably like.” The goal is a session that feels familiar enough to trust, adventurous enough to discover something, and coherent enough to finish.

## What changed in v1.5

v1.5 makes feedback deliberately easier than playlist creation.

### Frictionless feedback

Daily playlists may end with one optional line:

`反馈（可选）：直接回「3👍 7👍 5👎」即可；整张也可只回「很喜欢 / 无记忆点 / 太软 / 太吵 / 太熟 / 太生 / 前好后弱 / 后半更好 / 曲序怪 / 刚好」。`

The listener does **not** need to rate every track or explain why.

- unmentioned tracks stay unknown;
- one track signal is enough;
- one whole-playlist tag is enough;
- shorthand such as `+3`, `-5`, `喜欢3`, or `5不喜欢` is accepted;
- playlist-level criticism changes curation / sequencing rather than being copied onto every track;
- after feedback, the curator acknowledges briefly instead of starting a questionnaire.

This keeps explicit feedback — the highest-quality free personalization signal — cheap enough to use repeatedly.

## What changed in v1.3\n\nv1.3 upgrades the project from a curation prompt into a clearer recommendation-system contract.\n\n### Real listening signals\n\nThe Skill can consume **user-authorized behavioral signals** when the host exposes them: recently played tracks/resources, personal ratings, favorites, library membership, Apple personalized recommendations, and Apple Music Replay summary data.\n\nThe key rule is: **exposure is not preference**. A recent play may indicate interest, habit, autoplay, testing, background use, or fatigue. Explicit user feedback remains higher priority.\n\nSee [references/listening-signals.md](references/listening-signals.md).\n\n### Two-stage curation\n\nFor a default one-hour playlist, the curator first builds roughly **30–45 candidates**, then reranks them into **14–16 final tracks** before sequencing.\n\n### Cooldown and structural novelty\n\nWhen trustworthy history exists, the default recommendation controls are **30 days for the same track** and a **7-day soft penalty for the same artist**. Recent playlists are also compared by a rough structure fingerprint: language mix, era distribution, style center, energy curve, opener/closer type, artist overlap, and density/texture pattern.\n\n### Melodic peaks\n\nA smooth playlist can still be forgettable. The default daily playlist should normally contain roughly **2–3 plausible melodic peaks** without turning into constant maximalist choruses.\n\n### Stronger Apple Music verification\n\nRecording verification now considers title, artist, album context, release date, duration, and **ISRC** when useful. Unexpected Live / Acoustic / Remix / Edit / Demo / Session results trigger reflective retry. If the final interactive component cannot reliably lock to the intended recording, replace the track rather than knowingly shipping a mismatch.\n\n### Delivery Gate\n\nThe Skill now distinguishes catalog verification, interactive Apple Music card generation, and user-library playlist write-back. A sentence saying “Open Playlist in Apple Music” is not proof that a card or playlist exists.\n\n## Core design

### 1. Capability-aware operation

The Skill first distinguishes:

| Mode | Catalog verification | Prior history / continuity | Behavior |
|---|---|---|---|
| A — Verified + continuity | Yes | Yes | Full curation, continuity, repetition control, feedback learning |
| B — Verified + stateless | Yes | No | Verified curation without invented memory or cross-day deduplication |
| C — Candidate curation | No | Any | Explicitly unverified draft; never claims playability |

Cold start is handled separately and never requires a long questionnaire.

### 2. Curatorial Brief

Each run forms a short internal brief containing:

- listener state;
- listening function / context;
- familiarity versus discovery target;
- energy trajectory;
- hard avoids;
- continuity and catalog status;
- one **curatorial thesis** explaining why these songs belong together today.

This is a creative compass, not a visible scorecard.

### 3. Multi-cluster taste

The curator keeps 3–7 independent Taste Clusters and separates:

- long-term preference;
- explicit dislike;
- temporary fatigue;
- context-specific preference;
- short-term state.

“Not for focused work” is not automatically “never recommend.”

### 4. Track roles

Tracks may serve soft roles such as:

**Anchor · Bridge · Pivot · Discovery · Wildcard · Peak · Landing**

Roles help create movement without forcing a rigid quota.

### 5. Adaptive sequencing

The default 15-track arc remains:

**Entrance → Expansion → Discovery → Landing**

But shorter and longer playlists preserve the arc instead of mechanically using fixed track numbers. A six-track playlist may compress into **Entry → Turn → Landing**.

Transitions are designed as **Blend, Lift, Contrast, or Reset** rather than treated as accidental adjacency.

## Real listening behavior + ChatGPT curation\n\nThe recommended architecture stays small:\n\nApple Music / MusicKit → Behavior Adapter → normalized BehaviorSnapshot → Taste State → Candidate Generation → Reranking + Sequencing → Recording Verification → Preview / Card → optional user-library playlist write-back.\n\nThe adapter should expose normalized music signals and keep tokens / credentials outside model context.\n\nApple currently documents MusicKit / Apple Music API support for personalized recommendations, recently played resources and tracks, ratings, favorites, library access, latest Apple Music Replay summary data, and creating/modifying user-library playlists with user authorization. Use Apple’s current developer documentation as the source of truth.\n\n- https://developer.apple.com/musickit/\n- https://developer.apple.com/documentation/applemusicapi/\n- https://developer.apple.com/documentation/applemusicapi/get-v1-me-recent-played-tracks\n- https://developer.apple.com/documentation/applemusicapi/create-a-new-library-playlist\n\nDo not assume skip count, completion rate, or listening duration unless a host explicitly supplies them.\n\nSee [docs/musickit-bridge.md](docs/musickit-bridge.md).\n## Quick start

```text
给我今天的 Apple Music 歌单。今天下午工作，不想太吵，但不要纯背景音乐。熟悉感 60%，发现感 40%。
```

```text
我喜欢 Coldplay，但最近听腻了。不要给我一串“相似艺人”，沿旋律写作、制作质感和时代关系往外找。
```

```text
我平时喜欢歌词很重的 singer-songwriter，但今天要专注工作。今天少歌词，不代表我长期不喜欢人声。
```

More examples: [`examples/prompts.md`](examples/prompts.md).

## Install in ChatGPT

ChatGPT Skills use the Agent Skills open format. Availability, upload flow, and workspace controls can change by product and plan, so use the current OpenAI documentation as the source of truth:

<https://help.openai.com/en/articles/20001066-skills-in-chatgpt>

Typical flow for an eligible account:

1. Open **Plugins → Skills**.
2. Choose **Create → Upload from your computer**.
3. Upload the latest release ZIP or extracted Skill folder.
4. Review the Skill before enabling it.

The Skill is also portable to other Agent Skills-compatible clients.

## Requirements and boundaries

Best results require an environment that can:

- reason over listener feedback;
- search Apple Music or an equivalent music catalog;
- verify title, artist, version, release context, and availability.

Catalog access is **not** the same thing as private listening-history access. The Skill must never claim access to saved music, listening history, previous playlists, or persistent memory unless the host actually provides it.

Without catalog access, the result must be labeled **Candidate Curation — not catalog verified**.

## Daily scheduled curation

Scheduled Tasks are a separate capability from Skills. Current product support may differ by account, workspace, and execution environment. Verify the first scheduled run rather than assuming an uploaded Personal Skill, prior task output, or music connector will always be available.

Current OpenAI Tasks documentation:

<https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt>

### Copyable setup prompt

```text
请创建一个每天执行的音乐策展任务。

执行时间：每天上午 8:30。

如果当前任务运行环境能够使用 apple-music-personal-curator Skill，请使用它；如果不能，请遵循以下同等规则执行，并明确说明本次运行无法调用该 Skill。

每次运行时：
1. 为我生成当天约 15 首的 Apple Music 个性化歌单。
2. 综合当前真正可见的长期偏好、近期反馈、推荐历史、当天场景与审美疲劳；不要假设你能读取实际上不可访问的历史。
3. 不要只推荐热门歌曲，也不要简单堆叠“相似艺人”。
4. 在熟悉感、邻近探索和少量可解释的意外发现之间保持平衡。
5. 先形成一个内部策展命题，再按 Entrance → Expansion → Discovery → Landing 的听觉弧线组织；如果曲目数量不同，适配结构而不是机械套固定位置。
6. 如果能够读取上一期结果，尽量避免连续重复歌曲；如果无法读取，不要声称已经完成跨日去重。
7. 最终曲目必须通过 Apple Music 或可用的等价音乐目录核实；如果没有目录能力，明确标记为“Candidate Curation — not catalog verified”。
8. 给歌单设计一个有画面感、非模板化的标题，并写一段完整的沉浸式叙事，而不是逐首歌曲介绍。
9. 只有在当前环境实际提供历史、记忆或之前反馈时，才更新 Taste Profile；一次无解释跳过不能直接等同于“不喜欢”。
10. 这是定时任务时不要因为缺少偏好而阻塞询问；使用已有信息做保守但完整的最佳努力结果。

每次完成后直接发送当天结果。
请创建这个每日任务，并告诉我下一次运行时间。
```

## Progressive disclosure

The main `SKILL.md` contains the activation logic and core workflow. Detailed guidance lives in focused references loaded only when needed:

- [`references/taste-model.md`](references/taste-model.md) — Taste Clusters, context, evidence confidence, fatigue, cooldown;\n- [`references/listening-signals.md`](references/listening-signals.md) — normalized behavior signals, evidence hierarchy, authorization boundaries;\n- [`references/playlist-design.md`](references/playlist-design.md) — candidate lanes, reranking, structure fingerprints, melodic peaks, sequencing;\n- [`references/catalog-grounding.md`](references/catalog-grounding.md) — recording identity, ISRC, reflective retry, Card Gate, write-back boundary.

This follows the Agent Skills progressive-disclosure pattern and keeps the core instructions compact.

Agent Skills specification: <https://github.com/agentskills/agentskills/blob/main/docs/specification.mdx>

## Evaluation

Behavioral regression cases live in [`examples/evaluation-cases.md`](examples/evaluation-cases.md). They test:

- fatigue versus dislike;
- contradictory Taste Clusters;
- context-scoped preference;
- adaptive short playlists;
- scheduled stateless runs;
- no-catalog fallback;
- controlled surprise;
- narrative quality.

The expected playlist can change; the behavioral contract should not.

## Default output

1. **Playlist Title**
2. **Narrative** — one coherent paragraph
3. **Playlist** — verified tracks in listening order
4. Optional markers: **Anchor · Bridge · Discovery · Wildcard · Ending**

The Skill should not produce one mini-review per track unless requested.

## Repository structure

```text
apple-music-personal-curator/
├── SKILL.md
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── references/
│   ├── taste-model.md
│   ├── playlist-design.md
│   └── catalog-grounding.md
├── examples/
│   ├── prompts.md
│   ├── sample-output.md
│   └── evaluation-cases.md
├── docs/
│   ├── design-notes.md
│   └── dual-agent-review-v1.2.0.md
└── .github/
```

## Releases and validation

- `SKILL.md` changes are validated automatically.
- The semantic version is stored in `metadata.version`.
- A new version in `SKILL.md` triggers a GitHub Release and portable ZIP.
- Documentation-only changes do not trigger a new release.

## Contributing

Issues and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).

## Disclaimer

Apple Music is a trademark of Apple Inc. This project is an independent open-source workflow and is not affiliated with, endorsed by, or sponsored by Apple Inc. or OpenAI.
