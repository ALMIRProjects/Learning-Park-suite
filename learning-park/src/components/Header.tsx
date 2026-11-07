import React from 'react';
import { useApp } from '../context/AppContext';

const Header: React.FC = () => {
  const { state } = useApp();

  return (
    <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white p-3 sm:p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="text-2xl sm:text-3xl">🎡</div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold">Learning Park</h1>
            <p className="text-xs sm:text-sm opacity-90">Hello, {state.user.name}! 🌟</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-1 bg-white/20 rounded-full px-2 sm:px-3 py-1 sm:py-2">
            {state.user.badges.slice(0, 3).map((badge, index) => (
              <span key={index} className="text-sm sm:text-lg">{badge}</span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;