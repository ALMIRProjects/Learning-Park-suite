import React, { useState } from 'react';
import { Heart, Smile, Frown, Meh, Angry, Zap, Wind } from 'lucide-react';
import { useApp } from '../context/AppContext';

const EmotionRegulation: React.FC = () => {
  const { state, dispatch } = useApp();
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [intensity, setIntensity] = useState(3);
  const [showBreathing, setShowBreathing] = useState(false);

  const emotions = [
    { name: 'Happy', emoji: '😊', color: 'bg-yellow-200 border-yellow-400', icon: Smile },
    { name: 'Sad', emoji: '😢', color: 'bg-blue-200 border-blue-400', icon: Frown },
    { name: 'Angry', emoji: '😠', color: 'bg-red-200 border-red-400', icon: Angry },
    { name: 'Worried', emoji: '😰', color: 'bg-purple-200 border-purple-400', icon: Meh },
    { name: 'Excited', emoji: '🤩', color: 'bg-orange-200 border-orange-400', icon: Zap },
    { name: 'Calm', emoji: '😌', color: 'bg-green-200 border-green-400', icon: Wind }
  ];

  const copingStrategies = [
    { title: 'Deep Breathing', emoji: '🫁', action: () => setShowBreathing(true) },
    { title: 'Count to 10', emoji: '🔢', action: () => {} },
    { title: 'Listen to Music', emoji: '🎵', action: () => {} },
    { title: 'Draw or Color', emoji: '🎨', action: () => {} },
    { title: 'Hug a Stuffie', emoji: '🧸', action: () => {} },
    { title: 'Go for a Walk', emoji: '🚶', action: () => {} }
  ];

  const saveEmotion = () => {
    if (selectedEmotion) {
      const emotionEntry = {
        id: Date.now().toString(),
        emotion: selectedEmotion,
        intensity,
        timestamp: new Date()
      };
      dispatch({ type: 'ADD_EMOTION', payload: emotionEntry });
      setSelectedEmotion('');
      setIntensity(3);
    }
  };

  if (showBreathing) {
    return <BreathingExercise onClose={() => setShowBreathing(false)} />;
  }

  return (
    <div className="p-3 sm:p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg border-2 sm:border-4 border-pink-200">
        <div className="flex items-center">
          <Heart className="text-pink-500 mr-3 sm:mr-4" size={32} />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">How Are You Feeling?</h2>
            <p className="text-sm sm:text-base text-gray-600">It's okay to feel all kinds of emotions!</p>
          </div>
        </div>
      </div>

      {/* Emotion Selection */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg border-2 sm:border-4 border-purple-200">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Pick Your Emotion</h3>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {emotions.map((emotion) => {
            const Icon = emotion.icon;
            return (
              <button
                key={emotion.name}
                onClick={() => setSelectedEmotion(emotion.name)}
                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 sm:border-4 transition-all duration-200 ${
                  selectedEmotion === emotion.name 
                    ? `${emotion.color} scale-105 shadow-lg` 
                    : 'bg-gray-50 border-gray-200 hover:scale-105'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">{emotion.emoji}</div>
                <div className="font-bold text-gray-800 text-sm sm:text-base">{emotion.name}</div>
              </button>
            );
          })}
        </div>

        {selectedEmotion && (
          <div>
            <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3">
              How strong is this feeling?
            </h4>
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm text-gray-600">A little</span>
              <div className="flex space-x-1 sm:space-x-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => setIntensity(level)}
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 transition-all ${
                      intensity >= level 
                        ? 'bg-pink-500 border-pink-500' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-gray-600">Very much</span>
            </div>
            
            <button
              onClick={saveEmotion}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 sm:py-3 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all text-sm sm:text-base"
            >
              Save My Feeling 💝
            </button>
          </div>
        )}
      </div>

      {/* Coping Strategies */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border-2 sm:border-4 border-green-200">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Feeling Better Activities</h3>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {copingStrategies.map((strategy) => (
            <button
              key={strategy.title}
              onClick={strategy.action}
              className="bg-gradient-to-br from-green-100 to-green-200 border-2 sm:border-4 border-green-300 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{strategy.emoji}</div>
              <div className="font-bold text-gray-800 text-xs sm:text-sm">{strategy.title}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const BreathingExercise: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(4);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev === 1) {
          if (phase === 'inhale') {
            setPhase('hold');
            return 4;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return 4;
          } else {
            setPhase('inhale');
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return 'from-blue-400 to-blue-600';
      case 'hold': return 'from-purple-400 to-purple-600';
      case 'exhale': return 'from-green-400 to-green-600';
    }
  };

  return (
    <div className="p-3 sm:p-6 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border-2 sm:border-4 border-blue-200 text-center max-w-md w-full mx-3">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Breathing Exercise</h2>
        
        <div className={`w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br ${getPhaseColor()} flex items-center justify-center transform transition-all duration-1000 ${
          phase === 'inhale' ? 'scale-110' : phase === 'hold' ? 'scale-100' : 'scale-90'
        }`}>
          <span className="text-white text-2xl sm:text-4xl font-bold">{count}</span>
        </div>
        
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">{getPhaseText()}</h3>
        <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Follow the circle and breathe slowly</p>
        
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all text-sm sm:text-base"
        >
          I Feel Better Now 😌
        </button>
      </div>
    </div>
  );
};

export default EmotionRegulation;