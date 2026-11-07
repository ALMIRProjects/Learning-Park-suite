import React from 'react';
import { Heart, MessageSquare, Users, Star, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

const About: React.FC = () => {
  const { dispatch } = useApp();

  return (
    <div className="p-3 sm:p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg border-2 sm:border-4 border-blue-200">
        <div className="flex items-center">
          <button
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'home' })}
            className="mr-3 p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
          >
            <ArrowLeft size={20} className="text-blue-600" />
          </button>
          <div className="text-3xl sm:text-4xl mr-3 sm:mr-4">🌟</div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">About Learning Park</h2>
            <p className="text-sm sm:text-base text-gray-600">Empowering communication for everyone</p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg border-2 sm:border-4 border-purple-300">
        <div className="text-center">
          <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎠</div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Our Mission</h3>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Learning Park is designed specifically for young children with autism and individuals who face communication challenges. 
            We believe everyone deserves to express themselves, share their feelings, and connect with the world around them.
          </p>
        </div>
      </div>

      {/* Who We Help */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg border-2 sm:border-4 border-green-200">
        <div className="flex items-center mb-3 sm:mb-4">
          <Users className="text-green-500 mr-2 sm:mr-3" size={24} />
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Who We Help</h3>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 sm:p-4 border-2 border-blue-200">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3">🧩</span>
              <h4 className="font-bold text-gray-800 text-sm sm:text-base">Children with Autism</h4>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">
              Our app provides structured, visual communication tools that help autistic children express their needs, 
              emotions, and thoughts in a comfortable, predictable environment.
            </p>
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-3 sm:p-4 border-2 border-pink-200">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3">🗣️</span>
              <h4 className="font-bold text-gray-800 text-sm sm:text-base">Non-Speaking Individuals</h4>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">
              For those who cannot speak or have difficulty with verbal communication, our AAC (Augmentative and Alternative Communication) 
              board provides a voice through symbols and text-to-speech technology.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 sm:p-4 border-2 border-green-200">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3">👶</span>
              <h4 className="font-bold text-gray-800 text-sm sm:text-base">Young Learners</h4>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">
              Children who are developing their communication skills can use our app to practice expressing themselves, 
              learn life skills, and build confidence in social interactions.
            </p>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg border-2 sm:border-4 border-orange-200">
        <div className="flex items-center mb-3 sm:mb-4">
          <Star className="text-orange-500 mr-2 sm:mr-3" size={24} />
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">How We Help</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-3 sm:p-4 border-2 border-blue-200">
            <div className="text-2xl sm:text-3xl mb-2">💬</div>
            <h4 className="font-bold text-gray-800 text-sm sm:text-base mb-1">AAC Communication</h4>
            <p className="text-gray-600 text-xs sm:text-sm">
              Keyboard-style symbol board that creates intelligent sentences and speaks them aloud
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-100 to-red-100 rounded-xl p-3 sm:p-4 border-2 border-pink-200">
            <div className="text-2xl sm:text-3xl mb-2">❤️</div>
            <h4 className="font-bold text-gray-800 text-sm sm:text-base mb-1">Emotion Expression</h4>
            <p className="text-gray-600 text-xs sm:text-sm">
              Safe space to identify, express, and track emotions with coping strategies
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-xl p-3 sm:p-4 border-2 border-green-200">
            <div className="text-2xl sm:text-3xl mb-2">📚</div>
            <h4 className="font-bold text-gray-800 text-sm sm:text-base mb-1">Life Skills Learning</h4>
            <p className="text-gray-600 text-xs sm:text-sm">
              Step-by-step guidance for essential daily activities and social interactions
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-3 sm:p-4 border-2 border-purple-200">
            <div className="text-2xl sm:text-3xl mb-2">🧘</div>
            <h4 className="font-bold text-gray-800 text-sm sm:text-base mb-1">Mindfulness & Calm</h4>
            <p className="text-gray-600 text-xs sm:text-sm">
              Guided meditation and breathing exercises to promote emotional regulation
            </p>
          </div>
        </div>
      </div>

      {/* Impact Statement */}
      <div className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border-2 sm:border-4 border-yellow-300">
        <div className="text-center">
          <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🌈</div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">Making a Difference</h3>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
            Every child deserves to be heard and understood. Learning Park breaks down communication barriers, 
            builds confidence, and creates pathways for meaningful connections. We're not just an app – 
            we're a bridge to a more inclusive world where every voice matters.
          </p>
          <div className="bg-white/50 rounded-xl p-3 sm:p-4 border-2 border-yellow-400">
            <p className="text-gray-800 font-medium text-sm sm:text-base italic">
              "Communication is a human right. Technology should make it accessible to everyone."
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-4 sm:mt-6 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border-2 sm:border-4 border-blue-200">
        <div className="text-center">
          <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🚀</div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Start Your Journey</h3>
          <p className="text-gray-600 text-sm sm:text-base mb-4">
            Ready to explore all the amazing features Learning Park has to offer?
          </p>
          <button
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'home' })}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all text-sm sm:text-base"
          >
            Let's Get Started! ✨
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;