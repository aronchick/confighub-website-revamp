export type HeroInspectorMode = 'git' | 'confighub';

export interface RenderedImpactRow {
  cluster: string;
  workload: string;
  changeSummary: string;
  crossRefStatus: string;
  gateTone: 'ok' | 'warn' | 'deny';
  gateLabel: string;
}

export const HERO_IMPACT_ROWS: RenderedImpactRow[] = [
  {
    cluster: 'prod-us-east-1 (Tier-0)',
    workload: 'payments-ingress / Deployment',
    changeSummary: 'image -> 1.12.4-patched, timeout -> 30s',
    crossRefStatus: '3 webhook TLS refs synced',
    gateTone: 'ok',
    gateLabel: 'Ready · Ring 0',
  },
  {
    cluster: 'prod-eu-west-2 (Tier-0)',
    workload: 'checkout-gateway / Deployment',
    changeSummary: 'image -> 1.12.4-patched, timeout -> 30s',
    crossRefStatus: 'Service port 8443 verified',
    gateTone: 'warn',
    gateLabel: 'Hold · Named Approval',
  },
  {
    cluster: 'prod-us-west-2 (Tier-1)',
    workload: 'ledger-worker / StatefulSet',
    changeSummary: 'serviceAccountName unchanged (locked)',
    crossRefStatus: 'Field lock enforced by policy',
    gateTone: 'deny',
    gateLabel: 'Field Locked',
  },
  {
    cluster: 'prod-ap-south-1 (+281 more)',
    workload: 'edge-api / 281 fleet units',
    changeSummary: 'Staged after Ring 0 + Ring 1 health pass',
    crossRefStatus: '0 broken selectors',
    gateTone: 'ok',
    gateLabel: 'Queued · Ring 2',
  },
];

export type RemediationScenarioId = 'ingress-rce' | 'openssl-base' | 'zero-day-control';

export type RemediationStageIndex = 0 | 1 | 2 | 3;

export interface FleetTargetRow {
  cluster: string;
  exposure: string;
  currentValue: string;
  proposedAction: string;
  ring: string;
}

export interface RemediationScenario {
  id: RemediationScenarioId;
  shortLabel: string;
  cveCode: string;
  scannerInput: string;
  elapsedTime: string;
  affectedWorkloads: number;
  affectedClusters: number;
  skippedClusters: number;
  queryCommand: string;
  agentIdentity: string;
  agentProposalTitle: string;
  agentProposalCode: string;
  agentRationale: string;
  targets: FleetTargetRow[];
  receiptDigest: string;
  approver: string;
  deliveryTool: string;
}

