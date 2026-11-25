interface EnterprisePageArgs {
  onNavigate: (path: string) => void;
}

export function EnterprisePage({ onNavigate }: EnterprisePageArgs) {
  return (
    <>
      <section className="band-paper page-opening">
        <div className="wrap">
          <div style={{ maxWidth: '760px' }}>
            <h1 className="display-h1">
              Your perimeter. Your registry.
              <span className="display-h1-muted">Agentic GitOps inside your walls.</span>
            </h1>

            <p className="lead" style={{ marginBottom: '28px' }}>
              Run ConfigHub Enterprise self-hosted or air-gapped across hundreds of clusters with zero outbound data
              transmission.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button type="button" className="btn btn-primary" onClick={() => onNavigate('/contact')}>
                Request VPC PoC
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => onNavigate('/security')}>
                Security Architecture
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="band-stone section-pad">
        <div className="wrap">
          <div className="chapter-head">
            <h2 className="chapter-h2">Built for regulated perimeters.</h2>
            <p className="lead">Priced by business unit and teams, never per seat, node, agent, or change.</p>
          </div>

          <div className="spec-grid">
            <div className="spec-item">
              <h3 className="sub-h3">Self-Hosted &amp; Air-Gapped</h3>
              <p className="body-copy">
                Deploys on your own EKS, GKE, AKS, OpenShift, or bare-metal clusters with zero SaaS dependency.
              </p>
            </div>

            <div className="spec-item">
              <h3 className="sub-h3">AD &amp; SSO Organization Perimeters</h3>
              <p className="body-copy">
                Audit-bounded tenant per business unit, mapped straight to Okta, Entra ID, or Active Directory groups.
              </p>
            </div>

            <div className="spec-item">
              <h3 className="sub-h3">OCI In, OCI Out</h3>
              <p className="body-copy">
                Signed releases publish to Artifactory, ECR, or Harbor. Argo CD and Flux pull with zero cluster keys.
              </p>
            </div>

            <div className="spec-item">
              <h3 className="sub-h3">Audit &amp; Evidence Pack</h3>
              <p className="body-copy">
                One-query exports mapped to SOX, SOC 2, PCI-DSS, DORA, FINRA, and EU AI Act change controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band-paper section-pad">
        <div className="wrap">
          <div className="chapter-head">
            <h2 className="chapter-h2">Four weeks from sandbox to production.</h2>
            <p className="lead">Scoped around one measurable workflow inside your own VPC.</p>
          </div>

          <div className="phase-grid">
            <div className="phase-item">
              <div className="phase-label">Week 1 · Crawl</div>
              <h3 className="sub-h3">Import &amp; Query</h3>
              <p className="body-copy" style={{ fontSize: '0.92rem' }}>
                Deploy in one VPC cluster, wire Argo or Flux, and query live Helm state.
              </p>
            </div>

            <div className="phase-item">
              <div className="phase-label">Weeks 2-3 · Walk</div>
              <h3 className="sub-h3">Run Live CVE &amp; Locks</h3>
              <p className="body-copy" style={{ fontSize: '0.92rem' }}>
                Execute one real patch with canary rings, field locks, and scoped agent access.
              </p>
            </div>

            <div className="phase-item">
              <div className="phase-label">Week 4 · Run</div>
              <h3 className="sub-h3">Cutover &amp; Audit Export</h3>
              <p className="body-copy" style={{ fontSize: '0.92rem' }}>
                Onboard AD-backed teams and export your first signed compliance evidence pack.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '36px' }}>
            <button type="button" className="btn btn-primary" onClick={() => onNavigate('/contact')}>
              Schedule Scoping Call
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
