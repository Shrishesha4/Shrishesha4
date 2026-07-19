"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xl space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="subject">Subject</FieldLabel>
        <Input
          id="subject"
          required
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="message">Message</FieldLabel>
        <Textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </Field>

      <Button type="submit" disabled={status === "sending"} className="w-full" size="lg">
        {status === "sending" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>
            Send Message
            <Send className="size-4" />
          </>
        )}
      </Button>

      {status === "success" && (
        <p className="text-center text-sm text-primary">Message sent — I&apos;ll get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="text-center text-sm text-destructive">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
