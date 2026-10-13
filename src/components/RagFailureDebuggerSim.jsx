'use client';

import React, { useState } from 'react';

const FAILURES = [
  {
    id: 'stale',
    title: '1. Stale Fact / Outdated Policy Answer',
    symptom: 'Model claims policy was updated in 2024, but documentation was revised last week.',
    stage: 'Ingest / Index Stage',
    hypothesis: 'Stale index: last_ingested_at predates source updated_at',
    artifact: 'Index Ingest Timestamp: 2024-03-15T08:00:00Z | Source Updated: 2026-04-01T10:00:00Z',
    fix: 'Trigger automated re-ingestion job with idempotent upserts keyed by stable doc_id.',
    color: 'var(--accent-amber)',
  },
  {
    id: 'chunking',
    title: '2. Bad Chunking (Missing Critical Clause)',
    symptom: 'Retrieved chunk mentions temperature limits, but cuts off the exact Celsius threshold.',
    stage: 'Retrieve / Chunking Stage',
    hypothesis: 'Chunk boundary sliced the sentence mid-clause between chunk-01 and chunk-02.',
    artifact: 'Chunk 1 ends with: "...operating above" | Chunk 2 starts with: "95 degrees triggers shutdown."',
    fix: 'Re-split using MarkdownHeaderTextSplitter + RecursiveCharacterTextSplitter with 50-token overlap.',
    color: 'var(--accent-rose)',
  },
  {
    id: 'retrieval_miss',
    title: '3. Retrieval Miss (Underspecified Query)',
    symptom: 'Query "error code" returns unrelated general guidelines instead of error handbook.',
    stage: 'Retrieve Stage',
    hypothesis: 'Vector search blurred short query without product context or filters.',
    artifact: 'Top-k Chroma distance: 0.89 (Irrelevant low match) | Zero results with exact error string.',
    fix: 'Expand query with request metadata (product area, version) and add hybrid lexical search.',
    color: 'var(--accent-cyan)',
  },
  {
    id: 'citation_mismatch',
    title: '4. Citation Grounding Mismatch',
    symptom: 'Model generated plausible answer but cited chunk_id not present in prompt context.',
    stage: 'Generate / Parse Stage',
    hypothesis: 'Model hallucinated citation marker or scraped internal training memory.',
    artifact: 'Retrieved IDs: [chunk-001, chunk-002] | Model Cited: [chunk-999_fake]',
    fix: 'Enforce fail-closed validate_citations() guard; reject response and alert telemetry.',
    color: 'var(--accent-purple)',
  },
];

export default function RagFailureDebuggerSim({ onInteract }) {
  const [selectedFailure, setSelectedFailure] = useState(FAILURES[0]);
  const [stepActive, setStepActive] = useState('triage');

  const handleSelect = (f) => {
    setSelectedFailure(f);
    setStepActive('triage');
    if (onInteract) onInteract();
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🩺</span>
          <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>
            Interactive RAG Pipeline Triage &amp; Root-Cause Debugger
          </strong>
        </div>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          Rule: Debug in pipeline order, not by tweaking prompts!
        </span>
      </div>

      {/* Failure Scenario Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
        {FAILURES.map((f) => {
          const isSel = selectedFailure.id === f.id;
          return (
            <button
              key={f.id}
              onClick={() => handleSelect(f)}
              style={{
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: isSel ? f.color : 'var(--border-subtle)',
                background: isSel ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.2)',
                color: isSel ? '#fff' : 'var(--text-secondary)',
                fontSize: '0.76rem',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '2px', color: isSel ? f.color : 'var(--text-muted)' }}>
                {f.title}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                {f.symptom.slice(0, 45)}...
              </div>
            </button>
          );
        })}
      </div>

      {/* Triage Detail Card */}
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: selectedFailure.color }}>
            Target Pipeline Stage: {selectedFailure.stage}
          </span>
          <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
            Sequential Debugging Step
          </span>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
          <strong>Observable Symptom: </strong> {selectedFailure.symptom}
        </p>

        <div style={{
          background: '#090d16',
          borderRadius: '6px',
          padding: '0.65rem',
          fontFamily: 'monospace',
          fontSize: '0.74rem',
          color: '#93c5fd',
          marginBottom: '0.75rem',
        }}>
          <div style={{ color: 'var(--text-muted)', marginBottom: '2px' }}>INSPECTED TRACE EVIDENCE:</div>
          {selectedFailure.artifact}
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--accent-emerald)' }}>Production Fix: </strong> {selectedFailure.fix}
        </div>
      </div>

      {/* Pipeline Order Sequence Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.72rem',
        color: 'var(--text-muted)',
        background: 'rgba(0,0,0,0.25)',
        padding: '0.5rem 0.75rem',
        borderRadius: '6px',
        flexWrap: 'wrap',
        gap: '0.3rem',
      }}>
        <span>1️⃣ Ingest / Index</span>
        <span>→</span>
        <span>2️⃣ Retrieve</span>
        <span>→</span>
        <span>3️⃣ Context Assembly</span>
        <span>→</span>
        <span>4️⃣ Generate / Validate</span>
      </div>
    </div>
  );
}
