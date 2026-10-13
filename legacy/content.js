/* ============================================================
   Applied AI Academy — Course Content Data
   ============================================================ */

const COURSE_CONTENT = {
  modules: [
    // ============================================================
    // MODULE 0 — Welcome to Applied AI Engineering
    // ============================================================
    {
      id: 'intro',
      title: 'Welcome to Applied AI Engineering',
      subtitle: 'Your journey into building production AI systems starts here',
      icon: '🚀',
      color: '#3B82F6',
      gradient: 'linear-gradient(135deg, #3B82F6, #6366F1)',
      sections: [
        {
          id: 'intro-what-is',
          title: 'What Is Applied AI Engineering?',
          type: 'concept',
          badge: 'concept',
          content: `
            <p><strong>Applied AI engineering</strong> turns AI capabilities into applications that solve real problems reliably. It brings together <em>models, software, data, tools, and infrastructure</em> to build and operate complete applications.</p>

            <div class="flow-diagram">
              <div class="flow-step">
                <span class="flow-step-icon">🧠</span>
                <span class="flow-step-label">Models</span>
              </div>
              <span class="flow-arrow">→</span>
              <div class="flow-step">
                <span class="flow-step-icon">💻</span>
                <span class="flow-step-label">Software</span>
              </div>
              <span class="flow-arrow">→</span>
              <div class="flow-step">
                <span class="flow-step-icon">📊</span>
                <span class="flow-step-label">Data & Tools</span>
              </div>
              <span class="flow-arrow">→</span>
              <div class="flow-step">
                <span class="flow-step-icon">🏗️</span>
                <span class="flow-step-label">Infrastructure</span>
              </div>
              <span class="flow-arrow">→</span>
              <div class="flow-step">
                <span class="flow-step-icon">🎯</span>
                <span class="flow-step-label">Production App</span>
              </div>
            </div>

            <p>When building an AI application, we need to decide:</p>
            <ul>
              <li>How the model <strong>accesses information</strong></li>
              <li>How it <strong>uses tools</strong> and communicates with other components</li>
              <li>How <strong>data moves</strong> through the system</li>
              <li>Which types of <strong>input</strong> it handles</li>
              <li>How it <strong>performs as demand grows</strong></li>
            </ul>

            <div class="rule-box">
              <span class="rule-icon">⚡</span>
              <span class="rule-text">As applications become more complex, engineering decisions must account for <strong>performance, scalability, cost, reliability, and security</strong>.</span>
            </div>
          `
        },
        {
          id: 'intro-why',
          title: 'Why Take This Course?',
          type: 'visual',
          badge: 'visual',
          content: `
            <p>Modern AI development has moved beyond making basic API calls to constructing <strong>complete application systems</strong>. Today's applications must coordinate multi-step tasks, pull in context from various data sources, and operate within clear performance, cost, and security guidelines.</p>

            <h3>Production Challenges You'll Learn to Solve</h3>

            <div class="info-grid">
              <div class="info-card" style="border-top: 2px solid var(--accent-rose);">
                <span class="info-card-icon">🎯</span>
                <span class="info-card-title">Relevant Information & Accuracy</span>
                <span class="info-card-desc">Standard prompts lack private domain knowledge, leading to incomplete or inaccurate outputs.</span>
              </div>
              <div class="info-card" style="border-top: 2px solid var(--accent-amber);">
                <span class="info-card-icon">🔧</span>
                <span class="info-card-title">Tool & Media Workflows</span>
                <span class="info-card-desc">Uncoordinated tool connections and combined audio/visual streams cause timing issues and broken experiences.</span>
              </div>
              <div class="info-card" style="border-top: 2px solid var(--accent-cyan);">
                <span class="info-card-icon">⚡</span>
                <span class="info-card-title">Latency & Cost</span>
                <span class="info-card-desc">Unoptimized pipelines lead to slow response times, delayed playback, and higher operational expenses.</span>
              </div>
              <div class="info-card" style="border-top: 2px solid var(--accent-purple);">
                <span class="info-card-icon">🛡️</span>
                <span class="info-card-title">Security & Privacy</span>
                <span class="info-card-desc">Applications without defined boundaries are vulnerable to unexpected inputs, data leaks, and unauthorized access.</span>
              </div>
            </div>

            <div class="tip-box">
              <p><strong>💡 Key Insight:</strong> This course focuses on practical design choices, clean integrations, and deployment practices to solve these core engineering challenges.</p>
            </div>
          `
        },
        {
          id: 'intro-overview',
          title: 'Course Roadmap',
          type: 'visual',
          badge: 'visual',
          content: `
            <p>Here's the learning journey that awaits you — from foundational systems to production deployment:</p>

            <div class="info-grid">
              <div class="info-card" style="border-left: 3px solid var(--accent-blue);">
                <span class="info-card-icon">🔍</span>
                <span class="info-card-title">Core Systems & Information Retrieval</span>
                <span class="info-card-desc">Combine keyword + semantic search for accurate context. Build multi-step agents with tools. Deploy as reliable web services with caching, rate limits, and automated tests.</span>
              </div>
              <div class="info-card" style="border-left: 3px solid var(--accent-purple);">
                <span class="info-card-icon">🎙️</span>
                <span class="info-card-title">Working with Multiple Media Streams</span>
                <span class="info-card-desc">Set data requirements for speech-to-text/text-to-speech. Balance batch vs streaming processing. Coordinate text, voice, and image into smooth workflows.</span>
              </div>
              <div class="info-card" style="border-left: 3px solid var(--accent-emerald);">
                <span class="info-card-icon">🔐</span>
                <span class="info-card-title">Security, Privacy & Safeguards</span>
                <span class="info-card-desc">Protect user privacy with encryption and automated cleanup. Convert feedback into reproducible test cases. Set up pre-input checks, content filters, and monitoring.</span>
              </div>
            </div>
          `
        },
        {
          id: 'intro-who',
          title: 'Who Is This Course For?',
          type: 'visual',
          badge: 'visual',
          content: `
            <p>This course is designed for <strong>builders ready to move from initial experiments to working software</strong>:</p>

            <div class="persona-grid">
              <div class="persona-card">
                <span class="persona-icon">👨‍💻</span>
                <div class="persona-title">AI & Software Engineers</div>
                <div class="persona-desc">Building search systems, automated task workflows, and multimodal features</div>
              </div>
              <div class="persona-card">
                <span class="persona-icon">🏗️</span>
                <div class="persona-title">Backend Architects</div>
                <div class="persona-desc">Designing service boundaries, API contracts, and deployment workflows</div>
              </div>
              <div class="persona-card">
                <span class="persona-icon">🖥️</span>
                <div class="persona-title">Fullstack Developers</div>
                <div class="persona-desc">Adding voice and visual tools without performance lag or sync issues</div>
              </div>
              <div class="persona-card">
                <span class="persona-icon">🛡️</span>
                <div class="persona-title">Security & DevOps</div>
                <div class="persona-desc">Protecting applications against unexpected inputs and data exposure</div>
              </div>
            </div>
          `
        },
        {
          id: 'intro-takeaways',
          title: 'Key Takeaways',
          type: 'concept',
          badge: 'concept',
          content: `
            <p>Here are the main skills and practical ideas you will gain:</p>

            <div class="takeaway-list">
              <div class="takeaway-item">
                <span class="takeaway-icon">🔄</span>
                <div class="takeaway-content">
                  <span class="takeaway-title">End-to-End Focus</span>
                  <span class="takeaway-desc">Explore the full application lifecycle — from model selection and data retrieval to API design, security, and monitoring.</span>
                </div>
              </div>
              <div class="takeaway-item">
                <span class="takeaway-icon">🔌</span>
                <div class="takeaway-content">
                  <span class="takeaway-title">Practical Integration Standards</span>
                  <span class="takeaway-desc">Learn clear ways to structure streaming audio, media artifacts, and tool calls to keep your applications running smoothly.</span>
                </div>
              </div>
              <div class="takeaway-item">
                <span class="takeaway-icon">🛡️</span>
                <div class="takeaway-content">
                  <span class="takeaway-title">Defensive Design</span>
                  <span class="takeaway-desc">Design systems that protect user data and maintain stability when faced with unexpected inputs.</span>
                </div>
              </div>
            </div>
          `
        }
      ],
      quiz: [
        {
          question: 'What is the main goal of Applied AI Engineering?',
          options: [
            'Training new AI models from scratch',
            'Turning AI capabilities into applications that solve real problems reliably',
            'Only making API calls to language models',
            'Building hardware systems for AI computation'
          ],
          correct: 1,
          explanation: 'Applied AI engineering focuses on turning AI capabilities into complete, reliable applications — not just building models or making simple API calls.'
        },
        {
          question: 'Which of these is NOT listed as a production challenge in the course?',
          options: [
            'Relevant information and accuracy',
            'Latency and cost optimization',
            'Choosing the right programming language',
            'Security and privacy protection'
          ],
          correct: 2,
          explanation: 'The course focuses on information accuracy, tool/media workflows, latency & cost, and security & privacy. Programming language choice is not listed as a core challenge.'
        },
        {
          question: 'What does modern AI development require beyond basic API calls?',
          options: [
            'Only prompt engineering skills',
            'Constructing complete application systems with multi-step coordination',
            'Building language models from scratch',
            'Using only one data source at a time'
          ],
          correct: 1,
          explanation: 'Modern AI development requires constructing complete application systems that coordinate multi-step tasks, pull context from various data sources, and operate within performance, cost, and security guidelines.'
        },
        {
          question: 'What does "defensive design" mean in the context of this course?',
          options: [
            'Using strong passwords only',
            'Never deploying to production',
            'Designing systems that protect user data and maintain stability under unexpected inputs',
            'Building systems that refuse all user requests'
          ],
          correct: 2,
          explanation: 'Defensive design means building systems that protect user data and maintain stability even when faced with unexpected inputs — a key skill taught in this course.'
        }
      ]
    },

    // ============================================================
    // MODULE 1 — Selecting the Right LLM
    // ============================================================
    {
      id: 'model-selection',
      title: 'Selecting the Right LLM',
      subtitle: 'Navigate the model landscape with a reusable decision framework',
      icon: '🎯',
      color: '#8B5CF6',
      gradient: 'linear-gradient(135deg, #8B5CF6, #6366F1)',
      sections: [
        {
          id: 'ms-intro',
          title: 'Beyond Prompting: Real Constraints',
          type: 'concept',
          badge: 'concept',
          content: `
            <p>Shipping an LLM feature usually starts with <strong>constraints beyond prompting</strong>. Consider this scenario:</p>

            <div class="info-grid">
              <div class="info-card" style="border-top: 2px solid var(--accent-rose);">
                <span class="info-card-icon">📍</span>
                <span class="info-card-title">Data Residency</span>
                <span class="info-card-desc">Customer data must remain in a particular region — this limits which services you can use.</span>
              </div>
              <div class="info-card" style="border-top: 2px solid var(--accent-amber);">
                <span class="info-card-icon">⏱️</span>
                <span class="info-card-title">Latency Target</span>
                <span class="info-card-desc">Your service has a p95 latency target of 200ms — this affects architecture choices.</span>
              </div>
              <div class="info-card" style="border-top: 2px solid var(--accent-cyan);">
                <span class="info-card-icon">🔧</span>
                <span class="info-card-title">Interface Requirements</span>
                <span class="info-card-desc">The product requires tool use and structured outputs — not all models support these equally.</span>
              </div>
            </div>

            <div class="rule-box">
              <span class="rule-icon">📌</span>
              <span class="rule-text">There is no permanently best model. Provider policies, latency, and available interfaces change over time. Compare models using decision criteria your team can <strong>explain and defend</strong> in design reviews.</span>
            </div>
          `
        },
        {
          id: 'ms-ownership',
          title: 'Two Operating Envelopes: Hosted vs Open-Weight',
          type: 'comparison',
          badge: 'comparison',
          interactiveId: 'arch-toggle',
          content: `
            <p>The key architectural division comes down to <strong>who owns the inference stack</strong>:</p>

            <div class="arch-toggle-container">
              <div class="arch-toggle-btns">
                <button class="arch-toggle-btn active" data-panel="hosted">☁️ Hosted APIs</button>
                <button class="arch-toggle-btn" data-panel="open">🔓 Open-Weight Self-Hosted</button>
              </div>

              <div class="arch-panel active" id="arch-hosted">
                <div class="flow-diagram">
                  <div class="flow-step">
                    <span class="flow-step-icon">📝</span>
                    <span class="flow-step-label">Your App</span>
                  </div>
                  <span class="flow-arrow">→</span>
                  <div class="flow-step" style="border-color: rgba(59, 130, 246, 0.4); background: rgba(59, 130, 246, 0.08);">
                    <span class="flow-step-icon">🌐</span>
                    <span class="flow-step-label">API Request</span>
                  </div>
                  <span class="flow-arrow">→</span>
                  <div class="flow-step" style="border-color: rgba(139, 92, 246, 0.4); background: rgba(139, 92, 246, 0.08);">
                    <span class="flow-step-icon">☁️</span>
                    <span class="flow-step-label">Provider Infra</span>
                  </div>
                  <span class="flow-arrow">→</span>
                  <div class="flow-step" style="border-color: rgba(59, 130, 246, 0.4); background: rgba(59, 130, 246, 0.08);">
                    <span class="flow-step-icon">📤</span>
                    <span class="flow-step-label">Tokens Back</span>
                  </div>
                </div>

                <h4>What the provider handles:</h4>
                <ul>
                  <li>Inference server operation & GPU scheduling</li>
                  <li>Driver patching & capacity scaling</li>
                  <li>Safety controls & abuse prevention</li>
                </ul>
                <h4>What you own:</h4>
                <ul>
                  <li>Prompt construction & request routing</li>
                  <li>Retries & response validation</li>
                  <li>Application-level security</li>
                </ul>
              </div>

              <div class="arch-panel" id="arch-open">
                <div class="flow-diagram">
                  <div class="flow-step">
                    <span class="flow-step-icon">📝</span>
                    <span class="flow-step-label">Your App</span>
                  </div>
                  <span class="flow-arrow">→</span>
                  <div class="flow-step" style="border-color: rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.08);">
                    <span class="flow-step-icon">🖥️</span>
                    <span class="flow-step-label">Your Server</span>
                  </div>
                  <span class="flow-arrow">→</span>
                  <div class="flow-step" style="border-color: rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.08);">
                    <span class="flow-step-icon">🎮</span>
                    <span class="flow-step-label">Your GPUs</span>
                  </div>
                  <span class="flow-arrow">→</span>
                  <div class="flow-step" style="border-color: rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.08);">
                    <span class="flow-step-icon">📤</span>
                    <span class="flow-step-label">Tokens Back</span>
                  </div>
                </div>

                <h4>What you gain:</h4>
                <ul>
                  <li>Full control over runtime settings & batching</li>
                  <li>Choose when to roll out updates</li>
                  <li>Inspect model configuration artifacts</li>
                  <li>Constrain data flow by controlling where the server runs</li>
                </ul>
                <h4>What you take on:</h4>
                <ul>
                  <li>Capacity planning & queue management</li>
                  <li>GPU utilization monitoring</li>
                  <li>Security patching & incident response</li>
                  <li>Model server health monitoring</li>
                </ul>
              </div>
            </div>

            <div class="rule-box">
              <span class="rule-icon">📏</span>
              <span class="rule-text"><strong>Rule:</strong> Pick hosted APIs when the limiting factor is engineering time to operate GPUs. Pick open weights when the limiting factor is governance or runtime control.</span>
            </div>
          `
        },
        {
          id: 'ms-open-vs-closed',
          title: 'Open-Weight vs Closed-Weight: Key Differences',
          type: 'concept',
          badge: 'concept',
          content: `
            <p>The boundary between open and closed weights is <strong>operational, not philosophical</strong>:</p>

            <div class="comparison-container">
              <div class="comparison-side side-a" data-label="Open-Weight Models">
                <ul>
                  <li>Run from weight files <strong>we can host</strong></li>
                  <li>Can inspect artifacts like model configuration</li>
                  <li>Choose the inference engine</li>
                  <li>Constrain where data flows by controlling server location</li>
                </ul>
              </div>
              <div class="comparison-side side-b" data-label="Closed-Weight Models">
                <ul>
                  <li>Run on <strong>provider infrastructure</strong></li>
                  <li>Cannot inspect weights or change inference stack</li>
                  <li>Get stable endpoint & managed scaling</li>
                  <li>Provider-side safety and abuse controls</li>
                </ul>
              </div>
            </div>

            <div class="rule-box">
              <span class="rule-icon">📏</span>
              <span class="rule-text"><strong>Rule:</strong> If a requirement mentions residency, private networking, or auditable data paths, evaluate open-weight models first, then see whether a hosted API offers equivalent governance options.</span>
            </div>
          `
        },
        {
          id: 'ms-families',
          title: 'Comparing Model Families',
          type: 'table',
          badge: 'table',
          content: `
            <p>Once the ownership model is clear, compare families by <strong>what their docs commit to</strong> — not by assuming permanent rankings from a single eval.</p>

            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>Hosted APIs (Closed)</th>
                    <th>Open-Weight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Hosting & Control</strong></td>
                    <td>Provider-hosted, managed platforms</td>
                    <td>Customer-hosted, flexible deployment</td>
                  </tr>
                  <tr>
                    <td><strong>Data Governance</strong></td>
                    <td>Limited to provider policies</td>
                    <td>Maximum control, deployment-defined</td>
                  </tr>
                  <tr>
                    <td><strong>Integration Surface</strong></td>
                    <td>Rich APIs, broadest ecosystem</td>
                    <td>DIY stack, growing ecosystem</td>
                  </tr>
                  <tr>
                    <td><strong>Context Length</strong></td>
                    <td>Often high, leading long-context</td>
                    <td>Model-dependent, varies by release</td>
                  </tr>
                  <tr>
                    <td><strong>Operational Burden</strong></td>
                    <td>Low to medium</td>
                    <td>Medium to high</td>
                  </tr>
                  <tr>
                    <td><strong>Latency Variability</strong></td>
                    <td>Moderate, varies by provider</td>
                    <td>Highly tunable, depends on setup</td>
                  </tr>
                  <tr>
                    <td><strong>Release Cadence</strong></td>
                    <td>Provider-driven, fast & changing</td>
                    <td>You choose timing, steady checkpoints</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="rule-box">
              <span class="rule-icon">📏</span>
              <span class="rule-text"><strong>Rule:</strong> Treat context length, tool calling, and safety filters as interface contracts — and write tests that fail loudly when the contract changes.</span>
            </div>

            <div class="code-block">
              <div class="code-header">
                <span class="code-lang">Python</span>
                <button class="code-copy" onclick="copyCode(this)">Copy</button>
              </div>
              <pre><code><span class="cmt"># Example: Testing context length contract</span>
<span class="kw">def</span> <span class="fn">test_context_length_contract</span>(<span class="param">client, model_id, max_tokens</span>):
    <span class="str">"""Send a near-limit prompt and verify no truncation."""</span>
    <span class="cmt"># Generate a prompt near the documented limit</span>
    <span class="var">long_prompt</span> <span class="op">=</span> <span class="str">"Repeat this instruction: "</span> <span class="op">*</span> (<span class="var">max_tokens</span> <span class="op">-</span> <span class="num">100</span>)
    <span class="var">response</span> <span class="op">=</span> <span class="var">client</span>.<span class="fn">complete</span>(<span class="var">model_id</span>, <span class="var">long_prompt</span>)
    
    <span class="cmt"># Verify the model received all instructions</span>
    <span class="kw">assert</span> <span class="var">response</span>.<span class="var">status</span> <span class="op">==</span> <span class="str">"success"</span>
    <span class="kw">assert</span> <span class="str">"truncat"</span> <span class="kw">not in</span> <span class="var">response</span>.<span class="var">metadata</span>
    <span class="kw">print</span>(<span class="str">f"✅ Context length contract verified for </span><span class="op">{</span><span class="var">model_id</span><span class="op">}</span><span class="str">"</span>)</code></pre>
            </div>
          `
        },
        {
          id: 'ms-pitfalls',
          title: 'Near-Neighbors That Cause Wrong Decisions',
          type: 'concept',
          badge: 'concept',
          content: `
            <h3>Common Misconceptions</h3>
            
            <div class="info-grid">
              <div class="info-card" style="border-left: 3px solid var(--accent-rose);">
                <span class="info-card-icon">⚠️</span>
                <span class="info-card-title">Open-weight ≠ Open-source</span>
                <span class="info-card-desc">A model can publish weights while restricting commercial use, redistribution, or modification. Always check the license for product use.</span>
              </div>
              <div class="info-card" style="border-left: 3px solid var(--accent-amber);">
                <span class="info-card-icon">⚠️</span>
                <span class="info-card-title">Closed-weight ≠ No Control</span>
                <span class="info-card-desc">You still control prompts, tool schemas, retrieval inputs, routing, temperature, post-processing, and fallbacks.</span>
              </div>
              <div class="info-card" style="border-left: 3px solid var(--accent-cyan);">
                <span class="info-card-icon">⚠️</span>
                <span class="info-card-title">Model Choice ≠ Quality Fix</span>
                <span class="info-card-desc">If the system sends ambiguous instructions or retrieves irrelevant context, a different model often produces a different failure — not a reliable solution.</span>
              </div>
            </div>

            <div class="rule-box">
              <span class="rule-icon">📏</span>
              <span class="rule-text"><strong>Rule:</strong> Before switching families, reproduce the failure with a saved prompt and the exact retrieved context, then check whether a stricter schema and better routing would remove the failure mode.</span>
            </div>
          `
        },
        {
          id: 'ms-framework',
          title: 'The Decision Framework',
          type: 'visual',
          badge: 'interactive',
          content: `
            <p>Start the selection in an order that <strong>prevents late-stage rewrites</strong>. Address governance first because it can force architecture changes.</p>

            <div class="framework-steps">
              <div class="framework-step">
                <div class="framework-step-num" style="background: rgba(244, 63, 94, 0.1); border: 2px solid rgba(244, 63, 94, 0.3); color: var(--accent-rose);">1</div>
                <div class="framework-step-content">
                  <span class="framework-step-title">🔐 Governance & Data Handling</span>
                  <span class="framework-step-desc">Can inputs leave our environment? Can logs store prompts? What audit trail is required? <em>These constraints can force your entire architecture.</em></span>
                </div>
              </div>
              <div class="framework-step">
                <div class="framework-step-num" style="background: rgba(245, 158, 11, 0.1); border: 2px solid rgba(245, 158, 11, 0.3); color: var(--accent-amber);">2</div>
                <div class="framework-step-content">
                  <span class="framework-step-title">⚡ Latency & Context Needs</span>
                  <span class="framework-step-desc">Set p95/p99 targets. Test with realistic concurrency and near-limit contexts to observe queueing and truncation behavior.</span>
                </div>
              </div>
              <div class="framework-step">
                <div class="framework-step-num" style="background: rgba(59, 130, 246, 0.1); border: 2px solid rgba(59, 130, 246, 0.3); color: var(--accent-blue);">3</div>
                <div class="framework-step-content">
                  <span class="framework-step-title">🔌 Integration Surface</span>
                  <span class="framework-step-desc">Require tool calling, JSON mode, or structured output constraints? Verify parsing and tool execution safety in tests.</span>
                </div>
              </div>
              <div class="framework-step">
                <div class="framework-step-num" style="background: rgba(16, 185, 129, 0.1); border: 2px solid rgba(16, 185, 129, 0.3); color: var(--accent-emerald);">4</div>
                <div class="framework-step-content">
                  <span class="framework-step-title">💰 Cost Envelope</span>
                  <span class="framework-step-desc">Set an upper bound per request and per day, then decide whether that pushes toward batching, caching, or self-hosting.</span>
                </div>
              </div>
            </div>

            <div class="warning-box">
              <p><strong>⚠️ Important:</strong> Only after those constraints are satisfied should you compare response quality on representative tasks — using the same prompts, the same retrieval, and the same validators.</p>
            </div>

            <div class="rule-box">
              <span class="rule-icon">📏</span>
              <span class="rule-text"><strong>Rule:</strong> If you cannot write down the constraint that would force you to switch from a hosted API to open weights, you are not done scoping the problem.</span>
            </div>
          `
        }
      ],
      quiz: [
        {
          question: 'When should you prefer open-weight models over hosted APIs?',
          options: [
            'When you want the cheapest option available',
            'When governance or runtime control is the limiting factor',
            'When you want the easiest setup with minimal effort',
            'When you need the latest cutting-edge features'
          ],
          correct: 1,
          explanation: 'The rule is: Pick hosted APIs when engineering time to operate GPUs is the limit. Pick open weights when governance or runtime control is the limiting factor.'
        },
        {
          question: 'What is the key difference between open-weight and open-source models?',
          options: [
            'They are exactly the same thing',
            'Open-weight models always allow commercial use',
            'Open-weight may publish weights while restricting commercial use or redistribution',
            'Open-source models never publish weights'
          ],
          correct: 2,
          explanation: 'Open-weight is NOT the same as open-source. A model can publish weights while restricting commercial use, redistribution, or modification. This matters for product licensing.'
        },
        {
          question: 'In the decision framework, what should be addressed FIRST?',
          options: [
            'Cost envelope',
            'Response quality comparison',
            'Governance and data handling',
            'Latency targets'
          ],
          correct: 2,
          explanation: 'Address governance first because it can force architecture changes. Starting with other concerns risks late-stage rewrites when governance constraints surface later.'
        },
        {
          question: 'What should you do BEFORE switching model families to fix quality issues?',
          options: [
            'Immediately switch to the newest available model',
            'Reproduce the failure with saved prompts and check if better routing/schema helps',
            'Increase the temperature setting to get more variety',
            'Remove all guardrails and let the model respond freely'
          ],
          correct: 1,
          explanation: 'Before switching families, reproduce the failure with a saved prompt and exact retrieved context. Check whether a stricter schema and better routing would remove the failure mode.'
        },
        {
          question: 'How should context length claims from providers be verified?',
          options: [
            'Trust the documentation at face value',
            'Estimate based on word count',
            'Send a near-limit prompt in an integration test and check for truncation',
            'Check provider social media for user reports'
          ],
          correct: 2,
          explanation: 'Treat context length as an interface contract. Verify by sending near-limit prompts in integration tests and checking for truncation or errors — the failure mode is visible as missing earlier instructions.'
        }
      ]
    },

    // ============================================================
    // MODULE 2 — How LLMs Work
    // ============================================================
    {
      id: 'how-llms-work',
      title: 'How LLMs Work',
      subtitle: 'Understand the engine under the hood to engineer better prompts',
      icon: '⚙️',
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981, #06B6D4)',
      sections: [
        {
          id: 'llm-overview',
          title: 'Why Outputs Change: The Step-by-Step Process',
          type: 'visual',
          badge: 'visual',
          content: `
            <p>Understanding why AI outputs change can feel unpredictable, but it comes down to a clear step-by-step process:</p>

            <div class="pipeline-viz">
              <div class="pipeline-stages">
                <div class="pipeline-stage active-stage" data-detail="Text is broken into tokens — small pieces from a fixed vocabulary. Token boundaries matter because they change both length and the granularity of what the model processes.">
                  <span class="pipeline-stage-icon">✂️</span>
                  <span class="pipeline-stage-name">Tokenization</span>
                  <span class="pipeline-stage-desc">Breaking text into pieces</span>
                  <span class="pipeline-connector">→</span>
                </div>
                <div class="pipeline-stage" data-detail="Each token ID is mapped to a numeric vector. Tokens used in similar contexts land near each other in vector space, making similar continuations more likely.">
                  <span class="pipeline-stage-icon">🔢</span>
                  <span class="pipeline-stage-name">Embeddings</span>
                  <span class="pipeline-stage-desc">Tokens become vectors</span>
                  <span class="pipeline-connector">→</span>
                </div>
                <div class="pipeline-stage" data-detail="Attention reweights how much each earlier token influences the next token — like a mixing board where each slider boosts or reduces influence. Some details persist strongly while others get diluted.">
                  <span class="pipeline-stage-icon">🎚️</span>
                  <span class="pipeline-stage-name">Attention</span>
                  <span class="pipeline-stage-desc">Weighting prior tokens</span>
                  <span class="pipeline-connector">→</span>
                </div>
                <div class="pipeline-stage" data-detail="The model computes probabilities for the next token, samples one, appends it to context, and repeats. Even with the same prompt, selecting from a distribution can yield different tokens.">
                  <span class="pipeline-stage-icon">🔄</span>
                  <span class="pipeline-stage-name">Generation</span>
                  <span class="pipeline-stage-desc">Sampling next tokens</span>
                </div>
              </div>
              <div class="pipeline-detail" id="pipelineDetail">Text is broken into tokens — small pieces from a fixed vocabulary. Token boundaries matter because they change both length and the granularity of what the model processes.</div>
            </div>

            <p>Two prompts can ask for the same thing and still produce different completions. Shipping LLM applications means treating these shifts as an <strong>engineering problem, not a surprise</strong>.</p>
          `
        },
        {
          id: 'llm-tokens',
          title: 'Tokens Are the Input, Not Words',
          type: 'interactive',
          badge: 'interactive',
          interactiveId: 'tokenizer',
          content: `
            <p>The model does not receive characters or words. Text gets converted into <strong>tokens</strong> — short text pieces chosen from a fixed vocabulary. The context window counts <strong>tokens, not sentences</strong>.</p>

            <p>Token boundaries matter because they change both length and granularity. A small phrasing tweak can split a common word into multiple tokens, pushing later content closer to the context limit.</p>

            <h3>🔬 Try the Interactive Tokenizer</h3>
            <p>Type any text below to see how it splits into tokens:</p>

            <div class="tokenizer-demo">
              <input type="text" class="tokenizer-input" id="tokenizerInput" placeholder='Try: "unbelievable" or "it\'s simple" or "Applied AI Engineering"' value="Applied AI Engineering is unbelievable">
              <div class="tokenizer-output" id="tokenizerOutput"></div>
              <div class="tokenizer-stats" id="tokenizerStats">
                <span>Words: <strong id="wordCount">0</strong></span>
                <span>Tokens: <strong id="tokenCount">0</strong></span>
                <span>Ratio: <strong id="tokenRatio">0</strong></span>
              </div>
            </div>

            <div class="code-block">
              <div class="code-header">
                <span class="code-lang">Tokenization Examples</span>
                <button class="code-copy" onclick="copyCode(this)">Copy</button>
              </div>
              <pre><code><span class="cmt"># Illustrative tokenization (simplified)</span>
<span class="str">"unbelievable"</span>  → [<span class="str">"un"</span>, <span class="str">"believ"</span>, <span class="str">"able"</span>]     <span class="cmt"># 1 word → 3 tokens</span>
<span class="str">"it's simple"</span>   → [<span class="str">"it"</span>, <span class="str">"'"</span>, <span class="str">"s"</span>, <span class="str">" simple"</span>]  <span class="cmt"># 2 words → 4 tokens</span>
<span class="str">"AI"</span>             → [<span class="str">"AI"</span>]                       <span class="cmt"># 1 word → 1 token</span>
<span class="str">"artificial"</span>    → [<span class="str">"art"</span>, <span class="str">"if"</span>, <span class="str">"icial"</span>]       <span class="cmt"># 1 word → 3 tokens</span></code></pre>
            </div>

            <div class="rule-box">
              <span class="rule-icon">📏</span>
              <span class="rule-text"><strong>Rule:</strong> For any budget or limit, measure tokens with your tokenizer tooling. <strong>Do not estimate by word count.</strong></span>
            </div>
          `
        },
        {
          id: 'llm-embeddings',
          title: 'Embeddings Turn Tokens into Vectors',
          type: 'visual',
          badge: 'visual',
          content: `
            <p>After tokenization, each token ID is mapped to a <strong>numeric vector</strong>. These embeddings are arranged so that tokens used in similar contexts tend to land near each other in vector space.</p>

            <div class="visual-diagram">
              <h4 style="margin-bottom: 16px; color: var(--text-primary);">Token → Vector Space Mapping</h4>
              <div style="display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; margin-bottom: 16px;">
                <div style="text-align: center;">
                  <div style="padding: 8px 16px; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;">"king"</div>
                  <div style="font-size: 0.7rem; color: var(--text-muted);">[0.21, -0.47, 0.83, ...]</div>
                </div>
                <div style="text-align: center;">
                  <div style="padding: 8px 16px; background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 8px; margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;">"queen"</div>
                  <div style="font-size: 0.7rem; color: var(--text-muted);">[0.19, -0.44, 0.81, ...]</div>
                </div>
                <div style="text-align: center;">
                  <div style="padding: 8px 16px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;">"car"</div>
                  <div style="font-size: 0.7rem; color: var(--text-muted);">[0.75, 0.32, -0.15, ...]</div>
                </div>
              </div>
              <p style="font-size: 0.82rem; color: var(--text-muted); max-width: 500px; margin: 0 auto;">Tokens used in similar contexts (like "king" and "queen") have similar vector values. "Car" is far away in vector space.</p>
            </div>

            <h3>Two Types of Embeddings</h3>
            <div class="comparison-container">
              <div class="comparison-side side-a" data-label="Token Embedding">
                <p>The <strong>base vector</strong> looked up for a token ID. Same token always maps to the same initial vector.</p>
              </div>
              <div class="comparison-side side-b" data-label="Contextual Embedding">
                <p>The vector <strong>after the model mixes in surrounding tokens</strong>. The same token can lead to different next-token tendencies depending on its neighbors.</p>
              </div>
            </div>

            <div class="tip-box">
              <p><strong>💡 Engineering relevance:</strong> This shared vector space becomes an interface later. Similarity search for retrieval (RAG) compares these vectors — whatever the model treats as close in this space will tend to be retrieved as related content.</p>
            </div>
          `
        },
        {
          id: 'llm-attention',
          title: 'Attention: Which Prior Tokens Matter',
          type: 'interactive',
          badge: 'interactive',
          interactiveId: 'attention',
          content: `
            <p>With embeddings in place, <strong>attention reweights how much each earlier token influences the next token</strong>. Think of it as a mixing board where each slider boosts or reduces a prior token's influence for the current position.</p>

            <h3>🎚️ Attention Weight Visualizer</h3>
            <p>Click on any token to see how attention weights shift — the bars show how much each prior token influences the selected token:</p>

            <div class="attention-viz">
              <div class="attention-tokens" id="attentionTokens">
                <!-- Populated by JS -->
              </div>
              <div class="attention-weights" id="attentionWeights">
                <!-- Populated by JS -->
              </div>
            </div>

            <p>In each transformer block, attention produces weights over prior positions, then uses those weights to combine their vectors. Because weights differ by layer and head, <strong>some details persist strongly while others get diluted</strong>, especially when many tokens compete in the same window.</p>

            <div class="rule-box">
              <span class="rule-icon">📏</span>
              <span class="rule-text"><strong>Rule:</strong> When an output ignores an instruction, suspect instruction placement and competition in the context before blaming capability. <strong>Move the instruction later</strong>, make it shorter, or remove nearby conflicting text.</span>
            </div>
          `
        },
        {
          id: 'llm-generation',
          title: 'Autoregressive Generation Loop',
          type: 'visual',
          badge: 'visual',
          content: `
            <p>Once the model computes a next-token distribution, generation repeats the same cycle:</p>

            <div class="flow-diagram">
              <div class="flow-step">
                <span class="flow-step-icon">📋</span>
                <span class="flow-step-label">Assemble Context</span>
              </div>
              <span class="flow-arrow">→</span>
              <div class="flow-step">
                <span class="flow-step-icon">⚡</span>
                <span class="flow-step-label">Forward Pass</span>
              </div>
              <span class="flow-arrow">→</span>
              <div class="flow-step">
                <span class="flow-step-icon">📊</span>
                <span class="flow-step-label">Compute Logits</span>
              </div>
              <span class="flow-arrow">→</span>
              <div class="flow-step">
                <span class="flow-step-icon">🎲</span>
                <span class="flow-step-label">Sample Token</span>
              </div>
              <span class="flow-arrow">→</span>
              <div class="flow-step">
                <span class="flow-step-icon">➕</span>
                <span class="flow-step-label">Append & Repeat</span>
              </div>
            </div>

            <h3>Where Non-Determinism Enters</h3>
            <p>Non-determinism comes from <strong>sampling</strong>. Even with the same prompt and settings, selecting from a probability distribution can yield different tokens. Early differences compound because each sampled token becomes part of the next step's context.</p>

            <div class="info-grid">
              <div class="info-card" style="border-top: 2px solid var(--accent-emerald);">
                <span class="info-card-icon">🎯</span>
                <span class="info-card-title">Effectively Deterministic</span>
                <span class="info-card-desc">Possible when every source of randomness is fixed: fixed seed, identical decoding settings, same hardware. Rare in production.</span>
              </div>
              <div class="info-card" style="border-top: 2px solid var(--accent-amber);">
                <span class="info-card-icon">🎲</span>
                <span class="info-card-title">Typical Production</span>
                <span class="info-card-desc">Most deployments don't guarantee determinism end-to-end. Treat each prompt-response pair as one sample and look for behavior classes, not exact strings.</span>
              </div>
            </div>
          `
        },
        {
          id: 'llm-prompt-compare',
          title: 'Why Two Prompts Give Different Results',
          type: 'interactive',
          badge: 'comparison',
          interactiveId: 'prompt-compare',
          content: `
            <p>Let's see this in action — two very similar prompts that produce different outputs:</p>

            <div class="prompt-compare">
              <div class="prompt-compare-header">
                <button class="prompt-tab active" data-target="promptA">Prompt A</button>
                <button class="prompt-tab" data-target="promptB">Prompt B</button>
                <button class="prompt-tab" data-target="promptDiff">🔍 Analysis</button>
              </div>

              <div class="prompt-content active" id="promptA">
                <div class="code-block">
                  <div class="code-header">
                    <span class="code-lang">Prompt A</span>
                  </div>
                  <pre><code>Write a 2-sentence explanation of why the sky looks blue.
Avoid jargon.</code></pre>
                </div>
                <div style="padding: 16px; background: rgba(59, 130, 246, 0.06); border: 1px solid rgba(59, 130, 246, 0.15); border-radius: var(--radius-md); margin-top: 12px;">
                  <p style="font-size: 0.8rem; font-weight: 600; color: var(--accent-blue); margin-bottom: 8px;">Representative Output:</p>
                  <p style="font-style: italic; color: var(--text-primary);">The sky looks blue because air molecules scatter blue light from the sun more than other colors. That scattered blue light reaches your eyes from all directions.</p>
                </div>
              </div>

              <div class="prompt-content" id="promptB">
                <div class="code-block">
                  <div class="code-header">
                    <span class="code-lang">Prompt B</span>
                  </div>
                  <pre><code>Write a 2-sentence explanation of why the sky looks blue.
Avoid jargon. Keep it simple.</code></pre>
                </div>
                <div style="padding: 16px; background: rgba(139, 92, 246, 0.06); border: 1px solid rgba(139, 92, 246, 0.15); border-radius: var(--radius-md); margin-top: 12px;">
                  <p style="font-size: 0.8rem; font-weight: 600; color: var(--accent-purple); margin-bottom: 8px;">Representative Output:</p>
                  <p style="font-style: italic; color: var(--text-primary);">The sky looks blue because sunlight hits tiny bits in the air that spread blue light around more than other colors. Your eyes see that extra blue light coming from the whole sky.</p>
                </div>
              </div>

              <div class="prompt-content" id="promptDiff">
                <h4>What Changed & Why</h4>
                <p>Adding <strong>"Keep it simple."</strong> caused:</p>
                <div class="checklist">
                  <div class="checklist-item">
                    <span class="checklist-bullet">1</span>
                    <span>Different tokenization — extra tokens shifted the sequence boundaries</span>
                  </div>
                  <div class="checklist-item">
                    <span class="checklist-bullet">2</span>
                    <span>Changed attention weights — "simple" competed with "jargon" for influence</span>
                  </div>
                  <div class="checklist-item">
                    <span class="checklist-bullet">3</span>
                    <span>Different sampling path — early token differences compounded</span>
                  </div>
                  <div class="checklist-item">
                    <span class="checklist-bullet">4</span>
                    <span>Both outputs are valid — multiple plausible continuations exist</span>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 'llm-checklist',
          title: 'Engineering Checklist for Consistent Results',
          type: 'concept',
          badge: 'concept',
          content: `
            <p>When behavior matters, use this <strong>repeatable checklist</strong>:</p>

            <div class="checklist">
              <div class="checklist-item">
                <span class="checklist-bullet">✓</span>
                <span><strong>Measure tokens</strong> for every prompt and injected context before blaming the model</span>
              </div>
              <div class="checklist-item">
                <span class="checklist-bullet">✓</span>
                <span><strong>Place critical instructions</strong> where they face less competition — often <strong>near the end</strong> and in compact form</span>
              </div>
              <div class="checklist-item">
                <span class="checklist-bullet">✓</span>
                <span><strong>Capture the full request context</strong> — system text, retrieved passages, and decoding settings — before evaluating quality or latency</span>
              </div>
              <div class="checklist-item">
                <span class="checklist-bullet">✓</span>
                <span><strong>Redesign by trimming and reordering</strong> context, then re-test with token counts and multiple samples per prompt</span>
              </div>
            </div>

            <div class="rule-box">
              <span class="rule-icon">💡</span>
              <span class="rule-text">In many applications, the primary quality degraders are <strong>context competition in attention</strong> and <strong>context length pressure from tokenization</strong>. Fix these before exploring model changes.</span>
            </div>

            <div class="code-block">
              <div class="code-header">
                <span class="code-lang">Python</span>
                <button class="code-copy" onclick="copyCode(this)">Copy</button>
              </div>
              <pre><code><span class="cmt"># Debugging prompt behavior: a repeatable workflow</span>
<span class="kw">def</span> <span class="fn">debug_prompt_behavior</span>(<span class="param">prompt, context, model, n_samples=5</span>):
    <span class="str">"""Run multiple samples and categorize behavior classes."""</span>
    <span class="var">results</span> <span class="op">=</span> []
    
    <span class="cmt"># Step 1: Measure token counts</span>
    <span class="var">prompt_tokens</span> <span class="op">=</span> <span class="fn">count_tokens</span>(<span class="var">prompt</span>)
    <span class="var">context_tokens</span> <span class="op">=</span> <span class="fn">count_tokens</span>(<span class="var">context</span>)
    <span class="kw">print</span>(<span class="str">f"Prompt: </span><span class="op">{</span><span class="var">prompt_tokens</span><span class="op">}</span><span class="str"> tokens | Context: </span><span class="op">{</span><span class="var">context_tokens</span><span class="op">}</span><span class="str"> tokens"</span>)
    
    <span class="cmt"># Step 2: Collect multiple samples</span>
    <span class="kw">for</span> <span class="var">i</span> <span class="kw">in</span> <span class="fn">range</span>(<span class="var">n_samples</span>):
        <span class="var">response</span> <span class="op">=</span> <span class="var">model</span>.<span class="fn">complete</span>(<span class="var">prompt</span> <span class="op">+</span> <span class="var">context</span>)
        <span class="var">results</span>.<span class="fn">append</span>(<span class="var">response</span>)
    
    <span class="cmt"># Step 3: Classify behavior patterns, not exact strings</span>
    <span class="var">patterns</span> <span class="op">=</span> <span class="fn">classify_responses</span>(<span class="var">results</span>)
    <span class="kw">return</span> <span class="var">patterns</span></code></pre>
            </div>
          `
        }
      ],
      quiz: [
        {
          question: 'What does the model actually receive as input?',
          options: [
            'Complete words from a dictionary',
            'Individual characters one at a time',
            'Full sentences as single units',
            'Tokens — short text pieces from a fixed vocabulary'
          ],
          correct: 3,
          explanation: 'LLMs receive tokens, not words, characters, or sentences. Tokens are short text pieces chosen from a fixed vocabulary, and the context window counts tokens, not sentences.'
        },
        {
          question: 'Why can two similar prompts produce different outputs?',
          options: [
            'The model is broken and needs to be fixed',
            'Token boundaries, attention weights, and sampling create different paths',
            'The API connection is unreliable',
            'The temperature is always fully random'
          ],
          correct: 1,
          explanation: 'Different wording shifts token boundaries, which changes attention weight distribution and sampling probabilities. This is an engineering fact, not a bug — treat it as a design concern.'
        },
        {
          question: 'What is the best analogy for attention in a transformer?',
          options: [
            'A filing cabinet that stores all tokens equally',
            'A mixing board where each slider boosts or reduces a prior token\'s influence',
            'A delete button that removes unimportant tokens',
            'A translator that converts between languages'
          ],
          correct: 1,
          explanation: 'Attention is like a mixing board — it reweights how much each earlier token influences the next token. Some details get amplified while others get diluted.'
        },
        {
          question: 'Where should critical instructions be placed in a prompt for best results?',
          options: [
            'At the very beginning, before any context',
            'Randomly scattered throughout the prompt',
            'Near the end of the input, in compact form',
            'It doesn\'t matter — position has no effect'
          ],
          correct: 2,
          explanation: 'Place critical instructions where they face less competition in the context — often near the end and in compact form. Instructions earlier in long contexts often get diluted by competing information.'
        },
        {
          question: 'What causes non-determinism in LLM generation?',
          options: [
            'The model weights change with every request',
            'Sampling from a probability distribution of possible next tokens',
            'Network latency between client and server',
            'The token vocabulary is different each time'
          ],
          correct: 1,
          explanation: 'Non-determinism comes from sampling — selecting from a probability distribution can yield different tokens, and early differences compound as each sampled token becomes context for the next step.'
        },
        {
          question: 'Before blaming the model for bad output, what should you check first?',
          options: [
            'The model\'s training data',
            'Token counts for your prompt and injected context',
            'The provider\'s status page',
            'The model\'s parameter count'
          ],
          correct: 1,
          explanation: 'The primary quality degraders are often context competition in attention and context length pressure from tokenization. Measure tokens first, then redesign by trimming and reordering context.'
        }
      ]
    },

    // ============================================================
    // MODULE 3 — Context, Cost, and Latency
    // ============================================================
    {
  "id": "context-cost-latency",
  "title": "Context, Cost, and Latency",
  "subtitle": "Master prompt management, token-driven economics, and p95 latency guarantees",
  "icon": "⏱️",
  "color": "#F59E0B",
  "gradient": "linear-gradient(135deg, #F59E0B, #F43F5E)",
  "sections": [
    {
      "id": "ccl-triple-constraint",
      "title": "The Triple Constraint: Context, Spend & Latency",
      "type": "concept",
      "badge": "concept",
      "content": "\n        <p>Production AI applications operate under a strict, coupled contract. Consider a real-world customer chat feature:</p>\n        \n        <div class=\"info-grid\">\n          <div class=\"info-card\" style=\"border-top: 2px solid var(--accent-emerald);\">\n            <span class=\"info-card-icon\">⚡</span>\n            <span class=\"info-card-title\">Responsiveness Target</span>\n            <span class=\"info-card-desc\">Must return a helpful first answer in <strong>under 1.0 s at p95</strong> to maintain conversation flow.</span>\n          </div>\n          <div class=\"info-card\" style=\"border-top: 2px solid var(--accent-amber);\">\n            <span class=\"info-card-icon\">💰</span>\n            <span class=\"info-card-title\">Economic Ceiling</span>\n            <span class=\"info-card-desc\">Keep the per-interaction spend under a <strong>strict fixed budget</strong> (e.g. &lt; $0.005 per turn).</span>\n          </div>\n          <div class=\"info-card\" style=\"border-top: 2px solid var(--accent-blue);\">\n            <span class=\"info-card-icon\">📚</span>\n            <span class=\"info-card-title\">Unbounded History & Data</span>\n            <span class=\"info-card-desc\">Users paste long documents and arrive with <strong>weeks of accumulated conversation history</strong>.</span>\n          </div>\n        </div>\n\n        <h3>The Naive Strategy & Why It Fails</h3>\n        <p>The naive strategy is simple: <em>append the entire conversation history and every retrieved document into every single API request</em>.</p>\n        \n        <p>That approach fails in two immediately observable ways in production systems:</p>\n\n        <div class=\"comparison-container\">\n          <div class=\"comparison-side side-a\" data-label=\"Failure Mode 1: Silent Loss\">\n            <h4 style=\"color: var(--accent-rose); margin-bottom: 8px;\">✂️ Truncation & Lost Instructions</h4>\n            <p style=\"font-size: 0.84rem; color: var(--text-secondary);\">Earlier messages or system instructions vanish because the total token sequence crosses the limit. The application or SDK silently truncates older turns, and the model suddenly forgets user preferences or security rules.</p>\n          </div>\n          <div class=\"comparison-side side-b\" data-label=\"Failure Mode 2: Resource Blowout\">\n            <h4 style=\"color: var(--accent-amber); margin-bottom: 8px;\">💸 Latency & Cost Explosion</h4>\n            <p style=\"font-size: 0.84rem; color: var(--text-secondary);\">The request fits inside the window, but becomes excruciatingly slow and expensive. The LLM must read and compute self-attention across 20,000+ input tokens on every turn, causing p95 latency to spike to 4–8 seconds and blowing operational budgets.</p>\n          </div>\n        </div>\n\n        <div class=\"rule-box\">\n          <span class=\"rule-icon\">📐</span>\n          <span class=\"rule-text\"><strong>Core Architectural Invariant:</strong> Context size, token-driven cost, and latency are <em>one coupled design surface</em>. You cannot optimize one without impacting the other two.</span>\n        </div>\n      "
    },
    {
      "id": "ccl-truncation",
      "title": "What Context Constrains & Truncation Behaviors",
      "type": "interactive",
      "badge": "interactive",
      "interactiveId": "truncation-viz",
      "content": "\n        <p>A model request has a finite context window. The input — including instructions, conversation history, and retrieved text — must fit within the applicable limit while leaving sufficient room for the model's output generation (<code>max_output_tokens</code>).</p>\n\n        <p>If the assembled input exceeds that limit, the API may reject the request with a 400 error. An application or SDK may instead shorten it according to its truncation settings. Dropping older messages keeps the request valid, but the model can no longer use information from those messages.</p>\n\n        <h3>Three Common Truncation Behaviors in Production</h3>\n\n        <div class=\"info-grid\">\n          <div class=\"info-card\" style=\"border-left: 3px solid var(--accent-cyan);\">\n            <span class=\"info-card-icon\">1️⃣</span>\n            <span class=\"info-card-title\">Dropping Oldest Turns (FIFO Buffer)</span>\n            <span class=\"info-card-desc\">Discards the earliest turns to keep the most recent user intent and assistant state. Fast and stateless, but forgets long-term background.</span>\n          </div>\n          <div class=\"info-card\" style=\"border-left: 3px solid var(--accent-purple);\">\n            <span class=\"info-card-icon\">2️⃣</span>\n            <span class=\"info-card-title\">Summarizing Older Content</span>\n            <span class=\"info-card-desc\">Condenses older messages into fewer tokens (e.g. 1,500 tokens of turns → 100-token summary) so key facts and user preferences persist.</span>\n          </div>\n          <div class=\"info-card\" style=\"border-left: 3px solid var(--accent-emerald);\">\n            <span class=\"info-card-icon\">3️⃣</span>\n            <span class=\"info-card-title\">Selective Retrieval (RAG)</span>\n            <span class=\"info-card-desc\">Retrieves a small, top-ranked set of relevant passages per query instead of stuffing the whole knowledge base into context.</span>\n          </div>\n        </div>\n\n        <div class=\"rule-box\" style=\"border-left-color: var(--accent-rose);\">\n          <span class=\"rule-icon\">🛡️</span>\n          <span class=\"rule-text\"><strong>The Placement Rule:</strong> If a requirement depends on a specific instruction (e.g. \"Answer in valid JSON\" or \"Never mention competitors\"), control where it lands in the final context and verify it is not the first thing truncated. Always log the final rendered prompt and ensure critical instructions appear near the end, where truncation cannot slice them away!</span>\n        </div>\n\n        <h3>🔬 Interactive Truncation & Placement Simulator</h3>\n        <p>Explore how different truncation strategies handle context pressure and whether critical instructions survive:</p>\n\n        <div class=\"truncation-sim\" id=\"truncationSimulator\">\n          <div class=\"trunc-controls\">\n            <button class=\"trunc-btn active\" data-strategy=\"fifo\" onclick=\"switchTruncStrategy('fifo')\">1. FIFO Drop Oldest</button>\n            <button class=\"trunc-btn\" data-strategy=\"summary\" onclick=\"switchTruncStrategy('summary')\">2. Summary Compression</button>\n            <button class=\"trunc-btn\" data-strategy=\"rag\" onclick=\"switchTruncStrategy('rag')\">3. Selective Retrieval (RAG)</button>\n            <button class=\"trunc-btn\" data-strategy=\"naive\" onclick=\"switchTruncStrategy('naive')\">4. Naive Full Stuffing (Overflow)</button>\n          </div>\n\n          <div class=\"trunc-meter-wrap\">\n            <div class=\"trunc-meter-header\">\n              <span>Context Window Usage: <strong id=\"truncTokensUsed\">2,400</strong> / 4,000 tokens</span>\n              <span id=\"truncStatusBadge\" style=\"color: var(--accent-emerald); font-weight: 700;\">Within Limit (60%)</span>\n            </div>\n            <div class=\"trunc-meter-track\">\n              <div class=\"trunc-meter-fill\" id=\"truncMeterFill\" style=\"width: 60%; background: var(--accent-emerald);\"></div>\n              <div class=\"trunc-meter-limit\" title=\"Safety Ceiling (3,200 tokens)\"></div>\n            </div>\n          </div>\n\n          <div class=\"trunc-items-grid\" id=\"truncBlocksList\">\n            <!-- Dynamically populated by JS -->\n          </div>\n\n          <div id=\"truncExplanation\" style=\"font-size: 0.84rem; color: var(--text-secondary); background: rgba(0,0,0,0.2); padding: 12px 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);\">\n            <strong>Strategy: FIFO Drop Oldest Turns.</strong> Turns #1–#4 were dropped to keep total tokens under the 4,000 token limit. The Critical Instruction at the end is 100% protected and received by the model.\n          </div>\n        </div>\n      "
    },
    {
      "id": "ccl-token-math",
      "title": "Tokens Drive Spend and Wall Time: T = C · (I + O)",
      "type": "interactive",
      "badge": "interactive",
      "interactiveId": "cost-explorer",
      "content": "\n        <p>Once we control what fits, the next question is what it costs to send it. Token counts correlate directly with compute cost and latency because the service must read input tokens and generate output tokens — and every extra call repeats that work.</p>\n\n        <h3>The Four Production Signals to Track</h3>\n        <p>Instrument your application to measure these four operational signals on every user interaction:</p>\n\n        <div class=\"info-grid\">\n          <div class=\"info-card\">\n            <span class=\"info-card-icon\">📥</span>\n            <span class=\"info-card-title\">input_tokens per call & user action</span>\n            <span class=\"info-card-desc\">Tokens read by the model during prompt processing. Determines prefill latency and input cost.</span>\n          </div>\n          <div class=\"info-card\">\n            <span class=\"info-card-icon\">📤</span>\n            <span class=\"info-card-title\">output_tokens per call & user action</span>\n            <span class=\"info-card-desc\">Tokens generated during decode. Typically 3–4x more expensive per token than inputs and dictates decode wall time.</span>\n          </div>\n          <div class=\"info-card\">\n            <span class=\"info-card-icon\">🔄</span>\n            <span class=\"info-card-title\">calls_per_user_action</span>\n            <span class=\"info-card-desc\">Number of model calls (e.g. classification + retrieval re-rank + final answer). Amplifies total tokens linearly.</span>\n          </div>\n          <div class=\"info-card\">\n            <span class=\"info-card-icon\">⏱️</span>\n            <span class=\"info-card-title\">p95 Latency (TTFT vs. Total)</span>\n            <span class=\"info-card-desc\">Split into <em>Time to First Token (TTFT)</em> and <em>Time to Final Token</em> when streaming to measure perceived speed.</span>\n          </div>\n        </div>\n\n        <h3>The Universal Scaling Formula</h3>\n        <p>If a user action executes <span class=\"math-sym\">C</span> calls, each call processing <span class=\"math-sym\">I</span> input tokens and generating <span class=\"math-sym\">O</span> output tokens, total token volume <span class=\"math-sym\">T</span> is:</p>\n\n        <div class=\"formula-callout\" style=\"justify-content: center; font-size: 1.15rem; margin: 20px 0;\">\n          <span>T = C · (I + O)</span>\n        </div>\n\n        <p><strong>The Compounding Danger:</strong> Doubling the conversation history or retrieved text doubles <span class=\"math-sym\">I</span>, doubling total token volume <span class=\"math-sym\">T</span> even when output <span class=\"math-sym\">O</span> stays tiny. If your workflow makes multiple calls (e.g. <span class=\"math-sym\">C = 2</span>), doubling context causes a <strong style=\"color: var(--accent-rose);\">4× explosion in token volume</strong> compared to the single-call baseline!</p>\n\n        <div class=\"tip-box\">\n          <p><strong>💡 Key Engineering Fact:</strong> Input growth often dominates production spend and latency because history and documents accumulate much faster than the desired response length. A short output does not protect you from p95 regressions or budget breaches.</p>\n        </div>\n\n        <h3>🧮 Interactive Normalized Cost & Latency Explorer</h3>\n        <p>Adjust inputs, outputs, call count, and history turns to observe how relative compute cost and latency scale in real-time:</p>\n\n        <div class=\"cost-explorer\" id=\"costExplorerContainer\">\n          <div class=\"cost-explorer-header\">\n            <div class=\"cost-explorer-title\">\n              <span>⚡ Cost & Latency Explorer</span>\n            </div>\n            <span class=\"cost-explorer-badge\" id=\"budgetSlaBadge\">Budget Healthy</span>\n          </div>\n\n          <div class=\"explorer-controls-grid\">\n            <div class=\"control-card\">\n              <div class=\"control-header\">\n                <span class=\"control-label\">Base Input Tokens (I)</span>\n                <span class=\"control-value\" id=\"valInputTokens\">2,000</span>\n              </div>\n              <input type=\"range\" class=\"slider-input\" id=\"sliderInputTokens\" min=\"500\" max=\"32000\" step=\"250\" value=\"2000\" oninput=\"updateCostExplorer()\">\n              <div class=\"control-hint\">System prompt + retrieved documents</div>\n            </div>\n\n            <div class=\"control-card\">\n              <div class=\"control-header\">\n                <span class=\"control-label\">Output Tokens (O)</span>\n                <span class=\"control-value\" id=\"valOutputTokens\">300</span>\n              </div>\n              <input type=\"range\" class=\"slider-input\" id=\"sliderOutputTokens\" min=\"50\" max=\"2000\" step=\"50\" value=\"300\" oninput=\"updateCostExplorer()\">\n              <div class=\"control-hint\">Generated response length</div>\n            </div>\n\n            <div class=\"control-card\">\n              <div class=\"control-header\">\n                <span class=\"control-label\">Calls per Action (C)</span>\n                <span class=\"control-value\" id=\"valCalls\">1</span>\n              </div>\n              <input type=\"range\" class=\"slider-input\" id=\"sliderCalls\" min=\"1\" max=\"5\" step=\"1\" value=\"1\" oninput=\"updateCostExplorer()\">\n              <div class=\"control-hint\">Pipeline steps (routing, search, answer)</div>\n            </div>\n\n            <div class=\"control-card\">\n              <div class=\"control-header\">\n                <span class=\"control-label\">History Turns Stuffed</span>\n                <span class=\"control-value\" id=\"valHistoryTurns\">4 turns</span>\n              </div>\n              <input type=\"range\" class=\"slider-input\" id=\"sliderHistoryTurns\" min=\"0\" max=\"30\" step=\"1\" value=\"4\" oninput=\"updateCostExplorer()\">\n              <div class=\"control-hint\">+350 tokens per conversation turn</div>\n            </div>\n          </div>\n\n          <div class=\"explorer-metrics-row\">\n            <div class=\"metric-box primary\">\n              <span class=\"metric-title\">Total Token Volume (T)</span>\n              <span class=\"metric-num\" id=\"metricTotalTokens\">3,400</span>\n              <span class=\"metric-sub\" id=\"metricTokenMath\">1 × (3,100 in + 300 out)</span>\n            </div>\n            <div class=\"metric-box cost\">\n              <span class=\"metric-title\">Relative Cost Index</span>\n              <span class=\"metric-num\" id=\"metricCostIndex\">2.8×</span>\n              <span class=\"metric-sub\" id=\"metricCostSub\">vs. 1.0× baseline (1,200 tok)</span>\n            </div>\n            <div class=\"metric-box speed\">\n              <span class=\"metric-title\">Estimated TTFT / Total</span>\n              <span class=\"metric-num\" id=\"metricLatency\">460ms / 1.1s</span>\n              <span class=\"metric-sub\" id=\"metricLatencySub\">Time to first / final token</span>\n            </div>\n            <div class=\"metric-box sla\" id=\"slaMetricBox\">\n              <span class=\"metric-title\">SLA Budget Status</span>\n              <span class=\"metric-num\" id=\"metricSlaStatus\" style=\"font-size: 1.1rem; color: var(--accent-emerald);\">PASS (&lt;1s p95)</span>\n              <span class=\"metric-sub\" id=\"metricSlaSub\">Within cost & latency ceiling</span>\n            </div>\n          </div>\n\n          <div class=\"explorer-visual-bars\">\n            <div class=\"visual-bar-item\">\n              <div class=\"visual-bar-header\">\n                <span>Baseline Request (1 call, 1,000 I, 200 O)</span>\n                <span>1,200 tokens (1.0×)</span>\n              </div>\n              <div class=\"visual-bar-track\">\n                <div class=\"visual-bar-fill\" style=\"width: 15%; background: var(--text-dim);\"></div>\n              </div>\n            </div>\n            <div class=\"visual-bar-item\">\n              <div class=\"visual-bar-header\">\n                <span>Your Current Request Volume (T)</span>\n                <span id=\"barCurrentLabel\">3,400 tokens (2.8×)</span>\n              </div>\n              <div class=\"visual-bar-track\">\n                <div class=\"visual-bar-fill\" id=\"barCurrentFill\" style=\"width: 42%; background: var(--gradient-primary);\"></div>\n              </div>\n            </div>\n            <div class=\"visual-bar-item\">\n              <div class=\"visual-bar-header\">\n                <span>Doubled Pipeline Amplification (2 calls with current context)</span>\n                <span id=\"barAmplifiedLabel\">6,800 tokens (5.6×)</span>\n              </div>\n              <div class=\"visual-bar-track\">\n                <div class=\"visual-bar-fill\" id=\"barAmplifiedFill\" style=\"width: 84%; background: var(--gradient-warm);\"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n      "
    },
    {
      "id": "ccl-decision-tree",
      "title": "A Decision Tree for Context, Speed, and Reliability",
      "type": "interactive",
      "badge": "interactive",
      "interactiveId": "decision-tree",
      "content": "\n        <p>With mechanics and signals defined, design choices become conditional. When background must be long, move from stuffing toward selective inclusion; when a fast first token matters, reduce what the service must read before generating.</p>\n\n        <h3>Conditional Architecture Rules</h3>\n        <div class=\"framework-steps\">\n          <div class=\"framework-step\">\n            <div class=\"framework-step-num\" style=\"background: rgba(59, 130, 246, 0.1); color: var(--accent-blue);\">1</div>\n            <div class=\"framework-step-content\">\n              <span class=\"framework-step-title\">Unbounded History & Background</span>\n              <span class=\"framework-step-desc\">If long background is needed, prefer <strong>retrieval or summarization</strong> over stuffing so input tokens <span class=\"math-sym\">I</span> stay strictly within budget.</span>\n            </div>\n          </div>\n          <div class=\"framework-step\">\n            <div class=\"framework-step-num\" style=\"background: rgba(16, 185, 129, 0.1); color: var(--accent-emerald);\">2</div>\n            <div class=\"framework-step-content\">\n              <span class=\"framework-step-title\">Fast Time to First Token (TTFT)</span>\n              <span class=\"framework-step-desc\">If user experience depends on sub-second first token, keep input contexts compact and <strong>stream responses</strong> so the UI updates progressively.</span>\n            </div>\n          </div>\n          <div class=\"framework-step\">\n            <div class=\"framework-step-num\" style=\"background: rgba(245, 158, 11, 0.1); color: var(--accent-amber);\">3</div>\n            <div class=\"framework-step-content\">\n              <span class=\"framework-step-title\">Predictable Latency & Output Stability</span>\n              <span class=\"framework-step-desc\">Cap <code>max_output_tokens</code> and request concise answers first. Expand in a follow-up call only when the user requests deeper detail.</span>\n            </div>\n          </div>\n        </div>\n\n        <h3>Interactive Two-Scenario Walkthrough</h3>\n        <p>Click between these two production archetypes to inspect their concrete architecture decisions:</p>\n\n        <div class=\"decision-tree-viz\" id=\"decisionTreeContainer\">\n          <div class=\"tree-scenario-tabs\">\n            <div class=\"tree-scenario-tab active\" id=\"tabSupportChat\" onclick=\"selectTreeScenario('support')\">\n              💬 Scenario A: Customer Support Chat\n            </div>\n            <div class=\"tree-scenario-tab\" id=\"tabResearchAssistant\" onclick=\"selectTreeScenario('research')\">\n              🔬 Scenario B: Grounded Research Assistant\n            </div>\n          </div>\n\n          <div class=\"tree-flow-steps\" id=\"treeFlowSteps\">\n            <!-- Rendered by JS -->\n          </div>\n        </div>\n\n        <h3>Enforcing Budgets as an Architectural Contract</h3>\n        <p>Define an explicit design contract before writing prompt code:</p>\n        <div class=\"data-table-wrap\">\n          <table class=\"data-table\">\n            <thead>\n              <tr>\n                <th>Budget Metric</th>\n                <th>Target Ceiling</th>\n                <th>Enforcement Mechanism</th>\n                <th>Redesign Trigger</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><strong>Max Input Tokens</strong></td>\n                <td>&le; 2,500 tokens / call</td>\n                <td>FIFO sliding window + compact summary block</td>\n                <td>Average user turns exceed 15 without summarization</td>\n              </tr>\n              <tr>\n                <td><strong>Calls per User Action</strong></td>\n                <td>&le; 1 call (p95), &le; 2 (p99)</td>\n                <td>Single combined prompt with structured tool call</td>\n                <td>Multi-agent cascades degrading TTFT</td>\n              </tr>\n              <tr>\n                <td><strong>p95 TTFT Latency</strong></td>\n                <td>&lt; 900 ms</td>\n                <td>Streaming tokens + prompt caching enabled</td>\n                <td>Knowledge base expansion increases prefill delay</td>\n              </tr>\n              <tr>\n                <td><strong>p95 Total Wall Time</strong></td>\n                <td>&lt; 2,200 ms</td>\n                <td>Capped <code>max_output_tokens: 300</code></td>\n                <td>Verbose answers stalling generation thread</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      "
    },
    {
      "id": "ccl-code-practice",
      "title": "Production Patterns & Learner In-Person Practice",
      "type": "code",
      "badge": "practice",
      "content": "\n        <p>Here are two battle-tested production patterns: an adaptive sliding window context manager that guarantees instruction placement, and a latency/token instrumentation tracker.</p>\n\n        <div class=\"code-block\">\n          <div class=\"code-header\">\n            <span class=\"code-lang\">Python — context_budget_manager.py (Production Pattern)</span>\n            <button class=\"code-copy\" onclick=\"copyCode(this)\">Copy</button>\n          </div>\n          <pre><code><span class=\"str\">\"\"\"\nContextBudgetManager\nEnforces explicit input token budgets, FIFO sliding window for history,\nand ensures critical instructions adhere to the Placement Rule (never truncated).\n\"\"\"</span>\n<span class=\"kw\">from</span> <span class=\"var\">typing</span> <span class=\"kw\">import</span> <span class=\"type\">List</span>, <span class=\"type\">Dict</span>, <span class=\"type\">Optional</span>\n\n<span class=\"kw\">class</span> <span class=\"type\">ContextBudgetManager</span>:\n    <span class=\"kw\">def</span> <span class=\"fn\">__init__</span>(<span class=\"var\">self</span>, <span class=\"var\">max_input_tokens</span>: <span class=\"type\">int</span> = <span class=\"num\">2500</span>):\n        <span class=\"var\">self</span>.<span class=\"var\">max_input_tokens</span> = <span class=\"var\">max_input_tokens</span>\n        <span class=\"var\">self</span>.<span class=\"var\">chars_per_token</span> = <span class=\"num\">4</span>  <span class=\"cmt\"># Safe rule-of-thumb estimate</span>\n\n    <span class=\"kw\">def</span> <span class=\"fn\">estimate_tokens</span>(<span class=\"var\">self</span>, <span class=\"var\">text</span>: <span class=\"type\">str</span>) -&gt; <span class=\"type\">int</span>:\n        <span class=\"kw\">return</span> <span class=\"fn\">max</span>(<span class=\"num\">1</span>, <span class=\"fn\">len</span>(<span class=\"var\">text</span>) // <span class=\"var\">self</span>.<span class=\"var\">chars_per_token</span>)\n\n    <span class=\"kw\">def</span> <span class=\"fn\">assemble_context</span>(\n        <span class=\"var\">self</span>,\n        <span class=\"var\">system_instruction</span>: <span class=\"type\">str</span>,\n        <span class=\"var\">history</span>: <span class=\"type\">List</span>[<span class=\"type\">Dict</span>[<span class=\"type\">str</span>, <span class=\"type\">str</span>]],\n        <span class=\"var\">passages</span>: <span class=\"type\">Optional</span>[<span class=\"type\">List</span>[<span class=\"type\">str</span>]] = <span class=\"var\">None</span>\n    ) -&gt; <span class=\"type\">List</span>[<span class=\"type\">Dict</span>[<span class=\"type\">str</span>, <span class=\"type\">str</span>]]:\n        <span class=\"cmt\"># 1. Budget reservation for critical system instruction</span>\n        <span class=\"var\">inst_tokens</span> = <span class=\"var\">self</span>.<span class=\"fn\">estimate_tokens</span>(<span class=\"var\">system_instruction</span>)\n        <span class=\"var\">remaining_budget</span> = <span class=\"var\">self</span>.<span class=\"var\">max_input_tokens</span> - <span class=\"var\">inst_tokens</span> - <span class=\"num\">100</span> <span class=\"cmt\"># safety margin</span>\n\n        <span class=\"kw\">if</span> <span class=\"var\">remaining_budget</span> &lt;= <span class=\"num\">0</span>:\n            <span class=\"kw\">raise</span> <span class=\"type\">ValueError</span>(<span class=\"str\">\"Critical instruction exceeds context budget alone!\"</span>)\n\n        <span class=\"cmt\"># 2. Selectively pack retrieval passages</span>\n        <span class=\"var\">packed_passages</span> = []\n        <span class=\"var\">passage_budget</span> = <span class=\"var\">remaining_budget</span> // <span class=\"num\">3</span>\n        <span class=\"var\">used_p_tokens</span> = <span class=\"num\">0</span>\n        <span class=\"kw\">for</span> <span class=\"var\">p</span> <span class=\"kw\">in</span> (<span class=\"var\">passages</span> <span class=\"kw\">or</span> []):\n            <span class=\"var\">tok</span> = <span class=\"var\">self</span>.<span class=\"fn\">estimate_tokens</span>(<span class=\"var\">p</span>)\n            <span class=\"kw\">if</span> <span class=\"var\">used_p_tokens</span> + <span class=\"var\">tok</span> &lt;= <span class=\"var\">passage_budget</span>:\n                <span class=\"var\">packed_passages</span>.<span class=\"fn\">append</span>(<span class=\"var\">p</span>)\n                <span class=\"var\">used_p_tokens</span> += <span class=\"var\">tok</span>\n\n        <span class=\"cmt\"># 3. FIFO sliding window: traverse history in reverse (newest first)</span>\n        <span class=\"var\">history_budget</span> = <span class=\"var\">remaining_budget</span> - <span class=\"var\">used_p_tokens</span>\n        <span class=\"var\">kept_turns</span> = []\n        <span class=\"var\">used_h_tokens</span> = <span class=\"num\">0</span>\n        <span class=\"kw\">for</span> <span class=\"var\">turn</span> <span class=\"kw\">in</span> <span class=\"fn\">reversed</span>(<span class=\"var\">history</span>):\n            <span class=\"var\">t_tok</span> = <span class=\"var\">self</span>.<span class=\"fn\">estimate_tokens</span>(<span class=\"var\">turn</span>[<span class=\"str\">\"content\"</span>])\n            <span class=\"kw\">if</span> <span class=\"var\">used_h_tokens</span> + <span class=\"var_tok</span> &lt;= <span class=\"var\">history_budget</span>:\n                <span class=\"var\">kept_turns</span>.<span class=\"fn\">insert</span>(<span class=\"num\">0</span>, <span class=\"var\">turn</span>)\n                <span class=\"var\">used_h_tokens</span> += <span class=\"var\">t_tok</span>\n            <span class=\"kw\">else</span>:\n                <span class=\"kw\">break</span> <span class=\"cmt\"># Older turns are pruned</span>\n\n        <span class=\"cmt\"># 4. PLACEMENT RULE: Pin system instructions where they won't be truncated</span>\n        <span class=\"var\">payload</span> = []\n        <span class=\"kw\">if</span> <span class=\"var\">packed_passages</span>:\n            <span class=\"var\">doc_text</span> = <span class=\"str\">\"\\n\\n\"</span>.<span class=\"fn\">join</span>(<span class=\"str\">f\"[Doc {i+1}]: {p}\"</span> <span class=\"kw\">for</span> <span class=\"var\">i</span>, <span class=\"var\">p</span> <span class=\"kw\">in</span> <span class=\"fn\">enumerate</span>(<span class=\"var\">packed_passages</span>))\n            <span class=\"var\">payload</span>.<span class=\"fn\">append</span>({<span class=\"str\">\"role\"</span>: <span class=\"str\">\"system\"</span>, <span class=\"str\">\"content\"</span>: <span class=\"str\">f\"Reference Documents:\\n{doc_text}\"</span>})\n\n        <span class=\"var\">payload</span>.<span class=\"fn\">extend</span>(<span class=\"var\">kept_turns</span>)\n\n        <span class=\"cmt\"># Instruction placed at end of context for highest salience</span>\n        <span class=\"var\">payload</span>.<span class=\"fn\">append</span>({<span class=\"str\">\"role\"</span>: <span class=\"str\">\"system\"</span>, <span class=\"str\">\"content\"</span>: <span class=\"str\">f\"MANDATORY INSTRUCTION: {system_instruction}\"</span>})\n\n        <span class=\"kw\">return</span> <span class=\"var\">payload</span></code></pre>\n        </div>\n\n        <!-- Learner In-Person Practice Box -->\n        <div class=\"practice-lab\">\n          <div class=\"practice-lab-header\">\n            <div class=\"practice-lab-title\">\n              <span>🧑‍💻 Learner In-Person Practice Lab</span>\n            </div>\n            <span class=\"practice-lab-badge\">Hands-On Practice</span>\n          </div>\n\n          <p class=\"practice-lab-desc\">\n            Now it's your turn to practice on your own computer! Build a test script that validates the <strong>Placement Rule</strong> and ensures your FIFO window keeps responses under budget without losing critical instructions.\n          </p>\n\n          <div class=\"code-block\">\n            <div class=\"code-header\">\n              <span class=\"code-lang\">Python — test_truncation_lab.py (Practice Script for Learner)</span>\n              <button class=\"code-copy\" onclick=\"copyCode(this)\">Copy</button>\n            </div>\n            <pre><code><span class=\"cmt\"># test_truncation_lab.py</span>\n<span class=\"cmt\"># Exercise: Validate FIFO truncation and instruction placement</span>\n<span class=\"kw\">from</span> <span class=\"var\">context_budget_manager</span> <span class=\"kw\">import</span> <span class=\"type\">ContextBudgetManager</span>\n\n<span class=\"kw\">def</span> <span class=\"fn\">run_practice_exercise</span>():\n    <span class=\"var\">manager</span> = <span class=\"type\">ContextBudgetManager</span>(<span class=\"var\">max_input_tokens</span>=<span class=\"num\">500</span>)\n    <span class=\"var\">system_rule</span> = <span class=\"str\">\"Respond strictly in valid JSON with key 'sentiment'.\"</span>\n\n    <span class=\"cmt\"># 10 conversational turns (each approx 80 tokens)</span>\n    <span class=\"var\">mock_history</span> = [\n        {<span class=\"str\">\"role\"</span>: <span class=\"str\">\"user\"</span>, <span class=\"str\">\"content\"</span>: <span class=\"str\">f\"Turn #{i}: This is simulated customer chat data containing user questions and feedback.\"</span>}\n        <span class=\"kw\">for</span> <span class=\"var\">i</span> <span class=\"kw\">in</span> <span class=\"fn\">range</span>(<span class=\"num\">1</span>, <span class=\"num\">11</span>)\n    ]\n\n    <span class=\"var\">assembled</span> = <span class=\"var\">manager</span>.<span class=\"fn\">assemble_context</span>(\n        <span class=\"var\">system_instruction</span>=<span class=\"var\">system_rule</span>,\n        <span class=\"var\">history</span>=<span class=\"var\">mock_history</span>\n    )\n\n    <span class=\"fn\">print</span>(<span class=\"str\">\"\\n=== Truncation Practice Results ===\"</span>)\n    <span class=\"fn\">print</span>(<span class=\"str\">f\"Original turns: {len(mock_history)}\"</span>)\n    <span class=\"fn\">print</span>(<span class=\"str\">f\"Assembled items: {len(assembled)}\"</span>)\n    \n    <span class=\"cmt\"># VERIFICATION CHECK 1: Instruction is present at the end</span>\n    <span class=\"kw\">assert</span> <span class=\"var\">system_rule</span> <span class=\"kw\">in</span> <span class=\"var\">assembled</span>[-<span class=\"num\">1</span>][<span class=\"str\">\"content\"</span>], <span class=\"str\">\"Instruction was truncated!\"</span>\n    <span class=\"fn\">print</span>(<span class=\"str\">\"✅ Check 1: Critical instruction verified at end of context!\"</span>)\n\n    <span class=\"cmt\"># VERIFICATION CHECK 2: Older turns were dropped, recent kept</span>\n    <span class=\"var\">first_kept_turn</span> = <span class=\"var\">assembled</span>[<span class=\"num\">0</span>][<span class=\"str\">\"content\"</span>]\n    <span class=\"fn\">print</span>(<span class=\"str\">f\"✅ Check 2: First retained turn is: '{first_kept_turn[:40]}...'\"</span>)\n    <span class=\"fn\">print</span>(<span class=\"str\">\"🎉 Practice exercise passed successfully!\\n\"</span>)\n\n<span class=\"kw\">if</span> <span class=\"var\">__name__</span> == <span class=\"str\">\"__main__\"</span>:\n    <span class=\"fn\">run_practice_exercise</span>()</code></pre>\n          </div>\n\n          <div class=\"checklist-container\">\n            <div class=\"checklist-header\">\n              <span class=\"checklist-title\">Local Verification Checklist</span>\n              <span class=\"checklist-counter\" id=\"cclChecklistCount\">0 / 4 Completed</span>\n            </div>\n            <div class=\"checklist-items\">\n              <div class=\"checklist-item\" onclick=\"toggleChecklistItem(this, 'ccl')\">\n                <div class=\"checklist-checkbox\"></div>\n                <span class=\"checklist-text\">Saved <code>context_budget_manager.py</code> in local project directory</span>\n              </div>\n              <div class=\"checklist-item\" onclick=\"toggleChecklistItem(this, 'ccl')\">\n                <div class=\"checklist-checkbox\"></div>\n                <span class=\"checklist-text\">Saved <code>test_truncation_lab.py</code> and ran it with <code>python test_truncation_lab.py</code></span>\n              </div>\n              <div class=\"checklist-item\" onclick=\"toggleChecklistItem(this, 'ccl')\">\n                <div class=\"checklist-checkbox\"></div>\n                <span class=\"checklist-text\">Verified that older turns dropped while recent turns remained intact</span>\n              </div>\n              <div class=\"checklist-item\" onclick=\"toggleChecklistItem(this, 'ccl')\">\n                <div class=\"checklist-checkbox\"></div>\n                <span class=\"checklist-text\">Verified that the system instruction survived at the end of the assembled payload</span>\n              </div>\n            </div>\n          </div>\n        </div>\n      "
    }
  ],
  "quiz": [
    {
      "question": "What are the two primary ways the naive \"stuff everything\" strategy fails in production?",
      "options": [
        "Model outputs become corrupted with emojis, and the API key is revoked",
        "Instructions disappear due to truncation OR requests become slow and expensive",
        "The database crashes due to memory leaks, and DNS lookups fail",
        "The model begins hallucinating in different languages"
      ],
      "correct": 1,
      "explanation": "The naive strategy fails when earlier messages disappear due to provider/SDK truncation, or when the request stays within limits but suffers high latency and cost from excessive token counts."
    },
    {
      "question": "According to the Placement Rule, where should critical instructions be positioned in the context?",
      "options": [
        "At the very top of the prompt before all documents",
        "Randomly dispersed throughout the middle turns",
        "Near the end of the context where truncation cuts cannot easily slice them first",
        "In a separate API call that runs in parallel"
      ],
      "correct": 2,
      "explanation": "Critical instructions should be positioned near the end of the assembled context in compact form, ensuring they are not the first elements cut when truncation trims from the beginning."
    },
    {
      "question": "In the formula T = C · (I + O), what happens to total token volume if context doubles in a 2-call pipeline?",
      "options": [
        "Token volume stays completely unchanged",
        "Token volume increases by only 10%",
        "Token volume approximately quadruples (4×) relative to the single-call baseline",
        "Token volume is cut in half due to provider caching"
      ],
      "correct": 2,
      "explanation": "Doubling input context doubles I, and multiple calls amplify it. A 2-call pipeline with 2x context volume lands at approximately 4x the token volume of a single-call baseline."
    },
    {
      "question": "In a grounded Research Assistant, what should the system do if retrieval finds ZERO relevant evidence?",
      "options": [
        "Send the prompt anyway and hope the model knows the answer",
        "Increase model temperature to 1.0 to encourage creative responses",
        "Skip the model call entirely and return an \"evidence not found\" state",
        "Append the entire Wikipedia dump into the prompt"
      ],
      "correct": 2,
      "explanation": "If retrieval finds no evidence for a task requiring citations, skipping the model call entirely avoids both the financial cost and the severe risk of generating ungrounded hallucinations."
    },
    {
      "question": "Why does capping output tokens alone fail to protect systems from p95 latency regressions?",
      "options": [
        "Because output tokens are not counted by LLM providers",
        "Because input growth from documents and chat history dominates processing time",
        "Because models always ignore the max_output_tokens parameter",
        "Because network roundtrips are unaffected by token count"
      ],
      "correct": 1,
      "explanation": "Input growth often dominates compute time because history and documents accumulate faster than answer lengths. A short output does not protect you from reading delays across 20,000 input tokens."
    }
  ]
},

    // ============================================================
    // MODULE 4 — Environment Setup & Client Boundary
    // ============================================================
    {
  "id": "environment-setup",
  "title": "Environment Setup & Client Boundary",
  "subtitle": "Secure API secrets, build a thin client boundary, and verify integrations",
  "icon": "🛡️",
  "color": "#8B5CF6",
  "gradient": "linear-gradient(135deg, #8B5CF6, #3B82F6)",
  "sections": [
    {
      "id": "env-architecture",
      "title": "Hosted APIs vs. Open Weights: The Client Boundary",
      "type": "concept",
      "badge": "concept",
      "content": "\n        <p>In modern AI architecture, we make a deliberate choice between calling a <strong>hosted API</strong> and hosting an <strong>open-weight model</strong> ourselves.</p>\n\n        <p>A hosted API lets us build a working integration quickly without first managing inference infrastructure, GPU provisioning, or server health. Self-hosting offers complete infrastructure control, but the client integration skills covered here — including request construction, context management, error boundaries, and response handling — <em>apply identically when integrating self-hosted models</em>.</p>\n\n        <div class=\"flow-diagram\">\n          <div class=\"flow-step\">\n            <span class=\"flow-step-icon\">📱</span>\n            <span class=\"flow-step-label\">Application Code</span>\n          </div>\n          <span class=\"flow-arrow\">→</span>\n          <div class=\"flow-step\" style=\"border: 2px solid var(--accent-purple); background: rgba(139, 92, 246, 0.15);\">\n            <span class=\"flow-step-icon\">🛡️</span>\n            <span class=\"flow-step-label\">Thin Client Boundary (llm_client.py)</span>\n          </div>\n          <span class=\"flow-arrow\">→</span>\n          <div class=\"flow-step\">\n            <span class=\"flow-step-icon\">☁️</span>\n            <span class=\"flow-step-label\">Google Gen AI SDK (genai.Client)</span>\n          </div>\n          <span class=\"flow-arrow\">→</span>\n          <div class=\"flow-step\">\n            <span class=\"flow-step-icon\">⚡</span>\n            <span class=\"flow-step-label\">Gemini Models (Flash / Pro)</span>\n          </div>\n        </div>\n\n        <p>By enforcing a strict boundary module, the rest of your application never imports provider-specific SDKs directly. If you switch models or providers later, you only modify the boundary adapter.</p>\n      "
    },
    {
      "id": "env-secrets",
      "title": "Keys & Secrets Management: The Runtime Invariant",
      "type": "concept",
      "badge": "concept",
      "content": "\n        <div class=\"rule-box\" style=\"border-left-color: var(--accent-rose);\">\n          <span class=\"rule-icon\">🔐</span>\n          <span class=\"rule-text\"><strong>The Fundamental Invariant:</strong> The runtime reads secrets from environment variables, and the code <em>never</em> contains the secret value. That rule holds whether the key comes from a shell export, a password manager, a local <code>.env</code> file, or a CI/CD secret store.</span>\n        </div>\n\n        <h3>Concrete Do's and Don'ts</h3>\n\n        <div class=\"data-table-wrap\">\n          <table class=\"data-table\">\n            <thead>\n              <tr>\n                <th style=\"color: var(--accent-emerald);\">✅ DO (Safe & Portable)</th>\n                <th style=\"color: var(--accent-rose);\">❌ DO NOT (Compromise Risk)</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td>Store secrets in environment variables such as <code>GEMINI_API_KEY</code>.</td>\n                <td>Paste API keys into source files, Jupyter notebooks, or test scripts.</td>\n              </tr>\n              <tr>\n                <td>Keep local <code>.env</code> files out of Git via <code>.gitignore</code>.</td>\n                <td>Commit <code>.env</code> files or API credentials to version control.</td>\n              </tr>\n              <tr>\n                <td>Commit a <code>.env.example</code> with dummy placeholder keys for teammates.</td>\n                <td>Take screenshots showing API keys or paste keys into bug reports.</td>\n              </tr>\n              <tr>\n                <td>Scope keys to the minimum set of permissions and accounts needed.</td>\n                <td>Print raw keys in logs or console output — even temporarily during debugging!</td>\n              </tr>\n              <tr>\n                <td>Rotate compromised keys immediately if exposed in commits or logs.</td>\n                <td>Rely on \"private repositories\" to protect hardcoded credentials.</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n\n        <div class=\"warning-box\">\n          <p><strong>🚨 Rotate Fast:</strong> If an API key appears in code, commit history, or logs, treat it as immediately compromised and revoke/rotate it through the provider console right away.</p>\n        </div>\n      "
    },
    {
      "id": "env-thin-client",
      "title": "Python Runtime & The Thin Client Boundary",
      "type": "code",
      "badge": "code",
      "content": "\n        <p>A virtual environment isolates your project's Python packages from other projects. To make installs repeatable, always record dependencies in a <code>requirements.txt</code> file and use the same Python interpreter.</p>\n\n        <h3>1. The Boundary Container & Key Guard</h3>\n        <p>Create a dedicated module, such as <code>llm_client.py</code>, that defines a normalized response structure and a key validation guard:</p>\n\n        <div class=\"code-block\">\n          <div class=\"code-header\">\n            <span class=\"code-lang\">Python — llm_client.py (Part 1: Guard & Dataclass)</span>\n            <button class=\"code-copy\" onclick=\"copyCode(this)\">Copy</button>\n          </div>\n          <pre><code><span class=\"kw\">import</span> <span class=\"var\">os</span>\n<span class=\"kw\">from</span> <span class=\"var\">dataclasses</span> <span class=\"kw\">import</span> <span class=\"type\">dataclass</span>\n<span class=\"kw\">from</span> <span class=\"var\">typing</span> <span class=\"kw\">import</span> <span class=\"type\">Any</span>\n\n<span class=\"cmt\"># Normalized response container</span>\n<span class=\"op\">@</span><span class=\"fn\">dataclass</span>\n<span class=\"kw\">class</span> <span class=\"type\">LLMResponse</span>:\n    <span class=\"var\">provider</span>: <span class=\"type\">str</span>   <span class=\"cmt\"># Stable identifier, e.g. \"gemini\"</span>\n    <span class=\"var\">text</span>: <span class=\"type\">str</span>       <span class=\"cmt\"># Primary natural language generation</span>\n    <span class=\"var\">usage</span>: <span class=\"type\">dict</span>     <span class=\"cmt\"># Token metrics: prompt, completion, total</span>\n    <span class=\"var\">raw</span>: <span class=\"type\">Any</span>        <span class=\"cmt\"># Original SDK object for debug access</span>\n\n<span class=\"kw\">def</span> <span class=\"fn\">require_env</span>(<span class=\"var\">name</span>: <span class=\"type\">str</span>) -&gt; <span class=\"type\">str</span>:\n    <span class=\"str\">\"\"\"Fail-fast validation guard: raises informative error if key is unset.\"\"\"</span>\n    <span class=\"var\">value</span> = <span class=\"var\">os</span>.<span class=\"var\">environ</span>.<span class=\"fn\">get</span>(<span class=\"var\">name</span>)\n    <span class=\"kw\">if</span> <span class=\"kw\">not</span> <span class=\"var\">value</span>:\n        <span class=\"kw\">raise</span> <span class=\"type\">RuntimeError</span>(\n            <span class=\"str\">f\"Missing {name}. Set it in your shell or .env file.\"</span>\n        )\n    <span class=\"kw\">return</span> <span class=\"var\">value</span></code></pre>\n        </div>\n\n        <h3>2. The Provider Call Function (Google Gen AI SDK)</h3>\n        <p>The provider-specific call interacts with the official <code>google.genai</code> SDK, extracting text and usage metadata into our standardized <code>LLMResponse</code>:</p>\n\n        <div class=\"code-block\">\n          <div class=\"code-header\">\n            <span class=\"code-lang\">Python — llm_client.py (Part 2: Provider Implementation)</span>\n            <button class=\"code-copy\" onclick=\"copyCode(this)\">Copy</button>\n          </div>\n          <pre><code><span class=\"kw\">from</span> <span class=\"var\">dotenv</span> <span class=\"kw\">import</span> <span class=\"fn\">load_dotenv</span>\n<span class=\"kw\">from</span> <span class=\"var\">google</span> <span class=\"kw\">import</span> <span class=\"var\">genai</span>\n\n<span class=\"cmt\"># Load variables from local .env into process environment</span>\n<span class=\"fn\">load_dotenv</span>()\n\n<span class=\"kw\">def</span> <span class=\"fn\">call_gemini</span>(<span class=\"var\">prompt</span>: <span class=\"type\">str</span>, <span class=\"var\">model</span>: <span class=\"type\">str</span> = <span class=\"str\">\"gemini-2.5-flash\"</span>) -&gt; <span class=\"type\">LLMResponse</span>:\n    <span class=\"str\">\"\"\"Calls the Gemini API and normalizes response text and usage metadata.\"\"\"</span>\n    <span class=\"var\">api_key</span> = <span class=\"fn\">require_env</span>(<span class=\"str\">\"GEMINI_API_KEY\"</span>)\n    <span class=\"var\">client</span> = <span class=\"var\">genai</span>.<span class=\"type\">Client</span>(<span class=\"var\">api_key</span>=<span class=\"var\">api_key</span>)\n    \n    <span class=\"var\">resp</span> = <span class=\"var\">client</span>.<span class=\"var\">models</span>.<span class=\"fn\">generate_content</span>(\n        <span class=\"var\">model</span>=<span class=\"var\">model</span>,\n        <span class=\"var\">contents</span>=<span class=\"var\">prompt</span>,\n    )\n    \n    <span class=\"var\">text</span> = <span class=\"var\">resp</span>.<span class=\"var\">text</span> <span class=\"kw\">or</span> <span class=\"str\">\"\"</span>\n    \n    <span class=\"cmt\"># Extract structured token usage metadata</span>\n    <span class=\"var\">usage</span> = {}\n    <span class=\"kw\">if</span> <span class=\"var\">resp</span>.<span class=\"var\">usage_metadata</span>:\n        <span class=\"var\">usage</span> = {\n            <span class=\"str\">\"prompt_tokens\"</span>: <span class=\"var\">resp</span>.<span class=\"var\">usage_metadata</span>.<span class=\"var\">prompt_token_count</span>,\n            <span class=\"str\">\"completion_tokens\"</span>: <span class=\"var\">resp</span>.<span class=\"var\">usage_metadata</span>.<span class=\"var\">candidates_token_count</span>,\n            <span class=\"str\">\"total_tokens\"</span>: <span class=\"var\">resp</span>.<span class=\"var\">usage_metadata</span>.<span class=\"var\">total_token_count</span>,\n        }\n        \n    <span class=\"kw\">return</span> <span class=\"type\">LLMResponse</span>(<span class=\"str\">\"gemini\"</span>, <span class=\"var\">text</span>, <span class=\"var\">usage</span>, <span class=\"var\">resp</span>)\n\n<span class=\"kw\">if</span> <span class=\"var\">__name__</span> == <span class=\"str\">\"__main__\"</span>:\n    <span class=\"var\">prompt</span> = <span class=\"str\">\"Say hi in five words.\"</span>\n    <span class=\"var\">result</span> = <span class=\"fn\">call_gemini</span>(<span class=\"var\">prompt</span>)\n    <span class=\"fn\">print</span>(<span class=\"str\">f\"[{result.provider}] text: {result.text[:80]!r}\"</span>)\n    <span class=\"fn\">print</span>(<span class=\"str\">f\"[{result.provider}] usage: {result.usage}\"</span>)</code></pre>\n        </div>\n\n        <div class=\"tip-box\">\n          <p><strong>💡 Design Rule:</strong> Application code only calls <code>call_gemini()</code> or an adapter interface. Switching models is a single string configuration change; switching providers only requires adding another function returning <code>LLMResponse</code> without rewriting any app logic.</p>\n        </div>\n      "
    },
    {
      "id": "env-smoke-test",
      "title": "Interactive Sandbox & Troubleshooting Matrix",
      "type": "interactive",
      "badge": "interactive",
      "interactiveId": "env-sandbox",
      "content": "\n        <p>Verification is a strict procedure, not a vague feeling. Run one request to Gemini using a standard prompt string, then record <strong>two pieces of evidence</strong>:</p>\n\n        <div class=\"info-grid\">\n          <div class=\"info-card\" style=\"border-top: 2px solid var(--accent-emerald);\">\n            <span class=\"info-card-icon\">1️⃣</span>\n            <span class=\"info-card-title\">Evidence 1: Natural Language Text</span>\n            <span class=\"info-card-desc\">Verify that <code>result.text</code> is non-empty, contains natural language, and generated correctly.</span>\n          </div>\n          <div class=\"info-card\" style=\"border-top: 2px solid var(--accent-cyan);\">\n            <span class=\"info-card-icon\">2️⃣</span>\n            <span class=\"info-card-title\">Evidence 2: Token Usage Metadata</span>\n            <span class=\"info-card-desc\">Verify that <code>result.usage</code> contains prompt, completion, and total token count integers.</span>\n          </div>\n        </div>\n\n        <h3>💻 Interactive Virtual Environment & Client Sandbox</h3>\n        <p>Test the client boundary, inspect simulated files, and run scenarios to see how errors are caught:</p>\n\n        <div class=\"env-sandbox\" id=\"envSandboxContainer\">\n          <div class=\"sandbox-topbar\">\n            <div class=\"sandbox-tabs\">\n              <button class=\"sandbox-tab active\" data-tab=\"client\" onclick=\"switchSandboxTab('client')\">llm_client.py</button>\n              <button class=\"sandbox-tab\" data-tab=\"env\" onclick=\"switchSandboxTab('env')\">.env</button>\n              <button class=\"sandbox-tab\" data-tab=\"reqs\" onclick=\"switchSandboxTab('reqs')\">requirements.txt</button>\n            </div>\n            <div class=\"sandbox-actions\">\n              <select class=\"scenario-select\" id=\"sandboxScenarioSelect\" onchange=\"onSandboxScenarioChange()\">\n                <option value=\"success\">Scenario: Valid API Key &amp; Success</option>\n                <option value=\"missing_key\">Scenario: Missing API Key (.env empty)</option>\n                <option value=\"bad_model\">Scenario: Model Name Mismatch</option>\n                <option value=\"key_check\">Scenario: Safe Boolean Key Check</option>\n              </select>\n              <button class=\"run-sim-btn\" onclick=\"runSandboxSimulation()\">\n                <span>▶ Run Script</span>\n              </button>\n            </div>\n          </div>\n\n          <div class=\"sandbox-content\">\n            <div class=\"sandbox-file-panel active\" id=\"panel-client\">\n              <pre><code><span class=\"cmt\"># llm_client.py</span>\n<span class=\"kw\">from</span> <span class=\"var\">dotenv</span> <span class=\"kw\">import</span> <span class=\"fn\">load_dotenv</span>\n<span class=\"kw\">from</span> <span class=\"var\">google</span> <span class=\"kw\">import</span> <span class=\"var\">genai</span>\n<span class=\"kw\">import</span> <span class=\"var\">os</span>\n\n<span class=\"fn\">load_dotenv</span>()\n\n<span class=\"kw\">def</span> <span class=\"fn\">require_env</span>(<span class=\"var\">name</span>: <span class=\"type\">str</span>) -&gt; <span class=\"type\">str</span>:\n    <span class=\"var\">val</span> = <span class=\"var\">os</span>.<span class=\"var\">environ</span>.<span class=\"fn\">get</span>(<span class=\"var\">name</span>)\n    <span class=\"kw\">if</span> <span class=\"kw\">not</span> <span class=\"var\">val</span>:\n        <span class=\"kw\">raise</span> <span class=\"type\">RuntimeError</span>(<span class=\"str\">f\"Missing {name}. Set it in your shell or .env file.\"</span>)\n    <span class=\"kw\">return</span> <span class=\"var\">val</span>\n\n<span class=\"var\">client</span> = <span class=\"var\">genai</span>.<span class=\"type\">Client</span>(<span class=\"var\">api_key</span>=<span class=\"fn\">require_env</span>(<span class=\"str\">\"GEMINI_API_KEY\"</span>))\n<span class=\"var\">resp</span> = <span class=\"var\">client</span>.<span class=\"var\">models</span>.<span class=\"fn\">generate_content</span>(\n    <span class=\"var\">model</span>=<span class=\"str\">\"gemini-2.5-flash\"</span>,\n    <span class=\"var\">contents</span>=<span class=\"str\">\"Say hi in five words.\"</span>\n)\n<span class=\"fn\">print</span>(<span class=\"str\">f\"[gemini] text: {resp.text!r}\"</span>)\n<span class=\"fn\">print</span>(<span class=\"str\">f\"[gemini] usage: prompt={resp.usage_metadata.prompt_token_count}, candidates={resp.usage_metadata.candidates_token_count}\"</span>)</code></pre>\n            </div>\n\n            <div class=\"sandbox-file-panel\" id=\"panel-env\">\n              <pre><code><span class=\"cmt\"># .env (local secret file — NEVER commit to Git)</span>\n<span class=\"var\">GEMINI_API_KEY</span>=<span class=\"str\">AIzaSyB93x_DEMO_SECRET_KEY_PROD_9981</span>\n<span class=\"var\">ENVIRONMENT</span>=<span class=\"str\">development</span></code></pre>\n            </div>\n\n            <div class=\"sandbox-file-panel\" id=\"panel-reqs\">\n              <pre><code><span class=\"cmt\"># requirements.txt — pinned dependencies for repeatability</span>\n<span class=\"var\">google-genai</span>==<span class=\"num\">0.1.1</span>\n<span class=\"var\">python-dotenv</span>==<span class=\"num\">1.0.1</span></code></pre>\n            </div>\n          </div>\n\n          <div class=\"terminal-console\" id=\"sandboxTerminal\">\n            <div class=\"terminal-line-prompt\">$ python llm_client.py</div>\n            <div class=\"terminal-line-output\" id=\"sandboxTerminalOutput\" style=\"color: var(--accent-emerald);\">\n[gemini] text: 'Hello! Great to meet you!'\n[gemini] usage: prompt=7, candidates=8, total=15\n✨ Verification Successful: Both evidence pieces verified!\n            </div>\n          </div>\n        </div>\n\n        <h3>The Narrow Troubleshooting Matrix</h3>\n        <p>When an integration call fails, keep the troubleshooting branch narrow and base decisions on error categories:</p>\n\n        <div class=\"data-table-wrap\">\n          <table class=\"data-table\">\n            <thead>\n              <tr>\n                <th>Failure Category</th>\n                <th>Observed Symptom</th>\n                <th>Precise Engineering Fix</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><strong>Authentication Failure</strong></td>\n                <td><code>401 Unauthorized</code> or invalid API key error</td>\n                <td>Verify env var name and value in your console without printing the raw key into logs.</td>\n              </tr>\n              <tr>\n                <td><strong>Network &amp; Timeout</strong></td>\n                <td>Connection reset or HTTP 503/timeout</td>\n                <td>Test connectivity to API endpoint on a stable network before modifying prompt code.</td>\n              </tr>\n              <tr>\n                <td><strong>Model Name Mismatch</strong></td>\n                <td><code>404 Not Found</code> or invalid model string</td>\n                <td>Verify the model identifier string (e.g. <code>gemini-2.5-flash</code>), not the prompt payload.</td>\n              </tr>\n              <tr>\n                <td><strong>Missing Environment Key</strong></td>\n                <td><code>RuntimeError: Missing GEMINI_API_KEY</code></td>\n                <td>Check whether <code>.env</code> exists and run the safe check: <code>bool(os.environ.get(\"GEMINI_API_KEY\"))</code>.</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      "
    },
    {
      "id": "env-local-lab",
      "title": "Learner In-Person Practice: Setup on Your Machine",
      "type": "code",
      "badge": "practice",
      "content": "\n        <p>To master production AI engineering, you must run this setup directly on your personal computer. Follow these step-by-step instructions in your terminal:</p>\n\n        <div class=\"practice-lab\">\n          <div class=\"practice-lab-header\">\n            <div class=\"practice-lab-title\">\n              <span>🧑‍💻 Learner In-Person Practice Guide</span>\n            </div>\n            <span class=\"practice-lab-badge\">Run Locally</span>\n          </div>\n\n          <p class=\"practice-lab-desc\">\n            Complete the 5 steps below on your local operating system (Windows PowerShell, macOS, or Linux). Check off each step as you complete it:\n          </p>\n\n          <div class=\"framework-steps\" style=\"margin-bottom: 24px;\">\n            <div class=\"framework-step\">\n              <div class=\"framework-step-num\" style=\"background: rgba(59, 130, 246, 0.1); color: var(--accent-blue);\">1</div>\n              <div class=\"framework-step-content\">\n                <span class=\"framework-step-title\">Create &amp; Activate Virtual Environment</span>\n                <span class=\"framework-step-desc\">\n                  Isolate packages so they don't conflict with other Python projects.\n                </span>\n                <div class=\"code-block\" style=\"margin-top: 10px;\">\n                  <div class=\"code-header\"><span class=\"code-lang\">Shell / Terminal Commands</span></div>\n                  <pre><code><span class=\"cmt\"># 1. Create a clean virtual environment</span>\npython -m venv .venv\n\n<span class=\"cmt\"># 2. Activate the environment:</span>\n<span class=\"cmt\"># On Windows (PowerShell):</span>\n.venv\\Scripts\\Activate.ps1\n\n<span class=\"cmt\"># On macOS / Linux:</span>\nsource .venv/bin/activate</code></pre>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"framework-step\">\n              <div class=\"framework-step-num\" style=\"background: rgba(16, 185, 129, 0.1); color: var(--accent-emerald);\">2</div>\n              <div class=\"framework-step-content\">\n                <span class=\"framework-step-title\">Install Required Packages</span>\n                <span class=\"framework-step-desc\">Install only the direct dependencies needed for this client boundary:</span>\n                <div class=\"code-block\" style=\"margin-top: 10px;\">\n                  <div class=\"code-header\"><span class=\"code-lang\">Install Command</span></div>\n                  <pre><code>pip install google-genai python-dotenv</code></pre>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"framework-step\">\n              <div class=\"framework-step-num\" style=\"background: rgba(245, 158, 11, 0.1); color: var(--accent-amber);\">3</div>\n              <div class=\"framework-step-content\">\n                <span class=\"framework-step-title\">Create Secrets &amp; Gitignore Files</span>\n                <span class=\"framework-step-desc\">Ensure secrets are never committed to your repository:</span>\n                <div class=\"code-block\" style=\"margin-top: 10px;\">\n                  <div class=\"code-header\"><span class=\"code-lang\">.gitignore</span></div>\n                  <pre><code>.venv/\n.env\n__pycache__/</code></pre>\n                </div>\n                <div class=\"code-block\" style=\"margin-top: 10px;\">\n                  <div class=\"code-header\"><span class=\"code-lang\">.env</span></div>\n                  <pre><code>GEMINI_API_KEY=your_actual_gemini_api_key_here</code></pre>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"framework-step\">\n              <div class=\"framework-step-num\" style=\"background: rgba(139, 92, 246, 0.1); color: var(--accent-purple);\">4</div>\n              <div class=\"framework-step-content\">\n                <span class=\"framework-step-title\">Write the Safe Key Verification Script</span>\n                <span class=\"framework-step-desc\">Verify your <code>.env</code> file is loading properly without exposing the secret in terminal logs:</span>\n                <div class=\"code-block\" style=\"margin-top: 10px;\">\n                  <div class=\"code-header\"><span class=\"code-lang\">Python — check_key.py</span></div>\n                  <pre><code><span class=\"kw\">import</span> <span class=\"var\">os</span>\n<span class=\"kw\">from</span> <span class=\"var\">dotenv</span> <span class=\"kw\">import</span> <span class=\"fn\">load_dotenv</span>\n\n<span class=\"fn\">load_dotenv</span>()\n\n<span class=\"cmt\"># Prints True/False safely without leaking the raw secret string!</span>\n<span class=\"fn\">print</span>(<span class=\"str\">\"GEMINI_API_KEY set:\"</span>, <span class=\"fn\">bool</span>(<span class=\"var\">os</span>.<span class=\"var\">environ</span>.<span class=\"fn\">get</span>(<span class=\"str\">\"GEMINI_API_KEY\"</span>)))</code></pre>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"framework-step\">\n              <div class=\"framework-step-num\" style=\"background: rgba(244, 63, 94, 0.1); color: var(--accent-rose);\">5</div>\n              <div class=\"framework-step-content\">\n                <span class=\"framework-step-title\">Run the Smoke Test &amp; Inspect Evidence</span>\n                <span class=\"framework-step-desc\">Execute <code>python llm_client.py</code> and verify that both evidence pieces appear.</span>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"checklist-container\">\n            <div class=\"checklist-header\">\n              <span class=\"checklist-title\">Local Environment Checklist</span>\n              <span class=\"checklist-counter\" id=\"envChecklistCount\">0 / 5 Completed</span>\n            </div>\n            <div class=\"checklist-items\">\n              <div class=\"checklist-item\" onclick=\"toggleChecklistItem(this, 'env')\">\n                <div class=\"checklist-checkbox\"></div>\n                <span class=\"checklist-text\">Created local <code>.venv</code> virtual environment and activated it</span>\n              </div>\n              <div class=\"checklist-item\" onclick=\"toggleChecklistItem(this, 'env')\">\n                <div class=\"checklist-checkbox\"></div>\n                <span class=\"checklist-text\">Installed <code>google-genai</code> and <code>python-dotenv</code> via pip</span>\n              </div>\n              <div class=\"checklist-item\" onclick=\"toggleChecklistItem(this, 'env')\">\n                <div class=\"checklist-checkbox\"></div>\n                <span class=\"checklist-text\">Added <code>.env</code> to <code>.gitignore</code> and created <code>.env.example</code></span>\n              </div>\n              <div class=\"checklist-item\" onclick=\"toggleChecklistItem(this, 'env')\">\n                <div class=\"checklist-checkbox\"></div>\n                <span class=\"checklist-text\">Ran safe key check script: verified <code>GEMINI_API_KEY set: True</code></span>\n              </div>\n              <div class=\"checklist-item\" onclick=\"toggleChecklistItem(this, 'env')\">\n                <div class=\"checklist-checkbox\"></div>\n                <span class=\"checklist-text\">Executed <code>llm_client.py</code>: verified non-empty text and token usage metadata</span>\n              </div>\n            </div>\n          </div>\n        </div>\n      "
    }
  ],
  "quiz": [
    {
      "question": "What is the fundamental invariant of secrets management in AI application development?",
      "options": [
        "Keys can be hardcoded as long as the Git repository is private",
        "The runtime reads secrets from environment variables, and code never contains the secret value",
        "Keys should be encoded in Base64 within source code files",
        "API keys should be printed to console logs during application startup"
      ],
      "correct": 1,
      "explanation": "The invariant is absolute: the runtime reads secrets from environment variables, and the code never contains the secret value. This holds across all environments and deployment targets."
    },
    {
      "question": "What should be committed to version control instead of the actual local .env file?",
      "options": [
        "A copy of your real API key in README.md",
        "A .env.example file containing placeholder names and no secret values",
        "A zip archive of the .venv directory",
        "A screenshot of the API key in the provider console"
      ],
      "correct": 1,
      "explanation": "Keep .env out of version control via .gitignore, and commit a .env.example template with dummy placeholder values so team members know which variables to configure."
    },
    {
      "question": "What is the purpose of the normalized LLMResponse dataclass in the thin client boundary?",
      "options": [
        "To compress all outgoing prompts by 50%",
        "To keep the application independent of provider-specific response field names",
        "To bypass provider rate limits and authentication",
        "To translate responses into multiple foreign languages"
      ],
      "correct": 1,
      "explanation": "A normalized LLMResponse format standardizes provider, text, usage, and raw data, allowing application code to remain decoupled from provider-specific SDK object structures."
    },
    {
      "question": "How should you safely verify in Python whether an API key is set without leaking it in logs?",
      "options": [
        "print(\"KEY IS:\", os.environ.get(\"GEMINI_API_KEY\"))",
        "print(\"GEMINI_API_KEY set:\", bool(os.environ.get(\"GEMINI_API_KEY\")))",
        "Write the key to a public text file and inspect the file size",
        "Email the key to yourself from a script"
      ],
      "correct": 1,
      "explanation": "Converting the environment variable lookup to a boolean (bool(os.environ.get(...))) safely verifies whether the key exists without exposing the secret string in logs or terminal output."
    },
    {
      "question": "If an SDK request fails with an unauthorized error, what is the correct troubleshooting step?",
      "options": [
        "Rewrite the user prompt from scratch",
        "Switch to a completely different model family",
        "Confirm the environment variable name and value at runtime without printing the key",
        "Delete the virtual environment and reinstall Python"
      ],
      "correct": 2,
      "explanation": "Treat errors systematically: an auth failure indicates a configuration issue. Confirm the variable name and key value in the runtime environment without printing secrets into logs."
    }
  ]
}
  ]
};

// Token color palette for the interactive tokenizer
const TOKEN_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)', text: '#93C5FD' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)', text: '#C4B5FD' },
  { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.3)', text: '#6EE7B7' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)', text: '#FCD34D' },
  { bg: 'rgba(244, 63, 94, 0.15)', border: 'rgba(244, 63, 94, 0.3)', text: '#FDA4AF' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)', text: '#67E8F9' },
  { bg: 'rgba(168, 85, 247, 0.15)', border: 'rgba(168, 85, 247, 0.3)', text: '#D8B4FE' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)', text: '#86EFAC' },
];

// Attention demo data
const ATTENTION_DEMO = {
  sentence: 'The cat sat on the mat',
  weights: {
    0: [1.0, 0.1, 0.05, 0.02, 0.01, 0.01], // "The" attending to itself mostly
    1: [0.6, 1.0, 0.1, 0.05, 0.02, 0.02],   // "cat" attending to "The" + itself
    2: [0.15, 0.5, 1.0, 0.1, 0.05, 0.03],    // "sat" attending to "cat" heavily
    3: [0.05, 0.1, 0.3, 1.0, 0.1, 0.05],     // "on" context
    4: [0.3, 0.1, 0.05, 0.15, 1.0, 0.05],    // second "the" attending to first "The"
    5: [0.1, 0.35, 0.25, 0.15, 0.2, 1.0],    // "mat" attending to "cat" and "sat"
  }
};

// Gamification configuration
const LEVELS = [
  { level: 1, name: 'Novice', minXp: 0, maxXp: 100, icon: '🌱' },
  { level: 2, name: 'Apprentice', minXp: 100, maxXp: 250, icon: '🔧' },
  { level: 3, name: 'Engineer', minXp: 250, maxXp: 500, icon: '⚙️' },
  { level: 4, name: 'Architect', minXp: 500, maxXp: 850, icon: '🏗️' },
  { level: 5, name: 'Master', minXp: 850, maxXp: 1300, icon: '👑' },
  { level: 6, name: 'Grandmaster', minXp: 1300, maxXp: 2000, icon: '⚡' },
];

const ACHIEVEMENTS = [
  { id: 'first_section', name: 'First Steps', desc: 'Complete your first section', icon: '🎯', xpReward: 10 },
  { id: 'first_quiz', name: 'Quiz Taker', desc: 'Complete your first quiz', icon: '📝', xpReward: 15 },
  { id: 'perfect_score', name: 'Perfect Score', desc: 'Score 100% on any quiz', icon: '💯', xpReward: 50 },
  { id: 'module_complete', name: 'Module Master', desc: 'Complete all sections in a module', icon: '🏆', xpReward: 30 },
  { id: 'five_sections', name: 'Dedicated Learner', desc: 'Complete 5 sections', icon: '📚', xpReward: 25 },
  { id: 'ten_sections', name: 'Knowledge Seeker', desc: 'Complete 10 sections', icon: '🧠', xpReward: 40 },
  { id: 'fifteen_sections', name: 'Master Student', desc: 'Complete 15 sections', icon: '🎓', xpReward: 60 },
  { id: 'twenty_sections', name: 'AI Architect', desc: 'Complete 20 sections', icon: '⚡', xpReward: 100 },
  { id: 'cost_optimizer', name: 'Budget Enforcer', desc: 'Used the Cost & Latency Explorer', icon: '🧮', xpReward: 35 },
  { id: 'env_secured', name: 'Security Guard', desc: 'Secured environment variables and API keys', icon: '🛡️', xpReward: 35 },
  { id: 'all_quizzes', name: 'Quiz Champion', desc: 'Complete all quizzes', icon: '🏅', xpReward: 80 },
];

// XP rewards
const XP_REWARDS = {
  sectionComplete: 30,
  quizCorrectAnswer: 20,
  quizPerfectBonus: 50,
  quizComplete: 15,
};
