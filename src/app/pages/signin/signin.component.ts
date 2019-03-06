import { Component, OnInit } from '@angular/core';
import {SpinnerOverlayService} from '../../services/spinner-overlay.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  email = '';
  password = '';

  constructor(
    private overlay: SpinnerOverlayService,
  ) { }

  ngOnInit() {
  }

  onSignin() {
    const that = this;

    this.overlay.show();
  }
}
