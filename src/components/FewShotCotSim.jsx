'use client';

import React, { useState } from 'react';

const AMBIGUOUS_TICKET =
  "I was charged $49 yesterday for my subscription renewal, but every time I try to log into my account to view the invoice, the page just spins forever.";

const PATTERNS = {
  zero_shot: {
    name: '1. Zero-Shot Prompt',
    cost: 'Lowest (~75 tokens)',
    consistency: 'Low (Prone to drift)',
    risk: 'High formatting drift; model might output "Billing Issue" or two labels',
    tag: 'zero-shot',
    thinking: null,
    output: `Billing Issue / Bug Report\n\nThe customer mentions they were charged $49 which is a billing matter, however the spinning page is also a technical bug preventing account access.\n\nRecommended: Forward to billing team first.`,
    verdict: '⚠️ Fragile: Returned multi-paragraph unformatted prose instead of JSON contract. Parser fails JSON.parse() immediately!',
    color: 'var(--accent-rose)',
  },
  few_shot: {
    name: '2. Few-Shot Contract Prompt',
    cost: 'Medium (~280 tokens)',
    consistency: 'High (Strict Contract)',
    risk: 'Medium brittleness if definitions change',
    tag: 'few-shot',
    thinking: null,
    output: `{\n  "label": "BUG",\n  "rationale": "The application hangs indefinitely when loading the invoice page, indicating broken functionality."\n}`,
    verdict: '✅ Schema Resilient: Followed few-shot examples cleanly. Output strictly adheres to enum label and single-sentence rationale.',
    color: 'var(--accent-emerald)',
  },
  scratchpad: {
    name: '3. Private Scratchpad (<thinking>)',
    cost: 'Highest (~420 tokens)',
    consistency: 'High (Internal Reasoning)',
    risk: 'Token inflation; requires parser to strip <thinking> tags',
    tag: 'scratchpad',
    thinking: `Intent Analysis:\n- Mentions $49 renewal charge (BILLING clue)\n- Mentions cannot log in to see invoice (ACCOUNT clue)\n- Mentions page spins forever with no error (BUG clue)\nEvaluating priority: The primary failure preventing resolution is the technical hang/infinite spin. Downstream billing support cannot help until the page bug is resolved.\nCandidate: BUG`,
    output: `{\n  "label": "BUG",\n  "rationale": "The customer is experiencing an unresponsive infinite loading state when accessing invoice records."\n}`,
    verdict: '🧠 Deep CoT: Evaluated all 3 competing intents in private scratchpad before emitting clean JSON deliverable.',
    color: 'var(--accent-purple)',
  },
  bounded: {
    name: '4. Bounded Rationale Prompt',
    cost: 'Lower (~145 tokens)',
    consistency: 'Medium-High',
    risk: 'Low rationale leak; strictly 1 sentence',
    tag: 'bounded',
    thinking: null,
    output: `{\n  "label": "BUG",\n  "rationale": "The user encounters an endless loading spinner preventing access to their account invoice page."\n}`,
    verdict: '🎯 Compact & Safe: Bound rationale to exactly 1 sentence of factual user evidence with zero internal policy leaks.',
    color: 'var(--accent-cyan)',
  },
};

export default function FewShotCotSim({ onInteract }) {
  const [selectedPattern, setSelectedPattern] = useState('few_shot');
  const [ticketInput, setTicketInput] = useState(AMBIGUOUS_TICKET);
  const [isSimulating, setIsSimulating] = useState(false);

  const active = PATTERNS[selectedPattern];

  const handleRun = (patternKey) => {
    setSelectedPattern(patternKey);
    setIsSimulating(true);
    if (onInteract) onInteract();
    setTimeout(() => {
      setIsSimulating(false);
    }, 250);
  };

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.65)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '12px',
      padding: '1.25rem',
      marginTop: '1.25rem',
      marginBottom: '1.25rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🧠</span>
          <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>
            Interactive Ticket Classifier: Few-Shot & Reasoning Scaffolds
          </strong>
        </div>
        <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.12)', padding: '3px 8px', borderRadius: '4px' }}>
          gemini-3.6-flash Simulation
        </span>
      </div>

      {/* Input Ticket */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Ambiguous Multi-Intent Support Ticket:
          </label>
          <button
            onClick={() => setTicketInput(AMBIGUOUS_TICKET)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-blue)',
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            Reset to Sample Ticket
          </button>
        </div>
        <textarea
          value={ticketInput}
          onChange={(e) => setTicketInput(e.target.value)}
          rows={2}
          style={{
            width: '100%',
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
            padding: '0.6rem',
            color: 'var(--text-primary)',
            fontSize: '0.82rem',
            fontFamily: 'monospace',
          }}
        />
      </div>

      {/* Strategy Selector Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
        {Object.entries(PATTERNS).map(([key, data]) => {
          const isSelected = selectedPattern === key;
          return (
            <button
              key={key}
              onClick={() => handleRun(key)}
              style={{
                padding: '8px 10px',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: isSelected ? data.color : 'var(--border-subtle)',
                background: isSelected ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.2)',
                color: isSelected ? '#fff' : 'var(--text-secondary)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ color: isSelected ? data.color : 'var(--text-muted)', fontSize: '0.72rem', marginBottom: '2px' }}>
                {data.tag.toUpperCase()}
              </div>
              <div>{data.name.split('. ')[1]}</div>
            </button>
          );
        })}
      </div>

      {/* Metrics Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '0.75rem',
        background: 'rgba(0,0,0,0.35)',
        padding: '0.75rem',
        borderRadius: '8px',
        marginBottom: '1rem',
        fontSize: '0.8rem',
      }}>
        <div>
          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>TOKEN COST</span>
          <strong style={{ color: 'var(--text-primary)' }}>{active.cost}</strong>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>OUTPUT CONSISTENCY</span>
          <strong style={{ color: active.color }}>{active.consistency}</strong>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>FAILURE RISK</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{active.risk}</span>
        </div>
      </div>

      {/* Output Display */}
      <div style={{
        background: 'rgba(0,0,0,0.5)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '0.75rem',
      }}>
        {/* Private Thinking Scratchpad if applicable */}
        {active.thinking && (
          <div style={{
            background: 'rgba(139, 92, 246, 0.1)',
            borderLeft: '3px solid var(--accent-purple)',
            padding: '0.65rem',
            borderRadius: '4px',
            marginBottom: '0.75rem',
          }}>
            <span style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
              PRIVATE REASONING SCRATCHPAD (&lt;thinking&gt; tag — stripped by backend parser):
            </span>
            <pre style={{
              fontSize: '0.76rem',
              color: '#d8b4fe',
              margin: 0,
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
            }}>
              {active.thinking}
            </pre>
          </div>
        )}

        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.3rem' }}>
          Final Parsable Deliverable:
        </span>
        <pre style={{
          fontSize: '0.8rem',
          color: active.color,
          margin: 0,
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace',
          lineHeight: '1.4',
        }}>
          {active.output}
        </pre>
      </div>

      {/* Analysis Verdict */}
      <div style={{
        padding: '0.65rem',
        borderRadius: '6px',
        background: 'rgba(255,255,255,0.03)',
        borderLeft: `3px solid ${active.color}`,
        fontSize: '0.8rem',
        color: 'var(--text-primary)',
      }}>
        {active.verdict}
      </div>
    </div>
  );
}
