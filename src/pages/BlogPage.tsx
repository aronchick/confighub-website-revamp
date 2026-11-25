import { BLOG_ARTICLES } from '../data/siteContent';
import { toBrowserPath } from '../lib/paths';

interface BlogPageArgs {
  slug: string | null;
  onNavigate: (path: string) => void;
}

export function BlogPage({ slug, onNavigate }: BlogPageArgs) {
  const selectedArticle = slug ? BLOG_ARTICLES.find((item) => item.slug === slug) ?? null : null;

  if (selectedArticle) {
    return (
      <>
        <section className="band-paper page-opening">
          <div className="wrap">
            <div className="rail-frame-paper">
              <button
                type="button"
                className="btn btn-paper-secondary btn-sm"
                style={{ marginBottom: '24px' }}
                onClick={() => onNavigate('/blog')}
              >
                All Engineering Dispatches
              </button>

              <div className="mono" style={{ fontSize: '0.78rem', color: 'var(--accent)', marginBottom: '12px' }}>
                {selectedArticle.category} · {selectedArticle.date} · {selectedArticle.readTime}
              </div>

              <h1 className="display-h1" style={{ fontSize: 'clamp(2.1rem, 4vw, 3.3rem)', maxWidth: '24ch' }}>
                {selectedArticle.title}
              </h1>

              <p className="mono" style={{ fontSize: '0.82rem', color: 'var(--paper-ink-muted)', margin: 0 }}>
                By {selectedArticle.author}
              </p>
            </div>
          </div>
        </section>

        <section className="band-paper section-pad">
          <div className="wrap">
            <div className="rail-frame-paper">
              <article className="article-body">
                {selectedArticle.body.map((section, idx) => (
                  <div key={section.heading ?? String(idx)}>
                    {section.heading ? <h2>{section.heading}</h2> : null}
                    {section.paragraphs.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                    {idx === 0 && selectedArticle.codeSnippet ? (
                      <pre className="code-block-dark" style={{ margin: '28px 0' }}>
                        <code>{selectedArticle.codeSnippet}</code>
                      </pre>
                    ) : null}
                  </div>
                ))}

                <div
                  style={{
                    marginTop: '44px',
                    paddingTop: '24px',
                    borderTop: '1px solid var(--paper-rule-strong)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '14px',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontWeight: 600 }}>Want to test this workflow on your own clusters?</span>
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => onNavigate('/contact')}>
                    Book Live Walkthrough
                  </button>
                </div>
              </article>
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
          <div className="rail-frame-paper">
            <h1 className="display-h1">Notes from live production fleets.</h1>
            <p className="lead lead-paper">
              Architectural research, real incident write-ups, and empirical measurements on Configuration as Data,
              vulnerability remediation at fleet scale, and governing AI agents in production.
            </p>
          </div>
        </div>
      </section>

      <section className="band-stone section-pad">
        <div className="wrap">
          <div className="rail-frame-paper">
            <div className="blog-index">
              {BLOG_ARTICLES.map((article) => (
                <article className="blog-entry" key={article.slug}>
                  <div className="mono" style={{ fontSize: '0.76rem', color: 'var(--paper-ink-muted)' }}>
                    <div>{article.date}</div>
                    <div style={{ color: 'var(--accent)', marginTop: '4px' }}>{article.category}</div>
                    <div style={{ marginTop: '4px' }}>{article.readTime}</div>
                  </div>

                  <div>
                    <h2
                      className="chapter-h2"
                      style={{ fontSize: 'clamp(1.35rem, 2vw, 1.8rem)', marginBottom: '10px' }}
                    >
                      <a
                        href={toBrowserPath(`/blog/${article.slug}`)}
                        onClick={(event) => {
                          event.preventDefault();
                          onNavigate(`/blog/${article.slug}`);
                        }}
                      >
                        {article.title}
                      </a>
                    </h2>
                    <p style={{ margin: '0 0 8px', color: 'var(--paper-ink-secondary)', maxWidth: '64ch' }}>
                      {article.excerpt}
                    </p>
                    <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--paper-ink-muted)' }}>
                      {article.author}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="btn btn-paper-secondary btn-sm"
                    onClick={() => onNavigate(`/blog/${article.slug}`)}
                  >
                    Read Dispatch
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
