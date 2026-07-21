import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PlayIcon, ChevronDownIcon } from "lucide-react"

export function Pattern() {
  return (
    <ButtonGroup className="**:data-[slot=button]:border-r-0">
      <Button>
        <PlayIcon aria-hidden="true" className="fill-current" />
        <span>Execute</span>
      </Button>
      <ButtonGroupSeparator className="bg-primary/72" />
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              size="icon"
              className="border-primary-foreground/20 rounded-l-none border-l"
            />
          }
        >
          <ChevronDownIcon aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem>Commit & Push</DropdownMenuItem>
          <DropdownMenuItem>Commit & Sync</DropdownMenuItem>
          <DropdownMenuItem>Amend Last Commit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}