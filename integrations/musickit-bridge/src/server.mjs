import http from "node:http";
import { bridgeApiToken, bridgeConfigStatus } from "./token.mjs";
import {
  createLibraryPlaylist,
  getRecommendations,
  getRecentlyPlayedTracks
} from "./apple.mjs";
import { behaviorSnapshot } from "./normalize.mjs";

const port = Number(process.env.PORT || 8787);

function json(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(body));
}

function authorized(req) {
  try {
    const expected = bridgeApiToken();
    return req.headers.authorization === `Bearer ${expected}`;
  } catch {
    return false;
  }
}

async function readJson(req, maxBytes = 100_000) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
    if (Buffer.byteLength(body) > maxBytes) throw new Error("Request body too large");
  }
  return body ? JSON.parse(body) : {};
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (req.method === "GET" && url.pathname === "/health") {
    return json(res, 200, { ok: true, config: bridgeConfigStatus() });
  }

  if (!url.pathname.startsWith("/api/")) return json(res, 404, { error: "not_found" });
  if (!authorized(req)) return json(res, 401, { error: "unauthorized" });

  try {
    if (req.method === "GET" && url.pathname === "/api/snapshot") {
      const [recentTracks, recommendations] = await Promise.all([
        getRecentlyPlayedTracks(),
        getRecommendations()
      ]);
      return json(res, 200, behaviorSnapshot({ recentTracks, recommendations }));
    }

    if (req.method === "POST" && url.pathname === "/api/playlists") {
      const body = await readJson(req);
      const created = await createLibraryPlaylist({
        name: body.name,
        description: body.description,
        trackIds: body.track_ids
      });
      return json(res, 201, {
        ok: true,
        playlist: created?.data?.[0] ?? null
      });
    }

    return json(res, 404, { error: "not_found" });
  } catch (error) {
    return json(res, error.status || 500, {
      error: error.message,
      details: error.details ?? null
    });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`MusicKit bridge listening on 127.0.0.1:${port}`);
});
