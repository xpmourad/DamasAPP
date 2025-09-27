import React from 'react';
import { BoardState, Position, Player } from '../types';
import { Square } from './Square';

interface BoardProps {
    board: BoardState;
    onSquareClick: (row: number, col: number) => void;
    selectedPiece: Position | null;
    validMoves: Position[];
    currentPlayer: Player;
}

export const Board: React.FC<BoardProps> = ({ board, onSquareClick, selectedPiece, validMoves }) => {
    return (
        <div 
            className="p-2 rounded-md shadow-2xl shadow-black/50"
            style={{
                background: 'linear-gradient(145deg, #4a2c1a, #2a1a0e)',
                boxShadow: 'inset 0 0 10px #000, 0 10px 20px -5px #000'
            }}
        >
            <div className="grid grid-cols-8">
                {board.map((row, rowIndex) =>
                    row.map((piece, colIndex) => {
                        const isSelected = selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex;
                        const isValidMove = validMoves.some(move => move.row === rowIndex && move.col === colIndex);
                        
                        return (
                            <Square
                                key={`${rowIndex}-${colIndex}`}
                                row={rowIndex}
                                col={colIndex}
                                piece={piece}
                                onClick={() => onSquareClick(rowIndex, colIndex)}
                                isSelected={isSelected}
                                isValidMove={isValidMove}
                            />
                        )
                    })
                )}
            </div>
        </div>
    );
};