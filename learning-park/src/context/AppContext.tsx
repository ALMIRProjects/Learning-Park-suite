import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Task, EmotionEntry, AACSymbol } from '../types';

interface AppState {
  user: User;
  tasks: Task[];
  emotions: EmotionEntry[];
  aacSymbols: AACSymbol[];
  currentView: string;
  selectedMood: string;
}

interface AppAction {
  type: string;
  payload?: any;
}

const initialState: AppState = {
  user: {
    id: '1',
    name: 'Friend',
    avatar: '🦋',
    preferences: {
      soundEnabled: true,
      theme: 'light',
      fontSize: 'medium'
    },
    streaks: { meditation: 3, tasks: 5, emotions: 2 },
    badges: ['🌟', '🦋', '🌈']
  },
  tasks: [
    { id: '1', title: 'Brush Teeth', description: 'Morning dental care', icon: '🦷', completed: false, time: '8:00 AM', category: 'hygiene' },
    { id: '2', title: 'Eat Breakfast', description: 'Have a healthy breakfast', icon: '🍳', completed: false, time: '8:30 AM', category: 'daily' },
    { id: '3', title: 'Reading Time', description: 'Read for 15 minutes', icon: '📚', completed: true, time: '9:00 AM', category: 'learning' }
  ],
  emotions: [],
  aacSymbols: [
    { id: '1', text: 'Happy', symbol: '😊', category: 'emotions', color: 'bg-yellow-100' },
    { id: '2', text: 'Sad', symbol: '😢', category: 'emotions', color: 'bg-blue-100' },
    { id: '3', text: 'Angry', symbol: '😠', category: 'emotions', color: 'bg-red-100' },
    { id: '4', text: 'Excited', symbol: '🤩', category: 'emotions', color: 'bg-orange-100' },
    { id: '5', text: 'Tired', symbol: '😴', category: 'emotions', color: 'bg-purple-100' },
    { id: '6', text: 'Help', symbol: '🙋', category: 'basic', color: 'bg-green-100' },
    { id: '7', text: 'Water', symbol: '💧', category: 'basic', color: 'bg-cyan-100' },
    { id: '8', text: 'Food', symbol: '🍎', category: 'basic', color: 'bg-red-100' },
    { id: '9', text: 'Bathroom', symbol: '🚽', category: 'basic', color: 'bg-purple-100' },
    { id: '10', text: 'Play', symbol: '🎮', category: 'actions', color: 'bg-pink-100' },
    { id: '11', text: 'Sleep', symbol: '🛏️', category: 'actions', color: 'bg-indigo-100' },
    { id: '12', text: 'Book', symbol: '📚', category: 'objects', color: 'bg-brown-100' }
  ],
  currentView: 'home',
  selectedMood: 'neutral'
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    case 'SET_USER_NAME':
      return {
        ...state,
        user: { ...state.user, name: action.payload }
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        )
      };
    case 'ADD_EMOTION':
      return {
        ...state,
        emotions: [...state.emotions, action.payload]
      };
    case 'SET_MOOD':
      return { ...state, selectedMood: action.payload };
    case 'ADD_BADGE':
      return {
        ...state,
        user: {
          ...state.user,
          badges: [...state.user.badges, action.payload]
        }
      };
    case 'CHANGE_AVATAR':
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload
        }
      };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};