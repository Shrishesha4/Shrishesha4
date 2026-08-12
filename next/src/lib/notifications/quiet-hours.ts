// App is India-centric (INR currency, en-IN formatting elsewhere) — quiet
// hours are compared in Asia/Kolkata rather than adding a timezone field to
// preferences for a single-user, single-region app.
export function isWithinQuietHours(
  start: string | null,
  end: string | null,
  now: Date = new Date()
): boolean {
  if (!start || !end) return false

  const nowHHmm = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(now)

  // Quiet hours can wrap past midnight (e.g. 22:00 -> 08:00).
  if (start <= end) {
    return nowHHmm >= start && nowHHmm < end
  }
  return nowHHmm >= start || nowHHmm < end
}
