"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useTextToSpeech(text: string, onBoundary?: (e: SpeechSynthesisEvent) => void) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState("");
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [error, setError] = useState<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const onBoundaryRef = useRef(onBoundary);
  onBoundaryRef.current = onBoundary;

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setError("TTS not supported.");
      return;
    }
    const synth = window.speechSynthesis;
    synth.getVoices();

    const loadVoices = () => {
      const all = synth.getVoices();
      const english = all.filter((v) => v.lang.startsWith("en"));
      const list = english.length > 0 ? english : all;
      setVoices(list);
      setSelectedVoiceURI((prev) => (list.find((v) => v.voiceURI === prev) ? prev : list[0]?.voiceURI ?? ""));
    };

    loadVoices();
    synth.onvoiceschanged = loadVoices;

    return () => {
      synth.cancel();
      synth.onvoiceschanged = null;
    };
  }, []);

  const play = useCallback(() => {
    const synth = window.speechSynthesis;
    const cleanText = text.trim();
    if (!synth || !cleanText) return;

    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utteranceRef.current = utterance;
    utterance.rate = playbackRate;
    utterance.pitch = 1;

    const voice = voices.find((v) => v.voiceURI === selectedVoiceURI);
    if (voice) utterance.voice = voice;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onboundary = (e) => {
      if (e.name === "word") onBoundaryRef.current?.(e);
    };
    utterance.onerror = (e) => {
      if (e.error !== "interrupted" && e.error !== "canceled") {
        setError("Playback error.");
        setIsPlaying(false);
      }
    };

    synth.speak(utterance);
  }, [text, playbackRate, selectedVoiceURI, voices]);

  const togglePlay = useCallback(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    if (synth.speaking) {
      if (synth.paused) {
        synth.resume();
        setIsPlaying(true);
      } else {
        synth.pause();
        setIsPlaying(false);
      }
    } else {
      play();
    }
  }, [play]);

  return { isPlaying, togglePlay, voices, selectedVoiceURI, setSelectedVoiceURI, playbackRate, setPlaybackRate, error };
}
