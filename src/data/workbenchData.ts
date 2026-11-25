export type HeroInspectorMode = 'git' | 'confighub';

export interface RenderedImpactRow {
  cluster: string;
  workload: string;
  mutation: string;
  gateTone: 'ok' | 'warn' | 'deny';
  gateLabel: string;
}

export const HERO_IMPACT_ROWS: RenderedImpactRow[] = [
  {
    cluster: 'prod-us-east-1',
    workload: 'payments-ingress',
    mutation: 'image -> 1.12.4 · 3 TLS refs synced',
    gateTone: 'ok',
    gateLabel: 'Ring 0 Ready',
  },
  {
    cluster: 'prod-eu-west-2',
    workload: 'checkout-gateway',
    mutation: 'image -> 1.12.4 · port 8443 verified',
    gateTone: 'warn',
    gateLabel: 'Needs Approval',
  },
  {
    cluster: 'prod-us-west-2 (+281)',
    workload: 'ledger-worker',
    mutation: 'serviceAccountName unchanged',
    gateTone: 'deny',
    gateLabel: 'Field Locked',
  },
];

export type RemediationScenarioId = 'ingress-rce' | 'openssl-base' | 'zero-day-control';

export type RemediationStageIndex = 0 | 1 | 2 | 3;

export interface FleetTargetRow {
  cluster: string;
  tier: string;
  liveValue: string;
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
  agentProposalCode: string;
  targets: FleetTargetRow[];
  receiptDigest: string;
  approver: string;
}

export const REMEDIATION_SCENARIOS: RemediationScenario[] = [
  {
    id: 'ingress-rce',
    shortLabel: 'CVE-2026-4108 · Ingress RCE',
    cveCode: 'CVSS 9.8',
    scannerInput: 'Wiz alert: ingress-nginx < 1.12.4 RCE',
    elapsedTime: '4m 18s',
    affectedWorkloads: 47,
    affectedClusters: 14,
    skippedClusters: 186,
    queryCommand: 'cub resource list --where "containers.*.image LIKE \'%ingress-nginx:1.11%\'"',
    agentIdentity: 'agent:secops-patcher (image-tag only)',
    agentProposalCode: [
      'cub function set --where-unit-set cve-4108 --protect \\',
      '  set-container-image controller registry.internal/ingress-nginx:1.12.4',
    ].join('\n'),
    targets: [
      { cluster: 'prod-us-east-1', tier: 'Public · Tier-0', liveValue: 'ingress-nginx:1.11.2', ring: 'Ring 0' },
      { cluster: 'prod-eu-west-2', tier: 'Public · Tier-0', liveValue: 'ingress-nginx:1.11.2', ring: 'Ring 1' },
      { cluster: 'prod-us-west-2', tier: 'Mesh · Tier-1', liveValue: 'ingress-nginx:1.11.0', ring: 'Ring 2' },
    ],
    receiptDigest: 'oci://registry.internal/releases/cve-4108@sha256:4a91d8e0',
    approver: 'M. Alvarez (SecOps) + Policy #sec-09',
  },
  {
    id: 'openssl-base',
    shortLabel: 'CVE-2026-8821 · OpenSSL Base',
    cveCode: 'CVSS 9.1',
    scannerInput: 'Chainguard alert: OpenSSL 3.2.x base image rebuild',
    elapsedTime: '6m 04s',
    affectedWorkloads: 112,
    affectedClusters: 38,
    skippedClusters: 162,
    queryCommand: 'cub resource list --where "annotations.openssl LIKE \'3.2.%\'"',
    agentIdentity: 'agent:supplychain-bot (digest only)',
    agentProposalCode: [
      'cub function set --where-unit-set openssl-32 --protect \\',
      '  replace-digest registry.internal/base-hardened@sha256:7d14',
    ].join('\n'),
    targets: [
      { cluster: 'prod-payments', tier: 'PCI · Tier-0', liveValue: 'base-3.2.1', ring: 'Ring 0' },
      { cluster: 'prod-frankfurt', tier: 'DORA · Tier-0', liveValue: 'base-3.2.0', ring: 'Ring 1' },
      { cluster: 'prod-gpu-east', tier: 'GPU · Tier-1', liveValue: 'base-3.2.1', ring: 'Ring 2' },
    ],
    receiptDigest: 'oci://registry.internal/releases/cve-8821@sha256:88ef01a9',
    approver: 'D. Chen (Platform) + Checker Agent',
  },
  {
    id: 'zero-day-control',
    shortLabel: 'Zero-Day · Compensating Control',
    cveCode: 'Active Exploit',
    scannerInput: 'No vendor patch yet: disable snippet annotations + lock egress',
    elapsedTime: '52s',
    affectedWorkloads: 29,
    affectedClusters: 9,
    skippedClusters: 191,
    queryCommand: 'cub resource list --where "data.allow-snippet-annotations == true"',
    agentIdentity: 'agent:mitigation-bot (flags + NetworkPolicy)',
    agentProposalCode: [
      'cub function set --where-unit-set zd-exposed --protect \\',
      '  set-string-path v1/ConfigMap data.allow-snippet-annotations false',
    ].join('\n'),
    targets: [
      { cluster: 'prod-edge-us', tier: 'Public · Tier-0', liveValue: 'allow-snippets: true', ring: 'Ring 0' },
      { cluster: 'prod-edge-eu', tier: 'Public · Tier-0', liveValue: 'allow-snippets: true', ring: 'Ring 1' },
      { cluster: 'prod-partner', tier: 'B2B · Tier-1', liveValue: 'allow-snippets: true', ring: 'Ring 2' },
    ],
    receiptDigest: 'oci://registry.internal/releases/zd-mitigation@sha256:c1073e55',
    approver: 'R. Patel (CISO Delegate) + Policy #zd-01',
  },
];

