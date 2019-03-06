import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import * as firebase from 'firebase';
import {environment} from '../../environments/environment';

export class FirebaseManager {

  static ServerOffset = 0.0;

  private static instance: FirebaseManager;

  static getInstance() {
    if (!this.instance) {
      this.instance = new FirebaseManager();
      this.instance.init();
    }

    return this.instance;
  }

  static auth() {
    return firebase.auth();
  }

  static ref() {
    return firebase.database().ref();
  }

  init() {
    firebase.initializeApp(environment.firebase);
    this.initServerTime();
  }

  initServerTime() {
    const serverTimeQuery = FirebaseManager.ref().child('.info/serverTimeOffset');
    serverTimeQuery
      .once('value')
      .then((snapshot) => {
        FirebaseManager.ServerOffset = snapshot.val();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getServerLongTime() {
    const estimatedServerTimeMs = Date.now() + FirebaseManager.ServerOffset;
    return estimatedServerTimeMs;
  }

  signOut() {
    // Log out
    FirebaseManager.auth().signOut();
  }

  uploadImageTo(path, imgData, completion: (string?, error?) => void) {
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(path);

    imageRef.putString(imgData, 'data_url')
      .then((snapshot) => {
        // get download url
        imageRef.getDownloadURL().then((url) => {
          console.log('url: ' + url);

          completion(url);
        }).catch((err) => {
          console.log(err);

          completion(null, err);
        });
      })
      .catch((err) => {
        console.log(err);

        completion(null, err);
      });
  }

}
