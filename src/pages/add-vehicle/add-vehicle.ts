import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Vehicle } from '../../model/vehicle';
import { AlertController } from 'ionic-angular';
import { VehicleProvider } from '../../providers/vehicle-provider';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-add-vehicle',
  templateUrl: 'add-vehicle.html',
})
export class AddVehiclePage {

  name: string;
  model: number;
  years: number[] = new Array();
  vehicle: Vehicle = {
    name: '',
    model: 0,
    isDeleted: 0
  };
  isSaved: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
    this.getYears();
  }

  ionViewDidLoad() {
  }

  getYears() {
    let date = new Date();
    let year = date.getFullYear();
    for (let i = year; i >= 1950; i--) {
      this.years.push(i);
    }
  }

  saveVehicle() {
    VehicleProvider.saveVehicle(this.vehicle)
      .then(() => {
        let alert = this.alertCtrl.create({
          title: 'New Vehicle created!',
          subTitle: 'Your new vehicle has been added successfully!',
          buttons: ['OK']
        });
        alert.present();
        this.isSaved = true;
        this.name = this.vehicle.name;
        this.model = this.vehicle.model;
        this.vehicle = {
          name: '',
          model: 0,
          isDeleted: 0
        }
      })
      .catch(error => { 
        console.error('error saveVehicle ', error);
        throw error 
      });
  }

  navigateHome() {
    this.navCtrl.setRoot(HomePage);
  }

}
