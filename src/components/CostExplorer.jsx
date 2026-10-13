'use client';

import React, { useState } from 'react';

export default function CostExplorer({ onInteract }) {
  const [inputTokens, setInputTokens] = useState(2000);
  const [outputTokens, setOutputTokens] = useState(300);
  const [calls, setCalls] = useState(1);
  const [historyTurns, setHistoryTurns] = useState(0);

  // Computations
  const historyTokens = historyTurns * 350;
  const totalInput = inputTokens + historyTokens;
  const totalTokens = calls * (totalInput + outputTokens);
  const costIndex = (totalTokens / 1200).toFixed(1);

  const ttft = Math.round(220 + (totalInput * 0.075) + ((calls - 1) * 320));
  const totalLatencyMs = Math.round(ttft + (outputTokens * 3.2) + ((calls - 1) * 450));
  const totalLatencySec = (totalLatencyMs / 1000).toFixed(1);

  let slaClass = 'primary';
  let slaText = 'PASS (<1s p95)';
  let slaColor = 'var(--accent-emerald)';
  let slaSub = 'Within latency ceiling & budget';
  let badgeText = 'Budget Healthy';

  if (ttft > 1600 || costIndex > 8.0) {
    slaClass = 'danger';
    slaText = 'BUDGET BLOWN';
    slaColor = 'var(--accent-rose)';
    slaSub = 'Severe p95 latency & cost breach';
    badgeText = 'SLA Breached';
  } else if (ttft > 950 || costIndex > 4.0) {
    slaClass = 'warn';
    slaText = 'WARNING';
    slaColor = 'var(--accent-amber)';
    slaSub = 'TTFT > 1s or high context cost';
    badgeText = 'Budget Warning';
  }

  const maxBarTokens = 25000;
  const currentPct = Math.min(100, Math.max(5, (totalTokens / maxBarTokens) * 100));
  const amplifiedTokens = totalTokens * 2;
  const amplifiedPct = Math.min(100, Math.max(10, (amplifiedTokens / maxBarTokens) * 100));

  const handleSliderChange = (setter) => (e) => {
    setter(parseInt(e.target.value));
    if (onInteract) onInteract();
  };

  return (
    <div className="cost-explorer" id="costExplorerContainer">
      <div className="cost-explorer-header">
        <div className="cost-explorer-title">
          <span>🧮</span>
          <span>Normalized Cost & Latency Simulator</span>
        </div>
        <span
          className="cost-explorer-badge"
          style={{
            color: slaColor,
            borderColor: `${slaColor}66`,
            background: `${slaColor}22`,
          }}
        >
          {badgeText}
        </span>
      </div>

      <div className="explorer-controls-grid">
        <div className="control-card">
          <div className="control-header">
            <span className="control-label">Base Input Tokens (I)</span>
            <span className="control-value">{inputTokens.toLocaleString()}</span>
          </div>
          <input
            type="range"
            className="slider-input"
            min="500"
            max="12000"
            step="250"
            value={inputTokens}
            onChange={handleSliderChange(setInputTokens)}
          />
          <div className="control-hint">System prompt, tool specs, user question</div>
        </div>

        <div className="control-card">
          <div className="control-header">
            <span className="control-label">Output Tokens (O)</span>
            <span className="control-value">{outputTokens.toLocaleString()}</span>
          </div>
          <input
            type="range"
            className="slider-input"
            min="50"
            max="2500"
            step="50"
            value={outputTokens}
            onChange={handleSliderChange(setOutputTokens)}
          />
          <div className="control-hint">Target generation length per response</div>
        </div>

        <div className="control-card">
          <div className="control-header">
            <span className="control-label">Model Calls / Step (C)</span>
            <span className="control-value">{calls}</span>
          </div>
          <input
            type="range"
            className="slider-input"
            min="1"
            max="5"
            step="1"
            value={calls}
            onChange={handleSliderChange(setCalls)}
          />
          <div className="control-hint">1 = Single pass, 2-5 = Multi-step orchestration</div>
        </div>

        <div className="control-card">
          <div className="control-header">
            <span className="control-label">Chat History Turns</span>
            <span className="control-value">
              {historyTurns} turns (+{historyTokens.toLocaleString()} tok)
            </span>
          </div>
          <input
            type="range"
            className="slider-input"
            min="0"
            max="15"
            step="1"
            value={historyTurns}
            onChange={handleSliderChange(setHistoryTurns)}
          />
          <div className="control-hint">Unbounded chat memory accumulation</div>
        </div>
      </div>

      <div className="explorer-metrics-row">
        <div className="metric-box primary">
          <div>
            <div className="metric-title">Total Interaction Tokens (T)</div>
            <div className="metric-num">{totalTokens.toLocaleString()}</div>
          </div>
          <div className="metric-sub">
            {calls} call{calls > 1 ? 's' : ''} × ({totalInput.toLocaleString()} in + {outputTokens.toLocaleString()} out)
          </div>
        </div>

        <div className="metric-box cost">
          <div>
            <div className="metric-title">Relative Spend Multiplier</div>
            <div className="metric-num">{costIndex}×</div>
          </div>
          <div className="metric-sub">vs. 1.0× baseline (1,200 tok)</div>
        </div>

        <div className="metric-box speed">
          <div>
            <div className="metric-title">Estimated TTFT / Total Latency</div>
            <div className="metric-num">{ttft}ms / {totalLatencySec}s</div>
          </div>
          <div className="metric-sub">TTFT / Full generation</div>
        </div>

        <div className={`metric-box sla ${slaClass}`}>
          <div>
            <div className="metric-title">SLA Budget Status</div>
            <div className="metric-num" style={{ color: slaColor }}>{slaText}</div>
          </div>
          <div className="metric-sub">{slaSub}</div>
        </div>
      </div>

      <div className="explorer-visual-bars">
        <div className="visual-bar-item">
          <div className="visual-bar-header">
            <span>Single-Interaction Context Size</span>
            <span>{totalTokens.toLocaleString()} tokens ({costIndex}×)</span>
          </div>
          <div className="visual-bar-track">
            <div
              className="visual-bar-fill"
              style={{
                width: `${currentPct}%`,
                background: 'var(--gradient-primary)',
              }}
            ></div>
          </div>
        </div>

        <div className="visual-bar-item">
          <div className="visual-bar-header">
            <span>Amplified Load (Concurrent Burst Scale)</span>
            <span>{amplifiedTokens.toLocaleString()} tokens ({(costIndex * 2).toFixed(1)}×)</span>
          </div>
          <div className="visual-bar-track">
            <div
              className="visual-bar-fill"
              style={{
                width: `${amplifiedPct}%`,
                background: 'var(--gradient-warm)',
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="formula-callout">
        <span>📐 Rule:</span>
        <code>T = C × (I + O)</code>
        <span>|</span>
        <code>Latency = TTFT + (O × decode_rate)</code>
      </div>
    </div>
  );
}
