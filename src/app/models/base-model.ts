import DataSnapshot = firebase.database.DataSnapshot;
import {FirebaseManager} from '../helpers/firebase-manager';
import {Utils} from '../helpers/utils';


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

  tableName() {
    // virtual func
    return 'base';
  }

  toDictionary() {
    const dict = [];
    dict[BaseModel.FIELD_DATE] = this.createdAt;

    return dict;
  }

  addDictItem(dict, field, value) {
    if (value) {
      dict[field] = value;
    }
  }

  public getDatabaseRef(withID?: string, parentID?: string) {
    let strDb = this.tableName();
    if (parentID) {
      strDb += '/' + parentID;
    }

    const database = FirebaseManager.ref().child(strDb);

    if (withID) {
    } else if (!this.id) {
      this.id = database.push().key;
    }

    return database.child(this.id);
  }

  /**
   * generate and set new id
   * @param parentID
   */
  generateNewId(parentID?: string) {
    this.getDatabaseRef(null, parentID);
  }

  /**
   * save entire object to database
   *
   * @param withID
   * @param parentID
   */
  saveToDatabase(withID?: string, parentID?: string) {
    const db = this.getDatabaseRef(withID, parentID);
    db.set(this.toDictionary());
  }

  saveToDatabaseWithField(field: string,
                          value: any,
                          onComplete?: (err: Error | null) => any,
                          withID?: string,
                          parentID?: string) {

    const db = this.getDatabaseRef(withID, parentID);
    db.child(field).set(value, onComplete);
  }

  public equalTo(data: BaseModel) {
    return this.id === data.id;
  }

  public clone(): any {
    const cloneObj = new (<any>this.constructor)(); // line fixed
    for (const attribut in this) {
      if (typeof this[attribut] === 'object') {
        cloneObj[attribut] = this.clone();
      } else {
        cloneObj[attribut] = this[attribut];
      }
    }
    return cloneObj;
  }

  public createdAtStr() {
    return Utils.timeToStringFromat(this.createdAt, 'YYYY-MM-DD HH:mm:ss');
  }
}
