import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PixelCanvas } from "@/components/ui/pixel-canvas";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      <PixelCanvas className="absolute inset-0 -z-10 opacity-40" variant="glow" gap={10} />
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Compass className="size-6" />
          </EmptyMedia>
          <EmptyTitle>Lost in space</EmptyTitle>
          <EmptyDescription>This page drifted off into the void. Let&apos;s get you back.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button render={<Link href="/" />} nativeButton={false}>
            Back home
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
