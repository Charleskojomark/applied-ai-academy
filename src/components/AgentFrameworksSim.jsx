'use client';

import React, { useState } from 'react';

const FRAMEWORKS = {
  langgraph: {
    name: 'LangGraph',
    creator: 'LangChain Ecosystem',
    model: 'Stateful Directed Graph',
    control: 'Highest among frameworks (Explicit nodes & edges)',
    debugging: 'Node-based; state diffs isolated per transition',
    idealFor: 'Complex multi-step RAG, human-in-the-loop approvals, and cyclical self-correction.',
    color: 'var(--accent-purple)',
  },
  crewai: {
    name: 'CrewAI',
    creator: 'CrewAI Inc.',
    model: 'Role-Playing Multi-Agent Collaboration',
    control: 'High-level persona orchestration',
    debugging: 'Agent conversation traces & task handoffs',
    idealFor: 'Research teams, creative pipelines, and hierarchical task delegation.',
    color: 'var(--accent-amber)',
  },
  google_adk: {
    name: 'Google Agent Development Kit (ADK)',
    creator: 'Google Cloud / Vertex AI',
    model: 'Enterprise Modular Agent Toolkit',
    control: 'Enterprise standardized orchestration',
    debugging: 'Cloud Logging, Cloud Trace & Vertex AI Grounding telemetry',
    idealFor: 'Production enterprise agents requiring strict Google Cloud compliance and tool governance.',
    color: 'var(--accent-blue)',
  },
  autogen: {
    name: 'AutoGen',
    creator: 'Microsoft Research',
    model: 'Conversable Multi-Agent Architecture',
    control: 'Event-driven agent dialogue with code interpreter',
    debugging: 'Inter-agent message transcript',
    idealFor: 'Autonomous code generation, terminal execution, and multi-agent debates.',
    color: 'var(--accent-emerald)',
  },
};

const GRAPH_NODES = [
  { id: 'plan', label: '1. Plan Node', action: 'Evaluates user query and checks if retrieval budget remains.', stateUpdate: '{ "needs_retrieval": true, "step": 1 }' },
  { id: 'retrieve', label: '2. Retrieve Node', action: 'Calls retrieve() tool on Chroma vector index.', stateUpdate: '{ "docs": ["doc_103", "doc_104"], "retrieval_done": true }' },
  { id: 'draft', label: '3. Draft Node', action: 'Synthesizes grounded answer conditioned on retrieved docs.', stateUpdate: '{ "draft": "LangGraph models workflows as graphs..." }' },
  { id: 'verify', label: '4. Verify Node', action: 'Asserts all cited doc IDs exist in state.docs.', stateUpdate: '{ "verdict": "VERIFIED", "is_complete": true }' },
];

export default function AgentFrameworksSim({ onInteract }) {
  const [activeFw, setActiveFw] = useState('langgraph');
  const [currentNodeIdx, setCurrentNodeIdx] = useState(0);

  const fw = FRAMEWORKS[activeFw];
  const currentNode = GRAPH_NODES[currentNodeIdx];

  const handleNextStep = () => {
    setCurrentNodeIdx((prev) => (prev + 1) % GRAPH_NODES.length);
    if (onInteract) onInteract();
  };

  return (
    <div id="agent-frameworks-sim" style={{
      background: 'rgba(15, 23, 42, 0.65)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '12px',
      padding: '1.25rem',
      marginTop: '1.25rem',
      marginBottom: '1.25rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🕸️</span>
          <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>
            Interactive Agent Frameworks &amp; Stateful Graph Orchestrator
          </strong>
        </div>
      </div>

      {/* Framework Selector Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
        {Object.entries(FRAMEWORKS).map(([key, data]) => {
          const isSel = activeFw === key;
          return (
            <button
              key={key}
              onClick={() => { setActiveFw(key); if (onInteract) onInteract(); }}
              style={{
                padding: '8px 10px',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: isSel ? data.color : 'var(--border-subtle)',
                background: isSel ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.2)',
                color: isSel ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: '0.7rem', color: isSel ? data.color : 'var(--text-muted)' }}>
                {data.creator}
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.8rem' }}>{data.name}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Framework Profile */}
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '8px',
        padding: '0.85rem',
        marginBottom: '1rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '0.75rem',
        fontSize: '0.78rem',
      }}>
        <div>
          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>ORCHESTRATION MODEL</span>
          <strong style={{ color: fw.color }}>{fw.model}</strong>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>CONTROL &amp; OWNERSHIP</span>
          <strong style={{ color: 'var(--text-primary)' }}>{fw.control}</strong>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>DEBUGGING &amp; TRACING</span>
          <strong style={{ color: 'var(--text-primary)' }}>{fw.debugging}</strong>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>IDEAL PRODUCTION USE CASE</span>
          <span style={{ color: 'var(--text-secondary)' }}>{fw.idealFor}</span>
        </div>
      </div>

      {/* Stateful Graph Node Step-Through */}
      <div style={{
        background: '#090d16',
        borderRadius: '8px',
        border: '1px solid var(--border-subtle)',
        padding: '1rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>
            LangGraph State Transition Simulator
          </span>
          <button
            onClick={handleNextStep}
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              border: 'none',
              background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
              color: '#fff',
              fontSize: '0.76rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Step Next Node ({currentNodeIdx + 1}/4) ▶
          </button>
        </div>

        {/* Nodes Flow Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem', marginBottom: '0.75rem' }}>
          {GRAPH_NODES.map((node, i) => {
            const isActive = i === currentNodeIdx;
            const isPast = i < currentNodeIdx;
            return (
              <div
                key={node.id}
                style={{
                  padding: '6px 4px',
                  borderRadius: '6px',
                  textAlign: 'center',
                  background: isActive ? 'rgba(139, 92, 246, 0.25)' : isPast ? 'rgba(16, 185, 129, 0.15)' : 'rgba(0,0,0,0.3)',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--accent-purple)' : isPast ? 'var(--accent-emerald)' : 'var(--border-subtle)',
                  color: isActive ? '#d8b4fe' : isPast ? '#86efac' : 'var(--text-dim)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                }}
              >
                {node.label.split('. ')[1]}
              </div>
            );
          })}
        </div>

        {/* Current Node Inspection */}
        <div style={{ fontSize: '0.76rem', fontFamily: 'monospace' }}>
          <div style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>
            <strong>Active Node Execution:</strong> {currentNode.action}
          </div>
          <div style={{ color: 'var(--accent-emerald)' }}>
            <strong>Explicit State Update:</strong> {currentNode.stateUpdate}
          </div>
        </div>
      </div>
    </div>
  );
}
