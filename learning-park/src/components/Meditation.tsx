import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Headphones, Star, Volume2 } from 'lucide-react';

const Meditation: React.FC = () => {
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [sessionComplete, setSessionComplete] = useState(false);

  const sessions = [
    {
      id: '1',
      title: 'Mindful Breathing',
      duration: 240, // 4 minutes
      type: 'breathing',
      emoji: '🫁',
      description: 'Focus on your breath with guided prompts',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      id: '2',
      title: 'Body Scan',
      duration: 320, // 5.3 minutes
      type: 'body-scan',
      emoji: '🧘',
      description: 'Relax each part of your body step by step',
      color: 'from-green-400 to-emerald-600'
    },
    {
      id: '3',
      title: 'Gratitude Practice',
      duration: 280, // 4.7 minutes
      type: 'gratitude',
      emoji: '🙏',
      description: 'Think about things you are grateful for',
      color: 'from-purple-400 to-indigo-600'
    },
    {
      id: '4',
      title: 'Loving Kindness',
      duration: 300, // 5 minutes
      type: 'loving-kindness',
      emoji: '💝',
      description: 'Send kind thoughts to yourself and others',
      color: 'from-pink-400 to-rose-600'
    }
  ];

  const startSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(sessionId);
      setSessionComplete(false);
    }
  };

  const completeSession = () => {
    setSessionComplete(true);
  };

  if (currentSession) {
    const session = sessions.find(s => s.id === currentSession);
    if (!session) return null;

    if (sessionComplete) {
      return (
        <div className="p-3 sm:p-6 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen flex items-center justify-center">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border-2 sm:border-4 border-yellow-200 text-center max-w-md w-full mx-3">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎉</div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Amazing Job!</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              You completed your meditation session! You're building great mindfulness skills.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setCurrentSession(null)}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 sm:py-3 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all text-sm sm:text-base"
              >
                Choose Another ✨
              </button>
              <button
                onClick={() => {
                  setSessionComplete(false);
                }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-2 sm:py-3 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all text-sm sm:text-base"
              >
                Do Again 🔄
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Render specific meditation type
    switch (session.type) {
      case 'breathing':
        return <BreathingMeditation session={session} onComplete={completeSession} onBack={() => setCurrentSession(null)} />;
      case 'body-scan':
        return <BodyScanMeditation session={session} onComplete={completeSession} onBack={() => setCurrentSession(null)} />;
      case 'gratitude':
        return <GratitudeMeditation session={session} onComplete={completeSession} onBack={() => setCurrentSession(null)} />;
      case 'loving-kindness':
        return <LovingKindnessMeditation session={session} onComplete={completeSession} onBack={() => setCurrentSession(null)} />;
      default:
        return null;
    }
  }

  return (
    <div className="p-3 sm:p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg border-2 sm:border-4 border-indigo-200">
        <div className="flex items-center">
          <Headphones className="text-indigo-500 mr-3 sm:mr-4" size={32} />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Calm Time</h2>
            <p className="text-sm sm:text-base text-gray-600">Choose a peaceful meditation to relax</p>
          </div>
        </div>
      </div>

      {/* Meditation Sessions */}
      <div className="space-y-3 sm:space-y-4">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => startSession(session.id)}
            className={`w-full bg-gradient-to-r ${session.color} text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200`}
          >
            <div className="flex items-center">
              <div className="text-3xl sm:text-5xl mr-3 sm:mr-4">{session.emoji}</div>
              <div className="flex-1 text-left">
                <h3 className="text-lg sm:text-xl font-bold mb-1">{session.title}</h3>
                <p className="text-white/90 text-sm mb-1 sm:mb-2">{session.description}</p>
                <div className="flex items-center text-white/80">
                  <Star size={14} className="mr-1" />
                  <span className="text-xs sm:text-sm">{Math.round(session.duration / 60)} minutes</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="mt-4 sm:mt-6 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border-2 sm:border-4 border-purple-200">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">
          Why Meditation is Amazing! 🌟
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {[
            { emoji: '😌', text: 'Helps you feel calm' },
            { emoji: '🧠', text: 'Makes your mind stronger' },
            { emoji: '💤', text: 'Helps you sleep better' },
            { emoji: '❤️', text: 'Makes you feel happy' }
          ].map((benefit, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border-2 border-purple-200">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{benefit.emoji}</div>
              <p className="text-gray-700 text-xs sm:text-sm font-medium">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Text-to-speech utility function
const speakText = (text: string, options: { rate?: number; pitch?: number; volume?: number } = {}) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate || 0.9;
    utterance.pitch = options.pitch || 1.0;
    utterance.volume = options.volume || 1.0;
    window.speechSynthesis.speak(utterance);
  }
};

// Breathing Meditation Component
const BreathingMeditation: React.FC<{ session: any; onComplete: () => void; onBack: () => void }> = ({ session, onComplete, onBack }) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(4);
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);
  const totalCycles = 8;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      timer = setInterval(() => {
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
              setCycles(prev => prev + 1);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 800);
    }

    return () => clearInterval(timer);
  }, [isActive, phase]);

  useEffect(() => {
    if (cycles >= totalCycles) {
      setIsActive(false);
      onComplete();
    }
  }, [cycles, totalCycles, onComplete]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe in slowly through your nose';
      case 'hold': return 'Hold your breath gently';
      case 'exhale': return 'Breathe out slowly through your mouth';
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
    <div className={`p-3 sm:p-6 bg-gradient-to-br ${session.color} min-h-screen flex items-center justify-center`}>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border-2 sm:border-4 border-white/50 text-center max-w-md w-full mx-3">
        <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{session.emoji}</div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">{session.title}</h2>
        
        <div className={`w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br ${getPhaseColor()} flex items-center justify-center transform transition-all duration-800 ${
          phase === 'inhale' ? 'scale-110' : phase === 'hold' ? 'scale-100' : 'scale-90'
        }`}>
          <span className="text-white text-2xl sm:text-4xl font-bold">{count}</span>
        </div>
        
        <div className="flex items-center justify-center mb-2">
          <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mr-2">{getPhaseText()}</h3>
          <button
            onClick={() => speakText(getPhaseText(), { rate: 1.1, pitch: 1.0 })}
            className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <Volume2 size={16} className="text-blue-600" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Cycle {cycles + 1} of {totalCycles}</p>
        
        <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
          <button
            onClick={() => setIsActive(!isActive)}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all text-sm sm:text-base"
          >
            {isActive ? <Pause size={16} className="mx-auto" /> : <Play size={16} className="mx-auto" />}
          </button>
          
          <button
            onClick={() => {
              setCycles(0);
              setCount(4);
              setPhase('inhale');
              setIsActive(false);
            }}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all"
          >
            <RotateCcw size={16} />
          </button>
        </div>
        
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 font-medium text-sm sm:text-base"
        >
          Choose Different Session
        </button>
      </div>
    </div>
  );
};

