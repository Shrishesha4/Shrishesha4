"use client";

import { useEffect, useRef, useState } from "react";
import { Headphones, Pause, Settings2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";
import { cn } from "@/lib/utils";

interface WordSpan {
  start: number;
  end: number;
  element: HTMLElement;
}

export function BlogContent({ content }: { content: string }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const wordSpansRef = useRef<WordSpan[]>([]);
  const currentHighlightRef = useRef<HTMLElement | null>(null);
  const [speechText, setSpeechText] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    let text = "";
    const spans: WordSpan[] = [];

    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    const nodes: Node[] = [];
    let node = walker.nextNode();
    while (node) {
      if (
        node.parentElement?.tagName !== "SCRIPT" &&
        node.parentElement?.tagName !== "STYLE" &&
        node.textContent?.trim()
      ) {
        nodes.push(node);
      }
      node = walker.nextNode();
    }

    for (const textNode of nodes) {
      const words = (textNode.textContent || "").split(/(\s+)/);
      const fragment = document.createDocumentFragment();

      words.forEach((word) => {
        if (!word) return;
        if (/^\s+$/.test(word)) {
          text += " ";
          fragment.appendChild(document.createTextNode(" "));
        } else {
          const span = document.createElement("span");
          span.textContent = word;
          span.className = "tts-word rounded-sm transition-colors duration-100";
          const start = text.length;
          text += word;
          spans.push({ start, end: text.length, element: span });
          fragment.appendChild(span);
        }
      });

      textNode.parentNode?.replaceChild(fragment, textNode);
    }

    wordSpansRef.current = spans;
    setSpeechText(text);
  }, [content]);

  const { isPlaying, togglePlay, voices, selectedVoiceURI, setSelectedVoiceURI, playbackRate, setPlaybackRate, error } =
    useTextToSpeech(speechText, (e) => {
      const spans = wordSpansRef.current;
      if (!spans.length) return;

      if (currentHighlightRef.current) {
        currentHighlightRef.current.classList.remove("tts-highlight");
        currentHighlightRef.current = null;
      }

      const match = spans.find((s) => e.charIndex >= s.start && e.charIndex < s.end);
      if (match) {
        match.element.classList.add("tts-highlight");
        currentHighlightRef.current = match.element;
        requestAnimationFrame(() => {
          const rect = match.element.getBoundingClientRect();
          const visible = rect.top >= 0 && rect.top <= window.innerHeight && rect.bottom <= window.innerHeight;
          if (!visible) match.element.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }
    });

  return (
    <>
      <div
        ref={contentRef}
        className={cn(
          "prose prose-lg dark:prose-invert max-w-none marker:text-primary",
          isPlaying && "tts-blur-mode"
        )}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {showSettings && (
          <div className="mb-2 w-72 rounded-2xl border border-border bg-popover/95 p-4 shadow-2xl backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wide">Voice Settings</h3>
              <button onClick={() => setShowSettings(false)} aria-label="Close settings">
                <X className="size-4" />
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="voice-select" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Voice
              </label>
              <select
                id="voice-select"
                value={selectedVoiceURI}
                onChange={(e) => setSelectedVoiceURI(e.target.value)}
                className="w-full rounded-lg border border-border bg-muted p-2.5 text-sm outline-none"
              >
                {voices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="mb-1 flex justify-between">
                <label htmlFor="speed-select" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Speed
                </label>
                <span className="font-mono text-xs font-bold text-primary">{playbackRate}x</span>
              </div>
              <input
                id="speed-select"
                type="range"
                min={0.5}
                max={2}
                step={0.1}
                value={playbackRate}
                onChange={(e) => setPlaybackRate(Number(e.target.value))}
                className="h-2 w-full cursor-pointer accent-primary"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          {error && (
            <div className="rounded-full bg-destructive px-3 py-1.5 text-xs text-destructive-foreground shadow-lg">
              {error}
            </div>
          )}
          <Button
            variant="secondary"
            size="icon-lg"
            className="rounded-full shadow-lg"
            onClick={() => setShowSettings((s) => !s)}
            aria-label="Voice settings"
          >
            <Settings2 className="size-4" />
          </Button>
          <Button
            size="icon-lg"
            className="h-16 w-16 rounded-full shadow-xl"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause speech" : "Start speech"}
          >
            {isPlaying ? <Pause className="size-6" /> : <Headphones className="size-6" />}
          </Button>
        </div>
      </div>
    </>
  );
}
