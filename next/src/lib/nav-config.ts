import {
  CalendarCheckIcon,
  InboxIcon,
  ListTodoIcon,
  FolderKanbanIcon,
  WalletIcon,
  NotebookTextIcon,
  SparklesIcon,
  ActivityIcon,
  SettingsIcon,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { title: "Today", href: "/today", icon: CalendarCheckIcon },
  { title: "Inbox", href: "/inbox", icon: InboxIcon },
  { title: "Tasks", href: "/tasks", icon: ListTodoIcon },
  { title: "Projects", href: "/projects", icon: FolderKanbanIcon },
  { title: "Finance", href: "/finance", icon: WalletIcon },
  { title: "Notes", href: "/notes", icon: NotebookTextIcon },
  { title: "Assistant", href: "/assistant", icon: SparklesIcon },
  { title: "Activity", href: "/activity", icon: ActivityIcon },
  { title: "Settings", href: "/settings", icon: SettingsIcon },
]
