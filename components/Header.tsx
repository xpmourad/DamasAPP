import React from 'react';

export const Header: React.FC = () => (
  <header className="mb-4 text-center">
    <h1 
      className="text-5xl md:text-6xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-b from-yellow-200 to-amber-500"
      style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 215, 0, 0.3)' }}
    >
      GEMINI DAMAS
    </h1>
  </header>
);