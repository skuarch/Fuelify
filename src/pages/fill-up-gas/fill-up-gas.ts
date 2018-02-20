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
  vehicles:Vehicle[];
  amount: number;
  price: number;
  date: any;
  measure: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.getVehicles();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FillUpGasPage');
  }

  getVehicles() {
    VehicleProvider.getVehicles()
      .then(vehicles => this.vehicles = vehicles)
      .catch(error => { throw error });
  }

}
