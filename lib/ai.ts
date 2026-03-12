import OpenAI from "openai";

let _openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _openai;
}

export interface ComplianceItem {
  requirement: string;
  status: "implemented" | "partial" | "missing" | "scope_crept";
  notes: string;
}

export interface ComplianceReport {
  ticketSummary: string;
  implementationSummary: string;
  scopeCreepScore: number;
  items: ComplianceItem[];
  verdict: string;
  snarkComment: string;
}

const COMPLIANCE_SCHEMA = {
  type: "object",
  properties: {
    ticketSummary: {
      type: "string",
      description: "A concise summary of what the ticket asked for",
    },
    implementationSummary: {
      type: "string",
      description: "A concise summary of what was actually implemented",
    },
    scopeCreepScore: {
      type: "number",
      description:
        "A score from 0-100 where 0 = perfect compliance and 100 = complete scope explosion",
    },
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          requirement: {
            type: "string",
            description: "The specific requirement or acceptance criterion",
          },
          status: {
            type: "string",
            enum: ["implemented", "partial", "missing", "scope_crept"],
            description:
              "implemented = done correctly, partial = done but incomplete, missing = not done at all, scope_crept = added but not in the ticket",
          },
          notes: {
            type: "string",
            description:
              "Brief factual notes about the implementation or deviation",
          },
        },
        required: ["requirement", "status", "notes"],
        additionalProperties: false,
      },
    },
    verdict: {
      type: "string",
      description:
        "A snarky but insightful overall verdict on the compliance level",
    },
    snarkComment: {
      type: "string",
      description:
        "A single witty, snarky comment that captures the essence of what went wrong (or right)",
    },
  },
  required: [
    "ticketSummary",
    "implementationSummary",
    "scopeCreepScore",
    "items",
    "verdict",
    "snarkComment",
  ],
  additionalProperties: false,
};

export async function generateComplianceReport({
  ticketTitle,
  ticketBody,
  prTitle,
  prBody,
  prDiff,
}: {
  ticketTitle: string;
  ticketBody: string;
  prTitle: string;
  prBody: string;
  prDiff: string;
}): Promise<ComplianceReport> {
  const systemPrompt = `You are Spec.cop — an AI compliance officer who compares software implementations against their original specifications.

Your job is to:
1. Analyze the original ticket/issue (the "spec") and extract every requirement and acceptance criterion
2. Analyze the PR (title, description, and code diff) to understand what was actually built
3. Compare the two and generate a detailed compliance report

Rules:
- Be neutral and factual in the compliance items (status fields and notes)
- Be snarky and witty ONLY in the verdict and snarkComment fields
- scopeCreepScore: 0 = perfect compliance, 100 = "you built an entirely different product"
- For scope_crept items, describe WHAT was added that wasn't in the ticket
- Be thorough — catch every requirement, no matter how small`;

  const userPrompt = `## Original Ticket

**Title:** ${ticketTitle}

**Description:**
${ticketBody || "(No description provided)"}

---

## Pull Request

**Title:** ${prTitle}

**PR Body:**
${prBody || "(No PR description provided)"}

**Code Changes (diff):**
\`\`\`diff
${prDiff ? prDiff.slice(0, 12000) : "(No diff available)"}
\`\`\`

---

Please generate a compliance report comparing what was asked for vs what was built.`;

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "compliance_report",
        strict: true,
        schema: COMPLIANCE_SCHEMA,
      },
    },
    temperature: 0.7,
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error("No content returned from OpenAI");
  }

  return JSON.parse(content) as ComplianceReport;
}

export function formatReportAsMarkdown(
  report: ComplianceReport,
  ticketUrl?: string,
  prUrl?: string
): string {
  const statusEmoji: Record<string, string> = {
    implemented: "✅",
    partial: "⚠️",
    missing: "❌",
    scope_crept: "🆕",
  };

  const scoreColor =
    report.scopeCreepScore < 30
      ? "🟢"
      : report.scopeCreepScore < 60
        ? "🟡"
        : "🔴";

  const lines = [
    `## 🚨 Spec.cop Compliance Report`,
    ``,
    `> *${report.snarkComment}*`,
    ``,
    `### Scope Creep Score: ${scoreColor} ${report.scopeCreepScore}/100`,
    ``,
    `| | Summary |`,
    `|---|---|`,
    `| 📋 **Ticket** | ${report.ticketSummary}${ticketUrl ? ` ([view](${ticketUrl}))` : ""} |`,
    `| 🔨 **Implementation** | ${report.implementationSummary}${prUrl ? ` ([view](${prUrl}))` : ""} |`,
    ``,
    `### Compliance Breakdown`,
    ``,
    `| Status | Requirement | Notes |`,
    `|--------|-------------|-------|`,
    ...report.items.map(
      (item) =>
        `| ${statusEmoji[item.status] ?? "❓"} ${item.status} | ${item.requirement} | ${item.notes} |`
    ),
    ``,
    `### Verdict`,
    ``,
    report.verdict,
    ``,
    `---`,
    `*Generated by [Spec.cop](https://speccop.dev) — AI compliance for software teams*`,
  ];

  return lines.join("\n");
}
