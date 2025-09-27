
import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex items-center my-2">
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-400"></div>
    <p className="text-green-500 italic ml-3">The dungeon master is thinking...</p>
  </div>
);