// Body Scan Meditation Component
const BodyScanMeditation: React.FC<{ session: any; onComplete: () => void; onBack: () => void }> = ({ session, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const bodyParts = [
    { name: 'Toes', emoji: '🦶', instruction: 'Focus on your toes. Wiggle them gently, then relax.' },
    { name: 'Feet', emoji: '👣', instruction: 'Feel your feet. Notice how they feel against the ground.' },
    { name: 'Legs', emoji: '🦵', instruction: 'Relax your legs. Let them feel heavy and comfortable.' },
    { name: 'Stomach', emoji: '🤗', instruction: 'Place your hand on your stomach. Feel it rise and fall.' },
    { name: 'Arms', emoji: '💪', instruction: 'Let your arms rest by your sides. Feel them relax.' },
    { name: 'Shoulders', emoji: '🤷', instruction: 'Roll your shoulders back and let them drop down.' },
    { name: 'Face', emoji: '😌', instruction: 'Relax your face. Let your jaw drop slightly.' },
    { name: 'Whole Body', emoji: '🧘', instruction: 'Feel your whole body relaxed and peaceful.' }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && currentStep < bodyParts.length) {
      timer = setTimeout(() => {
        if (currentStep === bodyParts.length - 1) {
          onComplete();
        } else {
          setCurrentStep(prev => prev + 1);
        }
      }, 8000); // 8 seconds per step
    }

    return () => clearTimeout(timer);
  }, [isActive, currentStep, bodyParts.length, onComplete]);

  return (
    <div className={`p-3 sm:p-6 bg-gradient-to-br ${session.color} min-h-screen flex items-center justify-center`}>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border-2 sm:border-4 border-white/50 text-center max-w-md w-full mx-3">
        <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{session.emoji}</div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">{session.title}</h2>
        
        <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">{bodyParts[currentStep].emoji}</div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">{bodyParts[currentStep].name}</h3>
        
        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <p className="text-gray-600 text-sm sm:text-lg mr-2">{bodyParts[currentStep].instruction}</p>
          <button
            onClick={() => speakText(bodyParts[currentStep].instruction, { rate: 1.2, pitch: 1.0 })}
            className="p-2 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
          >
            <Volume2 size={16} className="text-green-600" />
          </button>
        </div>
        
        <div className="mb-4 sm:mb-6">
          <div className="bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${((currentStep + 1) / bodyParts.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs sm:text-sm text-gray-500">Step {currentStep + 1} of {bodyParts.length}</p>
        </div>
        
        <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
          <button
            onClick={() => setIsActive(!isActive)}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all text-sm sm:text-base"
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          
          <button
            onClick={() => {
              setCurrentStep(0);
              setIsActive(false);
            }}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all"
          >
            <RotateCcw size={16} />
          </button>
        </div>
        
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 font-medium text-sm sm:text-base"
        >
          Choose Different Session
        </button>
      </div>
    </div>
  );
};

