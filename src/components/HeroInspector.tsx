import { useEffect, useState } from 'react';
import { HERO_IMPACT_ROWS, type HeroInspectorMode } from '../data/workbenchData';

export function HeroInspector() {
  const [mode, setMode] = useState<HeroInspectorMode>('confighub');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!loading) {
      return;
    }

    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 160);

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

  return (
    <div className="instrument-shell" aria-label="Live configuration blast-radius inspector">
      <div className="instrument-well">
        <div className="instrument-toolbar">
          <div className="toolbar-meta">
            <strong>PR #4812</strong> · Compare Git diff vs. live fleet state
          </div>

          <div className="segmented-control" role="tablist" aria-label="Compare Git PR with ConfigHub rendered view">
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

        <div className="instrument-body" style={{ minHeight: '264px' }}>
          {loading ? (
            <div className="skeleton-stack" aria-busy="true" aria-label="Querying live fleet state">
              <div className="skeleton-dark" style={{ width: '90%' }} />
              <div className="skeleton-dark" style={{ width: '100%', height: '100px' }} />
              <div className="skeleton-dark" style={{ width: '75%' }} />
            </div>
          ) : mode === 'git' ? (
            <div>
              <div className="cmd-line">
                <span>
                  <span className="cmd-prompt">git diff</span>
                  charts/ingress/values.yaml
                </span>
                <span style={{ color: 'var(--dark-ink-muted)' }}>+1 / -1</span>
              </div>

              <div className="diff-box">
                <div className="diff-row diff-del">
                  <span className="diff-ln">42</span>
                  <span>- imageTag: &quot;1.11.2&quot;</span>
                </div>
                <div className="diff-row diff-add">
                  <span className="diff-ln">42</span>
                  <span>+ imageTag: &quot;1.12.4-patched&quot;</span>
                </div>
              </div>

              <div className="notice-dark notice-dark-warn">
                <strong>Blind review:</strong> 0 affected clusters listed, 0 linked TLS refs checked, unknown blast radius.
              </div>
            </div>
          ) : (
            <div>
              <div className="cmd-line">
                <span>
                  <span className="cmd-prompt">cub</span>
                  diff --change-set chg_4812 --show-refs
                </span>
                <span style={{ color: 'var(--ok-dark)' }}>284 units · 14 clusters · 0.34s</span>
              </div>

              <table className="data-table-dark" style={{ marginBottom: '12px' }}>
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
                    <tr key={row.cluster}>
                      <td className="mono" style={{ color: 'var(--dark-ink)' }}>
                        {row.cluster}
                      </td>
                      <td style={{ color: 'var(--dark-ink)', fontWeight: 500 }}>{row.workload}</td>
                      <td className="mono" style={{ fontSize: '0.76rem' }}>
                        {row.mutation}
                      </td>
                      <td>
                        <span className={`badge badge-dark-${row.gateTone}`}>{row.gateLabel}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="notice-dark notice-dark-ok">
                <strong>284 workloads previewed before apply:</strong> 3 linked refs synced, 1 compliance field locked.
              </div>
            </div>
          )}
        </div>

        <div className="instrument-footer-strip">
          <span>3M+ live settings queryable like a database</span>
          <span>12% of Helm fields cross-reference another resource · &lt;60s audited fix</span>
        </div>
      </div>
    </div>
  );
}
