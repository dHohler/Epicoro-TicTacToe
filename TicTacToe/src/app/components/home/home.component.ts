import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {MultiplayerService} from '../../services/multiplayer.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Game} from '../../models/game.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;
  games: Observable<Game[]>;

  constructor(
    private router: Router,
    private userService: UserService,
    private multiPlayerService: MultiplayerService,
    private db: AngularFirestore) {}

  ngOnInit(): void {
    this.user = this.userService.checkLocalUser();
    this.games = this.multiPlayerService.getGamesList();

    const emptyGames = this.multiPlayerService.getEmptyGames().subscribe(r => {
      r.forEach(doc => console.log(doc.data()));
    });
    console.log((emptyGames));
  }

  newGame(): void {
    this.multiPlayerService.initializeGame();
  }
}
