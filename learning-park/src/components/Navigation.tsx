import React from 'react';
import { Home, Calendar, Heart, MessageSquare, Headphones, User, BookOpen, Target, Gamepad2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navigation: React.FC = () => {
  const { state, dispatch } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, color: 'text-purple-600' },
    { id: 'schedule', label: 'Schedule', icon: Calendar, color: 'text-blue-600' },
    { id: 'emotions', label: 'Feelings', icon: Heart, color: 'text-pink-600' },
    { id: 'aac', label: 'Talk', icon: MessageSquare, color: 'text-green-600' },
    { id: 'meditation', label: 'Calm', icon: Headphones, color: 'text-indigo-600' },
    { id: 'learning', label: 'Learn', icon: BookOpen, color: 'text-orange-600' },
    { id: 'minigames', label: 'Games', icon: Gamepad2, color: 'text-cyan-600' },
    { id: 'goals', label: 'Goals', icon: Target, color: 'text-red-600' },
    { id: 'profile', label: 'Me', icon: User, color: 'text-teal-600' }
  ];

  return (
    <nav className="bg-white border-t-2 sm:border-t-4 border-purple-300 shadow-lg">
      <div className="flex justify-around items-center py-1 sm:py-2 px-1 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = state.currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => dispatch({ type: 'SET_VIEW', payload: item.id })}
              className={`flex flex-col items-center p-1 sm:p-2 rounded-xl transition-all duration-200 min-w-0 flex-shrink-0 ${
                isActive 
                  ? 'bg-gradient-to-b from-purple-100 to-purple-200 scale-110' 
                  : 'hover:bg-gray-50 hover:scale-105'
              }`}
            >
              <Icon 
                size={16} 
                className={`${item.color} ${isActive ? 'animate-pulse' : ''}`} 
              />
              <span className={`text-xs mt-1 font-medium ${
                isActive ? 'text-purple-700' : 'text-gray-600'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;