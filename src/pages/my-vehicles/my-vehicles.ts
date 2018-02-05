import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddVehiclePage } from '../../pages/add-vehicle/add-vehicle';
import { VehicleProvider } from '../../providers/vehicle-provider';
import { Vehicle } from '../../model/vehicle';

@IonicPage()
@Component({
  selector: 'page-my-vehicles',
  templateUrl: 'my-vehicles.html',
})
export class MyVehiclesPage {

  vehicles: Vehicle[] = new Array<Vehicle>();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getVehicles();
  }

  ionViewDidLoad() {
    this.getVehicles();
  }

  addVehicle() {
    this.navCtrl.push(AddVehiclePage);
  }

  getVehicles() {
    VehicleProvider.getVehicles()
      .then(vehicles => this.vehicles = vehicles)
      .catch(error => { throw error });
  }

  ionViewWillEnter() {
    this.getVehicles();
  }

}
