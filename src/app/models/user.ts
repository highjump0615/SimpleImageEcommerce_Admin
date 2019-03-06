import {BaseModel, Deserializable} from './base-model';
import {FirebaseManager} from '../helpers/firebase-manager';
import DataSnapshot = firebase.database.DataSnapshot;

export class User extends BaseModel implements Deserializable {

  //
  // table info
  //
  static TABLE_NAME = 'users';
  static FIELD_EMAIL = 'email';
  static FIELD_TYPE = 'type';

  static USER_TYPE_NORMAL = 'normal';
  static USER_TYPE_ADMIN = 'admin';

  //
  // properties
  //
  email = '';

  type = User.USER_TYPE_NORMAL;

  constructor(withId?: string, snapshot?: DataSnapshot) {
    super(snapshot);

    if (snapshot) {
      const info = snapshot.val();

      this.email = info[User.FIELD_EMAIL];

      if (User.FIELD_TYPE in info) {
        this.type = info[User.FIELD_TYPE];
      }
    }

    if (withId) {
      this.id = withId;
    }
  }

  static readFromDatabase(withId: string): Promise<User> {
    const userRef = FirebaseManager.ref()
      .child(User.TABLE_NAME)
      .child(withId);

    return userRef.once('value')
      .then((snapshot) => {
        if (!snapshot.exists()) {
          return Promise.reject('User not found');
        }

        const user = new User(null, snapshot);
        return Promise.resolve(user);
      });
  }
}
