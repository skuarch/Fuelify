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

    let sql = 'CREATE TABLE IF NOT EXISTS vehicle(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, model INTEGER)';
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

    let sql = 'INSERT INTO vehicle (name, model) VALUES (?,?)';
    return VehicleProvider.db.executeSql(sql, [vehicle.name, vehicle.model]);
  }

  static getVehicles(): Promise<Vehicle[]> {

    if (!this.db) {
      throw new Error('db is undefinied');
    }

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

    let sql = 'UPDATE vehicle SET name = ?, model = ? WHERE id = ?';
    return VehicleProvider.db.executeSql(sql, [vehicle.name, vehicle.model, vehicle.id]);

  }

  static deleteVehicle(vehicle: Vehicle) {

    if (!this.db) {
      throw new Error('db is undefinied');
    }

    if (!vehicle.id) {
      throw new Error('vehicle.id is undefinied');
    }

    let sql = 'DELETE FROM vehicle WHERE id = ?';
    return VehicleProvider.db.executeSql(sql, [vehicle.id]);

  }

}
