'use client';

import React, { useState } from 'react';

const STAGES = [
  {
    icon: '📥',
    name: 'Ingestion',
    desc: 'Parse & chunk docs',
    detail: 'Ingestion Pipeline: Extracts clean text from PDFs, HTML, or DBs, chunks into optimal token lengths, generates embeddings, and indexes in vector stores.',
  },
  {
    icon: '🔍',
    name: 'Retrieval',
    desc: 'Dense + sparse search',
    detail: 'Retrieval Layer: Queries vector database and hybrid search index to fetch top-k relevant grounding passages within token latency limits.',
  },
  {
    icon: '🧠',
    name: 'Generation',
    desc: 'LLM inference with tools',
    detail: 'Generation Engine: Calls model with bounded context, structured schema guidelines, and function calling tools. Streams tokens back to client.',
  },
  {
    icon: '🛡️',
    name: 'Validation',
    desc: 'Guardrails & schemas',
    detail: 'Validation & Guardrails: Validates JSON structure against Pydantic/Zod schemas, checks for hallucinations, toxicity, and compliance before emitting response.',
  },
  {
    icon: '📊',
    name: 'Observability',
    desc: 'Traces & telemetry',
    detail: 'Telemetry & Evaluation: Logs token usage, latency percentiles (p50/p95/p99), feedback scores, and cost attribution in production dashboards.',
  },
];

export default function PipelineViz() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="pipeline-viz">
      <div className="pipeline-stages">
        {STAGES.map((s, i) => (
          <div
            key={i}
            className={`pipeline-stage ${activeStage === i ? 'active-stage' : ''}`}
            onClick={() => setActiveStage(i)}
          >
            <span className="pipeline-stage-icon">{s.icon}</span>
            <span className="pipeline-stage-name">{s.name}</span>
            <span className="pipeline-stage-desc">{s.desc}</span>
            {i < STAGES.length - 1 && <span className="pipeline-connector">›</span>}
          </div>
        ))}
      </div>

      <div className="pipeline-detail">
        {STAGES[activeStage].detail}
      </div>
    </div>
  );
}
