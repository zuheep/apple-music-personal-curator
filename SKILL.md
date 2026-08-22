---
name: apple-music-personal-curator
description: Generate personalized Apple Music playlists using long-term taste, short-term context, controlled exploration, fatigue control, sequencing, catalog verification, and immersive playlist narratives. Use this skill for daily music recommendations, playlist curation, taste-profile learning, Apple Music song discovery, or narrative playlist design.
version: 1.0.0
license: MIT
compatibility: Any AI assistant that can reason over user feedback and access Apple Music catalog search or equivalent music metadata tools. Optimized for ChatGPT with Apple Music catalog tools.
metadata:
  author: Zuh
  tags: music apple-music recommendation playlist curation personalization narrative
  agentskills_spec: "1.0"
---

# Apple Music Personal Curator

## Purpose

为每个用户生成真正个性化、可持续学习、有探索感并具有完整听觉叙事的 Apple Music 歌单。

目标不是预测“用户最可能点击哪一首歌”，而是策划一段值得完整听完的音乐体验。

默认每日歌单为 15 首。

## When to Use

在以下请求中优先使用本 Skill：

- 今日 / 每日音乐推荐
- 为某个场景、时段或情绪策展
- 根据用户长期偏好生成 Apple Music 歌单
- 在熟悉感与发现感之间做平衡推荐
- 根据用户对过去歌单的反馈继续学习
- 为歌单设计标题、顺序和沉浸式叙事

如果用户只是询问某首歌、某位艺人的事实信息，不必强制运行完整策展流程。

## Required Capabilities

最佳体验需要：

1. 可搜索 Apple Music 曲库或等价音乐目录；
2. 能验证曲名、艺人、版本和可用性；
3. 能读取当前会话中的用户反馈；
4. 若平台允许持久化偏好，可维护 Taste Profile；若不允许，则只使用当前可见上下文，不得声称已长期记住。

若没有 Apple Music 曲库访问能力：

- 可以生成“候选策展方案”；
- 必须明确说明曲目尚未完成目录验证；
- 不得把未验证结果表述为已创建或已确认可播放的 Apple Music 歌单。

## Core Philosophy

推荐音乐时同时优化：

1. Personal Relevance — 与用户真实音乐偏好的匹配度
2. Context — 当下场景与短期兴趣
3. Discovery — 新鲜感与邻近探索
4. Serendipity — 控制范围内的意外发现
5. Diversity — 艺人、年代、语言、风格和声音多样性
6. Coherence — 整张歌单及相邻歌曲的连贯性
7. Fatigue Control — 避免重复与兴趣坍缩
8. Narrative — 让整张歌单形成一个可以被感受到的故事

不得单纯按照歌曲知名度、艺人相似度或热门程度生成歌单。

## User Taste Model

维护动态 Taste Profile，而不是单一音乐标签。

### Long-term Taste

识别 3–7 个相互独立的 Taste Clusters。

每个 Cluster 可包含：

- representative artists
- representative tracks
- genres
- language
- era
- instrumentation
- vocal characteristics
- production style
- energy
- emotional tone
- lyrical preference
- familiarity preference
- exploration tolerance

允许兴趣之间相互矛盾。不要强迫所有音乐偏好归入同一种人格。

### Negative Profile

单独记录：

- 明确不喜欢的歌曲
- 明确不喜欢的艺人
- 不喜欢的声音特征
- 不喜欢的情绪表达
- 已经听腻的歌曲 / 艺人
- “喜欢但最近不想听”

“听腻”和“不喜欢”不得合并。

### Short-term State

每次推荐考虑：

- 最近主动提到或选择的歌曲
- 最近喜欢 / 删除的推荐
- 当前场景
- 当前情绪
- 当前希望获得熟悉感还是发现感
- 最近几张歌单产生的审美疲劳

短期兴趣不得完全覆盖长期兴趣。

## Feedback Signals

反馈按置信度处理。

### Strong Positive

- 明确说“非常喜欢”
- Favorite / 收藏
- 主动保存歌单
- 主动要求“再来类似的”
- 多次主动提到同一首歌或艺人

### Moderate Positive

- 表示“不错”
- 完整听完
- 主动询问歌曲 / 艺人信息

### Strong Negative

- 明确不喜欢
- Suggest Less
- 明确要求以后不要推荐某种声音
- 很快跳过并明确表示原因

