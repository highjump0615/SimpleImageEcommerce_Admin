import {BaseModel, Deserializable} from "./base-model";
import DataSnapshot = firebase.database.DataSnapshot;
import {Product} from "./product";

export class User extends BaseModel implements Deserializable {

  //
  // table info
  //
  static TABLE_NAME = 'users';
  static FIELD_NAME = 'username';
  static FIELD_EMAIL = 'email';
  static FIELD_TYPE = 'type';
  static FIELD_INITED = 'inited';
  static FIELD_PHOTO = 'photoUrl';

  static USER_TYPE_NORMAL = 'normal';
  static USER_TYPE_ADMIN = 'admin';

  //
  // properties
  //
  username = '';
  email = '';
  inited = false;
  photoUrl: string;

  type = User.USER_TYPE_NORMAL;

  // carts
  carts: Array<Product>;

  // purchased
  purchasedIds: Array<string>;
  purchased: Array<Product>;

  constructor(withId?: string, snapshot?: DataSnapshot) {
    super(snapshot);

    if (snapshot) {
      const info = snapshot.val();

      this.email = info[User.FIELD_EMAIL];

      if (User.FIELD_NAME in info) {
        this.username = info[User.FIELD_NAME];
      }
      if (User.FIELD_TYPE in info) {
        this.type = info[User.FIELD_TYPE];
      }
      if (User.FIELD_INITED in info) {
        this.inited = info[User.FIELD_INITED];
      }
      if (User.FIELD_PHOTO in info) {
        this.photoUrl = info[User.FIELD_PHOTO];
      }
    }

    if (withId) {
      this.id = withId;
    }
  }

  tableName() {
    return User.TABLE_NAME;
  }

  toDictionary() {
    const dict = super.toDictionary();

    dict[User.FIELD_NAME] = this.username;
    dict[User.FIELD_EMAIL] = this.email;
    dict[User.FIELD_TYPE] = this.type;
    dict[User.FIELD_INITED] = this.inited;
    dict[User.FIELD_PHOTO] = this.photoUrl;

    return dict;
  }
}
