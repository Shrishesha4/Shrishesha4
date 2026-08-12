import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { InboxExtractionPanel } from "@/components/app/inbox-extraction-panel"
import { WeeklyReviewPanel } from "./weekly-review-panel"
import { SuggestionHistory } from "./suggestion-history"

export default function AssistantPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <div>
        <h1 className="text-lg font-semibold">Assistant</h1>
        <p className="text-muted-foreground text-sm">
          AI-generated content is always labeled and reviewed before anything is created or changed.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Capture</CardTitle>
          <CardDescription>Turn a quick note into structured, reviewable tasks.</CardDescription>
        </CardHeader>
        <CardContent>
          <InboxExtractionPanel />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly review</CardTitle>
          <CardDescription>
            Completed work, overdue tasks, stalled projects, and upcoming bills.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WeeklyReviewPanel />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <SuggestionHistory />
        </CardContent>
      </Card>
    </div>
  )
}
