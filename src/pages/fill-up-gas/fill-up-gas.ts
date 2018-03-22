import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VehicleProvider } from '../../providers/vehicle-provider';
import { Vehicle } from '../../model/vehicle';

@IonicPage()
@Component({
  selector: 'page-fill-up-gas',
  templateUrl: 'fill-up-gas.html',
})
export class FillUpGasPage {

  vehicle:Vehicle;
  vehicles: Vehicle[] = new Array<Vehicle>();
  amount: number;
  price: number;
  date: any;
  measure: any;
  note:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.vehicles = new Array();
    this.getVehicles();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FillUpGasPage');
    this.getVehicles();
  }

  getVehicles() {
    VehicleProvider.getVehicles()
      .then(vehicles => this.vehicles = vehicles)
      .catch(error => { throw error });
  }

}
