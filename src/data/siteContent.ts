export interface PainLedgerEntry {
  index: string;
  name: string;
  todayFailure: string;
  confighubMechanism: string;
}

export const PAIN_LEDGER: PainLedgerEntry[] = [
  {
    index: '01',
    name: 'Template Blindness',
    todayFailure:
      'A pull request shows a one-line edit in values.yaml or a Terraform module. Reviewers cannot see the 300 live workloads it mutates or the 12% of fields that silently reference another resource.',
    confighubMechanism:
      'Every setting is stored as fully rendered, literal data. Reviewers and agents see the exact workload-by-workload diff and linked cross-references before release.',
  },
  {
    index: '02',
    name: 'The Remediation Wall',
    todayFailure:
      'Scanners detect critical CVEs in seconds and AI attackers exploit them in hours. Patching across 200 clusters still takes days of manual PRs, or forces reckless fleet-wide blasts that break production.',
    confighubMechanism:
      'One database query isolates the exact exposed workloads. Agents propose targeted patches or immediate compensating controls, promoted gradually by risk ring with single-cluster rollback.',
  },
  {
    index: '03',
    name: 'Break-Glass Drift',
    todayFailure:
      'When an incident hits and the Git CI pipeline takes 20 minutes, engineers run kubectl edit directly on the cluster. GitOps self-heal reverts the fix mid-incident, or drift permanently erases the audit record.',
    confighubMechanism:
      'Emergency fixes take under 60 seconds on the normal paved path: typed field mutation, policy check, field lock protection, and signed OCI release to Argo CD or Flux.',
  },
  {
    index: '04',
    name: 'Audit Scavenger Hunts',
    todayFailure:
      'When auditors under SOX, SOC 2, DORA, FINRA, or the EU AI Act ask which workloads can reach customer data and which human or agent approved it, teams stitch together scripts and Slack threads for days.',
    confighubMechanism:
      'Every rendered setting carries revision history, actor identity (human or agent), change intent, and approval signatures. Export regulator-ready evidence from one query.',
  },
];

export interface FounderProfile {
  name: string;
  role: string;
  photo: string;
  bio: string;
}

export const FOUNDERS: FounderProfile[] = [
  {
    name: 'Brian Grant',
    role: 'Co-Founder & CTO',
    photo: '/assets/brian.jpg',
    bio: 'Co-created Kubernetes at Google and led its API and configuration architecture, following work on Borg and Omega. Co-creator of Kustomize and author of the Configuration as Data model.',
  },
  {
    name: 'Alexis Richardson',
    role: 'Co-Founder & CEO',
    photo: '/assets/alexis.jpg',
    bio: 'Coined GitOps and led Weaveworks and RabbitMQ as CEO. Former Chair of the CNCF Technical Oversight Committee with two decades building cloud-native operations infrastructure.',
  },
  {
    name: 'Jesper Joergensen',
    role: 'Co-Founder & CPO',
    photo: '/assets/jesper.jpg',
    bio: 'Led product for the Heroku platform at Salesforce and served as GM and platform executive at Twilio. Focused on making large-scale operational platforms simple and verifiable.',
  },
];

