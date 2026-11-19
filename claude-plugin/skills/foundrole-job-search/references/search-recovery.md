# Recover an empty or unclear search

Use the returned result or error to decide what to say. Keep the role, employer, remote setting, and geographic scope the person asked for. The search can already have tried a wider condition, so check what it returned before proposing another search.

| Returned evidence | What to do |
|---|---|
| `locationRecovery.reason` is `ambiguous` | Ask which qualified place the person means. Use a confirmed `options[].location` for the retry. |
| The reason is `unknown` | Say that the search didn’t run because the supplied place could not be resolved. Ask for the intended city, region, or country. The empty jobs array in this error gives no inventory result. If there is a candidate, present it as a choice. If a country or region is already clear, ask for the missing place within that area. A remote search keeps its work-from geography. |
| The reason is `unsupported` | Explain the coverage limit. When the person says the place is required, stop with that explanation. A search somewhere else needs the person's agreement. |
| The response says the employer could not be confirmed | Clarify the name or domain using `company_lookup`. Retry with the chosen `candidates[].lookupValue` in `company`. Keep the other arguments. |
| `jobs` is empty after a completed search | Say that the search returned no jobs with the conditions it used. Use `appliedConditions` or the text summary to explain scope. A confirmed employer with an empty result has no matches in this answer, and the answer alone gives no company-wide inventory count. |
| The answer includes widened jobs | Tell the person which condition changed and separate those jobs from exact matches. Use the returned `widening` explanation and the job's `widened` field where present. |

When the result suggests a specific filter is worth revisiting, offer one change. For example, if the posting window is the useful next question, offer to search a longer period and say the employer and place will stay fixed. Wait for agreement before changing an explicit criterion. If the service already tried the same wider condition, use the existing result. When the person wants to keep their criteria and the answer offers no other evidence-backed change, report the empty result and stop. No returned jobs means no evidence of newly available jobs.

A text-only client can use the wording in the tool result when structured data is unavailable. If that text gives no reliable cause, say the cause is unclear. Clarify a useful missing detail or stop with an honest answer. An identical retry without changed input or new evidence repeats the same question.
