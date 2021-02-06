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
  gameDto = new GameDTO();
  gameBoard = [0, 1, 2];
  playerRole: string;
  gameFinished = false;

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
        this.gameDto = result;
        this.setBoard();
        this.initializePlayers();
      });
  }

  opponentUsername(): string {
    if (!this.gameDto.xPlayer || !this.gameDto.oPlayer)
    {
      return '';
    }
    else {
      return (this.gameDto.xPlayer.id === this.user.id) ? this.gameDto.oPlayer.username : this.gameDto.oPlayer.username;
    }
  }
  opponentRole(): string {
    if (!this.gameDto.xPlayer || !this.gameDto.oPlayer) {
      return '';
    }
    else {
      return (this.playerRole === 'X') ? ': O' : ': X';
    }
  }

  initializePlayers(): void {
    if (!this.gameDto.xPlayer && !this.gameDto.oPlayer) {
      if (Math.random() < 0.5)
      {
        this.setXPlayer();
      }
      else {
        this.setOPlayer();
      }
    }
    else if (this.gameDto.xPlayer && this.gameDto.oPlayer && !this.playerRole)
    {
      if (this.gameDto.xPlayer.id === this.user.id) {
        this.playerRole = 'X';
      }
      else if (this.gameDto.oPlayer.id === this.user.id) {
        this.playerRole = 'O';
      }
    }
    else {
      if (!this.gameDto.xPlayer && (this.gameDto.oPlayer.id !== this.user.id)) {
        this.setXPlayer();
      }
      else if (!this.gameDto.oPlayer && (this.gameDto.xPlayer.id !== this.user.id)) {
        this.setOPlayer();
      }
    }
  }

  setXPlayer(): void {
    this.gameDto.xPlayer = this.user;
    this.playerRole = 'X';
    this.multiPlayerService.updatexPlayer(this.gameId, this.gameDto.xPlayer);
  }

  setOPlayer(): void {
    this.gameDto.oPlayer = this.user;
    this.playerRole = 'O';
    this.multiPlayerService.updateoPlayer(this.gameId, this.gameDto.oPlayer);
  }

  back(): void {
    this.router.navigate(['']);
  }

  setBoard(): any {
    this.game.cellValue[0] = this.gameDto.row0;
    this.game.cellValue[1] = this.gameDto.row1;
    this.game.cellValue[2] = this.gameDto.row2;
    this.game.currentPlayer = this.gameDto.currentPlayer;

    this.gameFinished = this.gameService.GameFinished(this.game);
    this.setCurrentPlayer();

    if (this.gameFinished) {
      this.gameDto.winner = this.game.currentPlayer;
      this.gameDto.gameFinished = false;
    }
  }

  SetCellValue(row: number, col: number): any {
    if (!this.gameFinished) {
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
    if (!this.gameFinished) {
      if (sum % 2 === 0) {
        this.game.currentPlayer = 'X';
      } else {
        this.game.currentPlayer = 'O';
      }
      if (sum === 9) {
        this.gameDto.gameFinished = true;
      } else {
        this.gameDto.gameFinished = false;
      }
    }
  }
}
