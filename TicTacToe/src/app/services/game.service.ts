/* tslint:disable:max-line-length */
import { Injectable } from '@angular/core';
import { Game } from 'src/app/models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  GameWon(game: Game): boolean {

    let win = false;

    for (let i = 0; i < 3; i++) {
      // Check for winning on row
      if ((game.cellValue[i][0] === game.cellValue[i][1]) && (game.cellValue[i][1] === game.cellValue[i][2]) && game.cellValue[i][0] !== '') {
        win = true;
      }
      // Check for winning on column
      else if ((game.cellValue[0][i] === game.cellValue[1][i]) && (game.cellValue[1][i] === game.cellValue[2][i]) && game.cellValue[0][i] !== '') {
        win = true;
      }
    }

    // Check for winning on diagonal
    if ((game.cellValue[0][0] === game.cellValue[1][1]) && (game.cellValue[1][1] === game.cellValue[2][2]) && game.cellValue[0][0] !== '') {
      win = true;
    }
    else if ((game.cellValue[0][2] === game.cellValue[1][1]) && (game.cellValue[1][1] === game.cellValue[2][0]) && game.cellValue[0][2] !== '') {
      win = true;
    }

    return win;
  }
}
