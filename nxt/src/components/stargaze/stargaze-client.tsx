"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { MousePointerClick, MoveVertical, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";

const ConstellationMap = dynamic(() => import("./constellation-map"), { ssr: false });

const GUIDE_DURATION = 7500;

export function StargazeClient() {
  const [showGuide, setShowGuide] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    wrapperRef.current?.focus();
    const t = setTimeout(() => setShowGuide(false), GUIDE_DURATION);
    return () => clearTimeout(t);
  }, []);

  function closeGuide() {
    setShowGuide(false);
  }

  return (
    <div
      ref={wrapperRef}
      className="relative min-h-screen"
      tabIndex={0}
      role="application"
      aria-label="Interactive constellation map"
      onKeyDown={(e) => {
        if (e.key === "Escape") closeGuide();
      }}
    >
      <ConstellationMap />

      {showGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={closeGuide}
          role="presentation"
        >
          <div
            className="mx-4 w-[90%] max-w-md rounded-xl border border-white/5 bg-white/10 p-6 text-center shadow-lg backdrop-blur-lg"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Stargaze guide"
          >
            <h2 className="mb-2 text-xl font-bold text-white">Welcome to Stargaze</h2>
            <p className="mb-4 text-sm text-neutral-300">
              Quick tips to get started — this will disappear in a few seconds.
            </p>

            <ul className="mb-4 space-y-2 text-left text-sm text-neutral-200">
              <li className="flex items-start gap-3">
                <MousePointerClick className="mt-0.5 size-4 shrink-0 text-primary" />
                Click a star to target it
              </li>
              <li className="flex items-start gap-3">
                <Hand className="mt-0.5 size-4 shrink-0 text-primary" />
                Double-click the same star to zoom into its system
              </li>
              <li className="flex items-start gap-3">
                <MoveVertical className="mt-0.5 size-4 shrink-0 text-primary" />
                Scroll to zoom, drag to rotate
              </li>
              <li className="flex items-start gap-3">
                <kbd className="rounded border border-white/20 px-1.5 py-0.5 text-xs">Esc</kbd>
                Press Esc or click anywhere to close
              </li>
            </ul>

            <div className="flex justify-center">
              <Button onClick={closeGuide}>Got it</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
