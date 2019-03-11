import {BaseModel, Deserializable} from './base-model';
import DataSnapshot = firebase.database.DataSnapshot;

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
