import { useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Sparkles, Copy, RotateCcw, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

import { generateAI } from "@/lib/ai.functions";
import { Disclaimer } from "./Disclaimer";

export interface AiToolShellProps {
  inputs: ReactNode;
  systemPrompt: string;
  buildUserPrompt: () => string | null;
  generateLabel?: string;
  outputPlaceholder?: string;
}

export function AiToolShell({
  inputs,
  systemPrompt,
  buildUserPrompt,
  generateLabel = "Generate",
  outputPlaceholder = "Your AI-generated result will appear here. You can edit it freely before using it.",
}: AiToolShellProps) {
  const run = useServerFn(generateAI);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    const userPrompt = buildUserPrompt();
    if (!userPrompt) {
      toast.error("Please fill in the required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await run({
        data: {
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        },
      });
      setOutput(res.content);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to generate");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {inputs}
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" /> {generateLabel}
              </>
            )}
          </Button>
          <Disclaimer />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Output</CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOutput("")}
              disabled={!output || loading}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              disabled={!output}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="edit">
            <TabsList className="mb-3">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="edit">
              <Textarea
                value={output}
                onChange={(e) => setOutput(e.target.value)}
                placeholder={outputPlaceholder}
                className="min-h-[420px] font-mono text-sm"
              />
            </TabsContent>
            <TabsContent value="preview">
              <div className="prose prose-sm max-w-none min-h-[420px] rounded-md border border-border bg-muted/30 p-4 dark:prose-invert">
                {output ? (
                  <ReactMarkdown>{output}</ReactMarkdown>
                ) : (
                  <p className="text-muted-foreground">{outputPlaceholder}</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
