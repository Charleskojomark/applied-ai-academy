'use client';

import React, { useState } from 'react';

export default function UserModal({ isOpen, onClose, onUserCreated, currentUsername }) {
  const [usernameInput, setUsernameInput] = useState(currentUsername || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = usernameInput.trim();
    if (!trimmed) {
      setError('Please enter a valid callsign.');
      return;
    }
    if (trimmed.length < 2) {
      setError('Callsign must be at least 2 characters.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: trimmed }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to initialize profile');
      }

      onUserCreated(data.user, data.created);
    } catch (err) {
      setError(err.message || 'Error connecting to database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="callsign-overlay" onClick={() => currentUsername && onClose()}>
      <div className="callsign-modal" onClick={(e) => e.stopPropagation()}>
        <div className="callsign-badge">
          <span className="cloud-dot"></span>
          <span>Neon PostgreSQL Serverless</span>
        </div>

        <h2 className="callsign-title">
          {currentUsername ? 'Engineer Profile & Callsign' : 'Welcome, AI Engineer'}
        </h2>
        
        <p className="callsign-desc">
          {currentUsername
            ? `Your cloud progress is active under @${currentUsername}. Enter a new callsign to switch or create another profile.`
            : 'Enter your Engineer Callsign to synchronize your XP, course completion, and quiz certifications directly to Neon PostgreSQL.'}
        </p>

        <form onSubmit={handleSubmit} className="callsign-form">
          <div className="callsign-input-wrap">
            <span className="callsign-input-prefix">@</span>
            <input
              type="text"
              className="callsign-input"
              placeholder="e.g. MayaEngineer or AlexAI"
              value={usernameInput}
              onChange={(e) => {
                setUsernameInput(e.target.value);
                if (error) setError('');
              }}
              autoFocus
              maxLength={30}
              disabled={loading}
            />
          </div>

          {error && <div className="callsign-error">{error}</div>}

          <button
            type="submit"
            className="callsign-submit-btn"
            disabled={loading || !usernameInput.trim()}
          >
            {loading ? (
              <span>Connecting to Neon...</span>
            ) : (
              <>
                <span>🚀 {currentUsername ? 'Update / Switch Callsign' : 'Initialize & Launch'}</span>
              </>
            )}
          </button>
        </form>

        <div className="callsign-features">
          <span>☁️ Persistent Neon DB</span>
          <span>⚡ Real-time XP & Rank</span>
          <span>🛡️ Serverless API</span>
        </div>
      </div>
    </div>
  );
}
