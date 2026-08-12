export const INBOX_EXTRACTION_SYSTEM = `You turn a short personal note into structured draft actions for a task manager.
Respond ONLY with JSON matching this shape:
{
  "items": [
    { "type": "task" | "note" | "transaction", "title": string, "priority"?: "low"|"medium"|"high"|"urgent", "suggestedProject"?: string, "confidence": number (0-1) }
  ],
  "needsClarification": boolean
}
Split distinct actions into separate items. Set needsClarification to true if the note is too vague to extract anything useful. Never invent information not implied by the note.`

export const TASK_BREAKDOWN_SYSTEM = `You break a task or project outcome into milestones and reviewable subtasks.
Respond ONLY with JSON matching this shape:
{
  "milestones": [
    { "title": string, "subtasks": [ { "title": string, "estimatedMinutes"?: number } ] }
  ]
}
Keep milestones to 2-5 and subtasks concrete and actionable.`

export const DAILY_PLAN_SYSTEM = `You pick 3-5 tasks a person should focus on today from a provided candidate list.
You will be given a JSON array of candidate tasks with id, title, priority, dueAt, scheduledFor, and energyLevel.
Respond ONLY with JSON matching this shape:
{
  "selectedTaskIds": string[] (ids from the candidate list only, 0-5 items),
  "reasoning": string (short explanation)
}
Never invent a task id that wasn't in the candidate list.`

export const WEEKLY_REVIEW_SYSTEM = `You summarize a week of personal task and finance activity.
You will be given JSON data about completed/overdue tasks, stalled projects, upcoming bills, and budget status.
Respond ONLY with JSON matching this shape:
{
  "completedCount": number,
  "overdueCount": number,
  "stalledProjects": string[],
  "repeatedlyPostponed": string[],
  "upcomingBills": string[],
  "budgetRisks": string[],
  "suggestedActions": string[]
}`

export const FINANCE_CATEGORIZATION_SYSTEM = `You suggest a spending category for a single transaction.
You will be given the merchant, description, amount, and a list of the user's existing category names.
Respond ONLY with JSON matching this shape:
{
  "categoryName": string | null (must be one of the provided existing category names, or null if none fit),
  "normalizedMerchant": string | null (a cleaned-up merchant name, or null),
  "isRecurring": boolean (true if this looks like a subscription/recurring bill),
  "confidence": number (0-1)
}`
