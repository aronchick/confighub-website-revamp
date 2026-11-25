import { ArchitectureDiagram } from '../components/ArchitectureDiagram';
import { HeroInspector } from '../components/HeroInspector';
import { PolicySandbox } from '../components/PolicySandbox';
import { VulnWorkbench } from '../components/VulnWorkbench';
import { FOUNDERS, PAIN_LEDGER } from '../data/siteContent';
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
      {/* HERO: INSTRUMENT-STAGE OPENING (PATH 1 - LIVE STATE BLIND SPOT) */}
      <section className="band-dark hero-pad">
        <div className="wrap">
          <div className="rail-frame">
            <span className="reg-mark reg-tl" aria-hidden="true" />
            <span className="reg-mark reg-tr" aria-hidden="true" />

            <div className="hero-top-grid">
              <div>
                <h1 className="display-h1">
                  Git holds your code.
                  <span className="display-h1-muted">Production needs a database.</span>
                </h1>

                <p className="lead lead-dark">
                  AI agents multiply changes 10x and zero-day exploits arrive in hours. Yet live production
                  configuration still hides inside opaque templates across hundreds of Git repositories. ConfigHub
                  stores every rendered setting as queryable, governed data across Kubernetes, Terraform, and
                  application configs, so people and AI agents see exact blast radius and ship safely in seconds.
                </p>

                <div className="hero-actions">
                  <button type="button" className="btn btn-primary" onClick={scrollToWorkbench}>
                    Explore Live Remediation Workbench
                  </button>

                  <button type="button" className="btn btn-dark-secondary" onClick={() => onNavigate('/contact')}>
                    Book Architecture Review
                  </button>
                </div>
              </div>

              <div className="hero-aside-facts">
                <div className="hero-aside-item">
                  <strong>Built by co-creators of Kubernetes &amp; GitOps</strong>
                  Designed specifically to close the rendered-state gap exposed by fleet scale and AI velocity.
                </div>

                <div className="hero-aside-item">
                  <strong>Works above your existing stack</strong>
                  Keep Git for source code. Keep Argo CD, Flux, Sveltos, and Terraform for delivery.
                </div>

                <div className="hero-aside-item">
                  <strong>Zero cluster credentials required</strong>
                  Runs cloud-hosted or air-gapped inside your VPC, publishing signed OCI releases to your registry.
                </div>
              </div>
            </div>

            <HeroInspector />
          </div>
        </div>
      </section>

      {/* ECOSYSTEM INTEGRATION RAIL */}
      <section className="ecosystem-band" aria-label="Supported infrastructure stack">
        <div className="wrap">
          <div className="ecosystem-row">
            <span className="ecosystem-caption">Additive on day one across existing stacks</span>

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
                Terraform · Crossplane · MCP · Claude · Codex · Cursor
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT BELOW THE FOLD: VULNERABILITY APOCALYPSE (PATH 2 HOOK) */}
      <section className="band-dark section-pad" id="workbench-band">
        <div className="wrap">
          <div className="rail-frame">
            <span className="reg-mark reg-tl" aria-hidden="true" />
            <span className="reg-mark reg-tr" aria-hidden="true" />

            <div className="chapter-head">
              <h2 className="chapter-h2">
                Identifying the vulnerability is only step one.
              </h2>

              <p className="lead lead-dark">
                Your scanners find an exposed image in ten seconds, and AI attackers weaponize it in hours. Getting a
                fix into production responsibly, gradually, and reliably across 200 clusters without tearing down
                healthy workloads is where remediation stalls. Isolate exact exposure in one query, deploy targeted
                patches or compensating controls, and roll forward ring by ring with single-cluster rollback.
              </p>
            </div>

            <VulnWorkbench />
          </div>
        </div>
      </section>

      {/* DUAL-ENGINE AI ARCHITECTURE: AI FOR USE + AI FOR CONTROL */}
      <section className="band-dark section-pad">
        <div className="wrap">
          <div className="rail-frame">
            <span className="reg-mark reg-tl" aria-hidden="true" />
            <span className="reg-mark reg-tr" aria-hidden="true" />

            <div className="chapter-head">
              <h2 className="chapter-h2">
                Built for AI to use.
                <span className="display-h1-muted">Engineered to keep AI under control.</span>
              </h2>

              <p className="lead lead-dark">
                Agents guess blindly on raw template repos and create catastrophic blast radius when given cluster keys.
                ConfigHub exposes rendered ground truth over MCP and API while enforcing deterministic field locks and
                policy gates inside a zero-LLM-egress database core.
              </p>
            </div>

            <div className="shared-matrix-2">
              <div className="matrix-cell-dark">
                <h3 className="sub-h3" style={{ color: 'var(--dark-ink)' }}>
                  AI for Use: Machine-legible live state
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--dark-ink-secondary)' }}>
                  Give coding, SRE, and security agents exact fleet visibility without scraping 200 repositories.
                </p>

                <ul className="cap-list">
                  <li>
                    <strong>Native MCP, CLI, and Typed API</strong>
                    <span>
                      Connect Claude, Codex, Cursor, or internal bots straight to rendered live state with zero Go
                      template parsing or local repo clones.
                    </span>
                  </li>
                  <li>
                    <strong>Cross-Resource Graph Awareness</strong>
                    <span>
                      Agents inspect linked Services, TLS certificates, selectors, and webhook names before drafting a
                      change, preventing silent cluster breakage.
                    </span>
                  </li>
                  <li>
                    <strong>Immediate Compensating Controls</strong>
                    <span>
                      When a zero-day arrives ahead of a vendor patch, agents draft targeted NetworkPolicies, RBAC
                      tightening, and flag locks across exposed units in seconds.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="matrix-cell-dark">
                <h3 className="sub-h3" style={{ color: 'var(--dark-ink)' }}>
                  AI for Control: Deterministic guardrails
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--dark-ink-secondary)' }}>
                  Enforce verifiable limits and human sign-off before any configuration touches a cluster.
                </p>

                <ul className="cap-list">
                  <li>
                    <strong>Scoped Non-Human Identities &amp; Field Locks</strong>
                    <span>
                      Each agent authenticates under its own short-lived OIDC service account with field-level
                      permissions. Protected RBAC, secrets, and DB routes stay locked against overwrite.
                    </span>
                  </li>
                  <li>
                    <strong>Separation of Duties &amp; Checker Agents</strong>
                    <span>
                      No agent approves its own proposal. Deterministic policies and independent checker agents clear
                      safe routine edits while routing Tier-0 blast radius to a named human approver.
                    </span>
                  </li>
                  <li>
                    <strong>Zero Cluster Credentials, Zero LLM Egress</strong>
                    <span>
                      The core database is 100% deterministic and self-hostable inside air-gapped VPCs. Approved
                      changes ship as signed OCI bundles that Argo CD or Flux pull.
                    </span>
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
              <h2 className="chapter-h2">Keep Git for code. Keep your reconcilers for delivery.</h2>

              <p className="lead lead-dark">
                ConfigHub slots directly between intent and actuation. Your CI pipelines still build container images,
                your registry stays authoritative, and Argo CD, Flux, Sveltos, or Terraform keep reconciling clusters.
              </p>
            </div>

            <ArchitectureDiagram />
          </div>
        </div>
      </section>

      {/* EDITORIAL DRAFTING PAPER WORLD: FOUR STRUCTURAL FAILURES SOLVED */}
      <section className="band-paper section-pad">
        <div className="wrap">
          <div className="rail-frame-paper">
            <span className="reg-mark reg-tl" aria-hidden="true" />
            <span className="reg-mark reg-tr" aria-hidden="true" />

            <div className="chapter-head">
              <h2 className="chapter-h2">Where file-based operations break at fleet scale.</h2>

              <p className="lead lead-paper">
                Git excels at versioned source code. Using file repositories as an operational database for millions of
                live settings produces four recurring failure modes across enterprise infrastructure.
              </p>
            </div>

            <div className="pain-ledger">
              {PAIN_LEDGER.map((entry) => (
                <div className="pain-row" key={entry.index}>
                  <h3 className="pain-title">{entry.name}</h3>
                  <div>
                    <span className="col-caption">Today in Git &amp; Templates</span>
                    <p className="pain-copy">{entry.todayFailure}</p>
                  </div>
                  <div>
                    <span className="col-caption">With ConfigHub Database</span>
                    <p className="pain-copy pain-copy-strong">{entry.confighubMechanism}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VERIFIED BANK PROOF & FOUNDERS (READING STAGE) */}
      <section className="band-stone section-pad">
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
                  Platform Engineering Team · Top-10 US Bank (Self-Hosted Production)
                </footer>
              </blockquote>
            </div>

            <div className="chapter-head" style={{ marginBottom: '20px' }}>
              <h2 className="chapter-h2">Built by the engineers behind Kubernetes, GitOps, and Heroku.</h2>

              <p className="lead lead-paper">
                Decades designing declarative cloud systems led directly to ConfigHub: a deterministic configuration
                database built for multi-cluster scale and agentic speed.
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
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--paper-ink-secondary)', lineHeight: 1.58 }}>
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

      {/* CLOSING CONVERSION BRIDGE (ZERO WAITLIST) */}
      <section className="band-dark section-pad">
        <div className="wrap">
          <div className="closing-split">
            <div className="closing-pane">
              <h2 className="chapter-h2" style={{ fontSize: 'clamp(1.75rem, 2.7vw, 2.35rem)' }}>
                Start in 15 minutes. No approval waitlist.
              </h2>
              <p className="lead lead-dark" style={{ marginBottom: '20px', fontSize: '0.96rem' }}>
                Install the MIT-licensed CLI, import a live Helm chart into the cloud sandbox, query rendered settings,
                and connect Claude or Cursor over MCP.
              </p>

              <pre className="code-block-dark" style={{ marginBottom: '22px' }}>
                <code>{`brew install confighub/tap/cub\ncub auth login --sandbox\ncub unit import --from-helm ./charts/payments`}</code>
              </pre>

              <button type="button" className="btn btn-primary" onClick={() => onNavigate('/contact')}>
                Launch Instant Sandbox
              </button>
            </div>

            <div className="closing-pane closing-pane-alt">
              <h2 className="chapter-h2" style={{ fontSize: 'clamp(1.75rem, 2.7vw, 2.35rem)' }}>
                Run one live CVE inside your VPC.
              </h2>
              <p className="lead lead-dark" style={{ marginBottom: '24px', fontSize: '0.96rem' }}>
                Deploy ConfigHub Enterprise inside your private cloud or air-gapped network. Pick one real
                vulnerability or promotion flow and measure time-to-fixed end to end with full audit receipts.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <button type="button" className="btn btn-primary" onClick={() => onNavigate('/contact')}>
                  Book 30-Min Architecture Review
                </button>
                <button type="button" className="btn btn-dark-secondary" onClick={() => onNavigate('/security')}>
                  Inspect Security Architecture
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
