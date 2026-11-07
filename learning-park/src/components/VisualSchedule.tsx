import React from 'react';
import { CheckCircle, Circle, Clock, Star, Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const VisualSchedule: React.FC = () => {
  const { state, dispatch } = useApp();

  const toggleTask = (taskId: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId });
    
    // Add celebration for completed tasks
    const task = state.tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      // Task being completed - could add celebration animation here
      setTimeout(() => {
        dispatch({ type: 'ADD_BADGE', payload: '⭐' });
      }, 500);
    }
  };

  const speakTask = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const categoryColors = {
    daily: 'from-blue-400 to-blue-600',
    hygiene: 'from-green-400 to-green-600',
    social: 'from-purple-400 to-purple-600',
    learning: 'from-orange-400 to-orange-600'
  };

  const categoryIcons = {
    daily: '🌅',
    hygiene: '🧼',
    social: '👥',
    learning: '📚'
  };

  return (
    <div className="p-3 sm:p-6 bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg border-2 sm:border-4 border-blue-200">
        <div className="flex items-center">
          <div className="text-3xl sm:text-4xl mr-3 sm:mr-4">📅</div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">My Daily Schedule</h2>
            <p className="text-sm sm:text-base text-gray-600">Let's make today amazing!</p>
          </div>
        </div>
      </div>

      {/* Tasks by Category */}
      {Object.entries(
        state.tasks.reduce((acc, task) => {
          if (!acc[task.category]) acc[task.category] = [];
          acc[task.category].push(task);
          return acc;
        }, {} as Record<string, typeof state.tasks>)
      ).map(([category, tasks]) => (
        <div key={category} className="mb-4 sm:mb-6">
          <div className="flex items-center mb-3 sm:mb-4">
            <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">{categoryIcons[category as keyof typeof categoryIcons]}</span>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 capitalize">
              {category} Activities
            </h3>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`w-full bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border-2 sm:border-4 transition-all duration-200 ${
                  task.completed 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-gray-200 hover:border-purple-300 hover:shadow-xl'
                }`}
              >
                <div className="flex items-center">
                  <div className="text-3xl sm:text-4xl mr-3 sm:mr-4">{task.icon}</div>
                  
                  <div className="flex-1 text-left">
                    <h4 className={`text-base sm:text-lg font-bold ${
                      task.completed ? 'text-green-700 line-through' : 'text-gray-800'
                    }`}>
                      {task.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{task.description}</p>
                    {task.time && (
                      <div className="flex items-center mt-1 sm:mt-2 text-purple-600">
                        <Clock size={14} className="mr-1" />
                        <span className="text-xs sm:text-sm font-medium">{task.time}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-3 sm:ml-4">
                    <button
                      onClick={() => speakTask(`${task.title}. ${task.description}`)}
                      className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Volume2 size={16} className="text-blue-600" />
                    </button>
                    
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="p-2"
                    >
                      {task.completed ? (
                        <CheckCircle size={24} className="text-green-500" />
                      ) : (
                        <Circle size={24} className="text-gray-400 hover:text-purple-500" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Encouragement Section */}
      <div className="bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border-2 sm:border-4 border-purple-300">
        <div className="text-center">
          <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🎉</div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Great Job!</h3>
          <p className="text-gray-700 text-sm sm:text-base">
            Every task you complete helps you grow stronger and smarter! 
            You're doing amazing! 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisualSchedule;