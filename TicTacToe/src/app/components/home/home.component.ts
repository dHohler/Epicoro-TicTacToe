import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {MultiplayerService} from '../../services/multiplayer.service';
import {GameDTO} from '../../models/game.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NbIconLibraries} from '@nebular/theme';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;
  allGames: Observable<GameDTO[]>;
  emptyGames: Observable<GameDTO[]>;
  myEmptyGames: Observable<GameDTO[]>;
  activeGames: Observable<GameDTO[]>;
  finishedGames: Observable<GameDTO[]>;

  constructor(
    private router: Router,
    private userService: UserService,
    private multiPlayerService: MultiplayerService,
    private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
  }

  ngOnInit(): void {
    this.user = this.userService.checkLocalUser();
    this.allGames = this.multiPlayerService.getGamesList();

    this.emptyGames = this.allGames.pipe(
      map(games =>
        games.filter( game => game.gameStatus === 0)
      )
    );

    this.myEmptyGames = this.allGames.pipe(
      map(games =>
        games.filter( game => game.gameStatus === 0 && (game.xPlayer?.id === this.user.id || game.oPlayer?.id === this.user.id))
      )
    );

    this.activeGames = this.allGames.pipe(
      map(games =>
        games.filter( game => game.gameStatus === 1 && (game.xPlayer.id === this.user.id || game.oPlayer.id === this.user.id))
      )
    );

    this.finishedGames = this.allGames.pipe(
      map(games =>
        games.filter(game => (game.gameStatus === 2 || game.gameStatus === 3)
          && (game.xPlayer.id === this.user.id || game.oPlayer.id === this.user.id))
      )
    );
  }

  newGame(): void {
    this.multiPlayerService.initializeGame();
  }
}
