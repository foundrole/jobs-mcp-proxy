# FoundRole MCP Server — AI Job Search in ChatGPT, Claude & Cursor

Ask ChatGPT or Claude for jobs and get real openings back — each one checked for whether it's still real, what it actually pays, and whether the company sponsors visas. The FoundRole MCP server connects your AI assistant to [FoundRole](https://www.foundrole.com)'s live job board, application tracker, and career knowledge base, so the whole job search runs inside the chat you already use.

> **Sign in once — your assistant handles it.** The first time your AI calls FoundRole it opens a standard OAuth sign-in; approve it once in the browser and that covers everything: search, fact-checks, the tracker, reminders, and alerts. There is no API key to copy or rotate, and the account is free.

## What your assistant can do

- **Search live jobs by asking.** Openings straight from company career pages, refreshed hourly across 40+ industries. Natural language maps onto real filters — job title, location, company, salary range, posting date: _"remote React jobs in NYC paying over $130k posted this week."_
- **Get every posting fact-checked — free.** Before you spend an evening on an application, three questions get answered with the evidence behind each call:
  - **Is anyone actually hiring?** Ghost-posting risk — whether the role has been reposted for months or looks like it's fishing for resumes.
  - **Am I being underpaid?** The pay against what employers in that market really file, so a hidden salary range stops being a guess.
  - **Would they sponsor me?** Whether the company has sponsored visas before, counted year by year from public filings.
