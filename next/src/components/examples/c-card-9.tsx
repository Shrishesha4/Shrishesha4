import Image from "next/image"

import { Badge } from "@/components/reui/badge"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BellIcon, ArrowRightIcon } from "lucide-react"

export function Pattern() {
  return (
    <Card className="w-full max-w-xs p-0">
      <CardContent className="flex flex-col gap-5 p-0">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src="https://picsum.photos/1000/800?grayscale&random=52"
            alt="16:9"
            width={1000}
            height={800}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col items-center gap-4 p-6 pt-0">
          <Badge variant="outline">
            <BellIcon aria-hidden="true" />
            Trending
          </Badge>

          <p className="text-foreground text-center text-sm">
            Making your design process faster and easier. Design tools for your
            team.
          </p>

          <Button className="w-fit">
            Get Started
            <ArrowRightIcon aria-hidden="true" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}