import { useState } from 'react';
import {
  Flame, Bell, Palette, Dumbbell, User, ChevronRight, X, Check, Target,
} from 'lucide-react';
import { userProfile, stats } from '@/data';

const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const dayFull = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const trainingHours = (stats.trainingTimeMin / 60).toFixed(1);

export function Profile() {
  const [trainingDays, setTrainingDays] = useState<string[]>([...userProfile.trainingDays]);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editGoal, setEditGoal] = useState('BUILD STRENGTH');
  const [editLevel, setEditLevel] = useState('Beginner');
  const [editTarget, setEditTarget] = useState(4);

  const toggleDay = (day: string) => {
    setTrainingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSaveProfile = () => {
    userProfile.name = editName;
    setEditing(false);
  };

  return (
    <div className="animate-fade-in space-y-7 pb-2">
      {/* PROFILE HEADER */}
      <header className="pt-6 md:pt-2">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-lime bg-ink-700 text-2xl font-extrabold text-lime">
            {userProfile.name[0]}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-extrabold tracking-tight">{userProfile.name.toUpperCase()}</h1>
            <p className="mt-0.5 text-sm text-gray-400">Beginner · Strength Training</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-lime/20 bg-lime/[0.05] px-4 py-2.5">
          <Flame size={18} className="text-lime" />
          <span className="text-sm font-extrabold tracking-tight">{stats.streak} DAY STREAK</span>
        </div>
      </header>

      {/* FITNESS IDENTITY */}
      <section>
        <SectionLabel>My Goal</SectionLabel>
        <p className="text-lg font-extrabold tracking-tight">BUILD STRENGTH</p>

        <div className="mt-4 divide-y divide-ink-700 border-y border-ink-700">
          <IdentityRow label="Training Level" value="Beginner" />
          <IdentityRow label="Workout Target" value="4 Days / Week" />
        </div>
      </section>

      {/* MY TRAINING DAYS */}
      <section>
        <SectionLabel>My Training Days</SectionLabel>
        <div className="mt-3 flex gap-2">
          {dayFull.map((day, i) => {
            const isTraining = trainingDays.includes(day);
            return (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`flex flex-1 flex-col items-center gap-2 rounded-xl border py-3 transition-all active:scale-95 ${
                  isTraining
                    ? 'border-lime/40 bg-lime/10'
                    : 'border-ink-700 bg-ink-800 hover:border-ink-500'
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                    isTraining ? 'bg-lime' : 'bg-ink-600'
                  }`}
                >
                  {isTraining ? (
                    <Check size={16} className="text-black" strokeWidth={3} />
                  ) : (
                    <span className="text-xs font-bold text-gray-600">—</span>
                  )}
                </div>
                <span className={`text-[11px] font-bold ${isTraining ? 'text-lime' : 'text-gray-500'}`}>
                  {dayLabels[i]}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-gray-500">
          {trainingDays.length} days selected · Tap a day to toggle
        </p>
      </section>

      {/* REPIT STATS */}
      <section>
        <SectionLabel>Repit Stats</SectionLabel>
        <div className="mt-3 flex items-center divide-x divide-ink-700 border-y border-ink-700 py-4">
          <StatCell value={stats.totalWorkouts.toString()} label="Workouts" />
          <StatCell value={`${trainingHours}h`} label="Training Time" />
          <StatCell value={stats.repScore.toString()} label="REP Score" />
        </div>
      </section>

      {/* SETTINGS */}
      <section>
        <SectionLabel>Settings</SectionLabel>
        <div className="mt-3 divide-y divide-ink-700 border-y border-ink-700">
          <SettingsRow icon={Bell} label="Notifications" onTap={() => {}} />
          <SettingsRow icon={Palette} label="Appearance" onTap={() => {}} />
          <SettingsRow icon={Dumbbell} label="Workout Preferences" onTap={() => {}} />
          <SettingsRow icon={User} label="Edit Profile" onTap={() => setEditing(true)} />
        </div>
      </section>

      {/* TAGLINE */}
      <div className="pt-2 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-600">
          Show up. Do the work. Repeat.
        </p>
      </div>

      {/* EDIT PROFILE MODAL */}
      {editing && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-sm md:items-center"
          onClick={() => setEditing(false)}
        >
          <div
            className="animate-slide-up mx-4 w-full max-w-md rounded-2xl border border-ink-600 bg-ink-800 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold tracking-tight">Edit Profile</h3>
              <button
                onClick={() => setEditing(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                  Name
                </label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-ink-600 bg-ink-700 px-4 py-3 text-sm font-medium text-white outline-none transition-colors focus:border-lime/50"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                  Goal
                </label>
                <div className="mt-2 flex gap-2">
                  {['BUILD STRENGTH', 'BUILD MUSCLE', 'LOSE FAT'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setEditGoal(g)}
                      className={`flex-1 rounded-lg border px-2 py-2.5 text-[11px] font-bold uppercase tracking-wide transition-all ${
                        editGoal === g
                          ? 'border-lime bg-lime/10 text-lime'
                          : 'border-ink-600 bg-ink-700 text-gray-400'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                  Training Level
                </label>
                <div className="mt-2 flex gap-2">
                  {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setEditLevel(lvl)}
                      className={`flex-1 rounded-lg border px-2 py-2.5 text-[11px] font-bold uppercase tracking-wide transition-all ${
                        editLevel === lvl
                          ? 'border-lime bg-lime/10 text-lime'
                          : 'border-ink-600 bg-ink-700 text-gray-400'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                  Workout Target: {editTarget} Days / Week
                </label>
                <div className="mt-3 flex gap-2">
                  {[2, 3, 4, 5, 6].map((n) => (
                    <button
                      key={n}
                      onClick={() => setEditTarget(n)}
                      className={`flex h-10 flex-1 items-center justify-center rounded-lg border text-sm font-bold transition-all ${
                        editTarget === n
                          ? 'border-lime bg-lime/10 text-lime'
                          : 'border-ink-600 bg-ink-700 text-gray-400'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveProfile}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-lime py-3.5 text-sm font-extrabold uppercase tracking-wide text-black transition-all active:scale-[0.98] hover:bg-lime-dark"
            >
              <Check size={18} strokeWidth={3} />
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">{children}</p>
  );
}

function IdentityRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3.5">
      <span className="text-sm font-medium text-gray-400">{label}</span>
      <span className="text-sm font-bold">{value}</span>
    </div>
  );
}

function StatCell({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1 px-2 text-center">
      <p className="text-lg font-extrabold tracking-tight">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">{label}</p>
    </div>
  );
}

function SettingsRow({
  icon: Icon,
  label,
  onTap,
}: {
  icon: typeof Bell;
  label: string;
  onTap: () => void;
}) {
  return (
    <button
      onClick={onTap}
      className="flex w-full items-center justify-between py-4 transition-colors hover:text-lime active:scale-[0.99]"
    >
      <div className="flex items-center gap-3">
        <Icon size={18} className="text-gray-500 transition-colors" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <ChevronRight size={18} className="text-gray-600" />
    </button>
  );
}
