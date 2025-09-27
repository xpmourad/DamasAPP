import React from 'react';
import { PieceState } from '../types';
import { Piece } from './Piece';

interface SquareProps {
    row: number;
    col: number;
    piece: PieceState | null;
    onClick: () => void;
    isSelected: boolean;
    isValidMove: boolean;
}

export const Square: React.FC<SquareProps> = ({ row, col, piece, onClick, isSelected, isValidMove }) => {
    const isDark = (row + col) % 2 !== 0;
    const darkBg = 'bg-gradient-to-br from-[#6b4226] to-[#4d2e1a]';
    const lightBg = 'bg-gradient-to-br from-[#c89c6d] to-[#a07c56]';
    const bgColor = isDark ? darkBg : lightBg;
    const hoverBg = isDark ? 'hover:brightness-125' : 'hover:brightness-110';

    return (
        <div
            onClick={onClick}
            className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center relative cursor-pointer transition-all duration-150 ${bgColor} ${hoverBg}`}
            style={{ boxShadow: 'inset 0px 1px 3px rgba(0, 0, 0, 0.5)' }}
        >
            {piece && <Piece player={piece.player} type={piece.type} isSelected={isSelected} />}
            {isValidMove && (
                <div className="absolute w-full h-full bg-yellow-300/20" />
            )}
        </div>
    );
};