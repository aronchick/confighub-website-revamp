export function ArchitectureDiagram() {
  return (
    <div className="schematic-sheet">
      <svg
        className="schematic-svg"
        viewBox="0 0 1140 356"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="ConfigHub control plane architecture connecting engineers, AI agents, and scanners through a governed configuration database to Argo CD, Flux, Sveltos, and production fleets via pull-based OCI delivery"
      >
        {/* Column Headers */}
        <text x="16" y="24" fill="#6E6A61" fontSize="11" fontFamily="IBM Plex Mono, monospace" letterSpacing="0.06em">
          INTENT &amp; SIGNALS IN
        </text>
        <text x="410" y="24" fill="#B33A03" fontSize="11" fontFamily="IBM Plex Mono, monospace" letterSpacing="0.06em">
          CONFIGHUB · RENDERED CONFIG DATABASE
        </text>
        <text x="854" y="24" fill="#6E6A61" fontSize="11" fontFamily="IBM Plex Mono, monospace" letterSpacing="0.06em">
          PULL-BASED ACTUATION
        </text>

        {/* Left Inputs */}
        <g>
          <rect x="16" y="46" width="252" height="54" rx="4" fill="#FAF9F6" stroke="#D7D1C6" />
          <text x="32" y="70" fill="#171614" fontSize="13" fontWeight="600" fontFamily="DM Sans, sans-serif">
            Platform &amp; App Engineers
          </text>
          <text x="32" y="88" fill="#6E6A61" fontSize="11" fontFamily="IBM Plex Mono, monospace">
            UI · cub CLI · Git source repos
          </text>

          <rect x="16" y="114" width="252" height="54" rx="4" fill="#FAF9F6" stroke="#B33A03" />
          <text x="32" y="138" fill="#171614" fontSize="13" fontWeight="600" fontFamily="DM Sans, sans-serif">
            AI Coding &amp; SRE Agents
          </text>
          <text x="32" y="156" fill="#B33A03" fontSize="11" fontFamily="IBM Plex Mono, monospace">
            MCP · API · Scoped agent OIDC
          </text>

          <rect x="16" y="182" width="252" height="54" rx="4" fill="#FAF9F6" stroke="#D7D1C6" />
          <text x="32" y="206" fill="#171614" fontSize="13" fontWeight="600" fontFamily="DM Sans, sans-serif">
            Security Scanners &amp; Feeds
          </text>
          <text x="32" y="224" fill="#6E6A61" fontSize="11" fontFamily="IBM Plex Mono, monospace">
            Wiz · Snyk · Trivy · Chainguard
          </text>

          <rect x="16" y="250" width="252" height="54" rx="4" fill="#FAF9F6" stroke="#D7D1C6" />
          <text x="32" y="274" fill="#171614" fontSize="13" fontWeight="600" fontFamily="DM Sans, sans-serif">
            Internal Platforms &amp; CI
          </text>
          <text x="32" y="292" fill="#6E6A61" fontSize="11" fontFamily="IBM Plex Mono, monospace">
            Build artifacts · IDP portals
          </text>
        </g>

        {/* Left Orthogonal Traces (142px clean corridor) */}
        <g stroke="#CBC4B8" strokeWidth="1.25">
          <path d="M268 73 H342 V124 H410" />
          <path d="M268 141 H410" stroke="#B33A03" />
          <path d="M268 209 H342 V168 H410" />
          <path d="M268 277 H360 V196 H410" />
        </g>
        <rect x="284" y="120" width="110" height="18" rx="2" fill="#FFFFFF" />
        <text
          x="339"
          y="133"
          textAnchor="middle"
          fill="#6E6A61"
          fontSize="10.5"
          fontFamily="IBM Plex Mono, monospace"
        >
          query / propose
        </text>

        {/* Center ConfigHub Core */}
        <g>
          <rect x="410" y="44" width="308" height="262" rx="4" fill="#F7F5F0" stroke="#B33A03" strokeWidth="1.5" />

          <rect x="426" y="60" width="276" height="58" rx="3" fill="#FFFFFF" stroke="#E2DDD4" />
          <text x="440" y="84" fill="#171614" fontSize="13" fontWeight="600" fontFamily="DM Sans, sans-serif">
            Rendered Configuration Graph
          </text>
          <text x="440" y="102" fill="#4A4741" fontSize="11" fontFamily="IBM Plex Mono, monospace">
            K8s · Helm · KRM · Terraform · App
          </text>

          <rect x="426" y="130" width="276" height="58" rx="3" fill="#FFFFFF" stroke="#E2DDD4" />
          <text x="440" y="154" fill="#171614" fontSize="13" fontWeight="600" fontFamily="DM Sans, sans-serif">
            Field Locks &amp; Policy Gates
          </text>
          <text x="440" y="172" fill="#4A4741" fontSize="11" fontFamily="IBM Plex Mono, monospace">
            12% cross-refs · Checker · Gates
          </text>

          <rect x="426" y="200" width="276" height="58" rx="3" fill="#FFFFFF" stroke="#E2DDD4" />
          <text x="440" y="224" fill="#171614" fontSize="13" fontWeight="600" fontFamily="DM Sans, sans-serif">
            Canary Rings &amp; Cluster Revert
          </text>
          <text x="440" y="242" fill="#4A4741" fontSize="11" fontFamily="IBM Plex Mono, monospace">
            Ring 0 -&gt; Ring 1 -&gt; Ring 2
          </text>

          <rect x="426" y="268" width="276" height="26" rx="3" fill="#EEF7F1" stroke="#C3E2CD" />
          <text x="440" y="285" fill="#14532D" fontSize="10.5" fontWeight="500" fontFamily="IBM Plex Mono, monospace">
            IMMUTABLE PROVENANCE · ZERO EGRESS
          </text>
        </g>

        {/* Right Outbound OCI Traces (136px clean corridor) */}
        <g stroke="#CBC4B8" strokeWidth="1.25">
          <path d="M718 112 H854" stroke="#B33A03" />
          <path d="M718 192 H854" />
        </g>
        <text
          x="786"
          y="102"
          textAnchor="middle"
          fill="#B33A03"
          fontSize="10.5"
          fontFamily="IBM Plex Mono, monospace"
        >
          signed OCI
        </text>
        <text
          x="786"
          y="182"
          textAnchor="middle"
          fill="#6E6A61"
          fontSize="10.5"
          fontFamily="IBM Plex Mono, monospace"
        >
          no cluster keys
        </text>

        {/* Right Delivery & Fleets */}
        <g>
          <rect x="854" y="58" width="270" height="96" rx="4" fill="#FAF9F6" stroke="#D7D1C6" />
          <text x="872" y="84" fill="#171614" fontSize="13.5" fontWeight="600" fontFamily="DM Sans, sans-serif">
            Your Registry &amp; Reconcilers
          </text>
          <text x="872" y="106" fill="#4A4741" fontSize="11.5" fontFamily="IBM Plex Mono, monospace">
            Argo CD · Flux · Sveltos
          </text>
          <text x="872" y="126" fill="#6E6A61" fontSize="11" fontFamily="IBM Plex Mono, monospace">
            Crossplane · Terraform · OCI
          </text>

          <rect x="854" y="170" width="270" height="114" rx="4" fill="#FAF9F6" stroke="#D7D1C6" />
          <text x="872" y="196" fill="#171614" fontSize="13.5" fontWeight="600" fontFamily="DM Sans, sans-serif">
            Production Fleets
          </text>
          <text x="872" y="218" fill="#4A4741" fontSize="11.5" fontFamily="IBM Plex Mono, monospace">
            200+ Kubernetes &amp; GPU Clusters
          </text>
          <text x="872" y="238" fill="#6E6A61" fontSize="11" fontFamily="IBM Plex Mono, monospace">
            Multi-cloud · VPC · Air-gapped
          </text>
          <text x="872" y="264" fill="#14532D" fontSize="10.5" fontWeight="500" fontFamily="IBM Plex Mono, monospace">
            IN SYNC · ZERO BREAK-GLASS
          </text>
        </g>

        {/* Live Telemetry Return Path */}
        <path d="M989 284 V328 H564 V306" stroke="#14532D" strokeWidth="1.2" strokeDasharray="4 4" />
        <text
          x="776"
          y="346"
          textAnchor="middle"
          fill="#14532D"
          fontSize="10.5"
          fontFamily="IBM Plex Mono, monospace"
        >
          live health, drift, and Applied receipts stream back as queryable facts
        </text>
      </svg>
    </div>
  );
}