export interface BlogArticle {
  slug: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  title: string;
  excerpt: string;
  codeSnippet?: string;
  body: Array<{ heading?: string; paragraphs: string[] }>;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'surviving-the-vulnerability-apocalypse',
    date: '2026-11-18',
    category: 'Security & Fleet Ops',
    author: 'ConfigHub Engineering',
    readTime: '6 min read',
    title: 'Identifying the vulnerability is only step one: closing the finding-to-fixed gap',
    excerpt:
      'AI-speed discovery collapsed time-to-exploit from weeks to hours. Why scanners and automated PR bots still stall at production rollout, and how rendered configuration data turns days of patching into minutes.',
    codeSnippet: [
      '# 1. Isolate only the 47 exposed workloads across 200 clusters',
      'cub unit list --where-data "spec.template.spec.containers[*].image CONTAINS \'ingress-nginx:1.11\'"',
      '',
      '# 2. Apply targeted patch with Ring 0 canary gate and field lock',
      'cub run set-image --where-unit-set exposed-ingress \\',
      '  --image registry.internal/ingress-nginx:1.12.4@sha256:9f2c... \\',
      '  --promote-strategy canary-rings --protect',
    ].join('\n'),
    body: [
      {
        paragraphs: [
          'Every security team already knows how to find vulnerabilities fast. Cloud scanners detect an exposed container image in seconds, and hardened base-image builders cut a clean digest in minutes. Then remediation hits a wall.',
          'Across a 200-cluster estate, configuration hides inside hundreds of Helm charts, Kustomize overlays, and Terraform modules. Answering "which exact workloads render this vulnerable version or insecure annotation?" takes scripts, tribal memory, and hours of triage. Blasting a universal update across the fleet risks tearing down healthy services.',
        ],
      },
      {
        heading: 'Target first, roll out gradually, never tear down the fleet',
        paragraphs: [
          'When live configuration lives in a queryable database as fully rendered data, security and platform teams stop choosing between staying exposed and breaking production. One query isolates the exact affected units and ranks internet-facing Tier-0 clusters first.',
          'An AI remediation agent drafts either the targeted image bump or an immediate compensating control (such as disabling a vulnerable annotation and attaching a strict NetworkPolicy when no vendor patch exists yet). Policy gates verify signed digests, a named owner approves the blast radius once, and Argo CD or Flux delivers the release ring by ring. If Ring 1 fails health checks, only that cluster rolls back while Ring 0 stays protected.',
        ],
      },
    ],
  },
  {
    slug: 'fixing-production-without-break-glass',
    date: '2026-10-29',
    category: 'Live Operations',
    author: 'Jesper Joergensen',
    readTime: '5 min read',
    title: 'Fixing production without break-glass',
    excerpt:
      'When a production node starts flapping, the fastest safe fix should never be kubectl edit. How our team applied memory limits through ConfigHub in under a minute with full gating and audit history.',
    codeSnippet: [
      'cub run set-container-resources \\',
      '  --space prod-confighub-app --unit deployment --container-name confighub \\',
      '  --memory 2Gi --limit-factor 2 --protect',
      'cub run set-env-var \\',
      '  --space prod-confighub-app --unit deployment --container-name confighub \\',
      '  --env-var GOMEMLIMIT --env-value 3750MiB --protect',
      'cub release publish prod-confighub-app',
    ].join('\n'),
    body: [
      {
        paragraphs: [
          'Break-glass access exists because the paved road is usually too slow and too narrow during an outage. If your pipeline takes twenty minutes of CI to reach a cluster, engineers bypass Git and run kubectl edit directly against production.',
          'That shortcut causes three immediate failures: the fix is unrecorded, GitOps self-heal reverts it mid-incident, and the fix never propagates back to staging or new environments.',
        ],
      },
      {
        heading: 'Make the audited path faster than break-glass',
        paragraphs: [
          'During a real heap blowout on our own server, an agent diagnosed the missing memory ceiling immediately. Instead of opening a bastion session, we ran two scoped ConfigHub functions with field protection enabled and published a signed OCI release.',
          'Argo CD pulled the bundle and rolled the patched pod in under sixty seconds. Every field stayed recorded, protected against overwrite, and ready to promote cleanly across the remaining environments.',
        ],
      },
    ],
  },
  {
    slug: 'agents-manage-a-multi-cluster-fleet-under-policy',
    date: '2026-10-14',
    category: 'Agentic Governance',
    author: 'Alexis Richardson & Brian Grant',
    readTime: '7 min read',
    title: 'Separation of duties for AI agents: running a live fleet with Devil, Angel, and Milton',
    excerpt:
      'How we tested autonomous SRE agents on a five-cluster fleet where one agent injects failures, a second proposes fixes and preventive policies, and a third independent checker approves or rejects every change.',
    body: [
      {
        paragraphs: [
          'Giving an AI agent direct cluster credentials or raw Git write permissions creates an unacceptable blast radius. Blocking agents entirely leaves teams drowning under machine-speed change volume.',
          'To test safe autonomy in practice, we ran a multi-cluster experiment with three isolated non-human identities in ConfigHub: a Devil agent injecting faults, an Angel agent diagnosing outages and proposing configuration fixes plus preventive rules, and Milton, an independent checker agent that holds approval authority.',
        ],
      },
      {
        heading: 'No agent can approve its own change',
        paragraphs: [
          'Because ConfigHub treats rendered configuration and policy rules as structured data, Milton inspected exact workload diffs rather than guessing from text patches. Across twenty automated recovery proposals, Milton approved nineteen safe changes and blocked one unsafe change before it ever touched a cluster.',
          'The same architecture scales directly to regulated enterprises: deterministic field locks enforce hard floors, checker agents filter routine toil, and named human approvers sign off on high-impact production changes.',
        ],
      },
    ],
  },
  {
    slug: 'is-my-configuration-repo-a-database',
    date: '2026-09-22',
    category: 'Architecture',
    author: 'Brian Grant',
    readTime: '6 min read',
    title: 'Is your Git configuration repo trying to be a database?',
    excerpt:
      'Git excels at versioned source code. When hundreds of engineers and AI agents use Git as the operational store for 3 million live settings, file systems break down where databases thrive.',
    body: [
      {
        paragraphs: [
          'A platform engineering leader put the core failure mode plainly: GitOps breaks when teams treat Git like a database even though Git is a distributed file system.',
          'Rendering five standard Helm charts reveals an average of ~20 Kubernetes resources and ~30 fields per component. Across 200 clusters and 25 components, that multiplies to 3 million live settings. More than 12% of those fields reference another resource name, port, selector, or certificate, with nothing in the files recording the link.',
        ],
      },
      {
        heading: 'Keep Git for code. Use a database for live state.',
        paragraphs: [
          'Databases exist to provide indexed queries, atomic multi-object transactions, schema validation, and fine-grained field permissions. ConfigHub keeps Git for application source code and keeps Argo CD, Flux, and Terraform for actuation, while placing a purpose-built configuration database in between.',
        ],
      },
    ],
  },
];

