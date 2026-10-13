'use client';

import React, { useState } from 'react';

const TEST_SCENARIOS = [
  {
    id: 'valid',
    label: '1. Clean Compliant Output',
    desc: 'Valid syntax and all schema invariants satisfied on first call',
    attempt1Raw: `{\n  "category": "account_access",\n  "urgency": "high",\n  "summary": "User unable to log in due to grayed out submit button throwing 500 error."\n}`,
    parseOk: true,
    validateOk: true,
    error: null,
  },
  {
    id: 'bad_enum',
    label: '2. Contract Breach: Invalid Enum Value',
    desc: 'Model returned "urgent": "high-ish" which breaks enum constraint',
    attempt1Raw: `{\n  "category": "bug",\n  "urgency": "high-ish",\n  "summary": "Submit button grayed out and crashes."\n}`,
    parseOk: true,
    validateOk: false,
    error: "ValidationError: 'high-ish' is not one of ['low', 'medium', 'high'] at path /urgency",
    repairedRaw: `{\n  "category": "bug",\n  "urgency": "high",\n  "summary": "Submit button grayed out and crashes."\n}`,
  },
  {
    id: 'syntax_error',
    label: '3. Broken Syntax (Trailing Prose)',
    desc: 'Model added polite conversational prose after closing brace',
    attempt1Raw: `{\n  "category": "account_access",\n  "urgency": "high",\n  "summary": "User cannot sign into portal."\n}\nI hope this structured data helps your team!`,
    parseOk: false,
    validateOk: false,
    error: "JSONDecodeError: Extra data after valid JSON payload at line 5 column 1 (char 128)",
    repairedRaw: `{\n  "category": "account_access",\n  "urgency": "high",\n  "summary": "User cannot sign into portal."\n}`,
  },
  {
    id: 'extra_keys',
    label: '4. Schema Drift (Disallowed Extra Key)',
    desc: 'Model hallucinated "internal_sentiment" when additionalProperties: false',
    attempt1Raw: `{\n  "category": "billing",\n  "urgency": "medium",\n  "summary": "Duplicate invoice charge.",\n  "internal_sentiment": "frustrated"\n}`,
    parseOk: true,
    validateOk: false,
    error: "ValidationError: Additional properties are not allowed ('internal_sentiment' was unexpected)",
    repairedRaw: `{\n  "category": "billing",\n  "urgency": "medium",\n  "summary": "Duplicate invoice charge."\n}`,
  },
];

