import DataSnapshot = firebase.database.DataSnapshot;

export class Dashboard {
  //
  // table info
  //
  static TABLE_NAME = 'dashboard';

  static FIELD_ORDER_AMOUNT = 'order_amount';
  static FIELD_ORDER_COUNT = 'order_count';

  orderAmount: number;
  orderCount: number;

  constructor(snapshot?: DataSnapshot) {
    if (snapshot) {
      const info = snapshot.val();

      this.orderAmount = info[Dashboard.FIELD_ORDER_AMOUNT];
      this.orderCount = info[Dashboard.FIELD_ORDER_COUNT];
    }
  }
}
