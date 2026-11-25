interface SecurityPageArgs {
  onNavigate: (path: string) => void;
}

export function SecurityPage({ onNavigate }: SecurityPageArgs) {
  return (
    <>
      <section className="band-paper page-opening">
        <div className="wrap">
          <div style={{ maxWidth: '760px' }}>
            <h1 className="display-h1">
              Deterministic control.
              <span className="display-h1-muted">Zero production cluster keys.</span>
            </h1>

            <p className="lead" style={{ marginBottom: '28px' }}>
              Built for Tier-1 banks. 100% deterministic database core, pull-based OCI delivery, and zero external LLM
              data egress.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button type="button" className="btn btn-primary" onClick={() => onNavigate('/contact')}>
                Request Security Packet
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => onNavigate('/enterprise')}>
                Self-Hosted Specs
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="band-stone section-pad">
        <div className="wrap">
          <div className="chapter-head">
            <h2 className="chapter-h2">Four guarantees for agentic operations.</h2>
            <p className="lead">Identity, rendered approval, immutable proof, and an instant kill switch.</p>
          </div>

          <div className="spec-grid">
            <div className="spec-item">
              <h3 className="sub-h3">Scoped Agent Identity &amp; Field Locks</h3>
              <p className="body-copy">
                Short-lived OIDC tokens per agent restricted by space, unit, and YAML field path. Locked security fields
                cannot be overwritten without quorum.
              </p>
            </div>

            <div className="spec-item">
              <h3 className="sub-h3">Rendered-State Approval</h3>
              <p className="body-copy">
                Reviewers see every affected cluster and cross-reference before release instead of guessing from a
                one-line template diff.
              </p>
            </div>

            <div className="spec-item">
              <h3 className="sub-h3">Append-Only Provenance</h3>
              <p className="body-copy">
                Every value tracks actor (human or agent), intent, policy checks, named approver, and signed OCI digest
                for SOX, SOC 2, DORA, FINRA, and EU AI Act audits.
              </p>
            </div>

            <div className="spec-item">
              <h3 className="sub-h3">Circuit Breaker &amp; Kill Switch</h3>
              <p className="body-copy">
                Revoke any agent or freeze fleet rollouts in one command. Failed canary rings revert a single cluster
                automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band-paper section-pad">
        <div className="wrap">
          <h2 className="chapter-h2" style={{ marginBottom: '28px' }}>
            Data boundary and compliance.
          </h2>

          <div className="table-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Control</th>
                  <th>Implementation</th>
                  <th>Boundary</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong style={{ color: 'var(--ink)' }}>Cluster Access</strong>
                  </td>
                  <td>Pull-only via signed OCI registries. Zero kubeconfigs stored.</td>
                  <td className="mono" style={{ fontSize: '0.8rem' }}>
                    Cloud &amp; Self-Hosted
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong style={{ color: 'var(--ink)' }}>AI / LLM Egress</strong>
                  </td>
                  <td>Deterministic core. Zero config sent to external models.</td>
                  <td className="mono" style={{ fontSize: '0.8rem' }}>
                    Zero External Egress
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong style={{ color: 'var(--ink)' }}>Encryption &amp; Secrets</strong>
                  </td>
                  <td>TLS 1.3, AES-256 with BYOK/KMS; secret values stay in Vault/KMS.</td>
                  <td className="mono" style={{ fontSize: '0.8rem' }}>
                    Customer KMS
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong style={{ color: 'var(--ink)' }}>Identity &amp; Audit</strong>
                  </td>
                  <td>SAML/OIDC SSO, SCIM groups, SOX / SOC 2 / DORA / FINRA / EU AI Act packs.</td>
                  <td className="mono" style={{ fontSize: '0.8rem' }}>
                    Enterprise IdP
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '24px' }} className="callout callout-ok">
            Security questionnaires and disclosure:{' '}
            <a href="mailto:security@confighub.com" style={{ textDecoration: 'underline', fontWeight: 600 }}>
              security@confighub.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
