'use client';

import React, { useEffect } from 'react';

export default function ResultsModal({ isOpen, onClose, results }) {
  useEffect(() => {
    if (isOpen && results?.isPerfect) {
      triggerConfetti();
    }
  }, [isOpen, results]);

  if (!isOpen || !results) return null;

  const { score, total, xpEarned, isPerfect } = results;
  const pct = Math.round((score / total) * 100);
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (pct / 100) * circumference;
  const color = pct >= 80 ? '#10B981' : pct >= 60 ? '#F59E0B' : '#F43F5E';

  function triggerConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#F43F5E', '#06B6D4'];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.5) * 18 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        alpha: 1,
      });
    }

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3; // gravity
        p.rotation += p.rotSpeed;
        p.alpha -= 0.012;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      if (alive && frame < 120) {
        frame++;
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    animate();
  }

  return (
    <div className="results-overlay active">
      <div className="results-modal">
        <span className="results-icon">
          {isPerfect ? '🏆' : pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '📚'}
        </span>
        <h2 className="results-title">
          {isPerfect
            ? 'Perfect Score!'
            : pct >= 80
            ? 'Great Job!'
            : pct >= 60
            ? 'Good Effort!'
            : 'Keep Learning!'}
        </h2>
        <p className="results-subtitle">
          {isPerfect
            ? 'You mastered every single question in this module!'
            : `You scored ${score} out of ${total} questions correctly.`}
        </p>

        <div className="results-score-ring">
          <svg viewBox="0 0 120 120">
            <circle className="results-ring-bg" cx="60" cy="60" r="52" />
            <circle
              className="results-ring-fill"
              cx="60"
              cy="60"
              r="52"
              style={{
                stroke: color,
                strokeDasharray: circumference,
                strokeDashoffset: offset,
              }}
            />
          </svg>
          <span className="results-score-value" style={{ color }}>
            {pct}%
          </span>
        </div>

        <div className="results-stats">
          <div className="results-stat">
            <span className="results-stat-value" style={{ color: 'var(--accent-emerald)' }}>
              {score}
            </span>
            <span className="results-stat-label">Correct</span>
          </div>
          <div className="results-stat">
            <span className="results-stat-value" style={{ color: 'var(--accent-rose)' }}>
              {total - score}
            </span>
            <span className="results-stat-label">Missed</span>
          </div>
          <div className="results-stat">
            <span className="results-stat-value">{total}</span>
            <span className="results-stat-label">Total</span>
          </div>
        </div>

        <div className="results-xp">⚡ +{xpEarned} XP Earned</div>

        <button className="results-btn" onClick={onClose}>
          Continue Learning
        </button>
      </div>
    </div>
  );
}
