# MusicKit Bridge MVP

This optional bridge connects Apple Music personal signals to the curator without putting Apple credentials into the Skill or model prompt.

## What it does

The MVP exposes two authenticated local endpoints:

- `GET /api/snapshot` â reads recently played tracks and Apple personalized recommendations, then returns a normalized `BehaviorSnapshot`.
- `POST /api/playlists` â creates a private Apple Music library playlist from already verified catalog song IDs.

It also exposes unauthenticated `GET /health`, which reports only whether required configuration is present. It never returns secret values.

## Why the scope is intentionally small

The first production goal is to make **real exposure data** available to curation while preserving the rule:

> recently played is exposure, not automatically preference.

The MVP does not claim access to skip rate, completion rate, playback duration, favorites, ratings, or Replay. Those capabilities stay `false` until implemented and verified.

## Apple prerequisites

You need:

1. Apple Developer Program membership.
2. MusicKit / Media Services configured for the app or service.
3. Team ID and MusicKit key ID.
4. MusicKit private key (`.p8`).
5. A Music User Token obtained through a user-authorized MusicKit client.

Apple requires a Music User Token for `/v1/me/...` personal endpoints. Do not paste that token into ChatGPT.

## Local setup

```bash
cd integrations/musickit-bridge
npm install
cp .env.example .env
```

Load the environment variables with your preferred secret manager or service manager, then:

```bash
npm test
npm start
```

The service listens on `127.0.0.1:8787` by default. Keep it loopback-only and expose it to AgentDock through a trusted tunnel / local connector rather than opening it directly to the public internet.

## Required environment variables

- `APPLE_TEAM_ID`
- `APPLE_KEY_ID`
- `APPLE_PRIVATE_KEY_P8`
- `APPLE_MUSIC_USER_TOKEN`
- `BRIDGE_API_TOKEN`
- optional `PORT`

`APPLE_PRIVATE_KEY_P8` may contain literal `\n` sequences when stored as a single-line environment variable.

## Read snapshot

```bash
curl -sS \
  -H "Authorization: Bearer $BRIDGE_API_TOKEN" \
  http://127.0.0.1:8787/api/snapshot
```

The response is bounded and normalized for the curation layer. It does not label recent plays as liked.

## Create a final playlist

Only call write-back after the curator has finalized sequence and Apple Music catalog verification.

```bash
curl -sS \
  -X POST \
  -H "Authorization: Bearer $BRIDGE_API_TOKEN" \
  -H "Content-Type: application/json" \
  http://127.0.0.1:8787/api/playlists \
  -d '{
    "name": "9æ19æ¥ï½ç¤ºä¾",
    "description": "Created after final curator verification.",
    "track_ids": ["123", "456"]
  }'
```

The bridge forwards catalog song IDs as `songs` in the playlist tracks relationship.

## Security model

- Never commit `.env`, private keys, developer tokens, Music User Tokens, or `BRIDGE_API_TOKEN`.
- Keep the listener token outside prompts and generated playlist text.
- Bind to loopback only.
- Put any remote access behind AgentDock / a trusted tunnel with authentication.
- Treat `POST /api/playlists` as a write action and keep confirmation / permission policy at the caller.
- If Apple returns 401/403, treat the session as unauthenticated or expired; do not silently fall back to stale personal data.

## Current capability contract

```json
{
  "recently_played": true,
  "recommendations": true,
  "ratings": false,
  "favorites": false,
  "replay": false,
  "playlist_write": true
}
```

This contract is deliberately honest. Add a capability only after its endpoint is implemented and covered by tests.

## Apple API endpoints used

- `GET /v1/me/recent/played/tracks`
- `GET /v1/me/recommendations`
- `POST /v1/me/library/playlists`

See Apple Developer documentation for current request formats and authorization requirements.
