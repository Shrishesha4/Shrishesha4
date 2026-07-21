"use client"

import * as React from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { DataGrid, DataGridContainer } from "@/components/reui/data-grid/data-grid"
import { DataGridTable } from "@/components/reui/data-grid/data-grid-table"
import {
  Filters,
  createFilter,
  type Filter,
  type FilterFieldConfig,
} from "@/components/reui/filters"
import { Badge } from "@/components/reui/badge"
import { useProjects } from "@/hooks/use-projects"
import type { Task, TaskPriority } from "@/lib/types/task"

const priorityVariant: Record<TaskPriority, React.ComponentProps<typeof Badge>["variant"]> = {
  low: "outline",
  medium: "secondary",
  high: "warning-light",
  urgent: "destructive-light",
}

const filterFields: FilterFieldConfig[] = [
  {
    key: "status",
    label: "Status",
    type: "multiselect",
    options: [
      { value: "inbox", label: "Inbox" },
      { value: "planned", label: "Planned" },
      { value: "in_progress", label: "In progress" },
      { value: "blocked", label: "Blocked" },
      { value: "done", label: "Done" },
      { value: "archived", label: "Archived" },
    ],
  },
  {
    key: "priority",
    label: "Priority",
    type: "multiselect",
    options: [
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
      { value: "urgent", label: "Urgent" },
    ],
  },
]

function applyFilters(tasks: Task[], filters: Filter[]): Task[] {
  return tasks.filter((task) =>
    filters.every((filter) => {
      if (filter.values.length === 0) return true
      if (filter.field === "status") return filter.values.includes(task.status)
      if (filter.field === "priority") return filter.values.includes(task.priority)
      return true
    })
  )
}

export function TasksListView({
  tasks,
  onSelect,
}: {
  tasks: Task[]
  onSelect: (taskId: string) => void
}) {
  const { projects } = useProjects()
  const [filters, setFilters] = React.useState<Filter[]>([
    createFilter("status", "is_any_of", ["planned", "in_progress", "blocked"]),
  ])
  const [sorting, setSorting] = React.useState<SortingState>([])

  const projectName = React.useCallback(
    (projectId?: string | null) =>
      projects.find((p) => p.id === projectId)?.name ?? "—",
    [projects]
  )

  const filteredTasks = React.useMemo(() => applyFilters(tasks, filters), [tasks, filters])

  const columns = React.useMemo<ColumnDef<Task>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <span className="font-medium">{row.original.title}</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant="outline">{row.original.status.replace("_", " ")}</Badge>
        ),
      },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => (
          <Badge variant={priorityVariant[row.original.priority]}>
            {row.original.priority}
          </Badge>
        ),
      },
      {
        accessorKey: "scheduledFor",
        header: "Scheduled",
        cell: ({ row }) => row.original.scheduledFor ?? "—",
      },
      {
        id: "project",
        header: "Project",
        cell: ({ row }) => projectName(row.original.projectId),
      },
    ],
    [projectName]
  )

  // TanStack Table's API returns functions that can't be memoized safely —
  // inherent to the library, not a real issue here.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredTasks,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.id,
  })

  return (
    <div className="flex flex-col gap-3">
      <Filters filters={filters} fields={filterFields} onChange={setFilters} />
      <DataGrid
        table={table}
        recordCount={filteredTasks.length}
        emptyMessage="No tasks match these filters."
        onRowClick={(row) => onSelect(row.id)}
      >
        <DataGridContainer>
          <DataGridTable />
        </DataGridContainer>
      </DataGrid>
    </div>
  )
}
