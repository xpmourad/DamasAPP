import React from 'react';
import { Player } from '../types';

interface GameInfoProps {
    player1Name: string;
    player2Name:string;
    currentPlayer: Player;
    winner: Player | null;
    capturedByPlayer1: number;
    capturedByPlayer2: number;
    isAiThinking: boolean;
}

const CapturedPieces: React.FC<{ count: number, playerName: string }> = ({ count, playerName }) => (
    <div className="flex flex-col items-center">
        <h3 className="text-sm text-amber-300/80">{playerName} Captured</h3>
        <p className="text-2xl font-bold text-amber-100">{count}</p>
    </div>
);


export const GameInfo: React.FC<GameInfoProps> = ({ player1Name, player2Name, currentPlayer, winner, capturedByPlayer1, capturedByPlayer2, isAiThinking }) => {
    
    let turnText = "Game Over";
    if (!winner) {
        if (isAiThinking) {
            turnText = "Robot is thinking...";
        } else {
            turnText = `${currentPlayer === 'player1' ? player1Name : player2Name}'s Turn`;
        }
    }

    return (
        <div 
            className="bg-stone-900/50 border border-amber-800/80 p-4 rounded-lg w-full max-w-xs lg:max-w-none lg:w-64 text-center shadow-lg"
            style={{ backdropFilter: 'blur(5px)', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)' }}
        >
            <h2 className="text-xl font-bold text-amber-300 mb-4 h-7 drop-shadow-md">
                {turnText}
            </h2>
            <div className="flex justify-around items-center">
                <CapturedPieces count={capturedByPlayer2} playerName={player1Name} />
                <div className="h-10 w-px bg-amber-600/50"></div>
                <CapturedPieces count={capturedByPlayer1} playerName={player2Name} />
            </div>
        </div>
    );
};