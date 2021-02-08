import {User} from './user.model';

export class Game {
  cellValue: string[][];
  currentPlayer: string;

  constructor() {
    this.cellValue = [];
  }
}

export class GameDTO {
  id: string;
  row0: string[];
  row1: string[];
  row2: string[];
  xPlayer: User;
  oPlayer: User;
  winner: User;
  currentPlayer: string;
  gameFinished = false;
  gameStatus: GameStatus;
}

export enum GameStatus {
  WaitingForPLayer,
  Active,
  Won,
  Draw
}
