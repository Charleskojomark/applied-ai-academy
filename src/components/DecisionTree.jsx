'use client';

import React, { useState } from 'react';

const SCENARIOS = {
  support: {
    title: 'Customer Support Chat (Speed & Budget Priority)',
    nodes: [
      {
        icon: '👤',
        title: 'Step 1: Input Analysis',
        desc: 'User arrives with 15 previous ticket messages and a 3-page problem description.',
        action: 'Observable: History is unbounded',
      },
      {
        icon: '✂️',
        title: 'Step 2: Selective Context Assembly',
        desc: 'Apply FIFO sliding window for latest 3 turns + 1 concise summary of ticket events (under 1,500 total input tokens).',
        action: 'Enforce: Input budget ≤ 2,000 tokens',
      },
      {
        icon: '⚡',
        title: 'Step 3: Response Streaming & Cap',
        desc: 'Enable Server-Sent Events (SSE) streaming; cap max_output_tokens at 250. UI shows first tokens in 450ms.',
        action: 'Result: p95 latency < 1.0 s guaranteed',
        highlight: true,
      },
    ],
  },
  research: {
    title: 'Research Assistant (Evidence & Factuality Priority)',
    nodes: [
      {
        icon: '🔍',
        title: 'Step 1: Grounded Evidence Search',
        desc: 'User asks a technical query requiring cited claims against private documentation.',
        action: 'Constraint: Output MUST cite verified sources',
      },
      {
        icon: '⚖️',
        title: 'Step 2: Evidence Guard Check',
        desc: 'Retrieval runs vector + keyword search. Check relevance scores of top passages.',
        action: 'Condition: If similarity score < 0.72 (Zero Evidence)',
      },
      {
        icon: '🛑',
        title: 'Step 3: Early Exit — Skip Model Call!',
        desc: 'Do NOT call the model. Return an immediate "Evidence Not Found" fallback state to the user in 35ms.',
        action: 'Result: $0 spent, 0ms model wait, ZERO hallucination risk',
        highlight: true,
      },
    ],
  },
};

export default function DecisionTree() {
  const [activeScenario, setActiveScenario] = useState('support');
  const current = SCENARIOS[activeScenario];

  return (
    <div className="decision-tree-viz" id="decisionTreeContainer">
      <div className="cost-explorer-header">
        <div className="cost-explorer-title">
          <span>🌳</span>
          <span>Production Architecture Decision Tree</span>
        </div>
      </div>

      <div className="tree-scenario-tabs">
        <button
          className={`tree-scenario-tab ${activeScenario === 'support' ? 'active' : ''}`}
          onClick={() => setActiveScenario('support')}
        >
          💬 Support Chat ($ &lt;1s p95)
        </button>
        <button
          className={`tree-scenario-tab ${activeScenario === 'research' ? 'active' : ''}`}
          onClick={() => setActiveScenario('research')}
        >
          🔬 Research Assistant (Cited Claims)
        </button>
      </div>

      <div className="tree-flow-steps">
        {current.nodes.map((n, i) => (
          <div key={i} className="tree-node">
            <span className="tree-node-icon">{n.icon}</span>
            <div className="tree-node-content">
              <div className="tree-node-title">{n.title}</div>
              <div className="tree-node-desc">{n.desc}</div>
              <span
                className="tree-node-action"
                style={
                  n.highlight
                    ? { background: 'rgba(16, 185, 129, 0.15)', color: '#34D399' }
                    : {}
                }
              >
                {n.action}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
