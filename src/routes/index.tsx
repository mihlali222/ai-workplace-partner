import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  NotebookPen,
  ListChecks,
  Search,
  MessageSquare,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Disclaimer } from "@/components/Disclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Workplace AI" },
      {
        name: "description",
        content: "Your AI workspace for emails, meetings, tasks, research and chat.",
      },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    title: "Smart Email Generator",
    description: "Draft professional emails in seconds with the right tone.",
    url: "/email",
    icon: Mail,
  },
  {
    title: "Meeting Notes Summarizer",
    description: "Turn raw notes or transcripts into clear summaries and actions.",
    url: "/meetings",
    icon: NotebookPen,
  },
  {
    title: "AI Task Planner",
    description: "Break goals into prioritized, time-boxed task lists.",
    url: "/tasks",
    icon: ListChecks,
  },
  {
    title: "AI Research Assistant",
    description: "Get structured briefs on any topic with key insights.",
    url: "/research",
    icon: Search,
  },
  {
    title: "AI Chatbot",
    description: "Conversational assistant for any workplace question.",
    url: "/chat",
    icon: MessageSquare,
  },
] as const;

function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section
        className="relative overflow-hidden rounded-2xl p-8 text-primary-foreground shadow-sm"
        style={{ background: "var(--gradient-primary)" }}
      >
        <div className="relative z-10 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> AI Productivity Suite
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Do your best work, faster.
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/90 sm:text-base">
            Automate the busywork of email, meetings, planning and research with
            structured AI tools built for professionals.
          </p>
        </div>
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">Tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.url} to={t.url} className="group">
              <Card className="h-full border-border/70 transition-all hover:border-primary/40 hover:shadow-md">
                <CardHeader>
                  <div
                    className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg text-primary-foreground shadow-sm"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <t.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{t.title}</CardTitle>
                  <CardDescription>{t.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Open
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Disclaimer />
    </div>
  );
}
