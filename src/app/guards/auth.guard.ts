import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    console.log('auth guard');

    const path = next.data['path'];

    // redirect to login page when not logged in
    if (!this.auth.user) {
      // redirect to login, except from login page itself
      if (path === 'login') {
        return true;
      }

      this.router.navigate(['login']);
      return false;
    }

    // redirect to home page when logged in
    if (path === 'login') {
      this.router.navigate(['home']);
      return false;
    }

    return true;
  }
}