export const REMEDIATION_SCENARIOS: RemediationScenario[] = [
  {
    id: 'ingress-rce',
    shortLabel: 'CVE-2026-4108 · Ingress RCE',
    cveCode: 'CVE-2026-4108 (CVSS 9.8)',
    scannerInput: 'Wiz / Trivy advisory: remote code execution in ingress-nginx < 1.12.4',
    elapsedTime: '4m 18s (vs. 3.5 days via Git PRs)',
    affectedWorkloads: 47,
    affectedClusters: 14,
    skippedClusters: 186,
    queryCommand: [
      'cub unit list --env prod \\',
      '  --where-data "containers[*].image CONTAINS \'ingress-nginx:1.11\'"',
    ].join('\n'),
    agentIdentity: 'agent:secops-patcher-01 (scoped: image-tag-only)',
    agentProposalTitle: 'Targeted image bump + webhook validation on 47 exposed units',
    agentProposalCode: [
      'cub run set-image --where-unit-set "cve-2026-4108-exposed" \\',
      '  --container controller \\',
      '  --image registry.internal/ingress-nginx:1.12.4@sha256:9f2c... \\',
      '  --change-desc "CVE-2026-4108 emergency patch (Ring 0 -> Ring 2)" \\',
      '  --protect',
    ].join('\n'),
    agentRationale:
      'Ranked internet-facing payment and auth clusters into Ring 0 first. Left 186 unaffected clusters untouched so zero healthy workloads restart unnecessarily.',
    targets: [
      {
        cluster: 'prod-us-east-1',
        exposure: 'Internet-facing · Tier-0',
        currentValue: 'ingress-nginx:1.11.2',
        proposedAction: 'Upgrade to 1.12.4@sha256:9f2c',
        ring: 'Ring 0 (Canary)',
      },
      {
        cluster: 'prod-eu-west-2',
        exposure: 'Internet-facing · Tier-0',
        currentValue: 'ingress-nginx:1.11.2',
        proposedAction: 'Upgrade to 1.12.4@sha256:9f2c',
        ring: 'Ring 1 (Regional)',
      },
      {
        cluster: 'prod-us-west-2',
        exposure: 'Internal mesh · Tier-1',
        currentValue: 'ingress-nginx:1.11.0',
        proposedAction: 'Upgrade to 1.12.4@sha256:9f2c',
        ring: 'Ring 2 (Fleet)',
      },
    ],
    receiptDigest: 'oci://registry.internal/releases/cve-2026-4108@sha256:4a91d8e0c2',
    approver: 'M. Alvarez (VP Security Ops) + Policy Gate #sec-09',
    deliveryTool: 'Argo CD + Flux (signed OCI pull, zero cluster credentials)',
  },
  {
    id: 'openssl-base',
    shortLabel: 'CVE-2026-8821 · OpenSSL Base',
    cveCode: 'CVE-2026-8821 (CVSS 9.1)',
    scannerInput: 'Chainguard / Snyk rebuild alert: OpenSSL 3.2.x base layer across mixed Helm charts',
    elapsedTime: '6m 04s (vs. 94 manual repo PRs)',
    affectedWorkloads: 112,
    affectedClusters: 38,
    skippedClusters: 162,
    queryCommand: [
      'cub unit list --env prod \\',
      '  --where-data "annotations[\'base-image.openssl\'] LIKE \'3.2.%\'"',
    ].join('\n'),
    agentIdentity: 'agent:supplychain-updater (scoped: base-digest)',
    agentProposalTitle: 'Pin verified zero-CVE image digests across 112 heterogeneous charts',
    agentProposalCode: [
      'cub run replace-image-digest --where-unit-set "openssl-32-fleet" \\',
      '  --from-tag "base-3.2.*" \\',
      '  --to-digest "registry.internal/base-hardened@sha256:7d14..." \\',
      '  --require-health-window 120s \\',
      '  --change-desc "CVE-2026-8821 base image repave"',
    ].join('\n'),
    agentRationale:
      'Bypassed 94 divergent Helm values.yaml schemas by mutating rendered container digests directly while preserving per-cluster memory limits and env vars.',
    targets: [
      {
        cluster: 'prod-payments-core',
        exposure: 'PCI Zone · Tier-0',
        currentValue: 'base-3.2.1 (14 CVEs)',
        proposedAction: 'Pin base-hardened@sha256:7d14',
        ring: 'Ring 0 (Canary)',
      },
      {
        cluster: 'prod-eu-frankfurt',
        exposure: 'DORA Regulated · Tier-0',
        currentValue: 'base-3.2.0 (14 CVEs)',
        proposedAction: 'Pin base-hardened@sha256:7d14',
        ring: 'Ring 1 (Regional)',
      },
      {
        cluster: 'prod-analytics-gpu',
        exposure: 'GPU Inference · Tier-1',
        currentValue: 'base-3.2.1 (14 CVEs)',
        proposedAction: 'Pin base-hardened@sha256:7d14',
        ring: 'Ring 2 (Fleet)',
      },
    ],
    receiptDigest: 'oci://registry.internal/releases/cve-2026-8821@sha256:88ef01a94b',
    approver: 'D. Chen (Head of Platform) + Checker Agent (Milton)',
    deliveryTool: 'Flux OCIController (progressive wave sync)',
  },
  {
    id: 'zero-day-control',
    shortLabel: 'Zero-Day · No Upstream Patch Yet',
    cveCode: 'ZERO-DAY-2026-11 (Active Exploit)',
    scannerInput: 'Threat feed: active exploitation before vendor patch; disable snippet annotations and isolate egress',
    elapsedTime: '52s (compensating control live)',
    affectedWorkloads: 29,
    affectedClusters: 9,
    skippedClusters: 191,
    queryCommand: [
      'cub unit list --env prod \\',
      '  --where-data "allowSnippetAnnotations == true OR kind == \'NetworkPolicy\'"',
    ].join('\n'),
    agentIdentity: 'agent:mitigation-responder (scoped: policy-and-flags)',
    agentProposalTitle: 'Apply compensating config lock + NetworkPolicy without waiting for vendor build',
    agentProposalCode: [
      'cub run set-field --where-unit-set "zero-day-exposed" \\',
      '  --path "data.allow-snippet-annotations" --value "false" --protect',
      'cub run attach-policy --where-unit-set "zero-day-exposed" \\',
      '  --policy "deny-metadata-egress-v2" \\',
      '  --change-desc "Zero-day compensating control prior to vendor patch"',
    ].join('\n'),
    agentRationale:
      'Blocked exploit vector immediately through configuration flags and egress isolation. Protected fields prevent automated chart syncs from re-enabling the vulnerable flag.',
    targets: [
      {
        cluster: 'prod-edge-us',
        exposure: 'Public Ingress · Tier-0',
        currentValue: 'allow-snippet-annotations: true',
        proposedAction: 'Set false + lock + NetworkPolicy',
        ring: 'Ring 0 (Canary)',
      },
      {
        cluster: 'prod-edge-eu',
        exposure: 'Public Ingress · Tier-0',
        currentValue: 'allow-snippet-annotations: true',
        proposedAction: 'Set false + lock + NetworkPolicy',
        ring: 'Ring 1 (Regional)',
      },
      {
        cluster: 'prod-partner-api',
        exposure: 'B2B Gateway · Tier-1',
        currentValue: 'allow-snippet-annotations: true',
        proposedAction: 'Set false + lock + NetworkPolicy',
        ring: 'Ring 2 (Fleet)',
      },
    ],
    receiptDigest: 'oci://registry.internal/releases/zd-2026-11-mitigation@sha256:c1073e55f0',
    approver: 'R. Patel (CISO Delegate) + Policy Gate #zero-day',
    deliveryTool: 'Sveltos + Argo CD (immediate OCI release)',
  },
];

