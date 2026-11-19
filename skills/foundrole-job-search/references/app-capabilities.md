# App capabilities and recovery

## Discover what this session can do

Treat the server's advertised capabilities and the host's execution features as separate inputs.

- The host discovers available tools, prompts, resources and event definitions. Use the model-facing tools it exposes and their current argument schemas.
- A prompt is a reusable entry point into a workflow. A resource supplies context by URI. Reading either does not save a job, change an application or create monitoring.
- The server's `capabilities.events` and the definition from `events/list` establish the server side. A host event-task workflow establishes the client side. Both are needed for background monitoring.
- If the server advertises Events but the host lacks background tasks, say that this host cannot run the requested task. Do not claim that the server lacks Events.
- UI rendering is a separate capability. A `ui://` resource or a familiar client name does not establish widget rendering, Skills support or Events support.
- Model-facing tracker/search tools already return the data needed for a textual answer. App-only data twins are for widget interaction; do not select them merely to suppress a widget.

In a host that renders the widget, use it and add only the interpretation or action confirmation the user needs. In a text-only host, use returned structured data or tool text, retain exact identifiers for follow-up and present a concise answer with returned links.

## Missing connection or capability

When FoundRole tools are absent, explain that the app must be enabled or connected in this client's settings, followed by a new session if the client requires it. The MCP endpoint is `https://www.foundrole.com/mcp`; sign-in is handled through the host's OAuth flow.

Do not simulate a FoundRole result, score, resume parse or account state. If the user elects to continue without FoundRole, identify the different source. If a feature is unavailable but ordinary search works, complete that search and report the separate limitation. A request for chat monitoring with no email does not authorize an email alert.

A tool may return profile-setup, report, tracker or website-continuation links. Offer the link appropriate to the returned state. Use the returned URL; do not construct account routes or infer additional permissions from a link's absence. A hosted task remains subject to the host's features and the current connection.

## Recover according to the response

| Observed result | Next action |
|---|---|
| HTTP 401 or the tool's OAuth challenge | Let the host complete authentication or reconnection. Retry the failed action after auth succeeds; stop if it cannot be completed. An old connection is not proof of current access. |
| Schema or validation failure, including `isError: true` | Correct the rejected argument from the live schema or clarify the missing fact. An invalid location is not an empty search. |
| Valid search with no matching jobs | Report no matches for the applied criteria. Broaden only within the user's request or with their choice. |
| Access or usage limitation | Explain the returned limitation and any returned continuation. Do not promise unavailable output or alter the user's account. |
| Transient read failure | Retry a read briefly when appropriate; if it still fails, report the current limitation rather than looping. |
| Write timeout or lost response | Reconcile current state with the matching read tool before deciding whether a write needs retrying. Do not claim either success or failure without evidence. |

For an uncertain save, inspect the matching job in the tracker. If it is already tracked, report that current state without attributing it to the timed-out call. If a complete read establishes absence, the idempotent save can be retried with the original job and occurrence identifiers.

Treat a sequence of writes as separate outcomes. A save retry is not permission to replay status changes, replace notes, resend reminder confirmations or recreate subscriptions. Continue only the uncompleted authorized steps. A paginated or truncated read cannot prove absence outside the returned items.

A tool error or unavailable host workflow ends that attempted operation; it does not silently select another delivery channel, external service or broader mutation.
