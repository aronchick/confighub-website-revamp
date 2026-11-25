import { useEffect, useState } from 'react';
import { HERO_IMPACT_ROWS, type HeroInspectorMode } from '../data/workbenchData';

const SPACES: Array<{ id: string; count: number; matchCluster: string }> = [
  { id: 'payments-prod', count: 112, matchCluster: 'prod-us-east-1' },
  { id: 'checkout-prod', count: 98, matchCluster: 'prod-eu-west-2' },
  { id: 'ledger-prod', count: 74, matchCluster: 'prod-us-west-2 (+281)' },
];

export function HeroInspector() {
  const [mode, setMode] = useState<HeroInspectorMode>('confighub');
  const [selectedSpace, setSelectedSpace] = useState<string>('payments-prod');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!loading) {
      return;
    }

    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 150);

    return () => {
      window.clearTimeout(timer);
    };
  }, [loading]);

  const handleModeChange = (nextMode: HeroInspectorMode) => {
    if (nextMode === mode) {
      return;
    }

    setMode(nextMode);
    setLoading(true);
  };

  const activeCluster = SPACES.find((space) => space.id === selectedSpace)?.matchCluster ?? '';

  return (
    <div className="product-mat" aria-label="Live configuration blast-radius inspector">
      <div className="app-window">
        <div className="app-header">
          <div className="app-title">
            <strong>Change Set #4812</strong>
            <span style={{ color: 'var(--ink-muted)' }}>ingress-nginx 1.12.4 security patch</span>
          </div>

          <div className="seg-switch" role="tablist" aria-label="Compare Git PR with ConfigHub rendered view">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'git'}
              className={`seg-btn ${mode === 'git' ? 'active' : ''}`}
              onClick={() => handleModeChange('git')}
            >
              Git PR (1 line)
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={mode === 'confighub'}
              className={`seg-btn ${mode === 'confighub' ? 'active' : ''}`}
              onClick={() => handleModeChange('confighub')}
            >
              ConfigHub (284 workloads)
            </button>
          </div>
        </div>

        <div className="app-layout">
          <aside className="app-sidebar" aria-label="Production spaces">
            <div className="sidebar-label">Production Spaces</div>
            {SPACES.map((space) => (
              <button
                key={space.id}
                type="button"
                className={`sidebar-item ${selectedSpace === space.id ? 'active' : ''}`}
                aria-pressed={selectedSpace === space.id}
                onClick={() => setSelectedSpace(space.id)}
              >
                <span>{space.id}</span>
                <span className="sidebar-count">{space.count}</span>
              </button>
            ))}
          </aside>

          <div className="app-main">
            {loading ? (
              <div className="skeleton-stack" aria-busy="true" aria-label="Querying live fleet state">
                <div className="skeleton-bar" style={{ width: '88%' }} />
                <div className="skeleton-bar" style={{ width: '100%', height: '104px' }} />
                <div className="skeleton-bar" style={{ width: '72%' }} />
              </div>
            ) : mode === 'git' ? (
              <div>
                <div className="query-bar">
                  <span>
                    <span className="query-label">Git diff</span>
                    charts/ingress/values.yaml
                  </span>
                  <span style={{ color: 'var(--ink-muted)' }}>1 line changed</span>
                </div>

                <div className="diff-sheet">
                  <div className="diff-row diff-del">
                    <span className="diff-ln">42</span>
                    <span>- imageTag: &quot;1.11.2&quot;</span>
                  </div>
                  <div className="diff-row diff-add">
                    <span className="diff-ln">42</span>
                    <span>+ imageTag: &quot;1.12.4-patched&quot;</span>
                  </div>
                </div>

                <div className="callout callout-warn">
                  <strong>Blind review:</strong> 0 affected clusters listed, 0 linked TLS references checked, unknown
                  blast radius.
                </div>
              </div>
            ) : (
              <div>
                <div className="query-bar">
                  <span>
                    <span className="query-label">Live Graph</span>
                    cub diff --change-set chg_4812 --show-refs
                  </span>
                  <span style={{ color: 'var(--ok-ink)', fontWeight: 500 }}>284 units · 14 clusters · 0.34s</span>
                </div>

                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Cluster</th>
                      <th>Workload</th>
                      <th>Rendered Change</th>
                      <th>Gate</th>
                    </tr>
                  </thead>

                  <tbody>
                    {HERO_IMPACT_ROWS.map((row) => (
                      <tr key={row.cluster} className={row.cluster === activeCluster ? 'row-focused' : undefined}>
                        <td className="mono" style={{ color: 'var(--ink)', fontSize: '0.8rem' }}>
                          {row.cluster}
                        </td>
                        <td style={{ color: 'var(--ink)', fontWeight: 500 }}>{row.workload}</td>
                        <td className="mono" style={{ fontSize: '0.77rem' }}>
                          {row.mutation}
                        </td>
                        <td>
                          <span
                            className={`tag ${row.gateTone === 'deny' ? 'tag-deny' : row.gateTone === 'ok' ? 'tag-ok' : ''}`}
                          >
                            <span className="tag-dot" aria-hidden="true" />
                            {row.gateLabel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="callout callout-ok">
                  <strong>284 workloads previewed before apply:</strong> 3 linked TLS refs synced automatically, 1
                  compliance field held by lock.
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="app-footer">
          <span>3M+ live production settings queryable like a database</span>
          <span className="mono" style={{ fontSize: '0.75rem' }}>
            12% of Helm fields cross-reference another resource · &lt;60s audited fix
          </span>
        </div>
      </div>
    </div>
  );
}
