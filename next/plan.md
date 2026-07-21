# Personal Command Center — Implementation Plan

## 1. Product Definition

Build a private, offline-first Personal Command Center as an installable web app.

The system must help me:

- Manage tasks, projects, notes, routines, and long-term goals
- Capture anything quickly through the app and Telegram
- Recommend what I should work on next
- Receive useful alerts through Telegram, ntfy, email, and eventually web push
- Organize personal finances: accounts, transactions, budgets, bills, recurring subscriptions, and goals
- Receive selected Gmail items in a unified inbox
- Use OpenRouter AI models for extraction, planning, summaries, and suggestions
- Work fully with cached data when offline, then automatically sync through Firestore when online

This is a single-user-first product. Architect it safely so multi-user support can be added later, but do not build collaboration in the MVP.

---

## 2. Technology Stack

| Area | Choice |
|---|---|
| Framework | Next.js, App Router, TypeScript |
| UI | Tailwind CSS, shadcn/ui, Lucide icons | see@/Users/aadhi/Developer/personal/Shrishesha4/next/src/components
| Hosting | Vercel Hobby / Free |
| Authentication | Firebase Authentication |
| Database and offline sync | Cloud Firestore |
| Offline persistence | Firestore persistent IndexedDB cache |
| PWA | Next.js manifest, service worker, app-shell cache |
| AI | OpenRouter, invoked only through Next.js Route Handlers |
| Notifications | Telegram Bot API, ntfy, email, web push later |
| Validation | Zod |
| Dates | date-fns |
| Forms | React Hook Form + Zod resolver |
| Charts | Recharts |
| Testing | Vitest, React Testing Library, Playwright |
| Package manager | pnpm |

Use Firestore client SDK for normal user-owned data. Firestore’s persistent cache lets the app read, write, listen to, and query cached documents offline, then synchronizes local changes after connectivity returns. The web cache remains on the device between sessions, so the app must warn users before enabling it on an untrusted shared device. [page:1]

---

## 3. Architecture Rules

### 3.1 Core principles

1. Build one Next.js application; do not create a separate backend service.
2. Use Firestore directly from the client only for user-owned CRUD data.
3. Keep all secrets server-only.
4. Use Next.js Route Handlers for privileged operations:
   - OpenRouter model calls
   - Telegram webhook and outgoing messages
   - Gmail OAuth and Gmail processing
   - ntfy publishing
   - Web push sending
   - Scheduled jobs
5. AI may suggest changes but must never silently create tasks, change financial data, send notifications, or make financial decisions.
6. Every write must have `createdAt`, `updatedAt`, `createdBy`, and optional `deletedAt`.
7. Use soft deletes for important user data.
8. Store monetary values as integer paise, never JavaScript floating-point values.
9. Treat Firestore local persistence as sensitive device storage.
10. Design for offline-first from the first feature, not as a later retrofit.
 

### 3.3 Data ownership

Every normal personal document must be scoped under the authenticated user:

```text
users/{uid}
users/{uid}/profile/settings

users/{uid}/tasks/{taskId}
users/{uid}/projects/{projectId}
users/{uid}/notes/{noteId}
users/{uid}/tags/{tagId}
users/{uid}/inboxItems/{inboxItemId}
users/{uid}/dailyPlans/{date}
users/{uid}/activity/{activityId}

users/{uid}/financeAccounts/{accountId}
users/{uid}/transactions/{transactionId}
users/{uid}/financeCategories/{categoryId}
users/{uid}/budgets/{budgetId}
users/{uid}/recurringRules/{ruleId}
users/{uid}/financialGoals/{goalId}

users/{uid}/notifications/{notificationId}
users/{uid}/notificationPreferences/{preferenceId}
users/{uid}/pushSubscriptions/{subscriptionId}

users/{uid}/aiSuggestions/{suggestionId}
users/{uid}/aiConversations/{conversationId}
users/{uid}/aiConversations/{conversationId}/messages/{messageId}

users/{uid}/integrations/{integrationId}
```

Do not store API keys, Telegram bot tokens, OpenRouter keys, raw Gmail OAuth refresh tokens, or VAPID private keys in any browser-readable Firestore collection.

---

## 4. User Experience

### 4.1 Main navigation

Create a collapsible desktop sidebar and responsive mobile navigation:

```text
Today
Inbox
Tasks
Projects
Finance
Notes
Assistant
Activity
Settings
```

Top navigation must include:

