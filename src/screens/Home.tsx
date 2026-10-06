import { Flame, ChevronRight, Dumbbell, Clock, TrendingUp, ArrowRight } from 'lucide-react';

import type { ScreenId } from '@/types';
import { userProfile, stats, workouts, todaysWorkoutId, recentActivity } from '@/data';

interface Props {
  onNavigate: (screen: ScreenId) => void;
  onStartWorkout: (workoutId: string) => void;
}

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const completedDays = [true, true, false, true, true, false, false];

export function Home({ onNavigate, onStartWorkout }: Props) {
  const todayWorkout = workouts.find((w) => w.id === todaysWorkoutId);
  const weeklyPct = Math.round((stats.weeklyCompleted / stats.weeklyCommitment) * 100);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="animate-fade-in space-y-4">
      {/* Header — compact */}
      <header className="flex items-center justify-between pt-6 md:pt-2">
        <div>
          <p className="text-xs font-medium text-gray-500">{greeting},</p>
          <h1 className="text-xl font-extrabold tracking-tight">{userProfile.name}</h1>
        </div>
        <button
          onClick={() => onNavigate('profile')}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 bg-ink-800 text-sm font-bold text-lime transition-all hover:border-lime/40 hover:bg-ink-700 active:scale-95"
        >
          {userProfile.name[0]}
        </button>
      </header>

      {/* Hero heading — tighter */}
      <div className="pt-1">
        <h2 className="text-[2.5rem] font-extrabold leading-[1.05] tracking-tight md:text-5xl">
          READY TO
          <br />
          <span className="text-lime">REP IT?</span>
        </h2>
      </div>

      {/* Streak Card — redesigned */}
      <div className="rounded-2xl border border-ink-700 bg-ink-800 p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-lime/10">
              <Flame className="text-lime" size={22} />
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-lime px-1 text-[10px] font-extrabold text-black">
                {stats.streak}
              </span>
            </div>
            <div>
              <p className="text-2xl font-extrabold leading-none tracking-tight">
                {stats.streak}<span className="ml-1 text-sm font-bold text-gray-400">DAY STREAK</span>
              </p>
              <p className="mt-1.5 text-xs font-medium text-gray-500">
                {stats.weeklyCompleted} workouts this week
              </p>
            </div>
          </div>
        </div>

        {/* 7-day consistency */}
        <div className="mt-4 flex justify-between gap-1.5">
          {weekDays.map((day, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className={`flex h-9 w-full items-center justify-center rounded-lg text-xs font-bold transition-all ${
                  completedDays[i]
                    ? 'bg-lime text-black'
                    : 'bg-ink-700 text-gray-600'
                }`}
              >
                {completedDays[i] && <Flame size={14} />}
              </div>
              <span className="text-[10px] font-medium text-gray-500">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Workout — premium card with abstract visual */}
      {todayWorkout && (
        <button
          onClick={() => onStartWorkout(todaysWorkoutId)}
          className="group relative w-full overflow-hidden rounded-2xl border border-ink-700 bg-ink-800 p-5 text-left transition-all hover:border-lime/30 active:scale-[0.99]"
        >
          {/* Abstract geometric visual — layered diagonal lines, concentric arcs, lime accent bar */}
          <div className="pointer-events-none absolute -right-10 -top-8 h-40 w-40 opacity-100">
            <svg viewBox="0 0 160 160" fill="none" className="h-full w-full">
              {/* diagonal lines */}
              <path d="M30 160L160 30" stroke="#ffffff" strokeWidth="1" opacity="0.08" />
              <path d="M55 160L160 55" stroke="#ffffff" strokeWidth="1" opacity="0.08" />
              <path d="M80 160L160 80" stroke="#ffffff" strokeWidth="1" opacity="0.06" />
              <path d="M105 160L160 105" stroke="#ffffff" strokeWidth="1" opacity="0.05" />
              {/* concentric arcs */}
              <path d="M160 80 A40 40 0 0 0 120 40" stroke="#c7ff00" strokeWidth="1.5" opacity="0.12" />
              <path d="M160 95 A55 55 0 0 0 105 40" stroke="#c7ff00" strokeWidth="1.5" opacity="0.07" />
              <path d="M160 110 A70 70 0 0 0 90 40" stroke="#c7ff00" strokeWidth="1.5" opacity="0.04" />
              {/* lime accent bar */}
              <rect x="140" y="30" width="2.5" height="40" rx="1" fill="#c7ff00" opacity="0.35" />
              <rect x="130" y="22" width="2" height="28" rx="1" fill="#c7ff00" opacity="0.2" />
            </svg>
          </div>
          {/* Lime glow accent */}
          <div className="pointer-events-none absolute -right-12 bottom-0 h-28 w-28 rounded-full bg-lime/[0.06] blur-2xl" />

          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime">Today's Workout</span>
              <h3 className="mt-1.5 text-xl font-extrabold tracking-tight">{todayWorkout.name}</h3>
              <div className="mt-3 flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Dumbbell size={14} className="text-gray-500" />
                  {todayWorkout.exercises.length} exercises
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-gray-500" />
                  {todayWorkout.durationMin} min
                </span>
              </div>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-600 transition-all group-hover:border-lime/40 group-hover:bg-lime/10">
              <ArrowRight size={18} className="text-gray-400 transition-colors group-hover:text-lime" />
            </div>
          </div>
        </button>
      )}

      {/* Primary CTA — large, high-contrast */}
      <button
        onClick={() => onStartWorkout(todaysWorkoutId)}
        className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-lime py-4.5 text-base font-extrabold uppercase tracking-wide text-black transition-all active:scale-[0.98] hover:bg-lime-dark"
        style={{ paddingTop: '1.125rem', paddingBottom: '1.125rem' }}
      >
        <Dumbbell size={22} />
        Start Workout
        <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
      </button>

      {/* This Week + REP Score — lightweight inline section */}
      <div className="flex items-center gap-4 rounded-2xl border border-ink-700 bg-ink-800 px-5 py-4">
        {/* This Week */}
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">This Week</p>
          <p className="mt-1.5 text-lg font-extrabold tracking-tight">
            {stats.weeklyCompleted}<span className="text-sm font-bold text-gray-500"> / {stats.weeklyCommitment} WORKOUTS</span>
          </p>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-ink-600">
            <div
              className="h-full rounded-full bg-lime transition-all duration-700"
              style={{ width: `${weeklyPct}%` }}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-12 w-px bg-ink-600" />

        {/* REP Score */}
        <div className="shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">REP Score</p>
          <p className="mt-1.5 text-lg font-extrabold tracking-tight">{stats.repScore}</p>
          <p className="mt-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-lime">
            <TrendingUp size={11} />
            +24 this week
          </p>
        </div>
      </div>

      {/* Recent Activity — cleaner */}
      <div className="pt-1">
        <div className="mb-2.5 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500">Recent Activity</h3>
          <button onClick={() => onNavigate('progress')} className="text-xs font-medium text-gray-500 transition-colors hover:text-lime">
            View all
          </button>
        </div>
        <div className="space-y-2">
          {recentActivity.slice(0, 3).map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between rounded-xl border border-ink-700 bg-ink-800 px-4 py-3 transition-all hover:border-ink-500 active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime/10">
                  <Dumbbell size={15} className="text-lime" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{a.workoutName}</p>
                  <p className="text-xs text-gray-500">{a.date} • {a.durationMin} min</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-600" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
