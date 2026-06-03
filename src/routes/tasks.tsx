import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks } from "lucide-react";

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

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Workplace AI" },
      { name: "description", content: "Turn goals into a prioritized task plan." },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  const [goal, setGoal] = useState("");
  const [timeframe, setTimeframe] = useState("1 week");
  const [hoursPerDay, setHoursPerDay] = useState("2");
  const [context, setContext] = useState("");

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        icon={ListChecks}
        title="AI Task Planner"
        description="Break a goal into prioritized, time-boxed tasks."
      />
      <AiToolShell
        systemPrompt="You are an expert productivity coach. Given a goal, produce a clear markdown plan with: ## Overview, ## Milestones, ## Task List (numbered, each with priority [P1/P2/P3], estimated time, and suggested day). End with ## Tips. Be realistic about scope."
        buildUserPrompt={() => {
          if (!goal.trim()) return null;
          return `Create a task plan.
Goal: ${goal}
Timeframe: ${timeframe}
Available hours per day: ${hoursPerDay}
Context / constraints: ${context || "(none)"}`;
        }}
        generateLabel="Generate Plan"
        inputs={
          <>
            <div className="space-y-2">
              <Label htmlFor="goal">Goal *</Label>
              <Textarea
                id="goal"
                placeholder="e.g. Launch a customer onboarding revamp"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="min-h-[90px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Timeframe</Label>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 day">1 day</SelectItem>
                    <SelectItem value="3 days">3 days</SelectItem>
                    <SelectItem value="1 week">1 week</SelectItem>
                    <SelectItem value="2 weeks">2 weeks</SelectItem>
                    <SelectItem value="1 month">1 month</SelectItem>
                    <SelectItem value="1 quarter">1 quarter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">Hours / day</Label>
                <Input
                  id="hours"
                  type="number"
                  min={1}
                  max={12}
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="context">Context</Label>
              <Textarea
                id="context"
                placeholder="Any constraints, dependencies, team members…"
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>
          </>
        }
      />
    </div>
  );
}
