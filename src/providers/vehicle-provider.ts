import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { Vehicle } from '../model/vehicle';


@Injectable()
export class VehicleProvider {

  private static db: SQLiteObject = null;

  constructor() {
  }

  static setDatabase(db: SQLiteObject) {
    console.log('sertting db');
    if (VehicleProvider.db === null) {
      VehicleProvider.db = db;
    }
  }

  static createTable() {
    let sql = 'CREATE TABLE IF NOT EXISTS vehicle(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, model INTEGER)';
    return VehicleProvider.db.executeSql(sql, []);
  }

  static saveVehicle(vehicle: Vehicle) {

    if (!vehicle) {
      throw new Error('vehicle is undefinied');
    }

    if(!vehicle.name) {
      throw new Error('vehicle.name is undefinied');
    }

    if(!vehicle.model) {
      throw new Error('vehicle.model is undefinied');
    }

    let sql = 'INSERT INTO vehicle (name, model) VALUES (?,?)';
    return VehicleProvider.db.executeSql(sql, [vehicle.name, vehicle.model]);
  }

  static getVehicles(): Promise<Vehicle[]> {
    let sql = 'SELECT * FROM vehicle';
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

}
