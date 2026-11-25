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
              <span className="display-h1-muted">Agentic GitOps inside your walls.</span>
            </h1>

            <p className="lead lead-dark" style={{ marginBottom: '26px' }}>
              Run ConfigHub Enterprise self-hosted or air-gapped across hundreds of clusters with zero outbound data
              transmission.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button type="button" className="btn btn-primary" onClick={() => onNavigate('/contact')}>
                Request VPC PoC
              </button>
              <button type="button" className="btn btn-dark-secondary" onClick={() => onNavigate('/security')}>
                Security Architecture
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="band-paper section-pad">
        <div className="wrap">
          <div className="rail-frame-paper">
            <div className="chapter-head">
              <h2 className="chapter-h2">Built for regulated perimeters.</h2>
              <p className="lead lead-paper">
                Priced by business unit and teams, never per seat, node, agent, or change.
              </p>
            </div>

            <div className="spec-matrix-paper">
              <div className="spec-cell-paper">
                <h3 className="sub-h3">Self-Hosted &amp; Air-Gapped</h3>
                <p className="pain-copy">
                  Deploys on your own EKS, GKE, AKS, OpenShift, or bare-metal clusters with zero SaaS dependency.
                </p>
              </div>

              <div className="spec-cell-paper">
                <h3 className="sub-h3">AD &amp; SSO Organization Perimeters</h3>
                <p className="pain-copy">
                  Audit-bounded tenant per business unit, mapped straight to Okta, Entra ID, or Active Directory groups.
                </p>
              </div>

              <div className="spec-cell-paper">
                <h3 className="sub-h3">OCI In, OCI Out</h3>
                <p className="pain-copy">
                  Signed releases publish to Artifactory, ECR, or Harbor. Argo CD and Flux pull with zero cluster keys.
                </p>
              </div>

              <div className="spec-cell-paper">
                <h3 className="sub-h3">Audit &amp; Evidence Pack</h3>
                <p className="pain-copy">
                  One-query exports mapped to SOX, SOC 2, PCI-DSS, DORA, FINRA, and EU AI Act change controls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="band-dark section-pad">
        <div className="wrap">
          <div className="rail-frame">
            <div className="chapter-head">
              <h2 className="chapter-h2">Four weeks from sandbox to production.</h2>
              <p className="lead lead-dark">Scoped around one measurable workflow inside your own VPC.</p>
            </div>

            <div className="ring-grid">
              <div className="ring-cell">
                <div className="mono" style={{ fontSize: '0.74rem', color: 'var(--accent-light)', marginBottom: '8px' }}>
                  Week 1 · Crawl
                </div>
                <h3 className="sub-h3">Import &amp; Query</h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--dark-ink-secondary)' }}>
                  Deploy in one VPC cluster, wire Argo or Flux, and query live Helm state.
                </p>
              </div>

              <div className="ring-cell">
                <div className="mono" style={{ fontSize: '0.74rem', color: 'var(--accent-light)', marginBottom: '8px' }}>
                  Weeks 2-3 · Walk
                </div>
                <h3 className="sub-h3">Run Live CVE &amp; Locks</h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--dark-ink-secondary)' }}>
                  Execute one real patch with canary rings, field locks, and scoped agent access.
                </p>
              </div>

              <div className="ring-cell">
                <div className="mono" style={{ fontSize: '0.74rem', color: 'var(--accent-light)', marginBottom: '8px' }}>
                  Week 4 · Run
                </div>
                <h3 className="sub-h3">Cutover &amp; Audit Export</h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--dark-ink-secondary)' }}>
                  Onboard AD-backed teams and export your first signed compliance evidence pack.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '32px' }}>
              <button type="button" className="btn btn-primary" onClick={() => onNavigate('/contact')}>
                Schedule Scoping Call
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
