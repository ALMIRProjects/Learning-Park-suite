import React, { useState } from 'react';
import { Target, Plus, Trophy, Calendar, CheckCircle } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'daily' | 'weekly' | 'social' | 'learning';
  progress: number;
  target: number;
  emoji: string;
  reward: string;
}

const Goals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Brush Teeth Daily',
      description: 'Brush teeth every morning and evening',
      category: 'daily',
      progress: 5,
      target: 7,
      emoji: '🦷',
      reward: 'Sparkly teeth sticker!'
    },
    {
      id: '2',
      title: 'Express Feelings',
      description: 'Use the emotion board 3 times this week',
      category: 'weekly',
      progress: 2,
      target: 3,
      emoji: '💭',
      reward: 'Emotion master badge!'
    },
    {
      id: '3',
      title: 'Make New Friend',
      description: 'Say hello to someone new',
      category: 'social',
      progress: 0,
      target: 1,
      emoji: '👋',
      reward: 'Friendship star!'
    },
    {
      id: '4',
      title: 'Complete Learning Path',
      description: 'Finish 2 life skills lessons',
      category: 'learning',
      progress: 1,
      target: 2,
      emoji: '📚',
      reward: 'Knowledge crown!'
    }
  ]);

  const [showNewGoal, setShowNewGoal] = useState(false);

  const categoryColors = {
    daily: 'from-blue-400 to-blue-600',
    weekly: 'from-purple-400 to-purple-600',
    social: 'from-pink-400 to-pink-600',
    learning: 'from-green-400 to-green-600'
  };

  const categoryLabels = {
    daily: 'Daily Goal',
    weekly: 'Weekly Goal',
    social: 'Social Goal',
    learning: 'Learning Goal'
  };

  const updateProgress = (goalId: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, progress: Math.min(goal.progress + 1, goal.target) }
        : goal
    ));
  };

  const completedGoals = goals.filter(goal => goal.progress >= goal.target);
  const activeGoals = goals.filter(goal => goal.progress < goal.target);

  return (
    <div className="p-3 sm:p-6 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg border-2 sm:border-4 border-red-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Target className="text-red-500 mr-3 sm:mr-4" size={32} />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">My Goals</h2>
              <p className="text-sm sm:text-base text-gray-600">Track your amazing progress!</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowNewGoal(true)}
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 sm:p-3 rounded-full hover:shadow-lg transition-all"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Completed Goals Celebration */}
      {completedGoals.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg border-2 sm:border-4 border-yellow-300">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🎉</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Congratulations!</h3>
            <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
              You've completed {completedGoals.length} goal{completedGoals.length !== 1 ? 's' : ''}! 
              You're doing amazing! ⭐
            </p>
            
            <div className="grid grid-cols-1 gap-2 sm:gap-3">
              {completedGoals.map(goal => (
                <div key={goal.id} className="bg-white/70 rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-yellow-400">
                  <div className="flex items-center">
                    <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">{goal.emoji}</span>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold text-gray-800 text-sm sm:text-base">{goal.title}</h4>
                      <p className="text-xs sm:text-sm text-green-600 font-medium">🏆 {goal.reward}</p>
                    </div>
                    <CheckCircle size={20} className="text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Goals */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
          <Calendar className="mr-2" size={20} />
          Active Goals
        </h3>
        
        {activeGoals.map(goal => {
          const progressPercentage = (goal.progress / goal.target) * 100;
          
          return (
            <div key={goal.id} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border-2 sm:border-4 border-gray-200">
              <div className="flex items-start mb-3 sm:mb-4">
                <div className="text-3xl sm:text-4xl mr-3 sm:mr-4">{goal.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center mb-1 sm:mb-2">
                    <h4 className="text-base sm:text-lg font-bold text-gray-800">{goal.title}</h4>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${categoryColors[goal.category]}`}>
                      {categoryLabels[goal.category]}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">{goal.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-2 sm:mb-3">
                    <div className="flex justify-between items-center mb-1 sm:mb-2">
                      <span className="text-xs sm:text-sm font-medium text-gray-700">
                        Progress: {goal.progress}/{goal.target}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-purple-600">
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${categoryColors[goal.category]} transition-all duration-1000`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-orange-600">
                      <Trophy size={14} className="mr-1" />
                      <span className="text-xs sm:text-sm font-medium">{goal.reward}</span>
                    </div>
                    
                    {goal.progress < goal.target && (
                      <button
                        onClick={() => updateProgress(goal.id)}
                        className={`bg-gradient-to-r ${categoryColors[goal.category]} text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded-lg sm:rounded-xl hover:shadow-lg transition-all text-xs sm:text-sm`}
                      >
                        Mark Progress +1
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Motivational Section */}
      <div className="mt-4 sm:mt-6 bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border-2 sm:border-4 border-purple-300">
        <div className="text-center">
          <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">💪</div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">You're Growing Stronger!</h3>
          <p className="text-gray-700 text-sm sm:text-base">
            Every small step towards your goals is amazing progress. 
            Keep going - you've got this! 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default Goals;