export default function StructuredOutputSim({ onInteract }) {
  const [selectedScenario, setSelectedScenario] = useState(TEST_SCENARIOS[1]);
  const [apiFormat, setApiFormat] = useState('gemini'); // 'gemini' | 'openai' | 'anthropic'
  const [currentStep, setCurrentStep] = useState('idle'); // 'attempt1' | 'repair' | 'validated'
  const [logMessages, setLogMessages] = useState([]);

  const runPipeline = (scenario) => {
    setSelectedScenario(scenario);
    setCurrentStep('attempt1');
    setLogMessages([
      `[Pipeline] Sending ticket payload to model (${apiFormat.toUpperCase()} engine)...`,
      `[API Response] Raw text captured: ${scenario.attempt1Raw.length} bytes`,
    ]);

    if (onInteract) onInteract();

    setTimeout(() => {
      if (!scenario.parseOk) {
        setLogMessages((prev) => [
          ...prev,
          `❌ Step 1 (JSON.parse): FAILED -> ${scenario.error}`,
          `[Guard] Fail-Fast: Stopped execution before silent corruption.`,
          `[Repair Loop] Constructing automated repair prompt with error message...`,
        ]);
        triggerRepair(scenario);
      } else if (!scenario.validateOk) {
        setLogMessages((prev) => [
          ...prev,
          `✅ Step 1 (JSON.parse): Syntax valid!`,
          `❌ Step 2 (Pydantic / Draft202012): FAILED -> ${scenario.error}`,
          `[Repair Loop] Constructing repair prompt with exact validation message...`,
        ]);
        triggerRepair(scenario);
      } else {
        setLogMessages((prev) => [
          ...prev,
          `✅ Step 1 (JSON.parse): Syntax valid!`,
          `✅ Step 2 (Pydantic Schema): Contract fully verified (category, urgency, summary)!`,
          `🎉 PIPELINE SUCCESS: Strongly typed SupportTicketOutput model instantiated on Attempt 1.`,
        ]);
        setCurrentStep('validated');
      }
    }, 500);
  };

  const triggerRepair = (scenario) => {
    setTimeout(() => {
      setCurrentStep('repair');
      setLogMessages((prev) => [
        ...prev,
        `[Attempt 2] Model re-prompted with previous error and schema contract.`,
        `[API Response] Clean repaired JSON received.`,
        `✅ Step 1 (JSON.parse): Parsed cleanly!`,
        `✅ Step 2 (Schema Validation): Validated successfully!`,
        `🎉 PIPELINE RECOVERED: Object created on Attempt 2 via automated repair prompt.`,
      ]);
      setCurrentStep('validated');
    }, 700);
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
          <span style={{ fontSize: '1.3rem' }}>📦</span>
          <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>
            Structured Outputs & Automated Repair Loop Simulator
          </strong>
        </div>
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '3px' }}>
          {['gemini', 'openai', 'anthropic'].map((prov) => (
            <button
              key={prov}
              onClick={() => setApiFormat(prov)}
              style={{
                padding: '4px 10px',
                fontSize: '0.75rem',
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: apiFormat === prov ? 'var(--accent-amber)' : 'transparent',
                color: apiFormat === prov ? '#000' : 'var(--text-secondary)',
                textTransform: 'capitalize',
              }}
            >
              {prov === 'gemini' ? 'Gemini (response_schema)' : prov === 'openai' ? 'OpenAI (json_schema)' : 'Anthropic (tools)'}
            </button>
          ))}
        </div>
      </div>

      {/* Scenarios */}
      <div style={{ marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem' }}>
          Select Test Scenario to Trigger Validation Guard:
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem' }}>
          {TEST_SCENARIOS.map((sc) => {
            const isSel = selectedScenario.id === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => runPipeline(sc)}
                style={{
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: isSel ? 'var(--accent-amber)' : 'var(--border-subtle)',
                  background: isSel ? 'rgba(245, 158, 11, 0.15)' : 'rgba(0,0,0,0.2)',
                  color: isSel ? '#fde68a' : 'var(--text-secondary)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '2px' }}>{sc.label}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{sc.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Code Guard Mechanism Preview */}
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        borderRadius: '8px',
        border: '1px solid var(--border-subtle)',
        padding: '0.75rem',
        marginBottom: '1rem',
        fontFamily: 'monospace',
        fontSize: '0.75rem',
      }}>
        <span style={{ color: 'var(--accent-amber)', fontWeight: 600 }}>Active Provider Wire Call: </span>
        {apiFormat === 'gemini' && (
          <span style={{ color: '#93c5fd' }}>
            client.models.generate_content(config=types.GenerateContentConfig(response_mime_type=&quot;application/json&quot;, response_schema=SupportTicketOutput))
          </span>
        )}
        {apiFormat === 'openai' && (
          <span style={{ color: '#86efac' }}>
            client.chat.completions.create(response_format=&#123;&quot;type&quot;: &quot;json_schema&quot;, &quot;json_schema&quot;: &#123;&quot;strict&quot;: true, ...&#125;&#125;)
          </span>
        )}
        {apiFormat === 'anthropic' && (
          <span style={{ color: '#d8b4fe' }}>
            client.messages.create(tool_choice=&#123;&quot;type&quot;: &quot;tool&quot;, &quot;name&quot;: &quot;ticket_output&quot;&#125;, tools=[...])
          </span>
        )}
      </div>

      {/* Execution Pipeline Console */}
      <div style={{
        background: '#090d16',
        borderRadius: '8px',
        border: '1px solid var(--border-subtle)',
        padding: '0.85rem',
        fontFamily: 'monospace',
        fontSize: '0.78rem',
        minHeight: '120px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem', marginBottom: '0.5rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>⚙️ PIPELINE EVENT TRACE</span>
          <span style={{ color: currentStep === 'validated' ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
            {currentStep === 'idle' ? 'Ready' : currentStep === 'attempt1' ? 'Executing Attempt 1...' : currentStep === 'repair' ? 'Retrying with Repair Prompt...' : 'Validated & Bound'}
          </span>
        </div>

        {logMessages.length === 0 ? (
          <div style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>
            Select a test scenario above to execute the 2-step validation guard and repair loop.
          </div>
        ) : (
          logMessages.map((msg, i) => (
            <div
              key={i}
              style={{
                marginBottom: '4px',
                color: msg.includes('FAILED') || msg.includes('❌') ? 'var(--accent-rose)' : msg.includes('SUCCESS') || msg.includes('✅') || msg.includes('🎉') ? 'var(--accent-emerald)' : msg.includes('Repair') ? '#fde68a' : 'var(--text-secondary)',
              }}
            >
              {msg}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
