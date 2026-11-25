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
    }, 170);

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
            <strong>chg_4812</strong> · Compare Git PR #4812 against rendered fleet state
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

        <div className="instrument-body">
          {loading ? (
            <div className="skeleton-stack" aria-busy="true" aria-label="Querying live fleet state">
              <div className="skeleton-dark" style={{ width: '92%' }} />
              <div className="skeleton-dark" style={{ width: '100%', height: '120px' }} />
              <div className="skeleton-dark" style={{ width: '84%', height: '48px' }} />
            </div>
          ) : mode === 'git' ? (
            <div>
              <div className="cmd-line">
                <span>
                  <span className="cmd-prompt">git diff</span>
                  charts/platform-ingress/values.yaml
                </span>
                <span style={{ color: 'var(--dark-ink-muted)' }}>+2 / -2 lines</span>
              </div>

              <div className="diff-box">
                <div className="diff-row">
                  <span className="diff-ln">41</span>
                  <span>controller:</span>
                </div>
                <div className="diff-row diff-del">
                  <span className="diff-ln">42</span>
                  <span>-   imageTag: &quot;1.11.2&quot;</span>
                </div>
                <div className="diff-row diff-add">
                  <span className="diff-ln">42</span>
                  <span>+   imageTag: &quot;1.12.4-patched&quot;</span>
                </div>
                <div className="diff-row diff-del">
                  <span className="diff-ln">43</span>
                  <span>-   timeoutSeconds: 60</span>
                </div>
                <div className="diff-row diff-add">
                  <span className="diff-ln">43</span>
                  <span>+   timeoutSeconds: 30</span>
                </div>
              </div>

              <div className="notice-dark notice-dark-warn">
                <strong>Template blindness in code review:</strong> 0 affected clusters enumerated, 0 linked webhook or
                TLS references verified, and no field-level protection. Approving this pull request mutates an unknown
                slice of production.
              </div>
            </div>
          ) : (
            <div>
              <div className="cmd-line">
                <span>
                  <span className="cmd-prompt">cub</span>
                  diff --change-set chg_4812 --show-refs --env prod
                </span>
                <span style={{ color: 'var(--ok-dark)' }}>284 units · 14 clusters · 0.34s</span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="data-table-dark">
                  <thead>
                    <tr>
                      <th>Cluster</th>
                      <th>Rendered Workload Mutation</th>
                      <th>Cross-Resource Links</th>
                      <th>Policy Gate</th>
                    </tr>
                  </thead>

                  <tbody>
                    {HERO_IMPACT_ROWS.map((row) => (
                      <tr key={row.cluster}>
                        <td className="mono" style={{ color: 'var(--dark-ink)' }}>
                          {row.cluster}
                        </td>
                        <td>
                          <strong style={{ color: 'var(--dark-ink)', fontWeight: 600 }}>{row.workload}</strong>
                          <div className="mono" style={{ fontSize: '0.74rem', color: 'var(--dark-ink-muted)' }}>
                            {row.changeSummary}
                          </div>
                        </td>
                        <td style={{ fontSize: '0.8rem' }}>{row.crossRefStatus}</td>
                        <td>
                          <span className={`badge badge-dark-${row.gateTone}`}>{row.gateLabel}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="notice-dark notice-dark-ok">
                <strong>Full blast radius visible before apply:</strong> 284 rendered workloads verified, 3 linked
                webhook references reconciled, 1 locked service-account field preserved, staged for Ring 0 canary.
              </div>
            </div>
          )}
        </div>

        <div className="instrument-footer-strip">
          <span>3,000,000+ live settings indexed across a typical 200-cluster fleet</span>
          <span>12% of Helm fields silently cross-reference another resource · &lt;60s audited release</span>
        </div>
      </div>
    </div>
  );
}
