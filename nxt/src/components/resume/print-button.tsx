"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintButton() {
  return (
    <div className="fixed bottom-8 right-8 z-50 print:hidden">
      <Button size="lg" className="rounded-full shadow-lg" onClick={() => window.print()}>
        <Download className="size-4" />
        Download PDF
      </Button>
    </div>
  );
}
