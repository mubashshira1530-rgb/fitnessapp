import type {
  Workout,
  Achievement,
  RecentActivity,
  PersonalRecord,
} from './types';

export const userProfile = {
  name: 'Alex',
  fitnessGoal: 'Build muscle & stay consistent',
  trainingDays: ['Mon', 'Tue', 'Thu', 'Fri'] as string[],
  preferences: {
    units: 'Metric (kg)',
    restTimer: true,
    soundEffects: true,
    vibration: true,
  },
  joinDate: 'March 2025',
};

export const stats = {
  streak: 9,
  repScore: 766,
  repScoreIncrease: 24,
  weeklyCommitment: 5,
  weeklyCompleted: 4,
  totalWorkouts: 26,
  trainingTimeMin: 1284,
  totalVolumeKg: 24600,
};

export const todaysWorkoutId = 'w1';

export const workouts: Workout[] = [
  {
    id: 'w1',
    name: 'Upper Body Power',
    category: 'Push',
    difficulty: 'Intermediate',
    durationMin: 45,
    description: 'Chest, shoulders, and triceps focused power session.',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: '6-8', weight: '60 kg', restSeconds: 120 },
      { name: 'Overhead Press', sets: 3, reps: '8-10', weight: '40 kg', restSeconds: 90 },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', weight: '22 kg', restSeconds: 90 },
      { name: 'Lateral Raises', sets: 3, reps: '12-15', weight: '10 kg', restSeconds: 60 },
      { name: 'Tricep Pushdown', sets: 3, reps: '12-15', weight: '30 kg', restSeconds: 60 },
      { name: 'Cable Fly', sets: 3, reps: '12-15', weight: '25 kg', restSeconds: 60 },
    ],
  },
  {
    id: 'w2',
    name: 'Back & Biceps',
    category: 'Pull',
    difficulty: 'Intermediate',
    durationMin: 50,
    description: 'Lat-focused pulling with biceps finishers.',
    exercises: [
      { name: 'Deadlift', sets: 3, reps: '5', weight: '80 kg', restSeconds: 180 },
      { name: 'Pull-Ups', sets: 4, reps: '8-10', weight: 'Bodyweight', restSeconds: 120 },
      { name: 'Barbell Row', sets: 3, reps: '8-10', weight: '50 kg', restSeconds: 90 },
      { name: 'Seated Cable Row', sets: 3, reps: '10-12', weight: '45 kg', restSeconds: 90 },
      { name: 'Hammer Curls', sets: 3, reps: '10-12', weight: '14 kg', restSeconds: 60 },
      { name: 'Preacher Curls', sets: 3, reps: '12', weight: '20 kg', restSeconds: 60 },
    ],
  },
  {
    id: 'w3',
    name: 'Leg Day Crusher',
    category: 'Legs',
    difficulty: 'Advanced',
    durationMin: 55,
    description: 'Quad and glute dominant lower body session.',
    exercises: [
      { name: 'Squat', sets: 4, reps: '6-8', weight: '90 kg', restSeconds: 180 },
      { name: 'Romanian Deadlift', sets: 3, reps: '8-10', weight: '70 kg', restSeconds: 120 },
      { name: 'Leg Press', sets: 3, reps: '10-12', weight: '140 kg', restSeconds: 90 },
      { name: 'Walking Lunges', sets: 3, reps: '12/leg', weight: '20 kg', restSeconds: 90 },
      { name: 'Leg Extensions', sets: 3, reps: '15', weight: '50 kg', restSeconds: 60 },
      { name: 'Calf Raises', sets: 4, reps: '15-20', weight: '60 kg', restSeconds: 45 },
    ],
  },
  {
    id: 'w4',
    name: 'Full Body Conditioning',
    category: 'Full Body',
    difficulty: 'Beginner',
    durationMin: 40,
    description: 'Compound movements for overall strength and conditioning.',
    exercises: [
      { name: 'Goblet Squat', sets: 3, reps: '10-12', weight: '24 kg', restSeconds: 90 },
      { name: 'Dumbbell Bench Press', sets: 3, reps: '10-12', weight: '22 kg', restSeconds: 90 },
      { name: 'Bent-Over Row', sets: 3, reps: '10-12', weight: '22 kg', restSeconds: 90 },
      { name: 'Shoulder Press', sets: 3, reps: '10-12', weight: '16 kg', restSeconds: 60 },
      { name: 'Kettlebell Swings', sets: 3, reps: '15', weight: '16 kg', restSeconds: 60 },
    ],
  },
  {
    id: 'w5',
    name: 'HIIT Cardio Burn',
    category: 'Cardio',
    difficulty: 'Intermediate',
    durationMin: 30,
    description: 'High-intensity intervals for fat burn and endurance.',
    exercises: [
      { name: 'Burpees', sets: 4, reps: '30 sec', weight: 'Bodyweight', restSeconds: 30 },
      { name: 'Mountain Climbers', sets: 4, reps: '40 sec', weight: 'Bodyweight', restSeconds: 20 },
      { name: 'Jump Squats', sets: 4, reps: '30 sec', weight: 'Bodyweight', restSeconds: 30 },
      { name: 'Plank Jacks', sets: 3, reps: '45 sec', weight: 'Bodyweight', restSeconds: 15 },
      { name: 'High Knees', sets: 4, reps: '40 sec', weight: 'Bodyweight', restSeconds: 20 },
    ],
  },
  {
    id: 'w6',
    name: 'Push Day Volume',
    category: 'Push',
    difficulty: 'Advanced',
    durationMin: 60,
    description: 'High volume chest and triceps hypertrophy focus.',
    exercises: [
      { name: 'Incline Bench Press', sets: 5, reps: '8-10', weight: '50 kg', restSeconds: 120 },
      { name: 'Flat Dumbbell Press', sets: 4, reps: '10-12', weight: '26 kg', restSeconds: 90 },
      { name: 'Dips', sets: 3, reps: '10-12', weight: 'Bodyweight', restSeconds: 90 },
      { name: 'Lateral Raises', sets: 4, reps: '15', weight: '12 kg', restSeconds: 45 },
      { name: 'Overhead Press', sets: 3, reps: '8-10', weight: '45 kg', restSeconds: 90 },
      { name: 'Skull Crushers', sets: 3, reps: '12', weight: '25 kg', restSeconds: 60 },
      { name: 'Cable Pushdown', sets: 3, reps: '15', weight: '35 kg', restSeconds: 45 },
    ],
  },
  {
    id: 'w7',
    name: 'Quick Full Body',
    category: 'Full Body',
    difficulty: 'Beginner',
    durationMin: 25,
    description: 'Express workout covering all major muscle groups.',
    exercises: [
      { name: 'Bodyweight Squat', sets: 3, reps: '15', weight: 'Bodyweight', restSeconds: 45 },
      { name: 'Push-Ups', sets: 3, reps: '12', weight: 'Bodyweight', restSeconds: 45 },
      { name: 'Inverted Rows', sets: 3, reps: '10', weight: 'Bodyweight', restSeconds: 45 },
      { name: 'Plank', sets: 3, reps: '45 sec', weight: 'Bodyweight', restSeconds: 30 },
    ],
  },
  {
    id: 'w8',
    name: 'Steady State Cardio',
    category: 'Cardio',
    difficulty: 'Beginner',
    durationMin: 35,
    description: 'Zone 2 cardio for building aerobic base.',
    exercises: [
      { name: 'Treadmill Jog', sets: 1, reps: '30 min', weight: '—', restSeconds: 0 },
      { name: 'Cooldown Walk', sets: 1, reps: '5 min', weight: '—', restSeconds: 0 },
    ],
  },
];

