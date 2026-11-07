import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './components/Home';
import VisualSchedule from './components/VisualSchedule';
import EmotionRegulation from './components/EmotionRegulation';
import AACBoard from './components/AACBoard';
import Meditation from './components/Meditation';
import Learning from './components/Learning';
import Minigames from './components/Minigames';
import Goals from './components/Goals';
import Profile from './components/Profile';
import About from './components/About';
import NameInput from './components/NameInput';
import { useApp } from './context/AppContext';

const AppContent: React.FC = () => {
  const { state, dispatch } = useApp();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const savedName = localStorage.getItem('learningParkUserName');
    if (savedName) {
      setUserName(savedName);
      dispatch({ type: 'SET_USER_NAME', payload: savedName });
    }
  }, [dispatch]);

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    dispatch({ type: 'SET_USER_NAME', payload: name });
  };

  if (!userName) {
    return <NameInput onNameSubmit={handleNameSubmit} />;
  }

  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'home':
        return <Home />;
      case 'schedule':
        return <VisualSchedule />;
      case 'emotions':
        return <EmotionRegulation />;
      case 'aac':
        return <AACBoard />;
      case 'meditation':
        return <Meditation />;
      case 'learning':
        return <Learning />;
      case 'minigames':
        return <Minigames />;
      case 'goals':
        return <Goals />;
      case 'profile':
        return <Profile />;
      case 'about':
        return <About />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto">
        {renderCurrentView()}
      </main>
      <Navigation />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;