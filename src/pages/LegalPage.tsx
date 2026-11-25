interface LegalPageArgs {
  kind: 'tos' | 'privacy';
}

export function LegalPage({ kind }: LegalPageArgs) {
  if (kind === 'tos') {
    return (
      <>
        <section className="band-paper page-opening">
          <div className="wrap">
            <h1 className="display-h1">Terms of Service</h1>
            <p className="mono" style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', margin: 0 }}>
              ConfigHub, Inc. · Effective November 2026
            </p>
          </div>
        </section>

        <section className="band-paper section-pad">
          <div className="wrap">
            <div className="article-body">
              <h2>1. Scope of Service</h2>
              <p>
                These Terms of Service govern access to ConfigHub Cloud Sandbox, documentation, open-source clients
                (CLI, SDK, and bridges licensed under MIT), and hosted evaluation services provided by ConfigHub, Inc.
                Self-hosted ConfigHub Enterprise deployments are governed separately by your executed Master Services
                Agreement (MSA) and Enterprise Software Schedule.
              </p>

              <h2>2. Customer Data Ownership</h2>
              <p>
                You retain complete ownership of all configuration data, policies, metadata, and release artifacts
                stored in or exported from ConfigHub. ConfigHub processes Customer Data solely to deliver the service
                and never trains foundation models on Customer Data.
              </p>

              <h2>3. Security &amp; Acceptable Use</h2>
              <p>
                ConfigHub Cloud Sandbox is provided for evaluation and development workflows. Customers operating
                regulated production infrastructure deploy ConfigHub Enterprise self-hosted inside their own VPC or
                dedicated perimeter under enterprise SLAs.
              </p>

              <h2>4. Governing Law &amp; Contact</h2>
              <p>
                These terms are governed by the laws of the State of Delaware. Questions regarding enterprise agreements
                or legal notices may be directed to{' '}
                <a href="mailto:hello@confighub.com" style={{ textDecoration: 'underline' }}>
                  hello@confighub.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="band-paper page-opening">
        <div className="wrap">
          <h1 className="display-h1">Privacy Policy</h1>
          <p className="mono" style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', margin: 0 }}>
            ConfigHub, Inc. · Updated November 2026
          </p>
        </div>
      </section>

      <section className="band-paper section-pad">
        <div className="wrap">
          <div className="article-body">
            <h2>1. Data Controller &amp; Data Processor Roles</h2>
            <p>
              ConfigHub, Inc. acts as a Data Controller for account registration and website contact records, and as a
              Data Processor for configuration data uploaded to ConfigHub Cloud. For self-hosted ConfigHub Enterprise
              deployments, all configuration data remains exclusively within your own infrastructure perimeter and
              ConfigHub does not receive or process your Customer Data.
            </p>

            <h2>2. Zero AI Model Training on Customer Data</h2>
            <p>
              ConfigHub operates on a deterministic configuration database. We never sell, rent, or transmit your
              configuration data to third-party LLM providers or use it to train machine-learning models.
            </p>

            <h2>3. Retention, Encryption, and Regional Rights</h2>
            <p>
              Account and Cloud Sandbox data is encrypted in transit (TLS 1.3) and at rest (AES-256). You may request
              access, correction, portability, or deletion of your personal data at any time by writing to{' '}
              <a href="mailto:hello@confighub.com" style={{ textDecoration: 'underline' }}>
                hello@confighub.com
              </a>
              .
            </p>

            <h2>4. Contact</h2>
            <p>ConfigHub, Inc. · Menlo Park, California · hello@confighub.com</p>
          </div>
        </div>
      </section>
    </>
  );
}
