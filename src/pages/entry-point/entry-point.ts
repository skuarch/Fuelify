import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { TutorialPage } from '../tutorial/tutorial';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-entry-point',
  templateUrl: 'entry-point.html',
})
export class EntryPointPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageProvider: StorageProvider) {
  }

  ionViewDidLoad() {

    this.storageProvider.getValue('skipTutorial')
      .then(skipTutorial => {
        if (skipTutorial === undefined) {
          this.navCtrl.push(TutorialPage)
        } else if (skipTutorial) {
          this.navCtrl.setRoot(HomePage);
          // this.navCtrl.push(HomePage);
        } else {
          this.navCtrl.push(TutorialPage);
        }
      });

  }

}
