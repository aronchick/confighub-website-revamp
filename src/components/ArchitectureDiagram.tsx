export function ArchitectureDiagram() {
  return (
    <div className="schematic-shell">
      <svg
        className="schematic-svg"
        viewBox="0 0 1120 356"
        role="img"
        aria-label="ConfigHub control plane schematic: engineers, security scanners, and AI agents write intent into the ConfigHub deterministic configuration database, which validates schema, cross-references, and field locks, then publishes signed OCI bundles pulled by Argo CD, Flux, Sveltos, and Terraform while live cluster facts stream back."
      >
        {/* Outer Technical Datum Lines */}
        <line x1="20" y1="36" x2="1100" y2="36" stroke="#25221E" strokeWidth="1" />
        <line x1="20" y1="302" x2="1100" y2="302" stroke="#25221E" strokeWidth="1" />

        {/* Column Headers */}
        <text x="20" y="24" fill="#8A8377" fontFamily="IBM Plex Mono, monospace" fontSize="11">
          INTENT &amp; SIGNALS IN
        </text>
        <text x="386" y="24" fill="#E56D37" fontFamily="IBM Plex Mono, monospace" fontSize="11">
          CONFIGHUB · DETERMINISTIC CONFIGURATION DATABASE
        </text>
        <text x="854" y="24" fill="#8A8377" fontFamily="IBM Plex Mono, monospace" fontSize="11">
          PULL-BASED ACTUATION &amp; FLEETS
        </text>

        {/* Left Column: Intent Producers */}
        <g>
          <rect x="20" y="56" width="242" height="46" fill="#0B0A09" stroke="#3A352E" strokeWidth="1" />
          <text x="34" y="77" fill="#F5F2EC" fontFamily="IBM Plex Sans, sans-serif" fontSize="12.5" fontWeight="600">
            Platform &amp; App Engineers
          </text>
          <text x="34" y="93" fill="#8A8377" fontFamily="IBM Plex Mono, monospace" fontSize="10">
            UI · cub CLI · Git source repos
          </text>

          <rect x="20" y="116" width="242" height="46" fill="#0B0A09" stroke="#3A352E" strokeWidth="1" />
          <text x="34" y="137" fill="#F5F2EC" fontFamily="IBM Plex Sans, sans-serif" fontSize="12.5" fontWeight="600">
            AI Coding &amp; SRE Agents
          </text>
          <text x="34" y="153" fill="#E56D37" fontFamily="IBM Plex Mono, monospace" fontSize="10">
            MCP · API · Scoped agent OIDC
          </text>

          <rect x="20" y="176" width="242" height="46" fill="#0B0A09" stroke="#3A352E" strokeWidth="1" />
          <text x="34" y="197" fill="#F5F2EC" fontFamily="IBM Plex Sans, sans-serif" fontSize="12.5" fontWeight="600">
            Security Scanners &amp; Feeds
          </text>
          <text x="34" y="213" fill="#8A8377" fontFamily="IBM Plex Mono, monospace" fontSize="10">
            Wiz · Snyk · Trivy · Chainguard
          </text>

          <rect x="20" y="236" width="242" height="46" fill="#0B0A09" stroke="#3A352E" strokeWidth="1" />
          <text x="34" y="257" fill="#F5F2EC" fontFamily="IBM Plex Sans, sans-serif" fontSize="12.5" fontWeight="600">
            Internal Platforms &amp; CI
          </text>
          <text x="34" y="273" fill="#8A8377" fontFamily="IBM Plex Mono, monospace" fontSize="10">
            Build artifacts · IDP portals
          </text>
        </g>

        {/* Connectors Left -> Center (Wide 124px open gutter) */}
        <g stroke="#4A443C" strokeWidth="1" fill="none">
          <path d="M262 79 L322 79 L322 154 L386 154" />
          <path d="M262 139 L386 139" stroke="#CC440A" />
          <path d="M262 199 L322 199 L322 174 L386 174" />
          <path d="M262 259 L342 259 L342 194 L386 194" />
        </g>
        <text
          x="324"
          y="130"
          textAnchor="middle"
          fill="#E56D37"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="9.5"
        >
          query / propose
        </text>

        {/* Center Box: ConfigHub Machined Core */}
        <g>
          <rect x="386" y="54" width="348" height="232" fill="#0B0A09" stroke="#CC440A" strokeWidth="1" />
          <rect x="392" y="60" width="336" height="220" fill="#161412" stroke="#3A352E" strokeWidth="1" />

          <rect x="406" y="76" width="308" height="41" fill="#0B0A09" stroke="#25221E" strokeWidth="1" />
          <text x="418" y="95" fill="#F5F2EC" fontFamily="IBM Plex Sans, sans-serif" fontSize="12" fontWeight="600">
            Rendered Configuration Graph
          </text>
          <text x="418" y="109" fill="#8A8377" fontFamily="IBM Plex Mono, monospace" fontSize="9.5">
            K8s · Helm · KRM · Terraform · App Config
          </text>

          <rect x="406" y="127" width="308" height="41" fill="#0B0A09" stroke="#25221E" strokeWidth="1" />
          <text x="418" y="146" fill="#F5F2EC" fontFamily="IBM Plex Sans, sans-serif" fontSize="12" fontWeight="600">
            Field Locks &amp; Deterministic Policy Engine
          </text>
          <text x="418" y="160" fill="#E56D37" fontFamily="IBM Plex Mono, monospace" fontSize="9.5">
            12% cross-refs · Checker agent · Human gates
          </text>

          <rect x="406" y="178" width="308" height="41" fill="#0B0A09" stroke="#25221E" strokeWidth="1" />
          <text x="418" y="197" fill="#F5F2EC" fontFamily="IBM Plex Sans, sans-serif" fontSize="12" fontWeight="600">
            Progressive Canary Rings &amp; Rollback
          </text>
          <text x="418" y="211" fill="#8A8377" fontFamily="IBM Plex Mono, monospace" fontSize="9.5">
            Ring 0 -&gt; Ring 1 -&gt; Ring 2 · Single-cluster revert
          </text>

          <rect x="406" y="229" width="308" height="36" fill="#12241A" stroke="#27543A" strokeWidth="1" />
          <text x="418" y="251" fill="#58A67A" fontFamily="IBM Plex Mono, monospace" fontSize="10">
            IMMUTABLE PROVENANCE · ZERO LLM EGRESS
          </text>
        </g>

        {/* Connectors Center -> Right (Wide 120px open gutter) */}
        <g stroke="#CC440A" strokeWidth="1" fill="none">
          <path d="M734 114 L854 114" />
          <path d="M734 176 L854 176" />
        </g>
        <text
          x="794"
          y="105"
          textAnchor="middle"
          fill="#E56D37"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="9.5"
        >
          signed OCI
        </text>
        <text
          x="794"
          y="167"
          textAnchor="middle"
          fill="#8A8377"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="9.5"
        >
          no cluster keys
        </text>

        {/* Live Feedback Loop Dashed Line (Clean bottom channel, zero label overlap) */}
        <path
          d="M976 266 L976 322 L560 322 L560 286"
          fill="none"
          stroke="#58A67A"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <text
          x="768"
          y="342"
          textAnchor="middle"
          fill="#58A67A"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="10"
        >
          live health, drift &amp; Applied receipts stream back as queryable facts
        </text>

        {/* Right Column: Delivery & Fleets */}
        <g>
          <rect x="854" y="64" width="246" height="84" fill="#0B0A09" stroke="#3A352E" strokeWidth="1" />
          <text x="868" y="88" fill="#F5F2EC" fontFamily="IBM Plex Sans, sans-serif" fontSize="12.5" fontWeight="600">
            Your Registry &amp; Reconcilers
          </text>
          <text x="868" y="108" fill="#B4ADA1" fontFamily="IBM Plex Mono, monospace" fontSize="10">
            Argo CD · Flux · Sveltos
          </text>
          <text x="868" y="126" fill="#8A8377" fontFamily="IBM Plex Mono, monospace" fontSize="10">
            Crossplane · Terraform · OCI
          </text>

          <rect x="854" y="164" width="246" height="102" fill="#0B0A09" stroke="#3A352E" strokeWidth="1" />
          <text x="868" y="188" fill="#F5F2EC" fontFamily="IBM Plex Sans, sans-serif" fontSize="12.5" fontWeight="600">
            Production Fleets
          </text>
          <text x="868" y="208" fill="#B4ADA1" fontFamily="IBM Plex Mono, monospace" fontSize="10">
            200+ Kubernetes &amp; GPU Clusters
          </text>
          <text x="868" y="226" fill="#8A8377" fontFamily="IBM Plex Mono, monospace" fontSize="10">
            Multi-cloud · VPC · Air-gapped
          </text>
          <text x="868" y="248" fill="#58A67A" fontFamily="IBM Plex Mono, monospace" fontSize="9.5">
            STATUS: IN SYNC · 0 BREAK-GLASS
          </text>
        </g>
      </svg>
    </div>
  );
}
