import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    public router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  onSignout() {
    // sign out
    this.auth.signOut();

    // return to login page
    this.router.navigate(['login']);
  }
}
