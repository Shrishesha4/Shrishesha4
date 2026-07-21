// Firestore rejects explicit `undefined` field values outright (unlike a
// merely-omitted key). Zod's `.optional()` fields come back as `undefined`
// when unset, and react-hook-form always includes every declared field in
// its output — so any spread of form values into a Firestore write needs
// this first, or setDoc/updateDoc throws "Unsupported field value: undefined".
export function omitUndefined<T extends object>(obj: T): Partial<T> {
  const result: Partial<T> = {}
  for (const key of Object.keys(obj) as (keyof T)[]) {
    if (obj[key] !== undefined) result[key] = obj[key]
  }
  return result
}
