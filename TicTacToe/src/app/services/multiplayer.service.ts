/* tslint:disable:max-line-length */
import { Injectable } from '@angular/core';
import {Game, GameDTO} from 'src/app/models/game.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {User} from '../models/user.model';
import {Router} from '@angular/router';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MultiplayerService {

  gameId$ = new BehaviorSubject<string>(null);

  constructor(private router: Router, private db: AngularFirestore) { }

  initializeGame(): void{
    const initialGame = this.setArray();
    const initialGameDTO = new GameDTO()
    initialGameDTO.row0 = initialGame.cellValue[0];
    initialGameDTO.row1 = initialGame.cellValue[1];
    initialGameDTO.row2 = initialGame.cellValue[2];
    initialGameDTO.currentPlayer = 'X';
    initialGameDTO.oPlayer = null;
    initialGameDTO.xPlayer = null;

    const gameData = JSON.parse(JSON.stringify(initialGameDTO));

    this.db.collection('Game').add(gameData).then(
      (docref) => {
        localStorage.setItem('gameId', docref.id);
        this.setGameData();
        this.router.navigate([`/game/${docref.id}`]);
      }
    );
  }

  setGameData(): any {
    if (localStorage.getItem('gameId')) {
      const gameId = localStorage.getItem('gameId');
      this.gameId$.next(gameId);
    }
  }

  SaveGameStatus(gameId: string, game: Game): any {
    const gameStatus = new GameDTO();
    gameStatus.row0 = game.cellValue[0];
    gameStatus.row1 = game.cellValue[1];
    gameStatus.row2 = game.cellValue[2];
    gameStatus.currentPlayer = game.currentPlayer;

    const gameData = JSON.parse(JSON.stringify(gameStatus));
    return this.db.doc('Game/' + gameId).update(gameData);
  }

  fetchGameStatus(gameId: string): Observable<GameDTO> {
    return this.db.doc<GameDTO>('Game/' + gameId).valueChanges();
  }

  getEmptyGames(): any {
    return this.db.collection('Game', (ref) => ref.where('oPlayer', '==', null).limit(10)).get();
  }

  setArray(): Game {
    const game = new Game();
    for (let i = 0; i < 3; i++) {
      game.cellValue[i] = [];
      for (let j = 0; j < 3; j++) {
        game.cellValue[i][j] = '';
      }
    }
    game.currentPlayer = 'X';
    return game;
  }

  updatexPlayer(gameId: string, user: User): any {
    const gameCollection = this.db.collection('Game');
    gameCollection.doc(gameId).update({ xPlayer: user});
  }

  updateoPlayer(gameId: string, user: User): any {
    const gameCollection = this.db.collection('Game');
    gameCollection.doc(gameId).update({ oPlayer: user});
  }

  getGamesList(): any {
    const games = this.db.collection<Game>('Game');
    return games.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Game;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
