import { useState } from 'react';
import { Flame, Clock, TrendingUp, ArrowUp, X, Dumbbell, Trophy } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { stats, weeklyActivity, personalRecords, achievements } from '@/data';
import type { PersonalRecord, Achievement } from '@/types';

const trainingHours = (stats.trainingTimeMin / 60).toFixed(1);

export function Progress() {
  const [selectedPR, setSelectedPR] = useState<PersonalRecord | null>(null);
  const [selectedAch, setSelectedAch] = useState<Achievement | null>(null);

  return (
    <div className="animate-fade-in space-y-6 pb-2">
      {/* HEADER */}
      <header className="pt-6 md:pt-2">
        <h1 className="text-3xl font-extrabold tracking-tight">YOUR PROGRESS</h1>
        <p className="mt-1 text-sm font-medium text-gray-500">Keep showing up.</p>
      </header>

      {/* TOP STATISTICS — inline with separators */}
      <div className="flex items-center divide-x divide-ink-700 rounded-2xl border border-ink-700 bg-ink-800 px-2 py-5">
        <StatCell
          value={stats.streak.toString()}
          label="Day Streak"
          icon={<Flame size={16} className="text-lime" />}
        />
        <StatCell
          value={stats.totalWorkouts.toString()}
          label="Workouts"
          icon={<Dumbbell size={16} className="text-lime" />}
        />
        <StatCell
          value={`${trainingHours}h`}
          label="Training Time"
          icon={<Clock size={16} className="text-lime" />}
        />
      </div>

      {/* WEEKLY ACTIVITY */}
      <section>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">Weekly Activity</h2>
        <div className="rounded-2xl border border-ink-700 bg-ink-800 p-5">
          <div className="flex items-end justify-between gap-2">
            {weeklyActivity.map((d, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-28 w-full items-end justify-center">
                  <div
                    className={`w-full max-w-[26px] rounded-t-md transition-all duration-700 ${
                      d.value > 0 ? 'bg-lime' : 'bg-ink-600'
                    }`}
                    style={{ height: `${d.value > 0 ? (d.value / 55) * 100 : 3}%` }}
                  />
                </div>
                <span className={`text-[11px] font-bold ${d.value > 0 ? 'text-lime' : 'text-gray-600'}`}>
                  {d.day}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t border-ink-700 pt-4">
            <div className="flex items-baseline justify-between">
              <p className="text-lg font-extrabold tracking-tight">
                {stats.weeklyCompleted}<span className="text-sm font-bold text-gray-500"> / {stats.weeklyCommitment} WORKOUTS</span>
              </p>
            </div>
            <p className="mt-1 text-xs text-gray-500">One workout away from your weekly goal.</p>
          </div>
        </div>
      </section>

      {/* REP SCORE */}
      <section>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">REP Score</h2>
        <div className="rounded-2xl border border-ink-700 bg-ink-800 p-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-extrabold tracking-tight">{stats.repScore}</p>
              <p className="mt-2 flex items-center gap-1 text-sm font-bold text-lime">
                <TrendingUp size={14} />
                +{stats.repScoreIncrease} THIS WEEK
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime/10">
              <TrendingUp size={24} className="text-lime" />
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-gray-500">
            Your score reflects consistency, completed workouts and personal records.
          </p>
        </div>
      </section>

      {/* PERSONAL RECORDS */}
      <section>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">Personal Records</h2>
        <div className="space-y-2">
          {personalRecords.map((pr) => (
            <button
              key={pr.exercise}
              onClick={() => setSelectedPR(pr)}
              className="flex w-full items-center justify-between rounded-xl border border-ink-700 bg-ink-800 px-4 py-4 text-left transition-all hover:border-ink-500 active:scale-[0.99]"
            >
              <div>
                <p className="text-sm font-bold uppercase tracking-wide">{pr.exercise}</p>
                <p className="mt-0.5 text-lg font-extrabold tracking-tight">{pr.weight}</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-lime/10 px-2.5 py-1.5">
                <ArrowUp size={14} className="text-lime" />
                <span className="text-xs font-bold text-lime">{pr.increaseKg} KG</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section>
        <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">Achievements</h2>
        <div className="grid grid-cols-3 gap-2">
          {achievements.map((ach) => (
            <AchievementBadge key={ach.id} achievement={ach} onTap={() => setSelectedAch(ach)} />
          ))}
        </div>
      </section>

      {/* PR DETAIL MODAL */}
      {selectedPR && (
        <DetailModal onClose={() => setSelectedPR(null)}>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">Personal Record</p>
          <h3 className="mt-1.5 text-xl font-extrabold tracking-tight">{selectedPR.exercise}</h3>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-ink-700 px-4 py-3">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Previous</span>
              <span className="text-sm font-bold text-gray-300">{selectedPR.previousWeight}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-lime/30 bg-lime/5 px-4 py-3">
              <span className="text-xs font-bold uppercase tracking-wide text-lime">Current</span>
              <span className="text-sm font-bold text-lime">{selectedPR.weight}</span>
            </div>
            <div className="flex items-center justify-between px-4">
              <span className="text-xs font-medium text-gray-500">Date Achieved</span>
              <span className="text-sm font-semibold text-gray-300">{selectedPR.date}</span>
            </div>
            <div className="flex items-center justify-between px-4">
              <span className="text-xs font-medium text-gray-500">Increase</span>
              <span className="flex items-center gap-1 text-sm font-bold text-lime">
                <ArrowUp size={13} />
                {selectedPR.increaseKg} kg
              </span>
            </div>
          </div>
        </DetailModal>
      )}

      {/* ACHIEVEMENT DETAIL MODAL */}
      {selectedAch && (
        <DetailModal onClose={() => setSelectedAch(null)}>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
            {selectedAch.unlocked ? 'Achievement Earned' : 'Achievement Locked'}
          </p>
          <h3 className="mt-1.5 text-xl font-extrabold tracking-tight">{selectedAch.name}</h3>
          <p className="mt-2 text-sm text-gray-400">{selectedAch.description}</p>

          {selectedAch.unlocked && selectedAch.earnedDetail && (
            <div className="mt-5 rounded-xl border border-lime/20 bg-lime/5 px-4 py-3">
              <p className="text-xs font-medium text-gray-400">{selectedAch.earnedDetail}</p>
              {selectedAch.earnedDate && (
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-lime">
                  Earned {selectedAch.earnedDate}
                </p>
              )}
            </div>
          )}
          {!selectedAch.unlocked && (
            <div className="mt-5 rounded-xl bg-ink-700 px-4 py-3">
              <p className="text-xs font-medium text-gray-500">Keep working out to unlock this achievement.</p>
            </div>
          )}
        </DetailModal>
      )}
    </div>
  );
}

function StatCell({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1.5 px-2 text-center">
      <div className="mb-0.5">{icon}</div>
      <p className="text-xl font-extrabold tracking-tight">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">{label}</p>
    </div>
  );
}

function AchievementBadge({ achievement, onTap }: { achievement: Achievement; onTap: () => void }) {
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[achievement.icon] ?? Trophy;

  return (
    <button
      onClick={onTap}
      className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all active:scale-[0.97] ${
        achievement.unlocked
          ? 'border-lime/20 bg-lime/[0.04] hover:border-lime/40'
          : 'border-ink-700 bg-ink-800 opacity-50 hover:opacity-80'
      }`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${
          achievement.unlocked ? 'bg-lime/10' : 'bg-ink-700'
        }`}
      >
        {achievement.unlocked ? (
          <IconComponent size={20} className="text-lime" />
        ) : (
          <IconComponent size={20} className="text-gray-600" />
        )}
      </div>
      <p className={`text-[11px] font-bold leading-tight ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
        {achievement.name}
      </p>
    </button>
  );
}

function DetailModal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-sm md:items-center"
      onClick={onClose}
    >
      <div
        className="animate-slide-up mx-4 w-full max-w-md rounded-2xl border border-ink-600 bg-ink-800 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:text-white"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
