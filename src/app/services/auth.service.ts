import { Injectable } from '@angular/core';
import {FirebaseManager} from '../helpers/firebase-manager';

@Injectable()
export class AuthService {

  constructor() { }

  signIn(email: string, password: string) {
    // do login
    return FirebaseManager.auth().signInWithEmailAndPassword(
      email,
      password
    );
  }

}
