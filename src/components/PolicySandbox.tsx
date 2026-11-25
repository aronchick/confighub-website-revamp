import { useEffect, useState } from 'react';
import { POLICY_SANDBOX_CASES, type PolicyActionId } from '../data/workbenchData';

export function PolicySandbox() {
  const [selectedId, setSelectedId] = useState<PolicyActionId>('rbac-escalate');
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

  const activeCase =
    POLICY_SANDBOX_CASES.find((item) => item.id === selectedId) ?? POLICY_SANDBOX_CASES[0];

  const handleSelect = (nextId: PolicyActionId) => {
    if (nextId === selectedId) {
      return;
    }

    setSelectedId(nextId);
    setLoading(true);
  };

  return (
    <div className="instrument-shell" aria-label="Deterministic agent policy sandbox">
      <div className="instrument-well">
        <div className="instrument-toolbar">
          <div className="toolbar-meta">
            <strong>Policy Engine Sandbox</strong> · Select a proposed agent mutation to inspect deterministic gating
          </div>
          <span className="badge badge-dark-ok">Deterministic Core · Zero LLM Egress</span>
        </div>

        <div className="sandbox-grid">
          <div className="sandbox-left" role="tablist" aria-label="Agent action test cases">
            {POLICY_SANDBOX_CASES.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={item.id === selectedId}
                className={`sandbox-case-btn ${item.id === selectedId ? 'active' : ''}`}
                onClick={() => handleSelect(item.id)}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    marginBottom: '6px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span className="mono" style={{ fontSize: '0.73rem', color: 'var(--dark-ink-muted)' }}>
                    {item.actor}
                  </span>
                  <span className={`badge badge-dark-${item.tone}`}>{item.verdict}</span>
                </div>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--dark-ink)', fontWeight: 500 }}>
                  {item.actionTitle}
                </strong>
              </button>
            ))}
          </div>

          <div className="sandbox-right">
            {loading ? (
              <div className="skeleton-stack" aria-busy="true" aria-label="Evaluating policy rules">
                <div className="skeleton-dark" style={{ width: '58%' }} />
                <div className="skeleton-dark" style={{ width: '96%', height: '42px' }} />
                <div className="skeleton-dark" style={{ width: '88%' }} />
                <div className="skeleton-dark" style={{ width: '74%' }} />
              </div>
            ) : (
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    marginBottom: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--dark-ink-secondary)' }}>
                    {activeCase.targetPath}
                  </span>
                  <span className={`badge badge-dark-${activeCase.tone}`}>{activeCase.verdict}</span>
                </div>

                <div className="cmd-line" style={{ marginBottom: '14px' }}>
                  <span>
                    <span className="cmd-prompt">$</span>
                    {activeCase.command}
                  </span>
                </div>

                <p style={{ margin: '0 0 16px', fontSize: '0.93rem', color: 'var(--dark-ink)', lineHeight: 1.58 }}>
                  {activeCase.explanation}
                </p>

                <div style={{ borderTop: '1px solid var(--dark-rule)', paddingTop: '12px', marginBottom: '14px' }}>
                  <div className="mono" style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--dark-ink-muted)' }}>
                    Policy Evaluation Trace
                  </div>
                  <ol style={{ margin: '8px 0 0', paddingLeft: '18px', color: 'var(--dark-ink-secondary)', fontSize: '0.86rem' }}>
                    {activeCase.checksRun.map((line) => (
                      <li key={line} style={{ marginBottom: '5px' }}>
                        {line}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className={`notice-dark notice-dark-${activeCase.tone} mono`} style={{ fontSize: '0.75rem' }}>
                  {activeCase.auditEntry}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
