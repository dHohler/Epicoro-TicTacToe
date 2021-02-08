import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {GameDTO} from '../../../models/game.model';
import {Router} from '@angular/router';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-finished-games',
  templateUrl: './finished-games.component.html',
  styleUrls: ['./finished-games.component.scss']
})
export class FinishedGamesComponent {

  @Input() finishedGames: Observable<GameDTO[]>;
  @Input() user: User;

  constructor(private router: Router) {}

  openGame(id: string): void {
    this.router.navigate([`/game/${id}`]);
  }
}
