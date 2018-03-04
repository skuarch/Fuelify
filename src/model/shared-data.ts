import { SQLiteObject } from '@ionic-native/sqlite';
import { Vehicle } from '../model/vehicle';

export class SharedData {

  private static db: SQLiteObject;
  private static vehicle: Vehicle;

  private constructor() {
  }

  static setDb(db: SQLiteObject) {

    if (!db) {
      throw new Error('db is undefinied');
    }

    SharedData.db = db;

  }

  static getDb(): SQLiteObject {
    return SharedData.db;
  }

  static getVehicle():Vehicle {
    return SharedData.vehicle;
  }

  static setVehicle(vehicle: Vehicle) {

    if (!vehicle) {
      throw new Error('vehicle is undefinied');
    }

    SharedData.vehicle = vehicle;
  }

}
