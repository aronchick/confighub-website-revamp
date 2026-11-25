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
      {/* HERO: AGENTIC GITOPS ON LUMINOUS ALABASTER PAPER */}
      <section className="band-paper hero-pad">
        <div className="wrap">
          <div className="hero-head">
            <h1 className="display-h1">
              Agentic GitOps.
              <span className="display-h1-muted">Live config as a database.</span>
            </h1>

            <p className="lead">
              Keep Git for code and Argo or Flux for delivery. ConfigHub turns rendered production config into a
              governed database for humans and AI agents.
            </p>

            <div className="hero-actions">
              <button type="button" className="btn btn-primary" onClick={scrollToWorkbench}>
                Try Remediation Workbench
              </button>

              <button type="button" className="btn btn-secondary" onClick={() => onNavigate('/contact')}>
                Book Architecture Review
              </button>
            </div>
          </div>

          <HeroInspector />
        </div>
      </section>

      {/* QUIET STACK STRIP */}
      <section className="ecosystem-band" aria-label="Supported infrastructure stack">
        <div className="wrap ecosystem-row">
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
            <span className="eco-mark mono" style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
              Terraform · Crossplane · MCP
            </span>
          </div>
        </div>
      </section>

      {/* RIGHT BELOW THE FOLD: VULNERABILITY REMEDIATION WORKBENCH */}
      <section className="band-paper section-pad" id="workbench-band">
        <div className="wrap">
          <div className="chapter-head">
            <h2 className="chapter-h2">Identifying the vulnerability is only step one.</h2>

            <p className="lead">
              Scanners alert in seconds. Exploits arrive in hours. Isolate only exposed workloads, roll fixes out
              gradually by ring, and revert a single cluster without tearing down the fleet.
            </p>
          </div>

          <VulnWorkbench />
        </div>
      </section>

      {/* DUAL-ENGINE AI: ASYMMETRIC SPLIT (USE + CONTROL BESIDE POLICY EVALUATOR) */}
      <section className="band-stone section-pad">
        <div className="wrap">
          <div className="ai-split">
            <div>
              <h2 className="chapter-h2">
                Built for AI to use.
                <span className="display-h1-muted">Engineered to control AI.</span>
              </h2>

              <p className="lead">
                Agents query exact rendered state over MCP and API with zero cluster keys. Deterministic field locks
                stop unsafe writes before reconcilers pull.
              </p>

              <div className="ai-groups">
                <div className="ai-group">
                  <h3 className="ai-group-title">AI FOR USE</h3>
                  <ul className="ai-list">
                    <li>
                      <strong>MCP, CLI, and Typed API.</strong> Claude, Codex, and internal SRE agents query live
                      rendered state directly.
                    </li>
                    <li>
                      <strong>Cross-Resource Graph.</strong> Agents see linked Services, TLS certs, and webhooks before
                      editing.
                    </li>
                    <li>
                      <strong>Instant Compensating Controls.</strong> Lock vulnerable flags and attach NetworkPolicies
                      before vendor patches land.
                    </li>
                  </ul>
                </div>

                <div className="ai-group">
                  <h3 className="ai-group-title">AI FOR CONTROL</h3>
                  <ul className="ai-list">
                    <li>
                      <strong>Scoped Identities &amp; Field Locks.</strong> Lock RBAC, secrets, and DB routes so no
                      agent can overwrite them.
                    </li>
                    <li>
                      <strong>Separation of Duties.</strong> Checker agents clear routine toil; humans approve Tier-0
                      blast radius.
                    </li>
                    <li>
                      <strong>Zero Cluster Keys, Zero LLM Egress.</strong> 100% deterministic core running cloud-hosted
                      or air-gapped inside your VPC.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <PolicySandbox />
          </div>
        </div>
      </section>

      {/* ARCHITECTURE SCHEMATIC ON ALABASTER PAPER */}
      <section className="band-paper section-pad">
        <div className="wrap">
          <div className="chapter-head">
            <h2 className="chapter-h2">Keep Git. Keep Argo and Flux.</h2>

            <p className="lead">
              ConfigHub sits between intent and actuation. Signed OCI out, live cluster facts back.
            </p>
          </div>

          <ArchitectureDiagram />
        </div>
      </section>

      {/* VERIFIED BANK PROOF & OPEN EDITORIAL FOUNDERS */}
      <section className="band-stone section-pad">
        <div className="wrap">
          <div className="quote-stage">
            <blockquote style={{ margin: 0 }}>
              <p className="quote-body">
                &ldquo;ConfigHub enables the level of collaboration between humans, agents and internal systems we
                require. Positioned between developer intent and infrastructure actuation, it provides a mechanism to
                store, expose and manipulate the fully rendered configuration of our infrastructure.&rdquo;
              </p>
              <footer className="quote-attribution">Platform Engineering Team · Top-10 US Bank (Self-Hosted)</footer>
            </blockquote>
          </div>

          <div className="chapter-head" style={{ marginBottom: '20px' }}>
            <h2 className="chapter-h2">From the creators of GitOps, Kubernetes, and Heroku.</h2>
            <p className="lead">
              We built the declarative cloud stack enterprises run on. ConfigHub upgrades it for AI speed.
            </p>
          </div>

          <div className="founders-row">
            {FOUNDERS.map((founder) => (
              <article className="founder-item" key={founder.name}>
                <img className="founder-portrait" src={assetUrl(founder.photo)} alt={founder.name} />
                <h3 className="sub-h3" style={{ marginBottom: 0 }}>
                  {founder.name}
                </h3>
                <div className="founder-role">{founder.role}</div>
                <p className="body-copy" style={{ fontSize: '0.92rem' }}>
                  {founder.bio}
                </p>
              </article>
            ))}
          </div>

          <div className="investors-strip">
            <span className="investors-label">Backed by</span>
            <img src={assetUrl('/assets/Pear.webp')} alt="Pear VC" />
            <img src={assetUrl('/assets/Crane.webp')} alt="Crane Venture Partners" />
            <img src={assetUrl('/assets/Encoded.webp')} alt="Encoded Ventures" />
          </div>
        </div>
      </section>

      {/* GROUNDED CHARCOAL CLOSING CONVERSION */}
      <section className="band-charcoal closing-band">
        <div className="wrap closing-grid">
          <div>
            <h2 className="closing-h2">
              Start in 15 minutes, or run inside your <em>VPC</em>.
            </h2>
            <p className="closing-lead">
              Import your first Helm chart into the sandbox, or deploy ConfigHub Enterprise inside your own perimeter
              and measure finding-to-fixed end to end.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button type="button" className="btn btn-light" onClick={() => onNavigate('/contact')}>
                Book 30-Min Review
              </button>
              <button type="button" className="btn btn-charcoal-ghost" onClick={() => onNavigate('/security')}>
                Security Architecture
              </button>
            </div>
          </div>

          <div>
            <pre className="code-sheet-charcoal">
              <code>{`brew install confighub/tap/cub\ncub auth login --sandbox\ncub unit import --from-helm ./charts/payments`}</code>
            </pre>
            <button type="button" className="btn btn-charcoal-ghost btn-sm" onClick={() => onNavigate('/contact')}>
              Launch Sandbox Guide
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
