'use client';

import React, { useState } from 'react';

export default function AgentMemorySim({ onInteract }) {
  const [activeMemoryTab, setActiveMemoryTab] = useState('loop_detection'); // 'loop_detection' | 'memory_matrix'
  const [step, setStep] = useState(1);
  const [loopDetected, setLoopDetected] = useState(false);

  const handleNextStep = () => {
    if (onInteract) onInteract();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      setLoopDetected(true);
    } else {
      setStep(1);
      setLoopDetected(false);
    }
  };

  return (
    <div id="agent-memory-sim" style={{
      background: 'rgba(15, 23, 42, 0.65)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '12px',
      padding: '1.25rem',
      marginTop: '1.25rem',
      marginBottom: '1.25rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🧠</span>
          <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>
            Interactive Reasoning, Planning &amp; Infinite Loop Detector
          </strong>
        </div>
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '3px' }}>
          <button
            onClick={() => setActiveMemoryTab('loop_detection')}
            style={{
              padding: '4px 10px',
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: activeMemoryTab === 'loop_detection' ? 'var(--accent-purple)' : 'transparent',
              color: activeMemoryTab === 'loop_detection' ? '#fff' : 'var(--text-secondary)',
            }}
          >
            Loop Detector Trace
          </button>
          <button
            onClick={() => setActiveMemoryTab('memory_matrix')}
            style={{
              padding: '4px 10px',
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: activeMemoryTab === 'memory_matrix' ? 'var(--accent-cyan)' : 'transparent',
              color: activeMemoryTab === 'memory_matrix' ? '#000' : 'var(--text-secondary)',
            }}
          >
            Short-Term vs Persisted Memory
          </button>
        </div>
      </div>

      {activeMemoryTab === 'loop_detection' ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Execution Step: <strong style={{ color: '#fff' }}>Step {step} of 3</strong>
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => {
                  if (onInteract) onInteract();
                  setStep(3);
                  setLoopDetected(true);
                }}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(244, 63, 94, 0.4)',
                  background: 'rgba(244, 63, 94, 0.15)',
                  color: '#fda4af',
                  fontWeight: 600,
                  fontSize: '0.74rem',
                  cursor: 'pointer',
                }}
              >
                ⚠️ Trigger Zero-Diff Loop
              </button>
              <button
                onClick={handleNextStep}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: loopDetected ? 'var(--accent-rose)' : 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.76rem',
                  cursor: 'pointer',
                }}
              >
                {loopDetected ? '🔄 Reset Execution' : 'Execute Step ' + (step + 1) + ' ▶'}
              </button>
            </div>
          </div>

          {/* Step Trace Visualizer */}
          <div style={{
            background: '#090d16',
            borderRadius: '8px',
            border: '1px solid',
            borderColor: loopDetected ? 'var(--accent-rose)' : 'var(--border-subtle)',
            padding: '1rem',
            fontFamily: 'monospace',
            fontSize: '0.76rem',
            marginBottom: '0.75rem',
          }}>
            <div style={{ color: '#38bdf8', marginBottom: '4px' }}>
              STEP 1: Tool Call: retrieve(query=&quot;quantum superposition&quot;)
            </div>
            <div style={{ color: 'var(--accent-emerald)', marginBottom: '8px', paddingLeft: '1rem' }}>
              ↳ State Change: facts += [&quot;Qubits exist in superposition states&quot;] | Uncited Claims: 2
            </div>

            {step >= 2 && (
              <>
                <div style={{ color: '#c084fc', marginBottom: '4px' }}>
                  STEP 2: Tool Call: retrieve(query=&quot;quantum superposition parallel processing&quot;)
                </div>
                <div style={{ color: 'var(--accent-emerald)', marginBottom: '8px', paddingLeft: '1rem' }}>
                  ↳ State Change: facts += [&quot;Enables parallel processing capabilities&quot;] | Uncited Claims: 1
                </div>
              </>
            )}

            {step >= 3 && (
              <>
                <div style={{ color: '#fb7185', marginBottom: '4px' }}>
                  STEP 3: Repeated Tool Call: retrieve(query=&quot;quantum superposition parallel processing&quot;)
                </div>
                <div style={{ color: 'var(--accent-rose)', paddingLeft: '1rem' }}>
                  ↳ State Change: 0 new facts extracted! todo list unchanged!
                </div>
              </>
            )}
          </div>

          {/* Loop Intercept Verdict */}
          {loopDetected ? (
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              borderLeft: '3px solid var(--accent-rose)',
              background: 'rgba(244, 63, 94, 0.08)',
              fontSize: '0.8rem',
            }}>
              <strong style={{ color: 'var(--accent-rose)' }}>🚨 INFINITE LOOP INTERCEPTED &amp; STOPPED: </strong>
              <span style={{ color: 'var(--text-primary)' }}>
                Step 3 failed the state progression check: no new information was added to <code>known_facts</code>. Rather than running an ungrounded loop, the runtime halted execution!
              </span>
            </div>
          ) : (
            <div style={{
              padding: '0.65rem 1rem',
              borderRadius: '8px',
              borderLeft: '3px solid var(--accent-emerald)',
              background: 'rgba(16, 185, 129, 0.08)',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
            }}>
              Progress is observable: Uncited claims decreased from 3 to {step === 1 ? '2' : '1'}.
            </div>
          )}
        </div>
      ) : (
        /* Memory Matrix */
        <div className="data-table-wrap">
          <table className="data-table" style={{ fontSize: '0.76rem' }}>
            <thead>
              <tr>
                <th>Dimension</th>
                <th style="color: var(--accent-cyan);">Short-Term Context (Ephemeral)</th>
                <th style="color: var(--accent-purple);">Persisted Memory (Durable)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Lifespan</strong></td>
                <td>Current execution run only</td>
                <td>Across multiple user sessions</td>
              </tr>
              <tr>
                <td><strong>Storage Location</strong></td>
                <td>In active prompt context / working memory</td>
                <td>External database / vector store / profile</td>
              </tr>
              <tr>
                <td><strong>Update Cadence</strong></td>
                <td>Updated every model/tool step</td>
                <td>Selective, occasional writes</td>
              </tr>
              <tr>
                <td><strong>Typical Contents</strong></td>
                <td><code>goal</code>, <code>plan</code>, <code>known_facts</code>, <code>tool_history</code></td>
                <td>User preferences, completed subtask checkpoints</td>
              </tr>
              <tr>
                <td><strong>Failure Mode</strong></td>
                <td>Context window overflow or prompt drift</td>
                <td>Staleness, privacy leakage, memory bloat</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
