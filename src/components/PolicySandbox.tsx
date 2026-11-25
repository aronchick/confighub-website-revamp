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
    }, 140);

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
    <div className="product-mat" aria-label="Deterministic agent policy inspector">
      <div className="app-window">
        <div className="app-header">
          <div className="app-title">
            <strong>Policy Lock Evaluator</strong>
          </div>
          <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
            100% deterministic · zero LLM egress
          </span>
        </div>

        <div className="policy-cases" role="tablist" aria-label="Agent action test cases">
          {POLICY_SANDBOX_CASES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === selectedId}
              className={`policy-case-btn ${item.id === selectedId ? 'active' : ''}`}
              onClick={() => handleSelect(item.id)}
            >
              <div>
                <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginBottom: '3px' }}>
                  {item.actor}
                </div>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--ink)', fontWeight: 500 }}>
                  {item.actionTitle}
                </strong>
              </div>
              <span className={`tag ${item.tone === 'deny' ? 'tag-deny' : item.tone === 'ok' ? 'tag-ok' : ''}`}>
                <span className="tag-dot" aria-hidden="true" />
                {item.verdict}
              </span>
            </button>
          ))}
        </div>

        <div className="policy-result">
          {loading ? (
            <div className="skeleton-stack" aria-busy="true" aria-label="Evaluating policy rules">
              <div className="skeleton-bar" style={{ width: '60%' }} />
              <div className="skeleton-bar" style={{ width: '95%', height: '36px' }} />
              <div className="skeleton-bar" style={{ width: '80%' }} />
            </div>
          ) : (
            <div>
              <div className="query-bar" style={{ marginBottom: '14px' }}>
                <span>
                  <span className="query-label">Proposal</span>
                  {activeCase.command}
                </span>
              </div>

              <p style={{ margin: '0 0 14px', fontSize: '0.94rem', color: 'var(--ink)', lineHeight: 1.55 }}>
                {activeCase.summary}
              </p>

              <div className={`callout callout-${activeCase.tone} mono`} style={{ fontSize: '0.75rem' }}>
                {activeCase.auditEntry}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
