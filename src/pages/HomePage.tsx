import { ArchitectureDiagram } from '../components/ArchitectureDiagram';
import { HeroInspector } from '../components/HeroInspector';
import { PolicySandbox } from '../components/PolicySandbox';
import { VulnWorkbench } from '../components/VulnWorkbench';
import { FOUNDERS } from '../data/siteContent';
import { assetUrl } from '../lib/paths';

interface HomePageArgs {
  onNavigate: (path: string) => void;
}

export function HomePage({ onNavigate }: HomePageArgs) {
  const scrollToWorkbench = () => {
    const target = document.getElementById('workbench-band');

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* HERO: AGENTIC GITOPS (HIGH BREATHING ROOM, LIVE DIFF INSPECTOR) */}
      <section className="band-dark hero-pad">
        <div className="wrap">
          <div className="rail-frame">
            <span className="reg-mark reg-tl" aria-hidden="true" />
            <span className="reg-mark reg-tr" aria-hidden="true" />

            <div style={{ maxWidth: '760px', marginBottom: 'clamp(32px, 4vw, 48px)' }}>
              <h1 className="display-h1">
                Agentic GitOps.
                <span className="display-h1-muted">Live config as a database.</span>
              </h1>

              <p className="lead lead-dark">
                Keep Git for code and Argo or Flux for delivery. ConfigHub turns rendered production config into a
                governed database for humans and AI agents.
              </p>

              <div className="hero-actions">
                <button type="button" className="btn btn-primary" onClick={scrollToWorkbench}>
                  Try Remediation Workbench
                </button>

                <button type="button" className="btn btn-dark-secondary" onClick={() => onNavigate('/contact')}>
                  Book Architecture Review
                </button>
              </div>
            </div>

            <HeroInspector />
          </div>
        </div>
      </section>

      {/* ECOSYSTEM RAIL */}
      <section className="ecosystem-band" aria-label="Supported infrastructure stack">
        <div className="wrap">
          <div className="ecosystem-row">
            <span className="ecosystem-caption">Works with your stack</span>

            <div className="ecosystem-items">
              <span className="eco-mark">
                <img src={assetUrl('/assets/logos/kubernetes.svg')} alt="Kubernetes" />
                Kubernetes
              </span>
              <span className="eco-mark">
                <img src={assetUrl('/assets/logos/helm.svg')} alt="Helm" />
                Helm
              </span>
              <span className="eco-mark">
                <img src={assetUrl('/assets/logos/argo.svg')} alt="Argo CD" />
                Argo CD
              </span>
              <span className="eco-mark">
                <img src={assetUrl('/assets/logos/flux.svg')} alt="Flux" />
                Flux
              </span>
              <span className="eco-mark">
                <img src={assetUrl('/assets/logos/sveltos.png')} alt="Sveltos" />
                Sveltos
              </span>
              <span className="eco-mark mono" style={{ fontSize: '0.78rem', color: 'var(--dark-ink-muted)' }}>
                Terraform · Crossplane · MCP
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT BELOW THE FOLD: VULNERABILITY APOCALYPSE WORKBENCH */}
      <section className="band-dark section-pad" id="workbench-band">
        <div className="wrap">
          <div className="rail-frame">
            <span className="reg-mark reg-tl" aria-hidden="true" />
            <span className="reg-mark reg-tr" aria-hidden="true" />

            <div className="chapter-head">
              <h2 className="chapter-h2">Identifying the vulnerability is only step one.</h2>

              <p className="lead lead-dark">
                Scanners alert in seconds. Exploits arrive in hours. Isolate only exposed workloads, roll fixes out
                gradually by ring, and revert a single cluster without tearing down the fleet.
              </p>
            </div>

            <VulnWorkbench />
          </div>
        </div>
      </section>

      {/* DUAL-ENGINE AI: USE + CONTROL */}
      <section className="band-dark section-pad">
        <div className="wrap">
          <div className="rail-frame">
            <span className="reg-mark reg-tl" aria-hidden="true" />
            <span className="reg-mark reg-tr" aria-hidden="true" />

            <div className="chapter-head">
              <h2 className="chapter-h2">
                Built for AI to use.
                <span className="display-h1-muted">Engineered to control AI.</span>
              </h2>

              <p className="lead lead-dark">
                Agents query rendered state over MCP and API with zero cluster keys. Deterministic field locks and
                policy gates stop unsafe writes before reconcilers pull.
              </p>
            </div>

            <div className="shared-matrix-2">
              <div className="matrix-cell-dark">
                <h3 className="sub-h3" style={{ color: 'var(--dark-ink)' }}>
                  AI for Use
                </h3>

                <ul className="cap-list">
                  <li>
                    <strong>MCP, CLI, and Typed API</strong>
                    <span>Claude, Codex, Cursor, and internal bots read exact live state directly.</span>
                  </li>
                  <li>
                    <strong>Cross-Resource Graph</strong>
                    <span>Agents see linked Services, TLS certs, and webhooks before editing.</span>
                  </li>
                  <li>
                    <strong>Instant Compensating Controls</strong>
                    <span>Lock vulnerable flags and attach NetworkPolicies before vendor patches land.</span>
                  </li>
                </ul>
              </div>

              <div className="matrix-cell-dark">
                <h3 className="sub-h3" style={{ color: 'var(--dark-ink)' }}>
                  AI for Control
                </h3>

                <ul className="cap-list">
                  <li>
                    <strong>Scoped Identities &amp; Field Locks</strong>
                    <span>Lock RBAC, secrets, and DB routes so no agent can overwrite them.</span>
                  </li>
                  <li>
                    <strong>Separation of Duties</strong>
                    <span>Checker agents clear routine toil; humans approve Tier-0 blast radius.</span>
                  </li>
                  <li>
                    <strong>Zero Cluster Keys, Zero LLM Egress</strong>
                    <span>100% deterministic core running cloud-hosted or air-gapped inside your VPC.</span>
                  </li>
                </ul>
              </div>
            </div>

            <PolicySandbox />
          </div>
        </div>
      </section>

      {/* CONTROL PLANE SCHEMATIC */}
      <section className="band-dark section-pad">
        <div className="wrap">
          <div className="rail-frame">
            <span className="reg-mark reg-tl" aria-hidden="true" />
            <span className="reg-mark reg-tr" aria-hidden="true" />

            <div className="chapter-head">
              <h2 className="chapter-h2">Keep Git. Keep Argo and Flux.</h2>

              <p className="lead lead-dark">
                ConfigHub sits between intent and actuation. Signed OCI out, live cluster facts back.
              </p>
            </div>

            <ArchitectureDiagram />
          </div>
        </div>
      </section>

      {/* VERIFIED BANK PROOF & FOUNDERS */}
      <section className="band-paper section-pad">
        <div className="wrap">
          <div className="rail-frame-paper">
            <span className="reg-mark reg-tl" aria-hidden="true" />
            <span className="reg-mark reg-tr" aria-hidden="true" />

            <div className="quote-stage">
              <span className="quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote style={{ margin: 0 }}>
                <p className="quote-body">
                  ConfigHub enables the level of collaboration between humans, agents and internal systems we require.
                  Positioned between developer intent and infrastructure actuation, it provides a mechanism to store,
                  expose and manipulate the fully rendered configuration of our infrastructure.
                </p>
                <footer className="quote-attribution">
                  Platform Engineering Team · Top-10 US Bank (Self-Hosted)
                </footer>
              </blockquote>
            </div>

            <div className="chapter-head" style={{ marginBottom: '20px' }}>
              <h2 className="chapter-h2">From the creators of GitOps, Kubernetes, and Heroku.</h2>
              <p className="lead lead-paper">
                We built the declarative cloud stack enterprises run on. ConfigHub upgrades it for AI speed.
              </p>
            </div>

            <div className="founders-row">
              {FOUNDERS.map((founder) => (
                <article className="founder-cell" key={founder.name}>
                  <img className="founder-portrait" src={assetUrl(founder.photo)} alt={founder.name} />
                  <h3 className="sub-h3" style={{ marginBottom: '2px' }}>
                    {founder.name}
                  </h3>
                  <div className="founder-title">{founder.role}</div>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--paper-ink-secondary)', lineHeight: 1.55 }}>
                    {founder.bio}
                  </p>
                </article>
              ))}
            </div>

            <div className="investors-strip">
              <span className="col-caption" style={{ marginBottom: 0 }}>
                Backed By
              </span>
              <img src={assetUrl('/assets/Pear.webp')} alt="Pear VC" />
              <img src={assetUrl('/assets/Crane.webp')} alt="Crane Venture Partners" />
              <img src={assetUrl('/assets/Encoded.webp')} alt="Encoded Ventures" />
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CONVERSION BRIDGE */}
      <section className="band-dark section-pad">
        <div className="wrap">
          <div className="closing-split">
            <div className="closing-pane">
              <h2 className="chapter-h2" style={{ fontSize: 'clamp(1.7rem, 2.5vw, 2.2rem)' }}>
                Start in 15 minutes. No waitlist.
              </h2>

              <pre className="code-block-dark" style={{ margin: '18px 0 20px' }}>
                <code>{`brew install confighub/tap/cub\ncub auth login --sandbox\ncub unit import --from-helm ./charts/payments`}</code>
              </pre>

              <button type="button" className="btn btn-primary" onClick={() => onNavigate('/contact')}>
                Launch Sandbox
              </button>
            </div>

            <div className="closing-pane closing-pane-alt">
              <h2 className="chapter-h2" style={{ fontSize: 'clamp(1.7rem, 2.5vw, 2.2rem)' }}>
                Patch one live CVE in your VPC.
              </h2>
              <p className="lead lead-dark" style={{ marginBottom: '24px', fontSize: '0.96rem' }}>
                Self-host ConfigHub Enterprise inside your perimeter and measure finding-to-fixed end to end.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <button type="button" className="btn btn-primary" onClick={() => onNavigate('/contact')}>
                  Book 30-Min Review
                </button>
                <button type="button" className="btn btn-dark-secondary" onClick={() => onNavigate('/security')}>
                  Security Architecture
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