- Global search
- Command palette with `Cmd/Ctrl + K`
- Quick capture button
- Sync/offline status indicator
- Notification center
- User menu

### 4.2 Main pages

| Page | Primary purpose |
|---|---|
| Today | Focus list, schedule, overdue work, daily plan, suggested next task |
| Inbox | Unprocessed notes, emails, Telegram captures, ideas, and AI suggestions |
| Tasks | List, Kanban, calendar, and filtered task views |
| Projects | Outcomes, status, milestones, tasks, notes, and project health |
| Finance | Cash flow, budgets, accounts, transactions, recurring bills, goals |
| Notes | Linked personal and project notes |
| Assistant | AI planning, task breakdown, weekly review, and questions |
| Activity | Unified history of changes, messages, alerts, and integration events |
| Settings | Profile, theme, security, integrations, notification preferences, device data |

### 4.3 Design direction

- Calm, serious, minimal
- there is already a design system preset, follow it
- Favor clarity over dashboard decoration
- Dense enough for real work, but not visually overwhelming
- Use shadcn/ui components: Sidebar, Sheet, Dialog, Command, Calendar, Tabs, Data Table, Dropdown Menu, Popover, Sonner, Alert Dialog, Tooltip, Skeleton, and Chart
- Support light and dark mode
- Make all actions usable on mobile

---

## 5. Offline-First Requirements

### 5.1 Firestore persistence

Enable persistent IndexedDB caching only in client-side Firebase initialization.

```ts
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore"

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
})
```

Firestore must be configured only once and only in browser-executed code.

Firestore handles local writes and synchronization when online. For edits to the same Firestore document from different clients, Firestore uses last-write-wins behavior, so avoid concurrent editing assumptions in the UI. [page:1]

### 5.2 Offline behavior

The following must work without connectivity after relevant data has been loaded once:

- Open the installed app
- Browse cached tasks, projects, finance records, and notes
- Create, edit, complete, schedule, archive, and delete tasks
- Create and edit projects and notes
- Log expenses, income, transfers, and budgets
- View cached Today plan and locally computed budget status
- Add quick captures to the inbox
- Search cached data
- See a clear status that the app is offline or using cached data

The following must be visibly unavailable or queued while offline:

- New Gmail messages
- New Telegram messages
- New ntfy events
- AI generation
- Outbound Telegram, ntfy, email, or web-push messages
- Server-side scheduled jobs

### 5.3 Sync status

Implement a global `SyncStatusIndicator`.

Possible states:

```text
All changes saved
Saving changes…
Offline — changes will sync automatically
Using cached data
Sync error — retry needed
```

Use Firestore snapshot metadata with `includeMetadataChanges` to distinguish cached results from server-confirmed results. Firestore exposes `fromCache` metadata specifically for this purpose. [page:1]

### 5.4 Trusted-device flow

On first login:

1. Ask: “Is this a trusted personal device?”
2. Explain that offline mode stores cached workspace and financial data in the browser.
3. Enable persistent cache only after confirmation.
4. If declined, use memory-only cache.
5. Add Settings actions:
   - Clear offline data from this device
   - Sign out and clear local data
   - Re-enable offline access

### 5.5 Offline acceptance tests

Before moving beyond Phase 2, verify:

1. Open the app online and load tasks and finance data.
2. Disable Wi-Fi / use browser DevTools offline mode.
3. Reload the app and verify cached UI/data still loads.
4. Create a task and record a ₹250 expense.
5. Close and reopen the app while still offline.
6. Confirm both records persist locally.
7. Restore network connectivity.
8. Confirm the records appear in Firestore exactly once.
9. Confirm the status changes to `All changes saved`.

---

## 6. Firebase Setup

### 6.1 Firebase services

Enable:

- Firebase Authentication
- Cloud Firestore in Native mode
- Firebase App Check later
- Google provider in Firebase Auth
- Email/password or passwordless sign-in if needed later

### 6.2 Authentication

MVP authentication:

- Google sign-in
- Restrict access to an explicit allowlist of approved email addresses during private development
- Store user profile document on first login
- Redirect unauthenticated users to `/login`
- Use Firebase Auth client SDK for regular UI auth state
- Verify Firebase ID tokens inside protected Route Handlers
- Use Firebase Admin SDK only server-side

For server-rendered flows that need cookie sessions later, Firebase supports server-side session cookies. [web:80]

### 6.3 Firestore Rules

Start with loose rules

