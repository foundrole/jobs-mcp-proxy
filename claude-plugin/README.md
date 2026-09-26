# FoundRole Jobs — Claude plugin

Search live jobs from Claude and see each one checked on real data: whether anyone is actually hiring, what the role pays against local employer filings, and whether the company has sponsored visas before. Then check how hiring software reads your resume and keep your applications, reminders, and job alerts in one place.

## What it adds

- **MCP server `foundrole`** — the hosted FoundRole server at `https://www.foundrole.com/mcp`. Nothing runs on your machine.
- **Skill `foundrole-job-search`** — how Claude searches, compares, and saves jobs, manages the application tracker, reminders, and alerts, and answers career questions from FoundRole's guides.
- **Skill `foundrole-resume-check`** — how Claude runs the resume parse check and reports what a parser extracts and what it loses.

## Sign-in

The first tool call opens a FoundRole sign-in in your browser (OAuth 2.1). Sign in or create a free account and approve access once. There is no API key.

## What you can ask

- "Find remote product designer jobs paying over $120k posted this week."
- "Is this posting real, and does the company sponsor H-1B?"
- "Compare these two offers."
- "Check how an ATS reads my resume."
- "Save the second job to my tracker and remind me to follow up on Friday."
- "Email me new data engineer jobs in Austin every week."

## Free vs Pro

Search, the ghost-job, pay, and sponsorship checks, the resume check, the tracker, reminders, and alerts are free. Screening filters work on every account; a free account gets the first matches that pass them plus a count of the rest, and Pro returns the full filtered list.

## Links

- Guide: https://www.foundrole.com/ai-search-mcp
- Privacy policy: https://www.foundrole.com/privacy-policy
- Support: dev@foundrole.com
- Source: https://github.com/foundrole/jobs-mcp-proxy
