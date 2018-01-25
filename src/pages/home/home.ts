import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyVehiclesPage } from '../my-vehicles/my-vehicles';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  public myVehicles(): void {
    this.navCtrl.push(MyVehiclesPage);
  }

}
