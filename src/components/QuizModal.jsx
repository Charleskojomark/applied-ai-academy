'use client';

import React, { useState } from 'react';

export default function QuizModal({ isOpen, onClose, quiz, moduleTitle, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  if (!isOpen || !quiz || quiz.length === 0) return null;

  const currentQ = quiz[currentIndex];
  const total = quiz.length;
  const isAnswered = selectedAnswer !== null;
  const isCorrect = isAnswered && selectedAnswer === currentQ.correct;

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    if (idx === currentQ.correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < total) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz finished
      const finalScore = score;
      const isPerfect = finalScore === total;
      const xpEarned = finalScore * 20 + 15 + (isPerfect ? 50 : 0);
      onComplete(finalScore, total, xpEarned, isPerfect);
    }
  };

  return (
    <div className="quiz-overlay active">
      <div className="quiz-modal">
        <div className="quiz-header">
          <div className="quiz-progress-bar">
            <div
              className="quiz-progress-fill"
              style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            ></div>
          </div>
          <div className="quiz-header-info">
            <span className="quiz-title">{moduleTitle} — Knowledge Check</span>
            <span className="quiz-counter">
              {currentIndex + 1} / {total}
            </span>
          </div>
          <button className="quiz-close" onClick={onClose} aria-label="Close quiz">
            ✕
          </button>
        </div>

        <div className="quiz-body">
          <p className="quiz-question">{currentQ.question}</p>
          <div className="quiz-options">
            {currentQ.options.map((opt, i) => {
              let optClass = 'quiz-option';
              if (isAnswered) {
                if (i === currentQ.correct) optClass += ' correct';
                else if (i === selectedAnswer) optClass += ' wrong';
                else optClass += ' disabled';
              }

              return (
                <div
                  key={i}
                  className={optClass}
                  onClick={() => handleSelect(i)}
                >
                  <span className="option-marker">{String.fromCharCode(65 + i)}</span>
                  <span>{opt}</span>
                </div>
              );
            })}
          </div>

          {isAnswered && (
            <div
              className={`rule-box ${isCorrect ? 'tip-box' : 'warning-box'}`}
              style={{ marginTop: 18 }}
            >
              <span className="rule-icon">{isCorrect ? '✅' : '💡'}</span>
              <div className="rule-text">
                <strong>{isCorrect ? 'Correct!' : 'Incorrect.'}</strong> {currentQ.explanation}
              </div>
            </div>
          )}
        </div>

        <div className="quiz-footer">
          <button
            className="btn btn-primary quiz-next-btn"
            disabled={!isAnswered}
            onClick={handleNext}
          >
            {currentIndex + 1 === total ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
}
