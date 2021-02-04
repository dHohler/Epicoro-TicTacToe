import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as uuid from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    localStorage.setItem('id', uuid.v4());
    localStorage.setItem('username', this.username);

    this.router.navigate(['']);
  }
}
