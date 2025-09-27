import React, { useState, useEffect, useCallback } from 'react';
import { BoardState, Player, Position, GameMode } from './types';
import { getInitialBoard, getJumpMovesForBoard, getValidMovesForPiece } from './utils/gameLogic';
import { getAIMove } from './utils/aiLogic';
import { Board } from './components/Board';
import { GameInfo } from './components/GameInfo';
import { GameOverScreen } from './components/GameOverScreen';
import { Header } from './components/Header';

const App: React.FC = () => {
    const [board, setBoard] = useState<BoardState>(getInitialBoard());
    const [currentPlayer, setCurrentPlayer] = useState<Player>('player1');
    const [selectedPiece, setSelectedPiece] = useState<Position | null>(null);
    const [validMoves, setValidMoves] = useState<Position[]>([]);
    const [winner, setWinner] = useState<Player | null>(null);
    const [capturedByPlayer1, setCapturedByPlayer1] = useState(0);
    const [capturedByPlayer2, setCapturedByPlayer2] = useState(0);
    const [isMultiJump, setIsMultiJump] = useState<Position | null>(null);
    const [gameMode] = useState<GameMode>('pva'); // pva: Player vs AI
    const [isAiThinking, setIsAiThinking] = useState(false);

    const resetGame = useCallback(() => {
        setBoard(getInitialBoard());
        setCurrentPlayer('player1');
        setSelectedPiece(null);
        setValidMoves([]);
        setWinner(null);
        setCapturedByPlayer1(0);
        setCapturedByPlayer2(0);
        setIsMultiJump(null);
        setIsAiThinking(false);
    }, []);

    const checkForWinner = useCallback((currentBoard: BoardState) => {
        let player1Pieces = 0;
        let player2Pieces = 0;
        let player1Moves = 0;
        let player2Moves = 0;

        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = currentBoard[r][c];
                if (piece) {
                    if (piece.player === 'player1') {
                        player1Pieces++;
                        if (getValidMovesForPiece(currentBoard, { row: r, col: c }, 'player1').length > 0) {
                            player1Moves++;
                        }
                    } else {
                        player2Pieces++;
                        if (getValidMovesForPiece(currentBoard, { row: r, col: c }, 'player2').length > 0) {
                            player2Moves++;
                        }
                    }
                }
            }
        }
        if (player1Pieces === 0 || player1Moves === 0) setWinner('player2');
        if (player2Pieces === 0 || player2Moves === 0) setWinner('player1');
    }, []);
    
    // AI Turn Logic
    useEffect(() => {
        if (gameMode === 'pva' && currentPlayer === 'player2' && !winner) {
            setIsAiThinking(true);
            const timer = setTimeout(() => {
                const aiMove = getAIMove(board);
                if (aiMove) {
                    movePiece(aiMove.from, aiMove.to);
                }
                setIsAiThinking(false);
            }, 1200); // AI "thinking" time

            return () => clearTimeout(timer);
        }
    }, [currentPlayer, winner, gameMode, board]);

    const handleSquareClick = (row: number, col: number) => {
        if (winner || (gameMode === 'pva' && currentPlayer === 'player2') || isAiThinking) return;

        if (isMultiJump) {
            const isMoveValid = validMoves.some(move => move.row === row && move.col === col);
            if (isMoveValid) {
                movePiece(isMultiJump, { row, col });
            }
            return;
        }

        if (selectedPiece) {
            const isMoveValid = validMoves.some(move => move.row === row && move.col === col);
            if (isMoveValid) {
                movePiece(selectedPiece, { row, col });
            } else {
                setSelectedPiece(null);
                setValidMoves([]);
            }
        } else {
            const piece = board[row][col];
            if (piece && piece.player === currentPlayer) {
                const moves = getValidMovesForPiece(board, { row, col }, currentPlayer);
                setSelectedPiece({ row, col });
                setValidMoves(moves);
            }
        }
    };

    const movePiece = (from: Position, to: Position) => {
        const newBoard = board.map(r => [...r]);
        const piece = newBoard[from.row][from.col];
        if (!piece) return;

        newBoard[to.row][to.col] = piece;
        newBoard[from.row][from.col] = null;

        const isJump = Math.abs(from.row - to.row) === 2;
        if (isJump) {
            const capturedRow = (from.row + to.row) / 2;
            const capturedCol = (from.col + to.col) / 2;
            newBoard[capturedRow][capturedCol] = null;

            if (currentPlayer === 'player1') {
                setCapturedByPlayer2(prev => prev + 1);
            } else {
                setCapturedByPlayer1(prev => prev + 1);
            }
        }
        
        if ((piece.player === 'player1' && to.row === 0) || (piece.player === 'player2' && to.row === 7)) {
            piece.type = 'king';
        }

        setBoard(newBoard);
        setSelectedPiece(null);
        setValidMoves([]);

        if (isJump) {
            const furtherJumps = getJumpMovesForBoard(newBoard, currentPlayer).filter(
                move => move.from.row === to.row && move.from.col === to.col
            );
            if (furtherJumps.length > 0) {
                setIsMultiJump(to);
                setSelectedPiece(to);
                setValidMoves(furtherJumps.map(j => j.to));
                return; 
            }
        }

        setIsMultiJump(null);
        setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
        checkForWinner(newBoard);
    };
    
    useEffect(() => {
        if(!winner) {
            checkForWinner(board);
        }
    }, [currentPlayer, board, winner, checkForWinner]);

    const player1Name = gameMode === 'pva' ? 'You' : 'Player 1 (White)';
    const player2Name = gameMode === 'pva' ? 'Robot' : 'Player 2 (Blue)';

    return (
        <div className="text-amber-100 min-h-screen flex flex-col items-center justify-center p-4 selection:bg-amber-800 selection:text-amber-100">
            <Header />
            <main className={`flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-6xl mx-auto transition-opacity duration-300 ${isAiThinking ? 'opacity-80' : 'opacity-100'}`}>
                 <GameInfo
                    player1Name={player1Name}
                    player2Name={player2Name}
                    currentPlayer={currentPlayer}
                    winner={winner}
                    capturedByPlayer1={capturedByPlayer1}
                    capturedByPlayer2={capturedByPlayer2}
                    isAiThinking={isAiThinking}
                />
                <div className={isAiThinking ? 'pointer-events-none' : ''}>
                    <Board
                        board={board}
                        onSquareClick={handleSquareClick}
                        selectedPiece={selectedPiece}
                        validMoves={validMoves}
                        currentPlayer={currentPlayer}
                    />
                </div>
            </main>
            {winner && (
                 <GameOverScreen 
                    message={`${winner === 'player1' ? player1Name : player2Name} wins!`} 
                    onPlayAgain={resetGame} 
                />
            )}
        </div>
    );
};

export default App;