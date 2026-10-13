'use client';

import React, { useState } from 'react';

const ATTENTION_DATA = {
  sentence: ['The', 'model', 'attended', 'to', 'relevant', 'context'],
  weights: [
    [0.4, 0.3, 0.1, 0.05, 0.1, 0.05],
    [0.1, 0.5, 0.2, 0.05, 0.1, 0.05],
    [0.05, 0.2, 0.35, 0.1, 0.15, 0.15],
    [0.05, 0.05, 0.15, 0.45, 0.15, 0.15],
    [0.05, 0.1, 0.1, 0.05, 0.5, 0.2],
    [0.05, 0.15, 0.25, 0.05, 0.3, 0.2],
  ],
};

export default function AttentionViz() {
  const [selectedIdx, setSelectedIdx] = useState(ATTENTION_DATA.sentence.length - 1);
  const currentWeights = ATTENTION_DATA.weights[selectedIdx] || [];

  return (
    <div className="attention-viz">
      <div className="attention-tokens">
        {ATTENTION_DATA.sentence.map((word, i) => (
          <div
            key={i}
            className={`attention-token ${i === selectedIdx ? 'active' : ''}`}
            onClick={() => setSelectedIdx(i)}
          >
            {word}
          </div>
        ))}
      </div>

      <div className="attention-weights">
        {ATTENTION_DATA.sentence.map((word, i) => {
          const weight = currentWeights[i] || 0;
          const height = Math.round(weight * 80);
          const isSelected = i === selectedIdx;

          return (
            <div key={i} className="attention-weight-bar">
              <div className="attention-bar">
                <div
                  className="attention-bar-fill"
                  style={{
                    height: `${height}px`,
                    background: isSelected ? 'var(--gradient-success)' : 'var(--gradient-primary)',
                  }}
                ></div>
              </div>
              <span className="attention-bar-label">{word}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
