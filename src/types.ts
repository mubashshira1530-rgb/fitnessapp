export type ScreenId = 'home' | 'workouts' | 'active' | 'progress' | 'profile';

export type Category = 'Push' | 'Pull' | 'Legs' | 'Full Body' | 'Cardio';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  weight: string;
  restSeconds: number;
}

export interface Workout {
  id: string;
  name: string;
  category: Category;
  difficulty: Difficulty;
  durationMin: number;
  description: string;
  exercises: Exercise[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
  earnedDate?: string;
  earnedDetail?: string;
}

export interface RecentActivity {
  id: string;
  workoutName: string;
  date: string;
  durationMin: number;
  volumeKg: number;
}

export interface PersonalRecord {
  exercise: string;
  weight: string;
  reps: number;
  date: string;
  previousWeight: string;
  increaseKg: number;
}
