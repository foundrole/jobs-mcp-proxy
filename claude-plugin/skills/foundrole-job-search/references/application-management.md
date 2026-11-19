# Applications, reminders and email alerts

## Resolve the correct target

Use current result context when it identifies the user's job. Otherwise read `tracker_list`, `reminder_list` or `job_alert_list` as appropriate, respecting returned pagination and the tool's supported filters.

| Identifier | Use |
|---|---|
| Returned job identifier | `tracker_add.job_id`, `jobs_details` and other job-level operations |
| Returned result occurrence identifier | `tracker_add.result_item_id` for the selected search occurrence, when available |
| Tracked application identifier | `tracked_job_id` for updates, removal and reminders |
| Returned `jobSearchId` or the explicitly supplied saved-search reference | `job_search_id` for alerts; Events requires the saved-search UUID |
| Email alert row `id` | Identify a listed alert; use that alert's current `jobSearchId` to unsubscribe |

Carry identifiers exactly. A job ID, occurrence ID, tracker ID and email-alert ID are not substitutes for the saved search. Ask for disambiguation only when context and reads cannot identify the requested target.

## Save and update an application

For a FoundRole result, use `tracker_add` with the exact job ID and its occurrence ID when returned. If current context already contains a tracked row, use that row's ID for the requested updates; a redundant save is unnecessary. Repeated saves return the existing row, and restoring a previously removed row can retain its earlier status and notes. Check the returned state rather than announcing that every save reset the job to Saved.

Use `tracker_update_status` for the application stage and `tracker_update` for supported details. Take status, sub-status and other controlled values from the live tool schema or description. Each sub-status belongs to one stage; omit it when no clear mapping exists.

`notes` is replacement text. For “add a note,” preserve the known current notes and append the requested information; read them first if they are not available. Omit unrelated fields. Clear a field only on the user's request and using the tool's documented clearing representation. Use only fields exposed by this tool; website-only editing capabilities are not implied.

For a combined request, retain the tracked row returned by the save, apply the requested stage/details and set a reminder after its time is resolved. Independent, unambiguous changes can proceed while an ambiguous reminder awaits clarification. Confirm the specific completed changes and name the remaining step.

`tracker_remove` removes the application from tracking. Canceling a reminder or email subscription uses its own capability. An application stage records the user's reported progress; a tracker write or an Apply link does not establish submission to an employer.

## Save or analyze a posting found elsewhere

Use `tracker_add_external` to save it and `jobs_analyze_external` to evaluate it. Carry the direct posting URL, company, title, location and full available posting text, including detail already supplied by a partner listing. Do not ask again for source detail already in the conversation or shorten it to a summary before submission.

Populate structured and `client_extraction` fields only from source-backed facts. Keep unsupported fields absent or null as allowed by the schema. Evidence excerpts must occur in the supplied posting text with enough context to support the value. Classify skill requirements from the posting's wording. Do not infer missing salary, visa sponsorship, clearance, work arrangement, education, experience, company facts or benefits. Keep FoundRole company sponsorship history separate from a posting's own visa statement.

## Reminders

Use `reminder_set` with the tracked application's ID and `remind_at`, an ISO 8601 timestamp in the future. Resolve relative dates against the user's current date and timezone; clarify a missing timezone or ambiguous time instead of assuming UTC.

Setting a reminder replaces that application's existing reminder and sends a confirmation email with a calendar attachment. Check returned `reminderAt` before confirming it was scheduled. If the user excludes email, explain this behavior before using this tool; a host task is a separate available alternative, not an automatic substitution.

Use `reminder_delete` to cancel the reminder while retaining the application. Check that the result clears the reminder. Use `reminder_list` to review upcoming reminders; do not treat a limited list as the complete tracker.

## Email job alerts

Use `job_alert_subscribe` for a selected saved search, with `job_search_id` and only the delivery/frequency the user requested. Omit unspecified optional preferences and describe the actual returned `jobAlert.frequency` and `delivery`; do not invent “daily” or promise immediate messages. Use schema-declared values. An unavailable fast-delivery request is a validation failure, not a reason to change another setting silently.

FoundRole keeps one active alert per query and place. A request with changed filters, radius or sort can update that existing alert rather than create an independent second one; an already-covering alert can also be reused. Treat the returned `jobAlert.id`, `jobSearchId`, status and message as authoritative, and explain when the existing alert was updated.

Use `job_alert_list` to resolve an alert when needed. To stop one alert, pass its current saved-search reference to `job_alert_unsubscribe`, not its alert row ID. Use the latest returned association when an alert's search changed. `job_alert_unsubscribe_all` is only for an explicit request to stop all email alerts, with its required confirmation argument.

Email alerts and host event tasks are independent. Stopping either does not stop the other. A reminder confirmation email is also different from a saved-search email alert. Confirm an email subscription only from a successful result; delivery timing and empty-search behavior remain the server's policy.
