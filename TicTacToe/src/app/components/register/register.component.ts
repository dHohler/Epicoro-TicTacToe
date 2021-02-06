import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as uuid from 'uuid';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User  = {id: uuid.v4(), username: ''};

  constructor(private router: Router,
              private readonly userService: UserService) { }

  ngOnInit(): void {
  }

  register(): void {
    this.userService.createUser(this.user);
    localStorage.setItem('User', JSON.stringify(this.user));
    this.router.navigate(['']);
  }
}
