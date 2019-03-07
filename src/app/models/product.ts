import {BaseModel, Deserializable} from './base-model';
import DataSnapshot = firebase.database.DataSnapshot;
import {FirebaseManager} from '../helpers/firebase-manager';

export class Product extends BaseModel implements Deserializable {
  //
  // table info
  //
  static TABLE_NAME = 'products';
  static FIELD_TITLE = 'title';
  static FIELD_PRICE = 'price';
  static FIELD_DESC = 'desc';
  static FIELD_IMAGE = 'imageUrl';

  //
  // properties
  //
  title = '';
  price = 0;
  desc = '';
  imageUrl = '';

  constructor(snapshot?: DataSnapshot) {
    super(snapshot);

    if (snapshot) {
      const info = snapshot.val();

      this.title = info[Product.FIELD_TITLE];
      this.price = info[Product.FIELD_PRICE];
      this.desc = info[Product.FIELD_DESC];
      this.imageUrl = info[Product.FIELD_IMAGE];
    }
  }

  static readFromDatabase(withId: string): Promise<Product> {
    const userRef = FirebaseManager.ref()
      .child(Product.TABLE_NAME)
      .child(withId);

    return userRef.once('value')
      .then((snapshot) => {
        if (!snapshot.exists()) {
          return Promise.reject(new Error('Product not found'));
        }

        const product = new Product(snapshot);
        return Promise.resolve(product);
      });
  }

  tableName() {
    return Product.TABLE_NAME;
  }

  toDictionary() {
    const dict = super.toDictionary();

    dict[Product.FIELD_TITLE] = this.title;
    dict[Product.FIELD_PRICE] = this.price;
    dict[Product.FIELD_DESC] = this.desc;
    dict[Product.FIELD_IMAGE] = this.imageUrl;

    return dict;
  }
}
