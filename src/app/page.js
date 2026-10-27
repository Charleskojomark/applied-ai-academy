'use client';

import React, { useState, useEffect, useRef } from 'react';
import { COURSE_CONTENT, LEVELS, ACHIEVEMENTS, XP_REWARDS } from '@/lib/content';

// Import Interactive Components
import UserModal from '@/components/UserModal';
import CostExplorer from '@/components/CostExplorer';
import TruncationSim from '@/components/TruncationSim';
import DecisionTree from '@/components/DecisionTree';
import VirtualSandbox from '@/components/VirtualSandbox';
import TokenizerDemo from '@/components/TokenizerDemo';
import AttentionViz from '@/components/AttentionViz';
import PipelineViz from '@/components/PipelineViz';
import QuizModal from '@/components/QuizModal';
import ResultsModal from '@/components/ResultsModal';
import ToastContainer from '@/components/ToastContainer';
import PromptHierarchySim from '@/components/PromptHierarchySim';
import FewShotCotSim from '@/components/FewShotCotSim';
import StructuredOutputSim from '@/components/StructuredOutputSim';
import PromptEvalSim from '@/components/PromptEvalSim';
import VectorSimilaritySim from '@/components/VectorSimilaritySim';
import VectorDbSelectorSim from '@/components/VectorDbSelectorSim';
import ChunkingHybridSim from '@/components/ChunkingHybridSim';
import RagPipelineSim from '@/components/RagPipelineSim';
import RagFailureDebuggerSim from '@/components/RagFailureDebuggerSim';
import ToolRouterSim from '@/components/ToolRouterSim';
import AgentFrameworksSim from '@/components/AgentFrameworksSim';
import AgentMemorySim from '@/components/AgentMemorySim';
import WorkingAgentSim from '@/components/WorkingAgentSim';

