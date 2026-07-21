import { NotebookTextIcon } from "lucide-react"
import { PagePlaceholder } from "@/components/app/page-placeholder"

export default function NotesPage() {
  return (
    <PagePlaceholder
      icon={NotebookTextIcon}
      title="Notes"
      description="Linked personal and project notes will appear here."
    />
  )
}
