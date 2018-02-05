import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddVehiclePage } from '../../pages/add-vehicle/add-vehicle';

@IonicPage()
@Component({
  selector: 'page-my-vehicles',
  templateUrl: 'my-vehicles.html',
})
export class MyVehiclesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyVehiclesPage');
  }

  addVehicle() {
    this.navCtrl.push(AddVehiclePage);
  }

}
