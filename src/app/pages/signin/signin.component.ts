import {Component, Inject, OnInit} from '@angular/core';
import {SpinnerOverlayService} from '../../services/spinner-overlay.service';
import {AuthService} from '../../services/auth.service';
import {BasePage} from '../base.page';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {SESSION_STORAGE, StorageService} from 'ngx-webstorage-service';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent extends BasePage implements OnInit {

  email = '';
  password = '';

  constructor(
    public router: Router,
    private overlay: SpinnerOverlayService,
    private auth: AuthService,
    public dialog: MatDialog,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) {
    super(dialog);
  }

  ngOnInit() {
  }

  onSignin() {
    const that = this;

    this.overlay.show();

    this.auth.signIn(
      this.email,
      this.password
    ).then( () => {
      // save user to session storage
      this.storage.set(AppComponent.KEY_USER, this.auth.user);

      // go to home page
      this.router.navigate(['home']);

      that.overlay.hide();
    }).catch((err) => {
      console.log(err);

      this.overlay.hide();

      // show error alert
      this.showErrorDialg('Login Failed', err.message);
    });
  }
}
