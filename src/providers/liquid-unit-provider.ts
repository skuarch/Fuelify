import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { LiquidUnit } from '../model/liquid-unit';
import { SharedData } from '../model/shared-data';

@Injectable()
export class LiquidUnitProvider {

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
    if (LiquidUnitProvider.db === null) {
      LiquidUnitProvider.db = db;
    }
  }

  static createTable() {

    if (!this.db) {
      throw new Error('db is undefinied');
    }

    let sql = 'CREATE TABLE IF NOT EXISTS liquid_unit(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, is_default INTEGER)';
    return LiquidUnitProvider.db.executeSql(sql, []);
  }

  static insertDefaultData(): void {

    if (!this.db) {
      throw new Error('db is undefinied');
    }

    let sql1 = 'INSERT OR IGNORE INTO liquid_unit (name, is_default) values ("Liters", 1)';
    LiquidUnitProvider.db.executeSql(sql1, []);

    let sql2 = 'INSERT OR IGNORE INTO liquid_unit (name) values ("Gallons")';
    LiquidUnitProvider.db.executeSql(sql2, []);
  }

  static saveLiquidUnit(liquidUnit: LiquidUnit) {

    if (!this.db) {
      throw new Error('db is undefinied');
    }

    if (!liquidUnit) {
      throw new Error('liquidUnit is undefinied');
    }

    if (!liquidUnit.name) {
      throw new Error('liquidUnit.name is undefinied');
    }
    let sql = 'INSERT INTO liquid_unit (name) VALUES (?)';
    return LiquidUnitProvider.db.executeSql(sql, [liquidUnit.name]);
  }

  static getLiquidUnits(): Promise<LiquidUnit[]> {

    if (!this.db) {
      throw new Error('db is undefinied');
    }

    let sql = 'SELECT * FROM liquid_unit';
    return LiquidUnitProvider.db.executeSql(sql, [])
      .then(response => {
        let liquidUnits = new Array<LiquidUnit>();
        for (let index = 0; index < response.rows.length; index++) {
          liquidUnits.push(response.rows.item(index));
        }
        return Promise.resolve(liquidUnits);
      })
      .catch(error => Promise.reject(error));
  }

  static updateLiquidUnit(liquidUnit: LiquidUnit) {

    if (!this.db) {
      throw new Error('db is undefinied');
    }

    if (!liquidUnit) {
      throw new Error('liquidUnit is undefinied');
    }

    if (!liquidUnit.id) {
      throw new Error('liquidUnit.id is undefinied');
    }

    if (!liquidUnit.name) {
      throw new Error('liquidUnit.name is undefinied');
    }

    let sql = 'UPDATE liquid_unit SET name = ? WHERE id = ?';
    return LiquidUnitProvider.db.executeSql(sql, [liquidUnit.name, liquidUnit.id]);

  }

  static deleteLiquidUnit(liquidUnit: LiquidUnit) {

    if (!this.db) {
      throw new Error('db is undefinied');
    }

    if (!liquidUnit.id) {
      throw new Error('liquidUnit.id is undefinied');
    }

    let sql = 'DELETE FROM vehicle WHERE id = ?';
    return LiquidUnitProvider.db.executeSql(sql, [liquidUnit.id]);

  }

  static getLiquidUnitByName(liquidUnitName: string): Promise<LiquidUnit> {

    if (!this.db) {
      throw new Error('db is undefinied');
    }

    if(!liquidUnitName) {
      throw new Error('liquidUnitName is undefinied');
    }

    let sql = 'SELECT * FROM liquid_unit WHERE name =?';
    return LiquidUnitProvider.db.executeSql(sql, [liquidUnitName])
      .then(response => {
        return response.rows.item(0);
      })
      .catch(error => Promise.reject(error));

  }

}