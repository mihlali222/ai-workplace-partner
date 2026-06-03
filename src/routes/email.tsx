import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiToolShell } from "@/components/AiToolShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Workplace AI" },
      { name: "description", content: "Draft professional emails with AI." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("professional");
  const [keyPoints, setKeyPoints] = useState("");

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        icon={Mail}
        title="Smart Email Generator"
        description="Generate clear, on-tone emails ready to send."
      />
      <AiToolShell
        systemPrompt="You are an expert business writing assistant. Draft concise, polished emails. Use a clear subject line on the first line as 'Subject: ...'. Then a greeting, body, and sign-off. Keep it natural and respectful."
        buildUserPrompt={() => {
          if (!purpose.trim()) return null;
          return `Write an email with these details:
- Recipient: ${recipient || "the recipient"}
- Purpose: ${purpose}
- Tone: ${tone}
- Key points to include: ${keyPoints || "(none specified)"}`;
        }}
        generateLabel="Generate Email"
        inputs={
          <>
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                placeholder="e.g. Marketing team, John (client)"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose *</Label>
              <Textarea
                id="purpose"
                placeholder="e.g. Follow up on yesterday's pricing discussion and propose next steps"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="min-h-[90px]"
              />
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="concise">Concise</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                  <SelectItem value="apologetic">Apologetic</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="points">Key points</Label>
              <Textarea
                id="points"
                placeholder="One per line"
                value={keyPoints}
                onChange={(e) => setKeyPoints(e.target.value)}
                className="min-h-[90px]"
              />
            </div>
          </>
        }
      />
    </div>
  );
}
