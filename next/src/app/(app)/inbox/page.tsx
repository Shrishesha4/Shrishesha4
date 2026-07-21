import { InboxList } from "./inbox-list"

export default function InboxPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-lg font-semibold">Inbox</h1>
        <p className="text-muted-foreground text-sm">
          Process captures into tasks, or dismiss and snooze what you don&apos;t need.
        </p>
      </div>
      <InboxList />
    </div>
  )
}
