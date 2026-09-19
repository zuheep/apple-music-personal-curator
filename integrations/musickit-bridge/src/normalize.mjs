export function normalizeTrack(resource, source = "recently_played", rank = null) {
  const a = resource?.attributes ?? {};
  return {
    id: resource?.id ?? null,
    type: resource?.type ?? null,
    title: a.name ?? null,
    artist: a.artistName ?? null,
    album: a.albumName ?? null,
    duration_ms: a.durationInMillis ?? null,
    release_date: a.releaseDate ?? null,
    isrc: a.isrc ?? null,
    source,
    rank
  };
}

export function normalizeRecentTracks(payload) {
  return (payload?.data ?? []).map((item, index) =>
    normalizeTrack(item, "recently_played", index + 1)
  );
}

export function normalizeRecommendations(payload) {
  return (payload?.data ?? []).map((item, index) => ({
    id: item?.id ?? null,
    type: item?.type ?? null,
    title: item?.attributes?.title?.stringForDisplay
      ?? item?.attributes?.title
      ?? null,
    reason: item?.attributes?.reason?.stringForDisplay
      ?? item?.attributes?.reason
      ?? null,
    source: "apple_recommendation",
    rank: index + 1,
    contents: (item?.relationships?.contents?.data ?? []).slice(0, 20).map((r) => ({
      id: r?.id ?? null,
      type: r?.type ?? null
    }))
  }));
}

export function behaviorSnapshot({ recentTracks, recommendations, storefront = "my" }) {
  return {
    schema_version: "1.0",
    collected_at: new Date().toISOString(),
    storefront,
    capabilities: {
      recently_played: true,
      recommendations: true,
      ratings: false,
      favorites: false,
      replay: false,
      playlist_write: true
    },
    recent_tracks: normalizeRecentTracks(recentTracks),
    recommendations: normalizeRecommendations(recommendations)
  };
}
