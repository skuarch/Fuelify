import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VehicleProvider } from '../../providers/vehicle-provider';
import { Vehicle } from '../../model/vehicle';
import { LiquidUnit } from '../../model/liquid-unit';
import { LiquidUnitProvider } from '../../providers/liquid-unit-provider';
import { DecimalPipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-fill-up-gas',
  templateUrl: 'fill-up-gas.html',
})
export class FillUpGasPage {

  vehicle: Vehicle;
  vehicles: Vehicle[] = new Array<Vehicle>();
  liquidUnit: LiquidUnit;
  liquidUnits: LiquidUnit[] = new Array<LiquidUnit>();
  amount: number;
  odometer: number;
  price: any;
  date: any;
  note: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private decimalPipe: DecimalPipe
  ) {
    this.vehicles = new Array();
    this.liquidUnit = {
      id: 0,
      name: ''
    };
    this.vehicle = {
      id: 0,
      model: 2016,
      isDeleted: 0,
      name: ''
    };
    this.liquidUnits = new Array();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FillUpGasPage');
    this.liquidUnit = {
      id: 0,
      name: ''
    };
    this.vehicle = {
      id: 0,
      model: 2016,
      isDeleted: 0,
      name: ''
    };
    this.liquidUnits = new Array();
    this.getLiquidUnits();
    this.getVehicles();
    this.amount = 20;
    this.odometer = 15000;
    this.price = this.twoDecimals(20.00);
    this.date = new Date().toISOString();
  }

  getVehicles() {
    VehicleProvider.getVehicles()
      .then(vehicles => {
        this.vehicles = vehicles;
        this.selectVehicle();
      })
      .catch(error => { throw error });
  }

  getLiquidUnits() {
    LiquidUnitProvider.getLiquidUnits()
      .then(liquidUnits => {
        this.liquidUnits = liquidUnits;
      })
      .catch(error => { throw error });
  }

  selectVehicle(): void {
    if (this.vehicles.length == 1) {
      if (this.vehicles[0]) {
        this.vehicle = this.vehicles[0];
      }
    }
  }

  twoDecimals(number) {
    return this.decimalPipe.transform(number, '1.2-2');
  }

  saveFillUp() {

    if(!this.liquidUnit.name) {
      this.liquidUnit.name = this.liquidUnits[0].name;
    }
    
    let fillUpGas;
    let lu: LiquidUnit;
    LiquidUnitProvider.getLiquidUnitByName(this.liquidUnit.name).then(data => {
      lu = data;
      fillUpGas = {
        amount: this.amount,
        vehicleName: this.vehicle,
        odometer: this.odometer,
        units: lu,
        price: this.price,
        date: this.date
      };
    });
    console.log('fillUpGas: ', fillUpGas);
  }

  next() {
    console.log('next');
  }

}
