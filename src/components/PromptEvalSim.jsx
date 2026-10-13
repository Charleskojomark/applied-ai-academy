'use client';

import React, { useState } from 'react';

const TEST_CASES = [
  {
    id: 'TC-01',
    task: "What's the weather in Tokyo?",
    type: 'Tool Call (Weather)',
    checks: {
      jsonParses: 'PASS',
      requiredKeys: 'PASS',
      extraKeysAbsent: 'PASS',
      syllableCount: 'SKIPPED (N/A)',
      latency: '240ms (<5000ms)',
    },
    status: 'PASS',
    color: 'var(--accent-emerald)',
  },
  {
    id: 'TC-02',
    task: 'Solve for x: 2x + 7 = 23',
    type: 'Math / Reasoning',
    checks: {
      jsonParses: 'PASS',
      requiredKeys: 'PASS',
      extraKeysAbsent: 'FAIL',
      syllableCount: 'SKIPPED (N/A)',
      latency: '310ms (<5000ms)',
    },
    status: 'FAIL (Extra keys in answer)',
    color: 'var(--accent-amber)',
  },
  {
    id: 'TC-03',
    task: 'Write a haiku about rain at night',
    type: 'Creative Generation',
    checks: {
      jsonParses: 'SKIPPED (Free Text)',
      requiredKeys: 'SKIPPED (N/A)',
      extraKeysAbsent: 'SKIPPED (N/A)',
      syllableCount: 'PASS (5-7-5 Verified)',
      latency: '180ms (<5000ms)',
    },
    status: 'PASS',
    color: 'var(--accent-emerald)',
  },
];

const AB_METRICS = {
  v1: {
    passRate: '86%',
    avgLength: '182 tokens',
    toolValidity: '78%',
    preference: '42%',
    criticalRegressions: '2 failures',
    runsRule: '5 runs, majority pass',
    shipReady: false,
    verdict: 'BLOCKED: 2 critical regressions and only 78% tool validity violate release gates.',
  },
  v2: {
    passRate: '93%',
    avgLength: '141 tokens',
    toolValidity: '95%',
    preference: '58%',
    criticalRegressions: '0 failures',
    runsRule: '5 runs, majority pass',
    shipReady: true,
    verdict: 'READY TO SHIP: +17% tool validity, 0 critical regressions, and improved token efficiency.',
  },
};

export default function PromptEvalSim({ onInteract }) {
  const [activeTab, setActiveTab] = useState('ab_eval'); // 'matrix' | 'ab_eval'
  const [activeVersion, setActiveVersion] = useState('v2'); // 'v1' | 'v2'

  const currentMetrics = AB_METRICS[activeVersion];

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.65)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '12px',
      padding: '1.25rem',
      marginTop: '1.25rem',
      marginBottom: '1.25rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🧪</span>
          <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>
            Interactive Prompt Invariant Test Suite & A/B Eval Matrix
          </strong>
        </div>
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '3px' }}>
          <button
            onClick={() => setActiveTab('ab_eval')}
            style={{
              padding: '5px 12px',
              fontSize: '0.78rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'ab_eval' ? 'var(--accent-cyan)' : 'transparent',
              color: activeTab === 'ab_eval' ? '#000' : 'var(--text-secondary)',
            }}
          >
            A/B Eval Comparison
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            style={{
              padding: '5px 12px',
              fontSize: '0.78rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'matrix' ? 'var(--accent-purple)' : 'transparent',
              color: activeTab === 'matrix' ? '#fff' : 'var(--text-secondary)',
            }}
          >
            Property Invariant Matrix
          </button>
        </div>
      </div>

      {activeTab === 'ab_eval' ? (
        <div>
          {/* Version Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Select Prompt Version to Inspect Release Criteria:
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => { setActiveVersion('v1'); if (onInteract) onInteract(); }}
                style={{
                  padding: '4px 12px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: activeVersion === 'v1' ? 'var(--accent-rose)' : 'var(--border-subtle)',
                  background: activeVersion === 'v1' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(0,0,0,0.2)',
                  color: activeVersion === 'v1' ? '#fda4af' : 'var(--text-secondary)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                prompts/weather.v1.txt
              </button>
              <button
                onClick={() => { setActiveVersion('v2'); if (onInteract) onInteract(); }}
                style={{
                  padding: '4px 12px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: activeVersion === 'v2' ? 'var(--accent-emerald)' : 'var(--border-subtle)',
                  background: activeVersion === 'v2' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(0,0,0,0.2)',
                  color: activeVersion === 'v2' ? '#86efac' : 'var(--text-secondary)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                prompts/weather.v2.txt (Candidate)
              </button>
            </div>
          </div>

          {/* Metric Comparison Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.6rem', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.35)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>INVARIANT PASS</span>
              <strong style={{ fontSize: '1.1rem', color: activeVersion === 'v2' ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
                {currentMetrics.passRate}
              </strong>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.35)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>AVG TOKEN LENGTH</span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                {currentMetrics.avgLength}
              </strong>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.35)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>TOOL CALL VALIDITY</span>
              <strong style={{ fontSize: '1.1rem', color: activeVersion === 'v2' ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                {currentMetrics.toolValidity}
              </strong>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.35)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>CRITICAL REGRESSIONS</span>
              <strong style={{ fontSize: '1.1rem', color: currentMetrics.criticalRegressions === '0 failures' ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                {currentMetrics.criticalRegressions}
              </strong>
            </div>
          </div>

          {/* Verdict Box */}
          <div style={{
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1px solid',
            borderColor: currentMetrics.shipReady ? 'var(--accent-emerald)' : 'var(--accent-rose)',
            background: currentMetrics.shipReady ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}>
            <div>
              <span style={{ fontWeight: 700, fontSize: '0.82rem', color: currentMetrics.shipReady ? 'var(--accent-emerald)' : 'var(--accent-rose)', display: 'block' }}>
                {currentMetrics.shipReady ? '🚀 SHIP DECISION: APPROVED' : '⛔ SHIP DECISION: BLOCKED'}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-primary)' }}>
                {currentMetrics.verdict}
              </span>
            </div>
            <span style={{ fontSize: '0.72rem', background: 'rgba(0,0,0,0.4)', padding: '3px 8px', borderRadius: '4px', color: 'var(--text-muted)' }}>
              Eval Policy: {currentMetrics.runsRule}
            </span>
          </div>
        </div>
      ) : (
        /* Property Invariant Matrix */
        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            Property tests assert <strong>invariants</strong> (types, bounds, enum validity), not brittle exact string matches. Note: <em>Skipped</em> checks document scope, not failures!
          </div>

          <div className="data-table-wrap">
            <table className="data-table" style={{ fontSize: '0.76rem' }}>
              <thead>
                <tr>
                  <th>Test Case / Input</th>
                  <th>JSON Parses</th>
                  <th>Required Keys</th>
                  <th>Extra Keys Absent</th>
                  <th>Syllable Metric</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {TEST_CASES.map((tc) => (
                  <tr key={tc.id}>
                    <td>
                      <strong>{tc.id}</strong>: <code>&quot;{tc.task}&quot;</code>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{tc.type}</div>
                    </td>
                    <td>{tc.checks.jsonParses}</td>
                    <td>{tc.checks.requiredKeys}</td>
                    <td>{tc.checks.extraKeysAbsent}</td>
                    <td>{tc.checks.syllableCount}</td>
                    <td>
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: tc.status.includes('PASS') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                        color: tc.status.includes('PASS') ? '#86efac' : '#fda4af',
                        fontWeight: 600,
                      }}>
                        {tc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
