import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Vehicle } from '../../model/vehicle';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-vehicle',
  templateUrl: 'add-vehicle.html',
})
export class AddVehiclePage {

  model:number;
  years:number[] = new Array();
  vehicle:Vehicle = {
    name:'',
    model:0
  };
  isSaved: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.getYears();
  }

  ionViewDidLoad() {
  }

  getYears() {
    let date = new Date();
    let year = date.getFullYear();
    for(let i = year; i >= 1950; i--) {
      this.years.push(i);
    }
  }

  saveVehicle() {
    let alert = this.alertCtrl.create({
      title: 'New Vehicle!',
      subTitle: 'Your new vehicle has been added successfully!',
      buttons: ['OK']
    });
    alert.present();
    this.isSaved = true;
  }

}