export default function AcademyApp() {
  // ─── User & Cloud State ─────────────────────────────────────
  const [username, setUsername] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // ─── Learning Progress State ────────────────────────────────
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' | moduleId
  const [completedSections, setCompletedSections] = useState(new Set());
  const [completedQuizzes, setCompletedQuizzes] = useState({}); // moduleId -> { score, total, xpEarned }
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(1);
  const [achievements, setAchievements] = useState(new Set());
  const [expandedSections, setExpandedSections] = useState(new Set());

  // ─── UI State ───────────────────────────────────────────────
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null); // { modId, title, questions }
  const [quizResults, setQuizResults] = useState(null); // { score, total, xpEarned, isPerfect }
  const [toasts, setToasts] = useState([]);
  const [archTab, setArchTab] = useState('direct'); // for Module 1 direct vs pipeline toggle
  const [labChecks, setLabChecks] = useState(new Set()); // checked practice lab items

  // ─── Toast System Helper ────────────────────────────────────
  const showToast = (icon, title, desc, xpText) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, icon, title, desc, xp: xpText }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // ─── Cloud Sync Helper ──────────────────────────────────────
  // ─── Cloud Sync Helper ──────────────────────────────────────
  const syncToNeon = async (newXp, newSections, newQuizzes, newLevel, newAchievements) => {
    if (!username) return;
    setIsSyncing(true);
    try {
      await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          xp: newXp,
          level: newLevel,
          streak,
          completedSections: Array.from(newSections),
          completedQuizzes: newQuizzes,
          achievements: Array.from(newAchievements || achievements),
        }),
      });
    } catch (err) {
      console.warn('Neon sync warning:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  // ─── Level Calculation ──────────────────────────────────────
  const getCurrentLevel = (currentXp = xp) => {
    let current = LEVELS[0];
    for (const lvl of LEVELS) {
      if (currentXp >= lvl.minXp) current = lvl;
    }
    return current;
  };

  // ─── Deterministic Achievements Computation ────────────────
  const computeAllAchievements = (currentSections, currentQuizzes, existingAchievements = new Set(), options = { showToasts: false }) => {
    const updated = new Set(existingAchievements);
    const sectsCount = currentSections.size;
    const quizEntries = Object.values(currentQuizzes || {});
    const quizCount = Object.keys(currentQuizzes || {}).length;
    const totalCourseSections = COURSE_CONTENT.modules.reduce((acc, m) => acc + (m.sections ? m.sections.length : 0), 0);
    const totalQuizModules = COURSE_CONTENT.modules.filter((m) => m.quiz && m.quiz.length > 0).length;

    const check = (id, condition, icon, name, xpReward) => {
      if (condition && !updated.has(id)) {
        updated.add(id);
        if (options.showToasts) {
          showToast(icon, 'Achievement Unlocked!', name, `+${xpReward} XP`);
        }
      }
    };

    // Section milestones
    check('first_section', sectsCount >= 1, '🎯', 'First Steps', 10);
    check('five_sections', sectsCount >= 5, '📚', 'Dedicated Learner', 25);
    check('ten_sections', sectsCount >= 10, '🧠', 'Knowledge Seeker', 40);
    check('fifteen_sections', sectsCount >= 15, '🎓', 'Master Student', 60);
    check('twenty_sections', sectsCount >= 20, '⚡', 'AI Architect', 100);
    check('twenty_five_sections', sectsCount >= 25, '🛡️', 'Prompt Engineer', 120);
    check('thirty_sections', sectsCount >= 30, '🚀', 'Production Commander', 150);
    check('thirty_five_sections', sectsCount >= 35, '🎯', 'Vector Specialist', 180);
    check('forty_sections', sectsCount >= 40, '⚡', 'RAG Master', 200);
    check('forty_five_sections', sectsCount >= 45, '🛠️', 'Agentic Engineer', 220);
    check('fifty_sections', sectsCount >= 50, '🤖', 'Autonomous Systems Lead', 250);
    check('all_sections_complete', totalCourseSections > 0 && sectsCount >= totalCourseSections, '👑', 'Grandmaster AI Architect', 300);

    // Quiz milestones
    check('first_quiz', quizCount >= 1, '📝', 'Quiz Taker', 15);
    check('all_quizzes', totalQuizModules > 0 && quizCount >= totalQuizModules, '🏅', 'Quiz Champion', 80);

    // Perfect score on any quiz
    const hasPerfectScore = quizEntries.some(
      (q) => q && typeof q.score === 'number' && typeof q.total === 'number' && q.score === q.total && q.total > 0
    );
    check('perfect_score', hasPerfectScore, '💯', 'Perfect Score', 50);

    // Module Master: Complete all sections in at least one module
    const hasAnyCompletedModule = COURSE_CONTENT.modules.some(
      (m) => m.sections && m.sections.length > 0 && m.sections.every((s) => currentSections.has(s.id))
    );
    check('module_complete', hasAnyCompletedModule, '🏆', 'Module Master', 30);

    return updated;
  };

  // ─── Trigger Achievement Evaluation ─────────────────────────
  const evaluateAchievements = (currentXp, currentSections, currentQuizzes, customId = null) => {
    let base = new Set(achievements);
    if (customId) {
      const achDef = ACHIEVEMENTS.find((a) => a.id === customId);
      if (achDef && !base.has(customId)) {
        base.add(customId);
        showToast(achDef.icon, 'Achievement Unlocked!', achDef.name, `+${achDef.xpReward} XP`);
      }
    }
    const updated = computeAllAchievements(currentSections, currentQuizzes, base, { showToasts: true });
    setAchievements(updated);
    try {
      localStorage.setItem('ai_academy_achievements', JSON.stringify(Array.from(updated)));
    } catch (e) {}
    return updated;
  };

  // ─── Initial Load & Hydration ───────────────────────────────
  useEffect(() => {
    // Check URL parameters for direct module navigation
    try {
      const params = new URLSearchParams(window.location.search);
      const mod = params.get('module');
      if (mod) {
        const found = COURSE_CONTENT.modules.find((m) => m.id === mod);
        if (found) {
          setCurrentView(mod);
          if (found.sections && found.sections.length > 0) {
            setExpandedSections(new Set([found.sections[0].id]));
          }
        }
      }
    } catch (e) {}

    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const mod = params.get('module');
        if (mod) {
          const found = COURSE_CONTENT.modules.find((m) => m.id === mod);
          if (found) {
            setCurrentView(mod);
            if (found.sections && found.sections.length > 0) {
              setExpandedSections(new Set([found.sections[0].id]));
            }
            return;
          }
        }
        setCurrentView('dashboard');
        setExpandedSections(new Set());
      } catch (e) {}
    };

    window.addEventListener('popstate', handlePopState);

    const savedUser = localStorage.getItem('ai_academy_username');
    if (savedUser) {
      setUsername(savedUser);
      // Fetch user from Neon
      fetch(`/api/user?username=${encodeURIComponent(savedUser)}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.success && data.user) {
            const u = data.user;
            setUserProfile(u);
            if (u.xp) setXp(u.xp);
            if (u.streak) setStreak(u.streak);
            const loadedSections = new Set(Array.isArray(u.completed_sections) ? u.completed_sections : []);
            const loadedQuizzes = u.completed_quizzes && typeof u.completed_quizzes === 'object' ? u.completed_quizzes : {};
            const dbAchievements = new Set(Array.isArray(u.achievements) ? u.achievements : []);
            try {
              const localSaved = localStorage.getItem('ai_academy_achievements');
              if (localSaved) {
                JSON.parse(localSaved).forEach((id) => dbAchievements.add(id));
              }
            } catch (e) {}

            setCompletedSections(loadedSections);
            setCompletedQuizzes(loadedQuizzes);

            const allEarned = computeAllAchievements(loadedSections, loadedQuizzes, dbAchievements, { showToasts: false });
            setAchievements(allEarned);
            try {
              localStorage.setItem('ai_academy_achievements', JSON.stringify(Array.from(allEarned)));
            } catch (e) {}

            showToast('☁️', 'Neon Cloud Synced', `Welcome back @${u.username}`, `Level ${u.level || 1}`);
          }
        })
        .catch((err) => console.warn('Could not fetch user profile from Neon:', err));
    } else {
      // First visit: show callsign modal
      setIsUserModalOpen(true);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // ─── Bind Global Course Interactive Handlers ─────────────────
  useEffect(() => {
    // 1. Expose copyCode on window for inline onclicks
    window.copyCode = (btn) => {
      if (!btn) return;
      const codeBlock = btn.closest('.code-block');
      const code = codeBlock ? codeBlock.querySelector('pre code') : null;
      if (!code) return;
      navigator.clipboard.writeText(code.textContent).then(() => {
        const orig = btn.textContent;
        btn.textContent = '✓ Copied';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = orig;
          btn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        btn.textContent = 'Failed';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      });
    };

    // 2. Expose toggleChecklistItem on window
    window.toggleChecklistItem = (itemEl, labPrefix) => {
      if (!itemEl) return;
      itemEl.classList.toggle('checked');
      const parent = itemEl.parentElement;
      if (!parent) return;
      const checked = parent.querySelectorAll('.checklist-item.checked').length;
      const total = parent.querySelectorAll('.checklist-item').length;
      const counter = document.getElementById(`${labPrefix}ChecklistCount`);
      if (counter) counter.textContent = `${checked} / ${total} Completed`;
      if (checked === total && total > 0) {
        showToast('🏆', 'Lab Complete!', `All steps in ${labPrefix.toUpperCase()} finished!`, '+25 XP');
        setXp((x) => x + 25);
      }
    };

    // 3. Global Click Delegation for Course Tabs & Toggles
    const handleGlobalClick = (e) => {
      // Arch toggle buttons (Hosted vs Open-Weight)
      const archBtn = e.target.closest('.arch-toggle-btn');
      if (archBtn) {
        e.preventDefault();
        const container = archBtn.closest('.arch-toggle-container') || document;
        container.querySelectorAll('.arch-toggle-btn').forEach((b) => b.classList.remove('active'));
        archBtn.classList.add('active');
        container.querySelectorAll('.arch-panel').forEach((p) => p.classList.remove('active'));
        const panel = document.getElementById(`arch-${archBtn.dataset.panel}`);
        if (panel) panel.classList.add('active');
        return;
      }

      // Prompt compare tabs (Prompt A vs Prompt B vs Analysis)
      const promptTab = e.target.closest('.prompt-tab');
      if (promptTab) {
        e.preventDefault();
        const container = promptTab.closest('.prompt-compare') || document;
        container.querySelectorAll('.prompt-tab').forEach((t) => t.classList.remove('active'));
        promptTab.classList.add('active');
        container.querySelectorAll('.prompt-content').forEach((p) => p.classList.remove('active'));
        const target = document.getElementById(promptTab.dataset.target);
        if (target) target.classList.add('active');
        return;
      }

      // Pipeline stages (Tokenization, Embeddings, Attention, Generation)
      const stage = e.target.closest('.pipeline-stage');
      if (stage) {
        e.preventDefault();
        const container = stage.closest('.pipeline-viz') || document;
        container.querySelectorAll('.pipeline-stage').forEach((s) => s.classList.remove('active-stage'));
        stage.classList.add('active-stage');
        const detail = document.getElementById('pipelineDetail');
        if (detail && stage.dataset.detail) {
          detail.style.opacity = '0';
          setTimeout(() => {
            detail.textContent = stage.dataset.detail;
            detail.style.opacity = '1';
          }, 150);
        }
        return;
      }

      // Copy code button fallback
      const copyBtn = e.target.closest('.code-copy');
      if (copyBtn && window.copyCode) {
        e.preventDefault();
        window.copyCode(copyBtn);
        return;
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  // ─── User Creation / Switch Handler ─────────────────────────
  const handleUserCreated = (user, isNew) => {
    setUsername(user.username);
    setUserProfile(user);
    localStorage.setItem('ai_academy_username', user.username);
    setIsUserModalOpen(false);

    if (!isNew) {
      // Hydrate existing progress from Neon
      if (user.xp) setXp(user.xp);
      if (user.streak) setStreak(user.streak);
      const loadedSections = new Set(Array.isArray(user.completed_sections) ? user.completed_sections : []);
      const loadedQuizzes = user.completed_quizzes && typeof user.completed_quizzes === 'object' ? user.completed_quizzes : {};
      const dbAchievements = new Set(Array.isArray(user.achievements) ? user.achievements : []);
      setCompletedSections(loadedSections);
      setCompletedQuizzes(loadedQuizzes);

      const allEarned = computeAllAchievements(loadedSections, loadedQuizzes, dbAchievements, { showToasts: false });
      setAchievements(allEarned);
      try {
        localStorage.setItem('ai_academy_achievements', JSON.stringify(Array.from(allEarned)));
      } catch (e) {}
    }

    showToast(
      isNew ? '🚀' : '👋',
      isNew ? 'Callsign Registered!' : 'Profile Loaded',
      `Connected to Neon PostgreSQL as @${user.username}`,
      isNew ? '+20 XP' : ''
    );
  };

  // ─── Navigation ─────────────────────────────────────────────
  const navigateTo = (viewId) => {
    setCurrentView(viewId);
    if (viewId !== 'dashboard') {
      const mod = COURSE_CONTENT.modules.find((m) => m.id === viewId);
      if (mod && mod.sections && mod.sections.length > 0) {
        setExpandedSections(new Set([mod.sections[0].id]));
      } else {
        setExpandedSections(new Set());
      }
    } else {
      setExpandedSections(new Set());
    }
    setIsMobileSidebarOpen(false);
    try {
      const url = new URL(window.location.href);
      if (viewId === 'dashboard') {
        url.searchParams.delete('module');
      } else {
        url.searchParams.set('module', viewId);
      }
      window.history.pushState({}, '', url.toString());
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─── Section Toggle & Completion ───────────────────────────
  const toggleSection = (sectId) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectId)) next.delete(sectId);
      else next.add(sectId);
      return next;
    });
  };

  const markSectionComplete = (sectId) => {
    if (completedSections.has(sectId)) return;

    const nextSections = new Set(completedSections);
    nextSections.add(sectId);
    setCompletedSections(nextSections);

    const newXp = xp + XP_REWARDS.sectionComplete;
    setXp(newXp);
    const lvl = getCurrentLevel(newXp);

    showToast('✨', 'Section Completed!', 'Earned XP toward next rank', `+${XP_REWARDS.sectionComplete} XP`);
    const updatedAch = evaluateAchievements(newXp, nextSections, completedQuizzes);
    syncToNeon(newXp, nextSections, completedQuizzes, lvl.level, updatedAch);
  };

  // ─── Quiz Handler ───────────────────────────────────────────
  const handleStartQuiz = (mod) => {
    setActiveQuiz({
      modId: mod.id,
      title: mod.title,
      questions: mod.quiz,
    });
  };

  const handleQuizComplete = (score, total, xpEarned, isPerfect) => {
    const modId = activeQuiz.modId;
    setActiveQuiz(null);

    const nextQuizzes = {
      ...completedQuizzes,
      [modId]: { score, total, xpEarned },
    };
    setCompletedQuizzes(nextQuizzes);

    const newXp = xp + xpEarned;
    setXp(newXp);
    const lvl = getCurrentLevel(newXp);

    setQuizResults({ score, total, xpEarned, isPerfect });
    showToast(isPerfect ? '💯' : '🎉', 'Quiz Passed!', `Scored ${score}/${total}`, `+${xpEarned} XP`);
    const updatedAch = evaluateAchievements(newXp, completedSections, nextQuizzes);
    syncToNeon(newXp, completedSections, nextQuizzes, lvl.level, updatedAch);
  };

  // ─── Practice Lab Checklists ────────────────────────────────
  const toggleLabCheck = (checkKey, labName) => {
    setLabChecks((prev) => {
      const next = new Set(prev);
      if (next.has(checkKey)) next.delete(checkKey);
      else {
        next.add(checkKey);
        showToast('🔨', 'Practice Step Done', `${labName} task verified`, '+10 XP');
        setXp((x) => x + 10);
      }
      return next;
    });
  };

  // ─── Computations for Sidebar & Progress ────────────────────
  const totalSections = COURSE_CONTENT.modules.reduce((a, m) => a + m.sections.length, 0);
  const completedSectsCount = completedSections.size;
  const globalProgressPct = totalSections > 0 ? (completedSectsCount / totalSections) * 100 : 0;
  const currentLvl = getCurrentLevel();
  const nextLvl = LEVELS.find((l) => l.minXp > xp);
  const isMaxLevel = !nextLvl;
  const levelTargetXp = nextLvl ? nextLvl.minXp : currentLvl.maxXp;
  const xpInLevel = Math.max(0, xp - currentLvl.minXp);
  const xpForNext = Math.max(1, levelTargetXp - currentLvl.minXp);
  const levelFillRatio = Math.min(1, Math.max(0, xpInLevel / xpForNext));
  const levelRingCircumference = 2 * Math.PI * 26;
  const levelRingOffset = levelRingCircumference - levelFillRatio * levelRingCircumference;

  const activeModule = COURSE_CONTENT.modules.find((m) => m.id === currentView);

  return (
    <>
      {/* Top Progress Bar */}
      <div className="top-progress-bar" id="topProgressBar">
        <div
          className="top-progress-fill"
          style={{ width: `${globalProgressPct}%` }}
        ></div>
      </div>

      {/* Mobile Header */}
      <header className="mobile-header" id="mobileHeader">
        <button
          className={`hamburger ${isMobileSidebarOpen ? 'active' : ''}`}
          id="hamburgerBtn"
          aria-label="Toggle navigation"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="mobile-logo" onClick={() => navigateTo('dashboard')} style={{ cursor: 'pointer' }}>
          <span className="logo-icon">⚡</span>
          <span>AI Academy</span>
        </div>
        <div className="mobile-header-right">
          <div
            className="mobile-xp mobile-callsign-btn"
            onClick={() => setIsUserModalOpen(true)}
            title="Click to view Neon Cloud Callsign"
          >
            {username ? `@${username}` : '⚡ Register'}
          </div>
          <div className="mobile-xp">{xp} XP</div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${isMobileSidebarOpen ? 'active' : ''}`}
        id="sidebarOverlay"
        onClick={() => setIsMobileSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${isMobileSidebarOpen ? 'open' : ''}`} id="sidebar">
        <div className="sidebar-header">
          <div className="logo" onClick={() => navigateTo('dashboard')} style={{ cursor: 'pointer' }}>
            <div className="logo-icon-wrap">
              <span className="logo-icon">⚡</span>
            </div>
            <div className="logo-text">
              <span className="logo-title">AI Academy</span>
              <span className="logo-subtitle">Applied AI Engineering</span>
            </div>
          </div>
          <button
            className="sidebar-close-btn"
            id="sidebarCloseBtn"
            aria-label="Close navigation"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* User Callsign Cloud Pill */}
        <div
          className="user-pill"
          onClick={() => setIsUserModalOpen(true)}
          title="Neon PostgreSQL Serverless Profile"
        >
          <div className="user-pill-avatar">
            {username ? username[0].toUpperCase() : '?'}
          </div>
          <div className="user-pill-info">
            <span className="user-pill-name">
              {username ? `@${username}` : 'Set Callsign'}
            </span>
            <span className="user-pill-cloud">
              <span className="cloud-dot"></span>
              <span>{isSyncing ? 'Syncing...' : 'Neon DB Linked'}</span>
            </span>
          </div>
          <span className="user-pill-action">⚙️</span>
        </div>

        {/* Player Stats Card */}
        <div className="player-card">
          <div className="level-badge" id="levelBadge">
            <svg className="level-ring" viewBox="0 0 60 60">
              <circle className="level-ring-bg" cx="30" cy="30" r="26" />
              <circle
                className="level-ring-fill"
                id="levelRingFill"
                cx="30"
                cy="30"
                r="26"
                style={{
                  strokeDasharray: levelRingCircumference,
                  strokeDashoffset: levelRingOffset,
                }}
              />
            </svg>
            <span className="level-number" id="levelNumber">
              {currentLvl.level}
            </span>
          </div>
          <div className="player-info">
            <span className="player-rank" id="playerRank">
              {currentLvl.icon} {currentLvl.name}
            </span>
            <div className="xp-bar-container">
              <div className="xp-bar">
                <div
                  className="xp-fill"
                  id="xpFill"
                  style={{ width: `${levelFillRatio * 100}%` }}
                ></div>
              </div>
              <span className="xp-text" id="xpText">
                {isMaxLevel && xp >= currentLvl.maxXp
                  ? `${xp} XP (MAX)`
                  : `${xp} / ${levelTargetXp} XP`}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav" id="sidebarNav">
          <div
            className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => navigateTo('dashboard')}
          >
            <div className="nav-icon" style={{ background: 'rgba(255,255,255,0.05)' }}>
              🏠
            </div>
            <div className="nav-item-info">
              <span className="nav-item-title">Dashboard</span>
              <span className="nav-item-subtitle">Overview & Progress</span>
            </div>
          </div>

          {COURSE_CONTENT.modules.map((mod, i) => {
            const completedInMod = mod.sections.filter((s) => completedSections.has(s.id)).length;
            const modProgress = mod.sections.length > 0 ? (completedInMod / mod.sections.length) * 100 : 0;
            const ringCirc = 2 * Math.PI * 11;
            const ringOffset = ringCirc - (modProgress / 100) * ringCirc;

            return (
              <div
                key={mod.id}
                className={`nav-item ${currentView === mod.id ? 'active' : ''}`}
                onClick={() => navigateTo(mod.id)}
              >
                <div className="nav-icon" style={{ background: mod.gradient, opacity: 0.9 }}>
                  {mod.icon}
                </div>
                <div className="nav-item-info">
                  <span className="nav-item-title">{mod.title}</span>
                  <span className="nav-item-subtitle">Module {i}</span>
                </div>
                <div className="nav-progress">
                  <svg viewBox="0 0 28 28">
                    <circle className="nav-progress-bg" cx="14" cy="14" r="11" />
                    <circle
                      className="nav-progress-fill"
                      cx="14"
                      cy="14"
                      r="11"
                      style={{
                        stroke: mod.color,
                        strokeDasharray: ringCirc,
                        strokeDashoffset: ringOffset,
                      }}
                    />
                  </svg>
                  <span className="nav-check">
                    {modProgress === 100 ? '✓' : `${Math.round(modProgress)}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="streak-card">
            <span className="streak-flame">🔥</span>
            <div className="streak-info">
              <span className="streak-count" id="streakCount">
                {streak}
              </span>
              <span className="streak-label">Day Streak</span>
            </div>
          </div>
          <div className="stats-mini">
            <div className="stat-mini">
              <span className="stat-mini-value" id="totalSections">
                {completedSectsCount}
              </span>
              <span className="stat-mini-label">Sections</span>
            </div>
            <div className="stat-mini">
              <span className="stat-mini-value" id="totalQuizzes">
                {Object.keys(completedQuizzes).length}
              </span>
              <span className="stat-mini-label">Quizzes</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content" id="mainContent">
        {currentView === 'dashboard' ? (
          /* ========================================================
             DASHBOARD VIEW
             ======================================================== */
          <div className="dashboard">
            {/* Cloud Status Banner */}
            <div className="cloud-status-banner">
              <div className="cloud-status-left">
                <span className="cloud-dot"></span>
                <span>
                  <strong>Neon Serverless DB:</strong>{' '}
                  {username ? (
                    <>Connected as <code>@{username}</code></>
                  ) : (
                    'Not linked'
                  )}
                </span>
              </div>
              <div className="cloud-status-right">
                <button
                  className="cloud-switch-link"
                  onClick={() => setIsUserModalOpen(true)}
                >
                  {username ? 'Change Callsign ⚙️' : 'Create Username 🚀'}
                </button>
              </div>
            </div>

            {/* Hero Section */}
            <div className="hero-section">
              <div
                className="hero-bg"
                style={{ backgroundImage: `url('/assets/hero-banner.jpg')` }}
              ></div>
              <div className="hero-content">
                <div className="hero-badge">⚡ PRODUCTION AI CURRICULUM</div>
                <h1 className="hero-title">Applied AI Engineering</h1>
                <p className="hero-desc">
                  Master production AI systems through interactive architectures, cost & latency
                  explorers, fail-fast client boundaries, and gamified knowledge checks.
                </p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="stats-row">
              <div className="stat-card">
                <span className="stat-icon">⚡</span>
                <span className="stat-value gradient-text">{xp}</span>
                <span className="stat-label">Total XP</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">📖</span>
                <span className="stat-value">
                  {completedSectsCount}
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    /{totalSections}
                  </span>
                </span>
                <span className="stat-label">Sections Done</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🧪</span>
                <span className="stat-value">
                  {Object.keys(completedQuizzes).length}
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    /{COURSE_CONTENT.modules.length}
                  </span>
                </span>
                <span className="stat-label">Quizzes Passed</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">{currentLvl.icon}</span>
                <span className="stat-value">{currentLvl.name}</span>
                <span className="stat-label">Current Level</span>
              </div>
            </div>

            {/* Modules Grid */}
            <div className="modules-section">
              <div className="section-title">
                Course Modules
                <span className="section-title-line"></span>
              </div>
              <div className="modules-grid">
                {COURSE_CONTENT.modules.map((mod, i) => {
                  const completedInMod = mod.sections.filter((s) => completedSections.has(s.id)).length;
                  const modProgress = (completedInMod / mod.sections.length) * 100;

                  return (
                    <div
                      key={mod.id}
                      className="module-card"
                      onClick={() => navigateTo(mod.id)}
                      style={{ '--card-accent': mod.gradient }}
                    >
                      <div className="module-card-header">
                        <div
                          className="module-card-icon"
                          style={{ background: mod.gradient }}
                        >
                          {mod.icon}
                        </div>
                        <div className="module-card-meta">
                          <span className="module-card-number">Module {i}</span>
                          <span className="module-card-title">{mod.title}</span>
                        </div>
                      </div>
                      <p className="module-card-desc">{mod.subtitle}</p>
                      <div className="module-card-footer">
                        <div className="module-progress-bar">
                          <div
                            className="module-progress-fill"
                            style={{
                              width: `${modProgress}%`,
                              background: mod.gradient,
                            }}
                          ></div>
                        </div>
                        <span className="module-progress-text">
                          {Math.round(modProgress)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievements Grid */}
            <div className="modules-section">
              <div className="section-title">
                🏆 Engineering Achievements
                <span className="section-title-line"></span>
              </div>
              <div className="info-grid">
                {ACHIEVEMENTS.map((a) => {
                  const unlocked = achievements.has(a.id);
                  return (
                    <div
                      key={a.id}
                      className="info-card"
                      style={{
                        opacity: unlocked ? 1 : 0.45,
                        borderColor: unlocked ? 'rgba(245, 158, 11, 0.35)' : 'var(--border-subtle)',
                        background: unlocked ? 'rgba(245, 158, 11, 0.05)' : 'rgba(255,255,255,0.02)',
                      }}
                    >
                      <span className="info-card-icon">{a.icon}</span>
                      <span className="info-card-title">{a.name}</span>
                      <span className="info-card-desc">
                        {a.desc} {unlocked ? '✅' : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================
             MODULE VIEW
             ======================================================== */
          activeModule && (
            <div className="module-page">
              <div className="module-header">
                <div className="module-breadcrumb">
                  <span
                    onClick={() => navigateTo('dashboard')}
                    style={{ cursor: 'pointer', color: 'var(--accent-blue)' }}
                  >
                    Dashboard
                  </span>
                  <span className="module-breadcrumb-sep">›</span>
                  <span>
                    Module {COURSE_CONTENT.modules.indexOf(activeModule)}
                  </span>
                </div>
                <div className="module-hero">
                  <div
                    className="module-hero-icon"
                    style={{ background: activeModule.gradient }}
                  >
                    {activeModule.icon}
                  </div>
                  <div>
                    <h1 className="module-hero-title">{activeModule.title}</h1>
                    <p className="module-hero-subtitle">{activeModule.subtitle}</p>
                  </div>
                </div>
                <div className="module-section-count">
                  <span>📖 {activeModule.sections.length} Sections</span>
                  <span>
                    ✅{' '}
                    {activeModule.sections.filter((s) => completedSections.has(s.id)).length}{' '}
                    Completed
                  </span>
                  <span>🧪 {activeModule.quiz.length} Quiz Questions</span>
                </div>
              </div>

              {/* Sections Accordion */}
              <div className="sections-container">
                {activeModule.sections.map((section, idx) => {
                  const isDone = completedSections.has(section.id);
                  const isExpanded = expandedSections.has(section.id);

                  return (
                    <div
                      key={section.id}
                      className={`section-card ${isDone ? 'completed' : ''} ${isExpanded ? 'expanded' : ''}`}
                    >
                      <div
                        className="section-header"
                        role="button"
                        tabIndex={0}
                        aria-expanded={isExpanded}
                        aria-controls={`section-content-${section.id}`}
                        onClick={() => toggleSection(section.id)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            toggleSection(section.id);
                          }
                        }}
                      >
                        <div className="section-number">{isDone ? '✓' : idx + 1}</div>
                        <div className="section-header-text">
                          <span className="section-title-text">{section.title}</span>
                          <span className={`section-type-badge badge-${section.badge}`}>
                            {section.type}
                          </span>
                        </div>
                        <div className="section-toggle">
                          {isExpanded ? '▲' : '▼'}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="section-body" id={`section-content-${section.id}`}>
                          <div className="section-content">
                            {/* Render HTML content */}
                            <div
                              dangerouslySetInnerHTML={{ __html: section.content }}
                            />

                            {/* Embedded React Interactive Components */}
                            {section.interactiveId === 'tokenizer' && <TokenizerDemo />}
                            {section.interactiveId === 'attention' && <AttentionViz />}
                            {section.interactiveId === 'cost-explorer' && (
                              <CostExplorer
                                onInteract={() => {
                                  if (!achievements.has('cost_optimizer')) {
                                    const nextAch = evaluateAchievements(xp, completedSections, completedQuizzes, 'cost_optimizer');
                                    syncToNeon(xp, completedSections, completedQuizzes, currentLvl.level, nextAch);
                                  }
                                }}
                              />
                            )}
                            {section.interactiveId === 'truncation-viz' && <TruncationSim />}
                            {section.interactiveId === 'decision-tree' && <DecisionTree />}
                            {section.interactiveId === 'env-sandbox' && (
                              <VirtualSandbox
                                onSimulationSuccess={() => {
                                  showToast('🛡️', 'Boundary Secured', 'API key validation passed!', '+35 XP');
                                  const newXp = xp + 35;
                                  setXp(newXp);
                                  const lvl = getCurrentLevel(newXp);
                                  const nextAch = evaluateAchievements(newXp, completedSections, completedQuizzes, 'env_secured');
                                  syncToNeon(newXp, completedSections, completedQuizzes, lvl.level, nextAch);
                                }}
                              />
                            )}
                            {section.interactiveId === 'prompt-hierarchy-sim' && (
                              <PromptHierarchySim
                                onInteract={() => {
                                  showToast('🛡️', 'Precedence Verified', 'Prompt hierarchy evaluated!', '+25 XP');
                                  setXp((x) => x + 25);
                                }}
                              />
                            )}
                            {section.interactiveId === 'fewshot-cot-sim' && (
                              <FewShotCotSim
                                onInteract={() => {
                                  showToast('🧠', 'Reasoning Evaluated', 'Ticket routing strategy analyzed!', '+25 XP');
                                  setXp((x) => x + 25);
                                }}
                              />
                            )}
                            {section.interactiveId === 'structured-output-sim' && (
                              <StructuredOutputSim
                                onInteract={() => {
                                  showToast('📦', 'Contract Enforced', 'Structured repair loop executed!', '+30 XP');
                                  setXp((x) => x + 30);
                                }}
                              />
                            )}
                            {section.interactiveId === 'prompt-eval-sim' && (
                              <PromptEvalSim
                                onInteract={() => {
                                  showToast('🧪', 'Eval Suite Passed', 'A/B prompt comparison checked!', '+30 XP');
                                  setXp((x) => x + 30);
                                }}
                              />
                            )}
                            {section.interactiveId === 'vector-similarity-sim' && (
                              <VectorSimilaritySim
                                onInteract={() => {
                                  showToast('🎯', 'Similarity Computed', 'Vector space evaluated!', '+30 XP');
                                  setXp((x) => x + 30);
                                }}
                              />
                            )}
                            {section.interactiveId === 'vector-db-sim' && (
                              <VectorDbSelectorSim
                                onInteract={() => {
                                  showToast('🗄️', 'Store Verified', 'Vector persistence tested!', '+30 XP');
                                  setXp((x) => x + 30);
                                }}
                              />
                            )}
                            {section.interactiveId === 'chunking-hybrid-sim' && (
                              <ChunkingHybridSim
                                onInteract={() => {
                                  showToast('🔀', 'Hybrid Search', 'BM25 + Dense blend tested!', '+30 XP');
                                  setXp((x) => x + 30);
                                }}
                              />
                            )}
                            {section.interactiveId === 'rag-pipeline-sim' && (
                              <RagPipelineSim
                                onInteract={() => {
                                  showToast('⚡', 'RAG Executed', 'Grounding citations validated!', '+35 XP');
                                  setXp((x) => x + 35);
                                }}
                              />
                            )}
                            {section.interactiveId === 'rag-debugger-sim' && (
                              <RagFailureDebuggerSim
                                onInteract={() => {
                                  showToast('🩺', 'Triage Complete', 'Sequential pipeline debugged!', '+35 XP');
                                  setXp((x) => x + 35);
                                }}
                              />
                            )}
                            {section.interactiveId === 'tool-router-sim' && (
                              <ToolRouterSim
                                onInteract={() => {
                                  showToast('🛡️', 'Router Verified', 'Tool call schema validated!', '+30 XP');
                                  setXp((x) => x + 30);
                                }}
                              />
                            )}
                            {section.interactiveId === 'agent-frameworks-sim' && (
                              <AgentFrameworksSim
                                onInteract={() => {
                                  showToast('🕸️', 'Graph Stepped', 'Stateful node transitioned!', '+30 XP');
                                  setXp((x) => x + 30);
                                }}
                              />
                            )}
                            {section.interactiveId === 'agent-memory-sim' && (
                              <AgentMemorySim
                                onInteract={() => {
                                  showToast('🧠', 'Loop Checked', 'State diff progression verified!', '+35 XP');
                                  setXp((x) => x + 35);
                                }}
                              />
                            )}
                            {section.interactiveId === 'working-agent-sim' && (
                              <WorkingAgentSim
                                onInteract={() => {
                                  showToast('🤖', 'Agent Grounded', 'ReAct trace completed!', '+40 XP');
                                  setXp((x) => x + 40);
                                }}
                              />
                            )}

                            {/* Interactive Labs Checklists (Module 4) */}
                            {section.id === 'env-practice' && (
                              <div className="practice-lab">
                                <div className="practice-lab-header">
                                  <div className="practice-lab-title">
                                    <span>🧪</span>
                                    <span>Hands-On Local Environment Lab Checklist</span>
                                  </div>
                                  <span className="practice-lab-badge">Learner In-Person Practice</span>
                                </div>
                                <div className="practice-lab-desc">
                                  Open your local terminal and complete these real configuration steps to secure your production boundaries:
                                </div>
                                <div className="checklist-container">
                                  <div className="checklist-header">
                                    <span className="checklist-title">Verification Checklist</span>
                                  </div>
                                  <div className="checklist-items">
                                    {[
                                      { id: 'lab1-venv', text: 'Create virtual environment: python -m venv .venv' },
                                      { id: 'lab1-activate', text: 'Activate environment: source .venv/bin/activate (or .venv\\Scripts\\activate on Windows)' },
                                      { id: 'lab1-install', text: 'Install required packages: pip install google-genai python-dotenv' },
                                      { id: 'lab1-env', text: 'Create local .env file and paste GEMINI_API_KEY (without quotes)' },
                                      { id: 'lab1-gitignore', text: 'Verify .gitignore includes .env so your secret is never committed' },
                                    ].map((item) => (
                                      <div
                                        key={item.id}
                                        className={`checklist-item ${labChecks.has(item.id) ? 'checked' : ''}`}
                                        onClick={() => toggleLabCheck(item.id, 'Environment Setup')}
                                      >
                                        <div className="checklist-checkbox">
                                          {labChecks.has(item.id) ? '✓' : ''}
                                        </div>
                                        <span className="checklist-text">{item.text}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {section.id === 'client-practice' && (
                              <div className="practice-lab">
                                <div className="practice-lab-header">
                                  <div className="practice-lab-title">
                                    <span>💻</span>
                                    <span>Client Boundary Execution Checklist</span>
                                  </div>
                                  <span className="practice-lab-badge">Local Code Verification</span>
                                </div>
                                <div className="checklist-container">
                                  <div className="checklist-items">
                                    {[
                                      { id: 'lab2-file', text: 'Save llm_client.py with the fail-fast require_env() helper' },
                                      { id: 'lab2-run', text: 'Run python llm_client.py and verify natural language generation returns' },
                                      { id: 'lab2-usage', text: 'Inspect response.usage_metadata to verify prompt and completion tokens' },
                                      { id: 'lab2-check', text: 'Run python check_key.py to verify safe boolean presence check' },
                                    ].map((item) => (
                                      <div
                                        key={item.id}
                                        className={`checklist-item ${labChecks.has(item.id) ? 'checked' : ''}`}
                                        onClick={() => toggleLabCheck(item.id, 'Client Boundary')}
                                      >
                                        <div className="checklist-checkbox">
                                          {labChecks.has(item.id) ? '✓' : ''}
                                        </div>
                                        <span className="checklist-text">{item.text}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Mark as Complete Button */}
                            <button
                              className={`mark-complete-btn ${isDone ? 'completed' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                markSectionComplete(section.id);
                              }}
                              disabled={isDone}
                            >
                              {isDone ? (
                                '✅ Completed'
                              ) : (
                                `✨ Mark as Complete — Earn ${XP_REWARDS.sectionComplete} XP`
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quiz Start Card at Module Footer */}
              {(() => {
                const quizDone = completedQuizzes[activeModule.id];
                return (
                  <div className="quiz-start-card">
                    <span className="quiz-start-icon">{quizDone ? '✅' : '🧪'}</span>
                    <h2 className="quiz-start-title">
                      {quizDone ? 'Quiz Completed!' : 'Knowledge Check'}
                    </h2>
                    <p className="quiz-start-desc">
                      {quizDone
                        ? `You scored ${quizDone.score}/${quizDone.total} and earned ${quizDone.xpEarned} XP in Neon Cloud.`
                        : `Test your mastery of ${activeModule.title} with ${activeModule.quiz.length} questions.`}
                    </p>
                    <button
                      className="quiz-start-btn"
                      onClick={() => handleStartQuiz(activeModule)}
                    >
                      {quizDone ? '🔄 Retake Quiz' : '🚀 Start Knowledge Check'}
                    </button>
                    <div className="quiz-start-stats">
                      <span>📝 {activeModule.quiz.length} Questions</span>
                      <span>⏱️ ~{Math.ceil(activeModule.quiz.length * 0.5)} min</span>
                      <span>
                        ⚡ Up to{' '}
                        {activeModule.quiz.length * XP_REWARDS.quizCorrectAnswer +
                          XP_REWARDS.quizPerfectBonus +
                          XP_REWARDS.quizComplete}{' '}
                        XP
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          )
        )}
      </main>

      {/* Callsign / User Registration Modal */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onUserCreated={handleUserCreated}
        currentUsername={username}
      />

      {/* Quiz Modal */}
      {activeQuiz && (
        <QuizModal
          isOpen={true}
          onClose={() => setActiveQuiz(null)}
          quiz={activeQuiz.questions}
          moduleTitle={activeQuiz.title}
          onComplete={handleQuizComplete}
        />
      )}

      {/* Quiz Results Modal */}
      {quizResults && (
        <ResultsModal
          isOpen={true}
          onClose={() => setQuizResults(null)}
          results={quizResults}
        />
      )}

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Confetti Canvas */}
      <canvas className="confetti-canvas" id="confettiCanvas"></canvas>
    </>
  );
}
