import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {GameDTO} from '../../../models/game.model';
import {Router} from '@angular/router';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-empty-games',
  templateUrl: './empty-games.component.html',
  styleUrls: ['./empty-games.component.scss']
})
export class EmptyGamesComponent {

  @Input() emptyGames: Observable<GameDTO[]>;
  @Input() user: User;

  constructor(private router: Router) {}

  waitingPlayer(game: GameDTO): string {
    if (game.oPlayer)
    {
      return game.oPlayer.username;
    }
    else {
      return game.xPlayer.username;
    }
  }

  openGame(id: string): void {
    this.router.navigate([`/game/${id}`]);
  }
}
