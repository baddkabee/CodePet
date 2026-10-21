import React, { useState, useEffect } from 'react';
import { Heart, Code, Trophy } from 'lucide-react';

const STAGES = [
  { name: 'Egg', exp: 0, emoji: '🥚', size: 60, message: 'Your pet is waiting to hatch!' },
  { name: 'Baby', exp: 50, emoji: '🐣', size: 80, message: 'A tiny coder is born!' },
  { name: 'Junior', exp: 150, emoji: '🐥', size: 100, message: 'Getting stronger!' },
  { name: 'Developer', exp: 300, emoji: '🐦', size: 120, message: 'Coding with confidence!' },
  { name: 'Senior', exp: 500, emoji: '🦅', size: 140, message: 'A true coding master!' },
];

const CodePet = () => {
  const [pet, setPet] = useState({
    name: 'CodeBuddy',
    stage: 0,
    exp: 0,
    health: 100,
    streak: 0,
    lastCoded: null,
    totalSessions: 0,
  });
  const [sessionMinutes, setSessionMinutes] = useState(30);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!pet.lastCoded) return;
    const hoursSince = (new Date() - new Date(pet.lastCoded)) / (1000 * 60 * 60);
    if (hoursSince > 24) {
      const healthLoss = Math.min(50, Math.floor(hoursSince / 24) * 10);
      setPet((prev) => ({ ...prev, health: Math.max(0, prev.health - healthLoss) }));
    }
  }, [pet.lastCoded]);

  const logCodingSession = () => {
    const now = new Date();
    const expGain = Math.floor(sessionMinutes / 10) * 10;

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);

    setPet((prev) => {
      const newExp = prev.exp + expGain;
      const nextIdx = STAGES.findIndex((s) => newExp < s.exp);
      const stage = nextIdx === -1 ? STAGES.length - 1 : Math.max(0, nextIdx - 1);

      const isToday = prev.lastCoded && new Date(prev.lastCoded).toDateString() === now.toDateString();
      const isRecent = prev.lastCoded && (now - new Date(prev.lastCoded)) / (1000 * 60 * 60 * 24) < 2;
      const streak = isToday ? prev.streak : isRecent ? prev.streak + 1 : 1;

      return {
        ...prev,
        exp: newExp,
        stage,
        health: Math.min(100, prev.health + 10),
        streak,
        lastCoded: now.toISOString(),
        totalSessions: prev.totalSessions + 1,
      };
    });
  };

  const current = STAGES[pet.stage];
  const next = STAGES[pet.stage + 1];
  const progress = next ? ((pet.exp - current.exp) / (next.exp - current.exp)) * 100 : 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-purple-600 mb-2">CodePet</h1>
          <p className="text-gray-600">Your companion grows as you code!</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-12 mb-6 relative overflow-hidden">
          <div className={`text-center transition-all duration-500 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
            <div style={{ fontSize: `${current.size}px` }} className="mb-4">{current.emoji}</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{pet.name}</h2>
            <p className="text-xl text-purple-600 font-semibold mb-1">{current.name}</p>
            <p className="text-gray-600 italic">{current.message}</p>
          </div>
          {isAnimating && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-6xl animate-pulse">✨</div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-red-50 p-4 rounded-xl text-center">
            <Heart className="w-6 h-6 mx-auto mb-2 text-red-500" />
            <div className="text-2xl font-bold text-gray-800">{pet.health}%</div>
            <div className="text-sm text-gray-600">Health</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl text-center">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold text-gray-800">{pet.streak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl text-center">
            <Code className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold text-gray-800">{pet.totalSessions}</div>
            <div className="text-sm text-gray-600">Sessions</div>
          </div>
        </div>

        {next && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>EXP: {pet.exp}</span>
              <span>Next: {next.name} ({next.exp})</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Log Coding Session</h3>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-2">Minutes coded</label>
              <input
                type="number"
                value={sessionMinutes}
                onChange={(e) => setSessionMinutes(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none"
                min="1"
              />
            </div>
            <button
              onClick={logCodingSession}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
            >
              Log Session
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            💡 Tip: Code daily to keep your pet healthy and maintain your streak!
          </p>
        </div>

        {pet.health < 50 && (
          <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
            <p className="text-red-600 font-semibold">⚠️ Your pet needs attention! Code today to restore its health.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePet;
