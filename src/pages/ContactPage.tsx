import { useState, type FormEvent } from 'react';

interface FormFieldErrors {
  name?: string;
  email?: string;
  company?: string;
}

export function ContactPage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [track, setTrack] = useState<string>('cve-poc');
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<FormFieldErrors>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormFieldErrors = {};

    if (name.trim().length < 2) {
      nextErrors.name = 'Enter your name.';
    }

    if (!email.includes('@') || !email.includes('.')) {
      nextErrors.email = 'Enter a valid work email address.';
    }

    if (company.trim().length < 2) {
      nextErrors.company = 'Enter your company or organization name.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitted(false);

      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  return (
    <>
      <section className="band-paper page-opening">
        <div className="wrap">
          <div className="rail-frame-paper">
            <h1 className="display-h1">Bring one real CVE or fleet workflow.</h1>
            <p className="lead lead-paper">
              Skip the generic slide deck. Book a 30-minute technical session with our engineering team, or launch the
              self-service CLI sandbox directly on your own clusters.
            </p>
          </div>
        </div>
      </section>

      <section className="band-stone section-pad">
        <div className="wrap">
          <div className="rail-frame-paper">
            <div className="contact-grid">
              <div className="form-box">
                <h2 className="sub-h3" style={{ marginBottom: '20px' }}>
                  Request an Engineering Session or VPC PoC
                </h2>

                {submitted ? (
                  <div className="notice-paper-ok" role="status">
                    <strong>Intake preview recorded locally (static prototype).</strong> In production this submits to
                    the ConfigHub engineering desk for <strong>{company}</strong> ({email}). For live inquiries today,
                    write directly to{' '}
                    <a href="mailto:hello@confighub.com" style={{ textDecoration: 'underline', fontWeight: 600 }}>
                      hello@confighub.com
                    </a>
                    .
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="field-group">
                      <label className="field-label" htmlFor="contact-name">
                        Full Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        className="field-input"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Jordan Rivera"
                        autoComplete="name"
                      />
                      {errors.name ? <div className="field-error">{errors.name}</div> : null}
                    </div>

                    <div className="field-group">
                      <label className="field-label" htmlFor="contact-email">
                        Work Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        className="field-input"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="jordan@company.example"
                        autoComplete="email"
                      />
                      {errors.email ? <div className="field-error">{errors.email}</div> : null}
                    </div>

                    <div className="field-group">
                      <label className="field-label" htmlFor="contact-company">
                        Organization
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        className="field-input"
                        value={company}
                        onChange={(event) => setCompany(event.target.value)}
                        placeholder="Acme Financial Systems"
                        autoComplete="organization"
                      />
                      {errors.company ? <div className="field-error">{errors.company}</div> : null}
                    </div>

                    <div className="field-group">
                      <label className="field-label" htmlFor="contact-track">
                        Primary Focus
                      </label>
                      <select
                        id="contact-track"
                        className="field-select"
                        value={track}
                        onChange={(event) => setTrack(event.target.value)}
                      >
                        <option value="cve-poc">Vulnerability Remediation &amp; Fleet Patching PoC</option>
                        <option value="agent-governance">AI Agent Governance (MCP, Field Locks, Policies)</option>
                        <option value="self-hosted">Self-Hosted / Air-Gapped Enterprise Deployment</option>
                        <option value="sandbox">Hands-On Developer Sandbox Support</option>
                      </select>
                    </div>

                    <div className="field-group">
                      <label className="field-label" htmlFor="contact-notes">
                        Stack &amp; Fleet Context (Optional)
                      </label>
                      <textarea
                        id="contact-notes"
                        className="field-textarea"
                        value={notes}
                        onChange={(event) => setNotes(event.target.value)}
                        placeholder="Example: 120 EKS clusters, Argo CD + Helm, looking to cut CVE patching from days to minutes..."
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Request Engineering Session
                    </button>
                  </form>
                )}
              </div>

              <div>
                <div style={{ borderTop: '1px solid var(--paper-rule-strong)', paddingTop: '20px', marginBottom: '28px' }}>
                  <h2 className="sub-h3">Reach the team without a sales script</h2>
                  <p className="pain-copy" style={{ marginBottom: '12px' }}>
                    General and enterprise inquiries:{' '}
                    <a href="mailto:hello@confighub.com" style={{ textDecoration: 'underline', fontWeight: 600 }}>
                      hello@confighub.com
                    </a>
                  </p>
                  <p className="pain-copy">
                    Security packets and responsible disclosure:{' '}
                    <a href="mailto:security@confighub.com" style={{ textDecoration: 'underline', fontWeight: 600 }}>
                      security@confighub.com
                    </a>
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--paper-rule-strong)', paddingTop: '20px' }}>
                  <h2 className="sub-h3">Test locally in under 15 minutes</h2>
                  <pre className="code-block-dark">
                    <code>{`brew install confighub/tap/cub\ncub auth login --sandbox\ncub tutorial start --scenario cve-remediation`}</code>
                  </pre>
                  <p className="pain-copy">
                    Documentation and open-source SDK live at{' '}
                    <a
                      href="https://docs.confighub.com"
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: 'underline', fontWeight: 600 }}
                    >
                      docs.confighub.com
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