// Gratitude Meditation Component
const GratitudeMeditation: React.FC<{ session: any; onComplete: () => void; onBack: () => void }> = ({ session, onComplete, onBack }) => {
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const prompts = [
    { text: 'Think of someone who makes you smile', emoji: '😊' },
    { text: 'Remember a fun time you had recently', emoji: '🎉' },
    { text: 'Think of something beautiful you saw today', emoji: '🌸' },
    { text: 'Remember someone who helped you', emoji: '🤝' },
    { text: 'Think of your favorite place to be', emoji: '🏡' },
    { text: 'Remember something that made you laugh', emoji: '😄' },
    { text: 'Think of something you learned recently', emoji: '📚' },
    { text: 'Feel grateful for all these wonderful things', emoji: '🙏' }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && currentPrompt < prompts.length) {
      timer = setTimeout(() => {
        if (currentPrompt === prompts.length - 1) {
          onComplete();
        } else {
          setCurrentPrompt(prev => prev + 1);
        }
      }, 8000); // 8 seconds per prompt
    }

    return () => clearTimeout(timer);
  }, [isActive, currentPrompt, prompts.length, onComplete]);

  return (
    <div className={`p-3 sm:p-6 bg-gradient-to-br ${session.color} min-h-screen flex items-center justify-center`}>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border-2 sm:border-4 border-white/50 text-center max-w-md w-full mx-3">
        <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{session.emoji}</div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">{session.title}</h2>
        
        <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">{prompts[currentPrompt].emoji}</div>
        
        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <p className="text-gray-700 text-sm sm:text-lg font-medium mr-2">{prompts[currentPrompt].text}</p>
          <button
            onClick={() => speakText(prompts[currentPrompt].text, { rate: 1.1, pitch: 1.1 })}
            className="p-2 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <Volume2 size={16} className="text-purple-600" />
          </button>
        </div>
        
        <div className="mb-4 sm:mb-6">
          <div className="bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${((currentPrompt + 1) / prompts.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs sm:text-sm text-gray-500">Reflection {currentPrompt + 1} of {prompts.length}</p>
        </div>
        
        <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
          <button
            onClick={() => setIsActive(!isActive)}
            className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all text-sm sm:text-base"
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          
          <button
            onClick={() => {
              setCurrentPrompt(0);
              setIsActive(false);
            }}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all"
          >
            <RotateCcw size={16} />
          </button>
        </div>
        
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 font-medium text-sm sm:text-base"
        >
          Choose Different Session
        </button>
      </div>
    </div>
  );
};

