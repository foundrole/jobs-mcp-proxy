# Jobs by FoundRole

**Remote jobs & resume tailoring**

Find remote jobs and jobs near you, compare pay, check how your resume fits a role, and get resume tailoring suggestions. Track applications, set follow-up reminders, and get job alerts.

## What it adds

- **MCP server `foundrole`** — the hosted FoundRole server at `https://www.foundrole.com/mcp`. Nothing runs on your machine.
- **Skill `foundrole-job-search`** — how Claude searches, compares, and saves jobs, manages the application tracker, reminders, and alerts, and answers career questions from FoundRole's guides.
- **Skill `foundrole-resume-check`** — how Claude runs the resume parse check and reports what a parser extracts and what it loses.
- **Skill `foundrole-resume-workflows`** — how Claude reads saved resume information with permission, previews tailoring, explains fit, and starts a cover letter from the selected experience.

## Sign-in

Installing the plugin adds its skills; the FoundRole connector is connected in a separate step, and that step is where you sign in (OAuth 2.1). Sign in to FoundRole and approve access. If an older connection asks for permission to read saved personal content, reconnect and review the permissions. There is no API key.

- **Claude chat and Cowork** — ask for jobs and press **Connect** on the FoundRole card Claude shows, or open **Customize → Plugins → Jobs by FoundRole → Connectors** and press **Connect** there.
- **Claude Code** — the plugin reaches the server on its own, and the first tool call opens the FoundRole sign-in in your browser.

## What you can ask

- "Find remote product designer jobs paying over $120k posted this week."
- "Is this posting real, and does the company sponsor H-1B?"
- "Compare these two offers."
- "Check how an ATS reads my resume."
- "Show me which part of my saved resume supports this job requirement."
- "Give me a cover-letter starting point for this posting."
- "Save the second job to my tracker and remind me to follow up on Friday."
- "Email me new data engineer jobs in Austin every week."

## Free vs Pro

Search, the ghost-job, pay, and sponsorship checks, the resume check, the tracker, reminders, and alerts are free. Screening filters work on every account; a free account gets the first matches that pass them plus a count of the rest, and Pro returns the full filtered list.

## Links

- Guide: https://www.foundrole.com/ai-search-mcp
- Privacy policy: https://www.foundrole.com/privacy-policy
- Support: dev@foundrole.com
- Source: https://github.com/foundrole/jobs-mcp-proxy
