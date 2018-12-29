import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SharedData } from '../../model/shared-data';
import { Vehicle } from '../../model/vehicle';
import { VehicleProvider } from '../../providers/vehicle-provider';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-vehicle-detail',
  templateUrl: 'vehicle-detail.html',
})
export class VehicleDetailPage {

  years: number[] = new Array();
  vehicle: Vehicle;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.vehicle = SharedData.getVehicle();
    this.getYears();
  }

  ionViewDidLoad() {
    // this.vehicle = SharedData.getVehicle();
  }

  ionViewWillEnter() {
    this.vehicle = SharedData.getVehicle();
  }

  getYears() {
    let date = new Date();
    let year = date.getFullYear();
    for (let i = year; i >= 1950; i--) {
      this.years.push(i);
    }
  }

  updateVehicle() {

    if(this.vehicle.id < 1) {
      return;
    }

    VehicleProvider.updateVehicle(this.vehicle).
    then(() => {
      let alert = this.alertCtrl.create({
        title: 'Vehicle updated!',
        subTitle: 'Your vehicle has been updated successfully!',
        buttons: ['OK']
      });
      alert.present();
    }).catch(error => {
      throw error;
    });
  }

  deleteVehicle() {
    VehicleProvider.deleteVehicle(this.vehicle).
    then(() => {
      let alert = this.alertCtrl.create({
        title: 'Vehicle delete!',
        subTitle: 'Your vehicle has been delete!',
        buttons: ['OK']
      });
      alert.present();
      this.vehicle = {
        id: 0,
        name: '',
        model: 0,
        isDeleted: 0
      }
    }).catch(error => {
      throw error;
    });
  }

}
