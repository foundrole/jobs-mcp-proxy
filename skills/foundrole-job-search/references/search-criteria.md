# Choose the search criteria

Use `jobs_search` for the user's explicit criteria and `jobs_recommendations` for a feed based on their account profile. A request to search for a new role leaves saved roles alone. `profile_roles_list` reads explicit saved choices.

Separate the occupation into `query`, the geographic scope into `location`, and the employer into `company`. Put remote work in `remote` along with the location the user named. This keeps the stated geography rather than turning a remote request into a worldwide search.

For “Find remote Ruby Developer jobs at the Northwind I mean in Ontario, Canada, posted within seven days,” the employer and place may need clarification:

1. The full occupation already fits `query`. If the person instead says “Ruby work,” `roles_lookup` with `{"words":"Ruby work","location":"Ontario, Canada"}` can return candidate roles. Confirm the intended title and use the selected `roles[].name` in `query`.
2. Use `company_lookup` with `{"query":"Northwind"}` if the employer identity is unclear. Confirm the candidate by its returned domain or use `company_lookup` with the domain supplied by the person. Use the confirmed candidate's exact `lookupValue` in `company`. A missing match does not establish that the company has no jobs.
3. Keep the location qualified. Use `Ontario, Canada` in `location`. If the search returns `locationRecovery.options`, the selected option's `location` is the retry value.
4. If the confirmed employer's returned `lookupValue` is `company:northwind-tools`, the search arguments are:

```json
{"query":"Ruby Developer","location":"Ontario, Canada","company":"company:northwind-tools","remote":true,"posted_days_ago":7}
```

Clarification changes only the field being clarified. Keep the other search filters on the retry. An unsupported area, an ambiguous place and an empty successful search describe different outcomes. Present the result and any applicable recovery without guessing a location or changing the employer.
