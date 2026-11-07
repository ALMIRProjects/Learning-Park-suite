import React, { useState, useEffect } from 'react';
import { Gamepad2, Star, Trophy, RotateCcw, Play, Pause, ExternalLink, ArrowLeft } from 'lucide-react';

const Minigames: React.FC = () => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [showExternalGame, setShowExternalGame] = useState(false);

  const games = [
    {
      id: 'memory',
      title: 'Memory Match',
      emoji: '🧠',
      description: 'Match pairs of colorful cards',
      color: 'from-blue-400 to-purple-600',
      difficulty: 'Easy'
    },
    {
      id: 'sorting',
      title: 'Color Sort',
      emoji: '🎨',
      description: 'Sort objects by color and shape',
      color: 'from-green-400 to-teal-600',
      difficulty: 'Easy'
    },
    {
      id: 'counting',
      title: 'Count & Click',
      emoji: '🔢',
      description: 'Count the objects and click the right number',
      color: 'from-orange-400 to-yellow-600',
      difficulty: 'Easy'
    },
    {
      id: 'external',
      title: 'Recall Royale',
      emoji: '🎯',
      description: 'Test your memory skills in this fun game',
      color: 'from-purple-400 to-pink-600',
      difficulty: 'Medium'
    }
  ];

  const renderGame = () => {
    switch (currentGame) {
      case 'memory':
        return <MemoryGame onBack={() => setCurrentGame(null)} />;
      case 'sorting':
        return <SortingGame onBack={() => setCurrentGame(null)} />;
      case 'counting':
        return <CountingGame onBack={() => setCurrentGame(null)} />;
      case 'external':
        return <ExternalGame onBack={() => setCurrentGame(null)} />;
      default:
        return null;
    }
  };

  if (currentGame) {
    return renderGame();
  }

  return (
    <div className="p-6 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 mb-6 shadow-lg border-4 border-cyan-200">
        <div className="flex items-center">
          <Gamepad2 className="text-cyan-500 mr-4" size={40} />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Fun Games</h2>
            <p className="text-gray-600">Play and learn with colorful games!</p>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 gap-4">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => setCurrentGame(game.id)}
            className={`w-full bg-gradient-to-r ${game.color} text-white rounded-3xl p-6 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200`}
          >
            <div className="flex items-center">
              <div className="text-5xl mr-4">{game.emoji}</div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold mb-1">{game.title}</h3>
                <p className="text-white/90 text-sm mb-2">{game.description}</p>
                <div className="flex items-center text-white/80">
                  <Star size={16} className="mr-1" />
                  <span className="text-sm">{game.difficulty}</span>
                </div>
              </div>
              {game.id === 'external' ? (
                <ExternalLink size={32} className="text-white/80" />
              ) : (
                <Play size={32} className="text-white/80" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="mt-6 bg-white rounded-3xl p-6 shadow-lg border-4 border-green-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Games Help You Learn! 🌟
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { emoji: '🧠', text: 'Improve memory' },
            { emoji: '👁️', text: 'Better focus' },
            { emoji: '🎯', text: 'Problem solving' },
            { emoji: '🎉', text: 'Have fun!' }
          ].map((benefit, index) => (
            <div key={index} className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-4 text-center border-2 border-green-200">
              <div className="text-3xl mb-2">{benefit.emoji}</div>
              <p className="text-gray-700 text-sm font-medium">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// External Game Component
const ExternalGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="relative h-screen bg-gray-900">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed bottom-4 left-4 z-50 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <ArrowLeft size={24} />
      </button>
      
      {/* External Game Iframe */}
      <iframe
        src="https://recallroyalebyalmir.netlify.app/"
        className="w-full h-full border-0"
        title="Recall Royale Game"
        allow="fullscreen"
      />
    </div>
  );
};

// Memory Match Game Component
const MemoryGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [cards, setCards] = useState<Array<{ id: number; emoji: string; flipped: boolean; matched: boolean }>>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const emojis = ['🐶', '🐱', '🐰', '🦊', '🐼', '🐸'];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameEmojis = emojis.slice(0, 6);
    const cardPairs = [...gameEmojis, ...gameEmojis];
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setScore(0);
    setGameComplete(false);
  };

  const flipCard = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (cards[cardId].flipped || cards[cardId].matched) return;

    const newCards = [...cards];
    newCards[cardId].flipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards;
      if (cards[first].emoji === cards[second].emoji) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[first].matched = true;
          matchedCards[second].matched = true;
          setCards(matchedCards);
          setScore(prev => prev + 10);
          setFlippedCards([]);

          // Check if game is complete
          if (matchedCards.every(card => card.matched)) {
            setGameComplete(true);
          }
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[first].flipped = false;
          resetCards[second].flipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-blue-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Memory Match 🧠</h2>
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-100 px-4 py-2 rounded-full">
              <span className="font-bold text-yellow-700">Score: {score}</span>
            </div>
            <button
              onClick={initializeGame}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        {gameComplete && (
          <div className="text-center mb-6 p-4 bg-green-100 rounded-2xl border-4 border-green-300">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-bold text-green-800">Congratulations!</h3>
            <p className="text-green-700">You matched all the pairs! Final Score: {score}</p>
          </div>
        )}

        <div className="grid grid-cols-4 gap-4 mb-6">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => flipCard(card.id)}
              className={`aspect-square rounded-2xl border-4 text-4xl font-bold transition-all duration-300 ${
                card.flipped || card.matched
                  ? 'bg-white border-blue-300 transform scale-105'
                  : 'bg-gradient-to-br from-blue-400 to-purple-500 border-blue-500 hover:scale-105'
              }`}
            >
              {card.flipped || card.matched ? card.emoji : '?'}
            </button>
          ))}
        </div>

        <button
          onClick={onBack}
          className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold py-3 rounded-2xl hover:shadow-lg transition-all"
        >
          Back to Games
        </button>
      </div>
    </div>
  );
};

