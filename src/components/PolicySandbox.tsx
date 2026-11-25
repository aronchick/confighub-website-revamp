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
            <strong>Policy Sandbox</strong> · Click an agent mutation to test deterministic locks
          </div>
          <span className="badge badge-dark-ok">Zero LLM Egress</span>
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
                <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--dark-ink)', fontWeight: 500 }}>
                  {item.actionTitle}
                </strong>
              </button>
            ))}
          </div>

          <div className="sandbox-right">
            {loading ? (
              <div className="skeleton-stack" aria-busy="true" aria-label="Evaluating policy rules">
                <div className="skeleton-dark" style={{ width: '55%' }} />
                <div className="skeleton-dark" style={{ width: '95%', height: '38px' }} />
                <div className="skeleton-dark" style={{ width: '82%' }} />
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '12px' }}>
                  <span className={`badge badge-dark-${activeCase.tone}`}>{activeCase.verdict}</span>
                </div>

                <div className="cmd-line" style={{ marginBottom: '14px' }}>
                  <span>
                    <span className="cmd-prompt">$</span>
                    {activeCase.command}
                  </span>
                </div>

                <p style={{ margin: '0 0 16px', fontSize: '0.94rem', color: 'var(--dark-ink)', lineHeight: 1.55 }}>
                  {activeCase.summary}
                </p>

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