export type PolicyActionId = 'scale' | 'cve-patch' | 'rbac-escalate';

export interface PolicySandboxCase {
  id: PolicyActionId;
  actor: string;
  actionTitle: string;
  command: string;
  targetPath: string;
  verdict: 'APPROVED BY POLICY' | 'HELD FOR NAMED APPROVER' | 'BLOCKED AT FIELD LOCK';
  tone: 'ok' | 'warn' | 'deny';
  explanation: string;
  checksRun: string[];
  auditEntry: string;
}

export const POLICY_SANDBOX_CASES: PolicySandboxCase[] = [
  {
    id: 'scale',
    actor: 'agent:sre-autoscale (Claude via MCP)',
    actionTitle: 'Scale checkout-api replicas from 4 to 8 in prod-us-east',
    command: 'cub run set-replicas --space prod-us-east --unit checkout-api --replicas 8',
    targetPath: 'Deployment/checkout-api -> spec.replicas (4 -> 8)',
    verdict: 'APPROVED BY POLICY',
    tone: 'ok',
    explanation:
      'Within agent scope (replicas 2..16), budget guardrail passed ($118/day delta < $500 ceiling), and independent checker agent verified healthy node headroom. Released via OCI in 14 seconds.',
    checksRun: [
      'Identity verified: agent:sre-autoscale (non-human OIDC token)',
      'Field permission: spec.replicas writable within bounds [2, 16]',
      'Cross-reference check: HPA disabled on unit, no conflict',
      'Checker agent (Milton): approved, zero human interruption needed',
    ],
    auditEntry: 'rev_94821 · actor=agent:sre-autoscale · policy=scale-bounds-v3 · status=APPLIED (14s)',
  },
  {
    id: 'cve-patch',
    actor: 'agent:cve-remediator (Codex via CLI)',
    actionTitle: 'Upgrade payment-gateway TLS image across 14 prod clusters',
    command: 'cub run set-image --where-unit-set payment-tls --image registry.internal/gw:2.4.1',
    targetPath: '14 Deployments -> spec.template.spec.containers[0].image',
    verdict: 'HELD FOR NAMED APPROVER',
    tone: 'warn',
    explanation:
      'Blast radius spans Tier-0 payment workloads across multiple regions. ConfigHub generated the exact 14-workload rendered diff, verified signed registry provenance, and paused at the human gate for one click per blast radius.',
    checksRun: [
      'Identity verified: agent:cve-remediator (scoped to image digest)',
      'Registry verification: digest signed inside internal registry',
      'Blast radius gate: >5 Tier-0 units requires named human sign-off',
      'Rollout plan attached: Ring 0 (2 clusters) -> 180s observe -> Ring 1 -> Ring 2',
    ],
    auditEntry: 'rev_94822 · actor=agent:cve-remediator · gate=tier0-human-signoff · status=AWAITING_APPROVAL',
  },
  {
    id: 'rbac-escalate',
    actor: 'agent:dev-copilot (Cursor via MCP)',
    actionTitle: 'Grant ClusterRole wildcard read access to ledger-db secrets',
    command: 'cub run patch-rbac --unit ledger-db-access --verbs "*" --resources "secrets"',
    targetPath: 'ClusterRole/ledger-reader -> rules[0].resources ("secrets")',
    verdict: 'BLOCKED AT FIELD LOCK',
    tone: 'deny',
    explanation:
      'Hard field lock enforced before any cluster sees the manifest. Even if an agent hallucinates or is prompt-injected, protected security fields cannot be modified without explicit platform-admin break-lock quorum.',
    checksRun: [
      'Identity verified: agent:dev-copilot (sandboxed app scope)',
      'Field lock violation: ClusterRole.rules is locked by security-baseline-v4',
      'Zero cluster access: agent holds no kubeconfig or cloud IAM keys',
      'Security alert emitted to SIEM with full prompt/command provenance',
    ],
    auditEntry: 'rev_94823 · actor=agent:dev-copilot · lock=rbac-baseline-v4 · status=REJECTED',
  },
];