// Loving Kindness Meditation Component
const LovingKindnessMeditation: React.FC<{ session: any; onComplete: () => void; onBack: () => void }> = ({ session, onComplete, onBack }) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const phases = [
    { target: 'Yourself', emoji: '🤗', message: 'May I be happy and healthy' },
    { target: 'Someone you love', emoji: '❤️', message: 'May you be happy and healthy' },
    { target: 'A friend', emoji: '👫', message: 'May you be happy and healthy' },
    { target: 'Someone neutral', emoji: '🙂', message: 'May you be happy and healthy' },
    { target: 'Someone difficult', emoji: '🤝', message: 'May you be happy and healthy' },
    { target: 'All beings everywhere', emoji: '🌍', message: 'May all beings be happy and healthy' }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && currentPhase < phases.length) {
      timer = setTimeout(() => {
        if (currentPhase === phases.length - 1) {
          onComplete();
        } else {
          setCurrentPhase(prev => prev + 1);
        }
      }, 8000); // 8 seconds per phase
    }

    return () => clearTimeout(timer);
  }, [isActive, currentPhase, phases.length, onComplete]);

  const getFullInstruction = () => {
    return `Send kind thoughts to ${phases[currentPhase].target}. ${phases[currentPhase].message}`;
  };

  return (
    <div className={`p-3 sm:p-6 bg-gradient-to-br ${session.color} min-h-screen flex items-center justify-center`}>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border-2 sm:border-4 border-white/50 text-center max-w-md w-full mx-3">
        <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{session.emoji}</div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">{session.title}</h2>
        
        <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">{phases[currentPhase].emoji}</div>
        
        <div className="flex items-center justify-center mb-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mr-2">Send kind thoughts to:</h3>
          <button
            onClick={() => speakText(`Send kind thoughts to ${phases[currentPhase].target}`, { rate: 1.0, pitch: 1.2 })}
            className="p-2 bg-pink-100 rounded-lg hover:bg-pink-200 transition-colors"
          >
            <Volume2 size={16} className="text-pink-600" />
          </button>
        </div>
        
        <h4 className="text-base sm:text-lg font-medium text-gray-700 mb-3 sm:mb-4">{phases[currentPhase].target}</h4>
        
        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <p className="text-pink-600 text-sm sm:text-lg font-medium italic mr-2">"{phases[currentPhase].message}"</p>
          <button
            onClick={() => speakText(phases[currentPhase].message, { rate: 1.0, pitch: 1.2 })}
            className="p-2 bg-pink-100 rounded-lg hover:bg-pink-200 transition-colors"
          >
            <Volume2 size={16} className="text-pink-600" />
          </button>
        </div>
        
        <div className="mb-4 sm:mb-6">
          <div className="bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-pink-400 to-rose-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${((currentPhase + 1) / phases.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs sm:text-sm text-gray-500">Phase {currentPhase + 1} of {phases.length}</p>
        </div>
        
        <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
          <button
            onClick={() => setIsActive(!isActive)}
            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all text-sm sm:text-base"
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          
          <button
            onClick={() => {
              setCurrentPhase(0);
              setIsActive(false);
            }}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all"
          >
            <RotateCcw size={16} />
          </button>
        </div>
        
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 font-medium text-sm sm:text-base"
        >
          Choose Different Session
        </button>
      </div>
    </div>
  );
};

export default Meditation;