export type FaqCategory = 'All' | 'Architecture' | 'AI & Security' | 'Enterprise';

export interface FaqEntry {
  id: string;
  category: Exclude<FaqCategory, 'All'>;
  question: string;
  answer: string;
}

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    id: 'vs-gitops',
    category: 'Architecture',
    question: 'Does ConfigHub replace Git, Helm, Argo CD, or Flux?',
    answer:
      'No. Git remains the system of record for application source code. Argo CD, Flux, Sveltos, Crossplane, and Terraform continue reconciling your target infrastructure. ConfigHub sits between developer or agent intent and delivery as the governed database of rendered configuration, publishing signed OCI releases your existing reconcilers pull.',
  },
  {
    id: 'wet-vs-dry',
    category: 'Architecture',
    question: 'If configuration is stored fully rendered (WET), how do we avoid copy-paste drift across 200 clusters?',
    answer:
      'Duplication is only painful when humans edit text files by hand. In a database, ConfigHub models base units, thin environment Variants, and fleet-wide bulk functions. You update a base image or security policy once across 200 clusters via a typed bulk operation, while per-cluster overrides (regions, endpoints, capacity) stay intact and explicit.',
  },
  {
    id: 'vs-scanners',
    category: 'AI & Security',
    question: 'How does ConfigHub work with Wiz, Snyk, Aikido, or Chainguard?',
    answer:
      'Scanners and base-image builders solve detection and clean artifact creation. ConfigHub solves what happens next: locating every exposed workload across heterogeneous clusters in one query, drafting targeted upgrades or compensating config controls, staging rollouts by risk ring, and producing an auditable Applied receipt.',
  },
  {
    id: 'vs-akuity-harness-pulumi',
    category: 'Architecture',
    question: 'How is ConfigHub different from Akuity/Kargo, Harness, or Pulumi?',
    answer:
      'Akuity and Harness orchestrate deployment pipelines over configuration that remains hidden in Git templates. Pulumi treats infrastructure as imperative programming code, which works well for initial provisioning but cannot query 3 million rendered live fields or apply pinpoint cross-chart day-2 edits without running arbitrary programs. ConfigHub stores the live rendered state itself as structured, queryable data.',
  },
  {
    id: 'llm-egress',
    category: 'AI & Security',
    question: 'Does ConfigHub send our production configuration data to an external LLM?',
    answer:
      'No. ConfigHub is a 100% deterministic configuration database and policy engine. It requires zero external AI calls to operate and runs fully self-hosted or air-gapped inside your VPC. When you choose to connect your own approved AI agents (Claude, Codex, Cursor, or internal bots) via MCP, CLI, or API, they operate strictly inside your network perimeter under scoped identities and field locks.',
  },
  {
    id: 'cluster-creds',
    category: 'AI & Security',
    question: 'Do AI agents or ConfigHub need kubeconfig or production cloud credentials?',
    answer:
      'No. Agents interact exclusively with the ConfigHub API under scoped non-human service accounts. Approved changes publish as signed OCI bundles to your internal registry (such as JFrog Artifactory or ECR), and your existing in-cluster reconcilers pull and apply them.',
  },
  {
    id: 'self-hosted',
    category: 'Enterprise',
    question: 'Can we run ConfigHub completely inside our own cloud or air-gapped data center?',
    answer:
      'Yes. ConfigHub Enterprise deploys inside your private cloud (EKS, GKE, AKS), on-premises Kubernetes, or air-gapped networks with SSO/OIDC, Active Directory group mapping, per-business-unit Organization Perimeters, and zero outbound data transmission.',
  },
  {
    id: 'poc',
    category: 'Enterprise',
    question: 'How fast can our platform and security teams evaluate ConfigHub?',
    answer:
      'Start with the interactive sandbox or 15-minute CLI quickstart today with no waitlist. For regulated enterprises, our standard PoC runs inside your VPC against one concrete scenario (such as one live CVE patch end-to-end or a multi-environment promotion workflow) with agreed success criteria in week one.',
  },
];
