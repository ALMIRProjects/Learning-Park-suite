import React, { useState } from 'react';
import { BookOpen, Play, CheckCircle, Star, ArrowRight, Award, Target, Volume2 } from 'lucide-react';

const Learning: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>(['1', '3']);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const lessons = [
    {
      id: '1',
      title: 'Ask for Help',
      description: 'Learn different ways to ask for help when you need it',
      emoji: '🙋‍♀️',
      color: 'from-blue-400 to-blue-600',
      difficulty: 'Easy',
      steps: [
        { text: 'Raise your hand or tap someone gently', emoji: '✋' },
        { text: 'Say "Excuse me" or "Can you help me?"', emoji: '💬' },
        { text: 'Explain what you need help with', emoji: '🗣️' },
        { text: 'Say "Thank you" when they help', emoji: '🙏' }
      ]
    },
    {
      id: '2',
      title: 'Order Food',
      description: 'Practice ordering food at a restaurant or cafeteria',
      emoji: '🍽️',
      color: 'from-green-400 to-green-600',
      difficulty: 'Medium',
      steps: [
        { text: 'Look at the menu carefully', emoji: '📋' },
        { text: 'Decide what you want to eat', emoji: '🤔' },
        { text: 'Wait for your turn to order', emoji: '⏳' },
        { text: 'Say "I would like..." and your choice', emoji: '🗣️' },
        { text: 'Say "please" and "thank you"', emoji: '😊' }
      ]
    },
    {
      id: '3',
      title: 'Calm Down',
      description: 'Strategies to help when you feel overwhelmed',
      emoji: '😌',
      color: 'from-purple-400 to-purple-600',
      difficulty: 'Easy',
      steps: [
        { text: 'Take 5 deep breaths slowly', emoji: '🫁' },
        { text: 'Count to 10 in your head', emoji: '🔢' },
        { text: 'Find a quiet, safe space', emoji: '🏠' },
        { text: 'Use your calming words or actions', emoji: '💭' },
        { text: 'Ask for help if you need it', emoji: '🤲' }
      ]
    },
    {
      id: '4',
      title: 'Make Friends',
      description: 'How to connect with others and make new friends',
      emoji: '👫',
      color: 'from-pink-400 to-pink-600',
      difficulty: 'Medium',
      steps: [
        { text: 'Smile and make eye contact', emoji: '😊' },
        { text: 'Say "Hello" or "Hi, I\'m..."', emoji: '👋' },
        { text: 'Ask about their interests', emoji: '❓' },
        { text: 'Share something about yourself', emoji: '💬' },
        { text: 'Suggest doing something together', emoji: '🤝' }
      ]
    },
    {
      id: '5',
      title: 'Money Skills',
      description: 'Learn about money and making purchases',
      emoji: '💰',
      color: 'from-yellow-400 to-orange-600',
      difficulty: 'Hard',
      steps: [
        { text: 'Recognize different coins and bills', emoji: '🪙' },
        { text: 'Count your money before buying', emoji: '🔢' },
        { text: 'Check the price of items', emoji: '🏷️' },
        { text: 'Give money to the cashier', emoji: '💳' },
        { text: 'Wait for your change', emoji: '💵' }
      ]
    },
    {
      id: '6',
      title: 'Time Management',
      description: 'Learn to manage your time and be punctual',
      emoji: '⏰',
      color: 'from-indigo-400 to-blue-600',
      difficulty: 'Medium',
      steps: [
        { text: 'Look at clocks and watches', emoji: '🕐' },
        { text: 'Plan your activities', emoji: '📅' },
        { text: 'Set reminders for important tasks', emoji: '⏰' },
        { text: 'Leave early to arrive on time', emoji: '🚶' },
        { text: 'Ask for help if you\'re running late', emoji: '📞' }
      ]
    }
  ];

  const completeLesson = (lessonId: string) => {
    setCompletedLessons(prev => [...prev, lessonId]);
    setCurrentLesson(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (currentLesson) {
    const lesson = lessons.find(l => l.id === currentLesson);
    if (!lesson) return null;

    return (
      <div className={`p-3 sm:p-6 bg-gradient-to-br ${lesson.color} min-h-screen`}>
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border-2 sm:border-4 border-white/50">
          <div className="text-center mb-4 sm:mb-6">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">{lesson.emoji}</div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{lesson.title}</h2>
            <p className="text-gray-600 text-sm sm:text-base">{lesson.description}</p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 ${getDifficultyColor(lesson.difficulty)}`}>
              {lesson.difficulty}
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            {lesson.steps.map((step, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-md border-2 sm:border-4 border-gray-100">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center mr-3 sm:mr-4 border-2 border-blue-200">
                    <span className="font-bold text-blue-700 text-sm sm:text-base">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1 sm:mb-2">
                      <span className="text-xl sm:text-2xl mr-2 sm:mr-3">{step.emoji}</span>
                      <h4 className="font-bold text-gray-800 text-sm sm:text-base">{step.text}</h4>
                    </div>
                  </div>
                  <button
                    onClick={() => speakText(step.text)}
                    className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors ml-2"
                  >
                    <Volume2 size={16} className="text-blue-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => setCurrentLesson(null)}
              className="flex-1 bg-gray-500 text-white font-bold py-2 sm:py-3 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all text-sm sm:text-base"
            >
              Back to Lessons
            </button>
            <button
              onClick={() => completeLesson(lesson.id)}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-2 sm:py-3 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all flex items-center justify-center text-sm sm:text-base"
            >
              <CheckCircle size={16} className="mr-1 sm:mr-2" />
              I Got It!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg border-2 sm:border-4 border-orange-200">
        <div className="flex items-center">
          <BookOpen className="text-orange-500 mr-3 sm:mr-4" size={32} />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Life Skills Learning</h2>
            <p className="text-sm sm:text-base text-gray-600">Practice important skills for daily life!</p>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg border-2 sm:border-4 border-green-200">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Your Progress</h3>
          <div className="flex items-center text-green-600">
            <Award size={16} className="mr-1" />
            <span className="font-bold text-sm sm:text-base">{completedLessons.length}/{lessons.length} Complete</span>
          </div>
        </div>
        
        <div className="bg-gray-200 rounded-full h-2 sm:h-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-1000"
            style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="space-y-3 sm:space-y-4">
        {lessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          
          return (
            <button
              key={lesson.id}
              onClick={() => setCurrentLesson(lesson.id)}
              className={`w-full bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border-2 sm:border-4 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 ${
                isCompleted ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center">
                <div className={`text-3xl sm:text-5xl mr-3 sm:mr-4 ${isCompleted ? '' : 'opacity-70'}`}>
                  {lesson.emoji}
                </div>
                
                <div className="flex-1 text-left">
                  <div className="flex items-center mb-1 sm:mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">{lesson.title}</h3>
                    {isCompleted && (
                      <CheckCircle size={20} className="text-green-500 ml-2" />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base mb-2">{lesson.description}</p>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getDifficultyColor(lesson.difficulty)}`}>
                      {lesson.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">{lesson.steps.length} steps</span>
                  </div>
                </div>
                
                <div className="ml-3 sm:ml-4">
                  {isCompleted ? (
                    <div className="bg-green-100 text-green-700 px-3 py-2 rounded-full font-bold text-xs sm:text-sm">
                      ✨ Done
                    </div>
                  ) : (
                    <div className="flex items-center text-blue-600">
                      <Play size={16} className="mr-1" />
                      <ArrowRight size={16} />
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Encouragement */}
      <div className="mt-4 sm:mt-6 bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border-2 sm:border-4 border-purple-300">
        <div className="text-center">
          <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🏆</div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Keep Learning!</h3>
          <p className="text-gray-700 text-sm sm:text-base">
            Every skill you practice makes you more independent and confident! 
            You're doing amazing! 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default Learning;