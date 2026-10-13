'use client';

import React, { useState } from 'react';

const ENGINES = {
  faiss: {
    name: 'FAISS (Facebook AI Similarity Search)',
    category: 'Local In-Memory Library',
    persistence: 'Optional files (Manual serialize/deserialize)',
    filtering: 'Manual post-filtering in application code',
    scale: 'Millions to Billions (GPU accelerated)',
    ops: 'Higher (App owns index lifecycle & metadata join)',
    restartResult: 'Index disappears unless app reloads from disk file. Metadata array must be re-joined manually.',
    color: 'var(--accent-amber)',
    idealFor: 'High-speed offline batch search, single-node dense vector math.',
  },
  chroma: {
    name: 'Chroma DB',
    category: 'Local-First Embedded Vector Database',
    persistence: 'Built-in automatic disk persistence (./chroma_store)',
    filtering: 'Native pre-scoring metadata filters ($and, $eq)',
    scale: 'Thousands to Millions of chunks',
    ops: 'Lower (Embedded SQLite/DuckDB + Parquet storage)',
    restartResult: 'Survives restart completely! Metadata and embeddings reloaded from collection automatically.',
    color: 'var(--accent-emerald)',
    idealFor: 'Prototyping, single-process apps, internal tools requiring persistent metadata search.',
  },
  pinecone: {
    name: 'Pinecone / Weaviate',
    category: 'Cloud Managed Vector Database',
    persistence: 'Fully managed distributed cloud storage',
    filtering: 'Native wire-level pre-scoring metadata filters with RBAC',
    scale: 'Billions with horizontal replication & 99.99% SLA',
    ops: 'Zero host maintenance; client handles API network retries',
    restartResult: 'Unaffected by local client restarts. State lives behind a resilient network boundary.',
    color: 'var(--accent-purple)',
    idealFor: 'Production multi-tenant RAG, shared team access, high-availability microservices.',
  },
};

export default function VectorDbSelectorSim({ onInteract }) {
  const [selectedDb, setSelectedDb] = useState('chroma');
  const [filterActive, setFilterActive] = useState(true);
  const [hasRestarted, setHasRestarted] = useState(false);
  const [testLog, setTestLog] = useState([]);

  const active = ENGINES[selectedDb];

  const runRestartTest = () => {
    if (onInteract) onInteract();
    setHasRestarted(true);
    setTestLog([
      `[1] Ingested 5,000 document chunks into collection 'internal_docs'`,
      `[2] Attached metadata schema: { doc_id, section, access_level: "public" }`,
      `[3] 💥 Simulating process crash / server restart...`,
      `[4] Verifying state on boot: ${active.restartResult}`,
      filterActive
        ? `[5] Executing pre-filter: { access_level: "public" } -> ${selectedDb === 'faiss' ? '⚠️ FAISS ran brute force vector search first, app had to filter results afterward!' : '✅ Native pre-scoring filter applied inside vector engine!'}`
        : `[5] Executing unrestricted vector query without filters`,
    ]);
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
          <span style={{ fontSize: '1.3rem' }}>🗄️</span>
          <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>
            Interactive Vector Database Architecture & Persistence Evaluator
          </strong>
        </div>
      </div>

      {/* Engine Switcher */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
        {Object.entries(ENGINES).map(([key, data]) => {
          const isSel = selectedDb === key;
          return (
            <button
              key={key}
              onClick={() => { setSelectedDb(key); setHasRestarted(false); setTestLog([]); }}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: isSel ? data.color : 'var(--border-subtle)',
                background: isSel ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.2)',
                color: isSel ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: '0.72rem', color: isSel ? data.color : 'var(--text-muted)' }}>
                {data.category.split(' ')[0].toUpperCase()}
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.8rem' }}>{data.name.split(' ')[0]}</div>
            </button>
          );
        })}
      </div>

      {/* Engine Spec Card */}
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '0.75rem',
        fontSize: '0.78rem',
      }}>
        <div>
          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>PERSISTENCE</span>
          <strong style={{ color: active.color }}>{active.persistence}</strong>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>METADATA FILTERS</span>
          <strong style={{ color: 'var(--text-primary)' }}>{active.filtering}</strong>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>TARGET SCALE</span>
          <strong style={{ color: 'var(--text-primary)' }}>{active.scale}</strong>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>OPERATIONAL PROFILE</span>
          <strong style={{ color: 'var(--text-secondary)' }}>{active.ops}</strong>
        </div>
      </div>

      {/* Controls & Test Execution */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={filterActive}
            onChange={(e) => setFilterActive(e.target.checked)}
            style={{ accentColor: 'var(--accent-emerald)' }}
          />
          Apply Pre-Scoring Metadata Filter: <code>access_level = &quot;public&quot;</code>
        </label>

        <button
          onClick={runRestartTest}
          style={{
            padding: '6px 14px',
            borderRadius: '6px',
            border: 'none',
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          🔄 Run Process Crash &amp; Filter Test
        </button>
      </div>

      {/* Output Log */}
      {hasRestarted && (
        <div style={{
          background: '#090d16',
          borderRadius: '8px',
          border: '1px solid var(--border-subtle)',
          padding: '0.85rem',
          fontFamily: 'monospace',
          fontSize: '0.76rem',
        }}>
          <div style={{ color: 'var(--text-muted)', marginBottom: '0.4rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.3rem' }}>
            TEST EXECUTION TRACE ({selectedDb.toUpperCase()})
          </div>
          {testLog.map((line, i) => (
            <div key={i} style={{ marginBottom: '3px', color: line.includes('⚠️') ? 'var(--accent-amber)' : line.includes('✅') ? 'var(--accent-emerald)' : 'var(--text-secondary)' }}>
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
