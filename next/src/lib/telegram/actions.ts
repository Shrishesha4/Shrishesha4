import "server-only"
import { adminDb } from "@/lib/firebase/admin"
import { FieldValue } from "firebase-admin/firestore"
import { getSuggestedNextTask, type ScoringContext } from "@/lib/scoring/recommend"
import type { Task } from "@/lib/types/task"
import type { Project } from "@/lib/types/project"

export async function createInboxItemFromTelegram(uid: string, content: string): Promise<void> {
  const ref = adminDb.collection("users").doc(uid).collection("inboxItems").doc()
  await ref.set({
    source: "telegram",
    title: content.slice(0, 120),
    content,
    metadata: {},
    receivedAt: FieldValue.serverTimestamp(),
    status: "unprocessed",
    snoozedUntil: null,
    suggestedAction: null,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    createdBy: uid,
    deletedAt: null,
  })
}

export async function createTaskFromTelegram(uid: string, title: string): Promise<void> {
  const ref = adminDb.collection("users").doc(uid).collection("tasks").doc()
  await ref.set({
    title: title.slice(0, 200),
    description: "",
    status: "planned",
    priority: "medium",
    projectId: null,
    parentTaskId: null,
    tagIds: [],
    dueAt: null,
    scheduledFor: null,
    estimatedMinutes: null,
    actualMinutes: null,
    completedAt: null,
    sortOrder: Date.now(),
    source: "telegram",
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    createdBy: uid,
    deletedAt: null,
  })
}

export async function getDefaultAccountId(uid: string): Promise<string | null> {
  const snap = await adminDb
    .collection("users")
    .doc(uid)
    .collection("financeAccounts")
    .where("archived", "==", false)
    .limit(1)
    .get()
  return snap.empty ? null : snap.docs[0].id
}

export async function createTransactionFromTelegram(
  uid: string,
  input: { accountId: string; amountMinor: number; description: string }
): Promise<void> {
  const ref = adminDb.collection("users").doc(uid).collection("transactions").doc()
  await ref.set({
    accountId: input.accountId,
    destinationAccountId: null,
    type: "expense",
    amountMinor: input.amountMinor,
    currency: "INR",
    occurredAt: FieldValue.serverTimestamp(),
    categoryId: null,
    merchant: "",
    description: input.description,
    tags: [],
    source: "telegram",
    reviewStatus: "needs_review",
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    createdBy: uid,
    deletedAt: null,
  })
}

export async function getTodaySummaryText(uid: string): Promise<string> {
  const todayISO = new Date().toISOString().slice(0, 10)
  const snap = await adminDb
    .collection("users")
    .doc(uid)
    .collection("tasks")
    .where("deletedAt", "==", null)
    .get()

  const tasks = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as unknown as Task)
  const active = tasks.filter((t) => t.status !== "done" && t.status !== "archived")
  const now = Date.now()
  const overdue = active.filter((t) => t.dueAt && (t.dueAt as unknown as { toMillis(): number }).toMillis() < now)
  const scheduledToday = active.filter((t) => t.scheduledFor === todayISO)

  if (overdue.length === 0 && scheduledToday.length === 0) {
    return "Nothing overdue or scheduled for today."
  }

  const lines: string[] = []
  if (overdue.length > 0) {
    lines.push(`<b>Overdue (${overdue.length}):</b>`)
    lines.push(...overdue.slice(0, 10).map((t) => `- ${t.title}`))
  }
  if (scheduledToday.length > 0) {
    lines.push(`<b>Today (${scheduledToday.length}):</b>`)
    lines.push(...scheduledToday.slice(0, 10).map((t) => `- ${t.title}`))
  }
  return lines.join("\n")
}

export async function getNextSuggestionText(uid: string): Promise<string> {
  const [tasksSnap, projectsSnap] = await Promise.all([
    adminDb.collection("users").doc(uid).collection("tasks").where("deletedAt", "==", null).get(),
    adminDb
      .collection("users")
      .doc(uid)
      .collection("projects")
      .where("deletedAt", "==", null)
      .get(),
  ])

  const tasks = tasksSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as unknown as Task)
  const projects = projectsSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as unknown as Project)

  const ctx: ScoringContext = {
    now: new Date(),
    projectLastActivity: Object.fromEntries(
      projects.map((p) => [
        p.id,
        p.lastActivityAt ? (p.lastActivityAt as unknown as { toDate(): Date }).toDate() : null,
      ])
    ),
  }

  const suggested = getSuggestedNextTask(tasks, ctx)
  return suggested ? `Suggested next: <b>${suggested.title}</b>` : "No pending tasks to suggest."
}
