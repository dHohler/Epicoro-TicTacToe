import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Game, GameDTO} from '../../models/game.model';
import {MultiplayerService} from '../../services/multiplayer.service';
import {GameService} from '../../services/game.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  user: User;
  gameId: string;
  game = new Game();
  gamedto = new GameDTO();
  gameBoard = [0, 1, 2];
  playerRole: string;
  finished = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private multiPlayerService: MultiplayerService,
    private gameService: GameService,
    private route: ActivatedRoute) {
    if (this.route.snapshot.params.id) {
      this.gameId = this.route.snapshot.paramMap.get('id');
    }
  }

  ngOnInit(): void {
    this.user = this.userService.checkLocalUser();
    this.game = this.multiPlayerService.setArray();

    this.multiPlayerService.fetchGameStatus(this.gameId)
      .subscribe((result: GameDTO) => {
        this.gamedto = result;
        this.setBoard();
      });

    this.initializePlayers();
  }

  initializePlayers(): void {
    if (this.gamedto.xPlayer  == null && this.gamedto.oPlayer == null) {
      console.log('nope')

      if (Math.random() < 0.5)
      {
        this.setXPlayer();
      }
      else {
        this.setOPlayer();
      }
    }
    else {
      console.log('tu')
      if (this.gamedto.xPlayer == null) {
        console.log('tuuu')

        this.setXPlayer();
      }
      else {
        console.log('tuuuuuuuuuuuuuuu')

        this.setOPlayer();
      }
    }
  }

  setXPlayer(): void {
    this.gamedto.xPlayer = this.user;
    this.playerRole = 'X';
    this.multiPlayerService.updatexPlayer(this.gameId, this.gamedto.xPlayer);
  }

  setOPlayer(): void {
    this.gamedto.oPlayer = this.user;
    this.playerRole = 'O';
    this.multiPlayerService.updateoPlayer(this.gameId, this.gamedto.oPlayer);
  }

  back(): void {
    this.router.navigate(['']);
  }

  setBoard(): any {
    this.game.cellValue[0] = this.gamedto.row0;
    this.game.cellValue[1] = this.gamedto.row1;
    this.game.cellValue[2] = this.gamedto.row2;
    this.game.currentPlayer = this.gamedto.currentPlayer;

    this.finished = this.gameService.GameWon(this.game);
    this.setCurrentPlayer();

    if (this.finished) {
      this.gamedto.winner = this.game.currentPlayer;
      this.gamedto.gameFinished = false;
    }
  }

  SetCellValue(row: number, col: number): any {
    if (!this.finished) {
      if (this.game.currentPlayer !== this.playerRole) {
        alert('The player ' + this.game.currentPlayer + ' has not yet played.\nPlease wait for your turn.');
      } else if (this.game.cellValue[row][col] === '') {
        this.game.cellValue[row][col] = this.game.currentPlayer;
        this.multiPlayerService.SaveGameStatus(this.gameId, this.game);
      }
    }
  }

  setCurrentPlayer(): any {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += this.game.cellValue[i].filter(String).length;
    }
    if (!this.finished) {
      if (sum % 2 === 0) {
        this.game.currentPlayer = 'X';
      } else {
        this.game.currentPlayer = 'O';
      }
      if (sum === 9) {
        this.gamedto.gameFinished = true;
      } else {
        this.gamedto.gameFinished = false;
      }
    }
  }
}
