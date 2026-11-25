import { useState, type ReactNode } from 'react';
import { assetUrl, toBrowserPath } from '../lib/paths';

interface LayoutArgs {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: ReactNode;
}

const NAV_ITEMS: Array<{ label: string; path: string }> = [
  { label: 'Platform', path: '/' },
  { label: 'Enterprise', path: '/enterprise' },
  { label: 'Security', path: '/security' },
  { label: 'Blog', path: '/blog' },
  { label: 'FAQ', path: '/faq' },
];

export function Layout({ currentPath, onNavigate, children }: LayoutArgs) {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const navigateAndClose = (path: string) => {
    setMobileOpen(false);
    onNavigate(path);
  };

  const isNavActive = (itemPath: string): boolean => {
    if (itemPath === '/') {
      return currentPath === '/';
    }

    return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
  };

  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <a
            href={toBrowserPath('/')}
            className="brand-link"
            aria-label="ConfigHub home"
            onClick={(event) => {
              event.preventDefault();
              navigateAndClose('/');
            }}
          >
            <img src={assetUrl('/assets/logo.svg')} alt="ConfigHub" />
          </a>

          <nav className="nav-desktop" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.path}
                href={toBrowserPath(item.path)}
                className={`nav-link ${isNavActive(item.path) ? 'active' : ''}`}
                aria-current={isNavActive(item.path) ? 'page' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  navigateAndClose(item.path);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a
              href="https://docs.confighub.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark-secondary btn-sm"
            >
              Read Docs
            </a>

            <button type="button" className="btn btn-primary btn-sm" onClick={() => navigateAndClose('/contact')}>
              Book Review
            </button>
          </div>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        <nav id="mobile-navigation" className={`nav-mobile ${mobileOpen ? 'open' : ''}`} aria-label="Mobile navigation">
          <div className="nav-mobile-list">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.path}
                href={toBrowserPath(item.path)}
                className="nav-mobile-link"
                onClick={(event) => {
                  event.preventDefault();
                  navigateAndClose(item.path);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="nav-mobile-actions">
            <a
              href="https://docs.confighub.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark-secondary btn-sm"
            >
              Read Docs
            </a>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => navigateAndClose('/contact')}>
              Book Review
            </button>
          </div>
        </nav>
      </header>

      <main id="main-content">{children}</main>

      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <img
                src={assetUrl('/assets/logo.svg')}
                alt="ConfigHub"
                style={{ height: '22px', width: 'auto', marginBottom: '14px' }}
              />
              <p
                style={{
                  margin: '0 0 14px',
                  color: 'var(--dark-ink-secondary)',
                  maxWidth: '38ch',
                  fontSize: '0.875rem',
                  lineHeight: 1.58,
                }}
              >
                The governed database for live production configuration. Built by the co-creators of Kubernetes and
                GitOps so teams and AI agents can ship changes safely at machine speed.
              </p>
              <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--dark-ink-muted)' }}>
                hello@confighub.com · security@confighub.com
              </span>
            </div>

            <div>
              <h2 className="footer-heading">Platform</h2>
              <ul className="footer-list">
                <li>
                  <a
                    href={toBrowserPath('/')}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateAndClose('/');
                    }}
                  >
                    Overview &amp; Workbench
                  </a>
                </li>
                <li>
                  <a
                    href={toBrowserPath('/enterprise')}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateAndClose('/enterprise');
                    }}
                  >
                    Enterprise Self-Hosted
                  </a>
                </li>
                <li>
                  <a
                    href={toBrowserPath('/security')}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateAndClose('/security');
                    }}
                  >
                    Security &amp; Trust
                  </a>
                </li>
                <li>
                  <a href="https://docs.confighub.com" target="_blank" rel="noreferrer">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="footer-heading">Resources</h2>
              <ul className="footer-list">
                <li>
                  <a
                    href={toBrowserPath('/blog')}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateAndClose('/blog');
                    }}
                  >
                    Engineering Blog
                  </a>
                </li>
                <li>
                  <a
                    href={toBrowserPath('/faq')}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateAndClose('/faq');
                    }}
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href={toBrowserPath('/contact')}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateAndClose('/contact');
                    }}
                  >
                    Book Architecture Review
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="footer-heading">Legal</h2>
              <ul className="footer-list">
                <li>
                  <a
                    href={toBrowserPath('/tos')}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateAndClose('/tos');
                    }}
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href={toBrowserPath('/privacy')}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateAndClose('/privacy');
                    }}
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 ConfigHub, Inc. All rights reserved.</span>
            <span className="status-inline">
              <span className="status-dot" aria-hidden="true" />
              Deterministic Core · Pull-Based OCI Delivery
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
