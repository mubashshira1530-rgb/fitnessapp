import { useState, useEffect, useRef } from 'react';
import {
  X, Check, Timer, Dumbbell, Plus, ArrowRight, Flame, Clock,
} from 'lucide-react';
import { workouts, stats } from '@/data';

interface Props {
  workoutId: string | null;
  onExit: () => void;
}

type Phase = 'exercising' | 'resting' | 'rest-done' | 'exercise-done' | 'workout-done';

export function ActiveWorkout({ workoutId, onExit }: Props) {
  const workout = workouts.find((w) => w.id === workoutId) ?? workouts[0];

  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [completedSets, setCompletedSets] = useState<Record<number, boolean[]>>({});
  const [phase, setPhase] = useState<Phase>('exercising');
  const [restRemaining, setRestRemaining] = useState(0);
  const [restTotal, setRestTotal] = useState(0);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const restIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Overall workout timer
  useEffect(() => {
    const interval = setInterval(() => setElapsedSec((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Rest timer countdown
  useEffect(() => {
    if (phase === 'resting' && restRemaining > 0) {
      restIntervalRef.current = setInterval(() => {
        setRestRemaining((t) => {
          if (t <= 1) {
            if (restIntervalRef.current) clearInterval(restIntervalRef.current);
            setPhase('rest-done');
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => {
        if (restIntervalRef.current) clearInterval(restIntervalRef.current);
      };
    }
  }, [phase, restRemaining]);

  const currentExercise = workout.exercises[currentExerciseIdx];
  const setsState = completedSets[currentExerciseIdx] ?? Array(currentExercise.sets).fill(false);
  const completedSetCount = setsState.filter(Boolean).length;
  const currentSetIdx = setsState.findIndex((s) => !s);
  const totalSets = workout.exercises.reduce((sum, e) => sum + e.sets, 0);
  const completedAllSets = Object.values(completedSets).reduce(
    (sum, sets) => sum + sets.filter(Boolean).length,
    0
  );
  const workoutPct = Math.round((completedAllSets / totalSets) * 100);
  const exercisePct = Math.round((completedSetCount / currentExercise.sets) * 100);
  const isLastExercise = currentExerciseIdx === workout.exercises.length - 1;

  const fmtTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCompleteSet = () => {
    if (currentSetIdx < 0) return;
    const updated = [...setsState];
    updated[currentSetIdx] = true;
    setCompletedSets({ ...completedSets, [currentExerciseIdx]: updated });

    const allDone = updated.every(Boolean);
    if (allDone) {
      if (isLastExercise) {
        setPhase('workout-done');
      } else {
        setPhase('exercise-done');
      }
    } else if (currentExercise.restSeconds > 0) {
      setRestTotal(currentExercise.restSeconds);
      setRestRemaining(currentExercise.restSeconds);
      setPhase('resting');
    }
  };

  const handleAddRest = () => {
    setRestTotal((t) => t + 30);
    setRestRemaining((t) => t + 30);
  };

  const handleSkipRest = () => {
    if (restIntervalRef.current) clearInterval(restIntervalRef.current);
    setRestRemaining(0);
    setPhase('exercising');
  };

  const handleNextSet = () => {
    setPhase('exercising');
  };

  const handleNextExercise = () => {
    setCurrentExerciseIdx((i) => i + 1);
    setPhase('exercising');
  };

  // Workout completion screen
  if (phase === 'workout-done') {
    return <WorkoutComplete workout={workout} elapsedSec={elapsedSec} totalSets={totalSets} onDone={onExit} />;
  }

  const restPct = restTotal > 0 ? (restRemaining / restTotal) * 100 : 0;

  return (
    <div className="animate-fade-in min-h-screen space-y-4">
      {/* TOP HEADER */}
      <header className="flex items-center justify-between pt-6 md:pt-2">
        <button
          onClick={() => setShowExitConfirm(true)}
          className="flex h-10 items-center gap-1.5 rounded-full border border-ink-600 bg-ink-800 px-3 text-xs font-bold uppercase tracking-wide text-gray-400 transition-all hover:border-ink-500 hover:text-white active:scale-95"
        >
          <X size={16} />
          Exit
        </button>
        <div className="text-center">
          <p className="text-2xl font-extrabold tabular-nums leading-none">{fmtTime(elapsedSec)}</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">Workout Time</p>
        </div>
        <div className="w-16 text-right">
          <p className="text-lg font-extrabold text-lime leading-none">{workoutPct}%</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-gray-500">Done</p>
        </div>
      </header>

      {/* Progress bar */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
            Exercise {currentExerciseIdx + 1} of {workout.exercises.length}
          </p>
          <p className="text-[10px] font-bold text-lime">{workout.name}</p>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-ink-700">
          <div
            className="h-full rounded-full bg-lime transition-all duration-500"
            style={{ width: `${workoutPct}%` }}
          />
        </div>
      </div>

      {/* REST TIMER — prominent overlay state */}
      {(phase === 'resting' || phase === 'rest-done') && (
        <div className="animate-scale-in space-y-4">
          <div className="relative overflow-hidden rounded-2xl border border-lime/30 bg-lime/[0.06] p-6">
            {/* Circular progress ring */}
            <div className="flex flex-col items-center">
              <div className="relative flex h-32 w-32 items-center justify-center">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#222" strokeWidth="4" />
                  <circle
                    cx="60" cy="60" r="52" fill="none" stroke="#c7ff00" strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 52}
                    strokeDashoffset={2 * Math.PI * 52 * (1 - restPct / 100)}
                    className="transition-all duration-1000 ease-linear"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  {phase === 'resting' ? (
                    <>
                      <p className="text-3xl font-extrabold tabular-nums text-lime">{fmtTime(restRemaining)}</p>
                      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-lime/70">Rest</p>
                    </>
                  ) : (
                    <>
                      <Check size={36} className="text-lime" strokeWidth={3} />
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-lime">Rest Complete</p>
                    </>
                  )}
                </div>
              </div>

              {phase === 'resting' ? (
                <p className="mt-4 text-sm font-medium text-gray-400">Ready for set {completedSetCount + 1}?</p>
              ) : (
                <p className="mt-4 text-sm font-bold text-lime">Ready for the next set?</p>
              )}
            </div>
          </div>

          {phase === 'resting' ? (
            <div className="flex gap-3">
              <button
                onClick={handleAddRest}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-ink-600 bg-ink-800 py-4 text-sm font-bold uppercase tracking-wide text-gray-300 transition-all hover:border-ink-500 active:scale-[0.98]"
              >
                <Plus size={18} />
                30 Sec
              </button>
              <button
                onClick={handleSkipRest}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-ink-600 bg-ink-800 py-4 text-sm font-bold uppercase tracking-wide text-gray-300 transition-all hover:border-ink-500 active:scale-[0.98]"
              >
                <Timer size={18} />
                Skip Rest
              </button>
            </div>
          ) : (
            <button
              onClick={handleNextSet}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-lime py-4 text-base font-extrabold uppercase tracking-wide text-black transition-all active:scale-[0.98] hover:bg-lime-dark"
            >
              Next Set
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      )}

      {/* EXERCISE + SETS — shown when not resting */}
      {phase !== 'resting' && phase !== 'rest-done' && (
        <>
          {/* Exercise Done state */}
          {phase === 'exercise-done' ? (
            <div className="animate-scale-in space-y-4">
              <div className="rounded-2xl border border-lime/30 bg-lime/[0.06] p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lime">
                  <Check size={32} className="text-black" strokeWidth={3} />
                </div>
                <p className="mt-4 text-xl font-extrabold tracking-tight text-lime">EXERCISE COMPLETE</p>
                <p className="mt-1 text-sm text-gray-400">{currentExercise.name} — {currentExercise.sets} sets done</p>
              </div>

              {/* Next exercise preview */}
              <div className="rounded-2xl border border-ink-700 bg-ink-800 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">Next Up</p>
                <p className="mt-1.5 text-lg font-extrabold tracking-tight">{workout.exercises[currentExerciseIdx + 1]?.name}</p>
                <p className="mt-1 text-sm text-gray-400">
                  {workout.exercises[currentExerciseIdx + 1]?.sets} sets · {workout.exercises[currentExerciseIdx + 1]?.reps} reps · {workout.exercises[currentExerciseIdx + 1]?.weight}
                </p>
              </div>

              <button
                onClick={handleNextExercise}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-lime py-4 text-base font-extrabold uppercase tracking-wide text-black transition-all active:scale-[0.98] hover:bg-lime-dark"
              >
                Next Exercise
                <ArrowRight size={20} />
              </button>
            </div>
          ) : (
            <>
              {/* CURRENT EXERCISE CARD */}
              <div className="relative overflow-hidden rounded-2xl border border-ink-700 bg-ink-800 p-5">
                {/* Abstract geometric visual */}
                <div className="pointer-events-none absolute -right-8 -top-6 h-36 w-36">
                  <svg viewBox="0 0 144 144" fill="none" className="h-full w-full">
                    <path d="M24 144L144 24" stroke="#c7ff00" strokeWidth="1" opacity="0.08" />
                    <path d="M48 144L144 48" stroke="#c7ff00" strokeWidth="1" opacity="0.06" />
                    <path d="M72 144L144 72" stroke="#c7ff00" strokeWidth="1" opacity="0.04" />
                    <path d="M144 50 A46 46 0 0 0 98 4" stroke="#c7ff00" strokeWidth="1.5" opacity="0.1" />
                    <path d="M144 65 A61 61 0 0 0 83 4" stroke="#c7ff00" strokeWidth="1.5" opacity="0.05" />
                    <rect x="128" y="20" width="2" height="32" rx="1" fill="#c7ff00" opacity="0.3" />
                  </svg>
                </div>
                <div className="pointer-events-none absolute -right-10 bottom-0 h-24 w-24 rounded-full bg-lime/[0.05] blur-2xl" />

                <div className="relative">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime">Current Exercise</span>
                  <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight">{currentExercise.name}</h2>
                  <p className="mt-0.5 text-sm font-medium text-gray-400">
                    {currentExercise.reps} REPS · {currentExercise.weight}
                  </p>

                  {/* Target stats */}
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-ink-700 px-3 py-2.5 text-center">
                      <p className="text-[9px] font-bold uppercase tracking-wide text-gray-500">Sets</p>
                      <p className="mt-0.5 text-base font-extrabold">{currentExercise.sets}</p>
                    </div>
                    <div className="rounded-xl bg-ink-700 px-3 py-2.5 text-center">
                      <p className="text-[9px] font-bold uppercase tracking-wide text-gray-500">Reps</p>
                      <p className="mt-0.5 text-base font-extrabold">{currentExercise.reps}</p>
                    </div>
                    <div className="rounded-xl bg-ink-700 px-3 py-2.5 text-center">
                      <p className="text-[9px] font-bold uppercase tracking-wide text-gray-500">Rest</p>
                      <p className="mt-0.5 text-base font-extrabold">{currentExercise.restSeconds > 0 ? `${currentExercise.restSeconds}s` : '—'}</p>
                    </div>
                  </div>

                  {/* Exercise progress bar */}
                  <div className="mt-4">
                    <div className="h-1 overflow-hidden rounded-full bg-ink-600">
                      <div
                        className="h-full rounded-full bg-lime transition-all duration-500"
                        style={{ width: `${exercisePct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SET PROGRESS — visual indicator */}
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Set Progress</p>
                  <p className="text-xs font-bold text-lime">{completedSetCount} / {currentExercise.sets}</p>
                </div>
                <div className="flex gap-2">
                  {Array.from({ length: currentExercise.sets }).map((_, i) => {
                    const done = setsState[i];
                    const isCurrent = i === currentSetIdx && !done;
                    return (
                      <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                        <div
                          className={`flex h-10 w-full items-center justify-center rounded-lg border-2 transition-all ${
                            done
                              ? 'border-lime bg-lime'
                              : isCurrent
                              ? 'border-lime/50 bg-lime/5'
                              : 'border-ink-600 bg-ink-800'
                          }`}
                        >
                          {done ? (
                            <Check size={18} className="text-black" strokeWidth={3} />
                          ) : isCurrent ? (
                            <div className="h-2 w-2 rounded-full bg-lime animate-pulse" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-ink-500" />
                          )}
                        </div>
                        <span className={`text-[10px] font-bold ${done ? 'text-lime' : isCurrent ? 'text-lime/70' : 'text-gray-600'}`}>
                          S{i + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CURRENT SET — action card */}
              {currentSetIdx >= 0 && (
                <div className="animate-scale-in rounded-2xl border border-ink-700 bg-ink-800 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wide text-gray-400">
                        Set {currentSetIdx + 1}
                      </p>
                      <p className="mt-0.5 text-base font-extrabold tracking-tight">
                        {currentExercise.reps} reps · {currentExercise.weight}
                      </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-lime/30 bg-lime/10">
                      <Dumbbell size={18} className="text-lime" />
                    </div>
                  </div>
                  <button
                    onClick={handleCompleteSet}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-lime py-4 text-base font-extrabold uppercase tracking-wide text-black transition-all active:scale-[0.98] hover:bg-lime-dark"
                  >
                    <Check size={22} strokeWidth={3} />
                    Complete Set
                  </button>
                </div>
              )}

              {/* All sets done but not last exercise — show next */}
              {currentSetIdx < 0 && !isLastExercise && (
                <button
                  onClick={handleNextExercise}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-lime py-4 text-base font-extrabold uppercase tracking-wide text-black transition-all active:scale-[0.98] hover:bg-lime-dark"
                >
                  Next Exercise
                  <ArrowRight size={20} />
                </button>
              )}
            </>
          )}
        </>
      )}

      {/* EXIT CONFIRMATION MODAL */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-sm md:items-center">
          <div className="animate-slide-up mx-4 w-full max-w-md rounded-2xl border border-ink-600 bg-ink-800 p-6">
            <h3 className="text-lg font-extrabold tracking-tight">Exit workout?</h3>
            <p className="mt-2 text-sm text-gray-400">
              Your progress for this session won't be saved. Are you sure you want to leave?
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 rounded-2xl border border-ink-600 bg-ink-700 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-ink-600 active:scale-[0.98]"
              >
                Keep Going
              </button>
              <button
                onClick={onExit}
                className="flex-1 rounded-2xl border border-red-500/30 bg-red-500/10 py-3.5 text-sm font-bold uppercase tracking-wide text-red-400 transition-all hover:bg-red-500/20 active:scale-[0.98]"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// WORKOUT COMPLETION SCREEN
function WorkoutComplete({
  workout,
  elapsedSec,
  totalSets,
  onDone,
}: {
  workout: typeof workouts[0];
  elapsedSec: number;
  totalSets: number;
  onDone: () => void;
}) {
  const previousRepScore = stats.repScore - stats.repScoreIncrease;
  const minutes = Math.max(1, Math.round(elapsedSec / 60));

  const [displayedScore, setDisplayedScore] = useState(previousRepScore);
  useEffect(() => {
    const duration = 1200;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      if (elapsed >= duration) {
        setDisplayedScore(stats.repScore);
        clearInterval(interval);
      } else {
        setDisplayedScore(Math.round(previousRepScore + (stats.repScore - previousRepScore) * (elapsed / duration)));
      }
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-fade-in flex min-h-screen flex-col items-center justify-center space-y-8 py-10 text-center">
      {/* Check mark with glow */}
      <div className="animate-check-pop relative">
        <div className="absolute inset-0 rounded-full bg-lime/20 blur-2xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-lime">
          <Check size={40} className="text-black" strokeWidth={3} />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-lime">You showed up.</p>
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">WORKOUT COMPLETE</h1>
      </div>

      {/* Workout stats */}
      <div className="grid w-full max-w-xs grid-cols-3 gap-3">
        <div className="rounded-2xl border border-ink-700 bg-ink-800 p-4">
          <Dumbbell size={18} className="mx-auto text-lime" />
          <p className="mt-2 text-xl font-extrabold">{workout.exercises.length}</p>
          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Exercises</p>
        </div>
        <div className="rounded-2xl border border-ink-700 bg-ink-800 p-4">
          <Clock size={18} className="mx-auto text-lime" />
          <p className="mt-2 text-xl font-extrabold">{minutes}</p>
          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Min</p>
        </div>
        <div className="rounded-2xl border border-ink-700 bg-ink-800 p-4">
          <Check size={18} className="mx-auto text-lime" />
          <p className="mt-2 text-xl font-extrabold">{totalSets}</p>
          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Sets</p>
        </div>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-2.5 rounded-2xl border border-lime/20 bg-lime/[0.05] px-5 py-3">
        <Flame size={20} className="text-lime" />
        <p className="text-lg font-extrabold tracking-tight">{stats.streak} DAY STREAK</p>
      </div>

      {/* REP Score delta */}
      <div className="w-full max-w-xs rounded-2xl border border-ink-700 bg-ink-800 p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">REP Score</p>
        <div className="mt-2 flex items-center justify-center gap-3">
          <span className="text-2xl font-extrabold text-gray-500">{previousRepScore}</span>
          <ArrowRight size={20} className="text-gray-600" />
          <span className="text-2xl font-extrabold text-lime tabular-nums">{displayedScore}</span>
        </div>
        <p className="mt-2 text-xs font-bold uppercase tracking-wide text-lime">+24 points</p>
      </div>

      {/* Done button */}
      <button
        onClick={onDone}
        className="flex w-full max-w-xs items-center justify-center gap-2 rounded-2xl bg-lime py-4 text-base font-extrabold uppercase tracking-wide text-black transition-all active:scale-[0.98] hover:bg-lime-dark"
      >
        Done
      </button>
    </div>
  );
}
