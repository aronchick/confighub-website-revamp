interface EnterprisePageArgs {
  onNavigate: (path: string) => void;
}

export function EnterprisePage({ onNavigate }: EnterprisePageArgs) {
  return (
    <>
      <section className="band-dark page-opening">
        <div className="wrap">
          <div className="rail-frame">
            <span className="reg-mark reg-tl" aria-hidden="true" />
            <span className="reg-mark reg-tr" aria-hidden="true" />

            <h1 className="display-h1">
              Your perimeter. Your registry.
              <span className="display-h1-muted">Your deterministic control.</span>
            </h1>

            <p className="lead lead-dark" style={{ marginBottom: '28px' }}>
              Deploy the full ConfigHub configuration database inside your private cloud, on-premises data center, or
              air-gapped network. Govern Kubernetes, Terraform, Crossplane, and application configuration across
              hundreds of clusters without a single byte leaving your boundary.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button type="button" className="btn btn-primary" onClick={() => onNavigate('/contact')}>
                Request Enterprise VPC PoC
              </button>
              <button type="button" className="btn btn-dark-secondary" onClick={() => onNavigate('/security')}>
                Read Security Architecture
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="band-paper section-pad">
        <div className="wrap">
          <div className="rail-frame-paper">
            <span className="reg-mark reg-tl" aria-hidden="true" />
            <span className="reg-mark reg-tr" aria-hidden="true" />

            <div className="chapter-head">
              <h2 className="chapter-h2">Built for regulated multi-unit boundaries.</h2>
              <p className="lead lead-paper">
                ConfigHub Enterprise maps directly onto existing banking, healthcare, telecom, and sovereign controls
                with zero SaaS dependency.
              </p>
            </div>

            <div className="spec-matrix-paper">
              <div className="spec-cell-paper">
                <h3 className="sub-h3">Self-Hosted &amp; Air-Gapped</h3>
                <p className="pain-copy">
                  Runs on the Kubernetes infrastructure you already operate (EKS, GKE, AKS, OpenShift, or bare metal).
                  Zero outbound telemetry or external model connections required.
                </p>
              </div>

              <div className="spec-cell-paper">
                <h3 className="sub-h3">Organization Perimeters &amp; SSO</h3>
                <p className="pain-copy">
                  Each business unit operates inside an audit-bounded Organization Perimeter. Registered Teams map
                  directly to Okta, Entra ID, or Active Directory groups with field-level RBAC and ABAC.
                </p>
              </div>

              <div className="spec-cell-paper">
                <h3 className="sub-h3">OCI In, OCI Out</h3>
                <p className="pain-copy">
                  Signed configuration releases publish straight to JFrog Artifactory, AWS ECR, Harbor, or ACR. Argo
                  CD, Flux, and Sveltos pull from your registry with zero cluster credentials stored in ConfigHub.
                </p>
              </div>

              <div className="spec-cell-paper">
                <h3 className="sub-h3">Open Clients, Zero Lock-In</h3>
                <p className="pain-copy">
                  Every internal developer portal, custom agent, policy function, and bridge you build against the
                  MIT-licensed SDK and API stays yours. Export rendered YAML and JSON anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="band-stone section-pad">
        <div className="wrap">
          <div className="rail-frame-paper">
            <div className="chapter-head">
              <h2 className="chapter-h2">Start with one scenario. Expand mechanically.</h2>
              <p className="lead lead-paper">
                Licensing scales by business unit and registered teams, never charging per seat, per node, per AI
                agent, or per configuration change.
              </p>
            </div>

            <div className="pain-ledger">
              <div className="pain-row">
                <h3 className="pain-title">Risk &amp; Policy Core</h3>
                <div>
                  <span className="col-caption">Included in Core Platform</span>
                  <p className="pain-copy">
                    Rendered configuration database, fleet-wide queries, workload diffs, staged environment promotions,
                    CVE exposure targeting, and pre-deployment schema and policy validation.
                  </p>
                </div>
                <div>
                  <span className="col-caption">Operational Impact</span>
                  <p className="pain-copy pain-copy-strong">
                    Replaces ad-hoc repo scripts and multi-PR patch queues with one governed control plane.
                  </p>
                </div>
              </div>

              <div className="pain-row">
                <h3 className="pain-title">AI Governance Module</h3>
                <div>
                  <span className="col-caption">BYO Agent Control</span>
                  <p className="pain-copy">
                    Scoped non-human identities, MCP server gateway, field-level protection locks, independent checker
                    agent workflows, and provenance for Claude, Codex, Cursor, and internal bots.
                  </p>
                </div>
                <div>
                  <span className="col-caption">Operational Impact</span>
                  <p className="pain-copy pain-copy-strong">
                    Unlocks machine-speed remediation and developer velocity without handing agents cluster keys.
                  </p>
                </div>
              </div>

              <div className="pain-row">
                <h3 className="pain-title">Live Ops &amp; Zero Break-Glass</h3>
                <div>
                  <span className="col-caption">Day-2 Resilience</span>
                  <p className="pain-copy">
                    Sub-60-second gated emergency changes on the normal OCI path, live drift detection against running
                    clusters, automated canary health gates, and single-cluster rollback.
                  </p>
                </div>
                <div>
                  <span className="col-caption">Operational Impact</span>
                  <p className="pain-copy pain-copy-strong">
                    Eliminates kubectl edit drift and prevents a bad patch from cascading across your fleet.
                  </p>
                </div>
              </div>

              <div className="pain-row">
                <h3 className="pain-title">Audit &amp; Evidence Pack</h3>
                <div>
                  <span className="col-caption">Regulator-Ready Exports</span>
                  <p className="pain-copy">
                    Point-and-click evidence bundles mapped to SOX, PCI-DSS, SOC 2, FFIEC, FINRA, DORA, and EU AI Act
                    change-management controls, recording human and agent approvals verbatim.
                  </p>
                </div>
                <div>
                  <span className="col-caption">Operational Impact</span>
                  <p className="pain-copy pain-copy-strong">
                    Turns multi-day compliance scavenger hunts into one deterministic query.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="band-dark section-pad">
        <div className="wrap">
          <div className="rail-frame">
            <div className="chapter-head">
              <h2 className="chapter-h2">Four weeks from sandbox to production cutover.</h2>
              <p className="lead lead-dark">
                Every enterprise PoC measures one concrete outcome inside your VPC, guided directly by our engineering
                team.
              </p>
            </div>

            <div className="ring-grid">
              <div className="ring-cell">
                <div className="mono" style={{ fontSize: '0.74rem', color: 'var(--accent-light)', marginBottom: '8px' }}>
                  Week 1 · Crawl
                </div>
                <h3 className="sub-h3">Import &amp; Query Live Fleet</h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--dark-ink-secondary)', lineHeight: 1.58 }}>
                  Deploy ConfigHub Enterprise inside a single VPC cluster, attach to existing Argo CD or Flux, import
                  Helm charts, and run fleet-wide blast-radius queries.
                </p>
              </div>

              <div className="ring-cell">
                <div className="mono" style={{ fontSize: '0.74rem', color: 'var(--accent-light)', marginBottom: '8px' }}>
                  Weeks 2-3 · Walk
                </div>
                <h3 className="sub-h3">Execute Live CVE &amp; Policy Gate</h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--dark-ink-secondary)', lineHeight: 1.58 }}>
                  Run one real vulnerability patch or multi-environment promotion end to end with field locks, canary
                  rings, scoped agent identity, and security council sign-off.
                </p>
              </div>

              <div className="ring-cell">
                <div className="mono" style={{ fontSize: '0.74rem', color: 'var(--accent-light)', marginBottom: '8px' }}>
                  Week 4 · Run
                </div>
                <h3 className="sub-h3">Production Cutover &amp; Evidence</h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--dark-ink-secondary)', lineHeight: 1.58 }}>
                  Onboard initial AD-backed teams onto the governed record, activate zero-break-glass workflows, and
                  export your first signed compliance evidence pack.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '32px' }}>
              <button type="button" className="btn btn-primary" onClick={() => onNavigate('/contact')}>
                Schedule Enterprise Scoping Session
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
