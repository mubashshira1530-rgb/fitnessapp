import { Home, Dumbbell, BarChart3, User } from 'lucide-react';
import type { ScreenId } from '@/types';

interface Props {
  active: ScreenId;
  onChange: (screen: ScreenId) => void;
}

const items: { id: ScreenId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'workouts', label: 'Workouts', icon: Dumbbell },
  { id: 'progress', label: 'Progress', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
];

export function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-ink-700 bg-ink-950/95 backdrop-blur-lg" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="mx-auto flex max-w-2xl items-stretch justify-around px-2">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`relative flex flex-1 flex-col items-center gap-1 py-3 transition-all duration-200 ${
                isActive ? 'text-lime' : 'text-gray-600 hover:text-gray-300'
              }`}
            >
              {isActive && (
                <span className="absolute top-1.5 h-1 w-1 rounded-full bg-lime shadow-[0_0_6px_1px_rgba(199,255,0,0.5)]" />
              )}
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold tracking-wide uppercase">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
