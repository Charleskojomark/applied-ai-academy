'use client';

import React, { useState } from 'react';

const STRATEGIES = {
  fifo: {
    name: '1. FIFO Drop Oldest',
    tokens: 2400,
    status: 'Within Limit (60%)',
    color: 'var(--accent-emerald)',
    pct: 60,
    blocks: [
      { type: 'dropped', label: '❌ Turns #1–#4 (Earliest chat turns, ~1,400 tokens)', tag: 'Dropped by FIFO' },
      { type: 'kept', label: '✅ Turns #5–#8 (Recent conversation context, ~1,200 tokens)', tag: 'Retained' },
      { type: 'kept', label: '✅ Turn #9 (Latest user question, ~300 tokens)', tag: 'Active Query' },
      { type: 'critical-safe', label: '🛡️ Critical Placement: System Instruction at END (~150 tokens)', tag: 'Protected (100% Salient)' },
    ],
    explanation: 'Strategy: FIFO Drop Oldest. The 4 earliest turns were dropped to satisfy context limits. The Critical System Instruction was placed at the END of context (Placement Rule), ensuring it is never cut and receives primary attention during generation.',
  },
  summary: {
    name: '2. Summarization Buffer',
    tokens: 1250,
    status: 'Optimized Memory (31%)',
    color: 'var(--accent-purple)',
    pct: 31,
    blocks: [
      { type: 'compressed', label: '📦 Compressed Summary of Turns #1–#8 (~150 tokens, was 2,600)', tag: 'Summary Memory' },
      { type: 'kept', label: '✅ Turns #9 & #10 (Verbatim recent turns, ~500 tokens)', tag: 'Active Dialogue' },
      { type: 'critical-safe', label: '🛡️ Critical Instruction pinned near prompt end (~150 tokens)', tag: 'Protected' },
    ],
    explanation: 'Strategy: Summarization Buffer. Older dialogue is distilled into a compact 150-token state representation. Saves 2,450 tokens while preserving key facts, user identity, and task state without risking instruction truncation.',
  },
  rag: {
    name: '3. Selective RAG Context',
    tokens: 950,
    status: 'Lean Context (24%)',
    color: 'var(--accent-cyan)',
    pct: 24,
    blocks: [
      { type: 'kept', label: '🔍 Retrieved Passage #1: Technical Spec Excerpt (~250 tokens)', tag: 'Top 1 Similarity' },
      { type: 'kept', label: '🔍 Retrieved Passage #2: Account Policy Details (~250 tokens)', tag: 'Top 2 Similarity' },
      { type: 'kept', label: '✅ User Query + Recent Turn (~300 tokens)', tag: 'Active Query' },
      { type: 'critical-safe', label: '🛡️ Grounding Instruction ("Answer strictly using docs above", ~150 tokens)', tag: 'Protected' },
    ],
    explanation: 'Strategy: Selective Retrieval (RAG). Instead of dumping the 40-page user manual, the system fetches only 2 targeted passages (500 tokens). TTFT drops from 3.5s to 380ms!',
  },
  naive: {
    name: '4. Naive Full Stuffing (Failure)',
    tokens: 5600,
    status: 'OVERFLOW (140% - BLOWN)',
    color: 'var(--accent-rose)',
    pct: 100,
    blocks: [
      { type: 'critical-lost', label: '⚠️ Instruction at START: "Output JSON only" (~150 tokens)', tag: 'TRUNCATED & LOST!' },
      { type: 'dropped', label: '❌ Turns #1–#5 Full Uncompressed History (~2,200 tokens)', tag: 'Truncated' },
      { type: 'dropped', label: '❌ Pasted PDF Technical Manual (~2,400 tokens)', tag: 'Truncated' },
      { type: 'kept', label: '⚠️ Recent turns (Barely fit, ~850 tokens)', tag: 'Surviving Fragment' },
    ],
    explanation: 'Strategy: Naive Full Stuffing. Total tokens (5,600) exceeds context ceiling. Provider SDK silently cut the beginning of prompt. The critical JSON instruction at the start was chopped, causing JSON parser crashes in production downstream!',
  },
};

export default function TruncationSim() {
  const [strategyKey, setStrategyKey] = useState('fifo');
  const current = STRATEGIES[strategyKey];

  return (
    <div className="truncation-sim" id="truncationSimulator">
      <div className="cost-explorer-header">
        <div className="cost-explorer-title">
          <span>✂️</span>
          <span>Context Truncation & Instruction Placement Lab</span>
        </div>
        <span
          className="cost-explorer-badge"
          style={{
            color: current.color,
            borderColor: `${current.color}66`,
            background: `${current.color}22`,
          }}
        >
          {current.status}
        </span>
      </div>

      <div className="trunc-controls">
        {Object.entries(STRATEGIES).map(([k, s]) => (
          <button
            key={k}
            className={`trunc-btn ${strategyKey === k ? 'active' : ''}`}
            onClick={() => setStrategyKey(k)}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="trunc-meter-wrap">
        <div className="trunc-meter-header">
          <span>Prompt Context Budget (Max 4,000 tokens ceiling)</span>
          <span style={{ fontWeight: 700, color: current.color }}>
            {current.tokens.toLocaleString()} / 4,000 tokens
          </span>
        </div>
        <div className="trunc-meter-track">
          <div
            className="trunc-meter-fill"
            style={{ width: `${current.pct}%`, background: current.color }}
          ></div>
          <div className="trunc-meter-limit" title="Budget Ceiling (2,000 Safe Mark)"></div>
        </div>
      </div>

      <div className="trunc-items-grid">
        {current.blocks.map((b, idx) => {
          let blockClass = 'trunc-block kept';
          if (b.type === 'dropped') blockClass = 'trunc-block dropped';
          if (b.type === 'compressed') blockClass = 'trunc-block compressed';
          if (b.type === 'critical-safe') blockClass = 'trunc-block critical-instruction safe kept';
          if (b.type === 'critical-lost') blockClass = 'trunc-block critical-instruction lost dropped';

          return (
            <div key={idx} className={blockClass}>
              <span>{b.label}</span>
              <span style={{ fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                {b.tag}
              </span>
            </div>
          );
        })}
      </div>

      <div
        className="rule-box"
        style={{ marginTop: 14 }}
        dangerouslySetInnerHTML={{ __html: current.explanation }}
      />
    </div>
  );
}
