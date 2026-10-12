/* ============================================================
   Applied AI Academy — Application Logic
   ============================================================ */

// ─── State Management ────────────────────────────────────────
const APP_STATE = {
  currentView: 'dashboard', // 'dashboard' | moduleId
  xp: 0,
  completedSections: new Set(),
  completedQuizzes: {},   // moduleId -> { score, total, xpEarned }
  achievements: new Set(),
  streak: 0,
  lastVisitDate: null,
  expandedSections: new Set(),
};

// ─── Initialization ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  injectSVGDefs();
  renderSidebar();
  renderDashboard();
  bindGlobalEvents();
  updatePlayerStats();
  updateTopProgress();
  checkStreak();
});

function injectSVGDefs() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('svg-defs');
  svg.innerHTML = `
    <defs>
      <linearGradient id="levelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3B82F6" />
        <stop offset="100%" stop-color="#8B5CF6" />
      </linearGradient>
      <linearGradient id="progressGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10B981" />
        <stop offset="100%" stop-color="#06B6D4" />
      </linearGradient>
    </defs>
  `;
  document.body.prepend(svg);
}

// ─── Sidebar ─────────────────────────────────────────────────
function renderSidebar() {
  const nav = document.getElementById('sidebarNav');
  
  // Dashboard item
  let html = `
    <div class="nav-item active" data-view="dashboard" onclick="navigateTo('dashboard')">
      <div class="nav-icon" style="background: rgba(255,255,255,0.05);">🏠</div>
      <div class="nav-item-info">
        <span class="nav-item-title">Dashboard</span>
        <span class="nav-item-subtitle">Overview & Progress</span>
      </div>
    </div>
  `;

  COURSE_CONTENT.modules.forEach((mod, i) => {
    const progress = getModuleProgress(mod);
    const circumference = 2 * Math.PI * 11;
    const offset = circumference - (progress / 100) * circumference;
    
    html += `
      <div class="nav-item" data-view="${mod.id}" onclick="navigateTo('${mod.id}')">
        <div class="nav-icon" style="background: ${mod.gradient}; opacity: 0.9;">${mod.icon}</div>
        <div class="nav-item-info">
          <span class="nav-item-title">${mod.title}</span>
          <span class="nav-item-subtitle">Module ${i}</span>
        </div>
        <div class="nav-progress">
          <svg viewBox="0 0 28 28">
            <circle class="nav-progress-bg" cx="14" cy="14" r="11" />
            <circle class="nav-progress-fill" cx="14" cy="14" r="11"
              style="stroke: ${mod.color}; stroke-dashoffset: ${offset};" />
          </svg>
          <span class="nav-check">${progress === 100 ? '✓' : Math.round(progress) + '%'}</span>
        </div>
      </div>
    `;
  });

  nav.innerHTML = html;
}

function updateSidebarActive() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.view === APP_STATE.currentView);
  });
}

