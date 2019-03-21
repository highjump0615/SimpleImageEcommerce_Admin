import DataSnapshot = firebase.database.DataSnapshot;
import {BaseModel} from './base-model';

export class Setting extends BaseModel {
  //
  // table info
  //
  static TABLE_NAME = 'settings';
  static FIELD_ABOUT = 'about';

  //
  // properties
  //
  about = '';

  constructor(snapshot?: DataSnapshot) {
    super();

    if (snapshot) {
      const info = snapshot.val();

      this.about = info[Setting.FIELD_ABOUT];
    }
  }

  tableName() {
    return Setting.TABLE_NAME;
  }

  toDictionary() {
    const dict = [];

    dict[Setting.FIELD_ABOUT] = this.about;

    return dict;
  }
}
