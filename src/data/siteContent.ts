export interface FounderProfile {
  name: string;
  role: string;
  photo: string;
  bio: string;
}

export const FOUNDERS: FounderProfile[] = [
  {
    name: 'Alexis Richardson',
    role: 'Co-Founder & CEO',
    photo: '/assets/alexis.jpg',
    bio: 'Coined GitOps. Former CEO of Weaveworks and RabbitMQ; former CNCF TOC Chair.',
  },
  {
    name: 'Brian Grant',
    role: 'Co-Founder & CTO',
    photo: '/assets/brian.jpg',
    bio: 'Co-created Kubernetes and Kustomize at Google. Author of Configuration as Data.',
  },
  {
    name: 'Jesper Joergensen',
    role: 'Co-Founder & CPO',
    photo: '/assets/jesper.jpg',
    bio: 'Former Heroku product lead at Salesforce and platform GM at Twilio.',
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
    readTime: '5 min read',
    title: 'Finding the vulnerability is only step one: closing the finding-to-fixed gap',
    excerpt:
      'Scanners detect CVEs in seconds and exploits arrive in hours. Why GitOps PR queues stall remediation, and how Agentic GitOps patches fleets gradually in minutes.',
    codeSnippet: [
      'cub resource list --where "containers.*.image LIKE \'%ingress-nginx:1.11%\'"',
      'cub function set --where-unit-set exposed-ingress --protect \\',
      '  set-container-image controller registry.internal/ingress-nginx:1.12.4',
    ].join('\n'),
    body: [
      {
        paragraphs: [
          'Scanners detect an exposed container image in seconds, and base-image builders cut clean digests in minutes. Then remediation stalls across hundreds of Helm repos and manual PR queues.',
          'When live configuration sits in a queryable database, one query isolates the exact exposed workloads. Agents draft targeted patches or compensating NetworkPolicies, roll them out ring by ring, and revert a single failing cluster without touching the rest of the fleet.',
        ],
      },
    ],
  },
  {
    slug: 'fixing-production-without-break-glass',
    date: '2026-10-29',
    category: 'Live Operations',
    author: 'Jesper Joergensen',
    readTime: '4 min read',
    title: 'Fixing production without break-glass',
    excerpt:
      'When production is melting down, the fastest safe fix should never be kubectl edit. How we fixed a live memory blowout in under a minute on the audited path.',
    codeSnippet: [
      'cub run set-container-resources --space prod-app --unit deployment \\',
      '  --memory 2Gi --limit-factor 2 --protect',
      'cub release publish prod-app',
    ].join('\n'),
    body: [
      {
        paragraphs: [
          'Break-glass exists because Git CI pipelines take twenty minutes during an outage. Engineers run kubectl edit, GitOps self-heal reverts it mid-incident, and the audit trail disappears.',
          'With ConfigHub, two scoped mutations with field protection published a signed OCI bundle to Argo CD in under sixty seconds with full revision history intact.',
        ],
      },
    ],
  },
  {
    slug: 'agents-manage-a-multi-cluster-fleet-under-policy',
    date: '2026-10-14',
    category: 'Agentic GitOps',
    author: 'Alexis Richardson & Brian Grant',
    readTime: '6 min read',
    title: 'Separation of duties for AI agents: Devil, Angel, and Milton',
    excerpt:
      'One agent injects outages, a second proposes fixes and policies, and a third independent checker approves 19 safe changes and blocks 1 unsafe one.',
    body: [
      {
        paragraphs: [
          'Giving an AI agent cluster credentials creates unbounded blast radius. Blocking agents entirely leaves teams buried under machine-speed change volume.',
          'By giving every agent a scoped identity and enforcing separation of duties in ConfigHub, no agent approves its own change and every mutation stays queryable and reversible.',
        ],
      },
    ],
  },
  {
    slug: 'is-my-configuration-repo-a-database',
    date: '2026-09-22',
    category: 'Architecture',
    author: 'Brian Grant',
    readTime: '5 min read',
    title: 'Is your Git configuration repo trying to be a database?',
    excerpt:
      'Git excels at source code. Across 200 clusters and 3 million live settings, file systems break where databases thrive.',
    body: [
      {
        paragraphs: [
          'Rendering five standard Helm charts produces ~20 resources and ~30 fields per component, with 12% of fields referencing another resource name, port, or selector.',
          'Keep Git for source code. Store live rendered configuration in a database built for indexed queries, field locks, and atomic fleet changes.',
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
    id: 'what-is-agentic-gitops',
    category: 'Architecture',
    question: 'What is Agentic GitOps?',
    answer:
      'GitOps reconciled clusters from files in Git at human pace. Agentic GitOps keeps your reconcilers (Argo CD, Flux, Sveltos) and upgrades the record underneath to a queryable configuration database so humans and AI agents can inspect, guard, and ship changes at machine speed.',
  },
  {
    id: 'vs-gitops',
    category: 'Architecture',
    question: 'Does ConfigHub replace Git, Helm, Argo CD, or Flux?',
    answer:
      'No. Git keeps source code. Argo CD, Flux, Sveltos, and Terraform keep delivering to clusters. ConfigHub sits in between as the governed database of rendered configuration, publishing signed OCI releases.',
  },
  {
    id: 'wet-vs-dry',
    category: 'Architecture',
    question: 'How does storing rendered config (WET) avoid copy-paste drift?',
    answer:
      'ConfigHub models base units, thin environment variants, and typed bulk operations. Update a setting or image once across 200 clusters while keeping per-cluster overrides explicit and intact.',
  },
  {
    id: 'vs-scanners',
    category: 'AI & Security',
    question: 'How does ConfigHub work with Wiz, Snyk, or Chainguard?',
    answer:
      'Scanners detect CVEs and image builders cut clean artifacts. ConfigHub executes what happens next: finding every exposed workload in one query, rolling out patches or compensating controls by ring, and recording an immutable audit receipt.',
  },
  {
    id: 'llm-egress',
    category: 'AI & Security',
    question: 'Does ConfigHub send our configuration to an external LLM?',
    answer:
      'No. The core database and policy engine are 100% deterministic and run air-gapped inside your VPC. Your own approved agents connect over MCP, CLI, or API strictly inside your perimeter.',
  },
  {
    id: 'cluster-creds',
    category: 'AI & Security',
    question: 'Do agents or ConfigHub hold cluster credentials?',
    answer:
      'No. Approved changes publish as signed OCI bundles to your internal registry, and your existing in-cluster reconcilers pull them.',
  },
  {
    id: 'self-hosted',
    category: 'Enterprise',
    question: 'Can we self-host inside our VPC or air-gapped network?',
    answer:
      'Yes. ConfigHub Enterprise runs on your own Kubernetes clusters with SSO/OIDC, Active Directory group perimeters, BYOK encryption, and zero outbound telemetry.',
  },
];
