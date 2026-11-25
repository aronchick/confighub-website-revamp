import { useEffect, useState } from 'react';
import {
  REMEDIATION_SCENARIOS,
  type RemediationScenarioId,
  type RemediationStageIndex,
} from '../data/workbenchData';

type RingRolloutMode = 'ready' | 'ring0-ok' | 'ring1-isolated-rollback' | 'complete';

const STAGE_LABELS: Array<{ num: string; title: string }> = [
  { num: 'Step 01', title: 'Locate Exposed Fleet' },
  { num: 'Step 02', title: 'Agent Drafts Targeted Fix' },
  { num: 'Step 03', title: 'Gradual Canary Rollout' },
  { num: 'Step 04', title: 'Audit Receipt & Proof' },
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
    }, 170);

    return () => {
      window.clearTimeout(timer);
    };
  }, [loading]);

  const activeScenario =
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

  const ring0Status = ringMode === 'ready' ? 'Pending' : 'Healthy · Patched';

  const ring1Status =
    ringMode === 'ready' || ringMode === 'ring0-ok'
      ? 'Queued (observe 120s)'
      : ringMode === 'ring1-isolated-rollback'
        ? 'Halted · Auto-Rolled Back'
        : 'Healthy · Patched';

  const ring2Status =
    ringMode === 'complete'
      ? 'Healthy · Patched'
      : ringMode === 'ring1-isolated-rollback'
        ? 'Paused automatically (0 blast)'
        : 'Waiting on Ring 1';

  return (
    <div className="instrument-shell" id="workbench" aria-label="Interactive vulnerability remediation workbench">
      <div className="instrument-well">
        <div className="instrument-toolbar">
          <div className="scenario-bar" role="tablist" aria-label="Choose a vulnerability scenario">
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

          <span className="badge badge-dark-accent">{activeScenario.cveCode}</span>
        </div>

        <div className="stage-rail" role="tablist" aria-label="Remediation workflow stages">
          {STAGE_LABELS.map((item, idx) => {
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
                <span className="stage-step-num">{item.num}</span>
                <span className="stage-step-label">{item.title}</span>
              </button>
            );
          })}
        </div>

        <div className="instrument-body">
          {loading ? (
            <div className="skeleton-stack" aria-busy="true" aria-label="Loading stage output">
              <div className="skeleton-dark" style={{ width: '82%' }} />
              <div className="skeleton-dark" style={{ width: '100%', height: '84px' }} />
              <div className="skeleton-dark" style={{ width: '78%', height: '84px' }} />
              <div className="skeleton-dark" style={{ width: '56%' }} />
            </div>
          ) : stage === 0 ? (
            <div className="workbench-split">
              <div>
                <p style={{ margin: '0 0 12px', color: 'var(--dark-ink)', fontSize: '0.94rem' }}>
                  <strong style={{ color: 'var(--accent-light)' }}>Scanner Input:</strong> {activeScenario.scannerInput}
                </p>

                <pre className="code-block-dark">
                  <code>{`$ ${activeScenario.queryCommand}`}</code>
                </pre>

                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table-dark">
                    <thead>
                      <tr>
                        <th>Cluster</th>
                        <th>Exposure Tier</th>
                        <th>Rendered Live Value</th>
                        <th>Rollout Ring</th>
                      </tr>
                    </thead>

                    <tbody>
                      {activeScenario.targets.map((target) => (
                        <tr key={target.cluster}>
                          <td className="mono" style={{ color: 'var(--dark-ink)' }}>
                            {target.cluster}
                          </td>
                          <td>{target.exposure}</td>
                          <td className="mono">{target.currentValue}</td>
                          <td>
                            <span className="badge badge-dark-warn">{target.ring}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="metric-well">
                <div className="mono" style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--dark-ink)', marginBottom: '6px' }}>
                  {activeScenario.affectedWorkloads} units
                </div>
                <p style={{ margin: '0 0 18px', fontSize: '0.88rem', color: 'var(--dark-ink-secondary)', lineHeight: 1.55 }}>
                  Isolated across {activeScenario.affectedClusters} clusters in 0.4 seconds.{' '}
                  {activeScenario.skippedClusters} unaffected clusters remain completely untouched, avoiding collateral
                  restarts or fleet-wide churn.
                </p>

                <button type="button" className="btn btn-primary btn-sm" onClick={() => selectStage(1)}>
                  Inspect Agent Fix Proposal
                </button>
              </div>
            </div>
          ) : stage === 1 ? (
            <div className="workbench-split">
              <div>
                <h3 className="sub-h3" style={{ color: 'var(--dark-ink)', marginBottom: '12px' }}>
                  {activeScenario.agentProposalTitle}
                </h3>

                <pre className="code-block-dark">
                  <code>{activeScenario.agentProposalCode}</code>
                </pre>

                <p style={{ margin: 0, color: 'var(--dark-ink-secondary)', fontSize: '0.93rem' }}>
                  {activeScenario.agentRationale}
                </p>
              </div>

              <div className="metric-well">
                <div style={{ fontSize: '0.78rem', color: 'var(--dark-ink-muted)', marginBottom: '6px' }}>
                  Proposing Non-Human Identity
                </div>
                <p className="mono" style={{ fontSize: '0.8rem', margin: '0 0 14px', color: 'var(--accent-light)' }}>
                  {activeScenario.agentIdentity}
                </p>
                <p style={{ fontSize: '0.88rem', color: 'var(--dark-ink-secondary)', margin: '0 0 18px', lineHeight: 1.55 }}>
                  The agent mutates only permitted configuration fields inside ConfigHub. It holds zero cluster
                  credentials and cannot approve its own change.
                </p>

                <button type="button" className="btn btn-primary btn-sm" onClick={() => selectStage(2)}>
                  Stage Gradual Canary Rollout
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
                  1. Verify Ring 0 Canary
                </button>

                <button
                  type="button"
                  className={`btn btn-sm ${ringMode === 'ring1-isolated-rollback' ? 'btn-primary' : 'btn-dark-secondary'}`}
                  onClick={() => setRingMode('ring1-isolated-rollback')}
                >
                  2. Simulate Ring 1 Health Failure (Single-Cluster Rollback)
                </button>

                <button
                  type="button"
                  className={`btn btn-sm ${ringMode === 'complete' ? 'btn-primary' : 'btn-dark-secondary'}`}
                  onClick={() => setRingMode('complete')}
                >
                  3. Complete Clean Rollout
                </button>
              </div>

              <div className="ring-grid">
                <div className={`ring-cell ${ringMode !== 'ready' ? 'ring-cell-ok' : ''}`}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--dark-ink-muted)', marginBottom: '6px' }}>
                    Ring 0 · Canary (Tier-0)
                  </div>
                  <p className="mono" style={{ margin: '0 0 10px', color: 'var(--dark-ink)', fontSize: '0.88rem' }}>
                    {activeScenario.targets[0]?.cluster}
                  </p>
                  <span className="badge badge-dark-ok">{ring0Status}</span>
                  <p style={{ margin: '10px 0 0', fontSize: '0.84rem', color: 'var(--dark-ink-secondary)' }}>
                    P99 latency nominal, 0 crash loops across 120s observe window.
                  </p>
                </div>

                <div
                  className={`ring-cell ${
                    ringMode === 'ring1-isolated-rollback'
                      ? 'ring-cell-fail'
                      : ringMode === 'complete'
                        ? 'ring-cell-ok'
                        : ''
                  }`}
                >
                  <div style={{ fontSize: '0.78rem', color: 'var(--dark-ink-muted)', marginBottom: '6px' }}>
                    Ring 1 · Regional Wave
                  </div>
                  <p className="mono" style={{ margin: '0 0 10px', color: 'var(--dark-ink)', fontSize: '0.88rem' }}>
                    {activeScenario.targets[1]?.cluster}
                  </p>
                  <span
                    className={`badge ${
                      ringMode === 'ring1-isolated-rollback'
                        ? 'badge-dark-deny'
                        : ringMode === 'complete'
                          ? 'badge-dark-ok'
                          : 'badge-dark-warn'
                    }`}
                  >
                    {ring1Status}
                  </span>
                  <p style={{ margin: '10px 0 0', fontSize: '0.84rem', color: 'var(--dark-ink-secondary)' }}>
                    {ringMode === 'ring1-isolated-rollback'
                      ? '5xx spike detected at +28s. ConfigHub reverted ONLY this cluster to its prior signed OCI digest; Ring 0 remains patched.'
                      : 'Queued behind Ring 0 automated metric gate before rollout.'}
                  </p>
                </div>

                <div className={`ring-cell ${ringMode === 'complete' ? 'ring-cell-ok' : ''}`}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--dark-ink-muted)', marginBottom: '6px' }}>
                    Ring 2 · Remaining Targets
                  </div>
                  <p className="mono" style={{ margin: '0 0 10px', color: 'var(--dark-ink)', fontSize: '0.88rem' }}>
                    {activeScenario.targets[2]?.cluster} (+{Math.max(activeScenario.affectedClusters - 3, 1)} clusters)
                  </p>
                  <span className={`badge ${ringMode === 'complete' ? 'badge-dark-ok' : 'badge-dark-warn'}`}>
                    {ring2Status}
                  </span>
                  <p style={{ margin: '10px 0 0', fontSize: '0.84rem', color: 'var(--dark-ink-secondary)' }}>
                    {ringMode === 'ring1-isolated-rollback'
                      ? 'Automatic circuit breaker stopped promotion before broader fleet impact.'
                      : 'Remaining exposed targets patched with zero unexposed cluster churn.'}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '18px' }}>
                <button type="button" className="btn btn-primary btn-sm" onClick={() => selectStage(3)}>
                  Inspect Immutable Audit Receipt
                </button>
              </div>
            </div>
          ) : (
            <div className="workbench-split">
              <div>
                <pre className="code-block-dark" style={{ marginBottom: 0 }}>
                  <code>
                    {[
                      `{`,
                      `  "advisory": "${activeScenario.cveCode}",`,
                      `  "proposing_actor": "${activeScenario.agentIdentity}",`,
                      `  "approval": "${activeScenario.approver}",`,
                      `  "workloads_patched": ${activeScenario.affectedWorkloads},`,
                      `  "unexposed_clusters_skipped": ${activeScenario.skippedClusters},`,
                      `  "oci_release": "${activeScenario.receiptDigest}",`,
                      `  "reconciler": "${activeScenario.deliveryTool}",`,
                      `  "elapsed": "${activeScenario.elapsedTime}",`,
                      `  "break_glass_used": false`,
                      `}`,
                    ].join('\n')}
                  </code>
                </pre>
              </div>

              <div className="metric-well">
                <div className="mono" style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--ok-dark)', marginBottom: '10px' }}>
                  {activeScenario.elapsedTime}
                </div>
                <p style={{ margin: '0 0 16px', fontSize: '0.88rem', color: 'var(--dark-ink-secondary)', lineHeight: 1.55 }}>
                  Exportable directly for SOX, SOC 2, DORA, FINRA, and EU AI Act evidence requests. Every rendered
                  value, agent mutation, and human signature lives in one deterministic record.
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