// Sorting Game Component
const SortingGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [items, setItems] = useState<Array<{ id: number; color: string; shape: string; emoji: string; sorted: boolean }>>([]);
  const [targetColor, setTargetColor] = useState('');
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const shapes = [
    { color: 'red', emoji: '🔴', name: 'red' },
    { color: 'blue', emoji: '🔵', name: 'blue' },
    { color: 'green', emoji: '🟢', name: 'green' },
    { color: 'yellow', emoji: '🟡', name: 'yellow' }
  ];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameItems = [];
    for (let i = 0; i < 12; i++) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      gameItems.push({
        id: i,
        color: shape.name,
        shape: 'circle',
        emoji: shape.emoji,
        sorted: false
      });
    }
    setItems(gameItems);
    setTargetColor(shapes[Math.floor(Math.random() * shapes.length)].name);
    setScore(0);
    setGameComplete(false);
  };

  const sortItem = (itemId: number) => {
    const item = items.find(i => i.id === itemId);
    if (!item || item.sorted) return;

    const newItems = [...items];
    const itemIndex = newItems.findIndex(i => i.id === itemId);
    
    if (item.color === targetColor) {
      newItems[itemIndex].sorted = true;
      setItems(newItems);
      setScore(prev => prev + 10);

      // Check if all target color items are sorted
      const targetItems = newItems.filter(i => i.color === targetColor);
      const sortedTargetItems = targetItems.filter(i => i.sorted);
      
      if (sortedTargetItems.length === targetItems.length) {
        setTimeout(() => {
          const remainingColors = shapes.filter(s => 
            newItems.some(i => i.color === s.name && !i.sorted)
          );
          
          if (remainingColors.length > 0) {
            setTargetColor(remainingColors[Math.floor(Math.random() * remainingColors.length)].name);
          } else {
            setGameComplete(true);
          }
        }, 1000);
      }
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 min-h-screen">
      <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-green-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Color Sort 🎨</h2>
          <div className="bg-yellow-100 px-4 py-2 rounded-full">
            <span className="font-bold text-yellow-700">Score: {score}</span>
          </div>
        </div>

        {gameComplete ? (
          <div className="text-center mb-6 p-4 bg-green-100 rounded-2xl border-4 border-green-300">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-bold text-green-800">Amazing!</h3>
            <p className="text-green-700">You sorted all the colors! Final Score: {score}</p>
          </div>
        ) : (
          <div className="text-center mb-6 p-4 bg-blue-100 rounded-2xl border-4 border-blue-300">
            <h3 className="text-lg font-bold text-blue-800 mb-2">Find and tap all the:</h3>
            <div className="text-4xl">
              {shapes.find(s => s.name === targetColor)?.emoji} {targetColor.toUpperCase()} circles
            </div>
          </div>
        )}

        <div className="grid grid-cols-4 gap-3 mb-6">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => sortItem(item.id)}
              disabled={item.sorted}
              className={`aspect-square rounded-2xl border-4 text-4xl transition-all duration-200 ${
                item.sorted
                  ? 'bg-green-100 border-green-400 opacity-50'
                  : item.color === targetColor
                  ? 'bg-white border-blue-400 hover:scale-110 hover:shadow-lg'
                  : 'bg-gray-100 border-gray-300 hover:scale-105'
              }`}
            >
              {item.emoji}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={initializeGame}
            className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 rounded-2xl hover:shadow-lg transition-all"
          >
            New Game 🔄
          </button>
          <button
            onClick={onBack}
            className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold py-3 rounded-2xl hover:shadow-lg transition-all"
          >
            Back to Games
          </button>
        </div>
      </div>
    </div>
  );
};