Then add validations incrementally:

- Block unknown fields where practical
- Validate ownership fields
- Validate transaction amount ranges and ISO currency codes
- Prevent modification of immutable audit entries
- Restrict integration metadata to safe client-readable fields
- Keep encrypted/provider credentials outside client-accessible user documents

---

## 7. Domain Models

### 7.1 Shared document fields

```ts
type BaseDocument = {
  id: string
  createdAt: Timestamp
  updatedAt: Timestamp
  createdBy: string
  deletedAt?: Timestamp | null
}
```

Use Firestore server timestamps for persisted timestamps. Do not trust client-provided timestamps for audit events.

### 7.2 Task

```ts
type TaskStatus =
  | "inbox"
  | "planned"
  | "in_progress"
  | "blocked"
  | "done"
  | "archived"

type TaskPriority = "low" | "medium" | "high" | "urgent"
type EnergyLevel = "low" | "medium" | "high"

type Task = BaseDocument & {
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  energyLevel?: EnergyLevel
  projectId?: string | null
  parentTaskId?: string | null
  tagIds: string[]
  dueAt?: Timestamp | null
  scheduledFor?: string | null // YYYY-MM-DD
  estimatedMinutes?: number | null
  actualMinutes?: number | null
  completedAt?: Timestamp | null
  sortOrder: number
  source: "manual" | "telegram" | "gmail" | "ai" | "import"
}
```

### 7.3 Project

```ts
type ProjectStatus = "idea" | "active" | "paused" | "completed" | "archived"

type Project = BaseDocument & {
  name: string
  description?: string
  status: ProjectStatus
  outcome?: string
  color?: string
  icon?: string
  targetDate?: Timestamp | null
  lastActivityAt?: Timestamp | null
  tagIds: string[]
}
```

### 7.4 Inbox item

```ts
type InboxSource = "manual" | "telegram" | "gmail" | "system" | "ai"

type InboxItem = BaseDocument & {
  source: InboxSource
  externalId?: string
  title: string
  content?: string
  metadata?: Record<string, unknown>
  receivedAt: Timestamp
  status: "unprocessed" | "processed" | "dismissed" | "snoozed"
  snoozedUntil?: Timestamp | null
  suggestedAction?: {
    type: "create_task" | "create_note" | "create_transaction" | "reply" | "ignore"
    confidence: number
    payload: Record<string, unknown>
  } | null
}
```

### 7.5 Finance

```ts
type AccountType =
  | "cash"
  | "bank"
  | "upi_wallet"
  | "credit_card"
  | "savings"
  | "investment"
  | "loan"
  | "other"

type TransactionType = "income" | "expense" | "transfer" | "refund"

type FinanceAccount = BaseDocument & {
  name: string
  type: AccountType
  currency: "INR"
  openingBalanceMinor: number
  archived: boolean
}

type Transaction = BaseDocument & {
  accountId: string
  destinationAccountId?: string | null
  type: TransactionType
  amountMinor: number
  currency: "INR"
  occurredAt: Timestamp
  categoryId?: string | null
  merchant?: string
  description?: string
  tags: string[]
  source: "manual" | "telegram" | "csv_import" | "bank_sync"
  reviewStatus: "confirmed" | "needs_review"
}

type Budget = BaseDocument & {
  categoryId: string
  month: string // YYYY-MM
  limitMinor: number
  alertThresholdPercent: number
}

type RecurringRule = BaseDocument & {
  name: string
  type: "income" | "expense"
  expectedAmountMinor: number
  categoryId?: string | null
  accountId: string
  cadence: "weekly" | "monthly" | "quarterly" | "yearly"
  nextExpectedAt: Timestamp
  active: boolean
}
```

### 7.6 AI suggestions

```ts
type AISuggestion = BaseDocument & {
  kind:
    | "task_extraction"
    | "task_breakdown"
    | "daily_plan"
    | "weekly_review"
    | "finance_category"
    | "finance_insight"
  status: "pending" | "accepted" | "rejected" | "expired"
  inputSummary: string
  output: Record<string, unknown>
  relatedEntityIds: string[]
  model: string
  createdAt: Timestamp
  resolvedAt?: Timestamp | null
}
```

---

## 8. Feature Phases

## Phase 0 — Foundation

### Goal

Create a deployable, authenticated Next.js app with strict Firebase setup and a reusable UI shell.

### Tasks

