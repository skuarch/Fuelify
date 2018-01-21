import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(private storage: Storage) {
  }

  setKeyValue(key, value) {
    if (!key) {
      throw new Error('key is undefinied');
    }
    this.storage.set(key, value);
  }

  getValue(key) {
    this.storage.get(key).then((value) => {
      console.log('Your age is', value);
    });
  }

}
