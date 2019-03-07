import {Component, Inject} from '@angular/core';
import {FirebaseManager} from './helpers/firebase-manager';
import {SpinnerOverlayService} from './services/spinner-overlay.service';
import {AuthService} from './services/auth.service';
import {User} from './models/user';
import {SESSION_STORAGE, StorageService} from 'ngx-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  static KEY_USER = 'current_user';

  title = 'app';

  constructor(
    private overlay: SpinnerOverlayService,
    private auth: AuthService,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) {
    // init firebase
    if (FirebaseManager.getInstance()) {
      console.log('firebase loaded');
    }

    console.log('app component');

    // set current user from session storage
    if (!this.auth.user) {
      const userObj = this.storage.get(AppComponent.KEY_USER);
      if (userObj) {
        this.auth.user = new User().deserialize(userObj);
      }
    }
  }
}
