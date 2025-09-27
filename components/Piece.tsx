import React from 'react';
import { Player, PieceType } from '../types';

interface PieceProps {
    player: Player;
    type: PieceType;
    isSelected: boolean;
}

const CrownIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18 10.25a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 013 0v2.75a1.5 1.5 0 01-1.5 1.5zm-6.5-1.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-3 0v2.75a1.5 1.5 0 001.5 1.5zM6 10.25a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 013 0v2.75A1.5 1.5 0 016 10.25zM19.5 12h-15a1.5 1.5 0 00-1.5 1.5v6a1.5 1.5 0 001.5 1.5h15a1.5 1.5 0 001.5-1.5v-6a1.5 1.5 0 00-1.5-1.5z" />
    </svg>
);


export const Piece: React.FC<PieceProps> = ({ player, type, isSelected }) => {
    // White Marble for Player 1
    const player1Style = {
        background: 'radial-gradient(circle at 30% 30%, #ffffff, #dcdcdc 90%)',
        borderColor: '#a0a0a0',
        boxShadow: 'inset 0 3px 5px rgba(255,255,255,0.8), inset 0 -3px 5px rgba(0,0,0,0.3), 0 4px 6px rgba(0,0,0,0.4)'
    };
    
    // Black Marble for Player 2 (AI)
    const player2Style = {
        background: 'radial-gradient(circle at 30% 30%, #606060, #181818 90%)',
        borderColor: '#000000',
        boxShadow: 'inset 0 3px 5px rgba(255,255,255,0.2), inset 0 -3px 5px rgba(0,0,0,0.8), 0 4px 6px rgba(0,0,0,0.5)'
    };
    
    const pieceStyle = player === 'player1' ? player1Style : player2Style;
    
    const selectedStyle = isSelected ? {
        boxShadow: `${pieceStyle.boxShadow}, 0 0 15px 5px #ffd700` // Gold glow
    } : {};
    
    const kingColor = 'text-yellow-400';

    return (
        <div
            className={`w-10/12 h-10/12 rounded-full flex items-center justify-center border-2 shadow-lg transition-all duration-200 transform-gpu`}
            style={{ ...pieceStyle, ...selectedStyle }}
        >
            {type === 'king' && (
                <CrownIcon className={`w-3/5 h-3/5 opacity-90 drop-shadow-lg ${kingColor}`} />
            )}
        </div>
    );
};