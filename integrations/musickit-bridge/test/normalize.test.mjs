import test from "node:test";
import assert from "node:assert/strict";
import { behaviorSnapshot, normalizeRecentTracks } from "../src/normalize.mjs";

test("recent playback is normalized as exposure without preference", () => {
  const input = {
    data: [{
      id: "123",
      type: "songs",
      attributes: {
        name: "Example",
        artistName: "Artist",
        albumName: "Album",
        durationInMillis: 210000,
        releaseDate: "2020-01-01",
        isrc: "TEST123"
      }
    }]
  };

  assert.deepEqual(normalizeRecentTracks(input)[0], {
    id: "123",
    type: "songs",
    title: "Example",
    artist: "Artist",
    album: "Album",
    duration_ms: 210000,
    release_date: "2020-01-01",
    isrc: "TEST123",
    source: "recently_played",
    rank: 1
  });
  assert.equal("liked" in normalizeRecentTracks(input)[0], false);
});

test("snapshot advertises only implemented capabilities", () => {
  const snapshot = behaviorSnapshot({
    recentTracks: { data: [] },
    recommendations: { data: [] }
  });
  assert.equal(snapshot.capabilities.recently_played, true);
  assert.equal(snapshot.capabilities.recommendations, true);
  assert.equal(snapshot.capabilities.ratings, false);
  assert.equal(snapshot.capabilities.replay, false);
  assert.equal(snapshot.capabilities.playlist_write, true);
});
