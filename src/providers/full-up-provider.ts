import { Injectable } from '@angular/core';
import { SharedData } from '../model/shared-data';
import { SQLiteObject } from '@ionic-native/sqlite';
import { FillUp } from '../model/fill-up';

@Injectable()
export class FullUpProvider {

  private static db: SQLiteObject = null;

  constructor() {    
  }

  static setStaticDatabase() {
    let db = SharedData.getDb();
    if (db) {
      this.db = db;
    } else {
      throw new Error('static db is undefinied');
    }
  }

  static setDatabase(db: SQLiteObject) {
    if (!db) {
      throw new Error('db is undefinied');
    }
    if (FullUpProvider.db === null) {
      FullUpProvider.db = db;
    }
  }

  static createTable() {

    if (!this.db) {
      throw new Error('db is undefinied');
    }

    let sql = 'CREATE TABLE IF NOT EXISTS fill_up(id INTEGER PRIMARY KEY AUTOINCREMENT, vehicle_id INTEGER, vehicle_name TEXT, liquid_unit_id INTEGER, liquid_unit_name TEXT, amount INTEGER, odometer INTEGER, price INTEGER, date TEXT, notes TEXT, is_deleted INTEGER)';
    return FullUpProvider.db.executeSql(sql, []);
  }

  static saveFillUp(fillUp: FillUp) {

    if (!this.db) {
      throw new Error('db is undefinied');
    }

    if (!fillUp) {
      throw new Error('fillUp is undefinied');
    }

    let sql = 'INSERT INTO fill_up (vehicle_id, vehicle_name, liquid_unit_id, liquid_unit_name, amount, odometer, price, date, notes, is_deleted) VALUES (?,?,?,?,?,?,?,?,?,?)';
    return FullUpProvider.db.executeSql(sql, [fillUp.vehicleId, fillUp.vehicleName, fillUp.liquidUnitId, fillUp.liquidUnitName, fillUp.amount, fillUp.odometer, fillUp.price, fillUp.date, fillUp.notes, fillUp.isDeleted]);

  }
}