- Initialize Next.js App Router project with TypeScript and pnpm
- Configure Tailwind CSS and shadcn/ui
- Add theme support with light/dark/system modes
- Create base layouts, sidebar, mobile navigation, top bar, and command palette shell
- Create Firebase client initialization
- Create Firebase Admin initialization for Route Handlers
- Configure Firebase Auth with Google sign-in
- Create Firestore database and security rules
- Create protected route handling
- Create user profile document on first sign-in
- Configure environment validation with Zod
- Add Vercel preview and production deployments
- Add error boundary, loading states, empty states, and toast notifications
- Add ESLint, Prettier, Husky, lint-staged, and CI checks

### Acceptance criteria

- User can sign in and sign out
- Unauthorized users cannot access app routes
- User can access only their own Firestore path
- App deploys on Vercel
- No private secret is shipped to browser JavaScript

---

## Phase 1 — PWA and Offline Core

### Goal

Make the app installable and usable offline with Firestore-persisted personal data.

### Tasks

- Add `app/manifest.ts`
- Create app icons in required sizes
- Add install guidance for desktop, Android, and iOS
- Add service worker with app-shell caching
- Add `/offline` fallback route
- Register the service worker client-side
- Configure browser-only Firestore persistent cache
- Implement trusted-device permission flow
- Create global network and sync status UI
- Add clear local app data action
- Add offline test checklist to documentation
- Add tests for Firebase initialization and offline UI state

### Acceptance criteria

- App can be installed as a PWA
- Cached app shell loads while offline
- Firestore-loaded data remains available offline
- Writes made offline sync automatically when network returns
- User clearly sees offline vs saved status

Next.js supports App Router manifest files for PWA installation metadata, while a service worker is needed for richer capabilities such as push and offline app-shell behavior. [page:2]

---

## Phase 2 — Tasks, Projects, Inbox

### Goal

Deliver the first daily-useful product loop.

### Tasks

- Build Today page
- Build quick capture dialog
- Build Inbox page and processing workflow
- Build Task list view with filters and sorting
- Build Kanban task view
- Build Calendar task view
- Build task detail sheet/dialog
- Build create/edit/delete/complete/snooze task actions
- Build projects list and project detail pages
- Link tasks, notes, and inbox items to projects
- Build tags
- Build search across tasks, projects, inbox items, and notes
- Build `Cmd/Ctrl + K` command palette actions
- Build basic daily plan document
- Build local recommendation score without AI:
  - Due date urgency
  - Priority
  - Scheduled date
  - Project inactivity
  - Effort fit
- Add activity log entries for important changes

### Acceptance criteria

- User can capture a thought and turn it into a task
- User can create projects and associate tasks
- Today page shows an actionable focus list
- All task/project/inbox actions work offline
- Search works against available cached data

---

## Phase 3 — Finance

### Goal

Make personal finance visible, accurate, and convenient before adding bank integrations.

### Tasks

- Create finance account management
- Create default finance categories
- Build transaction list and transaction form
- Support expense, income, refund, and transfer transactions
- Build fast “Log expense” flow
- Build monthly budget management
- Build budget progress cards
- Build cash-flow dashboard
- Build monthly spending by category chart
- Build recurring expenses and bill reminders
- Build savings/financial goals
- Add CSV import workflow with preview and duplicate protection
- Add CSV export for all financial data
- Add transaction review queue for AI/imported suggestions
- Add finance data audit log

### Rules

- Store values in integer paise: ₹299.50 is `29950`
- Never use floats for calculations
- Do not let AI create or alter confirmed financial entries without explicit approval
- Do not build payment initiation, fund transfer, or automatic banking action features

### Acceptance criteria

- User can track accounts and transactions
- User can see category spend against budget for the selected month
- User can identify upcoming recurring bills
- User can use the app offline to log spending
- Import duplicates are detected or presented for review

---

## Phase 4 — Telegram and ntfy

### Goal

Enable fast remote capture and useful notifications without making the app noisy.

### Tasks

- Create Telegram bot
- Add a secure Telegram webhook Route Handler
- Verify Telegram webhook secret token
- Implement user-to-Telegram-chat linking flow
- Support Telegram commands:
  - `/quick <text>`
  - `/task <text>`
  - `/spent <amount> <description>`
  - `/today`
  - `/next`
  - `/help`
- Parse plain-language Telegram messages into draft inbox items
- Send Telegram confirmation only for clear actions
- Create ntfy publisher server utility
- Store per-channel notification preferences
- Add notification severity:
  - `critical`
  - `action_required`
  - `informational`
  - `digest`
