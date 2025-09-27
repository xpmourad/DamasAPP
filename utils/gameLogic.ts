import { BoardState, PieceState, Player, Position } from '../types';

export const getInitialBoard = (): BoardState => {
    const board: BoardState = Array(8).fill(null).map(() => Array(8).fill(null));

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if ((row + col) % 2 !== 0) { // Dark squares
                if (row < 3) {
                    board[row][col] = { player: 'player2', type: 'pawn' };
                } else if (row > 4) {
                    board[row][col] = { player: 'player1', type: 'pawn' };
                }
            }
        }
    }
    return board;
};

const isWithinBounds = (row: number, col: number) => row >= 0 && row < 8 && col >= 0 && col < 8;

export const getJumpMovesForBoard = (board: BoardState, player: Player): { from: Position, to: Position }[] => {
    const jumps: { from: Position, to: Position }[] = [];
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = board[r][c];
            if (piece?.player === player) {
                const pieceJumps = getPieceJumps(board, { row: r, col: c });
                jumps.push(...pieceJumps.map(to => ({ from: { row: r, col: c }, to })));
            }
        }
    }
    return jumps;
}

const getPieceJumps = (board: BoardState, pos: Position): Position[] => {
    const piece = board[pos.row][pos.col];
    if (!piece) return [];
    const jumps: Position[] = [];
    const directions = piece.type === 'king'
        ? [[-1, -1], [-1, 1], [1, -1], [1, 1]]
        : piece.player === 'player1' ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];

    for (const [dr, dc] of directions) {
        const opponentRow = pos.row + dr;
        const opponentCol = pos.col + dc;
        const destRow = pos.row + dr * 2;
        const destCol = pos.col + dc * 2;

        if (isWithinBounds(destRow, destCol) && board[destRow][destCol] === null) {
            const opponentPiece = board[opponentRow][opponentCol];
            if (opponentPiece && opponentPiece.player !== piece.player) {
                jumps.push({ row: destRow, col: destCol });
            }
        }
    }
    return jumps;
};

export const getValidMovesForPiece = (board: BoardState, pos: Position, player: Player): Position[] => {
    const piece = board[pos.row][pos.col];
    if (!piece || piece.player !== player) return [];

    const allJumps = getJumpMovesForBoard(board, player);

    if (allJumps.length > 0) {
        return allJumps
            .filter(jump => jump.from.row === pos.row && jump.from.col === pos.col)
            .map(jump => jump.to);
    }

    // No jumps available on the board, calculate regular moves for the selected piece
    const moves: Position[] = [];
    const directions = piece.type === 'king'
        ? [[-1, -1], [-1, 1], [1, -1], [1, 1]]
        : piece.player === 'player1' ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];

    for (const [dr, dc] of directions) {
        const destRow = pos.row + dr;
        const destCol = pos.col + dc;

        if (isWithinBounds(destRow, destCol) && board[destRow][destCol] === null) {
            moves.push({ row: destRow, col: destCol });
        }
    }
    return moves;
};