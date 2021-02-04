import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';
import * as uuid from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const value = localStorage.getItem('user')
    if (!value) {
      this.router.navigate(['/register']);
    }
    else {
      this.user = JSON.parse(value);
    }
  }

  newGame(): void {
    this.router.navigate(['/game']);
  }
}
