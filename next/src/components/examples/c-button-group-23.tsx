import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"
import { FileIcon, FolderIcon, ImageIcon } from "lucide-react"

export function Pattern() {
  return (
    <ButtonGroup className="**:data-[slot=button]:border-0">
      <Button aria-label="Files">
        <FileIcon aria-hidden="true" />
        Files
      </Button>
      <ButtonGroupSeparator className="bg-primary/72" />
      <Button aria-label="Folder">
        <FolderIcon aria-hidden="true" />
        Folder
      </Button>
      <ButtonGroupSeparator className="bg-primary/72" />
      <Button aria-label="Trash">
        <ImageIcon aria-hidden="true" />
        Media
      </Button>
    </ButtonGroup>
  )
}