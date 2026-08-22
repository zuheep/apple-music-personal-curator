# Apple Music Personal Curator

A portable Agent Skill that turns music recommendation into **curation**: multi-cluster taste modeling, controlled discovery, fatigue control, playlist sequencing, catalog verification, and one immersive narrative.

**Current version:** 1.1.1  
**License:** MIT  
**Author:** Zuh

## Why this exists

A playlist can contain 15 individually good songs and still be a bad playlist.

Apple Music Personal Curator treats recommendation as three linked problems:

1. **Selection** — which songs belong together?
2. **Sequencing** — in what order should they be heard?
3. **Narrative** — what makes this particular listening session feel intentional?

The goal is not “15 songs you will probably like.” The goal is a session that feels familiar enough to trust, adventurous enough to discover something, and coherent enough to finish.

## What it does

- models taste as 3–7 independent **Taste Clusters** instead of one genre label;
- separates long-term taste, explicit dislike, temporary fatigue, and current context;
- balances reliable picks, adjacent discovery, and controlled surprise;
- avoids artist / cluster saturation and recent repetition;
- builds a larger candidate pool before selecting the final set;
- sequences the playlist as **Entrance → Expansion → Discovery → Landing**;
- verifies final tracks and versions against Apple Music or an equivalent catalog;
- writes one immersive playlist narrative rather than 15 generic mini-reviews;
- learns from natural-language feedback when the host platform actually provides reusable context or memory.

Default length: **15 tracks**.

## Quick start

```text
给我今天的 Apple Music 歌单。今天下午工作，不想太吵，但也不要纯背景音乐。
```

```text
我最近听腻了 Coldplay，但仍然喜欢那种旋律感。不要简单换成几个“相似艺人”，沿 songwriting、制作质感和时代关系往外找。
```

```text
I loved tracks 3, 6 and 11. Track 8 felt too polished. Keep the same overall taste direction, but increase discovery slightly today.
```

## Install in ChatGPT

OpenAI Skills use the Agent Skills open format. In ChatGPT, eligible users can upload a Skill from their computer:

1. Open **Plugins** in the sidebar.
2. Open the **Skills** tab.
3. Choose **Create → Upload from your computer**.
4. Upload the latest release ZIP, or the extracted `apple-music-personal-curator` folder.
5. Review the Skill before enabling it.

Current OpenAI documentation says Personal Skills are generally available for **ChatGPT Business, Enterprise, Healthcare, and Edu**. Skills are also supported in **Codex and the API**. Personal Skills may need to be added separately across ChatGPT surfaces and may be controlled by workspace settings.

Official Skills documentation: <https://help.openai.com/en/articles/20001066-skills-in-chatgpt>

## Requirements and capability boundaries

Best results require an environment that can:

- reason over listener feedback;
- search Apple Music or an equivalent music catalog;
- verify title, artist, version, release context, and availability.

A catalog connection is **not the same thing as private listening-history access**. The Skill must never claim access to saved music, listening history, previous playlists, or persistent memory unless the host actually provides it.

Without catalog access, the Skill may produce **Candidate Curation — not catalog verified**, but it must not claim that the result is a confirmed or playable Apple Music playlist.

## Daily scheduled curation

ChatGPT Scheduled Tasks are a separate capability from Skills.

Current OpenAI documentation says Scheduled Tasks are available globally to **Plus, Pro, Business, and Enterprise** users. Tasks can use supported connected apps when those apps are available to the account or workspace. However, OpenAI's Tasks documentation does **not currently explicitly guarantee that an uploaded Personal Skill is available inside every scheduled-task run**.

Therefore, treat the prompt below as a reusable setup template, then verify the first scheduled run in the target ChatGPT environment.

Official Tasks documentation: <https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt>

### Copyable setup prompt

