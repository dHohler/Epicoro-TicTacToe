import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  username = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    const user = localStorage.getItem('username');
    if (user === null) {
      this.router.navigate(['/register']);
    }
    else {
      this.username = user.toString();
    }
  }

  back(): void {
    this.router.navigate(['']);
  }
}