export type PolicyActionId = 'scale' | 'cve-patch' | 'rbac-escalate';

export interface PolicySandboxCase {
  id: PolicyActionId;
  actor: string;
  actionTitle: string;
  command: string;
  verdict: 'APPROVED' | 'NEEDS APPROVAL' | 'BLOCKED AT FIELD LOCK';
  tone: 'ok' | 'warn' | 'deny';
  summary: string;
  auditEntry: string;
}

export const POLICY_SANDBOX_CASES: PolicySandboxCase[] = [
  {
    id: 'scale',
    actor: 'agent:sre-autoscale · MCP',
    actionTitle: 'Scale checkout-api replicas 4 -> 8',
    command: 'cub function set --variant prod-us set-replicas checkout-api 8',
    verdict: 'APPROVED',
    tone: 'ok',
    summary: 'Inside allowed bounds [2..16]. Independent checker verified node headroom and released via OCI in 14s.',
    auditEntry: 'rev_94821 · actor=agent:sre-autoscale · status=APPLIED (14s)',
  },
  {
    id: 'cve-patch',
    actor: 'agent:cve-patcher · CLI',
    actionTitle: 'Patch payment-gateway across 14 clusters',
    command: 'cub function set --where-unit-set payment-tls set-container-image gw:2.4.1',
    verdict: 'NEEDS APPROVAL',
    tone: 'warn',
    summary: 'Touches Tier-0 payment workloads. Rendered diff and canary plan attached for one-click human sign-off.',
    auditEntry: 'rev_94822 · actor=agent:cve-patcher · gate=tier0-signoff · status=HELD',
  },
  {
    id: 'rbac-escalate',
    actor: 'agent:dev-copilot · MCP',
    actionTitle: 'Grant ClusterRole wildcard access to secrets',
    command: 'cub function set --unit ledger-rbac patch-verbs "*" --resources secrets',
    verdict: 'BLOCKED AT FIELD LOCK',
    tone: 'deny',
    summary: 'ClusterRole.rules is locked by security-baseline-v4. Withheld before any cluster or reconciler sees it.',
    auditEntry: 'rev_94823 · actor=agent:dev-copilot · lock=rbac-baseline-v4 · status=REJECTED',
  },
];
