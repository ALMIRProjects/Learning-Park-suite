import React, { useState } from 'react';
import { MessageSquare, Volume2, Trash2, Save, Copy } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AACBoard: React.FC = () => {
  const { state } = useApp();
  const [sentence, setSentence] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('basic');
  const [savedSentences, setSavedSentences] = useState<string[]>([]);
  const [showSavedSentences, setShowSavedSentences] = useState(false);

  const categories = [
    { id: 'basic', label: 'Basic', color: 'bg-blue-500' },
    { id: 'emotions', label: 'Emotions', color: 'bg-pink-500' },
    { id: 'actions', label: 'Actions', color: 'bg-green-500' },
    { id: 'objects', label: 'Objects', color: 'bg-purple-500' },
    { id: 'people', label: 'People', color: 'bg-orange-500' },
    { id: 'places', label: 'Places', color: 'bg-cyan-500' }
  ];

  // Enhanced symbol set with more categories and intelligent sentence formation
  const allSymbols = [
    // Basic
    { id: 'help', text: 'help', symbol: '🙋‍♀️', category: 'basic', sentenceType: 'need' },
    { id: 'please', text: 'please', symbol: '🙏', category: 'basic', sentenceType: 'polite' },
    { id: 'thank-you', text: 'thank you', symbol: '💝', category: 'basic', sentenceType: 'polite' },
    { id: 'yes', text: 'yes', symbol: '✅', category: 'basic', sentenceType: 'response' },
    { id: 'no', text: 'no', symbol: '❌', category: 'basic', sentenceType: 'response' },
    { id: 'stop', text: 'stop', symbol: '🛑', category: 'basic', sentenceType: 'command' },
    { id: 'go', text: 'go', symbol: '➡️', category: 'basic', sentenceType: 'want' },
    { id: 'more', text: 'more', symbol: '➕', category: 'basic', sentenceType: 'want' },
    { id: 'finished', text: 'finished', symbol: '✔️', category: 'basic', sentenceType: 'state' },
    { id: 'wait', text: 'wait', symbol: '⏳', category: 'basic', sentenceType: 'command' },
    { id: 'come', text: 'come', symbol: '👋', category: 'basic', sentenceType: 'command' },
    { id: 'look', text: 'look', symbol: '👀', category: 'basic', sentenceType: 'command' },

    // Emotions
    { id: 'happy', text: 'happy', symbol: '😊', category: 'emotions', sentenceType: 'feeling' },
    { id: 'sad', text: 'sad', symbol: '😢', category: 'emotions', sentenceType: 'feeling' },
    { id: 'angry', text: 'angry', symbol: '😠', category: 'emotions', sentenceType: 'feeling' },
    { id: 'excited', text: 'excited', symbol: '🤩', category: 'emotions', sentenceType: 'feeling' },
    { id: 'tired', text: 'tired', symbol: '😴', category: 'emotions', sentenceType: 'feeling' },
    { id: 'scared', text: 'scared', symbol: '😨', category: 'emotions', sentenceType: 'feeling' },
    { id: 'confused', text: 'confused', symbol: '😕', category: 'emotions', sentenceType: 'feeling' },
    { id: 'proud', text: 'proud', symbol: '😌', category: 'emotions', sentenceType: 'feeling' },
    { id: 'worried', text: 'worried', symbol: '😰', category: 'emotions', sentenceType: 'feeling' },
    { id: 'calm', text: 'calm', symbol: '😌', category: 'emotions', sentenceType: 'feeling' },
    { id: 'surprised', text: 'surprised', symbol: '😲', category: 'emotions', sentenceType: 'feeling' },
    { id: 'frustrated', text: 'frustrated', symbol: '😤', category: 'emotions', sentenceType: 'feeling' },

    // Actions
    { id: 'eat', text: 'eat', symbol: '🍽️', category: 'actions', sentenceType: 'want' },
    { id: 'drink', text: 'drink', symbol: '🥤', category: 'actions', sentenceType: 'want' },
    { id: 'play', text: 'play', symbol: '🎮', category: 'actions', sentenceType: 'want' },
    { id: 'sleep', text: 'sleep', symbol: '🛏️', category: 'actions', sentenceType: 'want' },
    { id: 'walk', text: 'walk', symbol: '🚶', category: 'actions', sentenceType: 'want' },
    { id: 'sit', text: 'sit', symbol: '🪑', category: 'actions', sentenceType: 'want' },
    { id: 'read', text: 'read', symbol: '📖', category: 'actions', sentenceType: 'want' },
    { id: 'watch', text: 'watch', symbol: '📺', category: 'actions', sentenceType: 'want' },
    { id: 'listen', text: 'listen', symbol: '👂', category: 'actions', sentenceType: 'want' },
    { id: 'talk', text: 'talk', symbol: '💬', category: 'actions', sentenceType: 'want' },
    { id: 'work', text: 'work', symbol: '💼', category: 'actions', sentenceType: 'want' },
    { id: 'learn', text: 'learn', symbol: '📚', category: 'actions', sentenceType: 'want' },

    // Objects
    { id: 'water', text: 'water', symbol: '💧', category: 'objects', sentenceType: 'want' },
    { id: 'food', text: 'food', symbol: '🍎', category: 'objects', sentenceType: 'want' },
    { id: 'book', text: 'book', symbol: '📚', category: 'objects', sentenceType: 'want' },
    { id: 'toy', text: 'toy', symbol: '🧸', category: 'objects', sentenceType: 'want' },
    { id: 'phone', text: 'phone', symbol: '📱', category: 'objects', sentenceType: 'want' },
    { id: 'computer', text: 'computer', symbol: '💻', category: 'objects', sentenceType: 'want' },
    { id: 'music', text: 'music', symbol: '🎵', category: 'objects', sentenceType: 'want' },
    { id: 'movie', text: 'movie', symbol: '🎬', category: 'objects', sentenceType: 'want' },
    { id: 'game', text: 'game', symbol: '🎲', category: 'objects', sentenceType: 'want' },
    { id: 'clothes', text: 'clothes', symbol: '👕', category: 'objects', sentenceType: 'want' },
    { id: 'shoes', text: 'shoes', symbol: '👟', category: 'objects', sentenceType: 'want' },
    { id: 'medicine', text: 'medicine', symbol: '💊', category: 'objects', sentenceType: 'need' },

    // People
    { id: 'mom', text: 'mom', symbol: '👩', category: 'people', sentenceType: 'want' },
    { id: 'dad', text: 'dad', symbol: '👨', category: 'people', sentenceType: 'want' },
    { id: 'teacher', text: 'teacher', symbol: '👩‍🏫', category: 'people', sentenceType: 'want' },
    { id: 'friend', text: 'friend', symbol: '👫', category: 'people', sentenceType: 'want' },
    { id: 'doctor', text: 'doctor', symbol: '👩‍⚕️', category: 'people', sentenceType: 'want' },
    { id: 'family', text: 'family', symbol: '👨‍👩‍👧‍👦', category: 'people', sentenceType: 'want' },

    // Places
    { id: 'home', text: 'home', symbol: '🏠', category: 'places', sentenceType: 'want-to-go' },
    { id: 'school', text: 'school', symbol: '🏫', category: 'places', sentenceType: 'want-to-go' },
    { id: 'bathroom', text: 'bathroom', symbol: '🚽', category: 'places', sentenceType: 'want-to-go' },
    { id: 'kitchen', text: 'kitchen', symbol: '🍳', category: 'places', sentenceType: 'want-to-go' },
    { id: 'bedroom', text: 'bedroom', symbol: '🛏️', category: 'places', sentenceType: 'want-to-go' },
    { id: 'park', text: 'park', symbol: '🌳', category: 'places', sentenceType: 'want-to-go' },
    { id: 'store', text: 'store', symbol: '🏪', category: 'places', sentenceType: 'want-to-go' },
    { id: 'hospital', text: 'hospital', symbol: '🏥', category: 'places', sentenceType: 'want-to-go' }
  ];

  const filteredSymbols = allSymbols.filter(symbol => symbol.category === selectedCategory);

  const formIntelligentSentence = (text: string, sentenceType: string) => {
    switch (sentenceType) {
      case 'feeling':
        return `I am ${text}`;
      case 'want':
        return `I want ${text}`;
      case 'want-to-go':
        return `I want to go to ${text}`;
      case 'need':
        return `I need ${text}`;
      case 'command':
        return `Please ${text}`;
      case 'response':
        return text;
      case 'polite':
        return text;
      case 'state':
        return `I am ${text}`;
      default:
        return `I ${text}`;
    }
  };

  const addToSentence = (text: string, symbol: string, sentenceType: string) => {
    const intelligentSentence = formIntelligentSentence(text, sentenceType);
    setSentence(prev => [...prev, `${symbol} ${intelligentSentence}`]);
  };

  const speakSentence = () => {
    const text = sentence.map(item => item.split(' ').slice(1).join(' ')).join('. ');
    if ('speechSynthesis' in window && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Determine voice characteristics based on emotion
      const emotionWords = sentence.map(item => item.split(' ').slice(1).join(' ').toLowerCase());
      
      if (emotionWords.some(word => word.includes('happy') || word.includes('excited'))) {
        utterance.rate = 1.1;
        utterance.pitch = 1.3;
        utterance.volume = 1.0;
      } else if (emotionWords.some(word => word.includes('sad') || word.includes('tired'))) {
        utterance.rate = 0.7;
        utterance.pitch = 0.8;
        utterance.volume = 0.8;
      } else if (emotionWords.some(word => word.includes('angry') || word.includes('frustrated'))) {
        utterance.rate = 1.0;
        utterance.pitch = 0.9;
        utterance.volume = 1.0;
      } else {
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const clearSentence = () => {
    setSentence([]);
  };

  const saveSentence = () => {
    const text = sentence.map(item => item.split(' ').slice(1).join(' ')).join('. ');
    if (text && !savedSentences.includes(text)) {
      setSavedSentences(prev => [...prev, text]);
    }
  };

  const copyToClipboard = () => {
    const text = sentence.map(item => item.split(' ').slice(1).join(' ')).join('. ');
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-2 sm:p-4 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 shadow-lg border border-green-200">
        <div className="flex items-center">
          <MessageSquare className="text-green-500 mr-2 sm:mr-3" size={24} />
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Talk Board</h2>
            <p className="text-xs sm:text-sm text-gray-600">Tap keys to build sentences!</p>
          </div>
        </div>
      </div>

      {/* Sentence Display */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 shadow-lg border border-blue-200">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <h3 className="text-sm sm:text-base font-bold text-gray-800">My Message</h3>
          
          <div className="flex gap-1 sm:gap-2">
            <button
              onClick={() => setShowSavedSentences(!showSavedSentences)}
              className="p-1.5 sm:p-2 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors"
            >
              <Save size={14} className="text-yellow-600" />
            </button>
            
            <button
              onClick={copyToClipboard}
              className="p-1.5 sm:p-2 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
            >
              <Copy size={14} className="text-green-600" />
            </button>
          </div>
        </div>
        
        <div className="min-h-[50px] sm:min-h-[60px] bg-gray-50 rounded-lg sm:rounded-xl p-2 sm:p-3 mb-2 sm:mb-3 border border-gray-200">
          {sentence.length > 0 ? (
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {sentence.map((item, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-800 px-2 py-1 rounded-lg border border-blue-300 text-xs sm:text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center text-xs sm:text-sm">Tap keys to build your message!</p>
          )}
        </div>

        <div className="flex gap-1 sm:gap-2">
          <button
            onClick={speakSentence}
            disabled={sentence.length === 0}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-2 px-2 sm:px-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center justify-center text-xs sm:text-sm"
          >
            <Volume2 size={14} className="mr-1" />
            Say It
          </button>
          
          <button
            onClick={saveSentence}
            disabled={sentence.length === 0}
            className="bg-yellow-500 text-white font-bold py-2 px-2 sm:px-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 text-xs sm:text-sm"
          >
            <Save size={14} />
          </button>
          
          <button
            onClick={clearSentence}
            className="bg-red-500 text-white font-bold py-2 px-2 sm:px-3 rounded-lg hover:shadow-lg transition-all text-xs sm:text-sm"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Saved Sentences */}
      {showSavedSentences && savedSentences.length > 0 && (
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 shadow-lg border border-yellow-200">
          <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-2 sm:mb-3">Saved Messages</h3>
          <div className="space-y-1 sm:space-y-2">
            {savedSentences.map((saved, index) => (
              <button
                key={index}
                onClick={() => setSentence([`💾 ${saved}`])}
                className="w-full text-left p-2 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-colors text-xs sm:text-sm"
              >
                {saved}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category Tabs - Keyboard Style */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 mb-3 sm:mb-4 shadow-lg border border-purple-200">
        <div className="flex gap-1 overflow-x-auto pb-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-medium whitespace-nowrap transition-all text-xs sm:text-sm border-2 ${
                selectedCategory === category.id
                  ? `${category.color} text-white shadow-lg border-transparent`
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard Grid */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-lg border border-gray-200">
        <div className="grid grid-cols-6 sm:grid-cols-8 gap-1 sm:gap-2">
          {filteredSymbols.map((symbol) => (
            <button
              key={symbol.id}
              onClick={() => addToSentence(symbol.text, symbol.symbol, symbol.sentenceType)}
              className="bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 border-2 border-gray-200 hover:border-blue-300 rounded-lg p-2 sm:p-3 hover:shadow-md hover:scale-105 transition-all duration-200 aspect-square flex flex-col items-center justify-center group"
            >
              <div className="text-lg sm:text-2xl mb-0.5 sm:mb-1 group-hover:scale-110 transition-transform">{symbol.symbol}</div>
              <div className="font-medium text-gray-800 text-[8px] sm:text-xs text-center leading-tight">{symbol.text}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Phrases */}
      <div className="mt-3 sm:mt-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border border-yellow-200">
        <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-2 sm:mb-3">Quick Phrases</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { text: "I need help", symbol: "🙋‍♀️", type: "need" },
            { text: "I'm hungry", symbol: "🍽️", type: "feeling" },
            { text: "I want to play", symbol: "🎮", type: "want" },
            { text: "I need a break", symbol: "😴", type: "need" }
          ].map((quick, index) => (
            <button
              key={index}
              onClick={() => setSentence([`${quick.symbol} ${quick.text}`])}
              className="bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-300 rounded-lg p-2 sm:p-3 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <div className="text-lg sm:text-xl mb-1">{quick.symbol}</div>
              <div className="font-bold text-gray-800 text-xs sm:text-sm">{quick.text}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AACBoard;