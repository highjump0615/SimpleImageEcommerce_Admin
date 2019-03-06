import { Component } from '@angular/core';
import {FirebaseManager} from './helpers/firebase-manager';
import {SpinnerOverlayService} from './services/spinner-overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private overlay: SpinnerOverlayService
  ) {
    // init firebase
    if (FirebaseManager.getInstance()) {
      console.log('firebase loaded');
    }
  }
}
