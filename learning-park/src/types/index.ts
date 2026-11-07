export interface User {
  id: string;
  name: string;
  avatar: string;
  preferences: {
    soundEnabled: boolean;
    theme: 'light' | 'dark';
    fontSize: 'small' | 'medium' | 'large';
  };
  streaks: {
    meditation: number;
    tasks: number;
    emotions: number;
  };
  badges: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  time?: string;
  category: 'daily' | 'hygiene' | 'social' | 'learning';
}

export interface EmotionEntry {
  id: string;
  emotion: string;
  intensity: number;
  timestamp: Date;
  notes?: string;
}

export interface AACSymbol {
  id: string;
  text: string;
  symbol: string;
  category: 'basic' | 'emotions' | 'actions' | 'objects';
  color: string;
}

export interface MeditationSession {
  id: string;
  title: string;
  duration: number;
  type: 'breathing' | 'mindfulness' | 'visualization';
  audioUrl?: string;
  completed: boolean;
}