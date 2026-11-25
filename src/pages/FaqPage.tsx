import { useState } from 'react';
import { FAQ_ENTRIES, type FaqCategory } from '../data/siteContent';

interface FaqPageArgs {
  onNavigate: (path: string) => void;
}

const CATEGORIES: FaqCategory[] = ['All', 'Architecture', 'AI & Security', 'Enterprise'];

export function FaqPage({ onNavigate }: FaqPageArgs) {
  const [category, setCategory] = useState<FaqCategory>('All');

  const visibleEntries =
    category === 'All'
      ? FAQ_ENTRIES
      : FAQ_ENTRIES.filter((entry) => entry.category === category);

  return (
    <>
      <section className="band-paper page-opening">
        <div className="wrap">
          <div className="rail-frame-paper">
            <h1 className="display-h1">Direct answers on architecture, AI, and security.</h1>
            <p className="lead lead-paper">
              Plain engineering explanations of how Configuration as Data fits alongside Git, Helm, Argo CD, Flux,
              Terraform, security scanners, and enterprise AI agents.
            </p>
          </div>
        </div>
      </section>

      <section className="band-stone section-pad">
        <div className="wrap">
          <div className="rail-frame-paper">
            <div className="faq-bar" role="tablist" aria-label="Filter FAQ by topic">
              {CATEGORIES.map((item) => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={category === item}
                  className={`btn btn-sm ${category === item ? 'btn-primary' : 'btn-paper-secondary'}`}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div>
              {visibleEntries.map((entry) => (
                <div className="faq-row" key={entry.id}>
                  <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--accent)', marginBottom: '6px' }}>
                    {entry.category}
                  </div>
                  <h2 className="faq-question">{entry.question}</h2>
                  <p className="faq-answer">{entry.answer}</p>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '36px',
                padding: '24px',
                border: '1px solid var(--paper-rule-strong)',
                backgroundColor: 'var(--paper-well)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div>
                <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '4px' }}>
                  Have a specific fleet architecture or compliance question?
                </strong>
                <span style={{ color: 'var(--paper-ink-secondary)', fontSize: '0.92rem' }}>
                  Speak directly with our founding engineers and run a live demo against your real stack.
                </span>
              </div>

              <button type="button" className="btn btn-primary" onClick={() => onNavigate('/contact')}>
                Talk to Engineering
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
