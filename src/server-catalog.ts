import type { ServerCatalog } from "./server-catalog-types.js";

export const SERVER_CATALOG: ServerCatalog = {
  prompts: {
    prompts: [
      {
        name: "analyze_external_job",
        title: "Analyze a job from another site",
        description:
          "Analyze a job found outside FoundRole for resume fit, missing skills, salary, H-1B history, E-Verify, and ghost-job signals from its posting details.",
        arguments: [
          {
            name: "url",
            description: "Direct posting URL of the external job",
            required: true,
          },
          {
            name: "details",
            description:
              "Posting text or key details already available for the job",
            required: false,
          },
        ],
      },
      {
        name: "check_my_resume",
        title: "Check my resume",
        description:
          "Check how well hiring software reads the user's resume and what a typical parser loses.",
        arguments: [],
      },
      {
        name: "compare_jobs",
        title: "Compare jobs",
        description:
          "Compare two to four FoundRole or previously analyzed jobs by fit, compensation, sponsorship signals, location, and risk, and recommend where to apply first.",
        arguments: [
          {
            name: "focus",
            description:
              "What matters most in the comparison (e.g. compensation, visa sponsorship, remote)",
            required: false,
          },
        ],
      },
      {
        name: "create_job_alert",
        title: "Create a job alert",
        description:
          "Create a recurring FoundRole job alert for a role, location, and frequency so new matching roles arrive over time.",
        arguments: [
          {
            name: "role",
            description: "The full job title or role to receive alerts for",
            required: true,
          },
          {
            name: "location",
            description: "City, region, or country for the alert",
            required: false,
          },
          {
            name: "frequency",
            description:
              "How often to receive the alert: daily, weekly, monthly",
            required: false,
          },
        ],
      },
      {
        name: "explore_career_knowledge",
        title: "Explore career guides",
        description:
          "Answer a career or job-search question (visa, resume, salary, interview, relocation) from FoundRole's published guidance articles.",
        arguments: [
          {
            name: "question",
            description: "The career or job-search question to answer",
            required: true,
          },
        ],
      },
      {
        name: "find_jobs_for_me",
        title: "Find jobs for me",
        description:
          "Search FoundRole for jobs matching a role, location, and seniority, rendered as a ranked shortlist.",
        arguments: [
          {
            name: "role",
            description:
              'The full job title or role (e.g. "Senior Ruby Developer", not just "Ruby")',
            required: true,
          },
          {
            name: "location",
            description: "City, region, or country to search in",
            required: false,
          },
          {
            name: "seniority",
            description: "Seniority level",
            required: false,
          },
          {
            name: "remote",
            description: "Restrict to remote roles",
            required: false,
          },
        ],
      },
      {
        name: "learn_about_foundrole",
        title: "Learn about a FoundRole feature",
        description:
          "Explain a FoundRole capability (job tracker, Pro plan, H1B salary data, AI job search) from the site's own feature pages.",
        arguments: [
          {
            name: "question",
            description: "What the user wants to know about FoundRole",
            required: true,
          },
        ],
      },
      {
        name: "prepare_for_interview",
        title: "Prepare for an interview",
        description:
          "Build an interview-prep brief for a company and role: compensation expectations, company facts, sponsorship signals, and questions to ask.",
        arguments: [
          {
            name: "company",
            description: "The company you are interviewing with",
            required: true,
          },
          {
            name: "role",
            description: "The full job title or role being interviewed for",
            required: false,
          },
          {
            name: "location",
            description: "City, region, or country of the role",
            required: false,
          },
        ],
      },
      {
        name: "research_company",
        title: "Research a company",
        description:
          "Research an employer using FoundRole's company profile page, related guidance articles, and its live openings.",
        arguments: [
          {
            name: "company",
            description: "The company name to research",
            required: true,
          },
          {
            name: "focus",
            description:
              "An optional angle to focus on (culture, interviews, visa sponsorship, salaries)",
            required: false,
          },
        ],
      },
      {
        name: "review_my_applications",
        title: "Review my applications",
        description:
          "Review the user's tracked job applications with their deadlines and reminders, and turn them into a prioritised action plan.",
        arguments: [],
      },
      {
        name: "save_and_track_job",
        title: "Save and track a job",
        description:
          "Save a job to the FoundRole tracker and optionally set an application-deadline reminder, resolving the job from the current result context.",
        arguments: [
          {
            name: "job",
            description:
              "The job to save (title, company, or ordinal from the current results)",
            required: true,
          },
          {
            name: "reminder",
            description:
              "When to be reminded about the application (e.g. the deadline date)",
            required: false,
          },
        ],
      },
      {
        name: "what_can_foundrole_do",
        title: "What FoundRole can do",
        description:
          "Quick-start overview for a new user: what the FoundRole connector can do and what to try first.",
        arguments: [],
      },
    ],
  },
  resources: {
    resources: [],
  },
  resourceTemplates: {
    resourceTemplates: [
      {
        name: "about",
        title: "About FoundRole",
        uriTemplate: "foundrole://about",
        description:
          "What FoundRole is, the tools it exposes, and how to use them effectively.",
        mimeType: "text/markdown",
      },
      {
        name: "job_alerts_list_ui",
        title: "Job alerts view",
        uriTemplate: "ui://foundrole/job-alerts",
        description:
          "MCP Apps widget that renders the user's job alerts with frequency and unsubscribe controls.",
        mimeType: "text/html;profile=mcp-app",
      },
      {
        name: "job",
        title: "Job posting",
        uriTemplate: "foundrole://job/{id}",
        description:
          "Full detail of a FoundRole job posting as Markdown, addressable by job id.",
        mimeType: "text/markdown",
      },
      {
        name: "jobs_analysis_ui",
        title: "Job analysis and comparison view",
        uriTemplate: "ui://foundrole/jobs-analysis",
        description:
          "MCP Apps widget that renders external-job analysis and side-by-side job comparisons.",
        mimeType: "text/html;profile=mcp-app",
      },
      {
        name: "jobs_details_ui",
        title: "Job details view",
        uriTemplate: "ui://foundrole/jobs-details",
        description:
          "MCP Apps widget that renders a single job detail as a card.",
        mimeType: "text/html;profile=mcp-app",
      },
      {
        name: "jobs_recommendations_ui",
        title: "Job recommendations view",
        uriTemplate: "ui://foundrole/jobs-recommendations",
        description:
          "MCP Apps widget that renders personalized FoundRole recommendations as a card grid.",
        mimeType: "text/html;profile=mcp-app",
      },
      {
        name: "jobs_search_ui",
        title: "Job search results view",
        uriTemplate: "ui://foundrole/jobs-search",
        description:
          "MCP Apps widget that renders job-search results as a card grid.",
        mimeType: "text/html;profile=mcp-app",
      },
      {
        name: "resume_check_ui",
        title: "Resume check view",
        uriTemplate: "ui://foundrole/resume-check",
        description:
          "MCP Apps widget that renders the resume ATS-readability check: band, parsed facts, findings, and the Resume Studio link.",
        mimeType: "text/html;profile=mcp-app",
      },
      {
        name: "tracker_list_ui",
        title: "Tracked jobs view",
        uriTemplate: "ui://foundrole/tracker-list",
        description:
          "MCP Apps widget that renders the user's tracked jobs as a status-grouped list.",
        mimeType: "text/html;profile=mcp-app",
      },
      {
        name: "tracker",
        title: "Tracked applications",
        uriTemplate: "foundrole://tracker",
        description:
          "Snapshot of the authenticated user's tracked job applications as Markdown.",
        mimeType: "text/markdown",
      },
    ],
  },
  tools: {
    tools: [
      {
        name: "job_alert_unsubscribe",
        title: "Unsubscribe from a job alert",
        description:
          'Unsubscribes the authenticated user from job alerts for a specific job search.\n\n**Input:**\n- `job_search_id`: The job search identifier to unsubscribe from (required). Accepts either the job search UUID or the composite job ID returned by `jobs_search` / `jobs_details` (format: "seo_id--job_search_id").\n\n**Output:**\nConfirms the alert has been unsubscribed.\nIdempotent: returns success even when the user was not subscribed or is already unsubscribed.\n',
        inputSchema: {
          type: "object",
          properties: {
            job_search_id: {
              type: "string",
              description:
                'Job search UUID or composite job id ("seo_id--job_search_id") from jobs_search results',
            },
          },
          required: ["job_search_id"],
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
            },
            message: {
              type: "string",
            },
          },
          required: ["success"],
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "Unsubscribe from a job alert",
          readOnlyHint: false,
          destructiveHint: true,
          openWorldHint: false,
        },
      },
      {
        name: "job_alert_subscribe",
        title: "Create a job alert",
        description:
          'Subscribes the authenticated user to job alerts for a specific saved job search.\n\n**Input:**\n- `job_search_id`: The job search identifier to subscribe to (required). Accepts either the job search UUID or the composite job ID returned by `jobs_search` / `jobs_details` (format: "seo_id--job_search_id").\n- `frequency`: Alert frequency — one of daily, weekly, monthly (optional, defaults to "weekly")\n\n**Output:**\nReturns the created or updated job alert with id, status, and frequency.\nIdempotent: calling this tool for an already-subscribed search updates the existing alert without creating a duplicate. An existing active alert with the same query text, location, company and filters, and at least the same radius, is returned instead of a new one, with the requested frequency applied to it.\n\n**Delivery:**\nAll of a user\'s alerts arrive together in one email digest, one section per alert. Each section applies every filter and the sort of its saved search, the same way `jobs_search` does; Pro-only filters apply while the user has Pro. A job appears in the digest once, even when it matches several alerts, and no email is sent when there are no new matches. The digest follows the most frequent alert, and arrives less often when the user has not used FoundRole for a while.\n',
        inputSchema: {
          type: "object",
          properties: {
            job_search_id: {
              type: "string",
              description:
                'Job search UUID or composite job id ("seo_id--job_search_id") from jobs_search results',
            },
            frequency: {
              type: "string",
              description:
                'Alert frequency: daily, weekly, monthly (defaults to "weekly")',
            },
          },
          required: ["job_search_id"],
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            jobAlert: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                jobSearchId: {
                  type: "string",
                },
                status: {
                  type: "string",
                },
                frequency: {
                  type: "string",
                },
                subscriptionSource: {
                  type: "string",
                },
              },
              required: ["id"],
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "Create a job alert",
          readOnlyHint: false,
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
        },
      },
      {
        name: "job_alert_list",
        title: "List job alerts",
        description:
          "Lists the authenticated user's job alerts across all subscription sources (regular, company page, MCP).\n\n**Input:**\n- `status`: Filter by status — one of pending, active, unsubscribed (optional, default: all statuses)\n- `limit`: Number of results to return (default 20, max 50)\n- `offset`: Number of results to skip (default 0)\n\n**Output:**\nReturns the user's job alerts with pagination info and a summary of the underlying job search\n(query, location, company where available). Each response includes a system_instruction\ndescribing how to present the results for the current client.\n",
        inputSchema: {
          type: "object",
          properties: {
            status: {
              type: "string",
              description: "Filter by status: pending, active, unsubscribed",
            },
            limit: {
              type: "integer",
              description: "Number of results to return (default 20, max 50)",
              minimum: 1,
              maximum: 50,
            },
            offset: {
              type: "integer",
              description: "Number of results to skip (default 0)",
              minimum: 0,
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            jobAlerts: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                  },
                  frequency: {
                    type: "string",
                  },
                  subscriptionSource: {
                    type: "string",
                  },
                  lastSentAt: {
                    type: ["string", "null"],
                  },
                  createdAt: {
                    type: "string",
                  },
                  updatedAt: {
                    type: "string",
                  },
                  jobSearch: {
                    type: ["object", "null"],
                  },
                },
                required: ["id"],
              },
            },
            frequencies: {
              type: "array",
              items: {
                type: "string",
              },
            },
            totalCount: {
              type: "integer",
            },
            hasMore: {
              type: "boolean",
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "List job alerts",
          readOnlyHint: true,
          destructiveHint: false,
          openWorldHint: false,
        },
      },
      {
        name: "job_alert_unsubscribe_all",
        title: "Unsubscribe from all job alerts",
        description:
          "Unsubscribes the authenticated user from ALL of their job alerts at once, across every\nsubscription source (regular, company page, MCP).\n\n**Input:**\n- `confirm`: Must be `true` to execute. The call is rejected when omitted or not true — this\n  guards against an unintended bulk unsubscribe.\n\n**Output:**\nConfirms how many alerts were unsubscribed.\nIdempotent: returns success even when the user has no active alerts.\n",
        inputSchema: {
          type: "object",
          properties: {
            confirm: {
              type: "boolean",
              description:
                "Set to true to confirm unsubscribing from every alert; the call is rejected otherwise",
            },
          },
          required: ["confirm"],
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
            },
            message: {
              type: "string",
            },
          },
          required: ["success"],
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "Unsubscribe from all job alerts",
          readOnlyHint: false,
          destructiveHint: true,
          idempotentHint: true,
          openWorldHint: false,
        },
      },
      {
        name: "jobs_analyze_external",
        title: "Analyze a job from another site",
        description:
          "Analyzes one job found outside FoundRole using the authenticated user's FoundRole profile and the same\nsignals used for FoundRole jobs: resume match, missing skills, H-1B sponsorship history, E-Verify,\nghost-job risk, posted compensation, and market salary estimates. Use tracker_add_external only when\nthe user asks to save without analysis.\n\nThe input represents the direct posting URL and all job content already available in the conversation.\nThe five text identity fields are required; every structured fact field is optional, with a fact the\nsource does not state simply omitted (or null). The optional `client_extraction` object carries\nevidence-backed skills, technology, benefits, bonuses, seniority, industry, management, clearance,\nvisa, and remote-scope labels when source excerpts for them exist. FoundRole validates the evidence,\nstores the client extraction separately, derives missing deterministic facts, and reports which\nvalues were provided, derived, accepted, rejected, or remain unknown.\n\nThe output includes `comparisonRef`; retain it exactly for a later jobs_compare call. The analysis is a\ndecision aid, not a guarantee about sponsorship, legitimacy, compensation, or hiring outcome.\n",
        inputSchema: {
          type: "object",
          properties: {
            url: {
              type: "string",
              description:
                "Direct URL of the specific job posting; a company homepage is invalid",
            },
            company_name: {
              type: "string",
              description: "Company name from the posting",
            },
            title_name: {
              type: "string",
              description: "Job title from the posting",
            },
            location_name: {
              type: "string",
              description:
                "Location text from the posting, including Remote when stated",
            },
            description: {
              type: "string",
              description:
                "Complete posting text available in the conversation; a source summary is valid only when no fuller posting text is available",
            },
            posted_at: {
              type: ["string", "null"],
              description:
                "Posting date as ISO 8601, when the source states it",
              format: "date-time",
            },
            salary_min_value: {
              type: ["number", "null"],
              description: "Salary range minimum, when stated",
            },
            salary_max_value: {
              type: ["number", "null"],
              description: "Salary range maximum, when stated",
            },
            salary_value: {
              type: ["number", "null"],
              description:
                "Single salary amount, when the posting gives one figure instead of a range",
            },
            salary_type: {
              type: ["string", "null"],
              description: "Salary period: year, month, week, day, hour",
              enum: [null, "year", "month", "week", "day", "hour"],
            },
            salary_currency: {
              type: ["string", "null"],
              description: "ISO 4217 salary currency code, when stated",
            },
            employment_type: {
              type: ["array", "null"],
              description:
                "Employment types: full_time, part_time, contractor, temporary, intern, volunteer, per_diem, other",
              items: {
                type: "string",
                enum: [
                  "full_time",
                  "part_time",
                  "contractor",
                  "temporary",
                  "intern",
                  "volunteer",
                  "per_diem",
                  "other",
                ],
              },
            },
            work_location_type: {
              type: ["string", "null"],
              description: "Work arrangement: on_site, remote, hybrid",
              enum: [null, "on_site", "remote", "hybrid"],
            },
            education_requirements: {
              type: ["array", "null"],
              description:
                "Education requirements: no_requirements, high_school, associate_degree, bachelor_degree, professional_certificate, postgraduate_degree",
              items: {
                type: "string",
                enum: [
                  "no_requirements",
                  "high_school",
                  "associate_degree",
                  "bachelor_degree",
                  "professional_certificate",
                  "postgraduate_degree",
                ],
              },
            },
            experience_months: {
              type: ["integer", "null"],
              description: "Minimum required experience in months, when stated",
            },
            client_extraction: {
              type: ["object", "null"],
              description:
                "Evidence-backed facts extracted by the client model from the posting; non-null evidence is a short source excerpt rather than an inference. Fields absent from the source are omitted or null.",
              properties: {
                skills: {
                  type: ["array", "null"],
                  maxItems: 50,
                  items: {
                    type: "object",
                    properties: {
                      value: {
                        type: "string",
                        minLength: 1,
                        maxLength: 255,
                      },
                      evidence: {
                        type: "string",
                        minLength: 8,
                        maxLength: 500,
                      },
                      importance: {
                        type: "string",
                        enum: ["required", "preferred", "mentioned"],
                      },
                    },
                    required: ["value", "evidence", "importance"],
                    additionalProperties: false,
                  },
                },
                tech_stack: {
                  type: ["array", "null"],
                  maxItems: 30,
                  items: {
                    type: "object",
                    properties: {
                      value: {
                        type: "string",
                        minLength: 1,
                        maxLength: 255,
                      },
                      evidence: {
                        type: "string",
                        minLength: 8,
                        maxLength: 500,
                      },
                    },
                    required: ["value", "evidence"],
                    additionalProperties: false,
                  },
                },
                benefits: {
                  type: ["array", "null"],
                  maxItems: 30,
                  items: {
                    type: "object",
                    properties: {
                      value: {
                        type: "string",
                        minLength: 1,
                        maxLength: 255,
                      },
                      evidence: {
                        type: "string",
                        minLength: 8,
                        maxLength: 500,
                      },
                    },
                    required: ["value", "evidence"],
                    additionalProperties: false,
                  },
                },
                bonuses: {
                  type: ["array", "null"],
                  maxItems: 20,
                  items: {
                    type: "object",
                    properties: {
                      value: {
                        type: "string",
                        minLength: 1,
                        maxLength: 255,
                      },
                      evidence: {
                        type: "string",
                        minLength: 8,
                        maxLength: 500,
                      },
                    },
                    required: ["value", "evidence"],
                    additionalProperties: false,
                  },
                },
                seniority: {
                  type: ["object", "null"],
                  properties: {
                    value: {
                      type: "string",
                      minLength: 1,
                      maxLength: 255,
                    },
                    evidence: {
                      type: "string",
                      minLength: 8,
                      maxLength: 500,
                    },
                  },
                  required: ["value", "evidence"],
                  additionalProperties: false,
                },
                industry: {
                  type: ["object", "null"],
                  properties: {
                    value: {
                      type: "string",
                      minLength: 1,
                      maxLength: 255,
                    },
                    evidence: {
                      type: "string",
                      minLength: 8,
                      maxLength: 500,
                    },
                  },
                  required: ["value", "evidence"],
                  additionalProperties: false,
                },
                management: {
                  type: ["object", "null"],
                  properties: {
                    value: {
                      type: "boolean",
                    },
                    evidence: {
                      type: "string",
                      minLength: 8,
                      maxLength: 500,
                    },
                  },
                  required: ["value", "evidence"],
                  additionalProperties: false,
                },
                security_clearance: {
                  type: ["object", "null"],
                  properties: {
                    value: {
                      type: "boolean",
                    },
                    evidence: {
                      type: "string",
                      minLength: 8,
                      maxLength: 500,
                    },
                  },
                  required: ["value", "evidence"],
                  additionalProperties: false,
                },
                visa_sponsorship: {
                  type: ["object", "null"],
                  properties: {
                    value: {
                      type: "string",
                      enum: ["offered", "not_offered", "conditional"],
                    },
                    evidence: {
                      type: "string",
                      minLength: 8,
                      maxLength: 500,
                    },
                  },
                  required: ["value", "evidence"],
                  additionalProperties: false,
                },
                remote_scope: {
                  type: ["object", "null"],
                  properties: {
                    value: {
                      type: "string",
                      minLength: 1,
                      maxLength: 255,
                    },
                    evidence: {
                      type: "string",
                      minLength: 8,
                      maxLength: 500,
                    },
                  },
                  required: ["value", "evidence"],
                  additionalProperties: false,
                },
              },
              additionalProperties: false,
            },
          },
          required: [
            "url",
            "company_name",
            "title_name",
            "location_name",
            "description",
          ],
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            mode: {
              type: "string",
              enum: ["analysis"],
            },
            jobs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  title: {
                    type: ["string", "null"],
                  },
                  companyName: {
                    type: ["string", "null"],
                  },
                  location: {
                    type: ["string", "null"],
                  },
                  salary: {
                    type: ["string", "null"],
                  },
                  url: {
                    type: ["string", "null"],
                  },
                  logoUrl: {
                    type: ["string", "null"],
                  },
                  link: {
                    type: ["string", "null"],
                  },
                  description: {
                    type: ["string", "null"],
                  },
                  skills: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  benefits: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  bonuses: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  requirements: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  employmentType: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  workLocationType: {
                    type: ["string", "null"],
                  },
                  estimatedSalary: {
                    type: ["object", "null"],
                    properties: {
                      median: {
                        type: ["number", "null"],
                      },
                      p25: {
                        type: ["number", "null"],
                      },
                      p75: {
                        type: ["number", "null"],
                      },
                      min: {
                        type: ["number", "null"],
                      },
                      max: {
                        type: ["number", "null"],
                      },
                      currency: {
                        type: ["string", "null"],
                      },
                      sampleSize: {
                        type: ["integer", "null"],
                      },
                      updatedAt: {
                        type: ["string", "null"],
                      },
                    },
                  },
                  salaryBand: {
                    type: ["object", "null"],
                    properties: {
                      min: {
                        type: "number",
                      },
                      max: {
                        type: "number",
                      },
                    },
                  },
                  companyRating: {
                    type: ["number", "null"],
                  },
                  companySize: {
                    type: ["string", "null"],
                  },
                  companyWebsite: {
                    type: ["string", "null"],
                  },
                  category: {
                    type: ["string", "null"],
                  },
                  subcategory: {
                    type: ["string", "null"],
                  },
                  postedAt: {
                    type: ["string", "null"],
                  },
                  insights: {
                    type: ["object", "null"],
                    properties: {
                      match: {
                        type: ["object", "null"],
                        properties: {
                          score: {
                            type: ["integer", "null"],
                          },
                          grade: {
                            type: ["string", "null"],
                          },
                          gradeConfidence: {
                            type: ["string", "null"],
                          },
                          gradeReasons: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                code: {
                                  type: "string",
                                },
                                severity: {
                                  type: "string",
                                },
                                params: {
                                  type: ["object", "null"],
                                },
                              },
                            },
                          },
                          insufficientData: {
                            type: "boolean",
                          },
                          matchedCount: {
                            type: "integer",
                          },
                          missingRequired: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          missingRequiredTotal: {
                            type: "integer",
                          },
                          requiredTotal: {
                            type: "integer",
                          },
                          matchedRequiredCount: {
                            type: "integer",
                          },
                          missingNice: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          missingNiceTotal: {
                            type: "integer",
                          },
                          seniorityMatch: {
                            type: ["string", "null"],
                          },
                          breakdown: {
                            type: ["object", "null"],
                            properties: {
                              skillScore: {
                                type: ["number", "null"],
                              },
                              seniorityMultiplier: {
                                type: ["number", "null"],
                              },
                              userRank: {
                                type: ["integer", "null"],
                              },
                              jobRank: {
                                type: ["integer", "null"],
                              },
                              userTrack: {
                                type: ["string", "null"],
                              },
                              jobTrack: {
                                type: ["string", "null"],
                              },
                              scoredSkillCount: {
                                type: ["integer", "null"],
                              },
                              weightedDenominator: {
                                type: ["number", "null"],
                              },
                              alignmentKind: {
                                type: ["string", "null"],
                              },
                              alignmentMultiplier: {
                                type: ["number", "null"],
                              },
                              jobCareerProfileId: {
                                type: ["integer", "null"],
                              },
                              jobCareerSpecializationId: {
                                type: ["integer", "null"],
                              },
                            },
                          },
                        },
                      },
                      h1bSponsor: {
                        type: ["boolean", "null"],
                      },
                      h1bPetitions: {
                        type: ["object", "null"],
                        properties: {
                          count: {
                            type: ["integer", "null"],
                          },
                          workers: {
                            type: ["integer", "null"],
                          },
                          fiscalPeriod: {
                            type: ["string", "null"],
                          },
                        },
                      },
                      eVerify: {
                        type: ["boolean", "null"],
                      },
                      ghostScore: {
                        type: ["object", "null"],
                        properties: {
                          grade: {
                            type: ["string", "null"],
                          },
                          confidence: {
                            type: ["string", "null"],
                          },
                          reasons: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                code: {
                                  type: "string",
                                },
                                severity: {
                                  type: "string",
                                },
                                params: {
                                  type: ["object", "null"],
                                },
                              },
                            },
                          },
                        },
                      },
                      h1bHistory: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            fiscalPeriod: {
                              type: "string",
                            },
                            petitions: {
                              type: "integer",
                            },
                            workers: {
                              type: "integer",
                            },
                          },
                        },
                      },
                    },
                  },
                  source: {
                    type: "string",
                    enum: ["external", "foundrole"],
                  },
                  comparisonRef: {
                    type: "string",
                  },
                  trackerInput: {
                    type: ["object", "null"],
                    properties: {
                      url: {
                        type: "string",
                      },
                      company_name: {
                        type: "string",
                      },
                      title_name: {
                        type: "string",
                      },
                      location_name: {
                        type: "string",
                      },
                      description: {
                        type: "string",
                      },
                      posted_at: {
                        type: ["string", "null"],
                      },
                      salary_min_value: {
                        type: ["number", "null"],
                      },
                      salary_max_value: {
                        type: ["number", "null"],
                      },
                      salary_value: {
                        type: ["number", "null"],
                      },
                      salary_type: {
                        type: ["string", "null"],
                      },
                      salary_currency: {
                        type: ["string", "null"],
                      },
                      employment_type: {
                        type: ["array", "null"],
                        items: {
                          type: "string",
                        },
                      },
                      work_location_type: {
                        type: ["string", "null"],
                      },
                      education_requirements: {
                        type: ["array", "null"],
                        items: {
                          type: "string",
                        },
                      },
                      experience_months: {
                        type: ["integer", "null"],
                      },
                      client_extraction: {
                        type: "object",
                        properties: {
                          skills: {
                            type: ["array", "null"],
                            maxItems: 50,
                            items: {
                              type: "object",
                              properties: {
                                value: {
                                  type: "string",
                                  minLength: 1,
                                  maxLength: 255,
                                },
                                evidence: {
                                  type: "string",
                                  minLength: 8,
                                  maxLength: 500,
                                },
                                importance: {
                                  type: "string",
                                  enum: ["required", "preferred", "mentioned"],
                                },
                              },
                              required: ["value", "evidence", "importance"],
                              additionalProperties: false,
                            },
                          },
                          tech_stack: {
                            type: ["array", "null"],
                            maxItems: 30,
                            items: {
                              type: "object",
                              properties: {
                                value: {
                                  type: "string",
                                  minLength: 1,
                                  maxLength: 255,
                                },
                                evidence: {
                                  type: "string",
                                  minLength: 8,
                                  maxLength: 500,
                                },
                              },
                              required: ["value", "evidence"],
                              additionalProperties: false,
                            },
                          },
                          benefits: {
                            type: ["array", "null"],
                            maxItems: 30,
                            items: {
                              type: "object",
                              properties: {
                                value: {
                                  type: "string",
                                  minLength: 1,
                                  maxLength: 255,
                                },
                                evidence: {
                                  type: "string",
                                  minLength: 8,
                                  maxLength: 500,
                                },
                              },
                              required: ["value", "evidence"],
                              additionalProperties: false,
                            },
                          },
                          bonuses: {
                            type: ["array", "null"],
                            maxItems: 20,
                            items: {
                              type: "object",
                              properties: {
                                value: {
                                  type: "string",
                                  minLength: 1,
                                  maxLength: 255,
                                },
                                evidence: {
                                  type: "string",
                                  minLength: 8,
                                  maxLength: 500,
                                },
                              },
                              required: ["value", "evidence"],
                              additionalProperties: false,
                            },
                          },
                          seniority: {
                            type: ["object", "null"],
                            properties: {
                              value: {
                                type: "string",
                                minLength: 1,
                                maxLength: 255,
                              },
                              evidence: {
                                type: "string",
                                minLength: 8,
                                maxLength: 500,
                              },
                            },
                            required: ["value", "evidence"],
                            additionalProperties: false,
                          },
                          industry: {
                            type: ["object", "null"],
                            properties: {
                              value: {
                                type: "string",
                                minLength: 1,
                                maxLength: 255,
                              },
                              evidence: {
                                type: "string",
                                minLength: 8,
                                maxLength: 500,
                              },
                            },
                            required: ["value", "evidence"],
                            additionalProperties: false,
                          },
                          management: {
                            type: ["object", "null"],
                            properties: {
                              value: {
                                type: "boolean",
                              },
                              evidence: {
                                type: "string",
                                minLength: 8,
                                maxLength: 500,
                              },
                            },
                            required: ["value", "evidence"],
                            additionalProperties: false,
                          },
                          security_clearance: {
                            type: ["object", "null"],
                            properties: {
                              value: {
                                type: "boolean",
                              },
                              evidence: {
                                type: "string",
                                minLength: 8,
                                maxLength: 500,
                              },
                            },
                            required: ["value", "evidence"],
                            additionalProperties: false,
                          },
                          visa_sponsorship: {
                            type: ["object", "null"],
                            properties: {
                              value: {
                                type: "string",
                                enum: ["offered", "not_offered", "conditional"],
                              },
                              evidence: {
                                type: "string",
                                minLength: 8,
                                maxLength: 500,
                              },
                            },
                            required: ["value", "evidence"],
                            additionalProperties: false,
                          },
                          remote_scope: {
                            type: ["object", "null"],
                            properties: {
                              value: {
                                type: "string",
                                minLength: 1,
                                maxLength: 255,
                              },
                              evidence: {
                                type: "string",
                                minLength: 8,
                                maxLength: 500,
                              },
                            },
                            required: ["value", "evidence"],
                            additionalProperties: false,
                          },
                        },
                      },
                    },
                  },
                  trackedJob: {
                    type: ["object", "null"],
                  },
                },
                required: ["id", "source", "comparisonRef"],
              },
            },
            providedFields: {
              type: "array",
              items: {
                type: "string",
              },
            },
            derivedFields: {
              type: "array",
              items: {
                type: "string",
              },
            },
            unknownFields: {
              type: "array",
              items: {
                type: "string",
              },
            },
            clientExtraction: {
              type: ["object", "null"],
              properties: {
                recordId: {
                  type: "string",
                },
                schemaVersion: {
                  type: "integer",
                },
                acceptedFields: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                rejectedFields: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
            },
            statusOrder: {
              type: "array",
              items: {
                type: "string",
              },
            },
            trackerWebUrl: {
              type: "string",
            },
            studioUrl: {
              type: ["string", "null"],
            },
            system_instruction: {
              type: ["string", "null"],
            },
          },
          required: [
            "mode",
            "jobs",
            "providedFields",
            "derivedFields",
            "unknownFields",
            "clientExtraction",
            "statusOrder",
            "trackerWebUrl",
          ],
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "Analyze a job from another site",
          readOnlyHint: false,
          destructiveHint: false,
          openWorldHint: false,
        },
      },
      {
        name: "jobs_compare",
        title: "Compare jobs",
        description:
          "Compares 2 to 4 jobs side by side using the same FoundRole analysis fields: resume match, missing skills,\nH-1B and E-Verify signals, ghost-job risk, posted pay, and market salary estimates.\n\n`comparison_refs` accepts exact FoundRole job IDs returned by jobs_search and exact external\n`comparisonRef` URLs returned by jobs_analyze_external. Analyze each outside job first; a bare URL that\nhas not been analyzed cannot be compared because FoundRole does not have its posting facts. Preserve\nevery reference exactly, keep the user's requested order, and do not send duplicates.\n",
        inputSchema: {
          type: "object",
          properties: {
            comparison_refs: {
              type: "array",
              description:
                "Two to four exact FoundRole job IDs or external comparisonRef URLs",
              minItems: 2,
              maxItems: 4,
              items: {
                type: "string",
              },
            },
          },
          required: ["comparison_refs"],
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            mode: {
              type: "string",
              enum: ["comparison"],
            },
            jobs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  title: {
                    type: ["string", "null"],
                  },
                  companyName: {
                    type: ["string", "null"],
                  },
                  location: {
                    type: ["string", "null"],
                  },
                  salary: {
                    type: ["string", "null"],
                  },
                  url: {
                    type: ["string", "null"],
                  },
                  logoUrl: {
                    type: ["string", "null"],
                  },
                  link: {
                    type: ["string", "null"],
                  },
                  description: {
                    type: ["string", "null"],
                  },
                  skills: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  benefits: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  bonuses: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  requirements: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  employmentType: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  workLocationType: {
                    type: ["string", "null"],
                  },
                  estimatedSalary: {
                    type: ["object", "null"],
                    properties: {
                      median: {
                        type: ["number", "null"],
                      },
                      p25: {
                        type: ["number", "null"],
                      },
                      p75: {
                        type: ["number", "null"],
                      },
                      min: {
                        type: ["number", "null"],
                      },
                      max: {
                        type: ["number", "null"],
                      },
                      currency: {
                        type: ["string", "null"],
                      },
                      sampleSize: {
                        type: ["integer", "null"],
                      },
                      updatedAt: {
                        type: ["string", "null"],
                      },
                    },
                  },
                  salaryBand: {
                    type: ["object", "null"],
                    properties: {
                      min: {
                        type: "number",
                      },
                      max: {
                        type: "number",
                      },
                    },
                  },
                  companyRating: {
                    type: ["number", "null"],
                  },
                  companySize: {
                    type: ["string", "null"],
                  },
                  companyWebsite: {
                    type: ["string", "null"],
                  },
                  category: {
                    type: ["string", "null"],
                  },
                  subcategory: {
                    type: ["string", "null"],
                  },
                  postedAt: {
                    type: ["string", "null"],
                  },
                  insights: {
                    type: ["object", "null"],
                    properties: {
                      match: {
                        type: ["object", "null"],
                        properties: {
                          score: {
                            type: ["integer", "null"],
                          },
                          grade: {
                            type: ["string", "null"],
                          },
                          gradeConfidence: {
                            type: ["string", "null"],
                          },
                          gradeReasons: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                code: {
                                  type: "string",
                                },
                                severity: {
                                  type: "string",
                                },
                                params: {
                                  type: ["object", "null"],
                                },
                              },
                            },
                          },
                          insufficientData: {
                            type: "boolean",
                          },
                          matchedCount: {
                            type: "integer",
                          },
                          missingRequired: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          missingRequiredTotal: {
                            type: "integer",
                          },
                          requiredTotal: {
                            type: "integer",
                          },
                          matchedRequiredCount: {
                            type: "integer",
                          },
                          missingNice: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          missingNiceTotal: {
                            type: "integer",
                          },
                          seniorityMatch: {
                            type: ["string", "null"],
                          },
                          breakdown: {
                            type: ["object", "null"],
                            properties: {
                              skillScore: {
                                type: ["number", "null"],
                              },
                              seniorityMultiplier: {
                                type: ["number", "null"],
                              },
                              userRank: {
                                type: ["integer", "null"],
                              },
                              jobRank: {
                                type: ["integer", "null"],
                              },
                              userTrack: {
                                type: ["string", "null"],
                              },
                              jobTrack: {
                                type: ["string", "null"],
                              },
                              scoredSkillCount: {
                                type: ["integer", "null"],
                              },
                              weightedDenominator: {
                                type: ["number", "null"],
                              },
                              alignmentKind: {
                                type: ["string", "null"],
                              },
                              alignmentMultiplier: {
                                type: ["number", "null"],
                              },
                              jobCareerProfileId: {
                                type: ["integer", "null"],
                              },
                              jobCareerSpecializationId: {
                                type: ["integer", "null"],
                              },
                            },
                          },
                        },
                      },
                      h1bSponsor: {
                        type: ["boolean", "null"],
                      },
                      h1bPetitions: {
                        type: ["object", "null"],
                        properties: {
                          count: {
                            type: ["integer", "null"],
                          },
                          workers: {
                            type: ["integer", "null"],
                          },
                          fiscalPeriod: {
                            type: ["string", "null"],
                          },
                        },
                      },
                      eVerify: {
                        type: ["boolean", "null"],
                      },
                      ghostScore: {
                        type: ["object", "null"],
                        properties: {
                          grade: {
                            type: ["string", "null"],
                          },
                          confidence: {
                            type: ["string", "null"],
                          },
                          reasons: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                code: {
                                  type: "string",
                                },
                                severity: {
                                  type: "string",
                                },
                                params: {
                                  type: ["object", "null"],
                                },
                              },
                            },
                          },
                        },
                      },
                      h1bHistory: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            fiscalPeriod: {
                              type: "string",
                            },
                            petitions: {
                              type: "integer",
                            },
                            workers: {
                              type: "integer",
                            },
                          },
                        },
                      },
                    },
                  },
                  source: {
                    type: "string",
                    enum: ["external", "foundrole"],
                  },
                  comparisonRef: {
                    type: "string",
                  },
                  trackerInput: {
                    type: ["object", "null"],
                    properties: {
                      url: {
                        type: "string",
                      },
                      company_name: {
                        type: "string",
                      },
                      title_name: {
                        type: "string",
                      },
                      location_name: {
                        type: "string",
                      },
                      description: {
                        type: "string",
                      },
                      posted_at: {
                        type: ["string", "null"],
                      },
                      salary_min_value: {
                        type: ["number", "null"],
                      },
                      salary_max_value: {
                        type: ["number", "null"],
                      },
                      salary_value: {
                        type: ["number", "null"],
                      },
                      salary_type: {
                        type: ["string", "null"],
                      },
                      salary_currency: {
                        type: ["string", "null"],
                      },
                      employment_type: {
                        type: ["array", "null"],
                        items: {
                          type: "string",
                        },
                      },
                      work_location_type: {
                        type: ["string", "null"],
                      },
                      education_requirements: {
                        type: ["array", "null"],
                        items: {
                          type: "string",
                        },
                      },
                      experience_months: {
                        type: ["integer", "null"],
                      },
                      client_extraction: {
                        type: "object",
                        properties: {
                          skills: {
                            type: ["array", "null"],
                            maxItems: 50,
                            items: {
                              type: "object",
                              properties: {
                                value: {
                                  type: "string",
                                  minLength: 1,
                                  maxLength: 255,
                                },
                                evidence: {
                                  type: "string",
                                  minLength: 8,
                                  maxLength: 500,
                                },
                                importance: {
                                  type: "string",
                                  enum: ["required", "preferred", "mentioned"],
                                },
                              },
                              required: ["value", "evidence", "importance"],
                              additionalProperties: false,
                            },
                          },
                          tech_stack: {
                            type: ["array", "null"],
                            maxItems: 30,
                            items: {
                              type: "object",
                              properties: {
                                value: {
                                  type: "string",
                                  minLength: 1,
                                  maxLength: 255,
                                },
                                evidence: {
                                  type: "string",
                                  minLength: 8,
                                  maxLength: 500,
                                },
                              },
                              required: ["value", "evidence"],
                              additionalProperties: false,
                            },
                          },
                          benefits: {
                            type: ["array", "null"],
                            maxItems: 30,
                            items: {
                              type: "object",
                              properties: {
                                value: {
                                  type: "string",
                                  minLength: 1,
                                  maxLength: 255,
                                },
                                evidence: {
                                  type: "string",
                                  minLength: 8,
                                  maxLength: 500,
                                },
                              },
                              required: ["value", "evidence"],
                              additionalProperties: false,
                            },
                          },
                          bonuses: {
                            type: ["array", "null"],
                            maxItems: 20,
                            items: {
                              type: "object",
                              properties: {
                                value: {
                                  type: "string",
                                  minLength: 1,
                                  maxLength: 255,
                                },
                                evidence: {
                                  type: "string",
                                  minLength: 8,
                                  maxLength: 500,
                                },
                              },
                              required: ["value", "evidence"],
                              additionalProperties: false,
                            },
                          },
                          seniority: {
                            type: ["object", "null"],
                            properties: {
                              value: {
                                type: "string",
                                minLength: 1,
                                maxLength: 255,
                              },
                              evidence: {
                                type: "string",
                                minLength: 8,
                                maxLength: 500,
                              },
                            },
                            required: ["value", "evidence"],
                            additionalProperties: false,
                          },
                          industry: {
                            type: ["object", "null"],
                            properties: {
                              value: {
                                type: "string",
                                minLength: 1,
                                maxLength: 255,
                              },
                              evidence: {
                                type: "string",
                                minLength: 8,
                                maxLength: 500,
                              },
                            },
                            required: ["value", "evidence"],
                            additionalProperties: false,
                          },
                          management: {
                            type: ["object", "null"],
                            properties: {
                              value: {
                                type: "boolean",
                              },
                              evidence: {
                                type: "string",
                                minLength: 8,
                                maxLength: 500,
                              },
                            },
                            required: ["value", "evidence"],
                            additionalProperties: false,
                          },
                          security_clearance: {
                            type: ["object", "null"],
                            properties: {
                              value: {
                                type: "boolean",
                              },
                              evidence: {
                                type: "string",
                                minLength: 8,
                                maxLength: 500,
                              },
                            },
                            required: ["value", "evidence"],
                            additionalProperties: false,
                          },
                          visa_sponsorship: {
                            type: ["object", "null"],
                            properties: {
                              value: {
                                type: "string",
                                enum: ["offered", "not_offered", "conditional"],
                              },
                              evidence: {
                                type: "string",
                                minLength: 8,
                                maxLength: 500,
                              },
                            },
                            required: ["value", "evidence"],
                            additionalProperties: false,
                          },
                          remote_scope: {
                            type: ["object", "null"],
                            properties: {
                              value: {
                                type: "string",
                                minLength: 1,
                                maxLength: 255,
                              },
                              evidence: {
                                type: "string",
                                minLength: 8,
                                maxLength: 500,
                              },
                            },
                            required: ["value", "evidence"],
                            additionalProperties: false,
                          },
                        },
                      },
                    },
                  },
                  trackedJob: {
                    type: ["object", "null"],
                  },
                },
                required: ["id", "source", "comparisonRef"],
              },
            },
            statusOrder: {
              type: "array",
              items: {
                type: "string",
              },
            },
            trackerWebUrl: {
              type: "string",
            },
            studioUrl: {
              type: ["string", "null"],
            },
            system_instruction: {
              type: ["string", "null"],
            },
          },
          required: ["mode", "jobs", "statusOrder", "trackerWebUrl"],
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "Compare jobs",
          readOnlyHint: true,
          destructiveHint: false,
          openWorldHint: false,
        },
      },
      {
        name: "jobs_details",
        title: "Get job details",
        description:
          "Fetches full details for one job by the `id` returned from jobs_search — the deeper view behind a search result.\n\n**Input:**\n- `job_id`: The exact ID string from the `id` field of a `jobs_search` result.\n- `result_item_id`: The matching occurrence ID from that result's `resultItemId` field, when available.\n\n**Output:**\nComplete job details: description, skills, benefits, requirements, salary benchmark, resume match,\nH-1B and E-Verify signals, job-trust analysis, and application link. A posting that passed the\nfully-remote check carries `remoteCheck`: the posting lines that make the role remote and where\nthe employee may work from, or an unknown scope when the posting does not say. Personalized and extended\ninsight fields follow the authenticated user's current entitlements.\n",
        inputSchema: {
          type: "object",
          properties: {
            job_id: {
              type: "string",
              description:
                "The unique identifier of the job from jobs_search results",
            },
            result_item_id: {
              type: "string",
              description:
                "The result occurrence ID returned with the selected job",
            },
          },
          required: ["job_id"],
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            job: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                resultItemId: {
                  type: ["string", "null"],
                },
                title: {
                  type: ["string", "null"],
                },
                companyName: {
                  type: ["string", "null"],
                },
                location: {
                  type: ["string", "null"],
                },
                salary: {
                  type: ["string", "null"],
                },
                url: {
                  type: ["string", "null"],
                },
                logoUrl: {
                  type: ["string", "null"],
                },
                link: {
                  type: ["string", "null"],
                },
                description: {
                  type: ["string", "null"],
                },
                skills: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                benefits: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                bonuses: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                requirements: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                employmentType: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                workLocationType: {
                  type: ["string", "null"],
                },
                companyRating: {
                  type: ["number", "null"],
                },
                companySize: {
                  type: ["string", "null"],
                },
                companyWebsite: {
                  type: ["string", "null"],
                },
                category: {
                  type: ["string", "null"],
                },
                subcategory: {
                  type: ["string", "null"],
                },
                postedAt: {
                  type: ["string", "null"],
                },
                estimatedSalary: {
                  type: ["object", "null"],
                  properties: {
                    median: {
                      type: ["number", "null"],
                    },
                    p25: {
                      type: ["number", "null"],
                    },
                    p75: {
                      type: ["number", "null"],
                    },
                    min: {
                      type: ["number", "null"],
                    },
                    max: {
                      type: ["number", "null"],
                    },
                    currency: {
                      type: ["string", "null"],
                    },
                    sampleSize: {
                      type: ["integer", "null"],
                    },
                    updatedAt: {
                      type: ["string", "null"],
                    },
                  },
                },
                salaryBand: {
                  type: ["object", "null"],
                  properties: {
                    min: {
                      type: "number",
                    },
                    max: {
                      type: "number",
                    },
                  },
                },
                insights: {
                  type: ["object", "null"],
                  properties: {
                    match: {
                      type: ["object", "null"],
                      properties: {
                        score: {
                          type: ["integer", "null"],
                        },
                        grade: {
                          type: ["string", "null"],
                        },
                        gradeConfidence: {
                          type: ["string", "null"],
                        },
                        gradeReasons: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              code: {
                                type: "string",
                              },
                              severity: {
                                type: "string",
                              },
                              params: {
                                type: ["object", "null"],
                              },
                            },
                          },
                        },
                        insufficientData: {
                          type: "boolean",
                        },
                        matchedCount: {
                          type: "integer",
                        },
                        missingRequired: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        missingRequiredTotal: {
                          type: "integer",
                        },
                        requiredTotal: {
                          type: "integer",
                        },
                        matchedRequiredCount: {
                          type: "integer",
                        },
                        missingNice: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        missingNiceTotal: {
                          type: "integer",
                        },
                        seniorityMatch: {
                          type: ["string", "null"],
                        },
                        breakdown: {
                          type: ["object", "null"],
                          properties: {
                            skillScore: {
                              type: ["number", "null"],
                            },
                            seniorityMultiplier: {
                              type: ["number", "null"],
                            },
                            userRank: {
                              type: ["integer", "null"],
                            },
                            jobRank: {
                              type: ["integer", "null"],
                            },
                            userTrack: {
                              type: ["string", "null"],
                            },
                            jobTrack: {
                              type: ["string", "null"],
                            },
                            scoredSkillCount: {
                              type: ["integer", "null"],
                            },
                            weightedDenominator: {
                              type: ["number", "null"],
                            },
                            alignmentKind: {
                              type: ["string", "null"],
                            },
                            alignmentMultiplier: {
                              type: ["number", "null"],
                            },
                            jobCareerProfileId: {
                              type: ["integer", "null"],
                            },
                            jobCareerSpecializationId: {
                              type: ["integer", "null"],
                            },
                          },
                        },
                      },
                    },
                    h1bSponsor: {
                      type: ["boolean", "null"],
                    },
                    h1bPetitions: {
                      type: ["object", "null"],
                      properties: {
                        count: {
                          type: ["integer", "null"],
                        },
                        workers: {
                          type: ["integer", "null"],
                        },
                        fiscalPeriod: {
                          type: ["string", "null"],
                        },
                      },
                    },
                    eVerify: {
                      type: ["boolean", "null"],
                    },
                    ghostScore: {
                      type: ["object", "null"],
                      properties: {
                        grade: {
                          type: ["string", "null"],
                        },
                        confidence: {
                          type: ["string", "null"],
                        },
                        reasons: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              code: {
                                type: "string",
                              },
                              severity: {
                                type: "string",
                              },
                              params: {
                                type: ["object", "null"],
                              },
                            },
                          },
                        },
                      },
                    },
                    h1bHistory: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          fiscalPeriod: {
                            type: "string",
                          },
                          petitions: {
                            type: "integer",
                          },
                          workers: {
                            type: "integer",
                          },
                        },
                      },
                    },
                  },
                },
                remoteCheck: {
                  type: ["object", "null"],
                  properties: {
                    quotes: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          source: {
                            type: "string",
                          },
                          text: {
                            type: ["string", "null"],
                          },
                        },
                      },
                    },
                    workFrom: {
                      type: "object",
                      properties: {
                        scope: {
                          type: "string",
                        },
                        allowedPlaces: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        excludedPlaces: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        quotes: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              source: {
                                type: "string",
                              },
                              text: {
                                type: ["string", "null"],
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              required: ["id"],
            },
            trackedJob: {
              type: ["object", "null"],
            },
            statusOrder: {
              type: "array",
              items: {
                type: "string",
              },
            },
            trackerWebUrl: {
              type: "string",
            },
            studioUrl: {
              type: ["string", "null"],
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "Get job details",
          readOnlyHint: false,
          destructiveHint: false,
          openWorldHint: false,
        },
      },
      {
        name: "jobs_recommendations",
        title: "Recommend jobs for my profile",
        description:
          "Returns the authenticated user's personalized job recommendations built from their resume, skills,\ntarget roles, and preferred location. Results are ranked by fit, may include related roles, and carry\nthe same salary, match, H-1B, and job-trust insight payload used by job search. The search filters\nand sort parameters apply to this personalized feed too. Advanced parameters return a matching\npreview and hidden count for free accounts; Pro accounts receive the complete filtered list.\nAn explicit query for a different or unrecognized profession uses the same general job search as\njobs_search, preserving the query and filters instead of substituting the profile's target roles.\n\nA processing status means the personalized feed is still being prepared; a later call returns the\ncompleted feed. Page numbers fetch additional recommendations from the same feed.\n",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description:
                'The full job title or skill (e.g., "Ruby Developer", NOT just "Ruby")',
            },
            location: {
              type: "string",
              description: "Geographic location (e.g., 'Boston, MA')",
            },
            company: {
              type: "string",
              description: "The official company name",
            },
            radius: {
              type: "integer",
              description:
                "Search radius in miles around a city location (default 40); not used for state, country or remote searches.",
              minimum: 5,
              maximum: 100,
            },
            sort: {
              type: "string",
              description:
                "Result order (score, posted_at, match, salary): score is relevance and the default, posted_at is newest first, salary is highest pay first, match is best personal fit first and needs a resume. Ordering by salary or match is an advanced option.",
              enum: ["score", "posted_at", "match", "salary"],
            },
            posted_days_ago: {
              type: "integer",
              description: "Number of days ago to search for jobs (1-365)",
              minimum: 1,
              maximum: 365,
            },
            min_match: {
              type: "string",
              description:
                "Advanced filter: lowest personal FoundRole match grade to keep, the same letter each job shows in insights.match.grade. A and A- are rare even for a strong resume; B keeps good and strong matches; C+ also keeps fair ones. Needs a resume on the account.",
              enum: ["A", "A-", "B+", "B", "B-", "C+", "C"],
            },
            h1b_sponsors_only: {
              type: "boolean",
              description:
                "Advanced filter: only companies known to sponsor H1B visas.",
            },
            hide_low_quality: {
              type: "boolean",
              description:
                "Advanced filter: hides postings with a risky ghost grade (D/F); ungraded postings stay.",
            },
            salary_floor: {
              type: "integer",
              description:
                "Advanced filter: minimum annualized salary in USD; a posting qualifies when the lower bound of its pay band reaches the floor. Jobs without a USD salary are dropped.",
              minimum: 0,
            },
            remote: {
              type: "boolean",
              description:
                "Advanced filter: only remote-eligible jobs, matched across the whole country of the requested location rather than its radius.",
            },
            strict_remote: {
              type: "boolean",
              description:
                "Advanced filter: only postings checked as fully remote that can be worked from the requested location: the posting names that area, allows anywhere, or does not say where. Stricter than remote; work_modes other than remote do not apply with it.",
            },
            confirmed_work_from: {
              type: "boolean",
              description:
                "Advanced filter: with strict_remote, also leaves out postings that do not say where the work can be done from.",
            },
            hiring_brand: {
              type: "string",
              description:
                'Filter: one brand inside the company, for example company "Google" with hiring_brand "YouTube"; used only together with company.',
            },
            employment_types: {
              type: "array",
              description:
                "Filter: jobs offered as any of these employment types (full_time, part_time, contractor, temporary, intern, volunteer, per_diem, other).",
              items: {
                type: "string",
                enum: [
                  "full_time",
                  "part_time",
                  "contractor",
                  "temporary",
                  "intern",
                  "volunteer",
                  "per_diem",
                  "other",
                ],
              },
            },
            work_modes: {
              type: "array",
              description:
                'Advanced filter: jobs in any of these work modes (on_site, remote, hybrid). remote is matched across the whole country of the location, the others within the radius. ["remote"] is the same search as remote: true.',
              items: {
                type: "string",
                enum: ["on_site", "remote", "hybrid"],
              },
            },
            education: {
              type: "array",
              description:
                "Filter: jobs whose posting requires one of these education levels (no_requirements, high_school, associate_degree, bachelor_degree, professional_certificate, postgraduate_degree); bachelor_degree means the posting asks for a bachelor degree, not that it suits someone holding one.",
              items: {
                type: "string",
                enum: [
                  "no_requirements",
                  "high_school",
                  "associate_degree",
                  "bachelor_degree",
                  "professional_certificate",
                  "postgraduate_degree",
                ],
              },
            },
            experience_levels: {
              type: "array",
              description:
                "Filter: jobs at any of these experience levels (entry_level, mid_level, senior_level, executive). The level comes from the years of experience the posting asks for and the seniority in its title, the higher of the two; entry_level never includes a posting asking for more than two years.",
              items: {
                type: "string",
                enum: ["entry_level", "mid_level", "senior_level", "executive"],
              },
            },
            benefits: {
              type: "array",
              description:
                'Advanced filter: benefit names such as "health insurance", "401k" or "parental leave"; a job qualifies only when it states every listed benefit. Names that match no known benefit are ignored.',
              items: {
                type: "string",
              },
              maxItems: 10,
            },
            bonuses_only: {
              type: "boolean",
              description:
                "Advanced filter: only jobs that state a bonus (sign-on, performance, referral, commission and the like).",
            },
            companies: {
              type: "array",
              description:
                "Filter: official company names; a job from any of them qualifies, across every job board each employer posts on. More than one company makes it an advanced filter. Next to company, a job has to match both; hiring_brand narrows company only.",
              items: {
                type: "string",
              },
              maxItems: 20,
            },
            exclude_companies: {
              type: "array",
              description:
                "Advanced filter: official company names whose jobs are removed from the results, across every job board each employer posts on.",
              items: {
                type: "string",
              },
              maxItems: 20,
            },
            page: {
              type: "integer",
              description: "Recommendation page number",
              minimum: 1,
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            jobs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  resultItemId: {
                    type: ["string", "null"],
                  },
                  title: {
                    type: ["string", "null"],
                  },
                  companyName: {
                    type: ["string", "null"],
                  },
                  location: {
                    type: ["string", "null"],
                  },
                  salary: {
                    type: ["string", "null"],
                  },
                  url: {
                    type: ["string", "null"],
                  },
                  logoUrl: {
                    type: ["string", "null"],
                  },
                  link: {
                    type: ["string", "null"],
                  },
                  employmentType: {
                    type: ["string", "null"],
                  },
                  postedAt: {
                    type: ["string", "null"],
                  },
                  descriptionSnippet: {
                    type: ["string", "null"],
                  },
                  description: {
                    type: ["string", "null"],
                  },
                  skills: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  benefits: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  bonuses: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  requirements: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  workLocationType: {
                    type: ["string", "null"],
                  },
                  companyRating: {
                    type: ["number", "null"],
                  },
                  companySize: {
                    type: ["string", "null"],
                  },
                  companyWebsite: {
                    type: ["string", "null"],
                  },
                  category: {
                    type: ["string", "null"],
                  },
                  subcategory: {
                    type: ["string", "null"],
                  },
                  estimatedSalary: {
                    type: ["object", "null"],
                    properties: {
                      median: {
                        type: ["number", "null"],
                      },
                      p25: {
                        type: ["number", "null"],
                      },
                      p75: {
                        type: ["number", "null"],
                      },
                      min: {
                        type: ["number", "null"],
                      },
                      max: {
                        type: ["number", "null"],
                      },
                      currency: {
                        type: ["string", "null"],
                      },
                      sampleSize: {
                        type: ["integer", "null"],
                      },
                      updatedAt: {
                        type: ["string", "null"],
                      },
                    },
                  },
                  salaryBand: {
                    type: ["object", "null"],
                    properties: {
                      min: {
                        type: "number",
                      },
                      max: {
                        type: "number",
                      },
                    },
                  },
                  insights: {
                    type: ["object", "null"],
                    properties: {
                      match: {
                        type: ["object", "null"],
                        properties: {
                          score: {
                            type: ["integer", "null"],
                          },
                          grade: {
                            type: ["string", "null"],
                          },
                          gradeConfidence: {
                            type: ["string", "null"],
                          },
                          gradeReasons: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                code: {
                                  type: "string",
                                },
                                severity: {
                                  type: "string",
                                },
                                params: {
                                  type: ["object", "null"],
                                },
                              },
                            },
                          },
                          insufficientData: {
                            type: "boolean",
                          },
                          matchedCount: {
                            type: "integer",
                          },
                          missingRequired: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          missingRequiredTotal: {
                            type: "integer",
                          },
                          requiredTotal: {
                            type: "integer",
                          },
                          matchedRequiredCount: {
                            type: "integer",
                          },
                          missingNice: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          missingNiceTotal: {
                            type: "integer",
                          },
                          seniorityMatch: {
                            type: ["string", "null"],
                          },
                          breakdown: {
                            type: ["object", "null"],
                            properties: {
                              skillScore: {
                                type: ["number", "null"],
                              },
                              seniorityMultiplier: {
                                type: ["number", "null"],
                              },
                              userRank: {
                                type: ["integer", "null"],
                              },
                              jobRank: {
                                type: ["integer", "null"],
                              },
                              userTrack: {
                                type: ["string", "null"],
                              },
                              jobTrack: {
                                type: ["string", "null"],
                              },
                              scoredSkillCount: {
                                type: ["integer", "null"],
                              },
                              weightedDenominator: {
                                type: ["number", "null"],
                              },
                              alignmentKind: {
                                type: ["string", "null"],
                              },
                              alignmentMultiplier: {
                                type: ["number", "null"],
                              },
                              jobCareerProfileId: {
                                type: ["integer", "null"],
                              },
                              jobCareerSpecializationId: {
                                type: ["integer", "null"],
                              },
                            },
                          },
                        },
                      },
                      h1bSponsor: {
                        type: ["boolean", "null"],
                      },
                      h1bPetitions: {
                        type: ["object", "null"],
                        properties: {
                          count: {
                            type: ["integer", "null"],
                          },
                          workers: {
                            type: ["integer", "null"],
                          },
                          fiscalPeriod: {
                            type: ["string", "null"],
                          },
                        },
                      },
                      eVerify: {
                        type: ["boolean", "null"],
                      },
                      ghostScore: {
                        type: ["object", "null"],
                        properties: {
                          grade: {
                            type: ["string", "null"],
                          },
                          confidence: {
                            type: ["string", "null"],
                          },
                          reasons: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                code: {
                                  type: "string",
                                },
                                severity: {
                                  type: "string",
                                },
                                params: {
                                  type: ["object", "null"],
                                },
                              },
                            },
                          },
                        },
                      },
                      h1bHistory: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            fiscalPeriod: {
                              type: "string",
                            },
                            petitions: {
                              type: "integer",
                            },
                            workers: {
                              type: "integer",
                            },
                          },
                        },
                      },
                    },
                  },
                  related: {
                    type: "boolean",
                  },
                  trackedJob: {
                    type: ["object", "null"],
                  },
                },
                required: ["id"],
              },
            },
            resultSetId: {
              type: ["string", "null"],
            },
            resultBatchId: {
              type: ["string", "null"],
            },
            jobSearchId: {
              type: ["string", "null"],
            },
            statusOrder: {
              type: "array",
              items: {
                type: "string",
              },
            },
            trackerWebUrl: {
              type: "string",
            },
            profileSetupUrl: {
              type: ["string", "null"],
            },
            profileSetupState: {
              type: ["string", "null"],
            },
            feedKind: {
              type: "string",
            },
            feedStatus: {
              type: "string",
            },
            revalidating: {
              type: "boolean",
            },
            nextPage: {
              type: ["integer", "null"],
            },
            totalCount: {
              type: "integer",
            },
            continueUrl: {
              type: "string",
            },
            preview: {
              type: ["object", "null"],
              properties: {
                shown: {
                  type: "integer",
                },
                hidden: {
                  type: "integer",
                },
                hiddenAtLeast: {
                  type: "boolean",
                },
                continueUrl: {
                  type: ["string", "null"],
                },
              },
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "Recommend jobs for my profile",
          readOnlyHint: false,
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
        },
      },
      {
        name: "jobs_search",
        title: "Search jobs",
        description:
          'Searches a database for real-time job listings matching the user\'s criteria.\n\nThe query is the full job title or role: "Ruby Developer" or "Ruby on Rails Engineer" rather than\na bare keyword like "Ruby", which is too broad and matches unrelated fields. Results may be\nfiltered by location, company, and how recently a job was posted.\n\nEach result carries an `id` and `resultItemId`; jobs_details takes that `id` with the corresponding\n`result_item_id` and returns the job\'s full description, requirements, and benefits. The response also carries a `nextCursor` for the next page of\nresults; a follow-up page is fetched by passing only that cursor, with no other search parameters.\n\nWith a ready profile, a query for the profile\'s target profession or an omitted query uses the same\npersonalized feed as jobs_recommendations and the website. A different or unrecognized profession\nuses general job search, preserving the explicit query and filters. An omitted location uses the\nprofile location. Without a ready profile, search uses the general job listings. Job details include\nFoundRole salary benchmarks, H-1B sponsorship signals, E-Verify status, and job-trust analysis;\nlist-level employer signals follow the user\'s current entitlements.\n\nConstraints in the user\'s request — remote-only work, H1B sponsorship, a minimum salary,\nhiding risky postings, a minimum match grade — are the search parameters remote, h1b_sponsors_only,\nsalary_floor, hide_low_quality, and min_match; sort orders the results by relevance, newest, salary\nor personal match. The search enforces only constraints passed as parameters; a constraint left out\nof the call is not applied to the result set.\n\nJob type, work mode, required education, experience level, benefits, bonuses, employers to include or\nexclude, and the search radius are the parameters employment_types, work_modes, education,\nexperience_levels, benefits, bonuses_only, companies, exclude_companies and radius. Remote and hybrid\nare independent work modes: a remote search never returns hybrid jobs. A job that does not state the\nfiltered attribute is left out while that filter is set. Fully remote work that can be done from the\nrequested location is strict_remote, with confirmed_work_from to require a stated work-from area; one\nbrand inside a company is hiring_brand next to company.\n\nAdvanced filters (sort, min_match, h1b_sponsors_only, hide_low_quality, salary_floor, remote, strict_remote, confirmed_work_from, work_modes, benefits, bonuses_only, companies, exclude_companies; sort only when ordering by salary or match, companies only\nwhen it names more than one employer) apply for every account. Without FoundRole Pro, a search using\none returns the first few matching jobs and the number of further matches; FoundRole Pro accounts\nreceive the whole list. The other parameters never shorten the results.\n\nEach response includes a system_instruction describing how to present the results for the current\nclient.\n',
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description:
                'The full job title or skill (e.g., "Ruby Developer", NOT just "Ruby")',
            },
            location: {
              type: "string",
              description: "Geographic location (e.g., 'Boston, MA')",
            },
            company: {
              type: "string",
              description: "The official company name",
            },
            hiring_brand: {
              type: "string",
              description:
                'Filter: one brand inside the company, for example company "Google" with hiring_brand "YouTube"; used only together with company.',
            },
            posted_days_ago: {
              type: "integer",
              description: "Number of days ago to search for jobs (1-365)",
              minimum: 1,
              maximum: 365,
            },
            remote: {
              type: "boolean",
              description:
                "Advanced filter: only remote-eligible jobs, matched across the whole country of the requested location rather than its radius.",
            },
            strict_remote: {
              type: "boolean",
              description:
                "Advanced filter: only postings checked as fully remote that can be worked from the requested location: the posting names that area, allows anywhere, or does not say where. Stricter than remote; work_modes other than remote do not apply with it.",
            },
            confirmed_work_from: {
              type: "boolean",
              description:
                "Advanced filter: with strict_remote, also leaves out postings that do not say where the work can be done from.",
            },
            h1b_sponsors_only: {
              type: "boolean",
              description:
                "Advanced filter: only companies known to sponsor H1B visas.",
            },
            salary_floor: {
              type: "integer",
              description:
                "Advanced filter: minimum annualized salary in USD; a posting qualifies when the lower bound of its pay band reaches the floor. Jobs without a USD salary are dropped.",
              minimum: 0,
            },
            hide_low_quality: {
              type: "boolean",
              description:
                "Advanced filter: hides postings with a risky ghost grade (D/F); ungraded postings stay.",
            },
            min_match: {
              type: "string",
              description:
                "Advanced filter: lowest personal FoundRole match grade to keep, the same letter each job shows in insights.match.grade. A and A- are rare even for a strong resume; B keeps good and strong matches; C+ also keeps fair ones. Needs a resume on the account.",
              enum: ["A", "A-", "B+", "B", "B-", "C+", "C"],
            },
            sort: {
              type: "string",
              description:
                "Result order (score, posted_at, match, salary): score is relevance and the default, posted_at is newest first, salary is highest pay first, match is best personal fit first and needs a resume. Ordering by salary or match is an advanced option.",
              enum: ["score", "posted_at", "match", "salary"],
            },
            employment_types: {
              type: "array",
              description:
                "Filter: jobs offered as any of these employment types (full_time, part_time, contractor, temporary, intern, volunteer, per_diem, other).",
              items: {
                type: "string",
                enum: [
                  "full_time",
                  "part_time",
                  "contractor",
                  "temporary",
                  "intern",
                  "volunteer",
                  "per_diem",
                  "other",
                ],
              },
            },
            work_modes: {
              type: "array",
              description:
                'Advanced filter: jobs in any of these work modes (on_site, remote, hybrid). remote is matched across the whole country of the location, the others within the radius. ["remote"] is the same search as remote: true.',
              items: {
                type: "string",
                enum: ["on_site", "remote", "hybrid"],
              },
            },
            education: {
              type: "array",
              description:
                "Filter: jobs whose posting requires one of these education levels (no_requirements, high_school, associate_degree, bachelor_degree, professional_certificate, postgraduate_degree); bachelor_degree means the posting asks for a bachelor degree, not that it suits someone holding one.",
              items: {
                type: "string",
                enum: [
                  "no_requirements",
                  "high_school",
                  "associate_degree",
                  "bachelor_degree",
                  "professional_certificate",
                  "postgraduate_degree",
                ],
              },
            },
            experience_levels: {
              type: "array",
              description:
                "Filter: jobs at any of these experience levels (entry_level, mid_level, senior_level, executive). The level comes from the years of experience the posting asks for and the seniority in its title, the higher of the two; entry_level never includes a posting asking for more than two years.",
              items: {
                type: "string",
                enum: ["entry_level", "mid_level", "senior_level", "executive"],
              },
            },
            benefits: {
              type: "array",
              description:
                'Advanced filter: benefit names such as "health insurance", "401k" or "parental leave"; a job qualifies only when it states every listed benefit. Names that match no known benefit are ignored.',
              items: {
                type: "string",
              },
              maxItems: 10,
            },
            bonuses_only: {
              type: "boolean",
              description:
                "Advanced filter: only jobs that state a bonus (sign-on, performance, referral, commission and the like).",
            },
            companies: {
              type: "array",
              description:
                "Filter: official company names; a job from any of them qualifies, across every job board each employer posts on. More than one company makes it an advanced filter. Next to company, a job has to match both; hiring_brand narrows company only.",
              items: {
                type: "string",
              },
              maxItems: 20,
            },
            exclude_companies: {
              type: "array",
              description:
                "Advanced filter: official company names whose jobs are removed from the results, across every job board each employer posts on.",
              items: {
                type: "string",
              },
              maxItems: 20,
            },
            radius: {
              type: "integer",
              description:
                "Search radius in miles around a city location (default 40); not used for state, country or remote searches.",
              minimum: 5,
              maximum: 100,
            },
            cursor: {
              type: "string",
              description:
                "Pagination cursor. Treat as an opaque string. COPY EXACTLY.",
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            jobs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  resultItemId: {
                    type: ["string", "null"],
                  },
                  title: {
                    type: ["string", "null"],
                  },
                  companyName: {
                    type: ["string", "null"],
                  },
                  location: {
                    type: ["string", "null"],
                  },
                  salary: {
                    type: ["string", "null"],
                  },
                  url: {
                    type: ["string", "null"],
                  },
                  logoUrl: {
                    type: ["string", "null"],
                  },
                  link: {
                    type: ["string", "null"],
                  },
                  employmentType: {
                    type: ["string", "null"],
                  },
                  postedAt: {
                    type: ["string", "null"],
                  },
                  descriptionSnippet: {
                    type: ["string", "null"],
                  },
                  description: {
                    type: ["string", "null"],
                  },
                  skills: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  benefits: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  bonuses: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  requirements: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  workLocationType: {
                    type: ["string", "null"],
                  },
                  companyRating: {
                    type: ["number", "null"],
                  },
                  companySize: {
                    type: ["string", "null"],
                  },
                  companyWebsite: {
                    type: ["string", "null"],
                  },
                  category: {
                    type: ["string", "null"],
                  },
                  subcategory: {
                    type: ["string", "null"],
                  },
                  estimatedSalary: {
                    type: ["object", "null"],
                    properties: {
                      median: {
                        type: ["number", "null"],
                      },
                      p25: {
                        type: ["number", "null"],
                      },
                      p75: {
                        type: ["number", "null"],
                      },
                      min: {
                        type: ["number", "null"],
                      },
                      max: {
                        type: ["number", "null"],
                      },
                      currency: {
                        type: ["string", "null"],
                      },
                      sampleSize: {
                        type: ["integer", "null"],
                      },
                      updatedAt: {
                        type: ["string", "null"],
                      },
                    },
                  },
                  salaryBand: {
                    type: ["object", "null"],
                    properties: {
                      min: {
                        type: "number",
                      },
                      max: {
                        type: "number",
                      },
                    },
                  },
                  insights: {
                    type: ["object", "null"],
                    properties: {
                      match: {
                        type: ["object", "null"],
                        properties: {
                          score: {
                            type: ["integer", "null"],
                          },
                          grade: {
                            type: ["string", "null"],
                          },
                          gradeConfidence: {
                            type: ["string", "null"],
                          },
                          gradeReasons: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                code: {
                                  type: "string",
                                },
                                severity: {
                                  type: "string",
                                },
                                params: {
                                  type: ["object", "null"],
                                },
                              },
                            },
                          },
                          insufficientData: {
                            type: "boolean",
                          },
                          matchedCount: {
                            type: "integer",
                          },
                          missingRequired: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          missingRequiredTotal: {
                            type: "integer",
                          },
                          requiredTotal: {
                            type: "integer",
                          },
                          matchedRequiredCount: {
                            type: "integer",
                          },
                          missingNice: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          missingNiceTotal: {
                            type: "integer",
                          },
                          seniorityMatch: {
                            type: ["string", "null"],
                          },
                          breakdown: {
                            type: ["object", "null"],
                            properties: {
                              skillScore: {
                                type: ["number", "null"],
                              },
                              seniorityMultiplier: {
                                type: ["number", "null"],
                              },
                              userRank: {
                                type: ["integer", "null"],
                              },
                              jobRank: {
                                type: ["integer", "null"],
                              },
                              userTrack: {
                                type: ["string", "null"],
                              },
                              jobTrack: {
                                type: ["string", "null"],
                              },
                              scoredSkillCount: {
                                type: ["integer", "null"],
                              },
                              weightedDenominator: {
                                type: ["number", "null"],
                              },
                              alignmentKind: {
                                type: ["string", "null"],
                              },
                              alignmentMultiplier: {
                                type: ["number", "null"],
                              },
                              jobCareerProfileId: {
                                type: ["integer", "null"],
                              },
                              jobCareerSpecializationId: {
                                type: ["integer", "null"],
                              },
                            },
                          },
                        },
                      },
                      h1bSponsor: {
                        type: ["boolean", "null"],
                      },
                      h1bPetitions: {
                        type: ["object", "null"],
                        properties: {
                          count: {
                            type: ["integer", "null"],
                          },
                          workers: {
                            type: ["integer", "null"],
                          },
                          fiscalPeriod: {
                            type: ["string", "null"],
                          },
                        },
                      },
                      eVerify: {
                        type: ["boolean", "null"],
                      },
                      ghostScore: {
                        type: ["object", "null"],
                        properties: {
                          grade: {
                            type: ["string", "null"],
                          },
                          confidence: {
                            type: ["string", "null"],
                          },
                          reasons: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                code: {
                                  type: "string",
                                },
                                severity: {
                                  type: "string",
                                },
                                params: {
                                  type: ["object", "null"],
                                },
                              },
                            },
                          },
                        },
                      },
                      h1bHistory: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            fiscalPeriod: {
                              type: "string",
                            },
                            petitions: {
                              type: "integer",
                            },
                            workers: {
                              type: "integer",
                            },
                          },
                        },
                      },
                    },
                  },
                  related: {
                    type: "boolean",
                  },
                  trackedJob: {
                    type: ["object", "null"],
                  },
                },
                required: ["id"],
              },
            },
            resultSetId: {
              type: ["string", "null"],
            },
            resultBatchId: {
              type: ["string", "null"],
            },
            jobSearchId: {
              type: ["string", "null"],
            },
            statusOrder: {
              type: "array",
              items: {
                type: "string",
              },
            },
            trackerWebUrl: {
              type: "string",
            },
            profileSetupUrl: {
              type: ["string", "null"],
            },
            profileSetupState: {
              type: ["string", "null"],
            },
            feedKind: {
              type: "string",
            },
            feedStatus: {
              type: ["string", "null"],
            },
            lowRelevanceNotice: {
              type: ["string", "null"],
            },
            revalidating: {
              type: "boolean",
            },
            continueUrl: {
              type: "string",
            },
            preview: {
              type: ["object", "null"],
              properties: {
                shown: {
                  type: "integer",
                },
                hidden: {
                  type: "integer",
                },
                hiddenAtLeast: {
                  type: "boolean",
                },
                continueUrl: {
                  type: ["string", "null"],
                },
              },
            },
            system_instruction: {
              type: "string",
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "Search jobs",
          readOnlyHint: false,
          destructiveHint: false,
          openWorldHint: false,
        },
      },
      {
        name: "knowledge_search",
        title: "Search career guides",
        description:
          "Searches FoundRole's published content by semantic similarity and returns the most relevant sources for a\njob-search question: career-guidance blog articles plus FoundRole site pages that describe the product's\nfeatures (job tracker, Pro plan and pricing, H1B salary data, AI job search) and industry/sector career\nlandings. Each article carries a title, url, summary, a content excerpt, publication date, and tags; each\npage carries a title, url, description, and its FAQ entries — enough material to answer the question and\nlink the source.\n\nTwo optional facets add further result groups: company returns FoundRole's employer profile pages\nmatching that company name; location returns the market landing page for that city, state, or country —\nan analytical page about that labour market, not a list of openings. The facets describe what the user is\nasking about — a company mentioned only in passing does not need the company facet.\n\nReturns empty groups when nothing is relevant rather than padding with off-topic content. Results are the\nclosest matches to the given question, not an index of the site's full coverage; questions about overall\ntopic coverage are answered by knowledge_topics, which lists the blog's categories and tags with article\ncounts. It does not search job listings and reports no open-job counts — jobs_search covers live roles,\nincluding questions about openings for a particular job title. Each response includes a\nsystem_instruction describing how to present the sources.\n",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description:
                "The career, job-search, or FoundRole product question to answer",
            },
            company: {
              type: "string",
              description:
                "A company name, when the question is about that employer — returns FoundRole company profile pages",
            },
            location: {
              type: "string",
              description:
                "A city, state, or country, when the question is about that labour market — returns its market landing page",
            },
            limit: {
              type: "integer",
              description: "Maximum articles to return (default 5)",
              minimum: 1,
              maximum: 8,
            },
          },
          required: ["query"],
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            articles: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: {
                    type: ["string", "null"],
                  },
                  url: {
                    type: "string",
                  },
                  summary: {
                    type: ["string", "null"],
                  },
                  excerpt: {
                    type: ["string", "null"],
                  },
                  publishedAt: {
                    type: ["string", "null"],
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
              },
            },
            pages: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },
                  url: {
                    type: "string",
                  },
                  description: {
                    type: ["string", "null"],
                  },
                  faq: {
                    type: "array",
                    items: {
                      type: "object",
                    },
                  },
                },
              },
            },
            companyPages: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  url: {
                    type: "string",
                  },
                  industry: {
                    type: ["string", "null"],
                  },
                  headquarters: {
                    type: ["string", "null"],
                  },
                },
              },
            },
            landingPages: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  url: {
                    type: "string",
                  },
                  description: {
                    type: ["string", "null"],
                  },
                },
              },
            },
            totalCount: {
              type: "integer",
            },
            proUrl: {
              type: ["string", "null"],
            },
            profileSetupUrl: {
              type: ["string", "null"],
            },
            system_instruction: {
              type: "string",
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "Search career guides",
          readOnlyHint: true,
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
        },
      },
      {
        name: "knowledge_topics",
        title: "List career guide topics",
        description:
          "Lists what FoundRole's published career-guidance blog covers: every category and the most-used tags,\neach with its published-article count and url, plus the total number of published articles. This is the\nfactual source for questions about the blog's topics or overall coverage. It takes no parameters and\nreflects the live published corpus. It does not retrieve articles for a specific question;\nknowledge_search does that.\n",
        inputSchema: {
          type: "object",
          properties: {},
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            totalArticles: {
              type: "integer",
            },
            categories: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  url: {
                    type: ["string", "null"],
                  },
                  articleCount: {
                    type: "integer",
                  },
                },
              },
            },
            tags: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  url: {
                    type: ["string", "null"],
                  },
                  articleCount: {
                    type: "integer",
                  },
                },
              },
            },
            system_instruction: {
              type: "string",
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "List career guide topics",
          readOnlyHint: true,
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
        },
      },
      {
        name: "reminder_delete",
        title: "Delete a reminder",
        description:
          "Deletes a reminder from a tracked job.\n\n**Input:**\n- `tracked_job_id`: The tracked job ID — `trackedJobs[].id` from tracker_list output, distinct from `trackable.id` and `job.id` (required)\n\n**Output:**\nReturns the updated tracked job with reminderAt cleared.\n",
        inputSchema: {
          type: "object",
          properties: {
            tracked_job_id: {
              type: "string",
              description:
                "The tracked job ID — `trackedJobs[].id` from tracker_list output, distinct from `trackable.id` and `job.id` (required)",
            },
          },
          required: ["tracked_job_id"],
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            trackedJob: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                status: {
                  type: "string",
                },
                subStatus: {
                  type: ["string", "null"],
                },
                notes: {
                  type: ["string", "null"],
                },
                isStarred: {
                  type: "boolean",
                },
                deadline: {
                  type: ["string", "null"],
                },
                salaryOffered: {
                  type: ["number", "null"],
                },
                salaryOfferedType: {
                  type: ["string", "null"],
                },
                reminderAt: {
                  type: ["string", "null"],
                },
                appliedAt: {
                  type: ["string", "null"],
                },
                createdAt: {
                  type: ["string", "null"],
                },
                updatedAt: {
                  type: ["string", "null"],
                },
                tags: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                contacts: {
                  type: "array",
                  items: {
                    type: "object",
                  },
                },
                trackable: {
                  type: ["object", "null"],
                },
              },
              required: ["id"],
            },
            trackedJobs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                  },
                  subStatus: {
                    type: ["string", "null"],
                  },
                  notes: {
                    type: ["string", "null"],
                  },
                  isStarred: {
                    type: "boolean",
                  },
                  deadline: {
                    type: ["string", "null"],
                  },
                  salaryOffered: {
                    type: ["number", "null"],
                  },
                  salaryOfferedType: {
                    type: ["string", "null"],
                  },
                  reminderAt: {
                    type: ["string", "null"],
                  },
                  appliedAt: {
                    type: ["string", "null"],
                  },
                  createdAt: {
                    type: ["string", "null"],
                  },
                  updatedAt: {
                    type: ["string", "null"],
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  contacts: {
                    type: "array",
                    items: {
                      type: "object",
                    },
                  },
                  trackable: {
                    type: ["object", "null"],
                  },
                  job: {
                    type: ["object", "null"],
                  },
                },
                required: ["id"],
              },
            },
            statusOrder: {
              type: "array",
              items: {
                type: "string",
              },
            },
            subStatusOrder: {
              type: "object",
            },
            totalCount: {
              type: "integer",
            },
            hasMore: {
              type: "boolean",
            },
            trackerWebUrl: {
              type: "string",
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "Delete a reminder",
          readOnlyHint: false,
          destructiveHint: true,
          openWorldHint: false,
        },
      },
      {
        name: "reminder_list",
        title: "List reminders",
        description:
          "Lists tracked jobs that have reminders set, ordered by reminder time (soonest first).\n\n**Input:**\n- `limit`: Number of results to return (default 20, max 50)\n\n**Output:**\nReturns a list of tracked jobs with active reminders.\n",
        inputSchema: {
          type: "object",
          properties: {
            limit: {
              type: "integer",
              description: "Number of results to return (default 20, max 50)",
              minimum: 1,
              maximum: 50,
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            trackedJobs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                  },
                  subStatus: {
                    type: ["string", "null"],
                  },
                  notes: {
                    type: ["string", "null"],
                  },
                  isStarred: {
                    type: "boolean",
                  },
                  deadline: {
                    type: ["string", "null"],
                  },
                  salaryOffered: {
                    type: ["number", "null"],
                  },
                  salaryOfferedType: {
                    type: ["string", "null"],
                  },
                  reminderAt: {
                    type: ["string", "null"],
                  },
                  appliedAt: {
                    type: ["string", "null"],
                  },
                  createdAt: {
                    type: ["string", "null"],
                  },
                  updatedAt: {
                    type: ["string", "null"],
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  contacts: {
                    type: "array",
                    items: {
                      type: "object",
                    },
                  },
                  trackable: {
                    type: ["object", "null"],
                  },
                },
                required: ["id"],
              },
            },
            totalCount: {
              type: "integer",
            },
            hasMore: {
              type: "boolean",
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "List reminders",
          readOnlyHint: true,
          destructiveHint: false,
          openWorldHint: false,
        },
      },
      {
        name: "reminder_set",
        title: "Set a follow-up reminder",
        description:
          'Sets a reminder for a tracked job. Sends a confirmation email with .ics calendar attachment.\n\n**Input:**\n- `tracked_job_id`: The tracked job ID — `trackedJobs[].id` from tracker_list output, distinct from `trackable.id` and `job.id` (required)\n- `remind_at`: Reminder date/time in ISO 8601 format, e.g. "2025-03-15T10:00:00Z" (required, must be in the future)\n\n**Output:**\nReturns the updated tracked job with reminderAt field.\n',
        inputSchema: {
          type: "object",
          properties: {
            tracked_job_id: {
              type: "string",
              description:
                "The tracked job ID — `trackedJobs[].id` from tracker_list output, distinct from `trackable.id` and `job.id` (required)",
            },
            remind_at: {
              type: "string",
              description:
                'ISO 8601 datetime, e.g. "2025-03-15T10:00:00Z" (must be in the future)',
            },
          },
          required: ["tracked_job_id", "remind_at"],
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            trackedJob: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                status: {
                  type: "string",
                },
                subStatus: {
                  type: ["string", "null"],
                },
                notes: {
                  type: ["string", "null"],
                },
                isStarred: {
                  type: "boolean",
                },
                deadline: {
                  type: ["string", "null"],
                },
                salaryOffered: {
                  type: ["number", "null"],
                },
                salaryOfferedType: {
                  type: ["string", "null"],
                },
                reminderAt: {
                  type: ["string", "null"],
                },
                appliedAt: {
                  type: ["string", "null"],
                },
                createdAt: {
                  type: ["string", "null"],
                },
                updatedAt: {
                  type: ["string", "null"],
                },
                tags: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                contacts: {
                  type: "array",
                  items: {
                    type: "object",
                  },
                },
                trackable: {
                  type: ["object", "null"],
                },
              },
              required: ["id"],
            },
            trackedJobs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                  },
                  subStatus: {
                    type: ["string", "null"],
                  },
                  notes: {
                    type: ["string", "null"],
                  },
                  isStarred: {
                    type: "boolean",
                  },
                  deadline: {
                    type: ["string", "null"],
                  },
                  salaryOffered: {
                    type: ["number", "null"],
                  },
                  salaryOfferedType: {
                    type: ["string", "null"],
                  },
                  reminderAt: {
                    type: ["string", "null"],
                  },
                  appliedAt: {
                    type: ["string", "null"],
                  },
                  createdAt: {
                    type: ["string", "null"],
                  },
                  updatedAt: {
                    type: ["string", "null"],
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  contacts: {
                    type: "array",
                    items: {
                      type: "object",
                    },
                  },
                  trackable: {
                    type: ["object", "null"],
                  },
                  job: {
                    type: ["object", "null"],
                  },
                },
                required: ["id"],
              },
            },
            statusOrder: {
              type: "array",
              items: {
                type: "string",
              },
            },
            subStatusOrder: {
              type: "object",
            },
            totalCount: {
              type: "integer",
            },
            hasMore: {
              type: "boolean",
            },
            trackerWebUrl: {
              type: "string",
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "Set a follow-up reminder",
          readOnlyHint: false,
          destructiveHint: true,
          openWorldHint: true,
        },
      },
      {
        name: "resume_check",
        title: "Check how hiring software reads a resume",
        description:
          "Checks resume text for machine-readable sections, recognized skills, contact channels, a headline,\nand experience date ranges using FoundRole's deterministic parser.\n\nPass resume_text to check plain text supplied in the conversation. If resume_text is omitted, the tool\nreads the previously extracted text of the primary resume in the authenticated user's FoundRole account.\nIt returns a readability band (strong, good, partial), parsed facts, and findings. This is FoundRole's\ntext-readability assessment, not a test against a named ATS, a hiring prediction, or a file-layout check.\nPasted text does not preserve the original PDF or DOCX layout.\n\nThe tool does not upload a file, create a saved resume or report, change the user's profile, submit an\napplication, or fetch URLs found in the text. It may return a FoundRole website link; opening that link\nand uploading or editing a resume are separate user actions. Operational request records and diagnostics\nmay retain tool inputs; this tool does not promise that submitted text is never stored.\n",
        inputSchema: {
          type: "object",
          properties: {
            resume_text: {
              type: "string",
              description:
                "Plain text of the resume to check, when it is available in the conversation. Omit to check the resume uploaded to the user's FoundRole account. Minimum 200 characters.",
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            mode: {
              type: "string",
            },
            band: {
              type: ["string", "null"],
            },
            findings: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  code: {
                    type: "string",
                  },
                  detail: {
                    type: "string",
                  },
                },
              },
            },
            parsedAs: {
              type: ["object", "null"],
              properties: {
                headline: {
                  type: ["string", "null"],
                },
                headlineFound: {
                  type: "boolean",
                },
                yearsOfExperience: {
                  type: ["integer", "null"],
                },
                skillsCount: {
                  type: "integer",
                },
                sectionsFound: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                emailFound: {
                  type: "boolean",
                },
                phoneFound: {
                  type: "boolean",
                },
                linkedinFound: {
                  type: "boolean",
                },
              },
            },
            studioReportUrl: {
              type: ["string", "null"],
            },
            uploadUrl: {
              type: ["string", "null"],
            },
            system_instruction: {
              type: "string",
            },
          },
          required: ["mode"],
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "Check how hiring software reads a resume",
          readOnlyHint: true,
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
        },
      },
      {
        name: "tracker_list",
        title: "List tracked jobs",
        description:
          "Lists the user's tracked jobs with optional filtering and pagination.\n\n**Input:**\n- `status`: Filter by status (saved, applied, interviewing, offered, archived)\n- `limit`: Number of results per page (default 20, max 50)\n- `offset`: Number of results to skip (default 0)\n\n**Output:**\nReturns a list of tracked jobs grouped by status with pagination info. Each response\nincludes a system_instruction describing how to present the results for the current client.\n",
        inputSchema: {
          type: "object",
          properties: {
            status: {
              type: "string",
              description:
                "Filter by status: saved, applied, interviewing, offered, archived",
            },
            limit: {
              type: "integer",
              description: "Number of results per page (default 20, max 50)",
              minimum: 1,
              maximum: 50,
            },
            offset: {
              type: "integer",
              description: "Number of results to skip (default 0)",
              minimum: 0,
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            trackedJob: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                status: {
                  type: "string",
                },
                subStatus: {
                  type: ["string", "null"],
                },
                notes: {
                  type: ["string", "null"],
                },
                isStarred: {
                  type: "boolean",
                },
                deadline: {
                  type: ["string", "null"],
                },
                salaryOffered: {
                  type: ["number", "null"],
                },
                salaryOfferedType: {
                  type: ["string", "null"],
                },
                reminderAt: {
                  type: ["string", "null"],
                },
                appliedAt: {
                  type: ["string", "null"],
                },
                createdAt: {
                  type: ["string", "null"],
                },
                updatedAt: {
                  type: ["string", "null"],
                },
                tags: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                contacts: {
                  type: "array",
                  items: {
                    type: "object",
                  },
                },
                trackable: {
                  type: ["object", "null"],
                },
              },
              required: ["id"],
            },
            trackedJobs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                  },
                  subStatus: {
                    type: ["string", "null"],
                  },
                  notes: {
                    type: ["string", "null"],
                  },
                  isStarred: {
                    type: "boolean",
                  },
                  deadline: {
                    type: ["string", "null"],
                  },
                  salaryOffered: {
                    type: ["number", "null"],
                  },
                  salaryOfferedType: {
                    type: ["string", "null"],
                  },
                  reminderAt: {
                    type: ["string", "null"],
                  },
                  appliedAt: {
                    type: ["string", "null"],
                  },
                  createdAt: {
                    type: ["string", "null"],
                  },
                  updatedAt: {
                    type: ["string", "null"],
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  contacts: {
                    type: "array",
                    items: {
                      type: "object",
                    },
                  },
                  trackable: {
                    type: ["object", "null"],
                  },
                  job: {
                    type: ["object", "null"],
                  },
                },
                required: ["id"],
              },
            },
            statusOrder: {
              type: "array",
              items: {
                type: "string",
              },
            },
            subStatusOrder: {
              type: "object",
            },
            totalCount: {
              type: "integer",
            },
            hasMore: {
              type: "boolean",
            },
            trackerWebUrl: {
              type: "string",
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "List tracked jobs",
          readOnlyHint: true,
          destructiveHint: false,
          openWorldHint: false,
        },
      },
      {
        name: "tracker_remove",
        title: "Remove a job from the tracker",
        description:
          "Removes a job from the user's job tracker.\n\n**Input:**\n- `tracked_job_id`: The tracked job ID — `trackedJobs[].id` from tracker_list output, distinct from `trackable.id` and `job.id` (required)\n\n**Output:**\nConfirms the job was removed from tracking.\n",
        inputSchema: {
          type: "object",
          properties: {
            tracked_job_id: {
              type: "string",
              description:
                "The tracked job ID — `trackedJobs[].id` from tracker_list output, distinct from `trackable.id` and `job.id` (required)",
            },
          },
          required: ["tracked_job_id"],
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            trackedJob: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                status: {
                  type: "string",
                },
                subStatus: {
                  type: ["string", "null"],
                },
                notes: {
                  type: ["string", "null"],
                },
                isStarred: {
                  type: "boolean",
                },
                deadline: {
                  type: ["string", "null"],
                },
                salaryOffered: {
                  type: ["number", "null"],
                },
                salaryOfferedType: {
                  type: ["string", "null"],
                },
                reminderAt: {
                  type: ["string", "null"],
                },
                appliedAt: {
                  type: ["string", "null"],
                },
                createdAt: {
                  type: ["string", "null"],
                },
                updatedAt: {
                  type: ["string", "null"],
                },
                tags: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                contacts: {
                  type: "array",
                  items: {
                    type: "object",
                  },
                },
                trackable: {
                  type: ["object", "null"],
                },
              },
              required: ["id"],
            },
            trackedJobs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                  },
                  subStatus: {
                    type: ["string", "null"],
                  },
                  notes: {
                    type: ["string", "null"],
                  },
                  isStarred: {
                    type: "boolean",
                  },
                  deadline: {
                    type: ["string", "null"],
                  },
                  salaryOffered: {
                    type: ["number", "null"],
                  },
                  salaryOfferedType: {
                    type: ["string", "null"],
                  },
                  reminderAt: {
                    type: ["string", "null"],
                  },
                  appliedAt: {
                    type: ["string", "null"],
                  },
                  createdAt: {
                    type: ["string", "null"],
                  },
                  updatedAt: {
                    type: ["string", "null"],
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  contacts: {
                    type: "array",
                    items: {
                      type: "object",
                    },
                  },
                  trackable: {
                    type: ["object", "null"],
                  },
                  job: {
                    type: ["object", "null"],
                  },
                },
                required: ["id"],
              },
            },
            statusOrder: {
              type: "array",
              items: {
                type: "string",
              },
            },
            subStatusOrder: {
              type: "object",
            },
            totalCount: {
              type: "integer",
            },
            hasMore: {
              type: "boolean",
            },
            trackerWebUrl: {
              type: "string",
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "Remove a job from the tracker",
          readOnlyHint: false,
          destructiveHint: true,
          openWorldHint: false,
        },
      },
      {
        name: "tracker_add_external",
        title: "Save a job from another site to the tracker",
        description:
          "Saves a job posting found anywhere on the open web into the user's tracker. For jobs that came\nfrom jobs_search results, tracker_add (which takes a job_id) is the right tool instead. A job\nseen elsewhere in the conversation needs no prior jobs_search call — its URL and details from\nthe conversation are sufficient input.\n\n`url`, `company_name`, `title_name`, `location_name`, and `description` identify the posting\nand are the only required fields. Every structured fact field (salary, dates, employment type,\neducation, experience) is optional: a fact the source does not state is simply omitted (or\nnull), and FoundRole's own extractors derive missing salary, employment, work-arrangement,\neducation, experience, skills, benefits, and bonuses from the description. A save never waits\non facts the source did not provide. The optional `client_extraction` object carries\nevidence-backed skills, technology, benefits, bonuses, seniority, industry, management,\nclearance, visa, and remote-scope labels when source excerpts for them exist; FoundRole\nvalidates and stores those labels separately.\n\nFields:\n- `url`: the job posting's direct URL (required; not a company homepage)\n- `company_name`: company name (required)\n- `title_name`: job title (required)\n- `location_name`: location, e.g. \"New York, NY\" (required)\n- `description`: the posting's description from the source result; a short summary is acceptable (required)\n- `salary_min_value` / `salary_max_value`: salary range bounds (numbers)\n- `salary_value`: a single salary figure when there is no range (number)\n- `posted_at`: ISO 8601 posting date\n- `salary_currency`: ISO 4217 currency code\n- `salary_type`: one of year, month, week, day, hour\n- `employment_type`: array of full_time, part_time, contractor, temporary, intern, volunteer, per_diem, other\n- `work_location_type`: one of on_site, remote, hybrid\n- `education_requirements`: array of no_requirements, high_school, associate_degree, bachelor_degree, professional_certificate, postgraduate_degree\n- `experience_months`: minimum required experience in months (number)\n- `client_extraction`: evidence-backed extraction object; fields without source evidence are omitted\n- `status`: initial tracking status (saved, applied, interviewing, offered, archived); defaults to \"saved\"\n- `sub_status`: sub-status within the main status: saved: interested, researching_company, preparing_application, ready_to_apply; applied: application_submitted, followed_up; interviewing: interview_scheduled, phone_screen, technical, onsite, final_round, pending_feedback; offered: negotiating, considering, offer_received, accepted; archived: ghosted, rejected_by_company, withdrawn_by_candidate, not_interested, employed_by_this_company, employed_by_another_company\n- `notes`: notes about the job\n\nReturns the tracked job. Repeated saves return the existing tracked job.\n",
        inputSchema: {
          type: "object",
          properties: {
            url: {
              type: "string",
              description:
                "Direct URL of the specific job posting; a company homepage is invalid",
            },
            company_name: {
              type: "string",
              description: "Company name from the posting",
            },
            title_name: {
              type: "string",
              description: "Job title from the posting",
            },
            location_name: {
              type: "string",
              description:
                "Location text from the posting, including Remote when stated",
            },
            description: {
              type: "string",
              description:
                "Complete posting text available in the conversation; a source summary is valid only when no fuller posting text is available",
            },
            posted_at: {
              type: ["string", "null"],
              description:
                "Posting date as ISO 8601, when the source states it",
              format: "date-time",
            },
            salary_min_value: {
              type: ["number", "null"],
              description: "Salary range minimum, when stated",
            },
            salary_max_value: {
              type: ["number", "null"],
              description: "Salary range maximum, when stated",
            },
            salary_value: {
              type: ["number", "null"],
              description:
                "Single salary amount, when the posting gives one figure instead of a range",
            },
            salary_type: {
              type: ["string", "null"],
              description: "Salary period: year, month, week, day, hour",
              enum: [null, "year", "month", "week", "day", "hour"],
            },
            salary_currency: {
              type: ["string", "null"],
              description: "ISO 4217 salary currency code, when stated",
            },
            employment_type: {
              type: ["array", "null"],
              description:
                "Employment types: full_time, part_time, contractor, temporary, intern, volunteer, per_diem, other",
              items: {
                type: "string",
                enum: [
                  "full_time",
                  "part_time",
                  "contractor",
                  "temporary",
                  "intern",
                  "volunteer",
                  "per_diem",
                  "other",
                ],
              },
            },
            work_location_type: {
              type: ["string", "null"],
              description: "Work arrangement: on_site, remote, hybrid",
              enum: [null, "on_site", "remote", "hybrid"],
            },
            education_requirements: {
              type: ["array", "null"],
              description:
                "Education requirements: no_requirements, high_school, associate_degree, bachelor_degree, professional_certificate, postgraduate_degree",
              items: {
                type: "string",
                enum: [
                  "no_requirements",
                  "high_school",
                  "associate_degree",
                  "bachelor_degree",
                  "professional_certificate",
                  "postgraduate_degree",
                ],
              },
            },
            experience_months: {
              type: ["integer", "null"],
              description: "Minimum required experience in months, when stated",
            },
            client_extraction: {
              type: ["object", "null"],
              description:
                "Evidence-backed facts extracted by the client model from the posting; non-null evidence is a short source excerpt rather than an inference. Fields absent from the source are omitted or null.",
              properties: {
                skills: {
                  type: ["array", "null"],
                  maxItems: 50,
                  items: {
                    type: "object",
                    properties: {
                      value: {
                        type: "string",
                        minLength: 1,
                        maxLength: 255,
                      },
                      evidence: {
                        type: "string",
                        minLength: 8,
                        maxLength: 500,
                      },
                      importance: {
                        type: "string",
                        enum: ["required", "preferred", "mentioned"],
                      },
                    },
                    required: ["value", "evidence", "importance"],
                    additionalProperties: false,
                  },
                },
                tech_stack: {
                  type: ["array", "null"],
                  maxItems: 30,
                  items: {
                    type: "object",
                    properties: {
                      value: {
                        type: "string",
                        minLength: 1,
                        maxLength: 255,
                      },
                      evidence: {
                        type: "string",
                        minLength: 8,
                        maxLength: 500,
                      },
                    },
                    required: ["value", "evidence"],
                    additionalProperties: false,
                  },
                },
                benefits: {
                  type: ["array", "null"],
                  maxItems: 30,
                  items: {
                    type: "object",
                    properties: {
                      value: {
                        type: "string",
                        minLength: 1,
                        maxLength: 255,
                      },
                      evidence: {
                        type: "string",
                        minLength: 8,
                        maxLength: 500,
                      },
                    },
                    required: ["value", "evidence"],
                    additionalProperties: false,
                  },
                },
                bonuses: {
                  type: ["array", "null"],
                  maxItems: 20,
                  items: {
                    type: "object",
                    properties: {
                      value: {
                        type: "string",
                        minLength: 1,
                        maxLength: 255,
                      },
                      evidence: {
                        type: "string",
                        minLength: 8,
                        maxLength: 500,
                      },
                    },
                    required: ["value", "evidence"],
                    additionalProperties: false,
                  },
                },
                seniority: {
                  type: ["object", "null"],
                  properties: {
                    value: {
                      type: "string",
                      minLength: 1,
                      maxLength: 255,
                    },
                    evidence: {
                      type: "string",
                      minLength: 8,
                      maxLength: 500,
                    },
                  },
                  required: ["value", "evidence"],
                  additionalProperties: false,
                },
                industry: {
                  type: ["object", "null"],
                  properties: {
                    value: {
                      type: "string",
                      minLength: 1,
                      maxLength: 255,
                    },
                    evidence: {
                      type: "string",
                      minLength: 8,
                      maxLength: 500,
                    },
                  },
                  required: ["value", "evidence"],
                  additionalProperties: false,
                },
                management: {
                  type: ["object", "null"],
                  properties: {
                    value: {
                      type: "boolean",
                    },
                    evidence: {
                      type: "string",
                      minLength: 8,
                      maxLength: 500,
                    },
                  },
                  required: ["value", "evidence"],
                  additionalProperties: false,
                },
                security_clearance: {
                  type: ["object", "null"],
                  properties: {
                    value: {
                      type: "boolean",
                    },
                    evidence: {
                      type: "string",
                      minLength: 8,
                      maxLength: 500,
                    },
                  },
                  required: ["value", "evidence"],
                  additionalProperties: false,
                },
                visa_sponsorship: {
                  type: ["object", "null"],
                  properties: {
                    value: {
                      type: "string",
                      enum: ["offered", "not_offered", "conditional"],
                    },
                    evidence: {
                      type: "string",
                      minLength: 8,
                      maxLength: 500,
                    },
                  },
                  required: ["value", "evidence"],
                  additionalProperties: false,
                },
                remote_scope: {
                  type: ["object", "null"],
                  properties: {
                    value: {
                      type: "string",
                      minLength: 1,
                      maxLength: 255,
                    },
                    evidence: {
                      type: "string",
                      minLength: 8,
                      maxLength: 500,
                    },
                  },
                  required: ["value", "evidence"],
                  additionalProperties: false,
                },
              },
              additionalProperties: false,
            },
            status: {
              type: "string",
              description:
                "Initial tracking status: saved, applied, interviewing, offered, archived",
            },
            sub_status: {
              type: "string",
              description:
                "Sub-status within the main status, valid only for that status — saved: interested, researching_company, preparing_application, ready_to_apply; applied: application_submitted, followed_up; interviewing: interview_scheduled, phone_screen, technical, onsite, final_round, pending_feedback; offered: negotiating, considering, offer_received, accepted; archived: ghosted, rejected_by_company, withdrawn_by_candidate, not_interested, employed_by_this_company, employed_by_another_company",
            },
            notes: {
              type: "string",
              description: "Notes about this job",
            },
          },
          required: [
            "url",
            "company_name",
            "title_name",
            "location_name",
            "description",
          ],
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            trackedJob: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                status: {
                  type: "string",
                },
                subStatus: {
                  type: ["string", "null"],
                },
                notes: {
                  type: ["string", "null"],
                },
                isStarred: {
                  type: "boolean",
                },
                deadline: {
                  type: ["string", "null"],
                },
                salaryOffered: {
                  type: ["number", "null"],
                },
                salaryOfferedType: {
                  type: ["string", "null"],
                },
                reminderAt: {
                  type: ["string", "null"],
                },
                appliedAt: {
                  type: ["string", "null"],
                },
                createdAt: {
                  type: ["string", "null"],
                },
                updatedAt: {
                  type: ["string", "null"],
                },
                tags: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                contacts: {
                  type: "array",
                  items: {
                    type: "object",
                  },
                },
                trackable: {
                  type: ["object", "null"],
                },
              },
              required: ["id"],
            },
            trackedJobs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                  },
                  subStatus: {
                    type: ["string", "null"],
                  },
                  notes: {
                    type: ["string", "null"],
                  },
                  isStarred: {
                    type: "boolean",
                  },
                  deadline: {
                    type: ["string", "null"],
                  },
                  salaryOffered: {
                    type: ["number", "null"],
                  },
                  salaryOfferedType: {
                    type: ["string", "null"],
                  },
                  reminderAt: {
                    type: ["string", "null"],
                  },
                  appliedAt: {
                    type: ["string", "null"],
                  },
                  createdAt: {
                    type: ["string", "null"],
                  },
                  updatedAt: {
                    type: ["string", "null"],
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  contacts: {
                    type: "array",
                    items: {
                      type: "object",
                    },
                  },
                  trackable: {
                    type: ["object", "null"],
                  },
                  job: {
                    type: ["object", "null"],
                  },
                },
                required: ["id"],
              },
            },
            statusOrder: {
              type: "array",
              items: {
                type: "string",
              },
            },
            subStatusOrder: {
              type: "object",
            },
            totalCount: {
              type: "integer",
            },
            hasMore: {
              type: "boolean",
            },
            trackerWebUrl: {
              type: "string",
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "Save a job from another site to the tracker",
          readOnlyHint: false,
          destructiveHint: false,
          openWorldHint: false,
        },
      },
      {
        name: "tracker_add",
        title: "Save a job to the tracker",
        description:
          'Tracks a job from jobs_search results in the user\'s job tracker, identified by its job_id. For a\njob found elsewhere on the open web (with a URL but no jobs_search job_id), tracker_add_external\nis the right tool instead.\n\nFields:\n- `job_id`: the job ID from jobs_search results (required)\n- `status`: initial status (saved, applied, interviewing, offered, archived); defaults to "saved"\n- `sub_status`: sub-status within the main status: saved: interested, researching_company, preparing_application, ready_to_apply; applied: application_submitted, followed_up; interviewing: interview_scheduled, phone_screen, technical, onsite, final_round, pending_feedback; offered: negotiating, considering, offer_received, accepted; archived: ghosted, rejected_by_company, withdrawn_by_candidate, not_interested, employed_by_this_company, employed_by_another_company\n- `notes`: notes about the job\n\nReturns the tracked job with its details. Repeated saves return the existing tracked job. A job\nthat was previously removed from the tracker is restored with its earlier status and notes.\n',
        inputSchema: {
          type: "object",
          properties: {
            job_id: {
              type: "string",
              description: "The job ID from jobs.search results",
            },
            result_item_id: {
              type: "string",
              description:
                "The result occurrence ID returned with the selected job",
            },
            status: {
              type: "string",
              description:
                "Initial tracking status: saved, applied, interviewing, offered, archived",
            },
            sub_status: {
              type: "string",
              description:
                "Sub-status within the main status, valid only for that status — saved: interested, researching_company, preparing_application, ready_to_apply; applied: application_submitted, followed_up; interviewing: interview_scheduled, phone_screen, technical, onsite, final_round, pending_feedback; offered: negotiating, considering, offer_received, accepted; archived: ghosted, rejected_by_company, withdrawn_by_candidate, not_interested, employed_by_this_company, employed_by_another_company",
            },
            notes: {
              type: "string",
              description: "Notes about this job",
            },
          },
          required: ["job_id"],
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            trackedJob: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                status: {
                  type: "string",
                },
                subStatus: {
                  type: ["string", "null"],
                },
                notes: {
                  type: ["string", "null"],
                },
                isStarred: {
                  type: "boolean",
                },
                deadline: {
                  type: ["string", "null"],
                },
                salaryOffered: {
                  type: ["number", "null"],
                },
                salaryOfferedType: {
                  type: ["string", "null"],
                },
                reminderAt: {
                  type: ["string", "null"],
                },
                appliedAt: {
                  type: ["string", "null"],
                },
                createdAt: {
                  type: ["string", "null"],
                },
                updatedAt: {
                  type: ["string", "null"],
                },
                tags: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                contacts: {
                  type: "array",
                  items: {
                    type: "object",
                  },
                },
                trackable: {
                  type: ["object", "null"],
                },
              },
              required: ["id"],
            },
            trackedJobs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                  },
                  subStatus: {
                    type: ["string", "null"],
                  },
                  notes: {
                    type: ["string", "null"],
                  },
                  isStarred: {
                    type: "boolean",
                  },
                  deadline: {
                    type: ["string", "null"],
                  },
                  salaryOffered: {
                    type: ["number", "null"],
                  },
                  salaryOfferedType: {
                    type: ["string", "null"],
                  },
                  reminderAt: {
                    type: ["string", "null"],
                  },
                  appliedAt: {
                    type: ["string", "null"],
                  },
                  createdAt: {
                    type: ["string", "null"],
                  },
                  updatedAt: {
                    type: ["string", "null"],
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  contacts: {
                    type: "array",
                    items: {
                      type: "object",
                    },
                  },
                  trackable: {
                    type: ["object", "null"],
                  },
                  job: {
                    type: ["object", "null"],
                  },
                },
                required: ["id"],
              },
            },
            statusOrder: {
              type: "array",
              items: {
                type: "string",
              },
            },
            subStatusOrder: {
              type: "object",
            },
            totalCount: {
              type: "integer",
            },
            hasMore: {
              type: "boolean",
            },
            trackerWebUrl: {
              type: "string",
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "Save a job to the tracker",
          readOnlyHint: false,
          destructiveHint: false,
          openWorldHint: false,
        },
      },
      {
        name: "tracker_update",
        title: "Update a tracked job",
        description:
          'Updates details of a tracked job (notes, deadline, salary, tags).\n\n**Input:**\n- `tracked_job_id`: The tracked job ID — `trackedJobs[].id` from tracker_list output, distinct from `trackable.id` and `job.id` (required)\n- `notes`: Updated notes\n- `deadline`: Deadline date (ISO 8601 format)\n- `salary_offered`: Salary amount\n- `salary_offered_type`: Salary type: year, month, week, day, hour\n- `tags`: Comma-separated tags (e.g., "remote,startup,tech")\n- `reminder_at`: Reminder date/time in ISO 8601 format, e.g. "2025-03-15T10:00:00Z" (must be in the future, or empty to clear)\n\n**Output:**\nReturns the updated tracked job.\n',
        inputSchema: {
          type: "object",
          properties: {
            tracked_job_id: {
              type: "string",
              description:
                "The tracked job ID — `trackedJobs[].id` from tracker_list output, distinct from `trackable.id` and `job.id` (required)",
            },
            notes: {
              type: "string",
              description: "Notes about this job",
            },
            deadline: {
              type: "string",
              description: "Deadline date in ISO 8601 format",
            },
            salary_offered: {
              type: "number",
              description: "Salary amount",
            },
            salary_offered_type: {
              type: "string",
              description: "Salary type: year, month, week, day, hour",
            },
            tags: {
              type: "string",
              description: 'Comma-separated tags (e.g., "remote,startup,tech")',
            },
            reminder_at: {
              type: "string",
              description:
                'ISO 8601 datetime, e.g. "2025-03-15T10:00:00Z" (must be in the future, or empty to clear)',
            },
          },
          required: ["tracked_job_id"],
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            trackedJob: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                status: {
                  type: "string",
                },
                subStatus: {
                  type: ["string", "null"],
                },
                notes: {
                  type: ["string", "null"],
                },
                isStarred: {
                  type: "boolean",
                },
                deadline: {
                  type: ["string", "null"],
                },
                salaryOffered: {
                  type: ["number", "null"],
                },
                salaryOfferedType: {
                  type: ["string", "null"],
                },
                reminderAt: {
                  type: ["string", "null"],
                },
                appliedAt: {
                  type: ["string", "null"],
                },
                createdAt: {
                  type: ["string", "null"],
                },
                updatedAt: {
                  type: ["string", "null"],
                },
                tags: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                contacts: {
                  type: "array",
                  items: {
                    type: "object",
                  },
                },
                trackable: {
                  type: ["object", "null"],
                },
              },
              required: ["id"],
            },
            trackedJobs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                  },
                  subStatus: {
                    type: ["string", "null"],
                  },
                  notes: {
                    type: ["string", "null"],
                  },
                  isStarred: {
                    type: "boolean",
                  },
                  deadline: {
                    type: ["string", "null"],
                  },
                  salaryOffered: {
                    type: ["number", "null"],
                  },
                  salaryOfferedType: {
                    type: ["string", "null"],
                  },
                  reminderAt: {
                    type: ["string", "null"],
                  },
                  appliedAt: {
                    type: ["string", "null"],
                  },
                  createdAt: {
                    type: ["string", "null"],
                  },
                  updatedAt: {
                    type: ["string", "null"],
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  contacts: {
                    type: "array",
                    items: {
                      type: "object",
                    },
                  },
                  trackable: {
                    type: ["object", "null"],
                  },
                  job: {
                    type: ["object", "null"],
                  },
                },
                required: ["id"],
              },
            },
            statusOrder: {
              type: "array",
              items: {
                type: "string",
              },
            },
            subStatusOrder: {
              type: "object",
            },
            totalCount: {
              type: "integer",
            },
            hasMore: {
              type: "boolean",
            },
            trackerWebUrl: {
              type: "string",
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "Update a tracked job",
          readOnlyHint: false,
          destructiveHint: true,
          openWorldHint: false,
        },
      },
      {
        name: "tracker_update_status",
        title: "Move a tracked job to another stage",
        description:
          "Updates the status of a tracked job.\n\n**Input:**\n- `tracked_job_id`: The tracked job ID — `trackedJobs[].id` from tracker_list output, distinct from `trackable.id` and `job.id` (required)\n- `status`: New status: saved, applied, interviewing, offered, archived (required)\n- `sub_status`: Sub-status within the main status, valid only for that status (optional): saved: interested, researching_company, preparing_application, ready_to_apply; applied: application_submitted, followed_up; interviewing: interview_scheduled, phone_screen, technical, onsite, final_round, pending_feedback; offered: negotiating, considering, offer_received, accepted; archived: ghosted, rejected_by_company, withdrawn_by_candidate, not_interested, employed_by_this_company, employed_by_another_company\n\n**Output:**\nReturns the updated tracked job.\n",
        inputSchema: {
          type: "object",
          properties: {
            tracked_job_id: {
              type: "string",
              description:
                "The tracked job ID — `trackedJobs[].id` from tracker_list output, distinct from `trackable.id` and `job.id` (required)",
            },
            status: {
              type: "string",
              description:
                "New status: saved, applied, interviewing, offered, archived",
            },
            sub_status: {
              type: "string",
              description:
                "Sub-status within the main status, valid only for that status — saved: interested, researching_company, preparing_application, ready_to_apply; applied: application_submitted, followed_up; interviewing: interview_scheduled, phone_screen, technical, onsite, final_round, pending_feedback; offered: negotiating, considering, offer_received, accepted; archived: ghosted, rejected_by_company, withdrawn_by_candidate, not_interested, employed_by_this_company, employed_by_another_company",
            },
          },
          required: ["tracked_job_id", "status"],
          $schema: "https://json-schema.org/draft/2020-12/schema",
          additionalProperties: false,
        },
        outputSchema: {
          type: "object",
          properties: {
            trackedJob: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                status: {
                  type: "string",
                },
                subStatus: {
                  type: ["string", "null"],
                },
                notes: {
                  type: ["string", "null"],
                },
                isStarred: {
                  type: "boolean",
                },
                deadline: {
                  type: ["string", "null"],
                },
                salaryOffered: {
                  type: ["number", "null"],
                },
                salaryOfferedType: {
                  type: ["string", "null"],
                },
                reminderAt: {
                  type: ["string", "null"],
                },
                appliedAt: {
                  type: ["string", "null"],
                },
                createdAt: {
                  type: ["string", "null"],
                },
                updatedAt: {
                  type: ["string", "null"],
                },
                tags: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                contacts: {
                  type: "array",
                  items: {
                    type: "object",
                  },
                },
                trackable: {
                  type: ["object", "null"],
                },
              },
              required: ["id"],
            },
            trackedJobs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                  },
                  subStatus: {
                    type: ["string", "null"],
                  },
                  notes: {
                    type: ["string", "null"],
                  },
                  isStarred: {
                    type: "boolean",
                  },
                  deadline: {
                    type: ["string", "null"],
                  },
                  salaryOffered: {
                    type: ["number", "null"],
                  },
                  salaryOfferedType: {
                    type: ["string", "null"],
                  },
                  reminderAt: {
                    type: ["string", "null"],
                  },
                  appliedAt: {
                    type: ["string", "null"],
                  },
                  createdAt: {
                    type: ["string", "null"],
                  },
                  updatedAt: {
                    type: ["string", "null"],
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  contacts: {
                    type: "array",
                    items: {
                      type: "object",
                    },
                  },
                  trackable: {
                    type: ["object", "null"],
                  },
                  job: {
                    type: ["object", "null"],
                  },
                },
                required: ["id"],
              },
            },
            statusOrder: {
              type: "array",
              items: {
                type: "string",
              },
            },
            subStatusOrder: {
              type: "object",
            },
            totalCount: {
              type: "integer",
            },
            hasMore: {
              type: "boolean",
            },
            trackerWebUrl: {
              type: "string",
            },
          },
          $schema: "https://json-schema.org/draft/2020-12/schema",
        },
        annotations: {
          title: "Move a tracked job to another stage",
          readOnlyHint: false,
          destructiveHint: true,
          openWorldHint: false,
        },
      },
    ],
  },
};
