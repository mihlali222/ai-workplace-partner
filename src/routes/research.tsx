import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiToolShell } from "@/components/AiToolShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Workplace AI" },
      { name: "description", content: "Get a structured research brief on any topic." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [depth, setDepth] = useState("standard");
  const [focus, setFocus] = useState("");

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        icon={Search}
        title="AI Research Assistant"
        description="Generate structured briefs with key insights and considerations."
      />
      <AiToolShell
        systemPrompt="You are a senior research analyst. Produce a markdown brief with: ## Overview, ## Key Concepts, ## Insights / Findings, ## Pros & Cons, ## Considerations / Risks, ## Suggested Next Steps. Be neutral and clearly flag uncertainty. Do not fabricate statistics or sources — if specific data is uncertain, say so."
        buildUserPrompt={() => {
          if (!topic.trim()) return null;
          return `Research brief request.
Topic: ${topic}
Audience: ${audience || "general business reader"}
Depth: ${depth}
Specific focus / questions: ${focus || "(none)"}`;
        }}
        generateLabel="Generate Brief"
        inputs={
          <>
            <div className="space-y-2">
              <Label htmlFor="topic">Topic *</Label>
              <Input
                id="topic"
                placeholder="e.g. Implementing OKRs in a 50-person startup"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="audience">Audience</Label>
              <Input
                id="audience"
                placeholder="e.g. Executive team"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Depth</Label>
              <Select value={depth} onValueChange={setDepth}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quick">Quick overview</SelectItem>
                  <SelectItem value="standard">Standard brief</SelectItem>
                  <SelectItem value="deep">In-depth analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="focus">Specific questions</Label>
              <Textarea
                id="focus"
                placeholder="Anything specific you want answered…"
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                className="min-h-[110px]"
              />
            </div>
          </>
        }
      />
    </div>
  );
}
