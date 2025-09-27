import { BoardState, Position } from '../types';
import { getJumpMovesForBoard, getValidMovesForPiece } from './gameLogic';

/**
 * A simple AI to choose a move for the specified player.
 * The AI prioritizes jump moves over regular moves.
 * @param board The current state of the game board.
 * @returns An object containing the 'from' and 'to' positions for the chosen move, or null if no moves are available.
 */
export const getAIMove = (board: BoardState): { from: Position; to: Position } | null => {
    const player = 'player2';

    // 1. AI must take a jump if available (forced jump rule)
    const allJumps = getJumpMovesForBoard(board, player);
    if (allJumps.length > 0) {
        // Pick a random jump from the available options
        const randomJump = allJumps[Math.floor(Math.random() * allJumps.length)];
        return randomJump;
    }

    // 2. If no jumps, find all possible regular moves
    const allMoves: { from: Position; to: Position }[] = [];
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = board[r][c];
            if (piece?.player === player) {
                // `getValidMovesForPiece` will return regular moves only if no jumps are on the board
                const moves = getValidMovesForPiece(board, { row: r, col: c }, player);
                moves.forEach(to => {
                    allMoves.push({ from: { row: r, col: c }, to });
                });
            }
        }
    }
    
    if (allMoves.length > 0) {
        // Pick a random regular move
        const randomMove = allMoves[Math.floor(Math.random() * allMoves.length)];
        return randomMove;
    }

    // 3. No moves are available for the AI
    return null;
};
