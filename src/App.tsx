import type { ScreenId } from './types';
import { Home } from '@/screens/Home';
import { Workouts } from '@/screens/Workouts';
import { ActiveWorkout } from '@/screens/ActiveWorkout';
import { Progress } from '@/screens/Progress';
import { Profile } from '@/screens/Profile';
import { Onboarding } from '@/screens/Onboarding';
import { BottomNav } from '@/components/BottomNav';
import { useState, useEffect } from 'react';

export default function App() {
  const [screen, setScreen] = useState<ScreenId>('home');
  const [activeWorkoutId, setActiveWorkoutId] = useState<string | null>(null);
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    setOnboarded(localStorage.getItem('repit_onboarded') === 'true');
  }, []);

  const handleStartWorkout = (workoutId: string) => {
    setActiveWorkoutId(workoutId);
    setScreen('active');
  };

  const handleExitWorkout = () => {
    setActiveWorkoutId(null);
    setScreen('home');
  };

  const handleOnboarded = () => {
    localStorage.setItem('repit_onboarded', 'true');
    setOnboarded(true);
  };

  if (onboarded === null) {
    return <div className="min-h-screen bg-ink-950" />;
  }

  if (!onboarded) {
    return (
      <div className="min-h-screen bg-ink-950 text-white">
        <div className="mx-auto max-w-2xl min-h-screen">
          <Onboarding onComplete={handleOnboarded} />
        </div>
      </div>
    );
  }

  const showNav = screen !== 'active';

  return (
    <div className="min-h-screen bg-ink-950 text-white">
      <div
        className={`mx-auto max-w-2xl px-4 min-h-screen ${
          showNav ? 'pb-24 pt-0 md:pt-8' : 'pt-0'
        }`} style={{ paddingTop: showNav ? 'env(safe-area-inset-top)' : 'env(safe-area-inset-top)' }}
      >
        {screen === 'home' && <Home onNavigate={setScreen} onStartWorkout={handleStartWorkout} />}
        {screen === 'workouts' && <Workouts onStartWorkout={handleStartWorkout} />}
        {screen === 'active' && (
          <ActiveWorkout workoutId={activeWorkoutId} onExit={handleExitWorkout} />
        )}
        {screen === 'progress' && <Progress />}
        {screen === 'profile' && <Profile />}
      </div>
      {showNav && <BottomNav active={screen} onChange={setScreen} />}
    </div>
  );
}
