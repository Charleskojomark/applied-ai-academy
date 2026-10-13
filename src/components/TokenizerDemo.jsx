'use client';

import React, { useState } from 'react';

const TOKEN_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)', text: '#93C5FD' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)', text: '#C4B5FD' },
  { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.3)', text: '#6EE7B7' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)', text: '#FCD34D' },
  { bg: 'rgba(244, 63, 94, 0.15)', border: 'rgba(244, 63, 94, 0.3)', text: '#FDA4AF' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)', text: '#67E8F9' },
];

function tokenize(text) {
  if (!text.trim()) return [];
  const words = text.split(/(\s+|[.,!?;:()[\]{}'"])/).filter(Boolean);
  const tokens = [];
  words.forEach(w => {
    if (w.length > 5) {
      const mid = Math.ceil(w.length / 2);
      tokens.push(w.slice(0, mid));
      tokens.push(w.slice(mid));
    } else {
      tokens.push(w);
    }
  });
  return tokens;
}

export default function TokenizerDemo() {
  const [text, setText] = useState(
    'Applied AI engineering turns model capabilities into reliable production systems.'
  );

  const tokens = tokenize(text);
  const wordsCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const ratio = wordsCount > 0 ? (tokens.length / wordsCount).toFixed(1) : '—';

  return (
    <div className="tokenizer-demo">
      <input
        type="text"
        className="tokenizer-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type text to see tokens..."
      />

      <div className="tokenizer-output">
        {tokens.length === 0 ? (
          <span style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>
            Type something to see tokens...
          </span>
        ) : (
          tokens.map((token, i) => {
            const color = TOKEN_COLORS[i % TOKEN_COLORS.length];
            return (
              <span
                key={i}
                className="token-chip"
                style={{
                  background: color.bg,
                  borderColor: color.border,
                  color: color.text,
                }}
              >
                {token.replace(/ /g, '·')}
              </span>
            );
          })
        )}
      </div>

      <div className="tokenizer-stats">
        <span>Words: <strong>{wordsCount}</strong></span>
        <span>Tokens: <strong>{tokens.length}</strong></span>
        <span>Ratio: <strong>{ratio} tokens/word</strong></span>
      </div>
    </div>
  );
}
