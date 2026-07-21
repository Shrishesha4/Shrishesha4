"use client"

import * as React from "react"
import { PlusIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/reui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useAuth } from "@/lib/auth/auth-context"
import { useTags } from "@/hooks/use-tags"
import { createTag } from "@/lib/firebase/tag-mutations"

export function TagPicker({
  value,
  onChange,
}: {
  value: string[]
  onChange: (tagIds: string[]) => void
}) {
  const { user } = useAuth()
  const { tags } = useTags()
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  const selectedTags = tags.filter((tag) => value.includes(tag.id))

  function toggleTag(tagId: string) {
    onChange(
      value.includes(tagId) ? value.filter((id) => id !== tagId) : [...value, tagId]
    )
  }

  async function handleCreate() {
    if (!user || !search.trim()) return
    const tagId = await createTag(user.uid, { name: search.trim() })
    onChange([...value, tagId])
    setSearch("")
  }

  const exactMatch = tags.some(
    (tag) => tag.name.toLowerCase() === search.trim().toLowerCase()
  )

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {selectedTags.map((tag) => (
        <Badge key={tag.id} variant="secondary" className="gap-1">
          {tag.name}
          <button type="button" onClick={() => toggleTag(tag.id)}>
            <XIcon className="size-2.5" />
          </button>
        </Badge>
      ))}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger render={<Button type="button" variant="outline" size="xs" />}>
          <PlusIcon />
          Tag
        </PopoverTrigger>
        <PopoverContent align="start" className="w-56 p-0">
          <Command>
            <CommandInput
              placeholder="Search or create..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>
                {search.trim() ? (
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-xs/relaxed hover:bg-muted"
                    onClick={handleCreate}
                  >
                    <PlusIcon className="size-3.5" />
                    Create &quot;{search.trim()}&quot;
                  </button>
                ) : (
                  "No tags yet"
                )}
              </CommandEmpty>
              <CommandGroup>
                {tags.map((tag) => (
                  <CommandItem key={tag.id} onSelect={() => toggleTag(tag.id)}>
                    <span className={value.includes(tag.id) ? "font-medium" : ""}>
                      {tag.name}
                    </span>
                  </CommandItem>
                ))}
                {search.trim() && !exactMatch && (
                  <CommandItem onSelect={handleCreate}>
                    <PlusIcon className="size-3.5" />
                    Create &quot;{search.trim()}&quot;
                  </CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
