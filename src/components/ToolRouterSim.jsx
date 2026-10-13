'use client';

import React, { useState } from 'react';

const TEST_CALLS = [
  {
    id: 'valid',
    label: '1. Valid Tool Call (Compliant)',
    toolName: 'retrieve',
    args: { query: 'LangGraph graph orchestration patterns', top_k: 3 },
    validName: true,
    validSchema: true,
    resultStatus: 'EXECUTED_SUCCESS',
    returnedDocs: [
      { doc_id: 'doc_103', text: 'LangGraph enables stateful multi-actor applications built with LLMs.' },
      { doc_id: 'doc_104', text: 'RAG architecture review: retrieval reduces hallucination.' }
    ],
  },
  {
    id: 'extra_prop',
    label: '2. Stray Key Breach (extra="forbid")',
    toolName: 'retrieve',
    args: { query: 'LangGraph patterns', top_k: 3, debug_bypass_auth: true },
    validName: true,
    validSchema: false,
    error: 'ValidationError: Additional properties are not allowed ("debug_bypass_auth" was unexpected)',
    resultStatus: 'REJECTED_SCHEMA_VIOLATION',
  },
  {
    id: 'disallowed_tool',
    label: '3. Unallowlisted Tool Attempt',
    toolName: 'execute_shell_command',
    args: { command: 'rm -rf /tmp' },
    validName: false,
    validSchema: false,
    error: 'SecurityViolation: Tool "execute_shell_command" is not in the registered allowlist ["retrieve"].',
    resultStatus: 'REJECTED_NOT_ALLOWLISTED',
  },
  {
    id: 'budget_limit',
    label: '4. Exceeded Tool Budget (Cap = 3)',
    toolName: 'retrieve',
    args: { query: 'Infinite retry query attempt 4', top_k: 5 },
    validName: true,
    validSchema: true,
    error: 'BudgetExhaustedError: Request exceeded maximum allowable tool budget (3 calls).',
    resultStatus: 'HALTED_BUDGET_REACHED',
  },
];

export default function ToolRouterSim({ onInteract }) {
  const [selectedCall, setSelectedCall] = useState(TEST_CALLS[0]);
  const [budgetRemaining, setBudgetRemaining] = useState(3);
  const [auditLog, setAuditLog] = useState(null);

  const runRouterTest = (call) => {
    setSelectedCall(call);
    if (onInteract) onInteract();

    const corrId = 'req_' + Math.random().toString(36).substring(2, 9);
    const attemptId = 'att_' + Math.random().toString(36).substring(2, 8);

    setTimeout(() => {
      if (call.id === 'budget_limit') {
        setBudgetRemaining(0);
        setAuditLog({
          correlation_id: corrId,
          tool_attempt_id: attemptId,
          status: 'HALTED_BUDGET_REACHED',
          message: 'Tool call budget exhausted. Model cannot execute further calls.',
          retryable: false,
        });
        return;
      }

      if (!call.validName) {
        setAuditLog({
          correlation_id: corrId,
          tool_attempt_id: attemptId,
          status: 'REJECTED_NOT_ALLOWLISTED',
          error_code: 'ERR_TOOL_DISALLOWED',
          message: call.error,
          retryable: false,
        });
      } else if (!call.validSchema) {
        setAuditLog({
          correlation_id: corrId,
          tool_attempt_id: attemptId,
          status: 'REJECTED_SCHEMA_VIOLATION',
          error_code: 'ERR_INVALID_ARGUMENTS',
          message: call.error,
          retryable: false,
        });
      } else {
        setBudgetRemaining(prev => Math.max(0, prev - 1));
        setAuditLog({
          correlation_id: corrId,
          tool_attempt_id: attemptId,
          status: 'EXECUTED_SUCCESS',
          latency_ms: 42,
          docs_returned: call.returnedDocs.length,
          context_preview: `BEGIN CONTEXT\\n[doc_103] "LangGraph enables stateful..."\\n[doc_104] "RAG architecture..."\\nEND CONTEXT`,
          retryable: false,
        });
      }
    }, 200);
  };

  return (
    <div id="tool-router-sim" style={{
      background: 'rgba(15, 23, 42, 0.65)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '12px',
      padding: '1.25rem',
      marginTop: '1.25rem',
      marginBottom: '1.25rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🛡️</span>
          <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>
            Interactive Tool Router &amp; Runtime Guardrail Simulator
          </strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.76rem', background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '6px' }}>
          <span style={{ color: 'var(--text-muted)' }}>Tool Budget Remaining:</span>
          <strong style={{ color: budgetRemaining > 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
            {budgetRemaining} calls
          </strong>
        </div>
      </div>

      {/* Preset Test Payloads */}
      <div style={{ marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem' }}>
          Select Model Tool Proposal to Route Through Validator:
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.5rem' }}>
          {TEST_CALLS.map((call) => {
            const isSel = selectedCall.id === call.id;
            return (
              <button
                key={call.id}
                onClick={() => runRouterTest(call)}
                style={{
                  padding: '7px 10px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: isSel ? 'var(--accent-blue)' : 'var(--border-subtle)',
                  background: isSel ? 'rgba(59, 130, 246, 0.15)' : 'rgba(0,0,0,0.2)',
                  color: isSel ? '#93c5fd' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.76rem',
                  textAlign: 'left',
                }}
              >
                {call.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Model Proposal Preview */}
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '8px',
        padding: '0.75rem',
        marginBottom: '1rem',
        fontSize: '0.76rem',
        fontFamily: 'monospace',
      }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: '0.3rem' }}>RAW MODEL TOOL CALL PROPOSAL:</div>
        <div>
          <span style={{ color: 'var(--accent-purple)' }}>tool_name:</span> &quot;{selectedCall.toolName}&quot;<br />
          <span style={{ color: 'var(--accent-cyan)' }}>arguments:</span> {JSON.stringify(selectedCall.args, null, 2)}
        </div>
      </div>

      {/* Router Validation & Audit Output */}
      {auditLog && (
        <div style={{
          background: '#090d16',
          borderRadius: '8px',
          border: '1px solid',
          borderColor: auditLog.status === 'EXECUTED_SUCCESS' ? 'var(--accent-emerald)' : 'var(--accent-rose)',
          padding: '0.85rem',
          fontFamily: 'monospace',
          fontSize: '0.76rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.3rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>ROUTER AUDIT TRACE</span>
            <span style={{
              fontWeight: 700,
              color: auditLog.status === 'EXECUTED_SUCCESS' ? 'var(--accent-emerald)' : 'var(--accent-rose)',
            }}>
              {auditLog.status}
            </span>
          </div>

          <div style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>
            correlation_id: <span style={{ color: '#93c5fd' }}>{auditLog.correlation_id}</span> | tool_attempt_id: <span style={{ color: '#c084fc' }}>{auditLog.tool_attempt_id}</span>
          </div>

          {auditLog.error_code && (
            <div style={{ color: 'var(--accent-rose)', marginBottom: '4px' }}>
              error: {auditLog.error_code} — {auditLog.message}
            </div>
          )}

          {auditLog.context_preview && (
            <div style={{ color: 'var(--accent-emerald)', marginTop: '4px' }}>
              ✅ Validated &amp; Executed! Assembled context under 2,000 char budget with deduplication.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
