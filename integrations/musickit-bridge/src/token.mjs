import { importPKCS8, SignJWT } from "jose";

let cached = null;

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export function bridgeConfigStatus() {
  return {
    teamId: Boolean(process.env.APPLE_TEAM_ID),
    keyId: Boolean(process.env.APPLE_KEY_ID),
    privateKey: Boolean(process.env.APPLE_PRIVATE_KEY_P8),
    musicUserToken: Boolean(process.env.APPLE_MUSIC_USER_TOKEN),
    bridgeApiToken: Boolean(process.env.BRIDGE_API_TOKEN)
  };
}

export async function developerToken() {
  const now = Math.floor(Date.now() / 1000);
  if (cached && cached.expiresAt - 300 > now) return cached.token;

  const teamId = required("APPLE_TEAM_ID");
  const keyId = required("APPLE_KEY_ID");
  const pem = required("APPLE_PRIVATE_KEY_P8").replace(/\\n/g, "\n");
  const privateKey = await importPKCS8(pem, "ES256");
  const expiresAt = now + 60 * 60 * 12;

  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "ES256", kid: keyId })
    .setIssuer(teamId)
    .setIssuedAt(now)
    .setExpirationTime(expiresAt)
    .sign(privateKey);

  cached = { token, expiresAt };
  return token;
}

export function musicUserToken() {
  return required("APPLE_MUSIC_USER_TOKEN");
}

export function bridgeApiToken() {
  return required("BRIDGE_API_TOKEN");
}
