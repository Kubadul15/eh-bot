const path = require('path');
require('dotenv').config();
function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Brak wymaganej zmiennej srodowiskowej: ${name}`);
  }
  return value;
}
const rawRegistryPath = process.env.REGISTRY_PATH || 'data/registry.json';
const policeGuildId = process.env.POLICE_GUILD_ID || '1522536500242284685';
const legacyGuildId = process.env.LEGACY_GUILD_ID || '1521870662162190388';
const robloxBanChannelId = process.env.ROBLOX_BAN_CHANNEL_ID || '1522589245267644557';
const roleplaySessionCode = process.env.ROLEPLAY_SESSION_CODE || 'qheef29d';
const waitingRoomVoiceChannelId = process.env.WAITING_ROOM_VOICE_CHANNEL_ID || '1513546690504687728';
const waitingRoomNotifyChannelId = process.env.WAITING_ROOM_NOTIFY_CHANNEL_ID || '1525129575011717150';
const waitingRoomPingRoleId = process.env.WAITING_ROOM_PING_ROLE_ID || '1524338911046799440';
const roleplayPingRoleId = process.env.ROLEPLAY_PING_ROLE_ID || '1456285425885778033';
const guildIds = Array.from(
  new Set([
    ...requireEnv('GUILD_ID')
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean),
    policeGuildId,
  ])
);
module.exports = {
  discordToken: requireEnv('DISCORD_TOKEN'),
  clientId: requireEnv('CLIENT_ID'),
  guildId: guildIds[0],
  guildIds,
  targetChannelId: requireEnv('TARGET_CHANNEL_ID'),
  idPrefix: process.env.ID_PREFIX || 'EH',
  serverName: process.env.SERVER_NAME || 'Emergency Hamburg ROLEPLAY | Gdansk RP',
  embedColor: process.env.EMBED_COLOR || '#8b5cf6',
  adminLogChannelId: process.env.ADMIN_LOG_CHANNEL_ID || null,
  registryPath: path.isAbsolute(rawRegistryPath) ? rawRegistryPath : path.join(__dirname, '..', rawRegistryPath),
  policeGuildId,
  legacyGuildId,
  robloxBanChannelId,
  roleplaySessionCode,
  waitingRoomVoiceChannelId,
  waitingRoomNotifyChannelId,
  waitingRoomPingRoleId,
  roleplayPingRoleId,
};
