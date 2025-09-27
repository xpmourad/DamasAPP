
import React from 'react';
import { HistoryItem, HistoryItemType } from '../types';

interface HistoryDisplayProps {
  history: HistoryItem[];
}

export const HistoryDisplay: React.FC<HistoryDisplayProps> = ({ history }) => {
  return (
    <div>
      {history.map((item, index) => {
        switch (item.type) {
          case HistoryItemType.PLAYER:
            return (
              <div key={index} className="flex items-center">
                <span className="text-green-600 mr-2">&gt;</span>
                <p className="text-green-200">{item.content}</p>
              </div>
            );
          case HistoryItemType.NARRATOR:
            return <p key={index} className="my-2 text-green-400 italic">{item.content}</p>;
          case HistoryItemType.SCENE:
            return <p key={index} className="my-3 text-cyan-300">{item.content}</p>;
          case HistoryItemType.ERROR:
            return <p key={index} className="my-2 text-red-500 font-bold">{item.content}</p>;
          default:
            return null;
        }
      })}
    </div>
  );
};