- Add quiet hours
- Add notification delivery history and failure handling
- Add manual “send test notification” controls

### Notification policy

- Critical: immediate Telegram + ntfy
- Action required: batched Telegram or ntfy
- Informational: in-app only
- Digest: daily/weekly scheduled summary

### Acceptance criteria

- A Telegram message can create an inbox item or a proposed expense
- Telegram and ntfy secrets never reach client code
- User can disable any notification channel
- Notification history shows sent, failed, and skipped messages

---

## Phase 5 — AI with OpenRouter

### Goal

Use AI to reduce input and planning friction, while retaining user review and control.

### Architecture

All model calls must use:

```text
Client -> POST /api/ai/* -> OpenRouter -> validated response -> Firestore suggestion
```

Never call OpenRouter from the browser.

### Tasks

- Create server-only OpenRouter client
- Add request authentication and per-user rate limiting
- Add Zod schemas for every AI response
- Add model configuration in server environment variables
- Add user-visible model name and cost/usage metadata where available
- Add AI request log without storing unnecessarily sensitive raw context
- Add suggestion acceptance/rejection flow
- Build assistant chat page and global assistant sheet

### AI capabilities

#### Inbox extraction

Input:

```text
Need to finish MIAS authentication, check AWS bill, and remind me Friday to renew domain.
```

Output must be structured draft actions:

```ts
{
  items: [
    {
      type: "task",
      title: "Finish MIAS authentication",
      priority: "high",
      suggestedProject: "MIAS",
      confidence: 0.92
    }
  ],
  needsClarification: false
}
```

#### Task breakdown

Turn an approved project outcome or task into milestones and reviewable subtasks.

#### Daily planning

Suggest 3–5 tasks using actual task state, deadlines, estimated effort, and user energy level.

#### Weekly review

Identify:

- Completed work
- Overdue tasks
- Stalled projects
- Repeatedly postponed items
- Upcoming bills
- Budget risks
- Suggested next actions

#### Finance categorization

Suggest category, merchant normalization, recurring-transaction detection, and confidence. Require user confirmation when confidence is low.

### AI safety rules

- Never perform irreversible action without explicit approval
- Never initiate payment, transfer, purchase, or banking action
- Never store OpenRouter API keys in Firestore or the browser
- Never use email content or financial data as context unless user explicitly requests it
- Clearly label AI-generated content
- Store accepted/rejected AI suggestions for traceability

### Acceptance criteria

- AI can reliably turn a text capture into typed proposed actions
- Invalid AI JSON never reaches Firestore entities
- User can accept, edit, or reject every proposed action
- API key is inaccessible from browser DevTools or bundled JavaScript

---

## Phase 6 — Gmail

### Goal

Bring selected actionable email into the unified inbox without copying an entire mailbox.

### Scope

Only process specific labels initially:

```text
IMPORTANT
STARRED
PersonalOS/Action
```

### Tasks

- Add Gmail OAuth connection flow
- Request the narrowest practical scopes
- Encrypt Gmail refresh tokens server-side
- Add Gmail push/watch setup
- Store watch expiration and renewal metadata
- Add webhook verification and history processing
- Deduplicate Gmail events by Gmail message ID/history ID
- Store only safe message metadata by default:
  - Message ID
  - Thread ID
  - Sender
  - Subject
  - Timestamp
  - Labels
  - Snippet
- Fetch full message body only for an explicit user action or AI processing request
- Create inbox actions:
  - Create task
  - Add to project
  - Snooze
  - Mark processed
  - Open original email
- Build Gmail integration settings and disconnect flow

### Acceptance criteria

- Selected email arrives as a unified inbox item
- Duplicate events do not create duplicate inbox items
- Disconnecting Gmail revokes/deletes stored integration credentials
- Gmail does not block core task/finance app behavior if unavailable

---

## Phase 7 — Scheduled Reviews and Web Push

### Goal

Deliver helpful recurring summaries without requiring a native mobile app.

### Tasks

- Add Vercel Cron configuration for one daily digest
- Implement authenticated cron endpoint with `CRON_SECRET`
- Create daily digest:
  - Today’s focus
  - Overdue tasks
  - Due soon
  - Budget warnings
  - Upcoming recurring bills
