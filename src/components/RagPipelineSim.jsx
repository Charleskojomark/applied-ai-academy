'use client';

import React, { useState } from 'react';

const QUESTIONS = [
  {
    id: 'engine',
    query: 'What is the routine maintenance schedule for the Alpha-1 Engine?',
    sourceMatch: 'manuals/engine_v1.pdf',
    chunkId: 'manuals/engine_v1.pdf::chunk-00000::a9b8c7d6',
    answer: 'The Alpha-1 Engine requires routine maintenance every 500 operating hours to prevent internal wear.',
    citations: ['manuals/engine_v1.pdf::chunk-00000::a9b8c7d6'],
    valid: true,
  },
  {
    id: 'building',
    query: 'What are the visitor badge requirements and cafeteria hours in Building B?',
    sourceMatch: 'policy/building_access.pdf',
    chunkId: 'policy/building_access.pdf::chunk-00001::f4e3d2c1',
    answer: 'Visitors must register at the front desk and wear a yellow badge at all times. The cafeteria serves lunch from 11:30 AM to 2:00 PM on the second floor.',
    citations: ['policy/building_access.pdf::chunk-00001::f4e3d2c1'],
    valid: true,
  },
  {
    id: 'devops',
    query: 'How often must API keys be rotated according to company security policy?',
    sourceMatch: 'devops/deployment_guide.pdf',
    chunkId: 'devops/deployment_guide.pdf::chunk-00002::99887766',
    answer: 'According to security policy, all API keys must be rotated every 90 days.',
    citations: ['devops/deployment_guide.pdf::chunk-00002::99887766'],
    valid: true,
  },
  {
    id: 'hallucination',
    query: 'What is the Mars orbit trajectory of the Alpha-1 engine?',
    sourceMatch: 'manuals/engine_v1.pdf',
    chunkId: 'manuals/engine_v1.pdf::chunk-00000::a9b8c7d6',
    answer: 'The Alpha-1 engine has an orbital velocity of 11.2 km/s when entering Martian transit.',
    citations: ['unretrieved/mars_spec.pdf::chunk-00099'], // Hallucinated unretrieved citation!
    valid: false,
  },
];

export default function RagPipelineSim({ onInteract }) {
  const [selectedQ, setSelectedQ] = useState(QUESTIONS[0]);
  const [pipelineState, setPipelineState] = useState('idle'); // 'running' | 'completed'

  const handleRun = (q) => {
    setSelectedQ(q);
    setPipelineState('running');
    if (onInteract) onInteract();
    setTimeout(() => {
      setPipelineState('completed');
    }, 450);
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
          <span style={{ fontSize: '1.3rem' }}>⚡</span>
          <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>
            Interactive End-to-End RAG Pipeline &amp; Citation Validator
          </strong>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.12)', padding: '3px 8px', borderRadius: '4px' }}>
          gemini-2.5-flash + Chroma
        </span>
      </div>

      {/* Preset Query Buttons */}
      <div style={{ marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem' }}>
          Select Test Query to Execute RAG Pipeline:
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem' }}>
          {QUESTIONS.map((q) => {
            const isSel = selectedQ.id === q.id;
            return (
              <button
                key={q.id}
                onClick={() => handleRun(q)}
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
                {q.id === 'hallucination' ? '🚨 ' : '📄 '}
                {q.query}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pipeline Steps View */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {/* 1. Retrieve */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '0.75rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#38bdf8' }}>
              STEP 1: RETRIEVAL (retrieve(question, k=2))
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Chroma Score: 0.1420 (High Match)</span>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
            [1] chunk_id=<code>{selectedQ.chunkId}</code> | source=<code>{selectedQ.sourceMatch}</code>
          </div>
        </div>

        {/* 2. Structured Answer */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '0.75rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#c084fc' }}>
              STEP 2: GENERATION (llm.with_structured_output(RAGResponse))
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Pydantic Model Validated</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#f1f5f9', marginBottom: '0.4rem', lineHeight: '1.4' }}>
            &quot;{selectedQ.answer}&quot;
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
            Cited Chunk IDs: {JSON.stringify(selectedQ.citations)}
          </div>
        </div>

        {/* 3. Citation Grounding Validation */}
        <div style={{
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          borderLeft: `3px solid ${selectedQ.valid ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`,
          background: selectedQ.valid ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)',
          fontSize: '0.8rem',
        }}>
          {selectedQ.valid ? (
            <div>
              <strong style={{ color: 'var(--accent-emerald)' }}>✅ validate_citations() PASSED: </strong>
              <span style={{ color: 'var(--text-primary)' }}>
                All cited chunk IDs ({selectedQ.citations[0]}) strictly resolve to the retrieved evidence set. Ground truth confirmed!
              </span>
            </div>
          ) : (
            <div>
              <strong style={{ color: 'var(--accent-rose)' }}>🚨 VALIDATION FAILED (UNRETRIEVED CITATION): </strong>
              <span style={{ color: 'var(--text-primary)' }}>
                The model cited <code>{selectedQ.citations[0]}</code>, which was never retrieved from the vector database. The response was intercepted and rejected before client delivery!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