// ─── Navigation ──────────────────────────────────────────────
function navigateTo(viewId) {
  APP_STATE.currentView = viewId;
  APP_STATE.expandedSections.clear();
  updateSidebarActive();
  closeMobileSidebar();

  if (viewId === 'dashboard') {
    renderDashboard();
  } else {
    const mod = COURSE_CONTENT.modules.find(m => m.id === viewId);
    if (mod) renderModule(mod);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Dashboard ───────────────────────────────────────────────
function renderDashboard() {
  const main = document.getElementById('mainContent');
  const totalSections = COURSE_CONTENT.modules.reduce((a, m) => a + m.sections.length, 0);
  const completedSects = APP_STATE.completedSections.size;
  const totalQuizzes = COURSE_CONTENT.modules.length;
  const completedQuizzes = Object.keys(APP_STATE.completedQuizzes).length;
  const currentLevel = getCurrentLevel();

  main.innerHTML = `
    <div class="dashboard">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-bg" style="background-image: url('assets/hero-banner.jpg')"></div>
        <div class="hero-content">
          <div class="hero-badge">⚡ Interactive Course</div>
          <h1 class="hero-title">Applied AI Engineering</h1>
          <p class="hero-desc">Build production-ready AI systems through interactive lessons, visual explanations, and hands-on quizzes. Master the full application lifecycle.</p>
        </div>
      </div>

      <!-- Stats Row -->
      <div class="stats-row">
        <div class="stat-card">
          <span class="stat-icon">⚡</span>
          <span class="stat-value gradient-text">${APP_STATE.xp}</span>
          <span class="stat-label">Total XP</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">📖</span>
          <span class="stat-value">${completedSects}<span style="font-size: 0.9rem; color: var(--text-muted);">/${totalSections}</span></span>
          <span class="stat-label">Sections Done</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">🧪</span>
          <span class="stat-value">${completedQuizzes}<span style="font-size: 0.9rem; color: var(--text-muted);">/${totalQuizzes}</span></span>
          <span class="stat-label">Quizzes Passed</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">${currentLevel.icon}</span>
          <span class="stat-value">${currentLevel.name}</span>
          <span class="stat-label">Current Level</span>
        </div>
      </div>

      <!-- Module Cards -->
      <div class="modules-section">
        <div class="section-title">
          Course Modules
          <span class="section-title-line"></span>
        </div>
        <div class="modules-grid">
          ${COURSE_CONTENT.modules.map((mod, i) => {
            const progress = getModuleProgress(mod);
            return `
              <div class="module-card" onclick="navigateTo('${mod.id}')" style="--card-accent: ${mod.gradient}">
                <div class="module-card-header">
                  <div class="module-card-icon" style="background: ${mod.gradient};">${mod.icon}</div>
                  <div class="module-card-meta">
                    <span class="module-card-number">Module ${i}</span>
                    <span class="module-card-title">${mod.title}</span>
                  </div>
                </div>
                <p class="module-card-desc">${mod.subtitle}</p>
                <div class="module-card-footer">
                  <div class="module-progress-bar">
                    <div class="module-progress-fill" style="width: ${progress}%; background: ${mod.gradient};"></div>
                  </div>
                  <span class="module-progress-text">${Math.round(progress)}%</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Achievements -->
      <div class="modules-section">
        <div class="section-title">
          🏆 Achievements
          <span class="section-title-line"></span>
        </div>
        <div class="info-grid">
          ${ACHIEVEMENTS.map(a => {
            const unlocked = APP_STATE.achievements.has(a.id);
            return `
              <div class="info-card" style="opacity: ${unlocked ? '1' : '0.4'}; ${unlocked ? 'border-color: rgba(245, 158, 11, 0.2);' : ''}">
                <span class="info-card-icon">${a.icon}</span>
                <span class="info-card-title">${a.name}</span>
                <span class="info-card-desc">${a.desc}${unlocked ? ' ✅' : ''}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

// ─── Module Page ─────────────────────────────────────────────
function renderModule(mod) {
  const main = document.getElementById('mainContent');
  const modIndex = COURSE_CONTENT.modules.indexOf(mod);
  const completedCount = mod.sections.filter(s => APP_STATE.completedSections.has(s.id)).length;
  const quizDone = APP_STATE.completedQuizzes[mod.id];

  let sectionsHtml = mod.sections.map((section, i) => {
    const isCompleted = APP_STATE.completedSections.has(section.id);
    const isExpanded = APP_STATE.expandedSections.has(section.id);
    
    return `
      <div class="section-card ${isCompleted ? 'completed' : ''} ${isExpanded ? 'expanded' : ''}" data-section-id="${section.id}" id="section-${section.id}">
        <div class="section-header" onclick="toggleSection('${section.id}')">
          <div class="section-number">${isCompleted ? '✓' : (i + 1)}</div>
          <div class="section-header-text">
            <span class="section-title-text">${section.title}</span>
            <span class="section-type-badge badge-${section.badge}">${section.type}</span>
          </div>
          <div class="section-toggle">▼</div>
        </div>
        <div class="section-body">
          <div class="section-content">
            ${section.content}
            ${!isCompleted ? `
              <button class="mark-complete-btn" onclick="markSectionComplete('${section.id}', event)">
                ✨ Mark as Complete — Earn ${XP_REWARDS.sectionComplete} XP
              </button>
            ` : `
              <button class="mark-complete-btn completed">
                ✅ Completed
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Quiz card at the bottom
  const quizHtml = `
    <div class="quiz-start-card">
      <span class="quiz-start-icon">${quizDone ? '✅' : '🧪'}</span>
      <h2 class="quiz-start-title">${quizDone ? 'Quiz Completed!' : 'Knowledge Check'}</h2>
      <p class="quiz-start-desc">${quizDone 
        ? `You scored ${quizDone.score}/${quizDone.total} and earned ${quizDone.xpEarned} XP` 
        : `Test your understanding of ${mod.title} with ${mod.quiz.length} questions`}</p>
      <button class="quiz-start-btn" onclick="startQuiz('${mod.id}')">
        ${quizDone ? '🔄 Retake Quiz' : '🚀 Start Quiz'}
      </button>
      <div class="quiz-start-stats">
        <span>📝 ${mod.quiz.length} Questions</span>
        <span>⏱️ ~${Math.ceil(mod.quiz.length * 0.5)} min</span>
        <span>⚡ Up to ${mod.quiz.length * XP_REWARDS.quizCorrectAnswer + XP_REWARDS.quizPerfectBonus + XP_REWARDS.quizComplete} XP</span>
      </div>
    </div>
  `;

  main.innerHTML = `
    <div class="module-page">
      <div class="module-header">
        <div class="module-breadcrumb">
          <span onclick="navigateTo('dashboard')">Dashboard</span>
          <span class="module-breadcrumb-sep">›</span>
          <span>Module ${modIndex}</span>
        </div>
        <div class="module-hero">
          <div class="module-hero-icon" style="background: ${mod.gradient};">${mod.icon}</div>
          <div>
            <h1 class="module-hero-title">${mod.title}</h1>
            <p class="module-hero-subtitle">${mod.subtitle}</p>
          </div>
        </div>
        <div class="module-section-count">
          <span>📖 ${mod.sections.length} Sections</span>
          <span>✅ ${completedCount} Completed</span>
          <span>🧪 ${mod.quiz.length} Quiz Questions</span>
        </div>
      </div>

      <div class="sections-container">
        ${sectionsHtml}
      </div>

      ${quizHtml}
    </div>
  `;

  // Initialize interactive components
  requestAnimationFrame(() => {
    initInteractives(mod);
  });
}

// ─── Section Toggle ──────────────────────────────────────────
function toggleSection(sectionId) {
  const card = document.getElementById(`section-${sectionId}`);
  if (!card) return;

  if (APP_STATE.expandedSections.has(sectionId)) {
    APP_STATE.expandedSections.delete(sectionId);
    card.classList.remove('expanded');
  } else {
    APP_STATE.expandedSections.add(sectionId);
    card.classList.add('expanded');
    
    // Re-init interactives when section opens
    setTimeout(() => initInteractivesForSection(sectionId), 100);
  }
}

function markSectionComplete(sectionId, event) {
  event.stopPropagation();
  if (APP_STATE.completedSections.has(sectionId)) return;
  
  APP_STATE.completedSections.add(sectionId);
  addXP(XP_REWARDS.sectionComplete, `Section completed`);
  
  // Update UI
  const card = document.getElementById(`section-${sectionId}`);
  if (card) {
    card.classList.add('completed');
    const numEl = card.querySelector('.section-number');
    if (numEl) numEl.textContent = '✓';
    const btn = card.querySelector('.mark-complete-btn');
    if (btn) {
      btn.textContent = '✅ Completed';
      btn.classList.add('completed');
    }
  }

  // Check achievements
  checkAchievements();
  saveProgress();
  renderSidebar();
  updateSidebarActive();
  updateTopProgress();
}

// ─── Interactive Components ──────────────────────────────────
function initInteractives(mod) {
  mod.sections.forEach(section => {
    if (section.interactiveId) {
      initInteractivesForSection(section.id);
    }
  });
  
  // Always init pipeline visualization and global interactives
  initPipelineViz();
  initArchToggle();
  initPromptCompare();
  initCostExplorer();
  initTruncationViz();
  initDecisionTree();
  initEnvSandbox();
}

function initInteractivesForSection(sectionId) {
  const section = findSection(sectionId);
  if (!section || !section.interactiveId) {
    // Check for non-interactive components that still need init
    initPipelineViz();
    initArchToggle();
    initPromptCompare();
    initCostExplorer();
    initTruncationViz();
    initDecisionTree();
    initEnvSandbox();
    return;
  }

  switch (section.interactiveId) {
    case 'tokenizer': initTokenizer(); break;
    case 'attention': initAttentionViz(); break;
    case 'arch-toggle': initArchToggle(); break;
    case 'prompt-compare': initPromptCompare(); break;
    case 'cost-explorer': initCostExplorer(); break;
    case 'truncation-viz': initTruncationViz(); break;
    case 'decision-tree': initDecisionTree(); break;
    case 'env-sandbox': initEnvSandbox(); break;
  }
}

function findSection(sectionId) {
  for (const mod of COURSE_CONTENT.modules) {
    const section = mod.sections.find(s => s.id === sectionId);
    if (section) return section;
  }
  return null;
}

// ─── Tokenizer Interactive ───────────────────────────────────
function initTokenizer() {
  const input = document.getElementById('tokenizerInput');
  if (!input) return;
  
  // Avoid double-binding
  if (input.dataset.bound) return;
  input.dataset.bound = 'true';

  const doTokenize = () => tokenizeText(input.value);
  input.addEventListener('input', doTokenize);
  doTokenize(); // Initial render
}

function tokenizeText(text) {
  const output = document.getElementById('tokenizerOutput');
  const wordCountEl = document.getElementById('wordCount');
  const tokenCountEl = document.getElementById('tokenCount');
  const tokenRatioEl = document.getElementById('tokenRatio');
  if (!output) return;

  if (!text.trim()) {
    output.innerHTML = '<span style="color: var(--text-dim); font-size: 0.82rem;">Type something to see tokens...</span>';
    wordCountEl.textContent = '0';
    tokenCountEl.textContent = '0';
    tokenRatioEl.textContent = '—';
    return;
  }

  const tokens = simpleTokenize(text);
  const words = text.trim().split(/\s+/).length;

  output.innerHTML = tokens.map((token, i) => {
    const color = TOKEN_COLORS[i % TOKEN_COLORS.length];
    const displayToken = token.replace(/ /g, '·');
    return `<span class="token-chip" style="background: ${color.bg}; border-color: ${color.border}; color: ${color.text};" title="Token ${i + 1}">${displayToken}</span>`;
  }).join('');

  wordCountEl.textContent = words;
  tokenCountEl.textContent = tokens.length;
  tokenRatioEl.textContent = (tokens.length / words).toFixed(1) + ' tokens/word';
}

function simpleTokenize(text) {
  // A simplified BPE-like tokenizer for demonstration
  const tokens = [];
  let i = 0;
  
  // Common subword patterns
  const prefixes = ['un', 're', 'pre', 'dis', 'mis', 'over', 'under', 'out', 'non'];
  const suffixes = ['ing', 'tion', 'sion', 'able', 'ible', 'ment', 'ness', 'ful', 'less', 'ous', 'ive', 'ly', 'er', 'est', 'ed', 'es', 'al', 'ial', 'ary'];
  const commonTokens = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'has', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'way', 'who', 'did', 'get', 'let', 'say', 'she', 'too', 'use'];

  while (i < text.length) {
    // Whitespace - attach to next token or emit as space token
    if (text[i] === ' ') {
      // Collect spaces and attach to next token
      let space = '';
      while (i < text.length && text[i] === ' ') {
        space += text[i];
        i++;
      }
      if (i < text.length) {
        // Will be attached to next token
        const nextToken = extractNextToken(text, i, prefixes, suffixes, commonTokens);
        tokens.push(space + nextToken.text);
        i += nextToken.length;
      } else {
        tokens.push(space);
      }
      continue;
    }

    // Punctuation
    if (/[^a-zA-Z0-9]/.test(text[i])) {
      tokens.push(text[i]);
      i++;
      continue;
    }

    const result = extractNextToken(text, i, prefixes, suffixes, commonTokens);
    tokens.push(result.text);
    i += result.length;
  }

  return tokens;
}

function extractNextToken(text, start, prefixes, suffixes, commonTokens) {
  // Extract a word first
  let end = start;
  while (end < text.length && /[a-zA-Z0-9]/.test(text[end])) end++;
  const word = text.slice(start, end);

  if (word.length <= 3) return { text: word, length: word.length };
  
  // Check if common token
  if (commonTokens.includes(word.toLowerCase())) return { text: word, length: word.length };

  // Try to split into subwords
  const lower = word.toLowerCase();
  
  // Check for prefix
  for (const prefix of prefixes) {
    if (lower.startsWith(prefix) && word.length > prefix.length + 2) {
      const rest = word.slice(prefix.length);
      // Check for suffix in rest
      for (const suffix of suffixes) {
        if (rest.toLowerCase().endsWith(suffix) && rest.length > suffix.length) {
          const middle = rest.slice(0, rest.length - suffix.length);
          if (middle.length > 0) {
            return { text: word.slice(0, prefix.length), length: prefix.length };
          }
        }
      }
      return { text: word.slice(0, prefix.length), length: prefix.length };
    }
  }

  // Check for suffix
  for (const suffix of suffixes) {
    if (lower.endsWith(suffix) && word.length > suffix.length + 1) {
      const stem = word.slice(0, word.length - suffix.length);
      return { text: stem, length: stem.length };
    }
  }

  // Long word - split at reasonable points
  if (word.length > 6) {
    const mid = Math.ceil(word.length * 0.55);
    return { text: word.slice(0, mid), length: mid };
  }

  return { text: word, length: word.length };
}

// ─── Attention Visualizer ────────────────────────────────────
function initAttentionViz() {
  const tokensEl = document.getElementById('attentionTokens');
  const weightsEl = document.getElementById('attentionWeights');
  if (!tokensEl || tokensEl.dataset.bound) return;
  tokensEl.dataset.bound = 'true';

  const words = ATTENTION_DEMO.sentence.split(' ');
  
  tokensEl.innerHTML = words.map((word, i) => 
    `<div class="attention-token${i === words.length - 1 ? ' active' : ''}" data-idx="${i}" onclick="selectAttentionToken(${i})">${word}</div>`
  ).join('');

  renderAttentionWeights(words.length - 1);
}

function selectAttentionToken(idx) {
  document.querySelectorAll('.attention-token').forEach((el, i) => {
    el.classList.toggle('active', i === idx);
  });
  renderAttentionWeights(idx);
}

function renderAttentionWeights(selectedIdx) {
  const weightsEl = document.getElementById('attentionWeights');
  if (!weightsEl) return;

  const words = ATTENTION_DEMO.sentence.split(' ');
  const weights = ATTENTION_DEMO.weights[selectedIdx] || [];

  weightsEl.innerHTML = words.map((word, i) => {
    const weight = weights[i] || 0;
    const height = Math.round(weight * 80);
    const isSelected = i === selectedIdx;
    return `
      <div class="attention-weight-bar">
        <div class="attention-bar">
          <div class="attention-bar-fill" style="height: ${height}px; ${isSelected ? 'background: var(--gradient-success);' : ''}"></div>
        </div>
        <span class="attention-bar-label">${word}</span>
      </div>
    `;
  }).join('');
}

// ─── Pipeline Visualization ──────────────────────────────────
function initPipelineViz() {
  const stages = document.querySelectorAll('.pipeline-stage');
  if (!stages.length) return;

  stages.forEach(stage => {
    if (stage.dataset.bound) return;
    stage.dataset.bound = 'true';
    stage.addEventListener('click', () => {
      stages.forEach(s => s.classList.remove('active-stage'));
      stage.classList.add('active-stage');
      const detail = document.getElementById('pipelineDetail');
      if (detail) {
        detail.style.opacity = '0';
        setTimeout(() => {
          detail.textContent = stage.dataset.detail;
          detail.style.opacity = '1';
        }, 150);
      }
    });
  });
}

// ─── Architecture Toggle ─────────────────────────────────────
function initArchToggle() {
  const btns = document.querySelectorAll('.arch-toggle-btn');
  if (!btns.length) return;

  btns.forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = 'true';
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.arch-panel').forEach(p => p.classList.remove('active'));
      const panel = document.getElementById(`arch-${btn.dataset.panel}`);
      if (panel) panel.classList.add('active');
    });
  });
}

// ─── Prompt Compare ──────────────────────────────────────────
function initPromptCompare() {
  const tabs = document.querySelectorAll('.prompt-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    if (tab.dataset.bound) return;
    tab.dataset.bound = 'true';
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.prompt-content').forEach(p => p.classList.remove('active'));
      const target = document.getElementById(tab.dataset.target);
    });
  });
}

// ─── Cost & Latency Explorer ────────────────────────────────
function initCostExplorer() {
  const container = document.getElementById('costExplorerContainer');
  if (!container || container.dataset.bound) return;
  container.dataset.bound = 'true';
  updateCostExplorer();
}

function updateCostExplorer() {
  const sliderInput = document.getElementById('sliderInputTokens');
  const sliderOutput = document.getElementById('sliderOutputTokens');
  const sliderCalls = document.getElementById('sliderCalls');
  const sliderHistory = document.getElementById('sliderHistoryTurns');

  if (!sliderInput || !sliderOutput || !sliderCalls || !sliderHistory) return;

  const I_base = parseInt(sliderInput.value) || 2000;
  const O = parseInt(sliderOutput.value) || 300;
  const C = parseInt(sliderCalls.value) || 1;
  const turns = parseInt(sliderHistory.value) || 0;

  // History adds ~350 tokens per turn
  const historyTokens = turns * 350;
  const I_total = I_base + historyTokens;

  // T = C * (I + O)
  const T = C * (I_total + O);

  // Update slider labels
  const valInput = document.getElementById('valInputTokens');
  const valOutput = document.getElementById('valOutputTokens');
  const valCalls = document.getElementById('valCalls');
  const valHistory = document.getElementById('valHistoryTurns');

  if (valInput) valInput.textContent = I_base.toLocaleString();
  if (valOutput) valOutput.textContent = O.toLocaleString();
  if (valCalls) valCalls.textContent = C;
  if (valHistory) valHistory.textContent = `${turns} turns (+${historyTokens.toLocaleString()} tok)`;

  // Baseline reference: C=1, I=1000, O=200 => 1200
  const baselineTokens = 1200;
  const costIndex = (T / baselineTokens).toFixed(1);

  // Latency estimation:
  // TTFT = 220ms base + (I_total * 0.075ms prefill) + multi-call orchestration
  const ttft = Math.round(220 + (I_total * 0.075) + ((C - 1) * 320));
  // Total = TTFT + (O * 3.2ms decode)
  const totalLatencyMs = Math.round(ttft + (O * 3.2) + ((C - 1) * 450));
  const totalLatencySec = (totalLatencyMs / 1000).toFixed(1);

  // Display metrics
  const metTotal = document.getElementById('metricTotalTokens');
  const metMath = document.getElementById('metricTokenMath');
  const metCost = document.getElementById('metricCostIndex');
  const metCostSub = document.getElementById('metricCostSub');
  const metLat = document.getElementById('metricLatency');
  const metLatSub = document.getElementById('metricLatencySub');

  if (metTotal) metTotal.textContent = T.toLocaleString();
  if (metMath) metMath.textContent = `${C} call${C > 1 ? 's' : ''} × (${I_total.toLocaleString()} in + ${O.toLocaleString()} out)`;
  if (metCost) metCost.textContent = `${costIndex}×`;
  if (metCostSub) metCostSub.textContent = `vs. 1.0× baseline (1,200 tok)`;
  if (metLat) metLat.textContent = `${ttft}ms / ${totalLatencySec}s`;
  if (metLatSub) metLatSub.textContent = `TTFT / Full generation`;

  // SLA Evaluation
  const slaBox = document.getElementById('slaMetricBox');
  const slaBadge = document.getElementById('budgetSlaBadge');
  const slaStatus = document.getElementById('metricSlaStatus');
  const slaSub = document.getElementById('metricSlaSub');

  if (slaBox && slaBadge && slaStatus) {
    slaBox.classList.remove('primary', 'cost', 'speed', 'sla', 'warn', 'danger');
    slaBox.classList.add('sla');

    if (ttft <= 950 && costIndex <= 4.0) {
      slaStatus.textContent = 'PASS (<1s p95)';
      slaStatus.style.color = 'var(--accent-emerald)';
      if (slaSub) slaSub.textContent = 'Within latency ceiling & budget';
      slaBadge.textContent = 'Budget Healthy';
      slaBadge.style.color = 'var(--accent-emerald)';
      slaBadge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      slaBadge.style.background = 'rgba(16, 185, 129, 0.12)';
    } else if (ttft <= 1600 && costIndex <= 8.0) {
      slaBox.classList.add('warn');
      slaStatus.textContent = 'WARNING';
      slaStatus.style.color = 'var(--accent-amber)';
      if (slaSub) slaSub.textContent = 'TTFT > 1s or high context cost';
      slaBadge.textContent = 'Budget Warning';
      slaBadge.style.color = 'var(--accent-amber)';
      slaBadge.style.borderColor = 'rgba(245, 158, 11, 0.4)';
      slaBadge.style.background = 'rgba(245, 158, 11, 0.12)';
    } else {
      slaBox.classList.add('danger');
      slaStatus.textContent = 'BUDGET BLOWN';
      slaStatus.style.color = 'var(--accent-rose)';
      if (slaSub) slaSub.textContent = 'Severe p95 latency & cost breach';
      slaBadge.textContent = 'SLA Breached';
      slaBadge.style.color = 'var(--accent-rose)';
      slaBadge.style.borderColor = 'rgba(244, 63, 94, 0.4)';
      slaBadge.style.background = 'rgba(244, 63, 94, 0.12)';
    }
  }

  // Visual comparison bars
  const maxBarTokens = 25000;
  const currentPct = Math.min(100, Math.max(5, (T / maxBarTokens) * 100));
  const amplifiedTokens = T * 2;
  const amplifiedPct = Math.min(100, Math.max(10, (amplifiedTokens / maxBarTokens) * 100));

  const barCurrentLabel = document.getElementById('barCurrentLabel');
  const barCurrentFill = document.getElementById('barCurrentFill');
  const barAmplifiedLabel = document.getElementById('barAmplifiedLabel');
  const barAmplifiedFill = document.getElementById('barAmplifiedFill');

  if (barCurrentLabel && barCurrentFill) {
    barCurrentLabel.textContent = `${T.toLocaleString()} tokens (${costIndex}×)`;
    barCurrentFill.style.width = `${currentPct}%`;
  }

  if (barAmplifiedLabel && barAmplifiedFill) {
    barAmplifiedLabel.textContent = `${amplifiedTokens.toLocaleString()} tokens (${(costIndex * 2).toFixed(1)}×)`;
    barAmplifiedFill.style.width = `${amplifiedPct}%`;
  }

  // Trigger achievement if not unlocked
  if (!APP_STATE.achievements.has('cost_optimizer')) {
    APP_STATE.achievements.add('cost_optimizer');
    addXP(35, 'Explored Cost & Latency Explorer');
  }
}

// ─── Truncation Simulator ───────────────────────────────────
function initTruncationViz() {
  const sim = document.getElementById('truncationSimulator');
  if (!sim || sim.dataset.bound) return;
  sim.dataset.bound = 'true';
  switchTruncStrategy('fifo');
}

function switchTruncStrategy(strategy) {
  const sim = document.getElementById('truncationSimulator');
  if (!sim) return;

  // Update active button
  sim.querySelectorAll('.trunc-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.strategy === strategy);
  });

  const usedEl = document.getElementById('truncTokensUsed');
  const badgeEl = document.getElementById('truncStatusBadge');
  const fillEl = document.getElementById('truncMeterFill');
  const blocksEl = document.getElementById('truncBlocksList');
  const expEl = document.getElementById('truncExplanation');

  if (!blocksEl) return;

  let tokensUsed = 2400;
  let statusText = 'Within Limit (60%)';
  let statusColor = 'var(--accent-emerald)';
  let fillPct = 60;
  let blocksHtml = '';
  let expText = '';

  switch (strategy) {
    case 'fifo':
      tokensUsed = 2400;
      statusText = 'Within Limit (60%)';
      statusColor = 'var(--accent-emerald)';
      fillPct = 60;
      blocksHtml = `
        <div class="trunc-block dropped">
          <span>❌ Turns #1–#4 (Earliest chat turns, ~1,400 tokens)</span>
          <span style="font-weight: 700; text-transform: uppercase; font-size: 0.7rem;">Dropped by FIFO</span>
        </div>
        <div class="trunc-block kept">
          <span>✅ Turns #5–#8 (Recent conversation context, ~1,200 tokens)</span>
          <span style="font-weight: 700; text-transform: uppercase; font-size: 0.7rem;">Retained</span>
        </div>
        <div class="trunc-block kept">
          <span>✅ Turn #9 (Latest user question, ~300 tokens)</span>
          <span style="font-weight: 700; text-transform: uppercase; font-size: 0.7rem;">Active Query</span>
        </div>
        <div class="trunc-block critical-instruction safe kept">
          <span>🛡️ Critical Placement: System Instruction placed at END (~150 tokens)</span>
          <span style="font-weight: 700; text-transform: uppercase; font-size: 0.7rem; color: #10B981;">Protected (100% Salient)</span>
        </div>
      `;
      expText = '<strong>Strategy: FIFO Drop Oldest.</strong> The 4 earliest turns were dropped to satisfy context limits. The Critical System Instruction was placed at the END of context (Placement Rule), ensuring it is never cut and receives primary attention during generation.';
      break;

    case 'summary':
      tokensUsed = 1250;
      statusText = 'Optimized Memory (31%)';
      statusColor = 'var(--accent-purple)';
      fillPct = 31;
      blocksHtml = `
        <div class="trunc-block compressed">
          <span>📦 Compressed Summary of Turns #1–#8 (~150 tokens, was 2,600)</span>
          <span style="font-weight: 700; text-transform: uppercase; font-size: 0.7rem;">Summary Memory</span>
        </div>
        <div class="trunc-block kept">
          <span>✅ Turns #9 & #10 (Verbatim recent turns, ~500 tokens)</span>
          <span style="font-weight: 700; text-transform: uppercase; font-size: 0.7rem;">Active Dialogue</span>
        </div>
        <div class="trunc-block critical-instruction safe kept">
          <span>🛡️ Critical Instruction pinned near prompt end (~150 tokens)</span>
          <span style="font-weight: 700; text-transform: uppercase; font-size: 0.7rem; color: #10B981;">Protected</span>
        </div>
      `;
      expText = '<strong>Strategy: Summarization Buffer.</strong> Older dialogue is distilled into a compact 150-token state representation. Saves 2,450 tokens while preserving key facts, user identity, and task state without risking instruction truncation.';
      break;

    case 'rag':
      tokensUsed = 950;
      statusText = 'Lean Context (24%)';
      statusColor = 'var(--accent-cyan)';
      fillPct = 24;
      blocksHtml = `
        <div class="trunc-block kept">
          <span>🔍 Retrieved Passage #1: Technical Spec Excerpt (~250 tokens)</span>
          <span style="font-weight: 700; text-transform: uppercase; font-size: 0.7rem;">Top 1 Similarity</span>
        </div>
        <div class="trunc-block kept">
          <span>🔍 Retrieved Passage #2: Account Policy Details (~250 tokens)</span>
          <span style="font-weight: 700; text-transform: uppercase; font-size: 0.7rem;">Top 2 Similarity</span>
        </div>
        <div class="trunc-block kept">
          <span>✅ User Query + Recent Turn (~300 tokens)</span>
          <span style="font-weight: 700; text-transform: uppercase; font-size: 0.7rem;">Active Query</span>
        </div>
        <div class="trunc-block critical-instruction safe kept">
          <span>🛡️ Grounding Instruction ("Answer strictly using documents above", ~150 tokens)</span>
          <span style="font-weight: 700; text-transform: uppercase; font-size: 0.7rem; color: #10B981;">Protected</span>
        </div>
      `;
      expText = '<strong>Strategy: Selective Retrieval (RAG).</strong> Instead of dumping the 40-page user manual, the system fetches only 2 targeted passages (500 tokens). TTFT drops from 3.5s to 380ms!';
      break;

    case 'naive':
      tokensUsed = 5600;
      statusText = 'OVERFLOW (140% - BLOWN)';
      statusColor = 'var(--accent-rose)';
      fillPct = 100;
      blocksHtml = `
        <div class="trunc-block critical-instruction lost dropped">
          <span>⚠️ Instruction at START: "Output JSON only" (~150 tokens)</span>
          <span style="font-weight: 700; text-transform: uppercase; font-size: 0.7rem; color: #F43F5E;">TRUNCATED & LOST!</span>
        </div>
        <div class="trunc-block dropped">
          <span>❌ Turns #1–#5 Full Uncompressed History (~2,200 tokens)</span>
          <span style="font-weight: 700; text-transform: uppercase; font-size: 0.7rem;">Truncated</span>
        </div>
        <div class="trunc-block dropped">
          <span>❌ Pasted PDF Technical Manual (~2,400 tokens)</span>
          <span style="font-weight: 700; text-transform: uppercase; font-size: 0.7rem;">Truncated</span>
        </div>
        <div class="trunc-block kept">
          <span>⚠️ Recent turns (Barely fit, ~850 tokens)</span>
          <span style="font-weight: 700; text-transform: uppercase; font-size: 0.7rem;">Surviving Fragment</span>
        </div>
      `;
      expText = '<strong>Strategy: Naive Full Stuffing.</strong> Total tokens (5,600) exceeds context ceiling. Provider SDK silently cut the beginning of prompt. The critical JSON instruction at the start was chopped, causing JSON parser crashes in production downstream!';
      break;
  }

  if (usedEl) usedEl.textContent = tokensUsed.toLocaleString();
  if (badgeEl) {
    badgeEl.textContent = statusText;
    badgeEl.style.color = statusColor;
  }
  if (fillEl) {
    fillEl.style.width = `${fillPct}%`;
    fillEl.style.background = statusColor;
  }
  blocksEl.innerHTML = blocksHtml;
  if (expEl) expEl.innerHTML = expText;
}

// ─── Decision Tree Interactive ──────────────────────────────
function initDecisionTree() {
  const container = document.getElementById('decisionTreeContainer');
  if (!container || container.dataset.bound) return;
  container.dataset.bound = 'true';
  selectTreeScenario('support');
}

function selectTreeScenario(scenario) {
  const tabSupport = document.getElementById('tabSupportChat');
  const tabResearch = document.getElementById('tabResearchAssistant');
  const stepsContainer = document.getElementById('treeFlowSteps');

  if (!stepsContainer) return;

  if (scenario === 'support') {
    if (tabSupport) tabSupport.classList.add('active');
    if (tabResearch) tabResearch.classList.remove('active');

    stepsContainer.innerHTML = `
      <div class="tree-node">
        <span class="tree-node-icon">👤</span>
        <div class="tree-node-content">
          <div class="tree-node-title">Step 1: Input Analysis</div>
          <div class="tree-node-desc">User arrives with 15 previous ticket messages and a 3-page problem description.</div>
          <span class="tree-node-action">Observable: History is unbounded</span>
        </div>
      </div>
      <div class="tree-node">
        <span class="tree-node-icon">✂️</span>
        <div class="tree-node-content">
          <div class="tree-node-title">Step 2: Selective Context Assembly</div>
          <div class="tree-node-desc">Apply FIFO sliding window for latest 3 turns + 1 concise summary of ticket events (under 1,500 total input tokens).</div>
          <span class="tree-node-action">Enforce: Input budget &le; 2,000 tokens</span>
        </div>
      </div>
      <div class="tree-node">
        <span class="tree-node-icon">⚡</span>
        <div class="tree-node-content">
          <div class="tree-node-title">Step 3: Response Streaming & Cap</div>
          <div class="tree-node-desc">Enable Server-Sent Events (SSE) streaming; cap max_output_tokens at 250. UI shows first tokens in 450ms.</div>
          <span class="tree-node-action" style="background: rgba(16, 185, 129, 0.15); color: #34D399;">Result: p95 latency &lt; 1.0 s guaranteed</span>
        </div>
      </div>
    `;
  } else {
    if (tabResearch) tabResearch.classList.add('active');
    if (tabSupport) tabSupport.classList.remove('active');

    stepsContainer.innerHTML = `
      <div class="tree-node">
        <span class="tree-node-icon">🔍</span>
        <div class="tree-node-content">
          <div class="tree-node-title">Step 1: Grounded Evidence Search</div>
          <div class="tree-node-desc">User asks a technical query requiring cited claims against private documentation.</div>
          <span class="tree-node-action">Constraint: Output MUST cite verified sources</span>
        </div>
      </div>
      <div class="tree-node">
        <span class="tree-node-icon">⚖️</span>
        <div class="tree-node-content">
          <div class="tree-node-title">Step 2: Evidence Guard Check</div>
          <div class="tree-node-desc">Retrieval runs vector + keyword search. Check relevance scores of top passages.</div>
          <span class="tree-node-action">Condition: If similarity score &lt; 0.72 (Zero Evidence)</span>
        </div>
      </div>
      <div class="tree-node">
        <span class="tree-node-icon">🛑</span>
        <div class="tree-node-content">
          <div class="tree-node-title">Step 3: Early Exit — Skip Model Call!</div>
          <div class="tree-node-desc">Do NOT call the model. Return an immediate "Evidence Not Found" fallback state to the user in 35ms.</div>
          <span class="tree-node-action" style="background: rgba(16, 185, 129, 0.15); color: #34D399;">Result: $0 spent, 0ms model wait, ZERO hallucination risk</span>
        </div>
      </div>
    `;
  }
}

// ─── Environment Sandbox ────────────────────────────────────
function initEnvSandbox() {
  const container = document.getElementById('envSandboxContainer');
  if (!container || container.dataset.bound) return;
  container.dataset.bound = 'true';
}

function switchSandboxTab(tabName) {
  const container = document.getElementById('envSandboxContainer');
  if (!container) return;

  container.querySelectorAll('.sandbox-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tabName);
  });

  container.querySelectorAll('.sandbox-file-panel').forEach(p => {
    p.classList.remove('active');
  });

  const targetPanel = document.getElementById(`panel-${tabName}`);
  if (targetPanel) targetPanel.classList.add('active');
}

function onSandboxScenarioChange() {
  const select = document.getElementById('sandboxScenarioSelect');
  const termPrompt = document.querySelector('#sandboxTerminal .terminal-line-prompt');
  if (!select || !termPrompt) return;

  if (select.value === 'key_check') {
    termPrompt.textContent = '$ python check_key.py';
  } else {
    termPrompt.textContent = '$ python llm_client.py';
  }
}

function runSandboxSimulation() {
  const select = document.getElementById('sandboxScenarioSelect');
  const out = document.getElementById('sandboxTerminalOutput');
  if (!select || !out) return;

  out.textContent = 'Executing in virtual Python runtime...';
  out.style.color = 'var(--text-secondary)';

  setTimeout(() => {
    switch (select.value) {
      case 'success':
        out.style.color = 'var(--accent-emerald)';
        out.textContent = `[gemini] text: 'Hello! Great to meet you!'\n[gemini] usage: {'prompt_tokens': 7, 'completion_tokens': 8, 'total_tokens': 15}\n✨ Verification Successful: Natural language text generated and token counts present!`;
        if (!APP_STATE.achievements.has('env_secured')) {
          APP_STATE.achievements.add('env_secured');
          addXP(35, 'Secured API keys and client boundary');
        }
        break;

      case 'missing_key':
        out.style.color = 'var(--accent-rose)';
        out.textContent = `Traceback (most recent call last):\n  File "llm_client.py", line 19, in call_gemini\n    api_key = require_env("GEMINI_API_KEY")\n  File "llm_client.py", line 14, in require_env\n    raise RuntimeError(f"Missing {name}. Set it in your shell or .env file.")\nRuntimeError: Missing GEMINI_API_KEY. Set it in your shell or .env file.\n\n👉 Diagnosis: The fail-fast guard prevented an unauthenticated network roundtrip!`;
        break;

      case 'bad_model':
        out.style.color = 'var(--accent-amber)';
        out.textContent = `google.genai.errors.APIError: 404 Model 'gemini-nonexistent' not found.\n\n👉 Troubleshooting Rule: Notice this is a Model Name Mismatch, not an auth error or prompt issue. Verify your model string identifier in llm_client.py.`;
        break;

      case 'key_check':
        out.style.color = 'var(--accent-cyan)';
        out.textContent = `GEMINI_API_KEY set: True\n\n🔒 Safe check complete: Verified that GEMINI_API_KEY is present in the environment without printing any secrets into console logs!`;
        break;
    }
  }, 400);
}

// ─── Practice Checklist Helper ──────────────────────────────
function toggleChecklistItem(itemEl, labPrefix) {
  itemEl.classList.toggle('checked');
  const items = itemEl.parentElement.querySelectorAll('.checklist-item');
  const checkedCount = itemEl.parentElement.querySelectorAll('.checklist-item.checked').length;
  const totalCount = items.length;

  const counterEl = document.getElementById(`${labPrefix}ChecklistCount`);
  if (counterEl) {
    counterEl.textContent = `${checkedCount} / ${totalCount} Completed`;
  }

  if (checkedCount === totalCount) {
    showToast('🏆', 'Lab Complete!', `All steps in ${labPrefix.toUpperCase()} local practice finished`, '+25 XP');
    addXP(25, `${labPrefix.toUpperCase()} Local Lab Completed`);
  }
}

// ─── Quiz System ─────────────────────────────────────────────

let quizState = {
  moduleId: null,
  questions: [],
  currentIndex: 0,
  score: 0,
  answered: false,
  xpEarned: 0,
};

function startQuiz(moduleId) {
  const mod = COURSE_CONTENT.modules.find(m => m.id === moduleId);
  if (!mod) return;

  quizState = {
    moduleId,
    questions: [...mod.quiz],
    currentIndex: 0,
    score: 0,
    answered: false,
    xpEarned: 0,
  };

  document.getElementById('quizOverlay').classList.add('active');
  document.getElementById('quizTitle').textContent = mod.title;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const q = quizState.questions[quizState.currentIndex];
  const total = quizState.questions.length;
  const current = quizState.currentIndex + 1;
  
  // Progress
  document.getElementById('quizProgressFill').style.width = `${(current / total) * 100}%`;
  document.getElementById('quizCounter').textContent = `${current} / ${total}`;

  // Question
  const body = document.getElementById('quizBody');
  body.innerHTML = `
    <p class="quiz-question">${q.question}</p>
    <div class="quiz-options">
      ${q.options.map((opt, i) => `
        <div class="quiz-option" data-index="${i}" onclick="selectQuizAnswer(${i})">
          <span class="option-marker">${String.fromCharCode(65 + i)}</span>
          <span>${opt}</span>
        </div>
      `).join('')}
    </div>
    <div id="quizExplanation"></div>
  `;

  // Button
  const nextBtn = document.getElementById('quizNextBtn');
  nextBtn.disabled = true;
  nextBtn.textContent = current === total ? 'Finish Quiz' : 'Next Question';
  nextBtn.onclick = nextQuizQuestion;
  quizState.answered = false;
}

function selectQuizAnswer(index) {
  if (quizState.answered) return;
  quizState.answered = true;

  const q = quizState.questions[quizState.currentIndex];
  const isCorrect = index === q.correct;
  
  if (isCorrect) {
    quizState.score++;
    quizState.xpEarned += XP_REWARDS.quizCorrectAnswer;
  }

  // Highlight options
  document.querySelectorAll('.quiz-option').forEach((opt, i) => {
    opt.classList.add('disabled');
    if (i === q.correct) opt.classList.add('correct');
    if (i === index && !isCorrect) opt.classList.add('incorrect');
    if (i === index) opt.classList.add('selected');
  });

  // Show explanation
  const explEl = document.getElementById('quizExplanation');
  explEl.innerHTML = `
    <div class="quiz-explanation ${isCorrect ? 'correct' : 'incorrect'}">
      <span class="quiz-explanation-icon">${isCorrect ? '✅ Correct!' : '❌ Not quite'}</span>
      <p>${q.explanation}</p>
    </div>
  `;

  document.getElementById('quizNextBtn').disabled = false;
}

function nextQuizQuestion() {
  if (quizState.currentIndex + 1 >= quizState.questions.length) {
    finishQuiz();
    return;
  }
  
  quizState.currentIndex++;
  renderQuizQuestion();
}

function finishQuiz() {
  document.getElementById('quizOverlay').classList.remove('active');
  
  const total = quizState.questions.length;
  const score = quizState.score;
  const isPerfect = score === total;
  
  // Add completion XP
  quizState.xpEarned += XP_REWARDS.quizComplete;
  if (isPerfect) quizState.xpEarned += XP_REWARDS.quizPerfectBonus;
  
  // Save quiz result
  APP_STATE.completedQuizzes[quizState.moduleId] = {
    score,
    total,
    xpEarned: quizState.xpEarned,
  };
  
  addXP(quizState.xpEarned, 'Quiz completed');
  
  // Show results
  showQuizResults(score, total, quizState.xpEarned, isPerfect);
  
  // Check achievements
  checkAchievements();
  saveProgress();
  renderSidebar();
  updateSidebarActive();
  updateTopProgress();
}

function showQuizResults(score, total, xpEarned, isPerfect) {
  const pct = Math.round((score / total) * 100);
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (pct / 100) * circumference;
  const color = pct >= 80 ? '#10B981' : pct >= 60 ? '#F59E0B' : '#F43F5E';

  const overlay = document.getElementById('resultsOverlay');
  const modal = document.getElementById('resultsModal');
  
  modal.innerHTML = `
    <span class="results-icon">${isPerfect ? '🏆' : pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '📚'}</span>
    <h2 class="results-title">${isPerfect ? 'Perfect Score!' : pct >= 80 ? 'Great Job!' : pct >= 60 ? 'Good Effort!' : 'Keep Learning!'}</h2>
    <p class="results-subtitle">${isPerfect ? 'You nailed every question!' : `You scored ${score} out of ${total} questions correctly.`}</p>
    
    <div class="results-score-ring">
      <svg viewBox="0 0 120 120">
        <circle class="results-ring-bg" cx="60" cy="60" r="52" />
        <circle class="results-ring-fill" cx="60" cy="60" r="52"
          style="stroke: ${color}; stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset};" />
      </svg>
      <span class="results-score-value" style="color: ${color};">${pct}%</span>
    </div>

    <div class="results-stats">
      <div class="results-stat">
        <span class="results-stat-value" style="color: var(--accent-emerald);">${score}</span>
        <span class="results-stat-label">Correct</span>
      </div>
      <div class="results-stat">
        <span class="results-stat-value" style="color: var(--accent-rose);">${total - score}</span>
        <span class="results-stat-label">Missed</span>
      </div>
      <div class="results-stat">
        <span class="results-stat-value">${total}</span>
        <span class="results-stat-label">Total</span>
      </div>
    </div>

    <div class="results-xp">⚡ +${xpEarned} XP Earned</div>

    <button class="results-btn" onclick="closeResults()">Continue Learning</button>
  `;

  overlay.classList.add('active');
  
  if (isPerfect) triggerConfetti();
}

function closeResults() {
  document.getElementById('resultsOverlay').classList.remove('active');
  // Re-render module to update quiz card
  const mod = COURSE_CONTENT.modules.find(m => m.id === APP_STATE.currentView);
  if (mod) renderModule(mod);
}

function closeQuiz() {
  document.getElementById('quizOverlay').classList.remove('active');
}

// Bind close button
document.addEventListener('click', (e) => {
  if (e.target.id === 'quizClose') closeQuiz();
});

// ─── Gamification ────────────────────────────────────────────
function addXP(amount, reason) {
  APP_STATE.xp += amount;
  updatePlayerStats();
  showToast('⚡', 'XP Earned', reason, `+${amount} XP`);
  saveProgress();
  
  // Update dashboard stats if visible
  const mobileXp = document.getElementById('mobileXp');
  if (mobileXp) mobileXp.textContent = `${APP_STATE.xp} XP`;
}

function getCurrentLevel() {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (APP_STATE.xp >= level.minXp) current = level;
  }
  return current;
}

function updatePlayerStats() {
  const level = getCurrentLevel();
  const nextLevel = LEVELS.find(l => l.minXp > APP_STATE.xp) || level;
  
  const xpInLevel = APP_STATE.xp - level.minXp;
  const xpForNext = nextLevel.minXp - level.minXp;
  const progress = xpForNext > 0 ? (xpInLevel / xpForNext) : 1;

  // Level badge
  document.getElementById('levelNumber').textContent = level.level;
  document.getElementById('playerRank').textContent = `${level.icon} ${level.name}`;
  
  // XP bar
  const xpFill = document.getElementById('xpFill');
  if (xpFill) xpFill.style.width = `${progress * 100}%`;
  
  document.getElementById('xpText').textContent = `${APP_STATE.xp} / ${nextLevel.minXp} XP`;
  
  // Level ring
  const circumference = 2 * Math.PI * 26;
  const ringFill = document.getElementById('levelRingFill');
  if (ringFill) ringFill.style.strokeDashoffset = circumference - (progress * circumference);
  
  // Mobile XP
  const mobileXp = document.getElementById('mobileXp');
  if (mobileXp) mobileXp.textContent = `${APP_STATE.xp} XP`;
  
  // Sidebar stats
  const totalSects = document.getElementById('totalSections');
  if (totalSects) totalSects.textContent = APP_STATE.completedSections.size;
  const totalQuiz = document.getElementById('totalQuizzes');
  if (totalQuiz) totalQuiz.textContent = Object.keys(APP_STATE.completedQuizzes).length;
}

function checkAchievements() {
  const completed = APP_STATE.completedSections.size;
  const quizzes = Object.keys(APP_STATE.completedQuizzes).length;
  
  const checks = [
    { id: 'first_section', condition: completed >= 1 },
    { id: 'first_quiz', condition: quizzes >= 1 },
    { id: 'perfect_score', condition: Object.values(APP_STATE.completedQuizzes).some(q => q.score === q.total) },
    { id: 'five_sections', condition: completed >= 5 },
    { id: 'ten_sections', condition: completed >= 10 },
    { id: 'fifteen_sections', condition: completed >= 15 },
    { id: 'twenty_sections', condition: completed >= 20 },
    { id: 'all_quizzes', condition: quizzes >= COURSE_CONTENT.modules.length },
    { id: 'module_complete', condition: COURSE_CONTENT.modules.some(m => {
      return m.sections.every(s => APP_STATE.completedSections.has(s.id));
    })},
  ];

  checks.forEach(({ id, condition }) => {
    if (condition && !APP_STATE.achievements.has(id)) {
      APP_STATE.achievements.add(id);
      const achievement = ACHIEVEMENTS.find(a => a.id === id);
      if (achievement) {
        APP_STATE.xp += achievement.xpReward;
        showToast(achievement.icon, 'Achievement Unlocked!', achievement.name, `+${achievement.xpReward} XP`);
        updatePlayerStats();
      }
    }
  });
}

function getModuleProgress(mod) {
  const totalItems = mod.sections.length + 1; // sections + quiz
  let completed = mod.sections.filter(s => APP_STATE.completedSections.has(s.id)).length;
  if (APP_STATE.completedQuizzes[mod.id]) completed++;
  return (completed / totalItems) * 100;
}

function updateTopProgress() {
  const totalSections = COURSE_CONTENT.modules.reduce((a, m) => a + m.sections.length, 0);
  const totalItems = totalSections + COURSE_CONTENT.modules.length; // + quizzes
  const completed = APP_STATE.completedSections.size + Object.keys(APP_STATE.completedQuizzes).length;
  const progress = totalItems > 0 ? (completed / totalItems) * 100 : 0;
  document.getElementById('topProgressFill').style.width = `${progress}%`;
}

// ─── Streak System ───────────────────────────────────────────
function checkStreak() {
  const today = new Date().toDateString();
  
  if (APP_STATE.lastVisitDate) {
    const lastVisit = new Date(APP_STATE.lastVisitDate);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastVisit.toDateString() === yesterday.toDateString()) {
      APP_STATE.streak++;
    } else if (lastVisit.toDateString() !== today) {
      APP_STATE.streak = 1;
    }
  } else {
    APP_STATE.streak = 1;
  }
  
  APP_STATE.lastVisitDate = today;
  document.getElementById('streakCount').textContent = APP_STATE.streak;
  saveProgress();
}

// ─── Toast Notifications ─────────────────────────────────────
function showToast(icon, title, desc, xpText) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <div class="toast-content">
      <span class="toast-title">${title}</span>
      <span class="toast-desc">${desc}</span>
    </div>
    ${xpText ? `<span class="toast-xp">${xpText}</span>` : ''}
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ─── Confetti ────────────────────────────────────────────────
function triggerConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#F43F5E', '#06B6D4', '#EC4899'];
  
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 15,
      vy: Math.random() * -15 - 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.3 + Math.random() * 0.2,
      opacity: 1,
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let alive = false;
    particles.forEach(p => {
      if (p.opacity <= 0) return;
      alive = true;
      
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotationSpeed;
      p.vx *= 0.99;
      
      if (frame > 40) p.opacity -= 0.015;

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });

    frame++;
    if (alive && frame < 200) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}

// ─── Code Copy ───────────────────────────────────────────────
function copyCode(btn) {
  const codeBlock = btn.closest('.code-block');
  const code = codeBlock.querySelector('pre code');
  const text = code.textContent;
  
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ Copied';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    btn.textContent = 'Failed';
    setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
  });
}

// ─── Mobile Sidebar ──────────────────────────────────────────
function bindGlobalEvents() {
  const hamburger = document.getElementById('hamburgerBtn');
  const overlay = document.getElementById('sidebarOverlay');
  
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileSidebar);
  }
  if (overlay) {
    overlay.addEventListener('click', closeMobileSidebar);
  }
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const hamburger = document.getElementById('hamburgerBtn');
  
  const isOpen = sidebar.classList.contains('open');
  sidebar.classList.toggle('open', !isOpen);
  overlay.classList.toggle('active', !isOpen);
  hamburger.classList.toggle('active', !isOpen);
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const hamburger = document.getElementById('hamburgerBtn');
  
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  if (hamburger) hamburger.classList.remove('active');
}

// ─── Persistence ─────────────────────────────────────────────
function saveProgress() {
  const data = {
    xp: APP_STATE.xp,
    completedSections: Array.from(APP_STATE.completedSections),
    completedQuizzes: APP_STATE.completedQuizzes,
    achievements: Array.from(APP_STATE.achievements),
    streak: APP_STATE.streak,
    lastVisitDate: APP_STATE.lastVisitDate,
  };
  try {
    localStorage.setItem('ai_academy_progress', JSON.stringify(data));
  } catch (e) {
    console.warn('Could not save progress:', e);
  }
}

function loadProgress() {
  try {
    const data = JSON.parse(localStorage.getItem('ai_academy_progress'));
    if (data) {
      APP_STATE.xp = data.xp || 0;
      APP_STATE.completedSections = new Set(data.completedSections || []);
      APP_STATE.completedQuizzes = data.completedQuizzes || {};
      APP_STATE.achievements = new Set(data.achievements || []);
      APP_STATE.streak = data.streak || 0;
      APP_STATE.lastVisitDate = data.lastVisitDate || null;
    }
  } catch (e) {
    console.warn('Could not load progress:', e);
  }
}
