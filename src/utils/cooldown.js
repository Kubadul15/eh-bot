// Cooldown trzymany w pamieci procesu - celowo nie przetrwa restartu
// bota (to akceptowalne dla samego cooldownu, w przeciwienstwie do
// przebiegu egzaminu, ktory musi przetrwac restart).
const cooldowns = new Map(); // userId -> timestamp (ms) konca cooldownu

const COOLDOWN_MS = 15 * 60 * 1000; // 15 minut po oblanym egzaminie

function setFailureCooldown(userId) {
  cooldowns.set(userId, Date.now() + COOLDOWN_MS);
}

/**
 * Zwraca timestamp (ms) konca cooldownu, albo null jesli cooldown
 * juz minal lub nigdy nie zostal ustawiony.
 */
function getCooldownExpiresAt(userId) {
  const expiresAt = cooldowns.get(userId);
  if (!expiresAt) return null;

  if (expiresAt <= Date.now()) {
    cooldowns.delete(userId);
    return null;
  }

  return expiresAt;
}

module.exports = { setFailureCooldown, getCooldownExpiresAt, COOLDOWN_MS };
