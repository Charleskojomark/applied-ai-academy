'use client';

import React, { useState } from 'react';

const SAMPLE_DOCS = [
  {
    id: 'doc-policy',
    title: 'Policy 4.2: Remote Access & Vendor Security',
    text: 'External vendor personnel are strictly barred from establishing remote network connections using unmanaged personal devices. Only managed hardware may connect.',
    keywordScore: 0.1, // low keyword match with "contractors access VPN personal laptops"
    vectorScore: 0.89,  // high semantic match
    isTrueAnswer: true,
  },
  {
    id: 'doc-troubleshoot',
    title: 'IT Helpdesk Note: VPN Client Installation',
    text: 'VPN policy for laptop users: When troubleshooting slow VPN connectivity on company-issued laptops, restart the client application.',
    keywordScore: 0.85, // high keyword overlap ("VPN", "policy", "laptop")
    vectorScore: 0.42,  // tangential, doesn't answer contractor personal device rule
    isTrueAnswer: false,
  },
  {
    id: 'doc-cafeteria',
    title: 'Facilities: Building B Cafeteria Guidelines',
    text: 'The cafeteria on floor 2 serves lunch from 11:30 AM to 2:00 PM daily. Visitors must wear yellow badges.',
    keywordScore: 0.0,
    vectorScore: 0.08,
    isTrueAnswer: false,
  },
];

export default function VectorSimilaritySim({ onInteract }) {
  const [searchMode, setSearchMode] = useState('vector'); // 'vector' | 'keyword'
  const [threshold, setThreshold] = useState(0.5);
  const [topK, setTopK] = useState(2);
  const query = 'Can contractors access the VPN from personal laptops?';

  const rankedDocs = [...SAMPLE_DOCS].map(d => ({
    ...d,
    effectiveScore: searchMode === 'vector' ? d.vectorScore : d.keywordScore,
  })).sort((a, b) => b.effectiveScore - a.effectiveScore);

  const passedThreshold = rankedDocs.filter(d => d.effectiveScore >= threshold);
  const finalResults = passedThreshold.slice(0, topK);

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
          <span style={{ fontSize: '1.3rem' }}>🎯</span>
          <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>
            Interactive Vector Similarity vs Keyword Retrieval Simulator
          </strong>
        </div>
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '3px' }}>
          <button
            onClick={() => { setSearchMode('vector'); if (onInteract) onInteract(); }}
            style={{
              padding: '5px 12px',
              fontSize: '0.78rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: searchMode === 'vector' ? 'var(--accent-blue)' : 'transparent',
              color: searchMode === 'vector' ? '#fff' : 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            Vector (Semantic) Search
          </button>
          <button
            onClick={() => { setSearchMode('keyword'); if (onInteract) onInteract(); }}
            style={{
              padding: '5px 12px',
              fontSize: '0.78rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: searchMode === 'keyword' ? 'var(--accent-amber)' : 'transparent',
              color: searchMode === 'keyword' ? '#000' : 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            Keyword (String Overlap)
          </button>
        </div>
      </div>

      {/* Query Banner */}
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '8px',
        padding: '0.75rem',
        marginBottom: '1rem',
        fontSize: '0.82rem',
      }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '2px' }}>
          INPUT QUERY
        </span>
        <code style={{ color: '#93c5fd', fontSize: '0.85rem' }}>&quot;{query}&quot;</code>
      </div>

      {/* Threshold and Top K Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Similarity Threshold Cutoff:</span>
            <strong style={{ color: 'var(--accent-cyan)' }}>{threshold.toFixed(2)}</strong>
          </div>
          <input
            type="range"
            min={0.0}
            max={1.0}
            step={0.05}
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
          />
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block', marginTop: '2px' }}>
            Chunks scoring below cutoff are blocked from prompt context.
          </span>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Top-k Candidates Allowed:</span>
            <strong style={{ color: 'var(--accent-purple)' }}>k = {topK}</strong>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={1}
            value={topK}
            onChange={(e) => setTopK(parseInt(e.target.value, 10))}
            style={{ width: '100%', accentColor: 'var(--accent-purple)' }}
          />
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block', marginTop: '2px' }}>
            Limits max evidence passages passed downstream.
          </span>
        </div>
      </div>

      {/* Results List */}
      <div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
          Candidate Retrieval Results (Ranked by {searchMode === 'vector' ? 'Cosine Score' : 'Lexical Overlap'}):
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {rankedDocs.map((doc, idx) => {
            const isAccepted = finalResults.some(r => r.id === doc.id);
            const isBlockedByThreshold = doc.effectiveScore < threshold;
            const isBlockedByK = !isBlockedByThreshold && !isAccepted;

            return (
              <div
                key={doc.id}
                style={{
                  background: isAccepted ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.2)',
                  border: '1px solid',
                  borderColor: isAccepted
                    ? (doc.isTrueAnswer ? 'var(--accent-emerald)' : 'var(--accent-amber)')
                    : 'var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  opacity: isAccepted ? 1 : 0.45,
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e2e8f0' }}>
                      #{idx + 1} {doc.title}
                    </span>
                    {doc.isTrueAnswer && (
                      <span style={{ fontSize: '0.68rem', background: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7', padding: '1px 6px', borderRadius: '4px' }}>
                        Ground Truth Match
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      fontSize: '0.78rem',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      color: searchMode === 'vector' ? '#93c5fd' : '#fde68a',
                    }}>
                      Score: {doc.effectiveScore.toFixed(2)}
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: isAccepted ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                      color: isAccepted ? '#86efac' : '#fda4af',
                    }}>
                      {isAccepted ? 'PASS TO CONTEXT' : isBlockedByThreshold ? 'BLOCKED (< Threshold)' : 'EXCLUDED (> k)'}
                    </span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  {doc.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analysis Banner */}
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        borderLeft: `3px solid ${searchMode === 'vector' ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`,
        background: searchMode === 'vector' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)',
        fontSize: '0.8rem',
      }}>
        {searchMode === 'vector' ? (
          <div>
            <strong style={{ color: 'var(--accent-emerald)' }}>✅ Vector Retrieval Success: </strong>
            <span style={{ color: 'var(--text-primary)' }}>
              Embeddings accurately mapped &quot;contractors&quot; and &quot;personal laptops&quot; to &quot;vendor personnel&quot; and &quot;unmanaged personal devices&quot; (Cosine: 0.89), capturing intent despite near-zero lexical overlap!
            </span>
          </div>
        ) : (
          <div>
            <strong style={{ color: 'var(--accent-rose)' }}>❌ Keyword Retrieval Failure: </strong>
            <span style={{ color: 'var(--text-primary)' }}>
              String matching prioritized the tangential helpdesk note (0.85) simply because it shared the words &quot;VPN&quot; and &quot;laptop&quot;, burying the actual security policy answer!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
