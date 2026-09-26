---
name: foundrole-resume-check
description: Check how hiring software (an ATS parser) reads a resume with the FoundRole MCP app, and report what the parser extracted and what it lost. Use when a user asks whether their resume is ATS-friendly, why applications get no reply, whether a parser can read their PDF, what a recruiting system sees on their resume, or asks for a resume scan, resume score, or resume review. Also use when the user pastes resume text and wants it checked. Do not use it to rewrite or grade the content of a resume — this check reports machine readability, not writing quality.
---

# FoundRole resume check

`resume_check` runs FoundRole's deterministic parse of a resume: FoundRole's own text-readability assessment, with no AI recovery. Report exactly what it returns.

## When `resume_check` is not available

This skill can load while the FoundRole app itself is disabled or not connected, so `resume_check` is missing from the session. Tell the user the FoundRole app is not enabled in this client, and that turning it on in the client's app or plugin settings (or connecting `https://www.foundrole.com/mcp`) and starting a new session makes the check available. Do not simulate the parse, and do not present your own reading of the resume as a FoundRole result or band.

## Choose what to check

- When the resume text is already in the conversation — pasted by the user, or read from a file they shared — pass it as `resume_text`. The minimum is 200 characters; a shorter passage is rejected, so ask for the full text rather than retrying with a fragment.
- Without `resume_text`, the check runs on the resume already uploaded to the user's FoundRole account. Use this when the user asks about "my resume" and has not pasted anything.
- Do not paraphrase, reformat, or clean up the resume before passing it. The check measures what a parser reads from the actual text, so an improved version measures the wrong document.
- Check one resume per call. To compare two versions, call the tool once per version and contrast the returned bands and findings.

## Read the result

The response carries `mode`, `band`, `findings`, `parsedAs`, and a link — `studioReportUrl` or `uploadUrl`.

- `mode` says which document was read: `uploaded` (the account's resume), `text` (the pasted text), `no_resume` (nothing to check), `processing` (the upload is still being read).
- `band` is `strong`, `good`, or `partial`. Report the band in plain words. It is a readability band, not a percentage and not a match score — do not convert it into one, and do not invent a number to accompany it.
- `findings` lists what the parse lost, each with its own `detail`. Report every finding with its detail; do not summarize several findings into one line, and do not add a finding the tool did not return. A single `clean` finding means nothing significant was lost.
- `parsedAs` is what the parser extracted: detected job title, years of experience, recognized skills count, sections, and which contact channels were found. Present these as the parser's reading, not as facts about the person — "the parser found no phone number" rather than "you have no phone number".

## Stay inside the deterministic lens

- Pasted or extracted text cannot establish whether the original PDF or DOCX layout parses correctly. State this limitation when the user asks about a file; never present the text check as a test against a named ATS.

- This is the mechanical read only. It does not judge wording, achievements, seniority, or fit for any role. If the user asks whether the resume is good, say what the parser reads and what it loses, and keep any writing advice clearly separate from the tool's output.
- Never state or estimate a score, percentage, or pass rate for a specific ATS product, and never claim the resume will or will not pass a named system. The check describes typical parser behavior.
- The result is deterministic and repeatable: the same text returns the same band and findings. Do not re-run the check hoping for a different answer, and keep the reported band stable across turns for the same document.

## Handle each mode

- `no_resume`: the account has no uploaded resume and nothing was pasted. Ask the user to paste their resume text, or link `uploadUrl` to add it to their FoundRole account.
- `processing`: the upload is still being read. Offer to retry shortly, or to check pasted text right away.
- `text`: The check does not create a saved Resume Studio report or add a resume to the account. Link `uploadUrl` if the user wants to upload the file and save a resume on the website. Do not claim that the input is never stored: operational request records and diagnostics may retain it.
- `uploaded`: `studioReportUrl` opens the saved report for this resume on the FoundRole website.

## Point to the next step

- Use the returned URL rather than composing a FoundRole URL yourself.
