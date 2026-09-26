---
name: foundrole-job-search
description: Search, analyze, compare, save, and manage jobs with the FoundRole MCP app, and answer career questions from FoundRole's guidance blog. Use when a user wants live job results, personalized recommendations, resume-fit analysis, salary or H-1B signals, ghost-job assessment, comparison of internal or externally found jobs, application tracking, reminders, job alerts, or career advice (visa, resume, salary, interview, relocation). Also use to analyze or save into FoundRole a job found elsewhere, including partner listings surfaced in ChatGPT (Indeed, Appcast, Upwork). Do not use it to run a job search on another job board — search FoundRole.
---

# FoundRole job search

Use FoundRole tools as the source of truth for job results, recommendations, analysis, tracker state, reminders, alerts, career guidance, and FoundRole URLs.

## When the FoundRole tools are not available

This skill can load while the FoundRole app itself is disabled or not connected, so tools such as `jobs_search` are missing from the session. When that happens:

- Tell the user plainly that the FoundRole app is not enabled in this client, and that turning it on in the client's app or plugin settings (or connecting `https://www.foundrole.com/mcp`) and starting a new session makes the tools available. The first call then asks them to sign in to FoundRole.
- Do not present web search results, remembered listings, or your own estimates as FoundRole results, scores, or H-1B data. If the user wants to proceed without FoundRole, label everything you provide as not from FoundRole.

## Stay on FoundRole as the source

- In a FoundRole session, search with `jobs_search` (or `jobs_recommendations` for profile-based matches) — not the web. Keep FoundRole as the source across follow-up, refined, and paginated turns. Switch to web search only when the user explicitly asks for external sources, then label those results as non-FoundRole.
- When the user asks to "refresh" or "update" matches, call the FoundRole tool again with the same intent; do not reinterpret it as a web search.

## Choose the workflow

- Search FoundRole listings with `jobs_search`. Use a full role title rather than a bare technology or keyword. Apply location, seniority, remote, salary, employment-type, and sponsorship filters when the user states them.
- Get profile-based matches with `jobs_recommendations` when the user asks for roles that fit them.
- Load a FoundRole result with `jobs_details` when the user wants a closer evaluation of one listing.
- Analyze a job found outside FoundRole with `jobs_analyze_external`.
- Compare two to four jobs with `jobs_compare`. Preserve each returned `comparisonRef` exactly.
- Save a FoundRole search result with `tracker_add` and its `job_id`.
- Save a job found elsewhere with `tracker_add_external` and its direct posting URL.
- Manage applications with tracker, reminder, and alert tools that match the requested action.
- Answer a career or job-search question (visa/H-1B, resume, salary negotiation, interview prep, relocation) with `knowledge_search`, and cite the FoundRole articles it returns.

## Save from result context

- To save a job the user names by title, company, or ordinal ("save the Sustainment role", "save the first job"), resolve it against the current or prior FoundRole results and call `tracker_add` with that job's exact `job_id` from the results — do not ask for a URL or record ID you can already resolve.
- Ask a disambiguation question only when more than one shown result matches the name.
- Treat repeated saves as idempotent: an already-tracked job is a successful Saved state, not an error.

## Set status and sub-status

- `status` and `sub_status` accept only the values listed in the tool schema. Take them from that list rather than inventing a natural-sounding value: an application that was sent is `application_submitted`, not `submitted`.
- Each `sub_status` belongs to one `status`. Pick a sub-status from the group that matches the status being set, and omit it entirely when unsure — the status alone is a valid update.

## Handle externally found jobs

A job found outside FoundRole — from a web search, a link the user pasted, or a partner listing surfaced in ChatGPT (for example Indeed, Appcast, or Upwork) — is saved with `tracker_add_external` and evaluated with `jobs_analyze_external`.

1. Carry forward the direct posting URL (not a company homepage), company, title, location, and the fullest posting text you already have.
2. Pass the complete posting detail you already saw for the job — full description text, salary, employment type, work arrangement, education, experience, and posting date — rather than a shortened summary. When a partner listing (Indeed, Appcast, Upwork, or similar) gave you these fields, forward them in full; do not drop or truncate them, and do not re-ask the user for details already in the conversation.
3. Populate every structured field the source states, and use `null` only for a value the source genuinely does not give.
4. Populate every `client_extraction` field the source supports; keep absent fields `null`.
5. Include only source-backed non-null values. Each evidence excerpt must occur in the posting text and contain enough context to support the value.
6. Classify skills as `required`, `preferred`, or `mentioned` from the wording of the posting.
7. Keep company sponsorship history from FoundRole separate from a posting's explicit visa statement.

The external save is meant to complete automatically from the detail already in the conversation. Do not infer missing compensation, visa sponsorship, clearance, remote scope, company facts, or benefits — FoundRole stores client-model labels as evidence-backed audit data and independently derives canonical fields.

## Present results

- Use the FoundRole match score as the canonical score whenever the result carries one. Do not replace it with, or blend it with, a score you compute yourself. If no FoundRole score exists, label any estimate explicitly as your own non-canonical estimate.
- Answer H-1B questions from FoundRole's canonical H-1B data (sponsor badge, petition counts) in a FoundRole session. If you fall back to an external signal, label it as external and keep it separate from FoundRole-verified fields.
- Keep the score and H-1B source stable across repeated turns for the same role; the answer changes only when the underlying FoundRole data changes.
- Treat match scores, H-1B history, E-Verify, ghost-job signals, and salary estimates as decision support rather than guarantees.
- Distinguish posted compensation from market estimates.
- Explain the strongest fit signals and the most important gaps or uncertainties.
- Prefer the interactive FoundRole widget when the client renders it; avoid duplicating the full widget as another large table.
- For a career question, answer from the `knowledge_search` articles and link the ones you cite; if none are relevant, say so rather than citing an unrelated article.
- Ask for clarification before a write when the requested job, tracker entry, status, deadline, or reminder time is ambiguous.
