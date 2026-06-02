# FoundRole MCP — Run Your Job Search From Your AI Assistant

Your job search is scattered across a dozen browser tabs, a spreadsheet you forgot to update, and a calendar with no follow-up reminders. FoundRole's MCP server pulls all of it into the AI assistant you already talk to — Claude, ChatGPT, Cursor, and any other MCP client.

Ask in plain language. Your assistant searches live roles, saves the good ones to your tracker, moves them through your pipeline, and sets the follow-up reminders you'd otherwise miss — without you leaving the chat.

> **Connect your FoundRole account once (OAuth 2.1).** After that everything runs through conversation. Free forever — no API key to manage, no credit card.

## What it does for you

- **Find roles without tab-juggling.** Search [FoundRole's live job board](https://www.foundrole.com/jobs) by title, location, company, salary, and how recently a role was posted — straight from chat.
- **See the full picture before you apply.** Pull a job's description, requirements, salary, and apply link without opening the page.
- **Stop losing track of applications.** Save jobs to your [Kanban application tracker](https://www.foundrole.com/job-tracker) and move them through stages (Saved → Applied → Interviewing → Offer) by asking. Attach notes, tags, expected salary, and recruiter contacts.
- **Research before you commit.** Dig into [companies](https://www.foundrole.com/companies), [industry sectors](https://www.foundrole.com/sectors), and [hiring by location](https://www.foundrole.com/locations) to decide where to aim.
- **Never miss a follow-up.** Set a reminder on any tracked job and get an email with a calendar (`.ics`) invite for Google Calendar, Outlook, or Apple Calendar.
- **Let the search come to you.** Subscribe a saved search to recurring alerts (daily, weekly, or monthly) so new matches land in your inbox.

It's the same account and data as [FoundRole.com](https://www.foundrole.com) — the MCP server just lets your AI drive it.

> **New here?** The [FoundRole AI Search guide](https://www.foundrole.com/ai-search-mcp) walks through connecting each client step by step, with an FAQ.

## Setup

Two ways to connect, depending on your client. Either way you'll authorize with your FoundRole account through a standard OAuth sign-in the first time.

### Option 1 — Direct HTTP (recommended for Claude & ChatGPT)

Point your client at the FoundRole MCP endpoint:

```
https://www.foundrole.com/mcp
```

Modern clients open a browser window to sign in to FoundRole on first connect, then remember it.

### Option 2 — stdio bridge (for clients without remote HTTP MCP)

Run the proxy locally with npx; it bridges your client's stdio transport to the FoundRole endpoint and handles the OAuth handshake:

```bash
npx @foundrole/ai-job-search-mcp
```

## Connecting your AI assistant

### Claude Web/Desktop

**Estimated time:** ~2 minutes

1. Open Claude settings (profile / settings icon).
2. Find **Connectors** (or **Tools**) and click **Add custom connector**.
3. Name it `FoundRole`.
4. In the **Remote MCP server URL** field, paste:

   ```
   https://www.foundrole.com/mcp
   ```

5. Save, then complete the FoundRole sign-in when Claude opens the authorization window.

> Claude's custom connectors require a Claude Pro/Team/Enterprise plan on Claude's side. The FoundRole connection itself is free.

### ChatGPT

**Estimated time:** ~3 minutes

1. In ChatGPT, open **Settings → Connectors**.
2. Click **Add custom connector**.
3. Name it `FoundRole`.
4. Paste the server URL when prompted:

   ```
   https://www.foundrole.com/mcp
   ```

5. Follow the on-screen prompts to authorize, signing in to FoundRole.
6. Select **FoundRole** as a source in Deep Research or when enabling connectors.

> ChatGPT connectors require a ChatGPT Plus/Team/Enterprise plan on ChatGPT's side. The FoundRole connection itself is free.

### Cursor / VS Code / Windsurf

Add FoundRole to your client's MCP config. With the stdio bridge:

```json
{
  "mcpServers": {
    "foundrole": {
      "command": "npx",
      "args": ["@foundrole/ai-job-search-mcp@latest"]
    }
  }
}
```

Clients that support remote HTTP MCP can instead point directly at `https://www.foundrole.com/mcp`. Authorize with FoundRole on first use.

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
4. Confirm **foundrole** appears in your MCP servers list, then authorize with FoundRole on first use.

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

3. Save and restart Perplexity, then authorize with FoundRole on first use.

> Perplexity uses stdio MCP transport — Node.js and npm must be installed.

## Try saying

- _"Find senior backend engineer roles in San Francisco posted this week."_
- _"Pull the full details and apply link for that Stripe job."_
- _"Save it to my tracker and mark it Applied."_
- _"Add a note that I referred through Alex, and tag it fintech."_
- _"Remind me to follow up next Tuesday morning."_
- _"What's in my Interviewing column right now?"_
- _"Subscribe me to weekly alerts for remote React jobs."_

## Security

- **OAuth 2.1 with PKCE.** You sign in to FoundRole through a standard authorization flow — short-lived tokens, instant revocation, no credentials shared with the AI client.
- **HTTPS only**, with dynamic client registration and redirect-URI validation.
- **Streamable HTTP** transport (direct), or **stdio** via this proxy.

## Troubleshooting

**Asked to sign in / "needs authentication":**

- Expected on first connect — complete the FoundRole OAuth sign-in in the browser window your client opens.
- If tools don't appear afterward, reconnect the connector so the authorization is re-sent.

**"Connection failed":**

- Check your internet connection and that the URL is exactly `https://www.foundrole.com/mcp`.
- Confirm your client supports remote HTTP MCP; if not, use the stdio bridge (Option 2).

**"Command not found" (stdio clients):**

- Install Node.js (see `engines` in `package.json` for the required version), then retry, or install globally: `npm install -g @foundrole/ai-job-search-mcp` and run `ai-job-search-mcp`.

**Connector not working:**

- Double-check the URL, restart the AI client, and reconnect to re-trigger the FoundRole sign-in.

## Help

- 🌐 Website: [www.foundrole.com](https://www.foundrole.com) — free AI job search, application tracker, and company research
- 📖 Setup guide & FAQ: [foundrole.com/ai-search-mcp](https://www.foundrole.com/ai-search-mcp)
- 🐛 Issues: [GitHub Issues](https://github.com/foundrole/jobs-mcp-proxy/issues)
- 💬 Questions: dev@foundrole.com

---

**No account yet?** [Sign up free at FoundRole](https://www.foundrole.com), connect it once, and let your AI run the job search.

_Made by the [FoundRole](https://www.foundrole.com) team._
