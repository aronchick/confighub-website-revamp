import { useEffect, useState } from 'react';
import {
  REMEDIATION_SCENARIOS,
  type RemediationScenarioId,
  type RemediationStageIndex,
} from '../data/workbenchData';

type RingRolloutMode = 'ring0-ok' | 'ring1-rollback' | 'complete';

const STAGES: Array<{ num: string; title: string }> = [
  { num: '01', title: 'Locate' },
  { num: '02', title: 'Target Fix' },
  { num: '03', title: 'Canary Rings' },
  { num: '04', title: 'Audit Receipt' },
];

export function VulnWorkbench() {
  const [scenarioId, setScenarioId] = useState<RemediationScenarioId>('ingress-rce');
  const [stage, setStage] = useState<RemediationStageIndex>(0);
  const [ringMode, setRingMode] = useState<RingRolloutMode>('ring0-ok');
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

  const active =
    REMEDIATION_SCENARIOS.find((item) => item.id === scenarioId) ?? REMEDIATION_SCENARIOS[0];

  const selectScenario = (nextId: RemediationScenarioId) => {
    if (nextId === scenarioId) {
      return;
    }

    setScenarioId(nextId);
    setStage(0);
    setRingMode('ring0-ok');
    setLoading(true);
  };

  const selectStage = (nextStage: RemediationStageIndex) => {
    if (nextStage === stage) {
      return;
    }

    setStage(nextStage);
    setLoading(true);
  };

  return (
    <div className="instrument-shell" id="workbench" aria-label="Interactive vulnerability remediation workbench">
      <div className="instrument-well">
        <div className="instrument-toolbar">
          <div className="scenario-bar" role="tablist" aria-label="Select vulnerability scenario">
            {REMEDIATION_SCENARIOS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={item.id === scenarioId}
                className={`scenario-btn ${item.id === scenarioId ? 'active' : ''}`}
                onClick={() => selectScenario(item.id)}
              >
                {item.shortLabel}
              </button>
            ))}
          </div>

          <span className="badge badge-dark-accent">{active.cveCode}</span>
        </div>

        <div className="stage-rail" role="tablist" aria-label="Remediation workflow stages">
          {STAGES.map((item, idx) => {
            const typedIdx = idx === 0 ? 0 : idx === 1 ? 1 : idx === 2 ? 2 : 3;

            return (
              <button
                key={item.num}
                type="button"
                role="tab"
                aria-selected={stage === typedIdx}
                className={`stage-tab ${stage === typedIdx ? 'active' : ''}`}
                onClick={() => selectStage(typedIdx)}
              >
                <span className="stage-step-num">Step {item.num}</span>
                <span className="stage-step-label">{item.title}</span>
              </button>
            );
          })}
        </div>

        <div className="instrument-body" style={{ minHeight: '280px' }}>
          {loading ? (
            <div className="skeleton-stack" aria-busy="true" aria-label="Loading stage output">
              <div className="skeleton-dark" style={{ width: '80%' }} />
              <div className="skeleton-dark" style={{ width: '100%', height: '84px' }} />
              <div className="skeleton-dark" style={{ width: '65%' }} />
            </div>
          ) : stage === 0 ? (
            <div className="workbench-split">
              <div>
                <p style={{ margin: '0 0 10px', fontSize: '0.88rem', color: 'var(--dark-ink-secondary)' }}>
                  <strong style={{ color: 'var(--accent-light)' }}>Input:</strong> {active.scannerInput}
                </p>

                <pre className="code-block-dark">
                  <code>{`$ ${active.queryCommand}`}</code>
                </pre>

                <table className="data-table-dark" style={{ marginBottom: 0 }}>
                  <thead>
                    <tr>
                      <th>Cluster</th>
                      <th>Tier</th>
                      <th>Live Value</th>
                      <th>Ring</th>
                    </tr>
                  </thead>

                  <tbody>
                    {active.targets.map((target) => (
                      <tr key={target.cluster}>
                        <td className="mono" style={{ color: 'var(--dark-ink)' }}>
                          {target.cluster}
                        </td>
                        <td>{target.tier}</td>
                        <td className="mono">{target.liveValue}</td>
                        <td>
                          <span className="badge badge-dark-warn">{target.ring}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="metric-well">
                <div className="mono" style={{ fontSize: '1.85rem', fontWeight: 600, color: 'var(--dark-ink)' }}>
                  {active.affectedWorkloads} units
                </div>
                <p style={{ margin: '6px 0 18px', fontSize: '0.86rem', color: 'var(--dark-ink-secondary)' }}>
                  Across {active.affectedClusters} clusters. {active.skippedClusters} healthy clusters untouched.
                </p>
                <button type="button" className="btn btn-primary btn-sm" onClick={() => selectStage(1)}>
                  Next: Target Fix
                </button>
              </div>
            </div>
          ) : stage === 1 ? (
            <div className="workbench-split">
              <div>
                <pre className="code-block-dark" style={{ marginBottom: '12px' }}>
                  <code>{active.agentProposalCode}</code>
                </pre>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--dark-ink-secondary)' }}>
                  Internet-facing Tier-0 clusters stage first. Zero changes touch live clusters until approved.
                </p>
              </div>

              <div className="metric-well">
                <div className="mono" style={{ fontSize: '0.76rem', color: 'var(--accent-light)', marginBottom: '10px' }}>
                  {active.agentIdentity}
                </div>
                <p style={{ margin: '0 0 16px', fontSize: '0.86rem', color: 'var(--dark-ink-secondary)' }}>
                  Zero cluster keys. Agent cannot approve its own change.
                </p>
                <button type="button" className="btn btn-primary btn-sm" onClick={() => selectStage(2)}>
                  Next: Canary Rings
                </button>
              </div>
            </div>
          ) : stage === 2 ? (
            <div>
              <div className="ring-controls">
                <button
                  type="button"
                  className={`btn btn-sm ${ringMode === 'ring0-ok' ? 'btn-primary' : 'btn-dark-secondary'}`}
                  onClick={() => setRingMode('ring0-ok')}
                >
                  Ring 0 Healthy
                </button>

                <button
                  type="button"
                  className={`btn btn-sm ${ringMode === 'ring1-rollback' ? 'btn-primary' : 'btn-dark-secondary'}`}
                  onClick={() => setRingMode('ring1-rollback')}
                >
                  Simulate Ring 1 Failure (Single-Cluster Rollback)
                </button>

                <button
                  type="button"
                  className={`btn btn-sm ${ringMode === 'complete' ? 'btn-primary' : 'btn-dark-secondary'}`}
                  onClick={() => setRingMode('complete')}
                >
                  Complete Fleet Rollout
                </button>
              </div>

              <div className="ring-grid">
                <div className="ring-cell ring-cell-ok">
                  <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--dark-ink-muted)', marginBottom: '6px' }}>
                    Ring 0 · {active.targets[0]?.cluster}
                  </div>
                  <span className="badge badge-dark-ok">Healthy · Patched</span>
                  <p style={{ margin: '10px 0 0', fontSize: '0.83rem', color: 'var(--dark-ink-secondary)' }}>
                    P99 nominal across 120s health gate.
                  </p>
                </div>

                <div
                  className={`ring-cell ${
                    ringMode === 'ring1-rollback' ? 'ring-cell-fail' : ringMode === 'complete' ? 'ring-cell-ok' : ''
                  }`}
                >
                  <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--dark-ink-muted)', marginBottom: '6px' }}>
                    Ring 1 · {active.targets[1]?.cluster}
                  </div>
                  <span
                    className={`badge ${
                      ringMode === 'ring1-rollback'
                        ? 'badge-dark-deny'
                        : ringMode === 'complete'
                          ? 'badge-dark-ok'
                          : 'badge-dark-warn'
                    }`}
                  >
                    {ringMode === 'ring1-rollback'
                      ? 'Reverted Alone'
                      : ringMode === 'complete'
                        ? 'Healthy · Patched'
                        : 'Queued'}
                  </span>
                  <p style={{ margin: '10px 0 0', fontSize: '0.83rem', color: 'var(--dark-ink-secondary)' }}>
                    {ringMode === 'ring1-rollback'
                      ? '5xx spike caught. Only this cluster reverted; Ring 0 stays patched.'
                      : 'Waits for Ring 0 health verification.'}
                  </p>
                </div>

                <div className={`ring-cell ${ringMode === 'complete' ? 'ring-cell-ok' : ''}`}>
                  <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--dark-ink-muted)', marginBottom: '6px' }}>
                    Ring 2 · {active.targets[2]?.cluster}
                  </div>
                  <span className={`badge ${ringMode === 'complete' ? 'badge-dark-ok' : 'badge-dark-warn'}`}>
                    {ringMode === 'ring1-rollback'
                      ? 'Auto-Paused'
                      : ringMode === 'complete'
                        ? 'Healthy · Patched'
                        : 'Waiting'}
                  </span>
                  <p style={{ margin: '10px 0 0', fontSize: '0.83rem', color: 'var(--dark-ink-secondary)' }}>
                    {ringMode === 'ring1-rollback'
                      ? 'Circuit breaker halted promotion with zero blast radius.'
                      : 'Remaining exposed clusters only.'}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <button type="button" className="btn btn-primary btn-sm" onClick={() => selectStage(3)}>
                  Next: Audit Receipt
                </button>
              </div>
            </div>
          ) : (
            <div className="workbench-split">
              <pre className="code-block-dark" style={{ marginBottom: 0 }}>
                <code>
                  {[
                    `{`,
                    `  "actor": "${active.agentIdentity}",`,
                    `  "approval": "${active.approver}",`,
                    `  "patched_units": ${active.affectedWorkloads},`,
                    `  "skipped_clusters": ${active.skippedClusters},`,
                    `  "oci_release": "${active.receiptDigest}",`,
                    `  "elapsed": "${active.elapsedTime}",`,
                    `  "break_glass": false`,
                    `}`,
                  ].join('\n')}
                </code>
              </pre>

              <div className="metric-well">
                <div className="mono" style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--ok-dark)' }}>
                  {active.elapsedTime}
                </div>
                <p style={{ margin: '6px 0 14px', fontSize: '0.86rem', color: 'var(--dark-ink-secondary)' }}>
                  Exportable for SOX, SOC 2, DORA, FINRA, and EU AI Act audits.
                </p>
                <span className="badge badge-dark-ok">Verified Applied · Zero Drift</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
