'use client';

import React, { useState } from 'react';

const FILES = {
  env: {
    name: '.env',
    content: `# Virtual Workspace Environment
GEMINI_API_KEY=AIzaSyB39xExampleProductionSecret_NotCommitted
OPENAI_API_KEY=sk-proj-prod-live-example-secret
ENVIRONMENT=production
REQUEST_TIMEOUT_SECONDS=10
LOG_LEVEL=INFO
# Note: Never commit this file to version control!`,
  },
  client: {
    name: 'llm_client.py',
    content: `import os
from dotenv import load_dotenv
from google import genai

load_dotenv()  # Loads .env into os.environ

def require_env(name: str) -> str:
    val = os.environ.get(name)
    if not val:
        raise RuntimeError(f"Missing {name}. Set it in your shell or .env file.")
    return val

def call_gemini(prompt: str):
    api_key = require_env("GEMINI_API_KEY")
    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    return response

if __name__ == "__main__":
    resp = call_gemini("Hello! What is applied AI engineering?")
    print(resp.text)`,
  },
  check: {
    name: 'check_key.py',
    content: `import os
from dotenv import load_dotenv

load_dotenv()

# Safe presence check: verify without leaking secret into logs
has_key = bool(os.environ.get("GEMINI_API_KEY"))
print(f"GEMINI_API_KEY set: {has_key}")`,
  },
  req: {
    name: 'requirements.txt',
    content: `google-genai>=0.1.1
python-dotenv>=1.0.0
requests>=2.31.0`,
  },
};

export default function VirtualSandbox({ onSimulationSuccess }) {
  const [activeTab, setActiveTab] = useState('env');
  const [scenario, setScenario] = useState('success');
  const [terminalOutput, setTerminalOutput] = useState(
    'Virtual Python Environment initialized. Select a scenario and click "Run Simulation".'
  );
  const [terminalColor, setTerminalColor] = useState('var(--text-secondary)');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setTerminalColor('var(--text-secondary)');
    setTerminalOutput('Executing in virtual Python runtime...');

    setTimeout(() => {
      setIsRunning(false);
      switch (scenario) {
        case 'success':
          setTerminalColor('var(--accent-emerald)');
          setTerminalOutput(
            `[gemini] text: 'Applied AI engineering turns model capabilities into reliable systems!'\n[gemini] usage: {'prompt_tokens': 9, 'completion_tokens': 12, 'total_tokens': 21}\n✨ Verification Successful: Client boundary authenticated and natural response generated!`
          );
          if (onSimulationSuccess) onSimulationSuccess();
          break;

        case 'missing_key':
          setTerminalColor('var(--accent-rose)');
          setTerminalOutput(
            `Traceback (most recent call last):\n  File "llm_client.py", line 15, in call_gemini\n    api_key = require_env("GEMINI_API_KEY")\n  File "llm_client.py", line 10, in require_env\n    raise RuntimeError(f"Missing {name}. Set it in your shell or .env file.")\nRuntimeError: Missing GEMINI_API_KEY. Set it in your shell or .env file.\n\n👉 Diagnosis: The fail-fast guard prevented an unauthenticated network roundtrip!`
          );
          break;

        case 'bad_model':
          setTerminalColor('var(--accent-amber)');
          setTerminalOutput(
            `google.genai.errors.APIError: 404 Model 'gemini-nonexistent' not found.\n\n👉 Troubleshooting Rule: Model Name Mismatch, not an auth error or prompt issue. Verify model identifier string in llm_client.py.`
          );
          break;

        case 'key_check':
          setTerminalColor('var(--accent-cyan)');
          setTerminalOutput(
            `GEMINI_API_KEY set: True\n\n🔒 Safe check complete: Verified that GEMINI_API_KEY is present in the environment without printing any secrets into console logs!`
          );
          break;
      }
    }, 450);
  };

  return (
    <div className="env-sandbox" id="envSandboxContainer">
      <div className="sandbox-topbar">
        <div className="sandbox-tabs">
          {Object.entries(FILES).map(([k, file]) => (
            <button
              key={k}
              className={`sandbox-tab ${activeTab === k ? 'active' : ''}`}
              onClick={() => setActiveTab(k)}
            >
              📄 {file.name}
            </button>
          ))}
        </div>

        <div className="sandbox-actions">
          <select
            className="scenario-select"
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
          >
            <option value="success">Scenario: Valid API Key (Success)</option>
            <option value="missing_key">Scenario: Missing Key (Guard Exception)</option>
            <option value="bad_model">Scenario: Bad Model String (404 APIError)</option>
            <option value="key_check">Scenario: Safe Key Check (check_key.py)</option>
          </select>

          <button
            className="run-sim-btn"
            onClick={handleRun}
            disabled={isRunning}
          >
            {isRunning ? 'Running...' : '▶ Run Simulation'}
          </button>
        </div>
      </div>

      <div className="sandbox-content">
        <pre className="sandbox-file-panel active" style={{ margin: 0 }}>
          {FILES[activeTab].content}
        </pre>

        <div className="terminal-console">
          <div className="terminal-line-prompt">
            $ {scenario === 'key_check' ? 'python check_key.py' : 'python llm_client.py'}
          </div>
          <div
            className="terminal-line-output"
            style={{ color: terminalColor }}
          >
            {terminalOutput}
          </div>
        </div>
      </div>
    </div>
  );
}
