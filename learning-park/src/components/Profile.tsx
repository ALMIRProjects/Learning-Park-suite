import React, { useState } from 'react';
import { User, Star, Trophy, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Profile: React.FC = () => {
  const { state, dispatch } = useApp();
  const [showSettings, setShowSettings] = useState(false);

  const avatarOptions = ['🦋', '🌟', '🐰', '🐱', '🐶', '🦊', '🐼', '🦄', '🌈', '🎭', '🎨', '🎪'];

  const achievements = [
    { 
      title: 'Emotion Explorer', 
      description: 'Logged 5 different emotions', 
      emoji: '🎭', 
      earned: true 
    },
    { 
      title: 'Task Master', 
      description: 'Completed 10 daily tasks', 
      emoji: '✅', 
      earned: true 
    },
    { 
      title: 'Calm Champion', 
      description: 'Finished 3 meditation sessions', 
      emoji: '🧘', 
      earned: state.user.streaks.meditation >= 3 
    },
    { 
      title: 'Communication Star', 
      description: 'Used AAC board 20 times', 
      emoji: '💬', 
      earned: false 
    },
    { 
      title: 'Streak Keeper', 
      description: '7-day activity streak', 
      emoji: '🔥', 
      earned: false 
    },
    { 
      title: 'Learning Hero', 
      description: 'Completed all tutorials', 
      emoji: '🎓', 
      earned: false 
    }
  ];

  const changeAvatar = (newAvatar: string) => {
    dispatch({ type: 'CHANGE_AVATAR', payload: newAvatar });
  };

  return (
    <div className="p-3 sm:p-6 bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 min-h-screen">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg border-2 sm:border-4 border-teal-200">
        <div className="flex items-center">
          <div className="text-4xl sm:text-6xl mr-3 sm:mr-4 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full p-3 sm:p-4 border-2 sm:border-4 border-teal-300">
            {state.user.avatar}
          </div>
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Hello, {state.user.name}!</h2>
            <p className="text-sm sm:text-base text-gray-600">You're doing amazing! 🌟</p>
            
            <div className="flex items-center mt-2 sm:mt-3 space-x-2 sm:space-x-4">
              {state.user.badges.slice(0, 5).map((badge, index) => (
                <span key={index} className="text-lg sm:text-2xl">{badge}</span>
              ))}
              {state.user.badges.length > 5 && (
                <span className="text-gray-500 font-medium text-xs sm:text-sm">+{state.user.badges.length - 5} more</span>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 sm:p-3 bg-teal-100 rounded-full hover:bg-teal-200 transition-colors"
          >
            <Settings size={20} className="text-teal-600" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg border-2 sm:border-4 border-blue-200">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Settings</h3>
          
          <div>
            <span className="text-gray-700 font-medium mb-2 sm:mb-3 block text-sm sm:text-base">Choose Your Avatar</span>
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => changeAvatar(avatar)}
                  className={`text-2xl sm:text-3xl p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all ${
                    state.user.avatar === avatar 
                      ? 'border-teal-400 bg-teal-100 scale-110' 
                      : 'border-gray-200 hover:border-teal-300 hover:scale-105'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Streaks */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg border-2 sm:border-4 border-orange-200">
        <div className="flex items-center mb-3 sm:mb-4">
          <Trophy className="text-orange-500 mr-2 sm:mr-3" size={24} />
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Your Streaks</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: 'Meditation', value: state.user.streaks.meditation, emoji: '🧘', color: 'from-purple-400 to-purple-600' },
            { label: 'Tasks', value: state.user.streaks.tasks, emoji: '✅', color: 'from-green-400 to-green-600' },
            { label: 'Emotions', value: state.user.streaks.emotions, emoji: '❤️', color: 'from-pink-400 to-pink-600' }
          ].map((streak) => (
            <div key={streak.label} className={`bg-gradient-to-br ${streak.color} text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center`}>
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{streak.emoji}</div>
              <div className="text-xl sm:text-2xl font-bold">{streak.value}</div>
              <div className="text-xs sm:text-sm opacity-90">{streak.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border-2 sm:border-4 border-purple-200">
        <div className="flex items-center mb-3 sm:mb-4">
          <Star className="text-purple-500 mr-2 sm:mr-3" size={24} />
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Achievements</h3>
        </div>
        
        <div className="space-y-2 sm:space-y-3">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 sm:border-4 transition-all ${
                achievement.earned 
                  ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300' 
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center">
                <div className={`text-2xl sm:text-3xl mr-3 sm:mr-4 ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                  {achievement.emoji}
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold text-sm sm:text-base ${achievement.earned ? 'text-gray-800' : 'text-gray-500'}`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-xs sm:text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.earned && (
                  <div className="text-xl sm:text-2xl">✨</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;