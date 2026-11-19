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
        title: "Create an email job alert",
        description:
          "Create a recurring FoundRole email job alert for a role, location, and frequency so new matching roles arrive over time.",
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
            description:
              "Seniority level (intern, junior, mid, senior, staff, principal, team_lead, manager, senior_manager, director, vp, c_level)",
            required: false,
          },
          {
            name: "remote",
            description: 'Restrict to remote roles: "true" or "false"',
            required: false,
          },
        ],
      },
      {
        name: "learn_about_foundrole",
        title: "Learn about a FoundRole feature",
        description:
          "Explain a FoundRole capability (job tracker, H1B salary data, AI job search) from the site's own feature pages.",
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
      },
    ],
  },
  resources: {
    resources: [
      {
        name: "about",
        title: "About FoundRole",
        uri: "foundrole://about",
        description:
          "What FoundRole is, the tools it exposes, and how to use them effectively.",
        mimeType: "text/markdown",
      },
      {
        name: "tracker",
        title: "Tracked applications",
        uri: "foundrole://tracker",
        description:
          "Snapshot of the authenticated user's tracked job applications as Markdown.",
        mimeType: "text/markdown",
      },
      {
        name: "jobs_search_ui",
        title: "Job search results view",
        uri: "ui://foundrole/jobs-search",
        description:
          "MCP Apps widget that renders job-search results as a card grid.",
        mimeType: "text/html;profile=mcp-app",
      },
      {
        name: "jobs_recommendations_ui",
        title: "Job recommendations view",
        uri: "ui://foundrole/jobs-recommendations",
        description:
          "MCP Apps widget that renders personalized FoundRole recommendations as a card grid.",
        mimeType: "text/html;profile=mcp-app",
      },
      {
        name: "jobs_details_ui",
        title: "Job details view",
        uri: "ui://foundrole/jobs-details",
        description:
          "MCP Apps widget that renders a single job detail as a card.",
        mimeType: "text/html;profile=mcp-app",
      },
      {
        name: "jobs_analysis_ui",
        title: "Job analysis and comparison view",
        uri: "ui://foundrole/jobs-analysis",
        description:
          "MCP Apps widget that renders external-job analysis and side-by-side job comparisons.",
        mimeType: "text/html;profile=mcp-app",
      },
      {
        name: "tracker_list_ui",
        title: "Tracked jobs view",
        uri: "ui://foundrole/tracker-list",
        description:
          "MCP Apps widget that renders the user's tracked jobs as a status-grouped list.",
        mimeType: "text/html;profile=mcp-app",
      },
      {
        name: "job_alerts_list_ui",
        title: "Job alerts view",
        uri: "ui://foundrole/job-alerts",
        description:
          "MCP Apps widget that renders the user's job alerts with frequency and unsubscribe controls.",
        mimeType: "text/html;profile=mcp-app",
      },
      {
        name: "resume_check_ui",
        title: "Resume check view",
        uri: "ui://foundrole/resume-check",
        description:
          "MCP Apps widget that renders the resume ATS-readability check: band, parsed facts, findings, and the Resume Studio link.",
        mimeType: "text/html;profile=mcp-app",
      },
      {
        name: "skill://foundrole-job-search/SKILL.md",
        title: "Foundrole job search: SKILL.md",
        uri: "skill://foundrole-job-search/SKILL.md",
        mimeType: "application/octet-stream",
        size: 5326,
      },
      {
        name: "skill://foundrole-job-search/agents/openai.yaml",
        title: "Foundrole job search: agents/openai.yaml",
        uri: "skill://foundrole-job-search/agents/openai.yaml",
        mimeType: "text/yaml",
        size: 513,
      },
      {
        name: "skill://foundrole-job-search/references/app-capabilities.md",
        title: "Foundrole job search: references/app-capabilities.md",
        uri: "skill://foundrole-job-search/references/app-capabilities.md",
        mimeType: "application/octet-stream",
        size: 4331,
      },
      {
        name: "skill://foundrole-job-search/references/application-management.md",
        title: "Foundrole job search: references/application-management.md",
        uri: "skill://foundrole-job-search/references/application-management.md",
        mimeType: "application/octet-stream",
        size: 5997,
      },
      {
        name: "skill://foundrole-job-search/references/monitoring.md",
        title: "Foundrole job search: references/monitoring.md",
        uri: "skill://foundrole-job-search/references/monitoring.md",
        mimeType: "application/octet-stream",
        size: 7284,
      },
      {
        name: "skill://foundrole-job-search/references/profile-recommendations.md",
        title: "Foundrole job search: references/profile-recommendations.md",
        uri: "skill://foundrole-job-search/references/profile-recommendations.md",
        mimeType: "application/octet-stream",
        size: 2751,
      },
      {
        name: "skill://foundrole-job-search/references/search-criteria.md",
        title: "Foundrole job search: references/search-criteria.md",
        uri: "skill://foundrole-job-search/references/search-criteria.md",
        mimeType: "application/octet-stream",
        size: 1993,
      },
      {
        name: "skill://foundrole-job-search/references/search-recovery.md",
        title: "Foundrole job search: references/search-recovery.md",
        uri: "skill://foundrole-job-search/references/search-recovery.md",
        mimeType: "application/octet-stream",
        size: 2652,
      },
      {
        name: "skill://foundrole-resume-check/SKILL.md",
        title: "Foundrole resume check: SKILL.md",
        uri: "skill://foundrole-resume-check/SKILL.md",
        mimeType: "application/octet-stream",
        size: 5628,
      },
      {
        name: "skill://foundrole-resume-check/agents/openai.yaml",
        title: "Foundrole resume check: agents/openai.yaml",
        uri: "skill://foundrole-resume-check/agents/openai.yaml",
        mimeType: "text/yaml",
        size: 485,
      },
      {
        name: "skill://foundrole-resume-workflows/SKILL.md",
        title: "Foundrole resume workflows: SKILL.md",
        uri: "skill://foundrole-resume-workflows/SKILL.md",
        mimeType: "application/octet-stream",
        size: 2801,
      },
    ],
  },
  resourceTemplates: {
    resourceTemplates: [
      {
        name: "job",
        title: "Job posting",
        uriTemplate: "foundrole://job/{id}",
        description:
          "Full detail of a FoundRole job posting as Markdown, addressable by job id.",
        mimeType: "text/markdown",
      },
    ],
  },
  tools: {
    tools: [
      {
        name: "tracker_list",
        title: "List tracked jobs",
        description:
          "Lists the user's tracked jobs with optional filtering and pagination.\n\n**Input:**\n- `status`: Filter by status (saved, applied, interviewing, offered, archived)\n- `limit`: Number of results per page (default 20, max 50)\n- `offset`: Number of results to skip (default 0)\n\n**Output:**\nReturns a list of tracked jobs grouped by status with pagination info. A tracked FoundRole job's\n`job.estimatedSalary` is FoundRole's pay estimate; the response attributes it once, in\n`figureSources`: `source` (FoundRole), `methodologyUrl` (the FoundRole page that\nexplains how it is computed) and the estimate's `basis`, whose posting count is each job's\nestimatedSalary.sampleSize and whose match is each job's estimatedSalary.basedOn.\n\nEach tracked job carries `daysSinceApplied`, the whole days since its applied date in the user's time\nzone. A job still at the applied status also carries `followUpDay`: the latest follow-up point it has\nreached (7, 14 and 21 days after applying), null before the first one. `appliedDateUnknown` is\ntrue for a job at the applied status with no stored applied date, unless the person said they do not\nremember it: FoundRole never fills that date in by itself, it comes from the person, and tracker_update\nstores it in `applied_at` or, when they do not remember it, in `applied_date_declined`. FoundRole never moves or\narchives a tracked job by itself.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
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
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
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
                appliedDateUnknown: {
                  type: "boolean",
                  description:
                    "True for a job at the applied status with no stored applied date, unless the person said they do not remember it. FoundRole never fills that date in by itself; it comes from the person and tracker_update stores it in applied_at, or records in applied_date_declined that they do not remember it.",
                },
                daysSinceApplied: {
                  type: ["integer", "null"],
                  description:
                    "Whole days since the applied date, counted in the user's time zone; null without an applied date.",
                },
                followUpDay: {
                  type: ["integer", "null"],
                  enum: [7, 14, 21, null],
                  description:
                    "Latest follow-up point, in days after applying, that a job still at the applied status has reached; null before the first point and for every other status. FoundRole never moves or archives a job by itself.",
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
                  appliedDateUnknown: {
                    type: "boolean",
                    description:
                      "True for a job at the applied status with no stored applied date, unless the person said they do not remember it. FoundRole never fills that date in by itself; it comes from the person and tracker_update stores it in applied_at, or records in applied_date_declined that they do not remember it.",
                  },
                  daysSinceApplied: {
                    type: ["integer", "null"],
                    description:
                      "Whole days since the applied date, counted in the user's time zone; null without an applied date.",
                  },
                  followUpDay: {
                    type: ["integer", "null"],
                    enum: [7, 14, 21, null],
                    description:
                      "Latest follow-up point, in days after applying, that a job still at the applied status has reached; null before the first point and for every other status. FoundRole never moves or archives a job by itself.",
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
            figureSources: {
              type: ["object", "null"],
              properties: {
                source: {
                  type: "string",
                  enum: ["FoundRole"],
                },
                methodologyUrl: {
                  type: "string",
                },
                estimatedSalary: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                ghostScore: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                visaRecords: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                    falseMeans: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
        annotations: {
          destructiveHint: false,
          idempotentHint: false,
          openWorldHint: false,
          readOnlyHint: true,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "tracker_add",
        title: "Save a job to the tracker",
        description:
          'Tracks a job from jobs_search results in the user\'s job tracker, identified by its job_id. For a\njob found elsewhere on the open web (with a URL but no jobs_search job_id), tracker_add_external\nis the right tool instead.\n\nFields:\n- `job_id`: the job ID from jobs_search results (required)\n- `status`: initial status (saved, applied, interviewing, offered, archived); defaults to "saved"\n- `sub_status`: sub-status within the main status: saved: interested, researching_company, preparing_application, ready_to_apply; applied: application_submitted, followed_up; interviewing: interview_scheduled, phone_screen, technical, onsite, final_round, pending_feedback; offered: negotiating, considering, offer_received, accepted; archived: ghosted, rejected_by_company, withdrawn_by_candidate, not_interested, employed_by_this_company, employed_by_another_company\n- `notes`: notes about the job\n\nReturns the tracked job with its details. Repeated saves return the existing tracked job. A job\nthat was previously removed from the tracker is restored with its earlier status and notes.\n',
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
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
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
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
                appliedDateUnknown: {
                  type: "boolean",
                  description:
                    "True for a job at the applied status with no stored applied date, unless the person said they do not remember it. FoundRole never fills that date in by itself; it comes from the person and tracker_update stores it in applied_at, or records in applied_date_declined that they do not remember it.",
                },
                daysSinceApplied: {
                  type: ["integer", "null"],
                  description:
                    "Whole days since the applied date, counted in the user's time zone; null without an applied date.",
                },
                followUpDay: {
                  type: ["integer", "null"],
                  enum: [7, 14, 21, null],
                  description:
                    "Latest follow-up point, in days after applying, that a job still at the applied status has reached; null before the first point and for every other status. FoundRole never moves or archives a job by itself.",
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
                  appliedDateUnknown: {
                    type: "boolean",
                    description:
                      "True for a job at the applied status with no stored applied date, unless the person said they do not remember it. FoundRole never fills that date in by itself; it comes from the person and tracker_update stores it in applied_at, or records in applied_date_declined that they do not remember it.",
                  },
                  daysSinceApplied: {
                    type: ["integer", "null"],
                    description:
                      "Whole days since the applied date, counted in the user's time zone; null without an applied date.",
                  },
                  followUpDay: {
                    type: ["integer", "null"],
                    enum: [7, 14, 21, null],
                    description:
                      "Latest follow-up point, in days after applying, that a job still at the applied status has reached; null before the first point and for every other status. FoundRole never moves or archives a job by itself.",
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
            figureSources: {
              type: ["object", "null"],
              properties: {
                source: {
                  type: "string",
                  enum: ["FoundRole"],
                },
                methodologyUrl: {
                  type: "string",
                },
                estimatedSalary: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                ghostScore: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                visaRecords: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                    falseMeans: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
        annotations: {
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
          readOnlyHint: false,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "tracker_add_external",
        title: "Save a job from another site to the tracker",
        description:
          "Saves a job posting found anywhere on the open web into the user's tracker. For jobs that came\nfrom jobs_search results, tracker_add (which takes a job_id) is the right tool instead. A job\nseen elsewhere in the conversation needs no prior jobs_search call — its URL and details from\nthe conversation are sufficient input.\n\n`url`, `company_name`, `title_name`, `location_name`, and `description` identify the posting\nand are the only required fields. Every structured fact field (salary, dates, employment type,\neducation, experience) is optional: a fact the source does not state is simply omitted (or\nnull), and FoundRole's own extractors derive missing salary, employment, work-arrangement,\neducation, experience, skills, benefits, and bonuses from the description. A save never waits\non facts the source did not provide. The optional `client_extraction` object carries\nevidence-backed skills, technology, benefits, bonuses, seniority, industry, management,\nclearance, visa, and remote-scope labels when source excerpts for them exist; FoundRole\nvalidates and stores those labels separately.\n\nFields:\n- `url`: the job posting's direct URL (required; not a company homepage)\n- `company_name`: company name (required)\n- `title_name`: job title (required)\n- `location_name`: location, e.g. \"New York, NY\" (required)\n- `description`: the posting's description from the source result; a short summary is acceptable (required)\n- `salary_min_value` / `salary_max_value`: salary range bounds (numbers)\n- `salary_value`: a single salary figure when there is no range (number)\n- `posted_at`: ISO 8601 posting date\n- `salary_currency`: ISO 4217 currency code\n- `salary_type`: one of year, month, week, day, hour\n- `employment_type`: array of full_time, part_time, contractor, temporary, intern, volunteer, per_diem, other\n- `work_location_type`: one of on_site, remote, hybrid\n- `education_requirements`: array of no_requirements, high_school, associate_degree, bachelor_degree, professional_certificate, postgraduate_degree\n- `experience_months`: minimum required experience in months (number)\n- `client_extraction`: evidence-backed extraction object; fields without source evidence are omitted\n- `status`: initial tracking status (saved, applied, interviewing, offered, archived); defaults to \"saved\"\n- `sub_status`: sub-status within the main status: saved: interested, researching_company, preparing_application, ready_to_apply; applied: application_submitted, followed_up; interviewing: interview_scheduled, phone_screen, technical, onsite, final_round, pending_feedback; offered: negotiating, considering, offer_received, accepted; archived: ghosted, rejected_by_company, withdrawn_by_candidate, not_interested, employed_by_this_company, employed_by_another_company\n- `notes`: notes about the job\n\nReturns the tracked job. Repeated saves return the existing tracked job.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
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
              format: "date-time",
              description:
                "Posting date as ISO 8601, when the source states it",
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
              enum: [null, "year", "month", "week", "day", "hour"],
              description: "Salary period: year, month, week, day, hour",
            },
            salary_currency: {
              type: ["string", "null"],
              description: "ISO 4217 salary currency code, when stated",
            },
            employment_type: {
              type: ["array", "null"],
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
              description:
                "Employment types: full_time, part_time, contractor, temporary, intern, volunteer, per_diem, other",
            },
            work_location_type: {
              type: ["string", "null"],
              enum: [null, "on_site", "remote", "hybrid"],
              description: "Work arrangement: on_site, remote, hybrid",
            },
            education_requirements: {
              type: ["array", "null"],
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
              description:
                "Education requirements: no_requirements, high_school, associate_degree, bachelor_degree, professional_certificate, postgraduate_degree",
            },
            experience_months: {
              type: ["integer", "null"],
              description: "Minimum required experience in months, when stated",
            },
            client_extraction: {
              type: ["object", "null"],
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
              description:
                "Evidence-backed facts extracted by the client model from the posting; non-null evidence is a short source excerpt rather than an inference. Fields absent from the source are omitted or null.",
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
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
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
                appliedDateUnknown: {
                  type: "boolean",
                  description:
                    "True for a job at the applied status with no stored applied date, unless the person said they do not remember it. FoundRole never fills that date in by itself; it comes from the person and tracker_update stores it in applied_at, or records in applied_date_declined that they do not remember it.",
                },
                daysSinceApplied: {
                  type: ["integer", "null"],
                  description:
                    "Whole days since the applied date, counted in the user's time zone; null without an applied date.",
                },
                followUpDay: {
                  type: ["integer", "null"],
                  enum: [7, 14, 21, null],
                  description:
                    "Latest follow-up point, in days after applying, that a job still at the applied status has reached; null before the first point and for every other status. FoundRole never moves or archives a job by itself.",
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
                  appliedDateUnknown: {
                    type: "boolean",
                    description:
                      "True for a job at the applied status with no stored applied date, unless the person said they do not remember it. FoundRole never fills that date in by itself; it comes from the person and tracker_update stores it in applied_at, or records in applied_date_declined that they do not remember it.",
                  },
                  daysSinceApplied: {
                    type: ["integer", "null"],
                    description:
                      "Whole days since the applied date, counted in the user's time zone; null without an applied date.",
                  },
                  followUpDay: {
                    type: ["integer", "null"],
                    enum: [7, 14, 21, null],
                    description:
                      "Latest follow-up point, in days after applying, that a job still at the applied status has reached; null before the first point and for every other status. FoundRole never moves or archives a job by itself.",
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
            figureSources: {
              type: ["object", "null"],
              properties: {
                source: {
                  type: "string",
                  enum: ["FoundRole"],
                },
                methodologyUrl: {
                  type: "string",
                },
                estimatedSalary: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                ghostScore: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                visaRecords: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                    falseMeans: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
        annotations: {
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
          readOnlyHint: false,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "tracker_update",
        title: "Update a tracked job",
        description:
          'Edits tracked-job fields in conversation, including notes, applied date, application deadline, salary and tags.\nApplication status and sub-status use tracker_update_status. Scheduling a follow-up reminder with confirmation\nuses reminder_set. The reminder_at field still supports direct edits and clearing.\n\n**Input:**\n- `tracked_job_id`: The tracked job ID — `trackedJobs[].id` from tracker_list output, distinct from `trackable.id` and `job.id` (required)\n- `notes`: Updated notes\n- `applied_at`: The day the person applied, as they stated it: an ISO 8601 date or datetime, e.g. "2025-03-10" (a date without a time is read in the user\'s time zone; a future date is rejected; empty clears it). It is the value behind `appliedDateUnknown` in tracker_list output.\n- `applied_date_declined`: True when the person said they do not remember when they applied; FoundRole then stops listing the application as having no applied date (`appliedDateUnknown`). False takes that back. Saving `applied_at` takes it back too.\n- `deadline`: Deadline date (ISO 8601 format)\n- `salary_offered`: Salary amount\n- `salary_offered_type`: Salary type: year, month, week, day, hour\n- `tags`: Comma-separated tags (e.g., "remote,startup,tech")\n- `reminder_at`: Reminder date/time in ISO 8601 format, e.g. "2025-03-15T10:00:00Z" (must be in the future, or empty to clear)\n\n**Output:**\nReturns the updated tracked job.\n',
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
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
            applied_at: {
              type: "string",
              description:
                'The day the person applied, as they stated it: an ISO 8601 date or datetime, e.g. "2025-03-10" (a date without a time is read in the user\'s time zone; a future date is rejected; empty clears it). It is the value behind `appliedDateUnknown` in tracker_list output.',
            },
            applied_date_declined: {
              type: "boolean",
              description:
                "True when the person said they do not remember when they applied; FoundRole then stops listing the application as having no applied date (`appliedDateUnknown`). False takes that back. Saving `applied_at` takes it back too.",
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
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
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
                appliedDateUnknown: {
                  type: "boolean",
                  description:
                    "True for a job at the applied status with no stored applied date, unless the person said they do not remember it. FoundRole never fills that date in by itself; it comes from the person and tracker_update stores it in applied_at, or records in applied_date_declined that they do not remember it.",
                },
                daysSinceApplied: {
                  type: ["integer", "null"],
                  description:
                    "Whole days since the applied date, counted in the user's time zone; null without an applied date.",
                },
                followUpDay: {
                  type: ["integer", "null"],
                  enum: [7, 14, 21, null],
                  description:
                    "Latest follow-up point, in days after applying, that a job still at the applied status has reached; null before the first point and for every other status. FoundRole never moves or archives a job by itself.",
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
                  appliedDateUnknown: {
                    type: "boolean",
                    description:
                      "True for a job at the applied status with no stored applied date, unless the person said they do not remember it. FoundRole never fills that date in by itself; it comes from the person and tracker_update stores it in applied_at, or records in applied_date_declined that they do not remember it.",
                  },
                  daysSinceApplied: {
                    type: ["integer", "null"],
                    description:
                      "Whole days since the applied date, counted in the user's time zone; null without an applied date.",
                  },
                  followUpDay: {
                    type: ["integer", "null"],
                    enum: [7, 14, 21, null],
                    description:
                      "Latest follow-up point, in days after applying, that a job still at the applied status has reached; null before the first point and for every other status. FoundRole never moves or archives a job by itself.",
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
            figureSources: {
              type: ["object", "null"],
              properties: {
                source: {
                  type: "string",
                  enum: ["FoundRole"],
                },
                methodologyUrl: {
                  type: "string",
                },
                estimatedSalary: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                ghostScore: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                visaRecords: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                    falseMeans: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
        annotations: {
          destructiveHint: true,
          idempotentHint: false,
          openWorldHint: false,
          readOnlyHint: false,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "tracker_update_status",
        title: "Move a tracked job to another stage",
        description:
          "Updates the status of a tracked job.\n\n**Input:**\n- `tracked_job_id`: The tracked job ID — `trackedJobs[].id` from tracker_list output, distinct from `trackable.id` and `job.id` (required)\n- `status`: New status: saved, applied, interviewing, offered, archived (required)\n- `sub_status`: Sub-status within the main status, valid only for that status (optional): saved: interested, researching_company, preparing_application, ready_to_apply; applied: application_submitted, followed_up; interviewing: interview_scheduled, phone_screen, technical, onsite, final_round, pending_feedback; offered: negotiating, considering, offer_received, accepted; archived: ghosted, rejected_by_company, withdrawn_by_candidate, not_interested, employed_by_this_company, employed_by_another_company\n\n**Output:**\nReturns the updated tracked job.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
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
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
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
                appliedDateUnknown: {
                  type: "boolean",
                  description:
                    "True for a job at the applied status with no stored applied date, unless the person said they do not remember it. FoundRole never fills that date in by itself; it comes from the person and tracker_update stores it in applied_at, or records in applied_date_declined that they do not remember it.",
                },
                daysSinceApplied: {
                  type: ["integer", "null"],
                  description:
                    "Whole days since the applied date, counted in the user's time zone; null without an applied date.",
                },
                followUpDay: {
                  type: ["integer", "null"],
                  enum: [7, 14, 21, null],
                  description:
                    "Latest follow-up point, in days after applying, that a job still at the applied status has reached; null before the first point and for every other status. FoundRole never moves or archives a job by itself.",
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
                  appliedDateUnknown: {
                    type: "boolean",
                    description:
                      "True for a job at the applied status with no stored applied date, unless the person said they do not remember it. FoundRole never fills that date in by itself; it comes from the person and tracker_update stores it in applied_at, or records in applied_date_declined that they do not remember it.",
                  },
                  daysSinceApplied: {
                    type: ["integer", "null"],
                    description:
                      "Whole days since the applied date, counted in the user's time zone; null without an applied date.",
                  },
                  followUpDay: {
                    type: ["integer", "null"],
                    enum: [7, 14, 21, null],
                    description:
                      "Latest follow-up point, in days after applying, that a job still at the applied status has reached; null before the first point and for every other status. FoundRole never moves or archives a job by itself.",
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
            figureSources: {
              type: ["object", "null"],
              properties: {
                source: {
                  type: "string",
                  enum: ["FoundRole"],
                },
                methodologyUrl: {
                  type: "string",
                },
                estimatedSalary: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                ghostScore: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                visaRecords: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                    falseMeans: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
        annotations: {
          destructiveHint: true,
          idempotentHint: false,
          openWorldHint: false,
          readOnlyHint: false,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "tracker_remove",
        title: "Remove a job from the tracker",
        description:
          "Removes a job from the user's job tracker.\n\n**Input:**\n- `tracked_job_id`: The tracked job ID — `trackedJobs[].id` from tracker_list output, distinct from `trackable.id` and `job.id` (required)\n\n**Output:**\nConfirms the job was removed from tracking.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
          properties: {
            tracked_job_id: {
              type: "string",
              description:
                "The tracked job ID — `trackedJobs[].id` from tracker_list output, distinct from `trackable.id` and `job.id` (required)",
            },
          },
          required: ["tracked_job_id"],
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
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
                appliedDateUnknown: {
                  type: "boolean",
                  description:
                    "True for a job at the applied status with no stored applied date, unless the person said they do not remember it. FoundRole never fills that date in by itself; it comes from the person and tracker_update stores it in applied_at, or records in applied_date_declined that they do not remember it.",
                },
                daysSinceApplied: {
                  type: ["integer", "null"],
                  description:
                    "Whole days since the applied date, counted in the user's time zone; null without an applied date.",
                },
                followUpDay: {
                  type: ["integer", "null"],
                  enum: [7, 14, 21, null],
                  description:
                    "Latest follow-up point, in days after applying, that a job still at the applied status has reached; null before the first point and for every other status. FoundRole never moves or archives a job by itself.",
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
                  appliedDateUnknown: {
                    type: "boolean",
                    description:
                      "True for a job at the applied status with no stored applied date, unless the person said they do not remember it. FoundRole never fills that date in by itself; it comes from the person and tracker_update stores it in applied_at, or records in applied_date_declined that they do not remember it.",
                  },
                  daysSinceApplied: {
                    type: ["integer", "null"],
                    description:
                      "Whole days since the applied date, counted in the user's time zone; null without an applied date.",
                  },
                  followUpDay: {
                    type: ["integer", "null"],
                    enum: [7, 14, 21, null],
                    description:
                      "Latest follow-up point, in days after applying, that a job still at the applied status has reached; null before the first point and for every other status. FoundRole never moves or archives a job by itself.",
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
            figureSources: {
              type: ["object", "null"],
              properties: {
                source: {
                  type: "string",
                  enum: ["FoundRole"],
                },
                methodologyUrl: {
                  type: "string",
                },
                estimatedSalary: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                ghostScore: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                visaRecords: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                    falseMeans: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
        annotations: {
          destructiveHint: true,
          idempotentHint: false,
          openWorldHint: false,
          readOnlyHint: false,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "reminder_set",
        title: "Set a follow-up reminder",
        description:
          'Sets a reminder for a tracked job. Sends a confirmation email with .ics calendar attachment.\n\n**Input:**\n- `tracked_job_id`: The tracked job ID — `trackedJobs[].id` from tracker_list output, distinct from `trackable.id` and `job.id` (required)\n- `remind_at`: Reminder date/time in ISO 8601 format, e.g. "2025-03-15T10:00:00Z" (required, must be in the future)\n\n**Output:**\nReturns the updated tracked job with reminderAt field.\n',
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
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
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
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
                appliedDateUnknown: {
                  type: "boolean",
                  description:
                    "True for a job at the applied status with no stored applied date, unless the person said they do not remember it. FoundRole never fills that date in by itself; it comes from the person and tracker_update stores it in applied_at, or records in applied_date_declined that they do not remember it.",
                },
                daysSinceApplied: {
                  type: ["integer", "null"],
                  description:
                    "Whole days since the applied date, counted in the user's time zone; null without an applied date.",
                },
                followUpDay: {
                  type: ["integer", "null"],
                  enum: [7, 14, 21, null],
                  description:
                    "Latest follow-up point, in days after applying, that a job still at the applied status has reached; null before the first point and for every other status. FoundRole never moves or archives a job by itself.",
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
                  appliedDateUnknown: {
                    type: "boolean",
                    description:
                      "True for a job at the applied status with no stored applied date, unless the person said they do not remember it. FoundRole never fills that date in by itself; it comes from the person and tracker_update stores it in applied_at, or records in applied_date_declined that they do not remember it.",
                  },
                  daysSinceApplied: {
                    type: ["integer", "null"],
                    description:
                      "Whole days since the applied date, counted in the user's time zone; null without an applied date.",
                  },
                  followUpDay: {
                    type: ["integer", "null"],
                    enum: [7, 14, 21, null],
                    description:
                      "Latest follow-up point, in days after applying, that a job still at the applied status has reached; null before the first point and for every other status. FoundRole never moves or archives a job by itself.",
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
            figureSources: {
              type: ["object", "null"],
              properties: {
                source: {
                  type: "string",
                  enum: ["FoundRole"],
                },
                methodologyUrl: {
                  type: "string",
                },
                estimatedSalary: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                ghostScore: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                visaRecords: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                    falseMeans: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
        annotations: {
          destructiveHint: true,
          idempotentHint: false,
          openWorldHint: false,
          readOnlyHint: false,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "reminder_list",
        title: "List reminders",
        description:
          "Lists tracked jobs that have reminders set, ordered by reminder time (soonest first).\n\n**Input:**\n- `limit`: Number of results to return (default 20, max 50)\n\n**Output:**\nReturns a list of tracked jobs with active reminders.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
          properties: {
            limit: {
              type: "integer",
              description: "Number of results to return (default 20, max 50)",
              minimum: 1,
              maximum: 50,
            },
          },
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
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
                  appliedDateUnknown: {
                    type: "boolean",
                    description:
                      "True for a job at the applied status with no stored applied date, unless the person said they do not remember it. FoundRole never fills that date in by itself; it comes from the person and tracker_update stores it in applied_at, or records in applied_date_declined that they do not remember it.",
                  },
                  daysSinceApplied: {
                    type: ["integer", "null"],
                    description:
                      "Whole days since the applied date, counted in the user's time zone; null without an applied date.",
                  },
                  followUpDay: {
                    type: ["integer", "null"],
                    enum: [7, 14, 21, null],
                    description:
                      "Latest follow-up point, in days after applying, that a job still at the applied status has reached; null before the first point and for every other status. FoundRole never moves or archives a job by itself.",
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
        },
        annotations: {
          destructiveHint: false,
          idempotentHint: false,
          openWorldHint: false,
          readOnlyHint: true,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "reminder_delete",
        title: "Delete a reminder",
        description:
          "Deletes a reminder from a tracked job.\n\n**Input:**\n- `tracked_job_id`: The tracked job ID — `trackedJobs[].id` from tracker_list output, distinct from `trackable.id` and `job.id` (required)\n\n**Output:**\nReturns the updated tracked job with reminderAt cleared.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
          properties: {
            tracked_job_id: {
              type: "string",
              description:
                "The tracked job ID — `trackedJobs[].id` from tracker_list output, distinct from `trackable.id` and `job.id` (required)",
            },
          },
          required: ["tracked_job_id"],
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
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
                appliedDateUnknown: {
                  type: "boolean",
                  description:
                    "True for a job at the applied status with no stored applied date, unless the person said they do not remember it. FoundRole never fills that date in by itself; it comes from the person and tracker_update stores it in applied_at, or records in applied_date_declined that they do not remember it.",
                },
                daysSinceApplied: {
                  type: ["integer", "null"],
                  description:
                    "Whole days since the applied date, counted in the user's time zone; null without an applied date.",
                },
                followUpDay: {
                  type: ["integer", "null"],
                  enum: [7, 14, 21, null],
                  description:
                    "Latest follow-up point, in days after applying, that a job still at the applied status has reached; null before the first point and for every other status. FoundRole never moves or archives a job by itself.",
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
                  appliedDateUnknown: {
                    type: "boolean",
                    description:
                      "True for a job at the applied status with no stored applied date, unless the person said they do not remember it. FoundRole never fills that date in by itself; it comes from the person and tracker_update stores it in applied_at, or records in applied_date_declined that they do not remember it.",
                  },
                  daysSinceApplied: {
                    type: ["integer", "null"],
                    description:
                      "Whole days since the applied date, counted in the user's time zone; null without an applied date.",
                  },
                  followUpDay: {
                    type: ["integer", "null"],
                    enum: [7, 14, 21, null],
                    description:
                      "Latest follow-up point, in days after applying, that a job still at the applied status has reached; null before the first point and for every other status. FoundRole never moves or archives a job by itself.",
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
            figureSources: {
              type: ["object", "null"],
              properties: {
                source: {
                  type: "string",
                  enum: ["FoundRole"],
                },
                methodologyUrl: {
                  type: "string",
                },
                estimatedSalary: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                ghostScore: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                visaRecords: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                    falseMeans: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
        annotations: {
          destructiveHint: true,
          idempotentHint: false,
          openWorldHint: false,
          readOnlyHint: false,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "job_alert_subscribe",
        title: "Create a job alert",
        description:
          'Subscribes the authenticated user to job alerts for a specific saved job search.\n\n**Input:**\n- `job_search_id`: The job search identifier to subscribe to (required). Accepts either the job search UUID or the composite job ID returned by `jobs_search` / `jobs_details` (format: "seo_id--job_search_id").\n- `delivery`: digest, fast (optional). Fast email is not available on every account and needs enough new matches for the exact saved search. Unsupported fast selection returns a validation error and keeps the existing delivery mode.\n- `frequency`: Alert frequency — one of daily, weekly, monthly (optional, defaults to "weekly")\n\n**Output:**\nReturns the created or updated job alert with id, status, and frequency, beside the user\'s current job alerts in the same shape and order as the first page of `job_alert_list`.\nIdempotent: calling this tool for an already-subscribed search updates the existing alert without creating a duplicate. An existing active alert with the same query text, location, company and filters, and at least the same radius, is returned instead of a new one, with the requested frequency applied to it.\nA user keeps one alert per query and place. When they already have an active alert for the same query and place with other filters, radius or sort, this tool changes that alert to the new search instead of adding a second one: the returned `jobAlert.id` is the existing alert, `jobSearchId` is the new search, and `message` says the alert was changed.\n\n**Delivery:**\nDigest alerts arrive together in one email, one section per query and place. Opted-in fast alerts are sent separately while the account has them: matches found overnight arrive in one morning email at the hour the user usually starts the day, and later matches follow at least 3 hours after the previous email, up to 3 emails per local day. A fast email carries only jobs found since the previous one, never a job already sent to the user, a role from the same employer sent in the last 30 days, or a job in the user\'s tracker. When the account no longer has fast alerts they return to the ordinary digest and retain the saved fast preference. Each section applies every filter and the sort of its saved search, the same way `jobs_search` does for that account. A job appears in the digest once, even when it matches several alerts, and no email is sent when there are no new matches. The digest follows the most frequent alert, and arrives less often when the user has not used FoundRole for a while.\n',
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
          properties: {
            job_search_id: {
              type: "string",
              description:
                'Job search UUID or composite job id ("seo_id--job_search_id") from jobs_search results',
            },
            delivery: {
              type: "string",
              description:
                "Delivery mode: digest, fast; fast is not available on every account and needs a qualifying search",
            },
            frequency: {
              type: "string",
              description:
                'Alert frequency: daily, weekly, monthly (defaults to "weekly")',
            },
          },
          required: ["job_search_id"],
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
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
                delivery: {
                  type: "string",
                },
                fastActive: {
                  type: "boolean",
                },
                subscriptionSource: {
                  type: "string",
                },
              },
              required: ["id"],
            },
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
                  delivery: {
                    type: "string",
                  },
                  fastActive: {
                    type: "boolean",
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
        },
        annotations: {
          destructiveHint: true,
          idempotentHint: true,
          openWorldHint: false,
          readOnlyHint: false,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "job_alert_unsubscribe",
        title: "Unsubscribe from a job alert",
        description:
          'Unsubscribes the authenticated user from job alerts for a specific job search.\n\n**Input:**\n- `job_search_id`: The job search identifier to unsubscribe from (required). Accepts either the job search UUID or the composite job ID returned by `jobs_search` / `jobs_details` (format: "seo_id--job_search_id").\n\n**Output:**\nConfirms the alert has been unsubscribed, beside the user\'s current job alerts in the same shape and order as the first page of `job_alert_list`.\nIdempotent: returns success even when the user was not subscribed or is already unsubscribed.\n',
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
          properties: {
            job_search_id: {
              type: "string",
              description:
                'Job search UUID or composite job id ("seo_id--job_search_id") from jobs_search results',
            },
          },
          required: ["job_search_id"],
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          properties: {
            success: {
              type: "boolean",
            },
            message: {
              type: "string",
            },
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
                  delivery: {
                    type: "string",
                  },
                  fastActive: {
                    type: "boolean",
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
          required: ["success"],
        },
        annotations: {
          destructiveHint: true,
          idempotentHint: false,
          openWorldHint: false,
          readOnlyHint: false,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "job_alert_unsubscribe_all",
        title: "Unsubscribe from all job alerts",
        description:
          "Unsubscribes the authenticated user from ALL of their job alerts at once, across every\nsubscription source (regular, company page, MCP).\n\n**Input:**\n- `confirm`: Must be `true` to execute. The call is rejected when omitted or not true — this\n  guards against an unintended bulk unsubscribe.\n\n**Output:**\nConfirms how many alerts were unsubscribed, beside the user's current job alerts in the same shape and order as the first page of `job_alert_list`.\nIdempotent: returns success even when the user has no active alerts.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
          properties: {
            confirm: {
              type: "boolean",
              description:
                "Set to true to confirm unsubscribing from every alert; the call is rejected otherwise",
            },
          },
          required: ["confirm"],
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          properties: {
            success: {
              type: "boolean",
            },
            message: {
              type: "string",
            },
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
                  delivery: {
                    type: "string",
                  },
                  fastActive: {
                    type: "boolean",
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
          required: ["success"],
        },
        annotations: {
          destructiveHint: true,
          idempotentHint: true,
          openWorldHint: false,
          readOnlyHint: false,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "job_alert_list",
        title: "List job alerts",
        description:
          "Lists the authenticated user's job alerts across all subscription sources (regular, company page, MCP).\n\n**Input:**\n- `status`: Filter by status — one of pending, active, unsubscribed (optional, default: all statuses)\n- `limit`: Number of results to return (default 20, max 50)\n- `offset`: Number of results to skip (default 0)\n\n**Output:**\nReturns the user's job alerts with pagination info and a summary of the underlying job search\n(query, location, company where available).\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
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
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
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
                  delivery: {
                    type: "string",
                  },
                  fastActive: {
                    type: "boolean",
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
        },
        annotations: {
          destructiveHint: false,
          idempotentHint: false,
          openWorldHint: false,
          readOnlyHint: true,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "jobs_search",
        title: "Search jobs",
        description:
          "Searches current job listings against explicit criteria such as a role, employer, location, or posting date.\njobs_recommendations leads with fit to the account's profile and saved search preferences.\n\nThe query is the full job title or role: \"Ruby Developer\" rather than\na bare keyword like \"Ruby\", which is too broad and matches unrelated fields. roles_lookup turns\nwords that name no exact role into FoundRole roles with their job counts. Results may be\nfiltered by location, company, and how recently a job was posted.\n\nEach result carries an `id` and `resultItemId`; jobs_details takes that `id` with the corresponding\n`result_item_id` and returns the job's full description, requirements, and benefits. One call returns one answer: there is no next page, and the\nresponse links to the same search on the FoundRole website for the rest of the list.\n\nWith a ready profile, an omitted query uses the same personalized feed as jobs_recommendations and\nthe website; a query is a general job search that preserves the explicit query and filters.\nThe effective role, when available, appears in savedRole. Its explicitlySaved field identifies\nan account selection. The role can otherwise be inferred from the profile. A search that names\na different role leaves the account's selections unchanged. A search without a location runs in the place saved on the account, widened to its\ncountry when few jobs are posted near that city; an account with no saved place searches where the\nuser is now when the client reports it, otherwise the default country. Such a response names the place\nsearched as searchedPlace. A response for a request that names no exact role can carry a guide\nquestion the widget shows to the user. Job details include\nFoundRole salary benchmarks, H-1B sponsorship signals, E-Verify status, and job-trust analysis;\nlist-level employer signals follow the user's current entitlements. Pay estimates, real-or-ghost\ngrades and visa records are FoundRole figures, attributed once per response in\n`figureSources`: `source` (FoundRole), `methodologyUrl` (the FoundRole page\nthat explains how they are computed) and, for each kind of figure the listed jobs carry\n(`estimatedSalary`, `ghostScore`, and `visaRecords` for h1bSponsor, eVerify\nand h1bPetitions), its `basis` (what it is computed from) and section link; knowledge_search returns\nthe same explanation. A pay estimate's posting count is that job's estimatedSalary.sampleSize, and\nestimatedSalary.basedOn names the postings it was built from (the same role in the same area, or a\nwider match when that area has too few). A false\nh1bSponsor or eVerify means no record was found in those files, not that the employer does not\nsponsor; a job without them carries no visa claim.\n\nConstraints in the user's request — remote-only work, H1B sponsorship, a minimum salary,\na minimum match grade — are the search parameters remote, h1b_sponsors_only,\nsalary_floor, and min_match. The search enforces only constraints passed as parameters; a constraint left out\nof the call is not applied to the result set.\n\nEvery request is ordered by relevance to the query. The sort parameter (score, posted_at, match, salary) replaces\nthat order: posted_at orders by posting date and does not rank by fit to the query, salary orders by pay and\nmatch by personal fit. posted_days_ago is a posting window: it removes every job older than the window from\nthe answer, so a narrow window can leave the answer empty.\n\nJob type, work mode, required education, experience level, benefits, bonuses, employers to include or\nexclude, and the search radius are the parameters employment_types, work_modes, education,\nexperience_levels, benefits, bonuses_only, companies, exclude_companies and radius. Remote and hybrid\nare independent work modes: a remote search returns hybrid jobs only as marked additions to a short answer. A job that does not state the\nfiltered attribute is left out while that filter is set. One brand inside a company is hiring_brand\nnext to company.\n\nA company name that several employers share covers all of them, and the response names each with its\ndomain; an employer's domain in place of a name (company, companies or exclude_companies) means that\nemployer alone.\n\nWhen fewer than 4 jobs match, the answer is widened and each added job carries `widened`,\nthe condition that was widened (window, radius, hybrid). A search limited by posted_days_ago adds\njobs from the next longer window, up to no window; a city search that matched nothing adds jobs within\n100 miles; a remote search adds hybrid jobs in its place. Jobs that met the request as asked\ncome first, and `widening` states how many there were and what each step added. Experience level, job type, pay floor,\nemployer, visa sponsorship and every other filter are never widened.\n\nAdvanced filters (sort, min_match, h1b_sponsors_only, salary_floor, remote, work_modes, benefits, bonuses_only, companies, exclude_companies; sort when it orders by salary or match, companies when it\nnames more than one employer) apply for every account. One answer lists the first\nmatching jobs and states how many further jobs match.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
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
              description:
                "The official company name, or the domain of one employer",
            },
            hiring_brand: {
              type: "string",
              description:
                'Filter: one brand inside the company, for example company "Google" with hiring_brand "YouTube"; used only together with company.',
            },
            posted_days_ago: {
              type: "integer",
              minimum: 1,
              maximum: 365,
              description:
                "Posting window in days (1-365): every job posted earlier than that many days ago is removed from the answer, so a narrow window can leave the answer empty.",
            },
            remote: {
              type: "boolean",
              description:
                "Advanced filter: only remote-eligible jobs, matched across the whole country of the requested location rather than its radius.",
            },
            h1b_sponsors_only: {
              type: "boolean",
              description:
                "Advanced filter: only companies known to sponsor H1B visas.",
            },
            salary_floor: {
              type: "integer",
              minimum: 0,
              description:
                "Advanced filter: minimum annualized salary in USD; a posting qualifies when the lower bound of its pay band reaches the floor. Jobs without a USD salary are dropped.",
            },
            min_match: {
              type: "string",
              enum: ["A", "A-", "B+", "B", "B-", "C+", "C"],
              description:
                "Advanced filter: lowest personal FoundRole match grade to keep, the same letter each job shows in insights.match.grade. A and A- are rare even for a strong resume; B keeps good and strong matches; C+ also keeps fair ones. Needs a resume on the account.",
            },
            sort: {
              type: "string",
              enum: ["score", "posted_at", "match", "salary"],
              description:
                "Result order (score, posted_at, match, salary): score is relevance to the query and the order of every request that sets no sort; posted_at orders by posting date and does not rank by fit to the query; salary is highest pay first; match is best personal fit first and needs a resume. Ordering by salary or match is an advanced option.",
            },
            employment_types: {
              type: "array",
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
              description:
                "Filter: jobs offered as any of these employment types (full_time, part_time, contractor, temporary, intern, volunteer, per_diem, other).",
            },
            work_modes: {
              type: "array",
              items: {
                type: "string",
                enum: ["on_site", "remote", "hybrid"],
              },
              description:
                'Advanced filter: jobs in any of these work modes (on_site, remote, hybrid). remote is matched across the whole country of the location, the others within the radius. ["remote"] is the same search as remote: true.',
            },
            education: {
              type: "array",
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
              description:
                "Filter: jobs whose posting requires one of these education levels (no_requirements, high_school, associate_degree, bachelor_degree, professional_certificate, postgraduate_degree); bachelor_degree means the posting asks for a bachelor degree, not that it suits someone holding one.",
            },
            experience_levels: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "entry_level",
                  "mid_level",
                  "senior_level",
                  "executive",
                  "level_not_stated",
                ],
              },
              description:
                "Filter: jobs at any of these experience levels (entry_level, mid_level, senior_level, executive, level_not_stated). The level comes from the years of experience the posting asks for and the seniority in its title, the higher of the two; entry_level never includes a posting asking for more than two years. level_not_stated selects jobs whose level cannot be derived; it can be selected alone or alongside other levels.",
            },
            benefits: {
              type: "array",
              items: {
                type: "string",
              },
              maxItems: 10,
              description:
                'Advanced filter: benefit names such as "health insurance", "401k" or "parental leave"; a job qualifies only when it states every listed benefit. Names that match no known benefit are ignored.',
            },
            bonuses_only: {
              type: "boolean",
              description:
                "Advanced filter: only jobs that state a bonus (sign-on, performance, referral, commission and the like).",
            },
            companies: {
              type: "array",
              items: {
                type: "string",
              },
              maxItems: 20,
              description:
                "Filter: official company names; a job from any of them qualifies, across every job board each employer posts on. More than one company makes it an advanced filter. Next to company, a job has to match both; hiring_brand narrows company only.",
            },
            exclude_companies: {
              type: "array",
              items: {
                type: "string",
              },
              maxItems: 20,
              description:
                "Advanced filter: official company names whose jobs are removed from the results, across every job board each employer posts on.",
            },
            radius: {
              type: "integer",
              minimum: 5,
              maximum: 100,
              description:
                "Search radius in miles around a city location (default 40); not used for state, country or remote searches.",
            },
          },
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
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
                    type: ["string", "null"],
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
                      basedOn: {
                        type: ["string", "null"],
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
                      employerFilingHistory: {
                        type: ["object", "null"],
                        properties: {
                          id: {
                            type: "string",
                          },
                          subject: {
                            type: ["object", "null"],
                            properties: {
                              id: {
                                type: "string",
                              },
                              domainDictionaryId: {
                                type: "string",
                              },
                              name: {
                                type: "string",
                              },
                              domain: {
                                type: "string",
                              },
                            },
                          },
                          attribution: {
                            type: "string",
                            enum: ["FILED_BY"],
                          },
                          bindingStatus: {
                            type: "string",
                            enum: ["LEGACY_UNREVIEWED", "UNRESOLVED"],
                          },
                          availability: {
                            type: "string",
                            enum: [
                              "AVAILABLE",
                              "NO_FILINGS",
                              "UNRESOLVED_EMPLOYER",
                              "NOT_READY",
                            ],
                          },
                          coverage: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                id: {
                                  type: "string",
                                },
                                fiscalYear: {
                                  type: "integer",
                                },
                                quarter: {
                                  type: "integer",
                                },
                              },
                            },
                          },
                          currentPeriod: {
                            type: ["object", "null"],
                            properties: {
                              id: {
                                type: "string",
                              },
                              label: {
                                type: "string",
                              },
                              startFiscalYear: {
                                type: "integer",
                              },
                              startQuarter: {
                                type: "integer",
                              },
                              endFiscalYear: {
                                type: "integer",
                              },
                              endQuarter: {
                                type: "integer",
                              },
                              coveredQuarters: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    id: {
                                      type: "string",
                                    },
                                    fiscalYear: {
                                      type: "integer",
                                    },
                                    quarter: {
                                      type: "integer",
                                    },
                                  },
                                },
                              },
                              complete: {
                                type: "boolean",
                              },
                            },
                          },
                          current: {
                            type: ["object", "null"],
                            properties: {
                              id: {
                                type: "string",
                              },
                              filings: {
                                type: "integer",
                              },
                              workerPositions: {
                                type: "integer",
                              },
                            },
                          },
                          history: {
                            type: "object",
                            properties: {
                              id: {
                                type: "string",
                              },
                              access: {
                                type: "string",
                                enum: [
                                  "AVAILABLE",
                                  "RESTRICTED",
                                  "UNAVAILABLE",
                                ],
                              },
                              points: {
                                type: ["array", "null"],
                                items: {
                                  type: "object",
                                  properties: {
                                    id: {
                                      type: "string",
                                    },
                                    filings: {
                                      type: "integer",
                                    },
                                    workerPositions: {
                                      type: "integer",
                                    },
                                    period: {
                                      type: ["object", "null"],
                                      properties: {
                                        id: {
                                          type: "string",
                                        },
                                        label: {
                                          type: "string",
                                        },
                                        startFiscalYear: {
                                          type: "integer",
                                        },
                                        startQuarter: {
                                          type: "integer",
                                        },
                                        endFiscalYear: {
                                          type: "integer",
                                        },
                                        endQuarter: {
                                          type: "integer",
                                        },
                                        coveredQuarters: {
                                          type: "array",
                                          items: {
                                            type: "object",
                                            properties: {
                                              id: {
                                                type: "string",
                                              },
                                              fiscalYear: {
                                                type: "integer",
                                              },
                                              quarter: {
                                                type: "integer",
                                              },
                                            },
                                          },
                                        },
                                        complete: {
                                          type: "boolean",
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                          wageLevel: {
                            type: "object",
                            properties: {
                              id: {
                                type: "string",
                              },
                              period: {
                                type: ["object", "null"],
                                properties: {
                                  id: {
                                    type: "string",
                                  },
                                  label: {
                                    type: "string",
                                  },
                                  startFiscalYear: {
                                    type: "integer",
                                  },
                                  startQuarter: {
                                    type: "integer",
                                  },
                                  endFiscalYear: {
                                    type: "integer",
                                  },
                                  endQuarter: {
                                    type: "integer",
                                  },
                                  coveredQuarters: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        id: {
                                          type: "string",
                                        },
                                        fiscalYear: {
                                          type: "integer",
                                        },
                                        quarter: {
                                          type: "integer",
                                        },
                                      },
                                    },
                                  },
                                  complete: {
                                    type: "boolean",
                                  },
                                },
                              },
                              sampleSize: {
                                type: "integer",
                              },
                              availability: {
                                type: "string",
                                enum: [
                                  "AVAILABLE",
                                  "NO_FILINGS",
                                  "INSUFFICIENT_SAMPLE",
                                  "NOT_STATED",
                                  "NOT_READY",
                                  "UNRESOLVED_EMPLOYER",
                                ],
                              },
                              breakdown: {
                                type: ["object", "null"],
                                properties: {
                                  level1Pct: {
                                    type: ["number", "null"],
                                  },
                                  level2Pct: {
                                    type: ["number", "null"],
                                  },
                                  level3Pct: {
                                    type: ["number", "null"],
                                  },
                                  level4Pct: {
                                    type: ["number", "null"],
                                  },
                                  notStatedPct: {
                                    type: ["number", "null"],
                                  },
                                },
                              },
                            },
                          },
                        },
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
                  lastSeenAt: {
                    type: ["string", "null"],
                  },
                  trackedJob: {
                    type: ["object", "null"],
                  },
                  descriptionSnippet: {
                    type: ["string", "null"],
                  },
                  related: {
                    type: "boolean",
                  },
                  widened: {
                    type: ["string", "null"],
                    enum: ["window", "radius", "hybrid", null],
                  },
                  resultItemId: {
                    type: ["string", "null"],
                  },
                  tailoringUrl: {
                    type: ["string", "null"],
                  },
                  coverLetterUrl: {
                    type: ["string", "null"],
                  },
                  tailoringSubject: {
                    type: ["string", "null"],
                  },
                  coverLetterSubject: {
                    type: ["string", "null"],
                  },
                },
                required: ["id"],
              },
            },
            figureSources: {
              type: ["object", "null"],
              properties: {
                source: {
                  type: "string",
                  enum: ["FoundRole"],
                },
                methodologyUrl: {
                  type: "string",
                },
                estimatedSalary: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                ghostScore: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                visaRecords: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                    falseMeans: {
                      type: "string",
                    },
                  },
                },
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
            profileSetupMessage: {
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
            savedRole: {
              type: ["object", "null"],
              properties: {
                careerProfileId: {
                  type: "integer",
                },
                name: {
                  type: "string",
                },
                usedForThisSearch: {
                  type: "boolean",
                },
                explicitlySaved: {
                  type: "boolean",
                  description:
                    "Whether the authenticated account explicitly selected this role",
                },
              },
            },
            searchedPlace: {
              type: ["object", "null"],
              properties: {
                name: {
                  type: "string",
                },
                source: {
                  type: "string",
                  enum: ["account", "current", "default"],
                },
              },
            },
            locationRecovery: {
              type: "object",
              required: ["reason", "requested", "options"],
              properties: {
                reason: {
                  type: "string",
                  enum: ["ambiguous", "unknown", "unsupported"],
                },
                requested: {
                  type: "string",
                },
                options: {
                  type: "array",
                  items: {
                    type: "object",
                    required: ["label", "location"],
                    properties: {
                      label: {
                        type: "string",
                      },
                      location: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            widening: {
              type: ["object", "null"],
              properties: {
                askedCount: {
                  type: "integer",
                },
                steps: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      step: {
                        type: "string",
                        enum: ["window", "radius", "hybrid"],
                      },
                      from: {
                        type: ["integer", "string", "null"],
                      },
                      to: {
                        type: ["integer", "string", "null"],
                      },
                      added: {
                        type: "integer",
                      },
                    },
                  },
                },
                shown: {
                  type: "integer",
                },
                hiddenCount: {
                  type: "integer",
                },
                leftOut: {
                  type: "integer",
                },
                reason: {
                  type: "string",
                  enum: ["empty", "short"],
                },
                conditions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      condition: {
                        type: "string",
                        enum: [
                          "posted_days_ago",
                          "radius",
                          "work_location_types",
                        ],
                      },
                      asked: {
                        type: ["string", "null"],
                      },
                      used: {
                        type: ["string", "null"],
                      },
                      added: {
                        type: "integer",
                      },
                      reason: {
                        type: "string",
                        enum: ["empty", "short"],
                      },
                    },
                  },
                },
              },
            },
            appliedConditions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  condition: {
                    type: "string",
                    enum: [
                      "query",
                      "location",
                      "company",
                      "career_area",
                      "specialty",
                      "radius",
                      "sort",
                      "posted_days_ago",
                      "career_profile",
                      "career_specialization",
                      "min_match",
                      "sponsors_only",
                      "hide_ghost_risk",
                      "salary_floor",
                      "remote_only",
                      "strict_remote_only",
                      "confirmed_work_from_only",
                      "hiring_brand",
                      "facets",
                      "employment_types",
                      "work_location_types",
                      "education_requirements",
                      "experience_levels",
                      "benefits",
                      "bonuses_only",
                      "companies",
                      "exclude_companies",
                    ],
                  },
                  value: {
                    type: "string",
                  },
                },
              },
            },
            guide: {
              type: ["object", "null"],
              properties: {
                steps: {
                  type: "array",
                  items: {
                    type: "object",
                  },
                },
                otherLabel: {
                  type: "string",
                },
                otherPrompt: {
                  type: "string",
                },
              },
            },
          },
        },
        annotations: {
          destructiveHint: false,
          idempotentHint: false,
          openWorldHint: false,
          readOnlyHint: false,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "roles_lookup",
        title: "Look up roles",
        description:
          "Matches the user's own words for the work they want against FoundRole's role list and returns up to\n5 roles with open jobs, each with its number of open jobs in the place's state or\ncountry, most jobs first, plus the role already saved on the account. It runs no job search and changes\nnothing on the account. jobs_search returns the jobs for a role.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
          required: ["words"],
          properties: {
            words: {
              type: "string",
              minLength: 1,
              maxLength: 120,
              description:
                'The user\'s own words for the work they want, such as "analyst" or "nurse in a clinic"',
            },
            location: {
              type: "string",
              description:
                "Place to count open jobs in (e.g., 'Austin, TX'); the account's place when omitted",
            },
          },
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          properties: {
            roles: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  careerProfileId: {
                    type: "integer",
                  },
                  name: {
                    type: "string",
                  },
                  jobCount: {
                    type: "integer",
                  },
                },
              },
            },
            region: {
              type: ["string", "null"],
            },
            savedRole: {
              type: ["string", "null"],
            },
          },
        },
        annotations: {
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
          readOnlyHint: true,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "profile_role_set",
        title: "Save the role I am looking for",
        description:
          "Saves the one role the user said they are looking for on an account that has no role yet, creating its\nprofile when it has none. Recommendations then show that role's newest jobs in the account's place, and\nlater searches with no title search exactly that role. The FoundRole search panel calls it when the user\npicks a role there; a role the user names in the chat is saved the same way. It saves only a role the user\nchose, not a guess from their words. On an account that already has another role it changes nothing and\nnames the saved role; profile_role_replace replaces it.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
          required: ["career_profile_id"],
          properties: {
            career_profile_id: {
              type: "integer",
              minimum: 1,
              description:
                "The FoundRole role the user chose, as careerProfileId from roles_lookup or a search question",
            },
          },
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
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
        },
        annotations: {
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
          readOnlyHint: false,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "profile_role_replace",
        title: "Change the role I am looking for",
        description:
          "Replaces the roles saved on the user's FoundRole account with the one role the user chose. The previous\nroles are removed from the account, including a role taken from the user's resume. Recommendations then\nshow the new role's newest jobs in the account's place, and later searches with no title search exactly\nthat role. For an account with no role yet, profile_role_set saves one without removing anything.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
          required: ["career_profile_id"],
          properties: {
            career_profile_id: {
              type: "integer",
              minimum: 1,
              description:
                "The FoundRole role the user chose, as careerProfileId from roles_lookup or a search question",
            },
          },
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
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
        },
        annotations: {
          destructiveHint: true,
          idempotentHint: true,
          openWorldHint: false,
          readOnlyHint: false,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "profile_roles_list",
        title: "Read my saved search roles",
        description:
          "Returns the search roles explicitly saved by the authenticated account. Each role has a kind, ID and display name.\nThe list identifies saved roles for name-only removal requests. A removal with a known kind and ID needs no preliminary list.\nRoles inferred from a profile are outside the list and cannot be removed through saved-role tools.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
          required: ["success", "roles"],
          properties: {
            success: {
              type: "boolean",
            },
            roles: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                required: ["kind", "id", "name"],
                properties: {
                  kind: {
                    type: "string",
                    enum: ["career_profile", "career_specialization"],
                  },
                  id: {
                    type: "string",
                    minLength: 1,
                    maxLength: 19,
                  },
                  name: {
                    type: ["string", "null"],
                  },
                },
              },
            },
          },
        },
        annotations: {
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
          readOnlyHint: true,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "profile_role_remove",
        title: "Remove one of my saved search roles",
        description:
          "Removes one explicitly saved search role from the authenticated account. Its known kind and ID\nare sufficient for direct removal in one call. For a name-only request, profile_roles_list\nsupplies the kind and ID of matching saved roles. Inferred roles cannot be removed with this tool.\nReturns whether it was removed and the remaining saved roles. A role already absent leaves the selection as it is.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
          required: ["kind", "id"],
          properties: {
            kind: {
              type: "string",
              enum: ["career_profile", "career_specialization"],
            },
            id: {
              type: "string",
              minLength: 1,
              maxLength: 19,
            },
          },
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
          required: ["success", "removed", "roles"],
          properties: {
            success: {
              type: "boolean",
            },
            removed: {
              type: "boolean",
            },
            roles: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                required: ["kind", "id", "name"],
                properties: {
                  kind: {
                    type: "string",
                    enum: ["career_profile", "career_specialization"],
                  },
                  id: {
                    type: "string",
                    minLength: 1,
                    maxLength: 19,
                  },
                  name: {
                    type: ["string", "null"],
                  },
                },
              },
            },
          },
        },
        annotations: {
          destructiveHint: true,
          idempotentHint: true,
          openWorldHint: false,
          readOnlyHint: false,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "company_lookup",
        title: "Look up an employer",
        description:
          "Looks up public employer identities by name or website domain, including employers without current vacancies.\nReturns the canonical company name, any known domain and website, and a lookupValue for employer-filtered job search.\nSeveral matches are candidates for clarification. This lookup does not search jobs.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
          required: ["query"],
          properties: {
            query: {
              type: "string",
              minLength: 1,
              maxLength: 200,
              description: "Employer name or website domain",
            },
          },
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          required: ["status", "candidates", "moreCandidates"],
          properties: {
            status: {
              type: "string",
              enum: ["found", "ambiguous", "missing"],
            },
            candidates: {
              type: "array",
              items: {
                type: "object",
                required: ["name", "lookupValue"],
                properties: {
                  name: {
                    type: "string",
                  },
                  lookupValue: {
                    type: "string",
                  },
                  domain: {
                    type: ["string", "null"],
                  },
                  website: {
                    type: ["string", "null"],
                  },
                  headquarters: {
                    type: ["string", "null"],
                  },
                  contextUrl: {
                    type: ["string", "null"],
                  },
                },
              },
            },
            moreCandidates: {
              type: "boolean",
            },
          },
        },
        annotations: {
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
          readOnlyHint: true,
        },
      },
      {
        name: "profile_get",
        title: "Read my saved career profile",
        description:
          "Returns the authenticated account's saved career profile for a request to read or inspect it.\nIncludes the saved career history, summary, skills, education, projects, qualifications and role provenance.\nSaved resume documents are available separately through resume_get. This read requires permission from the current connection.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          required: ["status", "profile", "contextUrl"],
          properties: {
            status: {
              type: "string",
              enum: ["ready", "missing"],
            },
            profile: {
              type: ["object", "null"],
            },
            contextUrl: {
              type: "string",
            },
          },
        },
        annotations: {
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
          readOnlyHint: true,
        },
      },
      {
        name: "resume_get",
        title: "Read my saved resume",
        description:
          "Returns the actual text of the authenticated person's saved resume: the extracted text of an upload\nor the text of an existing saved version. Without an ID it reads the primary or only resume, or\nidentifies versions to choose from. A continued read uses the returned resume.id, revision, and nextOffset\nas resume_id, revision and offset. The read requires permission from the current connection.\nThis tool reads content; resume_check explains how hiring software parsed a resume.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
          properties: {
            resume_id: {
              type: "string",
              format: "uuid",
            },
            offset: {
              type: "integer",
              minimum: 0,
            },
            revision: {
              type: "string",
              minLength: 64,
              maxLength: 64,
            },
          },
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          required: ["status", "contextUrl"],
          properties: {
            status: {
              type: "string",
              enum: [
                "ready",
                "missing",
                "processing",
                "unavailable",
                "choose_version",
                "restart",
              ],
            },
            contextUrl: {
              type: "string",
            },
            resume: {
              type: "object",
            },
            versions: {
              type: "array",
              items: {
                type: "object",
              },
            },
            moreVersions: {
              type: "boolean",
            },
            text: {
              type: "string",
            },
            revision: {
              type: "string",
            },
            offset: {
              type: "integer",
            },
            nextOffset: {
              type: ["integer", "null"],
            },
            totalCharacters: {
              type: "integer",
            },
          },
        },
        annotations: {
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
          readOnlyHint: true,
        },
      },
      {
        name: "jobs_recommendations",
        title: "Recommend jobs for my profile",
        description:
          "Finds jobs that fit the authenticated user's profile, using their resume, skills, target roles and preferred location.\njobs_search leads with explicit search criteria. Results are ranked by fit, may include related roles, and carry\nthe same salary, match, H-1B, and job-trust insight payload used by job search, with those FoundRole\nfigures attributed once per response in `figureSources` (source, basis per\nkind of figure and methodologyUrl); a false h1bSponsor or eVerify means no record was found, not that\nthe employer does not sponsor. The search filters\nand sort parameters apply to this personalized feed too. One call returns one answer: there is no\nnext page, and the response links to the same feed on the FoundRole website.\nAn explicit query for a different or unrecognized profession uses the same general job search as\njobs_search, preserving the query and filters instead of substituting the profile's target roles.\nWithout a location the feed covers the place saved on the account. It covers that place's whole\ncountry instead when the country holds more jobs of the account's role than the place does, or when\nthe role has no job in the place or the country and few jobs of any kind are posted near the place;\nthe latter shows related roles. The response names the place the feed shows as searchedPlace. A named location is never widened. coverage carries the\ncounts of the role's jobs near the account's place and posted in its country. Its remoteOpenToCountry counts the role's jobs\nthe feed holds with no posting near the place, whether remote, country-wide or regional, so that count does not mean they are remote.\n\nA processing status means the personalized feed is still being prepared; a later call returns the\ncompleted feed.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
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
              description:
                "The official company name, or the domain of one employer",
            },
            radius: {
              type: "integer",
              minimum: 5,
              maximum: 100,
              description:
                "Search radius in miles around a city location (default 40); not used for state, country or remote searches.",
            },
            sort: {
              type: "string",
              enum: ["score", "posted_at", "match", "salary"],
              description:
                "Result order (score, posted_at, match, salary): score is relevance to the query and the order of every request that sets no sort; posted_at orders by posting date and does not rank by fit to the query; salary is highest pay first; match is best personal fit first and needs a resume. Ordering by salary or match is an advanced option.",
            },
            posted_days_ago: {
              type: "integer",
              minimum: 1,
              maximum: 365,
              description:
                "Posting window in days (1-365): every job posted earlier than that many days ago is removed from the answer, so a narrow window can leave the answer empty.",
            },
            min_match: {
              type: "string",
              enum: ["A", "A-", "B+", "B", "B-", "C+", "C"],
              description:
                "Advanced filter: lowest personal FoundRole match grade to keep, the same letter each job shows in insights.match.grade. A and A- are rare even for a strong resume; B keeps good and strong matches; C+ also keeps fair ones. Needs a resume on the account.",
            },
            h1b_sponsors_only: {
              type: "boolean",
              description:
                "Advanced filter: only companies known to sponsor H1B visas.",
            },
            salary_floor: {
              type: "integer",
              minimum: 0,
              description:
                "Advanced filter: minimum annualized salary in USD; a posting qualifies when the lower bound of its pay band reaches the floor. Jobs without a USD salary are dropped.",
            },
            remote: {
              type: "boolean",
              description:
                "Advanced filter: only remote-eligible jobs, matched across the whole country of the requested location rather than its radius.",
            },
            hiring_brand: {
              type: "string",
              description:
                'Filter: one brand inside the company, for example company "Google" with hiring_brand "YouTube"; used only together with company.',
            },
            employment_types: {
              type: "array",
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
              description:
                "Filter: jobs offered as any of these employment types (full_time, part_time, contractor, temporary, intern, volunteer, per_diem, other).",
            },
            work_modes: {
              type: "array",
              items: {
                type: "string",
                enum: ["on_site", "remote", "hybrid"],
              },
              description:
                'Advanced filter: jobs in any of these work modes (on_site, remote, hybrid). remote is matched across the whole country of the location, the others within the radius. ["remote"] is the same search as remote: true.',
            },
            education: {
              type: "array",
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
              description:
                "Filter: jobs whose posting requires one of these education levels (no_requirements, high_school, associate_degree, bachelor_degree, professional_certificate, postgraduate_degree); bachelor_degree means the posting asks for a bachelor degree, not that it suits someone holding one.",
            },
            experience_levels: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "entry_level",
                  "mid_level",
                  "senior_level",
                  "executive",
                  "level_not_stated",
                ],
              },
              description:
                "Filter: jobs at any of these experience levels (entry_level, mid_level, senior_level, executive, level_not_stated). The level comes from the years of experience the posting asks for and the seniority in its title, the higher of the two; entry_level never includes a posting asking for more than two years. level_not_stated selects jobs whose level cannot be derived; it can be selected alone or alongside other levels.",
            },
            benefits: {
              type: "array",
              items: {
                type: "string",
              },
              maxItems: 10,
              description:
                'Advanced filter: benefit names such as "health insurance", "401k" or "parental leave"; a job qualifies only when it states every listed benefit. Names that match no known benefit are ignored.',
            },
            bonuses_only: {
              type: "boolean",
              description:
                "Advanced filter: only jobs that state a bonus (sign-on, performance, referral, commission and the like).",
            },
            companies: {
              type: "array",
              items: {
                type: "string",
              },
              maxItems: 20,
              description:
                "Filter: official company names; a job from any of them qualifies, across every job board each employer posts on. More than one company makes it an advanced filter. Next to company, a job has to match both; hiring_brand narrows company only.",
            },
            exclude_companies: {
              type: "array",
              items: {
                type: "string",
              },
              maxItems: 20,
              description:
                "Advanced filter: official company names whose jobs are removed from the results, across every job board each employer posts on.",
            },
          },
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
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
                    type: ["string", "null"],
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
                      basedOn: {
                        type: ["string", "null"],
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
                      employerFilingHistory: {
                        type: ["object", "null"],
                        properties: {
                          id: {
                            type: "string",
                          },
                          subject: {
                            type: ["object", "null"],
                            properties: {
                              id: {
                                type: "string",
                              },
                              domainDictionaryId: {
                                type: "string",
                              },
                              name: {
                                type: "string",
                              },
                              domain: {
                                type: "string",
                              },
                            },
                          },
                          attribution: {
                            type: "string",
                            enum: ["FILED_BY"],
                          },
                          bindingStatus: {
                            type: "string",
                            enum: ["LEGACY_UNREVIEWED", "UNRESOLVED"],
                          },
                          availability: {
                            type: "string",
                            enum: [
                              "AVAILABLE",
                              "NO_FILINGS",
                              "UNRESOLVED_EMPLOYER",
                              "NOT_READY",
                            ],
                          },
                          coverage: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                id: {
                                  type: "string",
                                },
                                fiscalYear: {
                                  type: "integer",
                                },
                                quarter: {
                                  type: "integer",
                                },
                              },
                            },
                          },
                          currentPeriod: {
                            type: ["object", "null"],
                            properties: {
                              id: {
                                type: "string",
                              },
                              label: {
                                type: "string",
                              },
                              startFiscalYear: {
                                type: "integer",
                              },
                              startQuarter: {
                                type: "integer",
                              },
                              endFiscalYear: {
                                type: "integer",
                              },
                              endQuarter: {
                                type: "integer",
                              },
                              coveredQuarters: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    id: {
                                      type: "string",
                                    },
                                    fiscalYear: {
                                      type: "integer",
                                    },
                                    quarter: {
                                      type: "integer",
                                    },
                                  },
                                },
                              },
                              complete: {
                                type: "boolean",
                              },
                            },
                          },
                          current: {
                            type: ["object", "null"],
                            properties: {
                              id: {
                                type: "string",
                              },
                              filings: {
                                type: "integer",
                              },
                              workerPositions: {
                                type: "integer",
                              },
                            },
                          },
                          history: {
                            type: "object",
                            properties: {
                              id: {
                                type: "string",
                              },
                              access: {
                                type: "string",
                                enum: [
                                  "AVAILABLE",
                                  "RESTRICTED",
                                  "UNAVAILABLE",
                                ],
                              },
                              points: {
                                type: ["array", "null"],
                                items: {
                                  type: "object",
                                  properties: {
                                    id: {
                                      type: "string",
                                    },
                                    filings: {
                                      type: "integer",
                                    },
                                    workerPositions: {
                                      type: "integer",
                                    },
                                    period: {
                                      type: ["object", "null"],
                                      properties: {
                                        id: {
                                          type: "string",
                                        },
                                        label: {
                                          type: "string",
                                        },
                                        startFiscalYear: {
                                          type: "integer",
                                        },
                                        startQuarter: {
                                          type: "integer",
                                        },
                                        endFiscalYear: {
                                          type: "integer",
                                        },
                                        endQuarter: {
                                          type: "integer",
                                        },
                                        coveredQuarters: {
                                          type: "array",
                                          items: {
                                            type: "object",
                                            properties: {
                                              id: {
                                                type: "string",
                                              },
                                              fiscalYear: {
                                                type: "integer",
                                              },
                                              quarter: {
                                                type: "integer",
                                              },
                                            },
                                          },
                                        },
                                        complete: {
                                          type: "boolean",
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                          wageLevel: {
                            type: "object",
                            properties: {
                              id: {
                                type: "string",
                              },
                              period: {
                                type: ["object", "null"],
                                properties: {
                                  id: {
                                    type: "string",
                                  },
                                  label: {
                                    type: "string",
                                  },
                                  startFiscalYear: {
                                    type: "integer",
                                  },
                                  startQuarter: {
                                    type: "integer",
                                  },
                                  endFiscalYear: {
                                    type: "integer",
                                  },
                                  endQuarter: {
                                    type: "integer",
                                  },
                                  coveredQuarters: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        id: {
                                          type: "string",
                                        },
                                        fiscalYear: {
                                          type: "integer",
                                        },
                                        quarter: {
                                          type: "integer",
                                        },
                                      },
                                    },
                                  },
                                  complete: {
                                    type: "boolean",
                                  },
                                },
                              },
                              sampleSize: {
                                type: "integer",
                              },
                              availability: {
                                type: "string",
                                enum: [
                                  "AVAILABLE",
                                  "NO_FILINGS",
                                  "INSUFFICIENT_SAMPLE",
                                  "NOT_STATED",
                                  "NOT_READY",
                                  "UNRESOLVED_EMPLOYER",
                                ],
                              },
                              breakdown: {
                                type: ["object", "null"],
                                properties: {
                                  level1Pct: {
                                    type: ["number", "null"],
                                  },
                                  level2Pct: {
                                    type: ["number", "null"],
                                  },
                                  level3Pct: {
                                    type: ["number", "null"],
                                  },
                                  level4Pct: {
                                    type: ["number", "null"],
                                  },
                                  notStatedPct: {
                                    type: ["number", "null"],
                                  },
                                },
                              },
                            },
                          },
                        },
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
                  lastSeenAt: {
                    type: ["string", "null"],
                  },
                  trackedJob: {
                    type: ["object", "null"],
                  },
                  descriptionSnippet: {
                    type: ["string", "null"],
                  },
                  related: {
                    type: "boolean",
                  },
                  widened: {
                    type: ["string", "null"],
                    enum: ["window", "radius", "hybrid", null],
                  },
                  resultItemId: {
                    type: ["string", "null"],
                  },
                  tailoringUrl: {
                    type: ["string", "null"],
                  },
                  coverLetterUrl: {
                    type: ["string", "null"],
                  },
                  tailoringSubject: {
                    type: ["string", "null"],
                  },
                  coverLetterSubject: {
                    type: ["string", "null"],
                  },
                },
                required: ["id"],
              },
            },
            figureSources: {
              type: ["object", "null"],
              properties: {
                source: {
                  type: "string",
                  enum: ["FoundRole"],
                },
                methodologyUrl: {
                  type: "string",
                },
                estimatedSalary: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                ghostScore: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                visaRecords: {
                  type: "object",
                  properties: {
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                    falseMeans: {
                      type: "string",
                    },
                  },
                },
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
            profileSetupMessage: {
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
            savedRole: {
              type: ["object", "null"],
              properties: {
                careerProfileId: {
                  type: "integer",
                },
                name: {
                  type: "string",
                },
                usedForThisSearch: {
                  type: "boolean",
                },
                explicitlySaved: {
                  type: "boolean",
                  description:
                    "Whether the authenticated account explicitly selected this role",
                },
              },
            },
            searchedPlace: {
              type: ["object", "null"],
              properties: {
                name: {
                  type: "string",
                },
                source: {
                  type: "string",
                  enum: ["account", "current", "default"],
                },
              },
            },
            locationRecovery: {
              type: "object",
              required: ["reason", "requested", "options"],
              properties: {
                reason: {
                  type: "string",
                  enum: ["ambiguous", "unknown", "unsupported"],
                },
                requested: {
                  type: "string",
                },
                options: {
                  type: "array",
                  items: {
                    type: "object",
                    required: ["label", "location"],
                    properties: {
                      label: {
                        type: "string",
                      },
                      location: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            widening: {
              type: ["object", "null"],
              properties: {
                askedCount: {
                  type: "integer",
                },
                steps: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      step: {
                        type: "string",
                        enum: ["window", "radius", "hybrid"],
                      },
                      from: {
                        type: ["integer", "string", "null"],
                      },
                      to: {
                        type: ["integer", "string", "null"],
                      },
                      added: {
                        type: "integer",
                      },
                    },
                  },
                },
                shown: {
                  type: "integer",
                },
                hiddenCount: {
                  type: "integer",
                },
                leftOut: {
                  type: "integer",
                },
                reason: {
                  type: "string",
                  enum: ["empty", "short"],
                },
                conditions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      condition: {
                        type: "string",
                        enum: [
                          "posted_days_ago",
                          "radius",
                          "work_location_types",
                        ],
                      },
                      asked: {
                        type: ["string", "null"],
                      },
                      used: {
                        type: ["string", "null"],
                      },
                      added: {
                        type: "integer",
                      },
                      reason: {
                        type: "string",
                        enum: ["empty", "short"],
                      },
                    },
                  },
                },
              },
            },
            appliedConditions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  condition: {
                    type: "string",
                    enum: [
                      "query",
                      "location",
                      "company",
                      "career_area",
                      "specialty",
                      "radius",
                      "sort",
                      "posted_days_ago",
                      "career_profile",
                      "career_specialization",
                      "min_match",
                      "sponsors_only",
                      "hide_ghost_risk",
                      "salary_floor",
                      "remote_only",
                      "strict_remote_only",
                      "confirmed_work_from_only",
                      "hiring_brand",
                      "facets",
                      "employment_types",
                      "work_location_types",
                      "education_requirements",
                      "experience_levels",
                      "benefits",
                      "bonuses_only",
                      "companies",
                      "exclude_companies",
                    ],
                  },
                  value: {
                    type: "string",
                  },
                },
              },
            },
            guide: {
              type: ["object", "null"],
              properties: {
                steps: {
                  type: "array",
                  items: {
                    type: "object",
                  },
                },
                otherLabel: {
                  type: "string",
                },
                otherPrompt: {
                  type: "string",
                },
              },
            },
            totalCount: {
              type: "integer",
            },
            coverage: {
              type: ["object", "null"],
              properties: {
                roleName: {
                  type: ["string", "null"],
                },
                placeName: {
                  type: "string",
                },
                countryName: {
                  type: ["string", "null"],
                },
                exactNearby: {
                  type: "integer",
                },
                exactInCountry: {
                  type: ["integer", "null"],
                },
                remoteOpenToCountry: {
                  type: "integer",
                },
                withoutFilters: {
                  type: ["integer", "null"],
                },
                state: {
                  type: "string",
                  enum: [
                    "enough",
                    "few_nearby",
                    "related_only",
                    "related_off_empty",
                    "none_in_country",
                    "filtered_out",
                  ],
                },
              },
            },
            roleQuestion: {
              type: ["string", "null"],
            },
            profileSetupQuestion: {
              type: ["string", "null"],
              description:
                "A ready-to-say question about an available profile setup step",
            },
          },
        },
        annotations: {
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
          readOnlyHint: false,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "jobs_details",
        title: "Get job details",
        description:
          "Fetches full details for one job by the `id` returned from jobs_search — the deeper view behind a search result.\n\n**Input:**\n- `job_id`: The exact ID string from the `id` field of a `jobs_search` result.\n- `result_item_id`: The matching occurrence ID from that result's `resultItemId` field, when available.\n\n**Output:**\nComplete job details: description, skills, benefits, requirements, salary benchmark, resume match,\nH-1B and E-Verify signals, job-trust analysis, and application link. A posting that passed the\nfully-remote check carries `remoteCheck`: the posting lines that make the role remote and where\nthe employee may work from, or an unknown scope when the posting does not say. `repostHistory` appears\nonly when earlier copies of the posting closed one after another before this one opened: the date\nFoundRole first saw it, how many times it was reposted under a new link (0 when only the same link came\nback), and the same fact as one sentence. Its absence does not mean the posting is new. It is a fact\nabout the posting, not part of the job-trust grade. Personalized and extended insight fields follow the\nauthenticated user's current entitlements.\n\nThe pay estimate, the real-or-ghost grade, the remote check and the visa records are FoundRole's own\nfigures: each carries `source`, `basis` (what it is computed from) and `methodologyUrl`, the FoundRole\npage that explains how it is computed. knowledge_search returns the same explanation. A false\nh1bSponsor or eVerify means no record was found in those files, not that the employer does not sponsor;\na job whose employer FoundRole could not identify carries no visa fields.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
          required: ["job_id"],
          properties: {
            job_id: {
              type: "string",
              minLength: 1,
              description:
                "The unique identifier of the job from jobs_search results",
            },
            result_item_id: {
              type: "string",
              description:
                "The result occurrence ID returned with the selected job",
            },
          },
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          properties: {
            job: {
              type: "object",
              required: ["id"],
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
                    basedOn: {
                      type: ["string", "null"],
                    },
                    updatedAt: {
                      type: ["string", "null"],
                    },
                    source: {
                      type: "string",
                      enum: ["FoundRole"],
                    },
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
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
                    employerFilingHistory: {
                      type: ["object", "null"],
                      properties: {
                        id: {
                          type: "string",
                        },
                        subject: {
                          type: ["object", "null"],
                          properties: {
                            id: {
                              type: "string",
                            },
                            domainDictionaryId: {
                              type: "string",
                            },
                            name: {
                              type: "string",
                            },
                            domain: {
                              type: "string",
                            },
                          },
                        },
                        attribution: {
                          type: "string",
                          enum: ["FILED_BY"],
                        },
                        bindingStatus: {
                          type: "string",
                          enum: ["LEGACY_UNREVIEWED", "UNRESOLVED"],
                        },
                        availability: {
                          type: "string",
                          enum: [
                            "AVAILABLE",
                            "NO_FILINGS",
                            "UNRESOLVED_EMPLOYER",
                            "NOT_READY",
                          ],
                        },
                        coverage: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: {
                                type: "string",
                              },
                              fiscalYear: {
                                type: "integer",
                              },
                              quarter: {
                                type: "integer",
                              },
                            },
                          },
                        },
                        currentPeriod: {
                          type: ["object", "null"],
                          properties: {
                            id: {
                              type: "string",
                            },
                            label: {
                              type: "string",
                            },
                            startFiscalYear: {
                              type: "integer",
                            },
                            startQuarter: {
                              type: "integer",
                            },
                            endFiscalYear: {
                              type: "integer",
                            },
                            endQuarter: {
                              type: "integer",
                            },
                            coveredQuarters: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  id: {
                                    type: "string",
                                  },
                                  fiscalYear: {
                                    type: "integer",
                                  },
                                  quarter: {
                                    type: "integer",
                                  },
                                },
                              },
                            },
                            complete: {
                              type: "boolean",
                            },
                          },
                        },
                        current: {
                          type: ["object", "null"],
                          properties: {
                            id: {
                              type: "string",
                            },
                            filings: {
                              type: "integer",
                            },
                            workerPositions: {
                              type: "integer",
                            },
                          },
                        },
                        history: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                            access: {
                              type: "string",
                              enum: ["AVAILABLE", "RESTRICTED", "UNAVAILABLE"],
                            },
                            points: {
                              type: ["array", "null"],
                              items: {
                                type: "object",
                                properties: {
                                  id: {
                                    type: "string",
                                  },
                                  filings: {
                                    type: "integer",
                                  },
                                  workerPositions: {
                                    type: "integer",
                                  },
                                  period: {
                                    type: ["object", "null"],
                                    properties: {
                                      id: {
                                        type: "string",
                                      },
                                      label: {
                                        type: "string",
                                      },
                                      startFiscalYear: {
                                        type: "integer",
                                      },
                                      startQuarter: {
                                        type: "integer",
                                      },
                                      endFiscalYear: {
                                        type: "integer",
                                      },
                                      endQuarter: {
                                        type: "integer",
                                      },
                                      coveredQuarters: {
                                        type: "array",
                                        items: {
                                          type: "object",
                                          properties: {
                                            id: {
                                              type: "string",
                                            },
                                            fiscalYear: {
                                              type: "integer",
                                            },
                                            quarter: {
                                              type: "integer",
                                            },
                                          },
                                        },
                                      },
                                      complete: {
                                        type: "boolean",
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                        wageLevel: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                            period: {
                              type: ["object", "null"],
                              properties: {
                                id: {
                                  type: "string",
                                },
                                label: {
                                  type: "string",
                                },
                                startFiscalYear: {
                                  type: "integer",
                                },
                                startQuarter: {
                                  type: "integer",
                                },
                                endFiscalYear: {
                                  type: "integer",
                                },
                                endQuarter: {
                                  type: "integer",
                                },
                                coveredQuarters: {
                                  type: "array",
                                  items: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "string",
                                      },
                                      fiscalYear: {
                                        type: "integer",
                                      },
                                      quarter: {
                                        type: "integer",
                                      },
                                    },
                                  },
                                },
                                complete: {
                                  type: "boolean",
                                },
                              },
                            },
                            sampleSize: {
                              type: "integer",
                            },
                            availability: {
                              type: "string",
                              enum: [
                                "AVAILABLE",
                                "NO_FILINGS",
                                "INSUFFICIENT_SAMPLE",
                                "NOT_STATED",
                                "NOT_READY",
                                "UNRESOLVED_EMPLOYER",
                              ],
                            },
                            breakdown: {
                              type: ["object", "null"],
                              properties: {
                                level1Pct: {
                                  type: ["number", "null"],
                                },
                                level2Pct: {
                                  type: ["number", "null"],
                                },
                                level3Pct: {
                                  type: ["number", "null"],
                                },
                                level4Pct: {
                                  type: ["number", "null"],
                                },
                                notStatedPct: {
                                  type: ["number", "null"],
                                },
                              },
                            },
                          },
                        },
                      },
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
                        source: {
                          type: "string",
                          enum: ["FoundRole"],
                        },
                        basis: {
                          type: "string",
                        },
                        methodologyUrl: {
                          type: "string",
                        },
                      },
                    },
                    visaProvenance: {
                      type: ["object", "null"],
                      properties: {
                        source: {
                          type: "string",
                          enum: ["FoundRole"],
                        },
                        basis: {
                          type: "string",
                        },
                        methodologyUrl: {
                          type: "string",
                        },
                        falseMeans: {
                          type: "string",
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
                lastSeenAt: {
                  type: ["string", "null"],
                },
                resultItemId: {
                  type: ["string", "null"],
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
                    source: {
                      type: "string",
                      enum: ["FoundRole"],
                    },
                    basis: {
                      type: "string",
                    },
                    methodologyUrl: {
                      type: "string",
                    },
                  },
                },
                repostHistory: {
                  type: ["object", "null"],
                  properties: {
                    firstSeenAt: {
                      type: "string",
                      format: "date",
                    },
                    repostCount: {
                      type: "integer",
                      minimum: 0,
                    },
                    summary: {
                      type: "string",
                    },
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
            trackedJob: {
              type: ["object", "null"],
            },
            tailoringUrl: {
              type: ["string", "null"],
            },
            coverLetterUrl: {
              type: ["string", "null"],
            },
            tailoringSubject: {
              type: ["string", "null"],
            },
            coverLetterSubject: {
              type: ["string", "null"],
            },
          },
        },
        annotations: {
          destructiveHint: false,
          idempotentHint: false,
          openWorldHint: false,
          readOnlyHint: false,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "jobs_analyze_external",
        title: "Analyze a job from another site",
        description:
          "Analyzes one job found outside FoundRole using the authenticated user's FoundRole profile and the same\nsignals used for FoundRole jobs: resume match, missing skills, H-1B sponsorship history, E-Verify,\nghost-job risk, posted compensation, and market salary estimates. Use tracker_add_external only when\nthe user asks to save without analysis.\n\nThe input represents the direct posting URL and all job content already available in the conversation.\nThe five text identity fields are required; every structured fact field is optional, with a fact the\nsource does not state simply omitted (or null). The optional `client_extraction` object carries\nevidence-backed skills, technology, benefits, bonuses, seniority, industry, management, clearance,\nvisa, and remote-scope labels when source excerpts for them exist. FoundRole validates the evidence,\nstores the client extraction separately, derives missing deterministic facts, and reports which\nvalues were provided, derived, accepted, rejected, or remain unknown.\n\nThe output includes `comparisonRef`; retain it exactly for a later jobs_compare call. The analysis is a\ndecision aid, not a guarantee about sponsorship, legitimacy, compensation, or hiring outcome.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
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
              format: "date-time",
              description:
                "Posting date as ISO 8601, when the source states it",
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
              enum: [null, "year", "month", "week", "day", "hour"],
              description: "Salary period: year, month, week, day, hour",
            },
            salary_currency: {
              type: ["string", "null"],
              description: "ISO 4217 salary currency code, when stated",
            },
            employment_type: {
              type: ["array", "null"],
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
              description:
                "Employment types: full_time, part_time, contractor, temporary, intern, volunteer, per_diem, other",
            },
            work_location_type: {
              type: ["string", "null"],
              enum: [null, "on_site", "remote", "hybrid"],
              description: "Work arrangement: on_site, remote, hybrid",
            },
            education_requirements: {
              type: ["array", "null"],
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
              description:
                "Education requirements: no_requirements, high_school, associate_degree, bachelor_degree, professional_certificate, postgraduate_degree",
            },
            experience_months: {
              type: ["integer", "null"],
              description: "Minimum required experience in months, when stated",
            },
            client_extraction: {
              type: ["object", "null"],
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
              description:
                "Evidence-backed facts extracted by the client model from the posting; non-null evidence is a short source excerpt rather than an inference. Fields absent from the source are omitted or null.",
            },
          },
          required: [
            "url",
            "company_name",
            "title_name",
            "location_name",
            "description",
          ],
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
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
                      basedOn: {
                        type: ["string", "null"],
                      },
                      updatedAt: {
                        type: ["string", "null"],
                      },
                      source: {
                        type: "string",
                        enum: ["FoundRole"],
                      },
                      basis: {
                        type: "string",
                      },
                      methodologyUrl: {
                        type: "string",
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
                      employerFilingHistory: {
                        type: ["object", "null"],
                        properties: {
                          id: {
                            type: "string",
                          },
                          subject: {
                            type: ["object", "null"],
                            properties: {
                              id: {
                                type: "string",
                              },
                              domainDictionaryId: {
                                type: "string",
                              },
                              name: {
                                type: "string",
                              },
                              domain: {
                                type: "string",
                              },
                            },
                          },
                          attribution: {
                            type: "string",
                            enum: ["FILED_BY"],
                          },
                          bindingStatus: {
                            type: "string",
                            enum: ["LEGACY_UNREVIEWED", "UNRESOLVED"],
                          },
                          availability: {
                            type: "string",
                            enum: [
                              "AVAILABLE",
                              "NO_FILINGS",
                              "UNRESOLVED_EMPLOYER",
                              "NOT_READY",
                            ],
                          },
                          coverage: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                id: {
                                  type: "string",
                                },
                                fiscalYear: {
                                  type: "integer",
                                },
                                quarter: {
                                  type: "integer",
                                },
                              },
                            },
                          },
                          currentPeriod: {
                            type: ["object", "null"],
                            properties: {
                              id: {
                                type: "string",
                              },
                              label: {
                                type: "string",
                              },
                              startFiscalYear: {
                                type: "integer",
                              },
                              startQuarter: {
                                type: "integer",
                              },
                              endFiscalYear: {
                                type: "integer",
                              },
                              endQuarter: {
                                type: "integer",
                              },
                              coveredQuarters: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    id: {
                                      type: "string",
                                    },
                                    fiscalYear: {
                                      type: "integer",
                                    },
                                    quarter: {
                                      type: "integer",
                                    },
                                  },
                                },
                              },
                              complete: {
                                type: "boolean",
                              },
                            },
                          },
                          current: {
                            type: ["object", "null"],
                            properties: {
                              id: {
                                type: "string",
                              },
                              filings: {
                                type: "integer",
                              },
                              workerPositions: {
                                type: "integer",
                              },
                            },
                          },
                          history: {
                            type: "object",
                            properties: {
                              id: {
                                type: "string",
                              },
                              access: {
                                type: "string",
                                enum: [
                                  "AVAILABLE",
                                  "RESTRICTED",
                                  "UNAVAILABLE",
                                ],
                              },
                              points: {
                                type: ["array", "null"],
                                items: {
                                  type: "object",
                                  properties: {
                                    id: {
                                      type: "string",
                                    },
                                    filings: {
                                      type: "integer",
                                    },
                                    workerPositions: {
                                      type: "integer",
                                    },
                                    period: {
                                      type: ["object", "null"],
                                      properties: {
                                        id: {
                                          type: "string",
                                        },
                                        label: {
                                          type: "string",
                                        },
                                        startFiscalYear: {
                                          type: "integer",
                                        },
                                        startQuarter: {
                                          type: "integer",
                                        },
                                        endFiscalYear: {
                                          type: "integer",
                                        },
                                        endQuarter: {
                                          type: "integer",
                                        },
                                        coveredQuarters: {
                                          type: "array",
                                          items: {
                                            type: "object",
                                            properties: {
                                              id: {
                                                type: "string",
                                              },
                                              fiscalYear: {
                                                type: "integer",
                                              },
                                              quarter: {
                                                type: "integer",
                                              },
                                            },
                                          },
                                        },
                                        complete: {
                                          type: "boolean",
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                          wageLevel: {
                            type: "object",
                            properties: {
                              id: {
                                type: "string",
                              },
                              period: {
                                type: ["object", "null"],
                                properties: {
                                  id: {
                                    type: "string",
                                  },
                                  label: {
                                    type: "string",
                                  },
                                  startFiscalYear: {
                                    type: "integer",
                                  },
                                  startQuarter: {
                                    type: "integer",
                                  },
                                  endFiscalYear: {
                                    type: "integer",
                                  },
                                  endQuarter: {
                                    type: "integer",
                                  },
                                  coveredQuarters: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        id: {
                                          type: "string",
                                        },
                                        fiscalYear: {
                                          type: "integer",
                                        },
                                        quarter: {
                                          type: "integer",
                                        },
                                      },
                                    },
                                  },
                                  complete: {
                                    type: "boolean",
                                  },
                                },
                              },
                              sampleSize: {
                                type: "integer",
                              },
                              availability: {
                                type: "string",
                                enum: [
                                  "AVAILABLE",
                                  "NO_FILINGS",
                                  "INSUFFICIENT_SAMPLE",
                                  "NOT_STATED",
                                  "NOT_READY",
                                  "UNRESOLVED_EMPLOYER",
                                ],
                              },
                              breakdown: {
                                type: ["object", "null"],
                                properties: {
                                  level1Pct: {
                                    type: ["number", "null"],
                                  },
                                  level2Pct: {
                                    type: ["number", "null"],
                                  },
                                  level3Pct: {
                                    type: ["number", "null"],
                                  },
                                  level4Pct: {
                                    type: ["number", "null"],
                                  },
                                  notStatedPct: {
                                    type: ["number", "null"],
                                  },
                                },
                              },
                            },
                          },
                        },
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
                          source: {
                            type: "string",
                            enum: ["FoundRole"],
                          },
                          basis: {
                            type: "string",
                          },
                          methodologyUrl: {
                            type: "string",
                          },
                        },
                      },
                      visaProvenance: {
                        type: ["object", "null"],
                        properties: {
                          source: {
                            type: "string",
                            enum: ["FoundRole"],
                          },
                          basis: {
                            type: "string",
                          },
                          methodologyUrl: {
                            type: "string",
                          },
                          falseMeans: {
                            type: "string",
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
                  lastSeenAt: {
                    type: ["string", "null"],
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
                        type: ["string", "null"],
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
          },
        },
        annotations: {
          destructiveHint: false,
          idempotentHint: false,
          openWorldHint: false,
          readOnlyHint: false,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "jobs_compare",
        title: "Compare jobs",
        description:
          "Compares 2 to 4 jobs side by side using the same FoundRole analysis fields: resume match, missing skills,\nH-1B and E-Verify signals, ghost-job risk, posted pay, and market salary estimates.\n\n`comparison_refs` accepts exact FoundRole job IDs returned by jobs_search and exact external\n`comparisonRef` URLs returned by jobs_analyze_external. Analyze each outside job first; a bare URL that\nhas not been analyzed cannot be compared because FoundRole does not have its posting facts. Preserve\nevery reference exactly, keep the user's requested order, and do not send duplicates.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
          required: ["comparison_refs"],
          properties: {
            comparison_refs: {
              type: "array",
              minItems: 2,
              maxItems: 4,
              items: {
                type: "string",
              },
              description:
                "Two to four exact FoundRole job IDs or external comparisonRef URLs",
            },
          },
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          required: ["mode", "jobs", "statusOrder", "trackerWebUrl"],
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
                      basedOn: {
                        type: ["string", "null"],
                      },
                      updatedAt: {
                        type: ["string", "null"],
                      },
                      source: {
                        type: "string",
                        enum: ["FoundRole"],
                      },
                      basis: {
                        type: "string",
                      },
                      methodologyUrl: {
                        type: "string",
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
                      employerFilingHistory: {
                        type: ["object", "null"],
                        properties: {
                          id: {
                            type: "string",
                          },
                          subject: {
                            type: ["object", "null"],
                            properties: {
                              id: {
                                type: "string",
                              },
                              domainDictionaryId: {
                                type: "string",
                              },
                              name: {
                                type: "string",
                              },
                              domain: {
                                type: "string",
                              },
                            },
                          },
                          attribution: {
                            type: "string",
                            enum: ["FILED_BY"],
                          },
                          bindingStatus: {
                            type: "string",
                            enum: ["LEGACY_UNREVIEWED", "UNRESOLVED"],
                          },
                          availability: {
                            type: "string",
                            enum: [
                              "AVAILABLE",
                              "NO_FILINGS",
                              "UNRESOLVED_EMPLOYER",
                              "NOT_READY",
                            ],
                          },
                          coverage: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                id: {
                                  type: "string",
                                },
                                fiscalYear: {
                                  type: "integer",
                                },
                                quarter: {
                                  type: "integer",
                                },
                              },
                            },
                          },
                          currentPeriod: {
                            type: ["object", "null"],
                            properties: {
                              id: {
                                type: "string",
                              },
                              label: {
                                type: "string",
                              },
                              startFiscalYear: {
                                type: "integer",
                              },
                              startQuarter: {
                                type: "integer",
                              },
                              endFiscalYear: {
                                type: "integer",
                              },
                              endQuarter: {
                                type: "integer",
                              },
                              coveredQuarters: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    id: {
                                      type: "string",
                                    },
                                    fiscalYear: {
                                      type: "integer",
                                    },
                                    quarter: {
                                      type: "integer",
                                    },
                                  },
                                },
                              },
                              complete: {
                                type: "boolean",
                              },
                            },
                          },
                          current: {
                            type: ["object", "null"],
                            properties: {
                              id: {
                                type: "string",
                              },
                              filings: {
                                type: "integer",
                              },
                              workerPositions: {
                                type: "integer",
                              },
                            },
                          },
                          history: {
                            type: "object",
                            properties: {
                              id: {
                                type: "string",
                              },
                              access: {
                                type: "string",
                                enum: [
                                  "AVAILABLE",
                                  "RESTRICTED",
                                  "UNAVAILABLE",
                                ],
                              },
                              points: {
                                type: ["array", "null"],
                                items: {
                                  type: "object",
                                  properties: {
                                    id: {
                                      type: "string",
                                    },
                                    filings: {
                                      type: "integer",
                                    },
                                    workerPositions: {
                                      type: "integer",
                                    },
                                    period: {
                                      type: ["object", "null"],
                                      properties: {
                                        id: {
                                          type: "string",
                                        },
                                        label: {
                                          type: "string",
                                        },
                                        startFiscalYear: {
                                          type: "integer",
                                        },
                                        startQuarter: {
                                          type: "integer",
                                        },
                                        endFiscalYear: {
                                          type: "integer",
                                        },
                                        endQuarter: {
                                          type: "integer",
                                        },
                                        coveredQuarters: {
                                          type: "array",
                                          items: {
                                            type: "object",
                                            properties: {
                                              id: {
                                                type: "string",
                                              },
                                              fiscalYear: {
                                                type: "integer",
                                              },
                                              quarter: {
                                                type: "integer",
                                              },
                                            },
                                          },
                                        },
                                        complete: {
                                          type: "boolean",
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                          wageLevel: {
                            type: "object",
                            properties: {
                              id: {
                                type: "string",
                              },
                              period: {
                                type: ["object", "null"],
                                properties: {
                                  id: {
                                    type: "string",
                                  },
                                  label: {
                                    type: "string",
                                  },
                                  startFiscalYear: {
                                    type: "integer",
                                  },
                                  startQuarter: {
                                    type: "integer",
                                  },
                                  endFiscalYear: {
                                    type: "integer",
                                  },
                                  endQuarter: {
                                    type: "integer",
                                  },
                                  coveredQuarters: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        id: {
                                          type: "string",
                                        },
                                        fiscalYear: {
                                          type: "integer",
                                        },
                                        quarter: {
                                          type: "integer",
                                        },
                                      },
                                    },
                                  },
                                  complete: {
                                    type: "boolean",
                                  },
                                },
                              },
                              sampleSize: {
                                type: "integer",
                              },
                              availability: {
                                type: "string",
                                enum: [
                                  "AVAILABLE",
                                  "NO_FILINGS",
                                  "INSUFFICIENT_SAMPLE",
                                  "NOT_STATED",
                                  "NOT_READY",
                                  "UNRESOLVED_EMPLOYER",
                                ],
                              },
                              breakdown: {
                                type: ["object", "null"],
                                properties: {
                                  level1Pct: {
                                    type: ["number", "null"],
                                  },
                                  level2Pct: {
                                    type: ["number", "null"],
                                  },
                                  level3Pct: {
                                    type: ["number", "null"],
                                  },
                                  level4Pct: {
                                    type: ["number", "null"],
                                  },
                                  notStatedPct: {
                                    type: ["number", "null"],
                                  },
                                },
                              },
                            },
                          },
                        },
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
                          source: {
                            type: "string",
                            enum: ["FoundRole"],
                          },
                          basis: {
                            type: "string",
                          },
                          methodologyUrl: {
                            type: "string",
                          },
                        },
                      },
                      visaProvenance: {
                        type: ["object", "null"],
                        properties: {
                          source: {
                            type: "string",
                            enum: ["FoundRole"],
                          },
                          basis: {
                            type: "string",
                          },
                          methodologyUrl: {
                            type: "string",
                          },
                          falseMeans: {
                            type: "string",
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
                  lastSeenAt: {
                    type: ["string", "null"],
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
                        type: ["string", "null"],
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
          },
        },
        annotations: {
          destructiveHint: false,
          idempotentHint: false,
          openWorldHint: false,
          readOnlyHint: true,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "job_application_preview",
        title: "Preview help with a job application",
        description:
          "Previews how a selected saved resume relates to a specific job. Tailoring identifies a requirement and\nsuggests how to make existing evidence clearer. Fit reports supported evidence and a gap where available.\nCover letter offers a starting point grounded in an actual experience and the posting. The preview is read-only.\nresume_id selects an owned resume version. Without it the tool uses the primary or only resume, or returns choices.\nThe result can include an exact website continuation and whether opening it saves the job in the tracker.\nThis preview requires permission to share saved resume evidence. Resume parsing is a separate resume_check workflow.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
          required: ["job_id", "workflow"],
          properties: {
            job_id: {
              type: "string",
              minLength: 1,
              description: "Exact job ID from jobs_search",
            },
            workflow: {
              type: "string",
              enum: ["tailoring", "fit", "cover_letter"],
            },
            resume_id: {
              type: "string",
              format: "uuid",
            },
          },
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          required: ["status"],
          properties: {
            status: {
              type: "string",
              enum: [
                "ready",
                "no_evidence",
                "no_requirements",
                "missing",
                "processing",
                "unavailable",
                "choose_version",
                "restart",
              ],
            },
            workflow: {
              type: "string",
              enum: ["tailoring", "fit", "cover_letter"],
            },
            requirement: {
              type: ["string", "null"],
            },
            resumeEvidence: {
              type: ["string", "null"],
            },
            evidenceGap: {
              type: ["string", "null"],
            },
            guidance: {
              type: "string",
            },
            continueLabel: {
              type: "string",
            },
            continueUrl: {
              type: "string",
            },
            savesJobOnOpen: {
              type: "boolean",
            },
            contextUrl: {
              type: "string",
            },
            resume: {
              type: "object",
            },
            versions: {
              type: "array",
              items: {
                type: "object",
              },
            },
            moreVersions: {
              type: "boolean",
            },
          },
        },
        annotations: {
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
          readOnlyHint: true,
        },
      },
      {
        name: "resume_check",
        title: "Check how hiring software reads a resume",
        description:
          "Checks resume text for machine-readable sections, recognized skills, contact channels, a headline,\nand experience date ranges using FoundRole's deterministic parser.\n\nresume_text checks plain text supplied in the conversation. resume_id selects an upload or editable version\nowned by the authenticated user, when its FoundRole ID is known. An explicit check accepts one of these\ninputs. With neither input the tool reads the primary upload. A version check reads its current plain-text rendering.\nIt returns a readability band (strong, good, partial) and the single biggest loss. Depending on the\naccount it also returns additional findings and the parsed facts (headline, years of experience,\nsections, contact channels, recognized skill count). Each finding includes a suggested fix.\nA completed check can offer an optional step to take the resume into Resume Studio. A checked saved upload can include parserReportUrl for the same upload in Resume Studio. This is FoundRole's text-readability assessment,\nnot a test against a named ATS, a hiring prediction, or a file-layout check. Pasted text does not\npreserve the original PDF or DOCX layout.\n\nThe tool does not upload a file, create a saved resume or report, change the user's profile, submit an\napplication, or fetch URLs found in the text. It may return a FoundRole website link; opening that link\nand uploading or editing a resume are separate user actions. Operational request records and diagnostics\nmay retain tool inputs; this tool does not promise that submitted text is never stored.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
          not: {
            required: ["resume_text", "resume_id"],
          },
          properties: {
            resume_text: {
              type: "string",
              description:
                "Plain text of the resume to check, when it is available in the conversation. Omit to check the resume uploaded to the user's FoundRole account. Minimum 200 characters.",
            },
            resume_id: {
              type: "string",
              format: "uuid",
              minLength: 36,
              maxLength: 36,
              description:
                "FoundRole ID of the owned upload or editable version to check instead of pasted text.",
            },
          },
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          required: ["mode"],
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
                  fix: {
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
            parserReportUrl: {
              type: ["string", "null"],
            },
            profileSetupUrl: {
              type: ["string", "null"],
            },
            resultBatchId: {
              type: "string",
            },
            studioContinuation: {
              type: ["object", "null"],
              properties: {
                kind: {
                  type: "string",
                  enum: ["upload", "import", "edit"],
                },
                url: {
                  type: "string",
                },
              },
              required: ["kind", "url"],
              additionalProperties: false,
            },
          },
        },
        annotations: {
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
          readOnlyHint: true,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "knowledge_search",
        title: "Search career guides",
        description:
          "Searches FoundRole's published content by semantic similarity and returns the most relevant sources for a\njob-search question: career-guidance blog articles plus FoundRole site pages that describe the product's\nfeatures (job tracker, H1B salary data, AI job search) and industry/sector career\nlandings. Each article carries a title, url, summary, a content excerpt, publication date, and tags; each\npage carries a title, url, description, and its FAQ entries — enough material to answer the question and\nlink the source.\n\nTwo optional facets add further result groups: company returns FoundRole's employer profile pages\nmatching that company name; location returns the market landing page for that city, state, or country —\nan analytical page about that labour market, not a list of openings. The facets describe what the user is\nasking about — a company mentioned only in passing does not need the company facet.\n\nEvery response to a question also carries methodology: FoundRole's own explanation of how its pay\nestimates, real-or-ghost grades, remote checks and visa sponsorship records are computed, with the url\nof the page that publishes it. It answers where a FoundRole figure comes from.\n\nReturns empty groups when nothing is relevant rather than padding with off-topic content. Results are the\nclosest matches to the given question, not an index of the site's full coverage; questions about overall\ntopic coverage are answered by knowledge_topics, which lists the blog's categories and tags with article\ncounts. It does not search job listings and reports no open-job counts — jobs_search covers live roles,\nincluding questions about openings for a particular job title.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          additionalProperties: false,
          required: ["query"],
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
              minimum: 1,
              maximum: 8,
              description: "Maximum articles to return (default 5)",
            },
          },
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
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
            methodology: {
              type: ["object", "null"],
              properties: {
                title: {
                  type: "string",
                },
                url: {
                  type: "string",
                },
                summary: {
                  type: "string",
                },
              },
            },
            totalCount: {
              type: "integer",
            },
            profileSetupUrl: {
              type: ["string", "null"],
            },
          },
        },
        annotations: {
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
          readOnlyHint: true,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
      {
        name: "knowledge_topics",
        title: "List career guide topics",
        description:
          "Lists what FoundRole's published career-guidance blog covers: every category and the most-used tags,\neach with its published-article count and url, plus the total number of published articles. This is the\nfactual source for questions about the blog's topics or overall coverage. It takes no parameters and\nreflects the live published corpus. It does not retrieve articles for a specific question;\nknowledge_search does that.\n",
        inputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          properties: {},
          additionalProperties: false,
        },
        outputSchema: {
          $schema: "https://json-schema.org/draft/2020-12/schema",
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
          },
        },
        annotations: {
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
          readOnlyHint: true,
        },
        _meta: {
          securitySchemes: [
            {
              type: "oauth2",
              scopes: ["mcp:tools"],
            },
          ],
        },
      },
    ],
  },
};
