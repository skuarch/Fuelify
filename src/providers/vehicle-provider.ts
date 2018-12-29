import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { Vehicle } from '../model/vehicle';
import { SharedData } from '../model/shared-data';


@Injectable()
export class VehicleProvider {

  private static db: SQLiteObject = null;

  constructor() {
    VehicleProvider.setStaticDatabase();
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
    if (VehicleProvider.db === null) {
      VehicleProvider.db = db;
    }
  }

  static createTable() {

    if (!this.db) {
      throw new Error('db is undefinied');
    }
console.log('creating table');
    let sql = 'CREATE TABLE IF NOT EXISTS vehicles(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, model INTEGER, isDeleted INTEGER)';
    return VehicleProvider.db.executeSql(sql, []);
  }

  static saveVehicle(vehicle: Vehicle) {

    if (!this.db) {
      throw new Error('db is undefinied');
    }

    if (!vehicle) {
      throw new Error('vehicle is undefinied');
    }

    if (!vehicle.name) {
      throw new Error('vehicle.name is undefinied');
    }

    if (!vehicle.model) {
      throw new Error('vehicle.model is undefinied');
    }
console.log('que mierdas ' + vehicle.isDeleted);
    let sql = 'INSERT INTO vehicles (name, model, isDeleted) VALUES (?,?,?)';
    return VehicleProvider.db.executeSql(sql, [vehicle.name, vehicle.model, 0]);
  }

  static getVehicles(): Promise<Vehicle[]> {

    if (!this.db) {
      throw new Error('db is undefinied');
    }

    let sql = 'SELECT * FROM vehicles WHERE isDeleted = 0';
    return VehicleProvider.db.executeSql(sql, [])
      .then(response => {
        let vehicles = new Array<Vehicle>();
        for (let index = 0; index < response.rows.length; index++) {
          vehicles.push(response.rows.item(index));
        }
        return Promise.resolve(vehicles);
      })
      .catch(error => Promise.reject(error));
  }

  static updateVehicle(vehicle: Vehicle) {

    if (!this.db) {
      throw new Error('db is undefinied');
    }

    if (!vehicle) {
      throw new Error('vehicle is undefinied');
    }

    if (!vehicle.id) {
      throw new Error('vehicle.id is undefinied');
    }

    if (!vehicle.name) {
      throw new Error('vehicle.name is undefinied');
    }

    if (!vehicle.model) {
      throw new Error('vehicle.model is undefinied');
    }

    let sql = 'UPDATE vehicles SET name = ?, model = ? WHERE id = ?';
    return VehicleProvider.db.executeSql(sql, [vehicle.name, vehicle.model, vehicle.id]);

  }

  static deleteVehicle(vehicle: Vehicle) {

    if (!this.db) {
      throw new Error('db is undefinied');
    }

    if (!vehicle.id) {
      throw new Error('vehicle.id is undefinied');
    }

    let sql = 'DELETE FROM vehicles WHERE id = ?';
    return VehicleProvider.db.executeSql(sql, [vehicle.id]);

  }

}
