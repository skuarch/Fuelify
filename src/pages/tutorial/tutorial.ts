import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storageProvider: StorageProvider) {
  }

  ionViewDidLoad() {

  }

  openHomePage() {
    this.storageProvider.setKeyValue('skipTutorial', true);
    this.navCtrl.setRoot(HomePage);
  }

}
