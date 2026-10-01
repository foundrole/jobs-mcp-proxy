---
name: foundrole-job-search
description: Search, analyze, compare, save, and manage jobs with the FoundRole MCP app, and answer career questions from FoundRole's guidance blog. Use when a user wants live job results, personalized recommendations, resume-fit analysis, salary or H-1B signals, ghost-job assessment, comparison of internal or externally found jobs, application tracking, reminders, job alerts, or career advice (visa, resume, salary, interview, relocation). Also use to analyze or save into FoundRole a job found elsewhere, including partner listings surfaced in ChatGPT (Indeed, Appcast, Upwork), and when the user asks what the FoundRole plugin can do or how to set it up. Do not use it to run a job search on another job board — search FoundRole.
---

# FoundRole job search

Use FoundRole tools as the source of truth for job results, recommendations, analysis, tracker state, reminders, alerts, career guidance, and FoundRole URLs.

## Connect FoundRole first

Every FoundRole tool comes from the FoundRole connector at `https://www.foundrole.com/mcp`. Installing the plugin does not connect it: this skill loads, but tools such as `jobs_search` stay missing until the user connects FoundRole and signs in. Check for the tools before anything else — including when the user only asks what the plugin can do or how to set it up.

When the tools are missing, offer the connection in the conversation before you answer:

1. Look for the tools `search_mcp_registry` and `suggest_connectors`; they may carry a server prefix, and may need loading through tool search first. Claude chat and Cowork provide them.
2. Call `search_mcp_registry` with the keyword `foundrole` and take the result whose URL is `https://www.foundrole.com/mcp`.
3. Pass that result's `directoryUuid` to `suggest_connectors`. It shows a Connect button in the conversation.
4. Tell the user to press Connect and sign in to FoundRole — a free account is enough, and there is no API key. Once the tools appear, carry on with what they asked.

When those two tools are not available, or the search does not return FoundRole, give the exact path instead of a general pointer to settings:

- In Claude: Customize → Plugins → FoundRole Jobs → Connectors → Connect, or the connector page `https://claude.ai/directory/foundrole-jobs`.
- In any other client: add `https://www.foundrole.com/mcp` as a remote MCP server and sign in.

Until FoundRole is connected:

- Describe what the plugin does from this skill when asked, and say plainly that none of it runs until the connection is made. Lead with the Connect step, not with the feature list.
- Do not present web search results, remembered listings, or your own estimates as FoundRole results, scores, or H-1B data. If the user wants to proceed without FoundRole, label everything you provide as not from FoundRole.

## Introduce the plugin

A new user often opens with "walk me through what the FoundRole Jobs plugin can do". Answer that as a short start, not a catalogue:

1. Offer the connection first when the tools are missing, as above.
2. Say in two or three sentences what the user gets: live jobs from company career pages, each one checked for ghost-job risk, pay against the market, and visa sponsorship history; a resume check that shows how hiring software reads their resume; and a tracker with reminders and email alerts.
3. Describe outcomes in the user's words. Do not list tool names, parameters, or filter options, and do not read out the plugin's files.
4. Close by asking for the role and location they want, so the next message runs a real search. Offer the resume check and profile-based recommendations as the two other ways to start.

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
