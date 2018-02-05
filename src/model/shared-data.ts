import { SQLiteObject } from '@ionic-native/sqlite';

export class SharedData {

  private static db: SQLiteObject;

  private constructor() {
  }

  static setDb(db: SQLiteObject) {

    if(!db) {
      throw new Error('db is undefinied');
    }

    SharedData.db = db;

  }

  static getDb() {
    return SharedData.db;
  }

}