### Weak Negative

- “一般”
- “今天不想听”
- 跳过但没有明确原因

不得因为一次跳过永久判定用户不喜欢某歌曲类型。

## Cold Start

如果用户画像不足，不做大量问卷。

优先从已有上下文、已保存歌单和明确反馈中建立初始画像。

信息仍不足时，只收集最少信息：

- 3–5 首非常喜欢的歌曲
- 2–3 首明确不喜欢的歌曲
- 最近最常见的听歌场景

之后通过推荐反馈逐步学习。

## Candidate Generation

生成最终歌单前，先形成远大于最终数量的候选池。

候选池至少来自以下不同路径。

### Anchor Recall

用户明确喜欢的歌曲、艺人及高度相关作品。

### Adjacent Discovery

与已有兴趣在一到两个维度相邻，但并非完全同质的歌曲。

例如，喜欢 Coldplay 不等于继续推荐大量 Coldplay。可以沿以下方向向外扩展：

- era
- songwriting
- melodic structure
- instrumentation
- emotional tone
- scene
- producer
- related artist ecosystem

### Multi-interest Recall

分别从不同 Taste Cluster 召回候选，避免单一兴趣占满歌单。

### Bridge Recall

寻找能够连接两个 Taste Cluster 的歌曲。Bridge Track 是高价值候选。

### Long-tail Recall

主动寻找知名度较低但匹配度高的作品。不得因为不确定就退回全部热门歌曲。

### Context Recall

根据今天的场景和短期状态加入候选。

### Serendipity Recall

加入少量“不明显但解释得通”的歌曲。惊喜必须与用户已有偏好存在至少一个可解释连接点。

## Exploration Budget

探索比例根据 Taste Confidence 动态调整。

低置信度用户：

- 约 60% reliable / familiar
- 约 30% adjacent discovery
- 约 10% controlled surprise

高置信度用户：

- 约 40% reliable
- 约 40% adjacent discovery
- 约 20% controlled surprise

不得为了“发现新歌”刻意塞入大量不相关冷门音乐。

## Ranking

对候选歌曲综合评估：

- Personal Fit
- Short-term Fit
- Context Fit
- Discovery Value
- Serendipity
- Diversity Contribution
- Transition Compatibility
- Narrative Value
- Catalog Confidence

同时应用 Penalty：

- Recent Repetition Penalty
- Artist Saturation Penalty
- Genre Saturation Penalty
- Overfamiliarity Penalty
- Fatigue Penalty
- Unverified Entity Penalty

推荐排序不是简单取 Top 15。先选择一个优秀的集合，再进行 Playlist Sequencing。

## Daily Repetition Rules

除非有明确理由：

- 连续两天尽量不重复歌曲
- 同一艺人每日通常不超过 2 首
- 同一艺人不得长期高频出现
- 不允许一个 Taste Cluster 长期占据整张歌单
- 用户特别喜欢的歌曲可以成为 Anchor，但不能每天出现

维护“熟悉感”，不制造“重复感”。

## Playlist Sequencing

默认 15 首歌曲按照四幕组织。

### Act I — Entrance

Track 1–3：建立信任和进入感。至少有一个较高置信度的 Anchor。

第一首不是全歌单评分最高的歌曲，而是最合适的“入口”。

### Act II — Expansion

Track 4–7：逐渐离开最熟悉的区域，通过艺人、声音、年代、情绪或制作关系完成自然扩张。

### Act III — Discovery

Track 8–11：承载当天最重要的新发现。允许更深、更陌生或更有个性的歌曲出现。至少包含一个 Bridge Track 或 Serendipity Track。

### Act IV — Landing

Track 12–15：形成变化、释放或余韵。最后一首必须像一个真正的结尾，不得因为歌曲评分高就随意放在最后。

## Transition Rules

检查每一组相邻歌曲，考虑：

- energy
- tempo perception
- instrumentation
- vocal texture
- language
- production density
- emotional direction
- era
- intro / outro feeling

避免连续出现大量几乎相同的歌曲，也避免毫无铺垫的巨大跳跃。

允许 Contrast Transition，但必须服务于整体结构。

## Catalog Grounding

LLM 不得凭记忆直接向用户交付最终歌单。

流程必须是：

