// All monetary values are stored and computed as integer paise (₹1 = 100 paise).
// Never use floats for money — floating-point arithmetic on currency silently
// drifts (0.1 + 0.2 !== 0.3), and Firestore has no fixed-point numeric type.

export function rupeesToMinor(rupees: number): number {
  return Math.round(rupees * 100)
}

export function minorToRupees(minor: number): number {
  return minor / 100
}

export function formatMinor(minor: number, currency: "INR" = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(minorToRupees(minor))
}

// Parses a user-typed amount string (e.g. "299.50", "1,234") into integer
// paise. Returns null for unparseable input rather than throwing, so callers
// can surface a validation error instead of crashing.
export function parseAmountToMinor(input: string): number | null {
  const cleaned = input.replace(/,/g, "").trim()
  if (!cleaned || !/^\d+(\.\d{1,2})?$/.test(cleaned)) return null
  return rupeesToMinor(Number(cleaned))
}

export function sumMinor(amounts: number[]): number {
  return amounts.reduce((total, amount) => total + amount, 0)
}
