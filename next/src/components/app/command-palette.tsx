"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { PlusIcon, ListTodoIcon, FolderKanbanIcon, InboxIcon } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { navItems } from "@/lib/nav-config"
import { useTasks } from "@/hooks/use-tasks"
import { useProjects } from "@/hooks/use-projects"
import { useInboxItems } from "@/hooks/use-inbox-items"
import { searchWorkspace } from "@/lib/search/client-search"
import { QuickCaptureDialog } from "@/components/app/quick-capture-dialog"
import { TaskFormDialog } from "@/app/(app)/tasks/task-form-dialog"
import { ProjectFormDialog } from "@/app/(app)/projects/project-form-dialog"

const resultHref: Record<string, (id: string) => string> = {
  task: (id) => `/tasks?task=${id}`,
  project: (id) => `/projects/${id}`,
  inboxItem: () => `/inbox`,
}

const resultIcon = {
  task: ListTodoIcon,
  project: FolderKanbanIcon,
  inboxItem: InboxIcon,
}

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const [search, setSearch] = React.useState("")
  const [quickCaptureOpen, setQuickCaptureOpen] = React.useState(false)
  const [taskFormOpen, setTaskFormOpen] = React.useState(false)
  const [projectFormOpen, setProjectFormOpen] = React.useState(false)

  const { tasks } = useTasks()
  const { projects } = useProjects()
  const { items } = useInboxItems()

  const results = React.useMemo(
    () => searchWorkspace(search, { tasks, projects, inboxItems: items }),
    [search, tasks, projects, items]
  )

  function runCommand(action: () => void) {
    onOpenChange(false)
    setSearch("")
    action()
  }

  return (
    <>
      <CommandDialog open={open} onOpenChange={onOpenChange}>
        <CommandInput
          placeholder="Search or jump to..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => runCommand(() => setQuickCaptureOpen(true))}>
              <PlusIcon />
              Quick capture
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTaskFormOpen(true))}>
              <ListTodoIcon />
              New task
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setProjectFormOpen(true))}>
              <FolderKanbanIcon />
              New project
            </CommandItem>
          </CommandGroup>

          {results.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Results">
                {results.map((result) => {
                  const Icon = resultIcon[result.type]
                  return (
                    <CommandItem
                      key={`${result.type}-${result.id}`}
                      onSelect={() =>
                        runCommand(() => router.push(resultHref[result.type](result.id)))
                      }
                    >
                      <Icon />
                      {result.title}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </>
          )}

          <CommandSeparator />
          <CommandGroup heading="Navigate">
            {navItems.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => runCommand(() => router.push(item.href))}
              >
                <item.icon />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <QuickCaptureDialog open={quickCaptureOpen} onOpenChange={setQuickCaptureOpen} />
      <TaskFormDialog open={taskFormOpen} onOpenChange={setTaskFormOpen} />
      <ProjectFormDialog open={projectFormOpen} onOpenChange={setProjectFormOpen} />
    </>
  )
}
