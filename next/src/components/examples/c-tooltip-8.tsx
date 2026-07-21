import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { BoldIcon, ItalicIcon, UnderlineIcon, ImageIcon } from "lucide-react"

export function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <TooltipProvider>
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon-sm" aria-label="Bold" />
              }
            >
              <BoldIcon aria-hidden="true" />
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon-sm" aria-label="Italic" />
              }
            >
              <ItalicIcon aria-hidden="true" />
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon-sm" aria-label="Underline" />
              }
            >
              <UnderlineIcon aria-hidden="true" />
            </TooltipTrigger>
            <TooltipContent>Underline</TooltipContent>
          </Tooltip>
          <div className="flex items-center">
            <Separator
              orientation="vertical"
              className="mx-1 h-5 leading-none"
            />
          </div>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon-sm" aria-label="Image" />
              }
            >
              <ImageIcon aria-hidden="true" />
            </TooltipTrigger>
            <TooltipContent>Insert Image</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  )
}