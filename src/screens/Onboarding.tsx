import { useState } from 'react';
import { ArrowRight, Check, Dumbbell } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const introSlides = [
  {
    label: 'Still waiting for Monday?',
    sub: 'The best time to start was yesterday. The second best time is now.',
  },
  {
    label: 'Build the habit.',
    sub: "Not the excuse. REPIT keeps you showing up — one workout at a time.",
  },
  {
    label: 'Show up. Do the work. Repeat.',
    sub: 'No fluff. No excuses. Just consistent reps that compound.',
  },
];

const goals = ['Build Strength', 'Build Muscle', 'Lose Fat'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];
const frequencies = [2, 3, 4, 5, 6];
const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const dayFull = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('');
  const [frequency, setFrequency] = useState(0);
  const [trainingDays, setTrainingDays] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    setTrainingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Intro slides (0-2)
  if (step < 3) {
    const slide = introSlides[step];
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="mb-12 flex items-center gap-2">
          <Dumbbell size={24} className="text-lime" />
          <span className="text-sm font-extrabold uppercase tracking-[0.3em]">REPIT</span>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-sm w-full">
          <div key={step} className="animate-fade-in space-y-4">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
              {slide.label}
            </h1>
            <p className="text-base text-gray-400 leading-relaxed">{slide.sub}</p>
          </div>
        </div>

        <div className="w-full max-w-sm space-y-6 pt-12">
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2">
            {introSlides.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? 'w-8 bg-lime' : i < step ? 'w-4 bg-lime/40' : 'w-4 bg-ink-600'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setStep((s) => s + 1)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-lime py-4 text-base font-extrabold uppercase tracking-wide text-black transition-all active:scale-[0.98] hover:bg-lime-dark"
          >
            {step < 2 ? 'Continue' : "Let's Start"}
            <ArrowRight size={20} />
          </button>

          {step === 0 && (
            <button
              onClick={onComplete}
              className="w-full text-center text-xs font-medium text-gray-500 transition-colors hover:text-white"
            >
              Skip intro
            </button>
          )}
        </div>
      </div>
    );
  }

  // Setup screen (step 3)
  const canProceed = goal && level && frequency > 0 && trainingDays.length > 0;

  return (
    <div className="flex min-h-screen flex-col px-6 pt-6 pb-8 md:pt-12">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-[0.3em] text-lime">Setup</span>
        <button
          onClick={onComplete}
          className="text-xs font-medium text-gray-500 transition-colors hover:text-white"
        >
          Skip
        </button>
      </div>

      <div className="flex-1 space-y-7 overflow-y-auto">
        {/* Goal */}
        <SetupSection title="Fitness Goal">
          <div className="flex flex-col gap-2">
            {goals.map((g) => (
              <button
                key={g}
                onClick={() => setGoal(g)}
                className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm font-bold transition-all active:scale-[0.99] ${
                  goal === g
                    ? 'border-lime bg-lime/10 text-lime'
                    : 'border-ink-700 bg-ink-800 text-gray-300 hover:border-ink-500'
                }`}
              >
                {g}
                {goal === g && <Check size={18} strokeWidth={3} />}
              </button>
            ))}
          </div>
        </SetupSection>

        {/* Experience Level */}
        <SetupSection title="Experience Level">
          <div className="flex gap-2">
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={`flex-1 rounded-xl border px-2 py-3 text-xs font-bold uppercase tracking-wide transition-all active:scale-[0.98] ${
                  level === lvl
                    ? 'border-lime bg-lime/10 text-lime'
                    : 'border-ink-700 bg-ink-800 text-gray-400 hover:border-ink-500'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </SetupSection>

        {/* Training Frequency */}
        <SetupSection title="Workout Frequency">
          <div className="flex gap-2">
            {frequencies.map((n) => (
              <button
                key={n}
                onClick={() => setFrequency(n)}
                className={`flex h-12 flex-1 items-center justify-center rounded-xl border text-sm font-extrabold transition-all active:scale-[0.97] ${
                  frequency === n
                    ? 'border-lime bg-lime/10 text-lime'
                    : 'border-ink-700 bg-ink-800 text-gray-400 hover:border-ink-500'
                }`}
              >
                {n}×
              </button>
            ))}
          </div>
        </SetupSection>

        {/* Training Days */}
        <SetupSection title="Training Days">
          <div className="flex gap-1.5">
            {dayFull.map((day, i) => {
              const selected = trainingDays.includes(day);
              return (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`flex h-12 flex-1 items-center justify-center rounded-lg border text-sm font-bold transition-all active:scale-95 ${
                    selected
                      ? 'border-lime bg-lime text-black'
                      : 'border-ink-700 bg-ink-800 text-gray-500 hover:border-ink-500'
                  }`}
                >
                  {dayLabels[i]}
                </button>
              );
            })}
          </div>
          {trainingDays.length > 0 && (
            <p className="mt-2.5 text-xs text-gray-500">{trainingDays.length} days selected</p>
          )}
        </SetupSection>
      </div>

      <button
        onClick={onComplete}
        disabled={!canProceed}
        className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-extrabold uppercase tracking-wide transition-all active:scale-[0.98] ${
          canProceed
            ? 'bg-lime text-black hover:bg-lime-dark'
            : 'cursor-not-allowed bg-ink-700 text-gray-500'
        }`}
      >
        Start Training
        <ArrowRight size={20} />
      </button>
    </div>
  );
}

function SetupSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">{title}</p>
      {children}
    </div>
  );
}
