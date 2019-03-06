import DataSnapshot = firebase.database.DataSnapshot;
import {FirebaseManager} from '../helpers/firebase-manager';


export interface Deserializable {
  deserialize(input: any): this;
}

export class BaseModel {

  //
  // table info
  //
  static FIELD_DATE = 'createdAt';
  id = '';
  createdAt = FirebaseManager.getInstance().getServerLongTime();

  constructor(snapshot?: DataSnapshot) {
    if (snapshot) {
      this.id = snapshot.key;

      const info = snapshot.val();

      if (BaseModel.FIELD_DATE in info) {
        this.createdAt = info[BaseModel.FIELD_DATE];
      }
    }
  }

  deserialize(input: any): this {
    Object.assign(this, input);

    return this;
  }
}
