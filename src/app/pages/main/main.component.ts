import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {SESSION_STORAGE, StorageService} from 'ngx-webstorage-service';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    public router: Router,
    private auth: AuthService,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) { }

  ngOnInit() {
  }

  onSignout() {
    // sign out
    this.auth.signOut();

    // clear storage
    this.storage.remove(AppComponent.KEY_USER);

    // return to login page
    this.router.navigate(['login']);
  }
}
