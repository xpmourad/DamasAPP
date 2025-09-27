import React from 'react';

interface GameOverScreenProps {
  message: string;
  onPlayAgain: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({ message, onPlayAgain }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fade-in">
      <div 
        className="border-2 border-amber-700 rounded-lg p-8 text-center shadow-2xl shadow-black/50"
        style={{ background: 'linear-gradient(145deg, #4a2c1a, #2a1a0e)' }}
      >
        <h2 className="text-4xl font-bold text-amber-300 mb-4 drop-shadow-lg">Game Over</h2>
        <p className="text-amber-100 text-lg mb-6">{message}</p>
        <button
          onClick={onPlayAgain}
          className="bg-gradient-to-b from-amber-400 to-amber-600 text-black font-bold py-2 px-6 rounded-md hover:from-amber-300 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-75 transition-all shadow-md hover:shadow-lg"
        >
          Play Again
        </button>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};