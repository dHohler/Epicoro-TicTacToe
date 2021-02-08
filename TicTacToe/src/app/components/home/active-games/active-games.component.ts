import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {GameDTO} from '../../../models/game.model';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-active-games',
  templateUrl: './active-games.component.html',
  styleUrls: ['./active-games.component.scss']
})
export class ActiveGamesComponent {

  @Input() activeGames: Observable<GameDTO[]>;
  @Input() user: User;

  constructor(
    private router: Router) {
  }

  openGame(id: string): void {
    this.router.navigate([`/game/${id}`]);
  }
}