export const recentActivity: RecentActivity[] = [
  { id: 'a1', workoutName: 'Upper Body Power', date: 'Today', durationMin: 45, volumeKg: 4200 },
  { id: 'a2', workoutName: 'Back & Biceps', date: 'Yesterday', durationMin: 50, volumeKg: 3800 },
  { id: 'a3', workoutName: 'Leg Day Crusher', date: '2 days ago', durationMin: 55, volumeKg: 5100 },
  { id: 'a4', workoutName: 'HIIT Cardio Burn', date: '3 days ago', durationMin: 30, volumeKg: 0 },
];

export const weeklyActivity = [
  { day: 'M', value: 45 },
  { day: 'T', value: 50 },
  { day: 'W', value: 0 },
  { day: 'T', value: 55 },
  { day: 'F', value: 40 },
  { day: 'S', value: 0 },
  { day: 'S', value: 0 },
];

export const monthlyActivity = [
  { label: 'W1', value: 160 },
  { label: 'W2', value: 180 },
  { label: 'W3', value: 140 },
  { label: 'W4', value: 210 },
];

export const personalRecords: PersonalRecord[] = [
  { exercise: 'Bench Press', weight: '70 kg', reps: 6, date: 'Oct 4', previousWeight: '65 kg', increaseKg: 5 },
  { exercise: 'Squat', weight: '85 kg', reps: 6, date: 'Oct 2', previousWeight: '75 kg', increaseKg: 10 },
  { exercise: 'Deadlift', weight: '110 kg', reps: 5, date: 'Sep 30', previousWeight: '100 kg', increaseKg: 10 },
];

export const achievements: Achievement[] = [
  { id: 'ach1', name: '7 Day Streak', description: 'Maintain a 7-day streak', unlocked: true, icon: 'Flame', earnedDate: 'Oct 5', earnedDetail: 'You showed up 7 days in a row without missing a session.' },
  { id: 'ach2', name: '50 Sets', description: 'Complete 50 total sets', unlocked: true, icon: 'Dumbbell', earnedDate: 'Oct 3', earnedDetail: 'You completed 50 sets across all workouts since starting.' },
  { id: 'ach3', name: 'First PR', description: 'Set your first personal record', unlocked: true, icon: 'Trophy', earnedDate: 'Sep 28', earnedDetail: 'You hit a new squat PR of 85 kg on Sep 28.' },
  { id: 'ach4', name: '30 Day Streak', description: 'Maintain a 30-day streak', unlocked: false, icon: 'Shield' },
  { id: 'ach5', name: '100 Workouts', description: 'Complete 100 workouts', unlocked: false, icon: 'Trophy' },
  { id: 'ach6', name: 'Strength Surge', description: 'Double your starting lifts', unlocked: false, icon: 'Zap' },
];
