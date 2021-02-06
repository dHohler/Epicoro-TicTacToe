import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router, private firestore: AngularFirestore) { }

  createUser(user: User): any {
    return this.firestore.collection('User').add(user);
  }

  checkLocalUser(): User {
    const value = localStorage.getItem('User');
    if (!value) {
      this.router.navigate(['/register']);
      return null;
    }
    else {
      return JSON.parse(value);
    }
  }
}
