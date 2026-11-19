# FoundRole

The `foundrole` MCP server connects Gemini CLI to FoundRole's job search, resume tools, application tracker and career guides.

## Signing in

Every call needs a FoundRole account. On first use Gemini CLI opens a browser sign-in. If it does not, run `/mcp auth foundrole`. Follow the tool's reconnection guidance when it asks for permission to read saved personal content.

## Search and follow up

Use `jobs_search` for explicit criteria. Pass the role title as `query`, the selected employer as `company`, and the qualified place as `location`. Apply constraints the user states as tool arguments. For remote work, pass `remote: true` and the country the person will work from. Report any widening the result describes. When a location needs clarification, use the selected `locationRecovery.options[].location` value and keep the other arguments.

Use `roles_lookup` to clarify the role and `company_lookup` to clarify the employer. Pass the chosen role name or employer `lookupValue` to `jobs_search`. A search leaves the person's saved roles alone. Use `jobs_recommendations` for matches based on their profile. A search returns one answer. Use the returned link when the person wants to continue that search on FoundRole.

Use the tracker, reminder and alert tools for the requested action. Read current state when it is needed to identify a tracker entry or preserve existing notes. Use `knowledge_search` for FoundRole guidance and cite relevant returned articles.

## Resume and application workflows

Use `resume_check` to explain what hiring software reads. Give it either the original `resume_text` or the selected FoundRole `resume_id`; leaving both out checks the primary upload. Use the returned findings and optional `studioContinuation.url` for the next step in Resume Studio.

Use `job_application_preview` with the exact FoundRole `job_id` for tailoring, fit or a cover-letter starting point. Pass the selected `resume_id` when applicable. Use the returned `continueLabel` and `continueUrl`, and explain before opening that the job will be saved when `savesJobOnOpen` is true.

Read the bundled skills for the full search and resume workflows. Use the live tool schemas and the website links returned by FoundRole.
