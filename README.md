# Apple Music Personal Curator

> A reusable AI curation workflow for personalized Apple Music playlists — built around taste modeling, controlled discovery, sequencing, catalog verification, and playlist narrative.

**Version:** 1.0.0  
**License:** MIT  
**Author:** Zuh

## What it does

Most music recommenders optimize for the next click. **Apple Music Personal Curator** optimizes for the whole listening experience.

It asks an AI assistant to act less like a popularity engine and more like a curator:

- build a dynamic taste model instead of a single genre label;
- distinguish long-term taste from short-term mood and context;
- balance reliable picks, adjacent discovery, and controlled surprise;
- avoid artist / genre saturation and recommendation fatigue;
- sequence the playlist as a four-act listening arc;
- verify every final track against Apple Music or an equivalent catalog;
- write one immersive narrative for the playlist instead of 15 generic mini-reviews;
- learn from natural-language feedback over time when the host platform supports it.

The default daily playlist contains **15 tracks**.

## Why this Skill exists

A playlist can contain 15 individually good songs and still be a bad playlist.

This Skill treats recommendation as three linked problems:

1. **Selection** — what belongs in the set?
2. **Sequencing** — in what order should it be heard?
3. **Narrative** — what makes this particular set feel intentional?

The goal is not simply “songs you will probably like.” The goal is a listening session that is familiar enough to trust, adventurous enough to discover something, and coherent enough to finish.

## Core model

### Taste profile

The curator maintains 3–7 independent **Taste Clusters**, plus:

- a **Negative Profile** for explicit dislikes and fatigue;
- a **Short-term State** for current context and mood;
- feedback signals at track, artist, sound, cluster, context, sequence, and narrative level.

### Exploration budget

Typical starting point:

| Taste confidence | Reliable / familiar | Adjacent discovery | Controlled surprise |
|---|---:|---:|---:|
| Lower confidence | ~60% | ~30% | ~10% |
| Higher confidence | ~40% | ~40% | ~20% |

### Four-act sequencing

1. **Entrance** — trust and entry
2. **Expansion** — move beyond the obvious
3. **Discovery** — the strongest new finds
4. **Landing** — release, resolution, or afterglow

The first track is chosen as an entrance, not merely as the highest-ranked track. The final track must feel like an ending.

## Requirements

Best results require an AI environment that can:

- reason over user feedback;
- search the Apple Music catalog or an equivalent music metadata source;
- verify title, artist, version, release context, and availability.

Without catalog access, the Skill may still produce a **candidate curation**, but it must not claim that unverified tracks are confirmed Apple Music results.

## Install in ChatGPT

ChatGPT currently supports uploading Skills from your computer.

1. Download this repository as a ZIP, or download the release package.
2. In ChatGPT, open **Plugins → Skills**.
3. Choose **Create → Upload from your computer**.
4. Select the Skill package / files.
5. Review the Skill and its requested behavior before enabling it.

Availability of Skills and workspace sharing depends on your ChatGPT plan and workspace settings.

## Use it

Try prompts such as:

```text
给我今天的 Apple Music 歌单。今天下午工作，不想太吵，但也不要纯背景音乐。
```

```text
I loved tracks 3, 6 and 11 from yesterday. Track 8 felt too polished. Curate today’s playlist with slightly more discovery.
```

```text
我最近听腻了 Coldplay，但仍然喜欢那种旋律感。不要简单换成几个“相似艺人”，沿 songwriting 和声音质感往外找。
```

The Skill should minimize interrogation. If it lacks a taste profile, it should ask only for a few strong likes, a few dislikes, and a common listening context.

## Create a daily curation automation

After installing the Skill in ChatGPT, you can ask ChatGPT to create a recurring daily task with this prompt:

```text
请帮我创建一个每天执行的定时任务。

执行时间：每天上午 8:30。

每次任务运行时：
1. 使用 apple-music-personal-curator Skill，为我生成当天的 Apple Music 个性化歌单。
2. 默认生成 15 首歌，不要只推荐热门歌曲，也不要简单按照“相似艺人”扩展。
3. 综合考虑我的长期音乐偏好、最近反馈、近期推荐历史、当天场景和审美疲劳。
4. 在熟悉感、邻近探索和少量意外发现之间保持平衡。
5. 按 Entrance → Expansion → Discovery → Landing 的完整听觉弧线排序。
6. 每天尽量不要重复前一天的歌曲，同一艺人通常不要超过 2 首。
7. 最终歌曲必须通过 Apple Music 曲库核实歌曲名、艺人和版本；不要凭记忆虚构歌曲。
8. 为歌单设计一个有画面感的标题，并写一段完整的沉浸式叙事，而不是逐首歌曲介绍。
9. 如果掌握了我过去对歌单的反馈，请继续更新 Taste Profile；一次跳过不能直接等同于“不喜欢”。
10. 如果当天缺少上下文，不要让我填写长问卷；优先根据已有偏好生成，再通过反馈逐步学习。

每次完成后直接把当天歌单发送给我。
请现在创建这个每日定时任务。
```

Change `8:30` to any preferred delivery time. The exact automation and music-service capabilities depend on the ChatGPT account, plan, workspace settings, and connected services available to the user.

## Output style

Default output:

1. **Playlist Title**
2. **Narrative** — one coherent paragraph
3. **Apple Music Playlist** — verified tracks
4. Optional: 2–4 markers such as Anchor, Discovery, Wildcard, Ending

It should **not** produce 15 repetitive track-by-track blurbs unless requested.

## Safety, privacy, and data boundaries

This Skill does not require personal identity information.

It must not:

- infer sensitive personal traits from music taste;
- claim access to listening history or saved music that the host platform has not provided;
- claim persistent memory when the platform does not support it;
- fabricate songs, versions, release facts, or artist relationships.

Third-party catalog access remains subject to the permissions and policies of the host AI platform and connected music service.

## Repository structure

```text
apple-music-personal-curator/
├── SKILL.md
├── README.md
├── LICENSE
├── CHANGELOG.md
├── CONTRIBUTING.md
├── examples/
│   ├── prompts.md
│   └── sample-output.md
└── docs/
    └── design-notes.md
```

## Design principles

- **Taste is multi-cluster.** People can have contradictory preferences.
- **Dislike is not fatigue.** “I dislike it” and “I like it but not today” are different signals.
- **Discovery needs a bridge.** Surprise should remain explainable.
- **A playlist is not a Top 15.** Set quality and sequence matter.
- **Catalog grounding is mandatory.** A hallucinated track is never acceptable final output.
- **Narrative is an entry point, not an encyclopedia.**

## Contributing

Issues and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).

## Disclaimer

Apple Music is a trademark of Apple Inc. This project is an independent open-source workflow and is not affiliated with, endorsed by, or sponsored by Apple Inc. or OpenAI.
