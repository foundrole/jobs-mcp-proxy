# FoundRole

The `foundrole` MCP server connects Gemini CLI to FoundRole's live job board, application tracker and career knowledge base.

## Signing in

Every call needs a FoundRole account. On first use Gemini CLI opens a browser sign-in (OAuth); if it does not, run `/mcp auth foundrole`. The account is free.

## What the tools cover

- Job search: live openings from company career pages in any country. Pass constraints such as remote-only, visa sponsorship, a salary floor or a minimum match as search arguments; a constraint stated only in prose is not applied.
- Roles: when the user's words could mean several roles, `roles_lookup` lists the matching roles with their open-job counts in the place; the role the user picks is saved with `profile_role_set` (or `profile_role_replace` to swap it), and searches without a title then search that role.
- Job details: ghost-posting risk, pay against market filings, visa sponsorship history, and the match against the user's resume.
- Jobs found elsewhere: analyze a posting from any site, compare two to four jobs, and save any of them to the tracker.
- Tracker, reminders and alerts: move jobs through Saved, Applied, Interviewing and Offered, archive them with the outcome, set follow-up reminders, and subscribe searches to email alerts.
- Resume check: how hiring software reads a resume pasted into the chat or uploaded to the account.
- Knowledge: career guidance articles and FoundRole feature pages.

Each tool response says how to present its result. Pagination uses the `nextCursor` value from the previous response.
