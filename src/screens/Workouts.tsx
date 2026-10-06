import { useState } from 'react';
import { Clock, Dumbbell, ChevronRight, Play, Search } from 'lucide-react';
import type { Category, Difficulty } from '@/types';
import { workouts } from '@/data';

interface Props {
  onStartWorkout: (workoutId: string) => void;
}

const categories: (Category | 'All')[] = ['All', 'Push', 'Pull', 'Legs', 'Full Body', 'Cardio'];

const difficultyColor: Record<Difficulty, string> = {
  Beginner: 'border-green-500/30 text-green-400 bg-green-500/10',
  Intermediate: 'border-lime/30 text-lime bg-lime/10',
  Advanced: 'border-orange-500/30 text-orange-400 bg-orange-500/10',
};

export function Workouts({ onStartWorkout }: Props) {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [search, setSearch] = useState('');

  const filtered = workouts.filter((w) => {
    const matchesCategory = activeCategory === 'All' || w.category === activeCategory;
    const matchesSearch = search === '' || w.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-fade-in space-y-5">
      {/* Header */}
      <header className="pt-6 md:pt-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Workouts</h1>
        <p className="mt-1 text-sm font-gray-400">Pick your session and get to work.</p>
      </header>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search workouts..."
          className="w-full rounded-xl border border-ink-700 bg-ink-800 py-3 pl-11 pr-4 text-sm font-medium text-white placeholder:text-gray-600 outline-none transition-colors focus:border-lime/40"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? 'border-lime bg-lime text-black'
                  : 'border-ink-600 bg-ink-800 text-gray-400 hover:border-ink-500 hover:text-white'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Workout Cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Dumbbell size={32} className="text-gray-700" />
          <p className="mt-4 text-sm font-bold text-gray-400">No workouts found.</p>
          <p className="mt-1 text-xs text-gray-600">Try a different category or search term.</p>
        </div>
      ) : (
      <div className="space-y-3">
        {filtered.map((w) => (
          <div
            key={w.id}
            className="group rounded-2xl border border-ink-700 bg-ink-800 p-5 transition-all hover:border-ink-500"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold">{w.name}</h3>
                </div>
                <p className="mt-1 text-sm text-gray-400">{w.description}</p>
              </div>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${difficultyColor[w.difficulty]}`}
              >
                {w.difficulty}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-5 text-sm text-gray-300">
              <span className="flex items-center gap-1.5">
                <Dumbbell size={15} className="text-gray-500" />
                {w.exercises.length} exercises
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-gray-500" />
                {w.durationMin} min
              </span>
              <span className="rounded-md bg-ink-700 px-2 py-0.5 text-xs font-medium text-gray-400">
                {w.category}
              </span>
            </div>

            <button
              onClick={() => onStartWorkout(w.id)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-lime/30 bg-lime/5 py-3 text-sm font-bold uppercase tracking-wide text-lime transition-all hover:bg-lime hover:text-black"
            >
              <Play size={16} fill="currentColor" />
              Start Workout
              <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
