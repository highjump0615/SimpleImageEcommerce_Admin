import {BaseModel} from './base-model';
import DataSnapshot = firebase.database.DataSnapshot;

export class Order extends BaseModel {
  //
  // table info
  //
  static TABLE_NAME = 'orders';

  static FIELD_USER_ID = 'userId';
  static FIELD_AMOUNT = 'amount';

  //
  // properties
  //
  userId = '';
  amount = 0;

  user: any;

  constructor(snapshot?: DataSnapshot) {
    super(snapshot);

    if (snapshot) {
      const info = snapshot.val();

      this.userId = info[Order.FIELD_USER_ID];
      this.amount = info[Order.FIELD_AMOUNT];
    }
  }

  tableName() {
    return Order.TABLE_NAME;
  }

  toDictionary() {
    const dict = super.toDictionary();

    dict[Order.FIELD_USER_ID] = this.userId;
    dict[Order.FIELD_AMOUNT] = this.amount;

    return dict;
  }
}
