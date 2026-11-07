import React from 'react';
import { Star, Calendar, Heart, MessageSquare, Target, Zap, Gamepad2, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Home: React.FC = () => {
  const { state, dispatch } = useApp();

  const quickActions = [
    { id: 'schedule', title: 'My Schedule', icon: Calendar, color: 'from-blue-400 to-blue-600', desc: 'See what\'s next!' },
    { id: 'emotions', title: 'How I Feel', icon: Heart, color: 'from-pink-400 to-pink-600', desc: 'Share your feelings' },
    { id: 'aac', title: 'Talk Board', icon: MessageSquare, color: 'from-green-400 to-green-600', desc: 'Express yourself' },
    { id: 'minigames', title: 'Fun Games', icon: Gamepad2, color: 'from-cyan-400 to-cyan-600', desc: 'Play and learn!' }
  ];

  const completedTasks = state.tasks.filter(task => task.completed).length;
  const totalTasks = state.tasks.length;
  const progress = (completedTasks / totalTasks) * 100;

  return (
    <div className="relative p-3 sm:p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
  

      {/* Welcome Section */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg border-2 sm:border-4 border-yellow-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Welcome to Learning Park! 🎪
            </h2>
            <p className="text-sm sm:text-base text-gray-600">Let's have a wonderful day together!</p>
          </div>
          <div className="text-4xl sm:text-6xl">
            {state.user.avatar}
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg border-2 sm:border-4 border-green-200">
        <div className="flex items-center mb-3 sm:mb-4">
          <Target className="text-green-600 mr-2 sm:mr-3" size={24} />
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Today's Progress</h3>
        </div>
        
        <div className="bg-gray-200 rounded-full h-3 sm:h-4 mb-3 sm:mb-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm sm:text-base">
            {completedTasks} of {totalTasks} tasks completed
          </span>
          <div className="flex items-center text-green-600">
            <Zap size={16} className="mr-1" />
            <span className="font-bold text-sm sm:text-base">{state.user.streaks.tasks} day streak!</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => dispatch({ type: 'SET_VIEW', payload: action.id })}
              className={`bg-gradient-to-br ${action.color} text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
            >
              <Icon size={24} className="mb-2 sm:mb-3 mx-auto" />
              <h4 className="font-bold text-sm sm:text-lg mb-1 sm:mb-2">{action.title}</h4>
              <p className="text-xs sm:text-sm opacity-90">{action.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Fun Fact */}
      <div className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border-2 sm:border-4 border-yellow-300 mb-4 sm:mb-6">
        <div className="text-center">
          <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🌈</div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Did You Know?</h3>
          <p className="text-gray-700 text-sm sm:text-base">
            Every time you complete a task or express your feelings, you're building amazing skills! 
            Keep being awesome! ⭐
          </p>
        </div>
      </div>

      {/* About Link */}
      <div className="text-center">
        <button
          onClick={() => dispatch({ type: 'SET_VIEW', payload: 'about' })}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base transition-colors"
        >
          <Info size={16} className="mr-1" />
          Learn more about Learning Park
        </button>
      </div>
    </div>
  );
};

export default Home;