- **See how well you fit.** Match scoring against your resume and profile, plus personalized job recommendations ranked by fit.
- **Compare roles side by side.** _"Compare these two"_ lines up fit, pay, sponsorship, and posting risk at once — so the choice stops being a feeling.
- **Paste a job from anywhere.** LinkedIn, a careers page, a link a friend sent — paste the posting into the chat and it gets the same checks, and can sit in your tracker alongside FoundRole listings. Your assistant reads the text you provide; nothing crawls the site for you.
- **Stop losing track of applications.** Save jobs to your [Kanban application tracker](https://www.foundrole.com/job-tracker) and move them through Saved → Applied → Interviewing → Offered → Hired by asking. Attach notes, tags, expected salary, recruiter contacts, and deadlines. The same board shows up in the web app.
- **Never miss a follow-up.** Set a reminder on any tracked job and get an email with a calendar (`.ics`) invite for Google Calendar, Outlook, or Apple Calendar.
- **Let the search come to you.** Subscribe a search to recurring email alerts — daily, weekly, or monthly — so new matches land in your inbox.
- **Ask the awkward questions too.** Interview prep, salary negotiation, resume tactics, company research — answers grounded in FoundRole's knowledge base, with the sources linked.
- **See results as real panels, not text walls.** In clients that support MCP Apps (ChatGPT among them), search results, job details, and your tracker render as interactive panels right in the chat.

It's the same account and data as [FoundRole.com](https://www.foundrole.com) — the MCP server just lets your AI drive it.

## Free vs Pro

Search, the fact-checks on every posting, the tracker, reminders, and alerts are free with no usage limits. Pro adds screening: ask for remote-only, sponsors-only, a salary floor, risky postings hidden, or a minimum match, and your assistant filters the list before you ever see it — and tells you when it has. A free account still gets the full list back, with a note that those filters were not applied.

> **New here?** The [FoundRole AI Search guide](https://www.foundrole.com/ai-search-mcp) walks through connecting each client step by step, with an FAQ.

## Setup

Two ways to connect, depending on your client. Either way, your client opens a FoundRole sign-in the first time it connects — approve it once and you're set.

### Option 1 — Remote server (recommended)

Point your client at the FoundRole MCP endpoint:

```
https://www.foundrole.com/mcp
```

Most modern clients — ChatGPT, Claude, Cursor, VS Code — speak remote MCP (Streamable HTTP) natively, so this is all the configuration there is.

### Option 2 — stdio bridge (for clients without remote MCP)

If your client only supports stdio transport, run this package locally with npx; it bridges stdio to the FoundRole endpoint and handles the OAuth sign-in for you:

```bash
npx @foundrole/ai-job-search-mcp
```

## Connecting your AI assistant

### ChatGPT

**Estimated time:** ~1 minute

1. Open FoundRole in the [ChatGPT app directory](https://chatgpt.com/plugins/plugin_asdk_app_6a21bbefe8bc81919d395e1b9e90b91d).
2. Click **Add** and approve the FoundRole sign-in when ChatGPT opens it.
3. Ask for jobs in any chat — no settings to configure, nothing to paste.

### Claude Web/Desktop

**Estimated time:** ~2 minutes

1. Open Claude settings (profile / settings icon).
2. Find **Connectors** (or **Tools**) and click **Add custom connector**.
3. Name it `FoundRole`.
4. In the **Remote MCP server URL** field, paste:

   ```
   https://www.foundrole.com/mcp
   ```

5. Save, allow Claude to connect, and approve the FoundRole sign-in it opens. Then ask for jobs in the chat.

### Cursor / VS Code / Windsurf

In Cursor, open Settings → MCP and add this to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "foundrole": {
      "url": "https://www.foundrole.com/mcp"
    }
  }
}
```

In VS Code, add this to `.vscode/mcp.json` in your workspace (or your user `mcp.json`) — VS Code uses a different key and needs an explicit transport type:

```json
{
  "servers": {
    "foundrole": {
      "type": "http",
      "url": "https://www.foundrole.com/mcp"
    }
  }
}
```

Approve the FoundRole sign-in when your editor opens it, then ask for jobs in the chat.

### LM Studio

**Estimated time:** ~3 minutes | **Requires:** Node.js + npm

1. Open LM Studio's MCP servers configuration.
2. Add this entry:

   ```json
   {
     "mcpServers": {
       "foundrole": {
         "command": "npx",
         "args": ["@foundrole/ai-job-search-mcp@latest"],
         "env": {}
       }
     }
   }
   ```

3. Save and restart LM Studio.
4. Confirm **foundrole** appears in your MCP servers list, approve the sign-in it opens, and start asking for jobs.

### Perplexity Desktop

**Estimated time:** ~4 minutes | **Requires:** Perplexity Pro + Node.js

1. Open Perplexity's MCP configuration.
2. Add:

   ```json
   {
     "command": "npx",
     "args": ["@foundrole/ai-job-search-mcp@latest"],
     "env": {}
   }
   ```

3. Save and restart Perplexity, then approve the FoundRole sign-in when it opens.

> Perplexity uses stdio MCP transport — Node.js and npm must be installed.

### Any other MCP client

The same address works everywhere: add `https://www.foundrole.com/mcp` as a remote server, or bridge stdio-only clients with `npx @foundrole/ai-job-search-mcp`.

> **Note:** After you approve the sign-in, some clients need a restart (quit and reopen) before the connection goes live.

## Try saying

- _"Find senior backend engineer roles in San Francisco posted this week."_
- _"Which of these is least likely to be a ghost posting?"_
- _"Does Stripe sponsor visas? What does this role really pay?"_
- _"Compare the Stripe and Vercel roles on fit, pay, and sponsorship."_
- _"Here's a posting from LinkedIn — run the same checks on it."_
- _"Recommend jobs that match my resume."_
- _"Save it to my tracker and mark it Applied."_
- _"Remind me to follow up next Tuesday morning."_
- _"What's in my Interviewing column right now?"_
- _"Subscribe me to weekly alerts for remote React jobs."_
- _"How do I answer 'walk me through your resume'?"_

## Security

- **OAuth 2.1 with PKCE.** You sign in to FoundRole through a standard authorization flow — short-lived tokens, instant revocation, no credentials shared with the AI client, no API key to copy, store, or leak.
- **HTTPS only**, with dynamic client registration and redirect-URI validation.
- **Streamable HTTP** transport (direct), or **stdio** via this proxy.
- **It never applies or emails anyone as you.**

## Troubleshooting

**Asked to sign in / "needs authentication":**

- Expected on first connect — the server authenticates every session. Complete the FoundRole sign-in in the browser window your client opens.
- If tools still don't appear afterward, restart the client or reconnect the connector so the authorization is re-sent.

**"Connection failed":**

- Check your internet connection and that the URL is exactly `https://www.foundrole.com/mcp`.
- Confirm your client supports remote HTTP MCP; if not, use the stdio bridge (Option 2).

**"Command not found" (stdio clients):**

- Install Node.js (see `engines` in `package.json` for the required version), then retry, or install globally: `npm install -g @foundrole/ai-job-search-mcp` and run `ai-job-search-mcp`.

**Connector not working:**

- Double-check the URL, complete the sign-in, and restart the AI client — some clients only pick up the connection after a restart.

## Help

- 🌐 Website: [www.foundrole.com](https://www.foundrole.com) — free AI job search, application tracker, and company research
- 📖 Setup guide & FAQ: [foundrole.com/ai-search-mcp](https://www.foundrole.com/ai-search-mcp)
- 🔍 How the fact-checks work: [foundrole.com/how-it-works](https://www.foundrole.com/how-it-works)
- 🐛 Issues: [GitHub Issues](https://github.com/foundrole/jobs-mcp-proxy/issues)
- 💬 Questions: dev@foundrole.com

---

**Connect your AI client, sign in once, and run the whole job search from the chat** — search, fact-checks, tracking, reminders, and alerts, free at [FoundRole](https://www.foundrole.com).

_Made by the [FoundRole](https://www.foundrole.com) team._
