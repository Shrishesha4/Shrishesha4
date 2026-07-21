"use client"

import { format } from "date-fns"
import { ActivityIcon } from "lucide-react"
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/reui/timeline"
import { PageLoadingSkeleton } from "@/components/app/page-loading-skeleton"
import { PagePlaceholder } from "@/components/app/page-placeholder"
import { useActivity } from "@/hooks/use-activity"

export default function ActivityPage() {
  const { entries, loading } = useActivity()

  if (loading) return <PageLoadingSkeleton />

  if (entries.length === 0) {
    return (
      <PagePlaceholder
        icon={ActivityIcon}
        title="No activity yet"
        description="Changes to tasks and projects will show up here."
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">Activity</h1>
      <Timeline defaultValue={entries.length}>
        {entries.map((entry, index) => (
          <TimelineItem key={entry.id} step={index}>
            <TimelineHeader>
              <TimelineSeparator />
              <TimelineTitle>{entry.summary}</TimelineTitle>
              <TimelineIndicator />
            </TimelineHeader>
            <TimelineContent>
              <TimelineDate>
                {entry.createdAt ? format(entry.createdAt.toDate(), "PPp") : ""}
              </TimelineDate>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