// Counting Game Component
const CountingGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [objects, setObjects] = useState<string[]>([]);
  const [targetCount, setTargetCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const emojis = ['🍎', '🌟', '🎈', '🐶', '🌸', '🦋'];

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    const count = Math.floor(Math.random() * 8) + 1; // 1-8 objects
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const objectArray = Array(count).fill(emoji);
    
    setObjects(objectArray);
    setTargetCount(count);
    setSelectedAnswer(null);
    setFeedback('');
  };

  const checkAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    
    if (answer === targetCount) {
      setScore(prev => prev + 10);
      setFeedback('Correct! Great counting! 🎉');
      setTimeout(() => {
        generateNewQuestion();
      }, 2000);
    } else {
      setFeedback('Try again! Count carefully 😊');
      setTimeout(() => {
        setSelectedAnswer(null);
        setFeedback('');
      }, 1500);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 min-h-screen">
      <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-orange-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Count & Click 🔢</h2>
          <div className="bg-yellow-100 px-4 py-2 rounded-full">
            <span className="font-bold text-yellow-700">Score: {score}</span>
          </div>
        </div>

        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">How many do you see?</h3>
          
          <div className="bg-blue-50 rounded-2xl p-6 border-4 border-blue-200 mb-6">
            <div className="flex flex-wrap justify-center gap-3">
              {objects.map((emoji, index) => (
                <span key={index} className="text-4xl animate-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
                  {emoji}
                </span>
              ))}
            </div>
          </div>

          {feedback && (
            <div className={`p-4 rounded-2xl border-4 mb-4 ${
              feedback.includes('Correct') 
                ? 'bg-green-100 border-green-300 text-green-800' 
                : 'bg-yellow-100 border-yellow-300 text-yellow-800'
            }`}>
              <p className="font-bold text-lg">{feedback}</p>
            </div>
          )}

          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
              <button
                key={number}
                onClick={() => checkAnswer(number)}
                disabled={selectedAnswer !== null}
                className={`aspect-square rounded-2xl border-4 text-2xl font-bold transition-all duration-200 ${
                  selectedAnswer === number
                    ? selectedAnswer === targetCount
                      ? 'bg-green-400 border-green-600 text-white'
                      : 'bg-red-400 border-red-600 text-white'
                    : 'bg-white border-orange-300 hover:scale-110 hover:border-orange-500 hover:shadow-lg'
                } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={generateNewQuestion}
            className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 rounded-2xl hover:shadow-lg transition-all"
          >
            New Question 🔄
          </button>
          <button
            onClick={onBack}
            className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold py-3 rounded-2xl hover:shadow-lg transition-all"
          >
            Back to Games
          </button>
        </div>
      </div>
    </div>
  );
};

export default Minigames;