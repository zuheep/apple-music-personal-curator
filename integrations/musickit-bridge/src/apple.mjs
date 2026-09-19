import { developerToken, musicUserToken } from "./token.mjs";

const ROOT = "https://api.music.apple.com/v1";

async function appleRequest(path, { method = "GET", body } = {}) {
  const headers = {
    Authorization: `Bearer ${await developerToken()}`,
    "Music-User-Token": musicUserToken(),
    Accept: "application/json"
  };
  if (body !== undefined) headers["Content-Type"] = "application/json";

  const response = await fetch(`${ROOT}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body)
  });

  const text = await response.text();
  let parsed = null;
  if (text) {
    try { parsed = JSON.parse(text); } catch { parsed = { raw: text }; }
  }

  if (!response.ok) {
    const error = new Error(`Apple Music API ${response.status} for ${method} ${path}`);
    error.status = response.status;
    error.details = parsed;
    throw error;
  }
  return parsed;
}

export function getRecentlyPlayedTracks() {
  const params = new URLSearchParams({
    types: "songs,library-songs",
    limit: "30"
  });
  return appleRequest(`/me/recent/played/tracks?${params}`);
}

export function getRecommendations() {
  return appleRequest("/me/recommendations");
}

export function createLibraryPlaylist({ name, description = "", trackIds }) {
  if (!name || typeof name !== "string") throw new Error("Playlist name is required");
  if (!Array.isArray(trackIds) || trackIds.length === 0) {
    throw new Error("trackIds must contain at least one catalog song id");
  }
  if (trackIds.length > 100) throw new Error("trackIds is unexpectedly large");

  const body = {
    attributes: {
      name,
      description,
      isPublic: false
    },
    relationships: {
      tracks: {
        data: trackIds.map((id) => ({ id: String(id), type: "songs" }))
      }
    }
  };

  return appleRequest("/me/library/playlists", { method: "POST", body });
}
