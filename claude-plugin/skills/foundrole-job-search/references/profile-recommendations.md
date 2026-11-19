# Choose search or recommendations

For explicit search criteria such as “Python Developer in Madrid,” call `jobs_search` immediately with `{"query":"Python Developer","location":"Madrid, Spain"}` when Spain is clear from context. A one-off search leaves the profile alone and works without asking the person to complete it. When the person asks for jobs that fit them, use `jobs_recommendations` and pass their filters. For “Find remote jobs that fit me in Spain,” pass `{"location":"Spain","remote":true}`. The presence of a filter does not make a personalized request a general search.

## Respond to the returned state

- **A role is missing.** If the response returns `roleQuestion` or a role choice in `guide.steps`, ask which work the person is looking for. If their wording is unclear, use `roles_lookup` with their `words` and any stated `location`, then confirm the intended result. Saving a target is a separate choice. Only when the person asks to save the confirmed role does `profile_role_set` take that result's `careerProfileId` as `career_profile_id`. An explicit one-off search is still available.
- **Role-based results are available and a setup step is offered.** Show the jobs. Use `profileSetupState` or `profileSetupMessage` to make the missing step concrete. After the jobs, ask the returned `profileSetupQuestion` as a direct question. If only a `needs_skills` setup message is available, ask “Would you like to add skills you’ve used or upload a resume so recommendations can reflect your experience?” In the same reply, pair the question with the returned `profileSetupUrl` as the link for that step. The assistant does not guess skills or write a profile based on a job description.
- **Setup is explicitly needed.** Ask about one missing fact or offer the returned setup action, and explain what that step helps match. An account connection error is a connection issue. Use the current tool's connection guidance.
- **The feed is ready.** Present the returned jobs. A ready response with no jobs is an empty search, so follow the search-recovery reference instead of asking for profile setup.
- **The feed is processing.** Say the recommendations are still being prepared and can be checked again later with the same filters. Processing does not mean information is missing.
- **The person declines setup.** Acknowledge the choice and show the available jobs without repeating the setup question, link, or its benefits. Use an explicit search if the person asks for one.

Use only returned setup and continuation URLs. In a text-only client, use the same returned state or message to ask the one useful question. When a response does not report a setup need, an empty or delayed feed does not establish one.
