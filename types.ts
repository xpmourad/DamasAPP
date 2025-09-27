export type Player = 'player1' | 'player2';
export type PieceType = 'pawn' | 'king';

export interface PieceState {
  player: Player;
  type: PieceType;
}

export type SquareState = PieceState | null;

export type BoardState = SquareState[][];

export interface Position {
  row: number;
  col: number;
}

export type GameMode = 'pvp' | 'pva';

// Fix: Add missing types for the text adventure game part of the code.
export enum HistoryItemType {
  PLAYER,
  NARRATOR,
  SCENE,
  ERROR,
}

export interface HistoryItem {
  type: HistoryItemType;
  content: string;
}

export interface GameState {
  description: string;
  exits: Record<string, string>;
  items: string[];
  inventory: string[];
  narratorResponse: string;
  isGameOver: boolean;
  gameMessage: string;
}
