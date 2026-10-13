'use client';

import React, { useState } from 'react';

export default function ChunkingHybridSim({ onInteract }) {
  const [retrievalType, setRetrievalType] = useState('hybrid'); // 'lexical' | 'vector' | 'hybrid'
  const [chunkSize, setChunkSize] = useState(250);
  const [overlap, setOverlap] = useState(50);

  const query = "Find why E4137 happens when exporting reports, and how to mitigate it";

  const candidates = [
    {
      id: 'chunk-1',
      source: 'docs/errors.md#E4137',
      doc_id: 'API-AUTH-201',
      access_level: 'public',
      text: 'Error E4137: Report Exporter Lock Failure. Occurs when export jobs fail to acquire write locks on temporary directories.',
      lexicalHit: true,
      vectorScore: 0.61,
      lexicalScore: 0.98, // Contains exact rare token E4137
    },
    {
      id: 'chunk-2',
      source: 'docs/troubleshooting.md#exports',
      doc_id: 'API-AUTH-201',
      access_level: 'public',
      text: 'Mitigation for disk timeout crashes: Increase worker thread timeouts and ensure export directories grant full read/write permissions.',
      lexicalHit: false, // Does not contain E4137
      vectorScore: 0.88, // Strong semantic match for "mitigate export issues"
      lexicalScore: 0.25,
    },
    {
      id: 'chunk-3',
      source: 'docs/reporting_overview.md',
      doc_id: 'API-AUTH-201',
      access_level: 'public',
      text: 'Executive reporting dashboards generate monthly summaries across revenue and active customer sessions.',
      lexicalHit: false,
      vectorScore: 0.35,
      lexicalScore: 0.10,
    },
  ];

  let displayCandidates = [...candidates];
  if (retrievalType === 'lexical') {
    displayCandidates.sort((a, b) => b.lexicalScore - a.lexicalScore);
  } else if (retrievalType === 'vector') {
    displayCandidates.sort((a, b) => b.vectorScore - a.vectorScore);
  } else {
    // Hybrid: blended RRF score
    displayCandidates.sort((a, b) => (b.vectorScore + b.lexicalScore) - (a.vectorScore + a.lexicalScore));
  }

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
          <span style={{ fontSize: '1.3rem' }}>🔀</span>
          <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>
            Interactive Hybrid Search &amp; Rare-Token Retaining Sandbox
          </strong>
        </div>
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '3px' }}>
          {['vector', 'lexical', 'hybrid'].map((type) => (
            <button
              key={type}
              onClick={() => { setRetrievalType(type); if (onInteract) onInteract(); }}
              style={{
                padding: '4px 10px',
                fontSize: '0.75rem',
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: retrievalType === type ? 'var(--accent-cyan)' : 'transparent',
                color: retrievalType === type ? '#000' : 'var(--text-secondary)',
                textTransform: 'capitalize',
              }}
            >
              {type === 'hybrid' ? '⚡ Hybrid (BM25 + Dense)' : type === 'lexical' ? '🔤 Lexical (BM25)' : '🧠 Vector (Dense)'}
            </button>
          ))}
        </div>
      </div>

      {/* Query Banner */}
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '8px',
        padding: '0.75rem',
        marginBottom: '1rem',
        fontSize: '0.8rem',
      }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginBottom: '2px' }}>
          TEST QUERY WITH RARE CODE TOKEN (<span style={{ color: 'var(--accent-amber)' }}>E4137</span>):
        </div>
        <div style={{ color: '#93c5fd', fontFamily: 'monospace' }}>
          &quot;{query}&quot;
        </div>
      </div>

      {/* Chunking Knobs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Chunk Size:</span>
            <strong style={{ color: 'var(--accent-cyan)' }}>{chunkSize} chars</strong>
          </div>
          <input
            type="range"
            min={100}
            max={600}
            step={50}
            value={chunkSize}
            onChange={(e) => setChunkSize(parseInt(e.target.value, 10))}
            style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Overlap Knob (Recall vs Duplicate):</span>
            <strong style={{ color: 'var(--accent-purple)' }}>{overlap} chars ({Math.round((overlap / chunkSize) * 100)}%)</strong>
          </div>
          <input
            type="range"
            min={0}
            max={150}
            step={10}
            value={overlap}
            onChange={(e) => setOverlap(parseInt(e.target.value, 10))}
            style={{ width: '100%', accentColor: 'var(--accent-purple)' }}
          />
        </div>
      </div>

      {/* Retrieved Candidates List */}
      <div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
          Top-k Ranked Candidates ({retrievalType.toUpperCase()} MODE):
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {displayCandidates.map((c, i) => (
            <div
              key={c.id}
              style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid',
                borderColor: (retrievalType === 'hybrid' || (retrievalType === 'lexical' && c.lexicalHit) || (retrievalType === 'vector' && c.vectorScore > 0.8))
                  ? 'var(--accent-emerald)'
                  : 'var(--border-subtle)',
                borderRadius: '8px',
                padding: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f1f5f9' }}>
                  Rank #{i + 1}: {c.source}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.72rem', fontFamily: 'monospace' }}>
                  <span style={{ color: '#fde68a' }}>Lexical: {c.lexicalScore.toFixed(2)}</span>
                  <span style={{ color: '#93c5fd' }}>Vector: {c.vectorScore.toFixed(2)}</span>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnostic Evaluation */}
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        borderRadius: '8px',
        borderLeft: `3px solid ${retrievalType === 'hybrid' ? 'var(--accent-emerald)' : 'var(--accent-amber)'}`,
        background: retrievalType === 'hybrid' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
        fontSize: '0.8rem',
      }}>
        {retrievalType === 'hybrid' ? (
          <div>
            <strong style={{ color: 'var(--accent-emerald)' }}>🏆 Hybrid Search Advantage: </strong>
            <span style={{ color: 'var(--text-primary)' }}>
              Both chunk #1 (containing exact error code <code>E4137</code>) AND chunk #2 (containing the paraphrase mitigation explanation) are captured at top ranks!
            </span>
          </div>
        ) : retrievalType === 'lexical' ? (
          <div>
            <strong style={{ color: 'var(--accent-amber)' }}>⚠️ Lexical Alone: </strong>
            <span style={{ color: 'var(--text-primary)' }}>
              Finds the code definition easily, but ranks the mitigation passage low because it uses different words (&quot;worker thread timeouts&quot; instead of &quot;mitigate&quot;).
            </span>
          </div>
        ) : (
          <div>
            <strong style={{ color: 'var(--accent-amber)' }}>⚠️ Dense Vector Alone: </strong>
            <span style={{ color: 'var(--text-primary)' }}>
              Finds the mitigation passage, but blurs the rare token <code>E4137</code>, risking missing the exact error definition.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
