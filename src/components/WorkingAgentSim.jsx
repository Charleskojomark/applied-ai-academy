'use client';

import React, { useState } from 'react';

const AGENT_QUERIES = [
  {
    id: 'langgraph',
    title: 'LangGraph Architecture',
    query: 'How does LangGraph help build LLM applications?',
    toolCalled: 'retrieve(query="LangGraph build LLM applications", k=5)',
    retrievedDocs: [
      { id: 'doc_103', source: 'LangGraph Orchestration Guide', snippet: 'LangGraph enables stateful multi-actor applications built with LLMs by modeling workflows as graphs.' }
    ],
    finalAnswer: 'LangGraph helps build LLM applications by modeling workflows as stateful, multi-actor graphs. This allows developers to create cyclical, multi-step agent systems with explicit node transitions and built-in state persistence (citing doc_103).',
    isGrounded: true,
  },
  {
    id: 'transformers',
    title: 'Transformer Attention',
    query: 'How do transformers weigh token importance?',
    toolCalled: 'retrieve(query="transformer token importance self-attention", k=5)',
    retrievedDocs: [
      { id: 'doc_102', source: 'Attention Is All You Need Paper', snippet: 'Transformer architectures rely on self-attention mechanisms to dynamically weigh token importance.' }
    ],
    finalAnswer: 'Transformer architectures dynamically determine token importance using self-attention mechanisms, allowing each token to attend to relevant context across the entire input sequence (citing doc_102).',
    isGrounded: true,
  },
  {
    id: 'out_of_scope',
    title: 'Out-of-Scope Query',
    query: 'How do I bake artisan sourdough bread at home?',
    toolCalled: 'retrieve(query="artisan sourdough bread recipe", k=5)',
    retrievedDocs: [],
    finalAnswer: 'The available internal knowledge base does not contain sufficient information regarding sourdough baking recipes or techniques.',
    isGrounded: true,
  },
];

export default function WorkingAgentSim({ onInteract }) {
  const [selectedQ, setSelectedQ] = useState(AGENT_QUERIES[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [stepView, setStepView] = useState('complete');

  const handleSelect = (q) => {
    setSelectedQ(q);
    setIsRunning(true);
    if (onInteract) onInteract();
    setTimeout(() => {
      setIsRunning(false);
    }, 350);
  };

  return (
    <div id="working-agent-sim" style={{
      background: 'rgba(15, 23, 42, 0.65)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '12px',
      padding: '1.25rem',
      marginTop: '1.25rem',
      marginBottom: '1.25rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🤖</span>
          <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>
            Interactive Working Research Assistant Agent Simulator
          </strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.74rem', background: 'rgba(0,0,0,0.3)', padding: '3px 8px', borderRadius: '4px' }}>
          <span style={{ color: 'var(--text-muted)' }}>Config:</span>
          <code style={{ color: 'var(--accent-cyan)' }}>recursion_limit=4</code>
        </div>
      </div>

      {/* Query Selector Buttons */}
      <div style={{ marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem' }}>
          Select Question to Run Through ReAct Agent Loop:
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem' }}>
          {AGENT_QUERIES.map((q) => {
            const isSel = selectedQ.id === q.id;
            return (
              <button
                key={q.id}
                onClick={() => handleSelect(q)}
                style={{
                  padding: '7px 10px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: isSel ? 'var(--accent-purple)' : 'var(--border-subtle)',
                  background: isSel ? 'rgba(139, 92, 246, 0.15)' : 'rgba(0,0,0,0.2)',
                  color: isSel ? '#d8b4fe' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.76rem',
                  textAlign: 'left',
                }}
              >
                {q.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Execution Trace (Messages Array) */}
      <div style={{
        background: '#090d16',
        borderRadius: '8px',
        border: '1px solid var(--border-subtle)',
        padding: '0.85rem',
        fontFamily: 'monospace',
        fontSize: '0.74rem',
        marginBottom: '0.75rem',
      }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.3rem' }}>
          AGENT MESSAGE TRACE (result[&quot;messages&quot;]):
        </div>

        {/* Message 1: User */}
        <div style={{ marginBottom: '6px', color: '#93c5fd' }}>
          [role: &quot;user&quot;] {selectedQ.query}
        </div>

        {/* Message 2: Tool Call */}
        <div style={{ marginBottom: '6px', color: '#c084fc', paddingLeft: '0.75rem' }}>
          [role: &quot;assistant&quot; / tool_call] ⚡ {selectedQ.toolCalled}
        </div>

        {/* Message 3: Tool Result */}
        <div style={{ marginBottom: '6px', color: '#86efac', paddingLeft: '0.75rem' }}>
          [role: &quot;tool&quot;] {selectedQ.retrievedDocs.length > 0 ? (
            `Retrieved ${selectedQ.retrievedDocs[0].id} ("${selectedQ.retrievedDocs[0].snippet}")`
          ) : (
            `No documents matching query found in internal_docs index.`
          )}
        </div>

        {/* Message 4: Final Assistant Answer */}
        <div style={{ color: '#f1f5f9', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '6px', marginTop: '6px' }}>
          [role: &quot;assistant&quot; / final] {selectedQ.finalAnswer}
        </div>
      </div>

      {/* Grounding Safety Verdict */}
      <div style={{
        padding: '0.65rem 1rem',
        borderRadius: '6px',
        borderLeft: '3px solid var(--accent-emerald)',
        background: 'rgba(16, 185, 129, 0.08)',
        fontSize: '0.78rem',
      }}>
        <strong style={{ color: 'var(--accent-emerald)' }}>✅ Grounding &amp; Citation Integrity Confirmed: </strong>
        <span style={{ color: 'var(--text-primary)' }}>
          {selectedQ.retrievedDocs.length > 0
            ? 'The final answer strictly cited ' + selectedQ.retrievedDocs[0].id + ' without fabricating document IDs or hallucinating outside context.'
            : 'The agent safely refused the out-of-scope question without fabricating facts or false knowledge base references.'}
        </span>
      </div>
    </div>
  );
}
