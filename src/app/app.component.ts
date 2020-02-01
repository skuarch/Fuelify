import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { EntryPointPage } from '../pages/entry-point/entry-point';
import { SettingsPage } from '../pages/settings/settings';

import { VehicleProvider } from '../providers/vehicle-provider';
import { LiquidUnitProvider } from '../providers/liquid-unit-provider';
import { SharedData } from '../model/shared-data';
import { FullUpProvider } from '../providers/full-up-provider';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = EntryPointPage;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public sqlite: SQLite
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Tutorial', component: TutorialPage },
      { title: 'Settings', component: SettingsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.backgroundColorByHexString('#151515');
      this.splashScreen.hide();
      this.createDatabase();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component == HomePage) {
      this.nav.setRoot(page.component);
    } else {
      this.nav.push(page.component);
    }

  }

  private createDatabase() {
    this.sqlite.create({
      name: 'fuelify.db',
      location: 'default'
    })
      .then((db) => {
        SharedData.setDb(db);
        VehicleProvider.setDatabase(db);
        VehicleProvider.createTable()
          .then(() => console.log('table vehicle created'))
          .catch(e => console.error('error creating table vehicle ', e));
        LiquidUnitProvider.setDatabase(db);
        LiquidUnitProvider.createTable();
        LiquidUnitProvider.insertDefaultData();
        FullUpProvider.setDatabase(db);
        FullUpProvider.createTable();
      })
      .catch(error => {
        console.error('error creating db', error);
        throw error;
      });
  }
}
