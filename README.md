# speccop
🚨 Spec.cop — AI that compares your finished implementation against the original ticket. "You built what now?"

---

Your ticket said "fix the login button". Your PR touched 47 files. Spec.cop noticed.

## What is Spec.cop?

**Spec.cop** is an AI compliance officer for software teams. It connects to your Linear or Jira tickets, connects to your GitHub PRs, and uses GPT-4o to compare the *intent* (what was asked) against the *implementation* (what you shipped). The result is a detailed compliance report, posted directly as a PR comment, with a Scope Creep Score from 0 to 100.

Zero means you built exactly what was asked. A hundred means you're explaining yourself to HR.

## Features

- 🤖 **AI compliance reports** — GPT-4o reads your ticket and your diff. It knows.
- 📊 **Scope Creep Score** — 0-100. Lower is better. You probably won't get 0.
- 💬 **Automatic PR comments** — Reports land on the PR before your PM opens it.
- 🔗 **Linear + Jira integration** — Pulls the original ticket automatically.
- 🚫 **Merge blocking** — Team plan can fail the status check if score exceeds threshold.
- 🏆 **Scope Creep Leaderboard** — See who on your team needs a talking-to.

## Stack

- **Framework**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Auth**: NextAuth.js v5 with GitHub OAuth
- **AI**: OpenAI GPT-4o with structured JSON outputs
- **Database**: Prisma + PostgreSQL (Supabase-compatible)
- **Integrations**: Linear SDK, Jira REST API v3, Octokit
- **Payments**: Stripe

## Setup

### 1. Clone and install

```bash
git clone https://github.com/your-org/speccop.git
cd speccop
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Fill in all values. The required ones are:
- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — random secret (`openssl rand -base64 32`)
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` — from GitHub OAuth app
- `OPENAI_API_KEY` — from OpenAI

### 3. Set up the database

```bash
npx prisma migrate dev --name init
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Configure GitHub Webhook

In your GitHub repository settings, add a webhook:
- **URL**: `https://your-domain.com/api/webhook/github`
- **Content type**: `application/json`
- **Events**: `Pull requests`

---

## ⚠️ Warning

Spec.cop will expose scope creep with zero mercy. It will read every line of your diff, compare it against the original ticket word for word, and assign a score that will haunt you in standup. There is no appeals process. There is no "but the PM said it was okay" defense.

Ship what was asked. Or don't. But Spec.cop will know.

