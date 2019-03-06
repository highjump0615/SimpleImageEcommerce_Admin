import { Component, OnInit } from '@angular/core';
import {SpinnerOverlayService} from '../../services/spinner-overlay.service';
import {AuthService} from '../../services/auth.service';
import {BasePage} from '../base.page';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent extends BasePage implements OnInit {

  email = '';
  password = '';

  constructor(
    private overlay: SpinnerOverlayService,
    private auth: AuthService,
    public dialog: MatDialog
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
    ).then( (res) => {
      console.log(res);

      if (!res.user) {
        this.overlay.hide();
        return;
      }

      that.overlay.hide();
    }).catch((err) => {
      console.log(err);

      this.overlay.hide();

      // show error alert
      this.showErrorDialg('Login Failed', err.message);
    });
  }
}