- Create weekly review manually first, then schedule later if hosting supports it
- Add web-push subscription UI
- Generate VAPID keys
- Store subscriptions under user Firestore data
- Add push notification sender route
- Add service-worker push and click handlers
- Deep-link notification clicks to the relevant app page

Web push requires service-worker registration and browser permission. Modern browser support includes Chromium, Firefox, macOS Safari, and iOS home-screen-installed PWAs on supported versions. [page:2]

### Vercel Hobby limitation

Do not rely on Vercel Hobby for frequent scheduling. Keep scheduled automation limited to a daily digest until moving to a paid plan, external scheduler, or a self-hosted worker. 

---

## 9. Environment Variables

```bash
# Public Firebase browser configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Server-only Firebase Admin configuration
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# AI
OPENROUTER_API_KEY=
OPENROUTER_MODEL=

# Telegram
TELEGRAM_BOT_TOKEN=
TELEGRAM_WEBHOOK_SECRET=

# ntfy
NTFY_BASE_URL=
NTFY_TOPIC=
NTFY_ACCESS_TOKEN=

# Gmail
GOOGLE_GMAIL_CLIENT_ID=
GOOGLE_GMAIL_CLIENT_SECRET=
GOOGLE_GMAIL_REDIRECT_URI=
GMAIL_TOKEN_ENCRYPTION_KEY=

# Web Push
NEXT_PUBLIC_VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
VAPID_SUBJECT=

# Scheduled jobs
CRON_SECRET=

# App
NEXT_PUBLIC_APP_URL=
ALLOWED_EMAILS=
```

Rules:

- Any variable prefixed with `NEXT_PUBLIC_` must be safe to expose.
- Never prefix secrets with `NEXT_PUBLIC_`.
- Validate required server variables on startup.
- Use separate Firebase/Vercel projects or environment values for development and production.

---

## 10. Quality and Testing

### Unit tests

Test:

- Finance integer-paise arithmetic
- Budget calculations
- Daily recommendation scoring
- Task date parsing
- Firestore document converters
- Zod validation for AI outputs
- AI suggestion-to-action mapping
- Notification severity rules
- Encryption/decryption utilities
- CSV parsing and duplicate detection

### Integration tests

Test:

- Firestore security rules with Firebase Emulator Suite
- Authenticated vs unauthenticated document access
- Route Handler token validation
- Telegram webhook signature/secret validation
- OpenRouter response parsing failures
- Gmail event deduplication
- Notification preference filtering

### End-to-end tests

Test:

- Sign-in flow
- Task create/edit/complete
- Project creation
- Expense creation and budget update
- Offline creation then online synchronization
- Telegram-created inbox item
- AI suggestion acceptance and rejection
- Clear local device data
- PWA installability checks where possible


## 12. Definition of MVP Complete

The MVP is complete only when all of the following work:

1. I can sign in securely.
2. I can create tasks, projects, notes, and inbox entries.
3. I can use the app offline after initial sync.
4. Offline changes persist locally and synchronize correctly once online.
5. I can record expenses and view monthly budgets.
6. I can capture a task or expense through Telegram.
7. I receive a useful daily digest through one chosen channel.
8. AI can turn vague text into reviewable task or finance suggestions.
9. No secret key is exposed to the browser.
10. I can clear cached sensitive data from a device.
11. The app is deployed as an installable Vercel-hosted PWA.

---

## 13. Explicit Non-Goals for MVP

Do not build these until the MVP is stable:

- Multi-user workspaces
- Live collaboration
- Native iOS/Android apps
- Full bank account sync
- Payment initiation or fund transfers
- Autonomous AI task management
- Autonomous email replies
- Full Gmail archive/search mirror
- Complex knowledge graph
- Habit gamification
- Social features
- Complex CRDT conflict resolution
- Calendar two-way sync
- Team billing or subscription product features

---

## 14. First Build Sequence

Implement in this order:

1. Phase 0: Firebase Auth, Firestore rules, Next.js shell, deployment.
2. Phase 1: PWA, Firestore persistent cache, offline status, clear-device-data.
3. Phase 2: Inbox, tasks, projects, Today page, command palette.
4. Phase 3: Manual finance ledger, budgets, recurring bills, CSV import/export.
5. Phase 4: Telegram capture and ntfy notifications.
6. Phase 5: OpenRouter-based reviewable AI suggestions.
7. Phase 6: Narrow Gmail label integration.
8. Phase 7: Daily digest, web push, and weekly review.

Do not start Gmail or AI before offline tasks, projects, and finance are reliable.