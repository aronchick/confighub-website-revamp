interface SecurityPageArgs {
  onNavigate: (path: string) => void;
}

export function SecurityPage({ onNavigate }: SecurityPageArgs) {
  return (
    <>
      <section className="band-dark page-opening">
        <div className="wrap">
          <div className="rail-frame">
            <span className="reg-mark reg-tl" aria-hidden="true" />
            <span className="reg-mark reg-tr" aria-hidden="true" />

            <h1 className="display-h1">
              Deterministic control.
              <span className="display-h1-muted">Zero production cluster keys.</span>
            </h1>

            <p className="lead lead-dark" style={{ marginBottom: '28px' }}>
              Architected for Tier-1 banks and regulated infrastructure from day one. ConfigHub runs on a 100%
              deterministic core, holds zero direct credentials to your production clusters, and requires zero external
              LLM data transmission.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button type="button" className="btn btn-primary" onClick={() => onNavigate('/contact')}>
                Request Security Architecture Packet
              </button>
              <button type="button" className="btn btn-dark-secondary" onClick={() => onNavigate('/enterprise')}>
                Review Self-Hosted Deployment
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="band-dark section-pad">
        <div className="wrap">
          <div className="rail-frame">
            <div className="chapter-head">
              <h2 className="chapter-h2">Solving the four security problems of agentic operations.</h2>
              <p className="lead lead-dark">
                CISOs evaluate autonomous infrastructure operations against four non-negotiable controls: scoped
                identity, meaningful approval, tamper-evident records, and an immediate kill switch.
              </p>
            </div>

            <div className="shared-matrix-2" style={{ marginBottom: 0 }}>
              <div className="matrix-cell-dark">
                <h3 className="sub-h3" style={{ color: 'var(--dark-ink)' }}>
                  Scoped Non-Human Identity &amp; Field Locks
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--dark-ink-secondary)', lineHeight: 1.6 }}>
                  AI agents never share human credentials or receive raw kubeconfigs. Each agent authenticates with its
                  own short-lived OIDC identity restricted to explicit spaces, units, and YAML/JSON field paths.
                  Protected security fields (RBAC bindings, service accounts, network egress) stay locked against
                  overwrite without quorum unlock.
                </p>
              </div>

              <div className="matrix-cell-dark">
                <h3 className="sub-h3" style={{ color: 'var(--dark-ink)' }}>
                  Meaningful Approval on Rendered State
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--dark-ink-secondary)', lineHeight: 1.6 }}>
                  Approving a one-line Helm template diff is not verifiable control. ConfigHub evaluates schema rules,
                  cross-resource links, and policy checks on the fully rendered state, showing approvers every affected
                  cluster and workload before signing an OCI release.
                </p>
              </div>

              <div className="matrix-cell-dark">
                <h3 className="sub-h3" style={{ color: 'var(--dark-ink)' }}>
                  Tamper-Evident Provenance Ledger
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--dark-ink-secondary)', lineHeight: 1.6 }}>
                  Every field mutation records the exact prior value, new value, actor identity (human or agent),
                  change intent, automated policy outcomes, named approver, and OCI release digest. Export structured
                  evidence directly for SOX, SOC 2, PCI-DSS, FINRA, DORA, and EU AI Act audits.
                </p>
              </div>

              <div className="matrix-cell-dark">
                <h3 className="sub-h3" style={{ color: 'var(--dark-ink)' }}>
                  Instant Circuit Breaker &amp; Kill Switch
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--dark-ink-secondary)', lineHeight: 1.6 }}>
                  Revoke an agent identity or freeze fleet promotions in one command. Automated canary health checks
                  halt progressive ring rollouts immediately and revert only the failing cluster to its last signed OCI
                  digest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="band-paper section-pad">
        <div className="wrap">
          <div className="rail-frame-paper">
            <div className="chapter-head">
              <h2 className="chapter-h2">Data boundary and compliance architecture.</h2>
              <p className="lead lead-paper">
                Your configuration data stays inside your network and your container registry stays authoritative.
              </p>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="data-table-paper">
                <thead>
                  <tr>
                    <th>Control Domain</th>
                    <th>Architectural Implementation</th>
                    <th>Boundary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong style={{ color: 'var(--paper-ink)' }}>Cluster Access Model</strong>
                    </td>
                    <td>
                      Pull-only via signed OCI registries (Argo CD, Flux, Sveltos). Zero inbound cluster access or
                      stored kubeconfigs.
                    </td>
                    <td className="mono">Cloud &amp; Self-Hosted</td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ color: 'var(--paper-ink)' }}>AI / LLM Data Egress</strong>
                    </td>
                    <td>
                      Core database and policy engine are 100% deterministic. Zero config data sent to external LLMs;
                      BYO agents operate inside your VPC.
                    </td>
                    <td className="mono">Zero External Egress</td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ color: 'var(--paper-ink)' }}>Encryption &amp; Secrets</strong>
                    </td>
                    <td>
                      TLS 1.3 in transit, AES-256 at rest with customer-managed KMS keys (Enterprise). Native secret
                      references keep secret values in Vault or cloud KMS.
                    </td>
                    <td className="mono">BYOK / KMS</td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ color: 'var(--paper-ink)' }}>Identity &amp; Access</strong>
                    </td>
                    <td>
                      SAML 2.0 / OIDC SSO, SCIM group sync, short-lived agent OIDC tokens, granular field-level
                      RBAC/ABAC.
                    </td>
                    <td className="mono">Enterprise IdP</td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ color: 'var(--paper-ink)' }}>Regulatory Alignment</strong>
                    </td>
                    <td>
                      Audit exports structured for SOC 2 Type II controls, SOX ITGC change management, PCI-DSS, DORA
                      ICT resilience, FINRA, and EU AI Act lineage.
                    </td>
                    <td className="mono">Audit &amp; Evidence Pack</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '28px' }} className="notice-paper-ok">
              <strong>Security Disclosure &amp; Questionnaire Inquiries:</strong> Email{' '}
              <a href="mailto:security@confighub.com" style={{ textDecoration: 'underline', fontWeight: 600 }}>
                security@confighub.com
              </a>{' '}
              for our enterprise security questionnaire, penetration-test summary, and self-hosted architecture brief.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
