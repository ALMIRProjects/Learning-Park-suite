import React, { useState } from 'react';
import { User, Sparkles } from 'lucide-react';

interface NameInputProps {
  onNameSubmit: (name: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ onNameSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('learningParkUserName', name.trim());
      onNameSubmit(name.trim());
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-400 flex items-center justify-center p-4">
    

      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-white/50 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🎡</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Welcome to Learning Park!</h1>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">Let's get to know you better!</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What's your name?"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-purple-500 focus:outline-none text-lg"
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Sparkles size={20} className="mr-2" />
            Let's Start Learning!
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameInput;