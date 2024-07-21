const cooldowns = new Map<string, number>();
const COOLDOWN_PERIOD = 30 * 1000; // 30 second cooldown

export function checkRateLimit(key: string): {
  allowed: boolean;
} {
  const now = Date.now();
  const lastCallTime = cooldowns.get(key) || 0;

  if (now - lastCallTime < COOLDOWN_PERIOD) {
    return { allowed: false };
  }

  cooldowns.set(key, now);
  return { allowed: true };
}
