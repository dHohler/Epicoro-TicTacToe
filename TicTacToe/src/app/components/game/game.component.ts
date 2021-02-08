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
    return (this.gameDto.xPlayer.id === this.user.id) ? this.gameDto.oPlayer.username : this.gameDto.xPlayer.username;
  }

  opponentRole(): string {
      return (this.playerRole === 'X') ? ': O' : ': X';
  }

  initializePlayers(): void {
    let update = false;
    if (!this.gameDto.xPlayer && !this.gameDto.oPlayer) {
      if (Math.random() < 0.5)
      {
        this.setXPlayer();
      }
      else {
        this.setOPlayer();
      }
      this.gameDto.gameStatus = 0;
      update = true;
    }
    else if (!this.gameDto.xPlayer && (this.gameDto.oPlayer.id !== this.user.id)) {
        this.setXPlayer();
        update = true;
        this.gameDto.gameStatus = 1;
    }
    else if (!this.gameDto.oPlayer && (this.gameDto.xPlayer.id !== this.user.id)) {
      this.setOPlayer();
      update = true;
      this.gameDto.gameStatus = 1;
    }
    if (!this.playerRole)
    {
      if (this.gameDto.xPlayer.id === this.user.id) {
        this.playerRole = 'X';
      }
      else if (this.gameDto.oPlayer.id === this.user.id) {
        this.playerRole = 'O';
      }
    }
    if (update)
    {
      this.multiPlayerService.SaveGameStatus(this.gameId, this.game, this.gameDto);
    }
  }

  setXPlayer(): void {
    this.gameDto.xPlayer = this.user;
    this.playerRole = 'X';
  }

  setOPlayer(): void {
    this.gameDto.oPlayer = this.user;
    this.playerRole = 'O';
  }

  back(): void {
    this.router.navigate(['']);
  }

  setBoard(): void {
    this.game.cellValue[0] = this.gameDto.row0;
    this.game.cellValue[1] = this.gameDto.row1;
    this.game.cellValue[2] = this.gameDto.row2;
    this.game.currentPlayer = this.gameDto.currentPlayer;

    this.CheckGameStatus();
    this.setCurrentPlayer();
  }

  CheckGameStatus(): void {
    if (this.gameService.GameWon(this.game) && !this.gameFinished)
    {
      this.gameFinished = true;
      this.gameDto.gameFinished = true;
      this.gameDto.winner = this.game.currentPlayer === 'X' ? this.gameDto.oPlayer : this.gameDto.xPlayer;
      this.gameDto.gameStatus = 2;
      this.multiPlayerService.SaveGameStatus(this.gameId, this.game, this.gameDto);
    }
    if (this.isDraw()  && !this.gameFinished)
    {
      this.gameFinished = true;
      this.gameDto.gameFinished = true;
      this.gameDto.gameStatus = 3;
      this.multiPlayerService.SaveGameStatus(this.gameId, this.game, this.gameDto);
    }
  }

  SetCellValue(row: number, col: number): void {
    if (!this.gameFinished) {
      if (this.game.currentPlayer !== this.playerRole) {
        alert('The player ' + this.game.currentPlayer + ' has not yet played.\nPlease wait for your turn.');
      } else if (this.game.cellValue[row][col] === '') {
        this.game.cellValue[row][col] = this.game.currentPlayer;
        this.setCurrentPlayer();
        this.multiPlayerService.SaveGameStatus(this.gameId, this.game, this.gameDto);
      }
    }
  }

  setCurrentPlayer(): void {
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
    }
  }

  isDraw(): boolean {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += this.game.cellValue[i].filter(String).length;
    }
    if (sum === 9) {
      return true;
    } else {
      return false;
    }
  }
}