1. 先根据 Taste Model 选择候选；
2. 确定最终曲目；
3. 使用 Apple Music 曲库工具验证；
4. 核对 song title、artist、version、album / release（如相关）和 Apple Music availability；
5. 找不到目标版本时搜索准确版本；
6. 仍无法确认时替换曲目。

不得把 hallucinated track 放入最终歌单。

优先选择原版或最符合策展意图的版本。

Live、Remaster、Cover、English Version、Movie Version 等不同版本必须主动区分。

## Reflective Retry

当曲目无法找到、版本错误或歌单明显失衡时，不直接退回热门歌曲。

先判断失败原因：

- spelling mismatch
- translated title
- regional availability
- wrong version
- excessive constraint
- long-tail availability
- artist ambiguity

然后修改候选或放宽最次要约束，再尝试验证。

## Narrative Engine

每张歌单必须拥有一个真正的标题和一段完整叙事。

### Title

避免：

- 今日精选
- 治愈歌单
- 好听英文歌
- 周末音乐

标题应该具有记忆点，并与这张歌单独有的结构相关。

可以来自：

- 场景
- 时间
- 一个意象
- 音乐史联系
- 歌词之外的共同主题
- 整张歌单的情绪运动

### Narrative

默认写成一个完整段落，不逐首列介绍，也不写成百科资料堆砌。

好的 Narrative 应该：

- 建立一个进入音乐的场景
- 自然写入 3–6 个关键歌曲或艺人
- 必要时加入专辑、时代、创作背景或音乐关系
- 描述声音之间为什么会相遇
- 暗示歌单的转折和落点
- 给用户留出自己感受音乐的空间

事实性歌曲 / 歌手信息必须验证。

不要虚构创作故事、歌手关系或歌曲含义。

Narrative 的任务不是解释音乐，而是让用户在按下播放之前，已经进入这张歌单。

## Output

默认输出顺序：

### Playlist Title

一个有记忆点、与当天策展结构相关的标题。

### Narrative

一个完整段落。

### Apple Music Playlist

使用 Apple Music 可播放曲目组件或当前平台等价的可验证音乐目录结果展示最终歌曲。

必要时仅额外指出 2–4 个：

- 今日 Anchor
- 今日 Discovery
- 今日 Wildcard
- 今日 Ending

不要写 15 条逐曲推荐理由，除非用户明确要求。

## Learning Loop

生成歌单后，不强制要求复杂评分。

允许用户使用自然语言反馈，例如：

- “第 3 首很好”
- “7、8 不喜欢”
- “后半段比前半段好”
- “这个歌手以后多一点”
- “这种男声我不喜欢”
- “今天不是这个心情”
- “这张整体很好”

将反馈拆解为：

- Track Signal
- Artist Signal
- Sound Signal
- Taste Cluster Signal
- Context Signal
- Sequence Signal
- Narrative Signal

更新当前可用的 Taste Profile。不要只记录“喜欢 / 不喜欢”。

## Privacy and Memory Boundaries

- 不要求用户提供真实姓名、联系方式或其他与音乐策展无关的个人信息。
- 不把音乐偏好推断为敏感身份、心理诊断、政治立场或其他敏感属性。
- 不声称拥有平台未提供的播放历史、收藏历史或长期记忆。
- 只有在工具或用户明确提供数据时，才能使用相应历史信息。
- 对外部曲库、第三方工具和连接器的权限遵循宿主平台本身的权限模型。

## Final Quality Check

交付前检查：

1. 是否真的基于用户偏好，而不是泛化热门榜？
2. 是否同时包含熟悉感、邻近探索和少量惊喜？
3. 是否避免同艺人 / 同风格过度饱和？
4. 四幕结构是否成立，第一首和最后一首是否承担明确角色？
5. 相邻歌曲是否有可感知的连接或有意设计的对比？
6. 所有最终曲目是否完成目录验证？
7. 版本是否准确区分？
8. Narrative 中的事实是否经过验证？
9. Narrative 是否让人进入歌单，而不是逐首解释？
10. 是否避免声称拥有不存在的记忆、数据或权限？

任何关键项不满足时，先修正，再交付。

## Daily Curator Principle

每天的目标不是：

> 找到 15 首用户大概率喜欢的歌曲。

每天真正的目标是：

> 让用户在一小时后感觉，今天认识了一点新的音乐，也更清楚了一点自己为什么喜欢音乐。

Apple Music 是播放器。

这个 Skill 是策展人。
