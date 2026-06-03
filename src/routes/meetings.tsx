import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { NotebookPen } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { AiToolShell } from "@/components/AiToolShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Workplace AI" },
      { name: "description", content: "Summarize meetings into clear notes and actions." },
    ],
  }),
  component: MeetingsPage,
});

function MeetingsPage() {
  const [title, setTitle] = useState("");
  const [participants, setParticipants] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        icon={NotebookPen}
        title="Meeting Notes Summarizer"
        description="Paste raw notes or a transcript to get a structured summary."
      />
      <AiToolShell
        systemPrompt="You are an expert meeting note summarizer. Produce a structured markdown summary with sections: ## Summary, ## Key Decisions, ## Action Items (with owner and due date when mentioned), ## Risks / Open Questions. Be concise and faithful to the source."
        buildUserPrompt={() => {
          if (!notes.trim()) return null;
          return `Summarize this meeting.
Title: ${title || "Untitled"}
Participants: ${participants || "(not specified)"}

Notes / Transcript:
${notes}`;
        }}
        generateLabel="Summarize Meeting"
        inputs={
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Meeting title</Label>
              <Input
                id="title"
                placeholder="e.g. Q3 planning sync"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="participants">Participants</Label>
              <Input
                id="participants"
                placeholder="e.g. Alex, Priya, Jordan"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes or transcript *</Label>
              <Textarea
                id="notes"
                placeholder="Paste raw meeting notes or transcript here…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[260px]"
              />
            </div>
          </>
        }
      />
    </div>
  );
}