```text
请创建一个每天执行的音乐策展任务。

执行时间：每天上午 8:30。

如果当前任务运行环境能够使用 apple-music-personal-curator Skill，请使用它；如果不能，请遵循以下同等规则执行，并明确说明本次运行无法调用该 Skill。

每次运行时：
1. 为我生成当天约 15 首的 Apple Music 个性化歌单。
2. 综合我的长期音乐偏好、近期反馈、当前可见的推荐历史、当天场景与审美疲劳；不要假设你能读取实际上不可访问的历史。
3. 不要只推荐热门歌曲，也不要简单堆叠“相似艺人”。
4. 在熟悉感、邻近探索和少量可解释的意外发现之间保持平衡。
5. 按 Entrance → Expansion → Discovery → Landing 的听觉弧线排序。
6. 如果能够读取上一期结果，尽量避免连续重复歌曲；同一艺人通常不超过 2 首。如果无法读取上一期结果，不要声称已经完成去重。
7. 最终曲目必须通过 Apple Music 或可用的等价音乐目录核实歌曲名、艺人和版本；如果没有目录能力，把结果明确标记为“Candidate Curation — not catalog verified”。
8. 给歌单设计一个有画面感、非模板化的标题，并写一段完整的沉浸式叙事，而不是逐首歌曲介绍。
9. 只有在当前环境实际提供历史、记忆或之前反馈时，才继续更新 Taste Profile；一次无解释跳过不能直接等同于“不喜欢”。
10. 信息不足时不要让我填写长问卷；优先使用当前已有信息，只有确实无法形成可靠起点时才询问少量关键偏好。

每次完成后直接发送当天结果。
请创建这个每日任务，并告诉我下一次运行时间。
```

Change `8:30` to the listener's preferred delivery time.

## How the Skill thinks

### Taste model

The curator maintains 3–7 independent Taste Clusters plus:

- a **Negative Profile** for explicit dislikes and fatigue;
- a **Short-term State** for current context and mood;
- confidence-aware feedback signals.

See [`references/taste-model.md`](references/taste-model.md).

### Playlist design

Candidate generation includes anchors, adjacent discovery, multi-interest recall, bridge tracks, long-tail recall, context, and controlled serendipity. The final set is then sequenced rather than simply ranked.

See [`references/playlist-design.md`](references/playlist-design.md).

### Catalog grounding

Every confirmed final track must be checked against the available music catalog. Version differences such as studio, live, remaster, cover, soundtrack, or language-specific releases are treated explicitly.

See [`references/catalog-grounding.md`](references/catalog-grounding.md).

## Default output

1. **Playlist Title**
2. **Narrative** — one coherent paragraph
3. **Playlist** — verified tracks in listening order
4. Optional markers: **Anchor · Discovery · Wildcard · Ending**

The Skill should not produce 15 repetitive track-by-track blurbs unless requested.

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
├── docs/
└── .github/
```

The main `SKILL.md` contains the activation logic and core workflow. Detailed reasoning rules live in `references/` and are loaded only when needed, following the Agent Skills progressive-disclosure pattern.

## Design principles

- **Taste is multi-cluster.** Contradictory preferences are normal.
- **Dislike is not fatigue.** “I dislike it” and “I like it but not today” are different signals.
- **Discovery needs a bridge.** Surprise should remain explainable.
- **A playlist is not Top 15.** Set quality and sequence matter.
- **Catalog grounding is mandatory for confirmed output.**
- **Memory must be real.** Never invent access to listening history or previous runs.
- **Narrative is an entry point, not an encyclopedia.**

## Releases and validation

- Changes to `SKILL.md` are validated automatically.
- The version is stored in `metadata.version`.
- A new semantic version in `SKILL.md` triggers an immutable GitHub Release and a portable ZIP package.
- Documentation-only changes do not trigger a new release.

## Contributing

Issues and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).

## Disclaimer

Apple Music is a trademark of Apple Inc. This project is an independent open-source workflow and is not affiliated with, endorsed by, or sponsored by Apple Inc. or OpenAI.
