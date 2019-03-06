import { Injectable } from '@angular/core';
import {FirebaseManager} from '../helpers/firebase-manager';
import {User} from '../models/user';

@Injectable()
export class AuthService {

  user: User;

  constructor() { }

  signIn(email: string, password: string) {
    // do login
    return FirebaseManager.auth().signInWithEmailAndPassword(
      email,
      password
    ).then((res) => {
      console.log(res);

      if (!res.user) {
        return Promise.reject(new Error('User not found'));
      }

      return User.readFromDatabase(res.user.uid)
        .then((u) => {
          this.user = u;
        });
    });
  }

  signOut() {
    // clear current user
    FirebaseManager.getInstance().signOut();
    this.user = null;
  }

}
