# FoundRole

FoundRole is a job-search backend for AI assistants. It searches live job postings,
judges each one against real market data, and manages the candidate's application
tracker, follow-up reminders and job alerts — all from inside the conversation.

## What it does

**Search live openings.** Query by job title or skill, location, salary floor,
posting date, and remote or on-site work. Results carry the posting's own facts
plus FoundRole's analysis of them.

**Check a posting before applying.** Every result is judged on data the employer
does not provide: how the advertised pay compares with FoundRole's salary
benchmarks, whether the listing shows ghost-job signals, and whether the employer
has a record of sponsoring work visas (H-1B filings, E-Verify enrolment).

**Match against a resume.** When the signed-in account has a completed profile,
results carry a personal match score and an explanation of what fits and what is
missing.

**Track applications.** A role can be saved to the candidate's tracker board
without leaving the conversation, including roles found elsewhere: given a URL and
the posting details, FoundRole files an external job the same way. Status, notes,
deadlines, salary offered and contacts live on the tracked record.

**Stay on top of it.** Follow-up reminders attach to a tracked job. A standing
search can become an email alert so new matches arrive without asking again.

**Answer market questions.** A knowledge search covers FoundRole's own company
profiles, salary benchmarks, visa-sponsorship records and market landing pages for
named employers, cities and job titles.

## Authentication

Every tool requires the user to be signed in. The server speaks OAuth 2.1 with
PKCE (S256) over Streamable HTTP and answers an unauthenticated `initialize` with
HTTP 401 plus a `WWW-Authenticate` challenge pointing at its protected-resource
metadata, so the host can start the sign-in flow on its own.

- Authorization server metadata: `https://www.foundrole.com/.well-known/oauth-authorization-server`
- Protected resource metadata: `https://www.foundrole.com/.well-known/oauth-protected-resource/mcp`
- Scopes: `mcp:tools`, `mcp:resources`

There is no API key to copy and no credential passes through the model. Accounts
are free to create; signing in is the only setup step.

## Known issues and limitations

**Job search does not cover every country.** The catalogue is built from employer
career sites and covers a fixed set of countries. A search scoped to a country
outside that set returns no results and reports which countries are available —
it does not fail silently. Remote roles are matched against the location scope of
the search, so a worldwide-remote query is not a way around the limit.

**Personal match scores need a completed profile.** Without a resume on file,
results carry no match score and personalised recommendations are unavailable. The
response says so and returns a profile setup link rather than reporting a score of
zero.

**Some analysis is limited on free accounts.** Search itself is not gated, but the
screening layer — filtering a whole result list by remote work, visa sponsorship, a
salary floor, posting risk or a minimum match score — is a FoundRole Pro feature.
A free account receives the same unfiltered results, and the response states that
the advanced filters were not applied instead of returning a silently smaller list.
Deep employer signals (full H-1B filing history, match-score breakdowns) follow the
same rule.

**External jobs are analysed from what is supplied.** For a posting found outside
FoundRole, the analysis works from the URL and posting details passed in. Facts
absent from that text are reported as unknown rather than inferred.

**Pagination is cursor-based.** A follow-up page is fetched by passing back the
returned cursor and nothing else. Re-sending the original search parameters
alongside a cursor is not supported.

**Ghost-job and salary judgements are estimates.** They are computed from
FoundRole's own data and are decision support, not a guarantee about any employer
or posting.

## Support

- Website: https://www.foundrole.com
- MCP server details: https://www.foundrole.com/ai-search-mcp
- Support: contacts@foundrole.com
- Privacy policy: https://www.foundrole.com/privacy-policy
- Terms of service: https://www.foundrole.com/terms-of-service
